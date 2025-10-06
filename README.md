# PhantomCrawler Installation Guide (Kali Linux)

## Prerequisites

PhantomCrawler requires Python 3.8 or higher. Kali Linux usually comes with Python 3 pre-installed.

Check your Python version:
```bash
python3 --version
```

## Installation Steps

### 1. Update System (Optional but Recommended)
```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install pip3 (if not already installed)
```bash
sudo apt install python3-pip -y
```

### 3. Clone or Download PhantomCrawler
```bash
# Create a directory for the tool
mkdir ~/security-tools
cd ~/security-tools

# If you have the files, place them here
# Otherwise, create the directory structure:
mkdir phantomcrawler
cd phantomcrawler
```

### 4. Create the Required Files
Place these files in the `phantomcrawler` directory:
- `phantomcrawler.py` - Main script
- `requirements.txt` - Dependencies file

### 5. Install Dependencies
```bash
# Install from requirements.txt
pip3 install -r requirements.txt

# OR install manually:
pip3 install requests beautifulsoup4 colorama lxml certifi urllib3
```

### 6. Make Script Executable
```bash
chmod +x phantomcrawler.py
```

### 7. Test Installation
```bash
python3 phantomcrawler.py --help
```

You should see the help menu with all available options.

## Quick Start

### Basic Scan
```bash
python3 phantomcrawler.py https://example.com --depth 2
```

### Full Security Scan
```bash
python3 phantomcrawler.py https://target.com --depth 3 --fuzz --graphql --threads 5
```

### Output to Custom File
```bash
python3 phantomcrawler.py https://target.com --out my_report.json
```

## Optional: Create Symlink (Global Access)

To run PhantomCrawler from anywhere:

```bash
sudo ln -s $(pwd)/phantomcrawler.py /usr/local/bin/phantomcrawler
```

Then you can run it simply as:
```bash
phantomcrawler https://example.com --depth 2
```

## Troubleshooting

### Issue: "ModuleNotFoundError"
**Solution:** Install the missing module:
```bash
pip3 install <module_name>
```

### Issue: "Permission denied"
**Solution:** Make the script executable:
```bash
chmod +x phantomcrawler.py
```

### Issue: SSL Certificate Errors
**Solution:** Update certifi:
```bash
pip3 install --upgrade certifi
```

### Issue: "pip3 not found"
**Solution:** Install pip:
```bash
sudo apt install python3-pip
```

## Virtual Environment (Recommended)

For isolated dependencies:

```bash
# Install venv
sudo apt install python3-venv -y

# Create virtual environment
python3 -m venv phantom-env

# Activate it
source phantom-env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the tool
python phantomcrawler.py https://example.com

# Deactivate when done
deactivate
```

## Usage Examples

### 1. Basic Reconnaissance
```bash
python3 phantomcrawler.py https://target.com --depth 2 --threads 5
```

### 2. Deep Scan with Fuzzing
```bash
python3 phantomcrawler.py https://target.com --depth 3 --fuzz --threads 10
```

### 3. GraphQL Focus
```bash
python3 phantomcrawler.py https://api.target.com --graphql --depth 1
```

### 4. Full Audit
```bash
python3 phantomcrawler.py https://target.com --depth 3 --fuzz --graphql --threads 8 --out full_audit.json
```

## Legal Notice

⚠️ **IMPORTANT**: Only use PhantomCrawler on systems you own or have explicit written permission to test. Unauthorized scanning may be illegal in your jurisdiction.

## Support

For issues or questions:
- Check the script's help: `python3 phantomcrawler.py --help`
- Review the generated reports for detailed findings
- Ensure you have the latest version of dependencies

## Uninstallation

To remove PhantomCrawler:

```bash
# Remove the directory
rm -rf ~/security-tools/phantomcrawler

# Remove symlink (if created)
sudo rm /usr/local/bin/phantomcrawler

# Uninstall Python packages (if not used by other tools)
pip3 uninstall requests beautifulsoup4 colorama lxml certifi urllib3
```