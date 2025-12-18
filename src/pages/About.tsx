import { Shield, Target, Users, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About TheInsuranceTools</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            TheInsuranceTools was founded with a simple mission: to make insurance planning accessible, understandable, and straightforward for everyone. We believe that making informed decisions about insurance coverage shouldn't be complicated or overwhelming.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-secondary p-6 rounded-lg">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower individuals and families with the knowledge and tools they need to make confident insurance decisions that protect what matters most.
              </p>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-muted-foreground">
                We are committed to transparency, accuracy, and providing unbiased information that serves the best interests of our users, not insurance companies.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">What We Offer</h2>
          
          <div className="space-y-6 mb-12">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Guides</h3>
                <p className="text-muted-foreground">
                  Our detailed guides cover every aspect of insurance planning, from understanding policy terms to comparing different coverage options. We break down complex insurance concepts into easy-to-understand language that anyone can follow.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Powerful Tools</h3>
                <p className="text-muted-foreground">
                  Our premium calculators and comparison tools help you estimate costs and evaluate different insurance options. These tools are based on industry-standard formulas and updated regularly to reflect current market conditions.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Content</h3>
                <p className="text-muted-foreground">
                  Our blog features articles written by insurance professionals with decades of combined experience. We cover current trends, policy changes, and provide actionable advice for managing your insurance needs.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Unbiased Information</h3>
                <p className="text-muted-foreground">
                  We are not affiliated with any insurance company or broker. This independence allows us to provide objective information focused solely on helping you make the best decisions for your unique situation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Our Commitment to You</h2>
          
          <p className="mb-4">
            At TheInsuranceTools, we understand that insurance is about protecting what you value most – your health, your family, your home, and your financial future. That's why we're committed to:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
              <span><strong>Accuracy:</strong> All our content is thoroughly researched and regularly updated to ensure you have the most current and accurate information.</span>
            </li>
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
              <span><strong>Transparency:</strong> We clearly explain how our tools work and what factors influence insurance costs and coverage options.</span>
            </li>
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
              <span><strong>Accessibility:</strong> Our tools and resources are free to use and designed to be accessible to everyone, regardless of their insurance knowledge.</span>
            </li>
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
              <span><strong>Privacy:</strong> We respect your privacy and do not sell or share your personal information with insurance companies or third parties.</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6">Get Started Today</h2>
          
          <p className="mb-4">
            Whether you're shopping for your first insurance policy or reviewing your existing coverage, TheInsuranceTools is here to help. Browse our insurance guides, use our calculators, read our blog articles, or contact us with any questions.
          </p>

          <p className="text-muted-foreground italic">
            Remember: While we provide comprehensive information and tools, we always recommend consulting with licensed insurance professionals before making final decisions about your coverage.
          </p>
        </div>
      </div>
    </div>
  )
}
