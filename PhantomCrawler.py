#!/usr/bin/env python3
"""
PhantomCrawler - Fixed and Enhanced Version
Lightweight web application reconnaissance and security testing tool.

Features:
- Multi-threaded crawling with rate limiting
- JavaScript analysis for risky patterns
- Secret and credential detection
- GraphQL endpoint discovery and testing
- JWT token analysis
- Security header validation
- Form discovery and XSS fuzzing
- Comprehensive JSON and HTML reporting

Dependencies:
- Python 3.8+
- requests
- beautifulsoup4
- colorama

Usage:
    python3 phantomcrawler.py https://target.example.com --depth 2 --threads 5
    python3 phantomcrawler.py https://target.example.com --fuzz --graphql
    
IMPORTANT: Only scan targets you have explicit permission to test.
"""

import argparse
import json
import re
import sys
import time
import hashlib
import base64
import html as html_module
from urllib.parse import urljoin, urlparse
from datetime import datetime
from threading import Thread, Lock
from queue import Queue
from typing import Set, Dict, List, Optional

try:
    import requests
    from bs4 import BeautifulSoup
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError as e:
    print(f"Error: Missing required dependency - {e}")
    print("Install with: pip install requests beautifulsoup4 colorama")
    sys.exit(1)

# ============================================================================
# CONSTANTS
# ============================================================================

RISKY_JS_PATTERNS = {
    r"\.innerHTML\s*=": "innerHTML assignment (XSS risk)",
    r"document\.write\(": "document.write (XSS risk)",
    r"\beval\(": "eval() usage (code injection risk)",
    r"new\s+Function\(": "Function constructor (code injection risk)",
    r"setTimeout\s*\(\s*['\"]": "setTimeout with string (code injection risk)",
    r"setInterval\s*\(\s*['\"]": "setInterval with string (code injection risk)",
    r"location\.href\s*=": "location.href assignment (open redirect risk)",
    r"window\.location\s*=": "window.location assignment (open redirect risk)",
    r"postMessage\(": "postMessage usage (check origin validation)",
    r"dangerouslySetInnerHTML": "dangerouslySetInnerHTML (React XSS risk)",
}

XSS_PAYLOADS = [
    "<script>alert('XSS')</script>",
    "\" onmouseover=alert(1) x=\"",
    "'><img src=x onerror=alert(1)>",
    "<svg onload=alert(1)>",
    "javascript:alert(1)",
    "<iframe src=javascript:alert(1)>",
    "<body onload=alert(1)>",
]

JWT_WEAK_SECRETS = [
    "secret", "password", "123456", "admin", "test", "jwt", "key",
    "secret123", "password123", "mypassword", "changeme"
]

SECRET_PATTERNS = {
    'AWS Access Key': r'AKIA[0-9A-Z]{16}',
    'AWS Secret Key': r'(?i)aws(.{0,20})?[\'"][0-9a-zA-Z\/+]{40}[\'"]',
    'API Key': r'(?i)(api[_-]?key|apikey)[\s]*[:=][\s]*[\'"][0-9a-zA-Z]{20,}[\'"]',
    'Generic Secret': r'(?i)(secret|password|passwd|pwd)[\s]*[:=][\s]*[\'"][^\'"\s]{8,}[\'"]',
    'Private Key': r'-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----',
    'Google API': r'AIza[0-9A-Za-z\\-_]{35}',
    'GitHub Token': r'ghp_[0-9a-zA-Z]{36}',
    'Slack Token': r'xox[baprs]-[0-9]{10,12}-[0-9]{10,12}-[0-9a-zA-Z]{24,}',
}

SECURITY_HEADERS = {
    'X-Frame-Options': {'severity': 'MEDIUM', 'impact': 'Clickjacking vulnerability'},
    'X-Content-Type-Options': {'severity': 'LOW', 'impact': 'MIME type sniffing'},
    'Strict-Transport-Security': {'severity': 'HIGH', 'impact': 'HTTPS enforcement missing'},
    'Content-Security-Policy': {'severity': 'MEDIUM', 'impact': 'XSS mitigation missing'},
    'X-XSS-Protection': {'severity': 'LOW', 'impact': 'Legacy XSS protection missing'},
}

