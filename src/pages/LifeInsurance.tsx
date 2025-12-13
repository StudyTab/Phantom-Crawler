import { Link } from 'react-router-dom'
import { Shield, DollarSign, FileText, CheckCircle } from 'lucide-react'

export default function LifeInsurance() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Life Insurance Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive information about life insurance to help you protect your loved ones' financial future
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6">What is Life Insurance?</h2>
          <p>
            Life insurance is a contract between you and an insurance company where you pay premiums in exchange for a death benefit that is paid to your beneficiaries when you pass away. This financial protection helps your loved ones maintain their standard of living, pay off debts, and cover final expenses.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Types of Life Insurance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Term Life Insurance</h4>
              <p className="text-muted-foreground mb-4">
                Provides coverage for a specific period (10, 20, or 30 years). It's the most affordable option with straightforward coverage.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Lower premiums</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Simple and easy to understand</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Coverage expires at end of term</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>No cash value accumulation</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Whole Life Insurance</h4>
              <p className="text-muted-foreground mb-4">
                Provides lifetime coverage with a cash value component that grows over time.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Lifetime coverage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Builds cash value over time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Fixed premiums throughout life</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Significantly higher premiums</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Universal Life Insurance</h4>
              <p className="text-muted-foreground mb-4">
                A flexible permanent life insurance option with adjustable premiums and death benefits.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Flexible premium payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Adjustable death benefit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Cash value grows with interest</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>More complex than term life</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Variable Life Insurance</h4>
              <p className="text-muted-foreground mb-4">
                Permanent insurance with cash value invested in securities like stocks and bonds.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Investment opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Potential for higher returns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Investment risk involved</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Complex product requiring management</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">How Much Life Insurance Do You Need?</h3>
          <p>
            Determining the right amount of life insurance coverage requires careful consideration of several factors:
          </p>
          <ul className="space-y-3 mb-6">
            <li><strong>Income Replacement:</strong> Multiply your annual income by 10-12 to ensure your family can maintain their lifestyle</li>
            <li><strong>Outstanding Debts:</strong> Include mortgage, car loans, student loans, and credit card debt</li>
            <li><strong>Future Expenses:</strong> Consider college education costs for children and other long-term expenses</li>
            <li><strong>Final Expenses:</strong> Account for funeral costs, medical bills, and estate settlement costs</li>
            <li><strong>Existing Assets:</strong> Subtract savings, investments, and existing life insurance from total needs</li>
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-4">Factors Affecting Life Insurance Premiums</h3>
          <p>
            Insurance companies consider multiple factors when calculating your premium:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 not-prose">
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Age</h5>
              <p className="text-sm text-muted-foreground">Younger applicants typically receive lower premiums</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Health Status</h5>
              <p className="text-sm text-muted-foreground">Better health means lower premiums; medical exams are often required</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Lifestyle Habits</h5>
              <p className="text-sm text-muted-foreground">Smoking, excessive drinking, and risky hobbies increase costs</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Gender</h5>
              <p className="text-sm text-muted-foreground">Women typically pay lower premiums due to longer life expectancy</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Coverage Amount</h5>
              <p className="text-sm text-muted-foreground">Higher death benefits result in higher premiums</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Policy Type</h5>
              <p className="text-sm text-muted-foreground">Permanent insurance costs significantly more than term insurance</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">Life Insurance for Different Life Stages</h3>
          
          <h4 className="text-xl font-semibold mt-6 mb-3">Young Adults (20s-30s)</h4>
          <p>
            Even if you're young and single, life insurance can protect co-signed loans and help family members cover funeral expenses. If you have dependents, term life insurance is usually the most affordable option. Premiums are lowest when you're young and healthy, making it an ideal time to secure coverage.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-3">Families with Children</h4>
          <p>
            Parents need substantial coverage to ensure their children's needs are met, including education costs and daily living expenses. Consider 20-30 year term policies that last until children are financially independent. Both parents should have coverage, even if one stays at home, as childcare costs would impact the surviving parent.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-3">Approaching Retirement</h4>
          <p>
            As you near retirement, evaluate whether you still need life insurance. If your mortgage is paid off, children are independent, and you have adequate retirement savings, you may need less coverage. However, life insurance can still be useful for estate planning, leaving a legacy, or covering final expenses.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Tips for Buying Life Insurance</h3>
          <ol className="space-y-3 mb-6">
            <li><strong>Buy Early:</strong> Premiums increase with age, so purchasing coverage while young saves money long-term</li>
            <li><strong>Shop Around:</strong> Compare quotes from multiple insurers as prices can vary significantly</li>
            <li><strong>Be Honest:</strong> Provide accurate information on applications to avoid claim denials later</li>
            <li><strong>Review Regularly:</strong> Reassess your coverage needs as your life circumstances change</li>
            <li><strong>Consider Laddering:</strong> Use multiple term policies of different lengths to match changing needs</li>
            <li><strong>Read the Fine Print:</strong> Understand policy exclusions, riders, and conversion options</li>
          </ol>

          <h3 className="text-2xl font-bold mt-8 mb-4">Common Life Insurance Riders</h3>
          <p>
            Riders are additional benefits you can add to your policy for extra cost:
          </p>
          <ul className="space-y-2 mb-6">
            <li><strong>Accidental Death Benefit:</strong> Pays additional benefits if death is from an accident</li>
            <li><strong>Waiver of Premium:</strong> Waives premiums if you become disabled and cannot work</li>
            <li><strong>Accelerated Death Benefit:</strong> Allows early payout if diagnosed with terminal illness</li>
            <li><strong>Child Term Rider:</strong> Adds coverage for children at a low cost</li>
            <li><strong>Guaranteed Insurability:</strong> Allows purchasing additional coverage without medical exam</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Link to="/calculator" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Calculate Coverage</h3>
            <p className="opacity-90">Estimate your life insurance needs</p>
          </Link>

          <Link to="/compare" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <FileText className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Compare Policies</h3>
            <p className="opacity-90">Find the best life insurance option</p>
          </Link>

          <Link to="/blog" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Read More</h3>
            <p className="opacity-90">Explore our life insurance articles</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
