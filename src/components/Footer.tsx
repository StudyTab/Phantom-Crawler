import { Link } from 'react-router-dom'
import { Shield, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">TheInsuranceTools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for comprehensive insurance guidance and tools.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Insurance Types</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/health-insurance" className="hover:text-primary transition">Health Insurance</Link></li>
              <li><Link to="/life-insurance" className="hover:text-primary transition">Life Insurance</Link></li>
              <li><Link to="/auto-insurance" className="hover:text-primary transition">Auto Insurance</Link></li>
              <li><Link to="/home-insurance" className="hover:text-primary transition">Home Insurance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-primary transition">Blog</Link></li>
              <li><Link to="/calculator" className="hover:text-primary transition">Premium Calculator</Link></li>
              <li><Link to="/compare" className="hover:text-primary transition">Compare Plans</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@theinsurancetools.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-INSURANCE</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-sm text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TheInsuranceTools. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This website provides general insurance information and tools. Always consult with licensed insurance professionals for specific advice.</p>
        </div>
      </div>
    </footer>
  )
}