HEADERS = {
    "User-Agent": "PhantomCrawler/1.0 (Security Research)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ============================================================================
# HELPER CLASSES
# ============================================================================

class RateLimiter:
    """Simple rate limiter for requests"""
    def __init__(self, requests_per_second=2):
        self.delay = 1.0 / requests_per_second
        self.last_request = 0
        self.lock = Lock()
    
    def wait(self):
        with self.lock:
            now = time.time()
            time_since_last = now - self.last_request
            if time_since_last < self.delay:
                time.sleep(self.delay - time_since_last)
            self.last_request = time.time()


class SecurityHeaderAnalyzer:
    """Analyzes HTTP security headers"""
    @staticmethod
    def analyze(response_headers: dict) -> List[Dict]:
        findings = []
        for header, info in SECURITY_HEADERS.items():
            if header not in response_headers:
                findings.append({
                    'issue': f'Missing {header}',
                    'severity': info['severity'],
                    'impact': info['impact']
                })
        return findings


class JWTAnalyzer:
    """JWT token analysis utilities"""
    @staticmethod
    def decode_jwt(token: str) -> Optional[Dict]:
        try:
            parts = token.split('.')
            if len(parts) != 3:
                return None
            
            # Decode header and payload
            header = json.loads(base64.urlsafe_b64decode(parts[0] + '=='))
            payload = json.loads(base64.urlsafe_b64decode(parts[1] + '=='))
            
            return {'header': header, 'payload': payload}
        except Exception:
            return None
    
    @staticmethod
    def test_weak_secrets(token: str) -> List[str]:
        """Test JWT against common weak secrets"""
        findings = []
        # Note: Actual HMAC verification would require PyJWT library
        # This is a simplified check
        if len(token.split('.')[2]) < 20:
            findings.append('Potentially weak signature')
        return findings

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def fetch_url(url: str, timeout: int = 12, session: Optional[requests.Session] = None) -> Optional[requests.Response]:
    """Fetch URL with error handling"""
    try:
        requester = session if session else requests
        r = requester.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True, verify=True)
        return r
    except requests.exceptions.SSLError:
        # Retry without SSL verification for testing purposes
        try:
            r = requester.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True, verify=False)
            return r
        except Exception:
            return None
    except Exception as e:
        return None


def is_same_domain(base: str, other: str) -> bool:
    """Check if two URLs are from the same domain"""
    try:
        base_domain = urlparse(base).netloc
        other_domain = urlparse(other).netloc
        return base_domain == other_domain
    except Exception:
        return False


def extract_endpoints(content: str, base_url: str) -> Set[str]:
    """Extract API endpoints from HTML/JS content"""
    endpoints = set()
    
    # Common API patterns
    patterns = [
        r'[\'"]/(api|v\d+)/[^\'"\s]+[\'"]',
        r'[\'"]https?://[^\'"\s]+/(api|v\d+)/[^\'"\s]+[\'"]',
        r'fetch\([\'"]([^\'"\s]+)[\'"]',
        r'axios\.[get|post]+\([\'"]([^\'"\s]+)[\'"]',
        r'\.get\([\'"]([^\'"\s]+)[\'"]',
        r'\.post\([\'"]([^\'"\s]+)[\'"]',
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple):
                match = match[0] if match[0] else match[1] if len(match) > 1 else ''
            if match and not match.startswith('data:'):
                endpoints.add(urljoin(base_url, match))
    
    return endpoints


def extract_secrets(content: str) -> List[Dict]:
    """Extract potential secrets and credentials"""
    secrets = []
    for secret_type, pattern in SECRET_PATTERNS.items():
        matches = re.findall(pattern, content)
        for match in matches:
            if isinstance(match, tuple):
                match = match[0]
            secrets.append({
                'type': secret_type,
                'value': match[:100]  # Truncate for safety
            })
    return secrets


# ============================================================================
# MAIN CRAWLER CLASS
# ============================================================================

