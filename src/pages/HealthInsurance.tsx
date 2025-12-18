import { Link } from 'react-router-dom'
import { Heart, Shield, DollarSign, Users, FileText, CheckCircle } from 'lucide-react'

export default function HealthInsurance() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Health Insurance Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about choosing and managing health insurance coverage for you and your family
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold mb-6">Understanding Health Insurance</h2>
          <p>
            Health insurance is a contract between you and an insurance company where you pay premiums in exchange for coverage of medical expenses. When you have health insurance, you share the cost of your healthcare with your insurance company, which helps protect you from high medical costs.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Types of Health Insurance Plans</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">HMO (Health Maintenance Organization)</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Lower premiums and out-of-pocket costs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Requires choosing a primary care physician</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Referrals needed for specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Limited to network providers</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">PPO (Preferred Provider Organization)</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>More flexibility in choosing providers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>No referrals needed for specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Can see out-of-network doctors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Higher premiums and costs</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">EPO (Exclusive Provider Organization)</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Must use network providers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>No referrals needed for specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Lower costs than PPO</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>No out-of-network coverage except emergencies</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">HDHP (High Deductible Health Plan)</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Lower monthly premiums</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>High deductible before coverage starts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Can pair with HSA for tax benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Best for healthy individuals</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">Key Health Insurance Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 not-prose">
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Premium</h5>
              <p className="text-sm text-muted-foreground">The amount you pay monthly or annually to maintain your insurance coverage</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Deductible</h5>
              <p className="text-sm text-muted-foreground">The amount you pay out-of-pocket before your insurance starts covering costs</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Copayment (Copay)</h5>
              <p className="text-sm text-muted-foreground">A fixed amount you pay for covered services like doctor visits or prescriptions</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Coinsurance</h5>
              <p className="text-sm text-muted-foreground">The percentage of costs you pay after meeting your deductible</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Out-of-Pocket Maximum</h5>
              <p className="text-sm text-muted-foreground">The most you will pay in a year; after this, insurance covers 100%</p>
            </div>
            <div className="border border-border p-4 rounded-lg">
              <h5 className="font-bold mb-2">Network</h5>
              <p className="text-sm text-muted-foreground">The group of doctors, hospitals, and providers contracted with your insurance</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">Choosing the Right Health Insurance Plan</h3>
          <p>
            When selecting a health insurance plan, consider these important factors:
          </p>
          <ul className="space-y-3 mb-6">
            <li><strong>Your Health Needs:</strong> Consider your current health status, medications, and expected medical needs for the year</li>
            <li><strong>Budget:</strong> Balance monthly premiums with deductibles and out-of-pocket costs</li>
            <li><strong>Doctors and Hospitals:</strong> Check if your preferred providers are in the plan's network</li>
            <li><strong>Prescription Coverage:</strong> Review the plan's formulary to ensure your medications are covered</li>
            <li><strong>Family Considerations:</strong> Account for the needs of all family members if purchasing family coverage</li>
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-4">Common Health Insurance Mistakes to Avoid</h3>
          <ol className="space-y-3 mb-6">
            <li><strong>Choosing Based on Premium Alone:</strong> A low premium plan may have high deductibles and out-of-pocket costs</li>
            <li><strong>Not Checking the Network:</strong> Going out-of-network can result in significantly higher costs</li>
            <li><strong>Ignoring Prescription Coverage:</strong> Make sure your medications are covered under the plan's formulary</li>
            <li><strong>Overlooking Preventive Care:</strong> Take advantage of free preventive services to maintain good health</li>
            <li><strong>Missing Open Enrollment:</strong> Mark your calendar and review options during the enrollment period</li>
          </ol>

          <h3 className="text-2xl font-bold mt-8 mb-4">Health Savings Accounts (HSAs)</h3>
          <p>
            If you have a High Deductible Health Plan (HDHP), you may be eligible for a Health Savings Account (HSA). HSAs offer triple tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. They can be a powerful tool for managing healthcare costs and saving for retirement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Link to="/calculator" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Calculate Premiums</h3>
            <p className="opacity-90">Estimate your health insurance costs</p>
          </Link>

          <Link to="/compare" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <FileText className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Compare Plans</h3>
            <p className="opacity-90">Find the best health insurance option</p>
          </Link>

          <Link to="/blog" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Read More</h3>
            <p className="opacity-90">Explore our health insurance articles</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
