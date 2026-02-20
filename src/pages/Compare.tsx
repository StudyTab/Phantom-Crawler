import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GitCompare, Shield, Heart, Car, Home, CheckCircle, XCircle, ArrowRight, Star, Info } from 'lucide-react'

export default function InsuranceCompare() {
  const [comparisonType, setComparisonType] = useState<'health' | 'life' | 'auto' | 'home'>('health')

  const healthPlans = [
    {
      name: 'Bronze Plan',
      premium: '$250/mo',
      deductible: '$6,500',
      outOfPocket: '$8,700',
      coverage: '60%',
      bestFor: 'Healthy individuals who rarely need care',
      pros: ['Lowest premiums', 'HSA eligible', 'Preventive care covered'],
      cons: ['Highest deductible', 'High out-of-pocket costs', 'May discourage seeking care']
    },
    {
      name: 'Silver Plan',
      premium: '$350/mo',
      deductible: '$4,000',
      outOfPocket: '$8,150',
      coverage: '70%',
      bestFor: 'Moderate healthcare users, families',
      pros: ['Balanced costs', 'Cost-sharing reductions available', 'Good for moderate use'],
      cons: ['Middle-ground option', 'Still significant deductible']
    },
    {
      name: 'Gold Plan',
      premium: '$450/mo',
      deductible: '$1,400',
      outOfPocket: '$7,500',
      coverage: '80%',
      bestFor: 'Those with regular medical needs',
      pros: ['Lower deductible', 'More predictable costs', 'Good for prescriptions'],
      cons: ['Higher premiums', 'Less HSA advantage']
    },
    {
      name: 'Platinum Plan',
      premium: '$550/mo',
      deductible: '$250',
      outOfPocket: '$4,500',
      coverage: '90%',
      bestFor: 'High healthcare users, chronic conditions',
      pros: ['Lowest out-of-pocket', 'Minimal deductible', 'Most predictable'],
      cons: ['Highest premiums', 'May overpay if healthy']
    }
  ]

  const lifePlans = [
    {
      name: 'Term Life (20 Year)',
      premium: '$25/mo for $500k',
      features: ['Coverage for 20 years', 'Level premiums', 'No cash value'],
      bestFor: 'Income replacement, mortgage protection',
      pros: ['Most affordable', 'Simple to understand', 'Maximum coverage per dollar'],
      cons: ['Expires after term', 'No equity built', 'Renewal can be expensive']
    },
    {
      name: 'Term Life (30 Year)',
      premium: '$40/mo for $500k',
      features: ['Coverage for 30 years', 'Level premiums', 'No cash value'],
      bestFor: 'Longer-term family protection',
      pros: ['Extended protection', 'Still affordable', 'Covers full working years'],
      cons: ['Higher than 20-year', 'Still temporary', 'No cash value']
    },
    {
      name: 'Whole Life',
      premium: '$350/mo for $500k',
      features: ['Lifetime coverage', 'Fixed premiums', 'Cash value grows'],
      bestFor: 'Estate planning, lifetime coverage needs',
      pros: ['Never expires', 'Builds cash value', 'Guaranteed death benefit'],
      cons: ['Much higher premiums', 'Complex product', 'Slow cash growth']
    },
    {
      name: 'Universal Life',
      premium: '$275/mo for $500k',
      features: ['Flexible premiums', 'Adjustable death benefit', 'Cash value'],
      bestFor: 'Those wanting flexibility with permanent coverage',
      pros: ['Premium flexibility', 'Can adjust coverage', 'Cash value access'],
      cons: ['Complex to manage', 'Risk of lapse', 'Interest rate dependent']
    }
  ]

  const autoPlans = [
    {
      name: 'Basic Liability',
      premium: '$50/mo',
      coverage: 'State minimum liability only',
      deductible: 'N/A',
      bestFor: 'Older vehicles, tight budgets',
      includes: ['Bodily injury liability', 'Property damage liability'],
      excludes: ['Collision', 'Comprehensive', 'Uninsured motorist']
    },
    {
      name: 'Standard Coverage',
      premium: '$100/mo',
      coverage: '100/300/100 liability + UM',
      deductible: '$1,000',
      bestFor: 'Most drivers, balanced protection',
      includes: ['Higher liability limits', 'Uninsured motorist', 'Medical payments'],
      excludes: ['Collision', 'Comprehensive']
    },
    {
      name: 'Full Coverage',
      premium: '$150/mo',
      coverage: 'Comprehensive protection',
      deductible: '$500',
      bestFor: 'Newer vehicles, financed cars',
      includes: ['All liability coverage', 'Collision', 'Comprehensive', 'Rental car'],
      excludes: ['Gap insurance']
    },
    {
      name: 'Premium Coverage',
      premium: '$200/mo',
      coverage: 'Maximum protection',
      deductible: '$250',
      bestFor: 'Luxury vehicles, high assets',
      includes: ['All standard coverages', 'Gap insurance', 'OEM parts', 'Accident forgiveness'],
      excludes: []
    }
  ]

  const homePlans = [
    {
      name: 'Basic HO-3',
      premium: '$100/mo',
      dwelling: '$300,000',
      personal: '$150,000',
      liability: '$100,000',
      deductible: '$2,500',
      bestFor: 'Budget-conscious homeowners',
      covers: ['Fire', 'Lightning', 'Wind', 'Theft'],
      excludes: ['Flood', 'Earthquake', 'Maintenance']
    },
    {
      name: 'Standard HO-3',
      premium: '$150/mo',
      dwelling: '$300,000',
      personal: '$150,000',
      liability: '$300,000',
      deductible: '$1,000',
      bestFor: 'Most homeowners',
      covers: ['All basic perils', 'Higher liability', 'Water backup'],
      excludes: ['Flood', 'Earthquake']
    },
    {
      name: 'Enhanced HO-5',
      premium: '$200/mo',
      dwelling: '$300,000',
      personal: '$150,000',
      liability: '$500,000',
      deductible: '$500',
      bestFor: 'Comprehensive protection seekers',
      covers: ['Open perils on contents', 'Replacement cost', 'Identity theft'],
      excludes: ['Flood', 'Earthquake']
    },
    {
      name: 'Premium Package',
      premium: '$300/mo',
      dwelling: '$300,000',
      personal: '$200,000',
      liability: '$1,000,000',
      deductible: '$250',
      bestFor: 'High-value homes, maximum protection',
      covers: ['All enhanced features', 'Umbrella policy', 'Scheduled items'],
      excludes: ['Flood, Earthquake (available as rider)']
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <GitCompare className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Compare Insurance Plans</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Side-by-side comparison of insurance plans to help you find the coverage that best fits your needs and budget
          </p>
        </div>

        {/* Comparison Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { type: 'health' as const, icon: Heart, label: 'Health Plans' },
            { type: 'life' as const, icon: Shield, label: 'Life Insurance' },
            { type: 'auto' as const, icon: Car, label: 'Auto Insurance' },
            { type: 'home' as const, icon: Home, label: 'Home Insurance' }
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => setComparisonType(item.type)}
              className={`p-4 rounded-lg border-2 transition text-center ${
                comparisonType === item.type 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <item.icon className={`h-8 w-8 mx-auto mb-2 ${comparisonType === item.type ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`font-medium ${comparisonType === item.type ? 'text-primary' : ''}`}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Health Plan Comparison */}
        {comparisonType === 'health' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Health Insurance Plan Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {healthPlans.map((plan, index) => (
                <div key={plan.name} className={`bg-secondary rounded-lg p-6 ${index === 1 ? 'ring-2 ring-primary' : ''}`}>
                  {index === 1 && (
                    <div className="flex items-center justify-center mb-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" /> Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-4">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary">{plan.premium}</p>
                    <p className="text-sm text-muted-foreground">monthly premium</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deductible</span>
                      <span className="font-medium">{plan.deductible}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Out-of-Pocket Max</span>
                      <span className="font-medium">{plan.outOfPocket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">{plan.coverage}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Best for:</p>
                    <p className="text-sm font-medium">{plan.bestFor}</p>
                  </div>
                  <div className="space-y-2">
                    {plan.pros.map((pro) => (
                      <div key={pro} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                    {plan.cons.map((con) => (
                      <div key={con} className="flex items-start text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Life Insurance Comparison */}
        {comparisonType === 'life' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Life Insurance Plan Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {lifePlans.map((plan, index) => (
                <div key={plan.name} className={`bg-secondary rounded-lg p-6 ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
                  {index === 0 && (
                    <div className="flex items-center justify-center mb-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" /> Best Value
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-4">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <p className="text-2xl font-bold text-primary">{plan.premium}</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Best for:</p>
                    <p className="text-sm font-medium">{plan.bestFor}</p>
                  </div>
                  <div className="space-y-2">
                    {plan.pros.map((pro) => (
                      <div key={pro} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                    {plan.cons.map((con) => (
                      <div key={con} className="flex items-start text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Auto Insurance Comparison */}
        {comparisonType === 'auto' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Auto Insurance Plan Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {autoPlans.map((plan, index) => (
                <div key={plan.name} className={`bg-secondary rounded-lg p-6 ${index === 2 ? 'ring-2 ring-primary' : ''}`}>
                  {index === 2 && (
                    <div className="flex items-center justify-center mb-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" /> Recommended
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-4">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary">{plan.premium}</p>
                    <p className="text-sm text-muted-foreground">{plan.coverage}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deductible</span>
                      <span className="font-medium">{plan.deductible}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Best for:</p>
                    <p className="text-sm font-medium">{plan.bestFor}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-green-600">Includes:</p>
                    {plan.includes.map((item) => (
                      <div key={item} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  {plan.excludes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-red-600">Excludes:</p>
                      {plan.excludes.map((item) => (
                        <div key={item} className="flex items-start text-sm text-muted-foreground">
                          <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Home Insurance Comparison */}
        {comparisonType === 'home' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Home Insurance Plan Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {homePlans.map((plan, index) => (
                <div key={plan.name} className={`bg-secondary rounded-lg p-6 ${index === 1 ? 'ring-2 ring-primary' : ''}`}>
                  {index === 1 && (
                    <div className="flex items-center justify-center mb-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" /> Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-4">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary">{plan.premium}</p>
                    <p className="text-sm text-muted-foreground">monthly premium</p>
                  </div>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dwelling</span>
                      <span>{plan.dwelling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Personal Property</span>
                      <span>{plan.personal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Liability</span>
                      <span>{plan.liability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deductible</span>
                      <span>{plan.deductible}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Best for:</p>
                    <p className="text-sm font-medium">{plan.bestFor}</p>
                  </div>
                  <div className="space-y-2">
                    {plan.covers.map((item) => (
                      <div key={item} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                    {plan.excludes.map((item) => (
                      <div key={item} className="flex items-start text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Compare Insurance Plans: A Comprehensive Guide</h2>
          
          <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=400&fit=crop" alt="Comparing insurance options and making informed decisions" className="w-full h-64 object-cover rounded-lg mb-8" />
          
          <p className="lead">Choosing the right insurance plan requires more than just comparing monthly premiums. The cheapest option isn't always the best value, and the most expensive plan might include coverage you don't need. This guide teaches you how to compare insurance plans effectively, ensuring you get the protection you need at a price that fits your budget.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">The Art of Insurance Comparison</h3>
          <p>Effective insurance comparison is both an art and a science. It requires understanding your personal risk profile, anticipating future needs, and weighing the trade-offs between premiums, coverage levels, and out-of-pocket costs. Many consumers make the mistake of focusing solely on monthly premiums, but this approach often leads to inadequate coverage or higher total costs when claims occur.</p>

          <p>The goal of comparison shopping isn't necessarily to find the cheapest insurance – it's to find the best value. Value means getting appropriate coverage at a fair price, with a reputable insurer who will pay claims promptly and fairly when you need them most.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">Understanding Total Cost of Insurance</h3>
          <p>The true cost of insurance extends far beyond the monthly premium. To accurately compare plans, you must consider all potential costs:</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Premium Costs</h4>
          <p>This is what you pay regularly (monthly, quarterly, or annually) to maintain coverage. While it's the most visible cost, it's only part of the equation. Lower premiums often come with trade-offs in coverage or higher out-of-pocket costs when you file claims.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Deductibles</h4>
          <p>The amount you must pay before insurance coverage kicks in. Higher deductibles mean lower premiums but more out-of-pocket expense when claims occur. Consider how likely you are to file claims and whether you could comfortably pay the deductible if needed.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Copayments and Coinsurance</h4>
          <p>For health insurance especially, these ongoing cost-sharing mechanisms significantly impact total costs. A plan with low premiums but high coinsurance (like 40%) could cost much more than a higher-premium plan with lower coinsurance (like 20%) if you need significant medical care.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Out-of-Pocket Maximums</h4>
          <p>This ceiling on your annual spending provides crucial protection against catastrophic costs. Lower out-of-pocket maximums offer more protection but typically come with higher premiums. Consider your risk tolerance and ability to handle unexpected expenses.</p>

          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop" alt="Analyzing insurance data and comparing coverage options" className="rounded-lg my-8 w-full" />

          <h3 className="text-2xl font-bold mt-10 mb-4">Coverage Quality: Beyond the Numbers</h3>
          <p>Raw numbers tell only part of the story. The quality and breadth of coverage matter enormously when you actually need to use your insurance. Consider these qualitative factors:</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Policy Exclusions</h4>
          <p>What isn't covered can be as important as what is. Common exclusions vary by insurance type:</p>
          <ul className="space-y-2 mb-6">
            <li><strong>Health insurance:</strong> Experimental treatments, cosmetic procedures, certain alternative therapies</li>
            <li><strong>Homeowners insurance:</strong> Floods, earthquakes, gradual damage, maintenance issues</li>
            <li><strong>Auto insurance:</strong> Racing, commercial use, intentional damage</li>
            <li><strong>Life insurance:</strong> Suicide (in first 2 years), dangerous activities, material misrepresentation</li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-3">Coverage Limits</h4>
          <p>Maximum amounts the insurer will pay per incident, per year, or per lifetime. Inadequate limits can leave you exposed to significant costs even with insurance. Ensure limits align with potential losses – a $100,000 liability limit may be insufficient if you're sued after a serious accident.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Network Restrictions (Health Insurance)</h4>
          <p>The size and quality of provider networks significantly impacts your healthcare access. A low-premium plan means nothing if your doctors aren't in-network or the nearest hospital is hours away. Always verify that your preferred providers participate before choosing a plan.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">Comparing Insurance Companies</h3>
          <p>Not all insurers are created equal. Beyond comparing plans, evaluate the companies offering them:</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Financial Strength</h4>
          <p>Insurance is a promise to pay future claims. Companies with poor financial health may struggle to honor that promise. Check ratings from agencies like A.M. Best, Standard & Poor's, Moody's, and Fitch. Look for ratings of A or better for long-term reliability.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Claims Satisfaction</h4>
          <p>How an insurer handles claims matters enormously when you need them. Research customer satisfaction ratings from J.D. Power, Consumer Reports, and the National Association of Insurance Commissioners (NAIC) complaint index. A slightly cheaper policy from a company with poor claims handling may prove far more expensive in practice.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Customer Service</h4>
          <p>Consider how you prefer to interact with your insurer. Some offer excellent digital tools and apps; others excel at personal service through local agents. Think about your preferences for managing policies, filing claims, and getting questions answered.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">Step-by-Step Comparison Process</h3>
          <p>Follow this systematic approach to compare insurance options effectively:</p>

          <ol className="space-y-4 mb-6">
            <li><strong>Step 1: Assess Your Needs</strong> – Before comparing plans, understand what you're protecting against. Consider your assets, income, health status, dependents, and risk tolerance. Different life situations call for different coverage priorities.</li>
            <li><strong>Step 2: Determine Coverage Requirements</strong> – Decide on minimum acceptable coverage levels. For auto insurance, this might be 100/300/100 liability. For health insurance, consider how much out-of-pocket exposure you can handle.</li>
            <li><strong>Step 3: Gather Quotes</strong> – Collect quotes from at least 5-7 insurers. Include major national carriers, regional companies, and direct insurers. Use independent agents who can compare multiple options.</li>
            <li><strong>Step 4: Create a Comparison Matrix</strong> – Organize quotes in a spreadsheet comparing premiums, deductibles, coverage limits, and key features side by side. This visual comparison makes differences clear.</li>
            <li><strong>Step 5: Calculate Total Potential Costs</strong> – For each option, estimate total annual costs under different scenarios: best case (no claims), moderate use, and worst case (major claim). This reveals which plans are actually most cost-effective.</li>
            <li><strong>Step 6: Evaluate Qualitative Factors</strong> – Consider company reputation, claims handling, network quality, and customer service. Price matters, but so does knowing your insurer will perform when needed.</li>
            <li><strong>Step 7: Make an Informed Decision</strong> – Choose the plan that offers the best balance of coverage, cost, and quality for your situation. Remember that the cheapest option isn't always the best value.</li>
          </ol>

          <h3 className="text-2xl font-bold mt-10 mb-4">Common Comparison Mistakes to Avoid</h3>
          <ul className="space-y-2 mb-6">
            <li><strong>Comparing unlike policies:</strong> Ensure you're comparing equivalent coverage levels, not just premiums</li>
            <li><strong>Ignoring deductibles:</strong> A $200/month policy with a $500 deductible may cost less than a $150/month policy with a $2,500 deductible if you file claims</li>
            <li><strong>Overlooking coverage gaps:</strong> The cheapest policy may exclude critical coverage you need</li>
            <li><strong>Focusing only on price:</strong> Company reputation and claims handling matter enormously</li>
            <li><strong>Not reading the fine print:</strong> Exclusions and limitations often hide in policy details</li>
            <li><strong>Assuming all companies are equal:</strong> Financial strength and customer service vary dramatically</li>
            <li><strong>Failing to bundle:</strong> Multi-policy discounts can make comprehensive coverage more affordable</li>
          </ul>

          <p>For more guidance on finding the best insurance coverage, explore our detailed guides on <a href="/health-insurance">health insurance</a> and <a href="/life-insurance">life insurance</a>. You can also use our <a href="/calculator">insurance calculator</a> to estimate your coverage needs, or read our <a href="/blog/saving-money-on-insurance-premiums">tips for saving on premiums</a>.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">Making Your Final Decision</h3>
          <p>After thorough comparison, trust your analysis but also trust your instincts. If a deal seems too good to be true, investigate further. If you're unsure about coverage adequacy, err on the side of more protection – the cost difference is usually modest compared to the protection gained.</p>

          <p>Remember that insurance is about peace of mind as much as financial protection. Choose coverage that lets you sleep at night knowing your family, health, home, and vehicles are properly protected against life's uncertainties.</p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Plan?</h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Use our calculator to get personalized estimates, or contact us for expert guidance on choosing the right coverage for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center">
              Use Calculator <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link to="/contact" className="border border-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/health-insurance" className="bg-secondary p-6 rounded-lg hover:shadow-lg transition">
            <Heart className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Health Insurance Guide</h3>
            <p className="text-muted-foreground text-sm">Comprehensive guide to health coverage options</p>
          </Link>

          <Link to="/life-insurance" className="bg-secondary p-6 rounded-lg hover:shadow-lg transition">
            <Shield className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Life Insurance Guide</h3>
            <p className="text-muted-foreground text-sm">Protect your family's financial future</p>
          </Link>

          <Link to="/blog" className="bg-secondary p-6 rounded-lg hover:shadow-lg transition">
            <Info className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Insurance Blog</h3>
            <p className="text-muted-foreground text-sm">Expert tips, guides, and insights</p>
          </Link>
        </div>
      </div>
    </div>
  )
}