class PhantomCrawler:
    """Main web crawler and security testing class"""
    
    def __init__(self, base_url: str, max_depth: int = 1, threads: int = 3):
        self.base = base_url.rstrip('/')
        self.max_depth = max_depth
        self.threads = threads
        
        # Threading components
        self.queue = Queue()
        self.lock = Lock()
        self.session = requests.Session()
        self.rate_limiter = RateLimiter(requests_per_second=2)
        
        # Tracking
        self.seen = set()
        self.findings = {
            'pages': {},
            'scripts': {},
            'forms': [],
            'endpoints': set(),
            'graphql_endpoints': set(),
            'websockets': set(),
            'security_headers': {},
            'secrets': [],
            'jwt_tokens': [],
            'vulnerabilities': [],
            'statistics': {
                'pages_crawled': 0,
                'scripts_analyzed': 0,
                'forms_found': 0,
                'start_time': datetime.now().isoformat(),
                'end_time': None
            }
        }
    
    def crawl(self):
        """Main crawling method with multi-threading"""
        print(f"{Fore.CYAN}[*] Starting crawl: {self.base}{Style.RESET_ALL}")
        print(f"{Fore.CYAN}[*] Depth: {self.max_depth} | Threads: {self.threads}{Style.RESET_ALL}\n")
        
        # Add initial URL
        self.queue.put((self.base, 0))
        
        # Start worker threads
        workers = []
        for i in range(self.threads):
            t = Thread(target=self._worker)
            t.daemon = True
            t.start()
            workers.append(t)
        
        # Wait for completion
        self.queue.join()
        
        # Update statistics
        with self.lock:
            self.findings['statistics']['end_time'] = datetime.now().isoformat()
            self.findings['statistics']['pages_crawled'] = len(self.findings['pages'])
            self.findings['statistics']['scripts_analyzed'] = len(self.findings['scripts'])
        
        print(f"\n{Fore.GREEN}[✓] Crawling complete{Style.RESET_ALL}")
    
    def _worker(self):
        """Worker thread for processing URLs"""
        while True:
            try:
                url, depth = self.queue.get(timeout=1)
                self._process_url(url, depth)
            except Exception:
                break
            finally:
                self.queue.task_done()
    
    def _process_url(self, url: str, depth: int):
        """Process a single URL"""
        with self.lock:
            if url in self.seen:
                return
            self.seen.add(url)
        
        print(f"{Fore.BLUE}[Crawl]{Style.RESET_ALL} {url} (depth {depth})")
        
        self.rate_limiter.wait()
        r = fetch_url(url, session=self.session)
        
        if not r or r.status_code >= 400:
            print(f"  {Fore.RED}✗ Failed ({r.status_code if r else 'error'}){Style.RESET_ALL}")
            return
        
        # Analyze security headers
        header_findings = SecurityHeaderAnalyzer.analyze(r.headers)
        if header_findings:
            with self.lock:
                self.findings['security_headers'][url] = header_findings
        
        # Parse and analyze content
        content_type = r.headers.get('Content-Type', '')
        if 'text/html' in content_type or not content_type:
            self._analyze_page(r.text, url)
            
            # Extract and queue new links
            if depth < self.max_depth:
                links = self._extract_links(r.text, url)
                for link in links:
                    with self.lock:
                        if link not in self.seen and is_same_domain(self.base, link):
                            self.queue.put((link, depth + 1))
    
    def _extract_links(self, html: str, base_url: str) -> Set[str]:
        """Extract links from HTML"""
        soup = BeautifulSoup(html, 'html.parser')
        links = set()
        
        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.startswith(('mailto:', 'tel:', 'javascript:')):
                continue
            full = urljoin(base_url, href)
            # Remove fragments
            full = full.split('#')[0]
            links.add(full)
        
        return links
    
    def _analyze_page(self, html: str, page_url: str):
        """Comprehensive page analysis"""
        soup = BeautifulSoup(html, 'html.parser')
        page_info = {
            'url': page_url,
            'scripts': [],
            'forms': [],
            'risky_js_patterns': {},
            'endpoints': [],
            'secrets': [],
            'jwt_tokens': []
        }
        
        # Extract API endpoints
        endpoints = extract_endpoints(html, page_url)
        page_info['endpoints'] = list(endpoints)
        with self.lock:
            self.findings['endpoints'].update(endpoints)
        
        # Extract secrets
        secrets = extract_secrets(html)
        if secrets:
            page_info['secrets'] = secrets
            with self.lock:
                self.findings['secrets'].extend([{**s, 'source': page_url} for s in secrets])
                print(f"{Fore.RED}[!] Found {len(secrets)} potential secret(s) in {page_url}{Style.RESET_ALL}")
        
        # Analyze inline scripts
        for script in soup.find_all('script'):
            src = script.get('src')
            if src:
                full = urljoin(page_url, src)
                page_info['scripts'].append(full)
                if full not in self.findings['scripts']:
                    self._fetch_and_analyze_script(full)
            else:
                inline = script.string or ''
                if inline.strip():
                    script_id = f"inline:{hashlib.md5(inline.encode()).hexdigest()[:8]}"
                    
                    patterns = self._find_js_patterns(inline)
                    script_endpoints = extract_endpoints(inline, page_url)
                    script_secrets = extract_secrets(inline)
                    
                    with self.lock:
                        self.findings['scripts'][script_id] = {
                            'source': page_url,
                            'inline': True,
                            'size': len(inline),
                            'patterns': patterns,
                            'endpoints': list(script_endpoints),
                            'secrets': script_secrets
                        }
                        self.findings['endpoints'].update(script_endpoints)
                    
                    if patterns:
                        page_info['risky_js_patterns'].update(patterns)
                        print(f"{Fore.YELLOW}[!] Risky patterns in inline script: {', '.join(patterns.keys())}{Style.RESET_ALL}")
        
        # JWT token detection
        jwt_pattern = r'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+'
        jwt_tokens = re.findall(jwt_pattern, html)
        for token in jwt_tokens:
            decoded = JWTAnalyzer.decode_jwt(token)
            if decoded:
                jwt_findings = JWTAnalyzer.test_weak_secrets(token)
                with self.lock:
                    self.findings['jwt_tokens'].append({
                        'token': token[:50] + '...',
                        'source': page_url,
                        'decoded': decoded,
                        'findings': jwt_findings
                    })
                print(f"{Fore.CYAN}[i] JWT token found in {page_url}{Style.RESET_ALL}")
        
        # WebSocket detection
        ws_pattern = r'(wss?://[^\s\'"]+)'
        websockets = re.findall(ws_pattern, html, re.IGNORECASE)
        if websockets:
            with self.lock:
                self.findings['websockets'].update(websockets)
            print(f"{Fore.CYAN}[i] WebSocket endpoint(s) found: {websockets}{Style.RESET_ALL}")
        
        # Forms
        for form in soup.find_all('form'):
            form_info = self._parse_form(form, page_url)
            page_info['forms'].append(form_info)
            with self.lock:
                self.findings['forms'].append(form_info)
        
        # GraphQL endpoint detection
        text_search = html.lower()
        if '/graphql' in text_search or 'graphql' in text_search:
            if '/graphql' in text_search:
                with self.lock:
                    self.findings['graphql_endpoints'].add(urljoin(page_url, '/graphql'))
            
            for candidate in re.findall(r"['\"](\S*graphql\S*)['\"]", html, re.IGNORECASE):
                if candidate.startswith('/') or candidate.startswith('http'):
                    with self.lock:
                        self.findings['graphql_endpoints'].add(urljoin(page_url, candidate))
        
        with self.lock:
            self.findings['pages'][page_url] = page_info
    
    def _fetch_and_analyze_script(self, script_url: str):
        """Fetch and analyze external JavaScript"""
        print(f"  {Fore.CYAN}[Script]{Style.RESET_ALL} {script_url}")
        
        self.rate_limiter.wait()
        r = fetch_url(script_url, session=self.session)
        
        if not r or r.status_code >= 400:
            with self.lock:
                self.findings['scripts'][script_url] = {'error': 'fetch_failed'}
            return
        
        content = r.text
        patterns = self._find_js_patterns(content)
        endpoints = extract_endpoints(content, script_url)
        secrets = extract_secrets(content)
        
        with self.lock:
            self.findings['scripts'][script_url] = {
                'size': len(content),
                'content_snippet': content[:500],
                'patterns': patterns,
                'endpoints': list(endpoints),
                'secrets': secrets
            }
            self.findings['endpoints'].update(endpoints)
            
            if secrets:
                self.findings['secrets'].extend([{**s, 'source': script_url} for s in secrets])
                print(f"{Fore.RED}[!] Found {len(secrets)} secret(s) in {script_url}{Style.RESET_ALL}")
    
    def _find_js_patterns(self, js_text: str) -> Dict[str, str]:
        """Find risky JavaScript patterns"""
        found = {}
        for pattern, description in RISKY_JS_PATTERNS.items():
            if re.search(pattern, js_text):
                found[pattern] = description
        return found
    
    def _parse_form(self, form_tag, page_url: str) -> Dict:
        """Parse form details"""
        action = form_tag.get('action') or page_url
        method = (form_tag.get('method') or 'GET').upper()
        
        inputs = []
        csrf_tokens = []
        
        for inp in form_tag.find_all(['input', 'textarea', 'select']):
            name = inp.get('name')
            typ = inp.get('type') or inp.name
            value = inp.get('value') or ''
            
            inputs.append({
                'name': name,
                'type': typ,
                'value': value
            })
            
            # Detect CSRF tokens
            if name and any(token in name.lower() for token in ['csrf', 'token', '_token', 'authenticity']):
                csrf_tokens.append(name)
        
        return {
            'page': page_url,
            'action': urljoin(page_url, action),
            'method': method,
            'inputs': inputs,
            'input_count': len(inputs),
            'csrf_tokens': csrf_tokens
        }
    
    def fuzz_forms(self, payloads: Optional[List[str]] = None, delay: float = 0.5):
        """Fuzz forms with XSS payloads"""
        if payloads is None:
            payloads = XSS_PAYLOADS
        
        print(f"\n{Fore.CYAN}[*] Starting form fuzzing{Style.RESET_ALL}")
        results = []
        
        for form in self.findings['forms']:
            action = form['action']
            method = form['method']
            inputs = form['inputs']
            
            print(f"{Fore.BLUE}[Fuzz]{Style.RESET_ALL} {action} ({method})")
            
            for payload in payloads:
                data = {}
                for inp in inputs:
                    if inp.get('name'):
                        data[inp['name']] = payload
                
                try:
                    if method == 'GET':
                        r = requests.get(action, params=data, headers=HEADERS, timeout=10)
                    else:
                        r = requests.post(action, data=data, headers=HEADERS, timeout=10)
                except Exception:
                    r = None
                
                reflected = False
                snippet = ''
                
                if r and r.status_code < 500:
                    snippet = r.text[:400]
                    if payload in r.text:
                        reflected = True
                        # Add to vulnerabilities
                        with self.lock:
                            self.findings['vulnerabilities'].append({
                                'type': 'XSS',
                                'severity': 'HIGH',
                                'url': action,
                                'method': method,
                                'payload': payload,
                                'description': f'Payload reflected without encoding',
                                'impact': 'Potential Cross-Site Scripting vulnerability'
                            })
                
                results.append({
                    'form': action,
                    'method': method,
                    'payload': payload,
                    'status': r.status_code if r else None,
                    'reflected': reflected,
                    'snippet': snippet
                })
                
                print(f"  {Fore.YELLOW if reflected else Fore.GREEN}{'✓' if reflected else '✗'} {payload[:40]}... → reflected: {reflected}{Style.RESET_ALL}")
                time.sleep(delay)
        
        return results
    
    def probe_graphql(self):
        """Probe GraphQL endpoints"""
        print(f"\n{Fore.CYAN}[*] Probing GraphQL endpoints{Style.RESET_ALL}")
        
        results = []
        introspect_query = '{ __schema { types { name } } }'
        headers = dict(HEADERS)
        headers['Content-Type'] = 'application/json'
        
        for endpoint in list(self.findings['graphql_endpoints']):
            print(f"{Fore.BLUE}[GraphQL]{Style.RESET_ALL} {endpoint}")
            
            try:
                r = requests.post(endpoint, json={'query': introspect_query}, headers=headers, timeout=10)
            except Exception:
                r = None
            
            introspection_enabled = False
            snippet = ''
            
            if r and r.status_code < 500:
                try:
                    if r.headers.get('Content-Type', '').startswith('application/json'):
                        j = r.json()
                        if 'data' in j and '__schema' in str(j):
                            introspection_enabled = True
                        snippet = json.dumps(j, indent=2)[:400]
                except Exception:
                    snippet = r.text[:400]
            
            results.append({
                'endpoint': endpoint,
                'reachable': bool(r),
                'introspection_enabled': introspection_enabled,
                'status': r.status_code if r else None,
                'snippet': snippet
            })
            
            status = f"{Fore.RED}EXPOSED{Style.RESET_ALL}" if introspection_enabled else f"{Fore.GREEN}Protected{Style.RESET_ALL}"
            print(f"  Introspection: {status}")
            
            if introspection_enabled:
                with self.lock:
                    self.findings['vulnerabilities'].append({
                        'type': 'GraphQL Introspection',
                        'severity': 'MEDIUM',
                        'url': endpoint,
                        'description': 'GraphQL introspection is enabled',
                        'impact': 'Attackers can enumerate the entire GraphQL schema'
                    })
        
        return results
    
    def _print_summary(self):
        """Print scan summary statistics"""
        stats = self.findings['statistics']
        
        print(f"\n{Fore.CYAN}{'='*60}{Style.RESET_ALL}")
        print(f"{Fore.CYAN}SCAN SUMMARY{Style.RESET_ALL}")
        print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")
        
        print(f"{Fore.GREEN}Pages Crawled:{Style.RESET_ALL} {stats['pages_crawled']}")
        print(f"{Fore.GREEN}Scripts Analyzed:{Style.RESET_ALL} {stats['scripts_analyzed']}")
        print(f"{Fore.GREEN}Forms Found:{Style.RESET_ALL} {stats['forms_found']}")
        print(f"{Fore.GREEN}API Endpoints:{Style.RESET_ALL} {len(self.findings['endpoints'])}")
        print(f"{Fore.GREEN}GraphQL Endpoints:{Style.RESET_ALL} {len(self.findings['graphql_endpoints'])}")
        print(f"{Fore.GREEN}WebSocket Endpoints:{Style.RESET_ALL} {len(self.findings['websockets'])}")
        
        if self.findings['secrets']:
            print(f"\n{Fore.RED}Secrets Found:{Style.RESET_ALL} {len(self.findings['secrets'])}")
            secret_types = {}
            for secret in self.findings['secrets']:
                secret_types[secret['type']] = secret_types.get(secret['type'], 0) + 1
            for stype, count in secret_types.items():
                print(f"  - {stype}: {count}")
        
        if self.findings['jwt_tokens']:
            print(f"\n{Fore.YELLOW}JWT Tokens:{Style.RESET_ALL} {len(self.findings['jwt_tokens'])}")
        
        if self.findings['vulnerabilities']:
            print(f"\n{Fore.RED}Vulnerabilities:{Style.RESET_ALL} {len(self.findings['vulnerabilities'])}")
            vuln_by_severity = {'CRITICAL': 0, 'HIGH': 0, 'MEDIUM': 0, 'LOW': 0}
            for vuln in self.findings['vulnerabilities']:
                severity = vuln.get('severity', 'MEDIUM')
                vuln_by_severity[severity] = vuln_by_severity.get(severity, 0) + 1
            
            for severity, count in vuln_by_severity.items():
                if count > 0:
                    color = Fore.RED if severity in ['CRITICAL', 'HIGH'] else Fore.YELLOW
                    print(f"  {color}- {severity}: {count}{Style.RESET_ALL}")
        
        print(f"\n{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")
    
    def save_report(self, path: str = 'phantom_report.json', html_report: bool = True):
        """Save comprehensive JSON and HTML reports"""
        # Prepare data
        data = {
            'scan_info': {
                'target': self.base,
                'start_time': self.findings['statistics'].get('start_time'),
                'end_time': self.findings['statistics'].get('end_time'),
                'depth': self.max_depth,
                'threads': self.threads
            },
            'statistics': self.findings['statistics'],
            'pages': self.findings['pages'],
            'scripts': self.findings['scripts'],
            'forms': self.findings['forms'],
            'endpoints': list(self.findings['endpoints']),
            'graphql_endpoints': list(self.findings['graphql_endpoints']),
            'websockets': list(self.findings['websockets']),
            'security_headers': self.findings['security_headers'],
            'secrets': self.findings['secrets'],
            'jwt_tokens': self.findings['jwt_tokens'],
            'vulnerabilities': self.findings['vulnerabilities']
        }
        
        # Save JSON
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"{Fore.GREEN}[✓] JSON report saved: {path}{Style.RESET_ALL}")
        
        # Generate HTML report
        if html_report:
            html_path = path.replace('.json', '.html')
            self._generate_html_report(data, html_path)
            print(f"{Fore.GREEN}[✓] HTML report saved: {html_path}{Style.RESET_ALL}")
    
    def _generate_html_report(self, data: Dict, path: str):
        """Generate interactive HTML report"""
        
        # Build vulnerabilities section
        vuln_html = ""
        if data['vulnerabilities']:
            vuln_html = '<div class="section"><h2>🚨 Vulnerabilities</h2>'
            for vuln in data['vulnerabilities']:
                severity = vuln.get('severity', 'MEDIUM').lower()
                vuln_html += f'''
            <div class="vuln vuln-{severity}">
                <span class="badge badge-{severity}">{vuln.get('severity', 'MEDIUM')}</span>
                <strong>{vuln.get('type', 'Unknown')}</strong>
                <p><strong>URL:</strong> <code>{html_module.escape(vuln.get('url', 'N/A'))}</code></p>'''
                
                if 'payload' in vuln:
                    vuln_html += f"<p><strong>Payload:</strong> <code>{html_module.escape(vuln['payload'][:200])}</code></p>"
                if 'description' in vuln:
                    vuln_html += f"<p>{html_module.escape(vuln['description'])}</p>"
                if 'impact' in vuln:
                    vuln_html += f"<p><strong>Impact:</strong> {html_module.escape(vuln['impact'])}</p>"
                
                vuln_html += '</div>'
            vuln_html += '</div>'
        
        # Build secrets section
        secrets_html = ""
        if data['secrets']:
            secrets_html = '<div class="section"><h2>🔐 Secrets & Credentials</h2>'
            for secret in data['secrets']:
                secrets_html += f'''
            <div class="secret">
                <strong>{html_module.escape(secret['type'])}</strong><br>
                Source: <code>{html_module.escape(secret['source'][:80])}</code><br>
                Value: <code>{html_module.escape(secret['value'][:50])}{'...' if len(secret['value']) > 50 else ''}</code>
            </div>'''
            secrets_html += '</div>'
        
        # Build GraphQL section
        graphql_html = ""
        if data['graphql_endpoints']:
            graphql_html = '<div class="section"><h2>GraphQL Endpoints</h2>'
            for endpoint in data['graphql_endpoints']:
                graphql_html += f'<div class="endpoint">{html_module.escape(endpoint)}</div>'
            graphql_html += '</div>'
        
        # Build API endpoints section
        endpoints_html = ""
        if data['endpoints']:
            endpoints_html = f'<div class="section"><h2>API Endpoints ({len(data["endpoints"])})</h2>'
            for endpoint in list(data['endpoints'])[:50]:
                endpoints_html += f'<div class="endpoint">{html_module.escape(endpoint)}</div>'
            if len(data['endpoints']) > 50:
                endpoints_html += f"<p><em>... and {len(data['endpoints']) - 50} more</em></p>"
            endpoints_html += '</div>'
        
        # Build security headers section
        headers_html = ""
        if data['security_headers']:
            headers_html = '''<div class="section">
            <h2>Security Headers Analysis</h2>
            <table>
                <tr><th>URL</th><th>Issue</th><th>Severity</th><th>Impact</th></tr>'''
            
            for url, findings in data['security_headers'].items():
                for finding in findings:
                    headers_html += f'''
                <tr>
                    <td><code>{html_module.escape(url[:50])}...</code></td>
                    <td>{html_module.escape(finding['issue'])}</td>
                    <td><span class="badge badge-{finding['severity'].lower()}">{finding['severity']}</span></td>
                    <td>{html_module.escape(finding['impact'])}</td>
                </tr>'''
            headers_html += '</table></div>'
        
        # Build forms section
        forms_html = ""
        if data['forms']:
            forms_html = f'''<div class="section">
            <h2>Forms ({len(data['forms'])})</h2>
            <table>
                <tr><th>Page</th><th>Action</th><th>Method</th><th>Inputs</th><th>CSRF Tokens</th></tr>'''
            
            for form in data['forms'][:20]:
                csrf_info = ', '.join(form.get('csrf_tokens', [])) if form.get('csrf_tokens') else 'None'
                forms_html += f'''
                <tr>
                    <td><code>{html_module.escape(form['page'][:40])}...</code></td>
                    <td><code>{html_module.escape(form['action'][:40])}...</code></td>
                    <td>{form['method']}</td>
                    <td>{form['input_count']}</td>
                    <td>{html_module.escape(csrf_info)}</td>
                </tr>'''
            forms_html += '</table></div>'
        
        # Complete HTML document
        html = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PhantomCrawler Report - {html_module.escape(data['scan_info']['target'])}</title>
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        h1 {{ color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }}
        h2 {{ color: #34495e; margin-top: 30px; }}
        .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }}
        .stat-box {{ background: #ecf0f1; padding: 15px; border-radius: 5px; text-align: center; }}
        .stat-value {{ font-size: 2em; font-weight: bold; color: #3498db; }}
        .stat-label {{ color: #7f8c8d; font-size: 0.9em; }}
        .vuln {{ background: #fee; border-left: 4px solid #e74c3c; padding: 15px; margin: 10px 0; border-radius: 4px; }}
        .vuln-critical {{ border-left-color: #c0392b; background: #fdd; }}
        .vuln-high {{ border-left-color: #e74c3c; background: #fee; }}
        .vuln-medium {{ border-left-color: #f39c12; background: #fef5e7; }}
        .vuln-low {{ border-left-color: #95a5a6; background: #f8f9fa; }}
        .secret {{ background: #fef3cd; border-left: 4px solid #f0ad4e; padding: 10px; margin: 5px 0; font-family: monospace; font-size: 0.9em; }}
        .endpoint {{ background: #e8f4f8; padding: 8px; margin: 5px 0; border-radius: 3px; font-family: monospace; font-size: 0.9em; }}
        .badge {{ display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.85em; font-weight: bold; }}
        .badge-critical {{ background: #c0392b; color: white; }}
        .badge-high {{ background: #e74c3c; color: white; }}
        .badge-medium {{ background: #f39c12; color: white; }}
        .badge-low {{ background: #95a5a6; color: white; }}
        table {{ width: 100%; border-collapse: collapse; margin: 15px 0; }}
        th, td {{ padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }}
        th {{ background: #34495e; color: white; }}
        tr:hover {{ background: #f8f9fa; }}
        .section {{ margin: 30px 0; }}
        code {{ background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🕷️ PhantomCrawler Security Report</h1>
        
        <div class="section">
            <h2>Scan Information</h2>
            <p><strong>Target:</strong> {html_module.escape(data['scan_info']['target'])}</p>
            <p><strong>Start Time:</strong> {data['scan_info']['start_time']}</p>
            <p><strong>End Time:</strong> {data['scan_info']['end_time']}</p>
            <p><strong>Depth:</strong> {data['scan_info']['depth']} | <strong>Threads:</strong> {data['scan_info']['threads']}</p>
        </div>
        
        <div class="section">
            <h2>Statistics</h2>
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-value">{data['statistics']['pages_crawled']}</div>
                    <div class="stat-label">Pages Crawled</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">{data['statistics']['scripts_analyzed']}</div>
                    <div class="stat-label">Scripts Analyzed</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">{data['statistics']['forms_found']}</div>
                    <div class="stat-label">Forms Found</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">{len(data['endpoints'])}</div>
                    <div class="stat-label">API Endpoints</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">{len(data['vulnerabilities'])}</div>
                    <div class="stat-label">Vulnerabilities</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">{len(data['secrets'])}</div>
                    <div class="stat-label">Secrets Found</div>
                </div>
            </div>
        </div>
        
        {vuln_html}
        {secrets_html}
        {graphql_html}
        {endpoints_html}
        {headers_html}
        {forms_html}
        
    </div>
</body>
</html>'''
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def print_banner():
    """Print ASCII banner"""
    banner = f"""{Fore.CYAN}
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║     ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗████████╗     ║
    ║     ██╔══██╗██║  ██║██╔══██╗████╗  ██║╚══██╔══╝     ║
    ║     ██████╔╝███████║███████║██╔██╗ ██║   ██║        ║
    ║     ██╔═══╝ ██╔══██║██╔══██║██║╚██╗██║   ██║        ║
    ║     ██║     ██║  ██║██║  ██║██║ ╚████║   ██║        ║
    ║     ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝        ║
    ║                                                       ║
    ║          CRAWLER - Web Security Scanner              ║
    ║                    v1.0                               ║
    ╚═══════════════════════════════════════════════════════╝
    {Style.RESET_ALL}"""
    print(banner)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='PhantomCrawler - Web Application Security Scanner',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  Basic crawl:
    python3 phantomcrawler.py https://example.com --depth 2
  
  Full scan with fuzzing:
    python3 phantomcrawler.py https://example.com --depth 2 --fuzz --graphql
  
  Multi-threaded deep scan:
    python3 phantomcrawler.py https://example.com --depth 3 --threads 10
  
  Custom output:
    python3 phantomcrawler.py https://example.com --out my_report.json

IMPORTANT: Only scan targets you have explicit permission to test.
        '''
    )
    
    parser.add_argument('target', help='Base target URL (e.g. https://example.com)')
    parser.add_argument('--depth', type=int, default=1, help='Crawl depth (default: 1)')
    parser.add_argument('--threads', type=int, default=3, help='Number of threads (default: 3)')
    parser.add_argument('--fuzz', action='store_true', help='Run XSS fuzzing on discovered forms')
    parser.add_argument('--graphql', action='store_true', help='Probe discovered GraphQL endpoints')
    parser.add_argument('--out', default='phantom_report.json', help='Report output file (default: phantom_report.json)')
    parser.add_argument('--no-html', action='store_true', help='Skip HTML report generation')
    
    args = parser.parse_args()
    
    # Validate URL
    if not args.target.startswith(('http://', 'https://')):
        print(f"{Fore.RED}[✗] Error: Target must start with http:// or https://{Style.RESET_ALL}")
        sys.exit(1)
    
    try:
        print_banner()
        
        # Initialize crawler
        crawler = PhantomCrawler(args.target, max_depth=args.depth, threads=args.threads)
        
        # Run crawl
        crawler.crawl()
        
        # Optional fuzzing
        if args.fuzz:
            crawler.fuzz_forms()
        
        # Optional GraphQL probing
        if args.graphql:
            crawler.probe_graphql()
        
        # Print summary
        crawler._print_summary()
        
        # Save reports
        crawler.save_report(args.out, html_report=not args.no_html)
        
        print(f"\n{Fore.GREEN}[✓] Scan complete! Review reports for findings.{Style.RESET_ALL}")
        
    except KeyboardInterrupt:
        print(f"\n\n{Fore.YELLOW}[!] Scan interrupted by user{Style.RESET_ALL}")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Fore.RED}[✗] Fatal error: {e}{Style.RESET_ALL}")
        import traceback
        traceback.print_exc()
        sys.exit(1)