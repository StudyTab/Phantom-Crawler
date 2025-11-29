import { Link } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <span className="font-bold text-xl">TheInsuranceTools</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:opacity-80 transition">Home</Link>
            <Link to="/about" className="hover:opacity-80 transition">About</Link>
            <Link to="/blog" className="hover:opacity-80 transition">Blog</Link>
            <Link to="/calculator" className="hover:opacity-80 transition">Calculator</Link>
            <Link to="/compare" className="hover:opacity-80 transition">Compare</Link>
            <Link to="/faq" className="hover:opacity-80 transition">FAQ</Link>
            <Link to="/contact" className="hover:opacity-80 transition">Contact</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/blog" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/calculator" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>Calculator</Link>
            <Link to="/compare" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>Compare</Link>
            <Link to="/faq" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>FAQ</Link>
            <Link to="/contact" className="block py-2 hover:opacity-80" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
