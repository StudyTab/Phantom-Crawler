import { Link } from 'react-router-dom'
import { Shield, Calculator, BarChart3, BookOpen, Heart, Car, Home as HomeIcon, FileText } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Complete Insurance Planning Partner
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Compare plans, calculate premiums, and make informed decisions about your insurance coverage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              Calculate Premiums
            </Link>
            <Link to="/compare" className="bg-transparent border-2 border-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Insurance Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/health-insurance" className="group">
              <div className="bg-secondary p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">Health Insurance</h3>
                <p className="text-muted-foreground">Comprehensive health coverage options for you and your family</p>
              </div>
            </Link>
            
            <Link to="/life-insurance" className="group">
              <div className="bg-secondary p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">Life Insurance</h3>
                <p className="text-muted-foreground">Protect your loved ones with the right life insurance policy</p>
              </div>
            </Link>
            
            <Link to="/auto-insurance" className="group">
              <div className="bg-secondary p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Car className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">Auto Insurance</h3>
                <p className="text-muted-foreground">Find the best coverage for your vehicle at competitive rates</p>
              </div>
            </Link>
            
            <Link to="/home-insurance" className="group">
              <div className="bg-secondary p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <HomeIcon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">Home Insurance</h3>
                <p className="text-muted-foreground">Secure your home and belongings with proper insurance</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Insurance Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/calculator" className="bg-background p-8 rounded-lg hover:shadow-xl transition">
              <Calculator className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Calculator</h3>
              <p className="text-muted-foreground">Estimate your insurance premiums based on your specific needs and circumstances</p>
            </Link>
            
            <Link to="/compare" className="bg-background p-8 rounded-lg hover:shadow-xl transition">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Plan Comparison</h3>
              <p className="text-muted-foreground">Compare different insurance plans side-by-side to find the best option</p>
            </Link>
            
            <Link to="/blog" className="bg-background p-8 rounded-lg hover:shadow-xl transition">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Insurance Blog</h3>
              <p className="text-muted-foreground">Read expert articles and guides about insurance planning and coverage</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TheInsuranceTools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Information</h3>
                <p className="text-muted-foreground">Access detailed guides and resources covering all aspects of insurance planning, from basic concepts to advanced strategies.</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Free Tools</h3>
                <p className="text-muted-foreground">Use our premium calculators and comparison tools completely free to make informed decisions about your coverage.</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Content</h3>
                <p className="text-muted-foreground">Our blog features articles written by insurance professionals with years of industry experience and knowledge.</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Unbiased Guidance</h3>
                <p className="text-muted-foreground">We provide objective information to help you understand your options without any sales pressure or bias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Insurance Plan?</h2>
          <p className="text-xl mb-8 opacity-90">Start by exploring our tools and resources to make an informed decision</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              Get Started
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
