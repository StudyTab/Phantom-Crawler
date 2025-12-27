import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, DollarSign, Shield, Heart, Car, Home, ArrowRight, CheckCircle, Info } from 'lucide-react'

export default function InsuranceCalculator() {
  const [calculatorType, setCalculatorType] = useState<'life' | 'health' | 'auto' | 'home'>('life')
  const [formData, setFormData] = useState({
    // Life Insurance
    annualIncome: 75000,
    yearsToReplace: 10,
    existingDebts: 50000,
    futureCosts: 100000,
    existingCoverage: 0,
    // Health Insurance
    age: 30,
    familySize: 1,
    expectedVisits: 4,
    prescriptions: 2,
    // Auto Insurance
    vehicleValue: 25000,
    vehicleAge: 3,
    annualMileage: 12000,
    drivingRecord: 'clean',
    // Home Insurance
    homeValue: 300000,
    squareFootage: 2000,
    yearBuilt: 2000,
    deductiblePreference: 1000
  })

  const [results, setResults] = useState<any>(null)

  const calculateLifeInsurance = () => {
    const incomeReplacement = formData.annualIncome * formData.yearsToReplace
    const totalNeeds = incomeReplacement + formData.existingDebts + formData.futureCosts
    const recommendedCoverage = Math.max(0, totalNeeds - formData.existingCoverage)
    
    const estimatedMonthlyPremium = Math.round((recommendedCoverage / 1000) * 0.15)
    
    return {
      recommendedCoverage: Math.round(recommendedCoverage / 10000) * 10000,
      estimatedMonthlyPremium,
      breakdown: {
        incomeReplacement,
        debts: formData.existingDebts,
        futureCosts: formData.futureCosts,
        existingCoverage: formData.existingCoverage
      }
    }
  }

  const calculateHealthInsurance = () => {
    const baseMonthly = formData.age < 30 ? 250 : formData.age < 40 ? 350 : formData.age < 50 ? 450 : 600
    const familyMultiplier = formData.familySize === 1 ? 1 : formData.familySize === 2 ? 1.8 : 2.5
    
    const lowDeductible = Math.round(baseMonthly * familyMultiplier)
    const highDeductible = Math.round(baseMonthly * familyMultiplier * 0.6)
    
    const annualVisitCost = formData.expectedVisits * 150
    const prescriptionCost = formData.prescriptions * 50 * 12
    
    return {
      lowDeductiblePlan: {
        monthly: lowDeductible,
        annual: lowDeductible * 12,
        deductible: 500,
        estimatedTotal: lowDeductible * 12 + 500 + annualVisitCost * 0.2 + prescriptionCost * 0.2
      },
      highDeductiblePlan: {
        monthly: highDeductible,
        annual: highDeductible * 12,
        deductible: 3000,
        estimatedTotal: highDeductible * 12 + 3000 + annualVisitCost * 0.8 + prescriptionCost * 0.8,
        hsaContribution: 3850
      }
    }
  }

  const calculateAutoInsurance = () => {
    let baseRate = 100
    
    // Vehicle value factor
    baseRate += formData.vehicleValue / 500
    
    // Age factor
    if (formData.vehicleAge < 3) baseRate += 30
    else if (formData.vehicleAge > 10) baseRate -= 20
    
    // Mileage factor
    if (formData.annualMileage > 15000) baseRate += 25
    else if (formData.annualMileage < 8000) baseRate -= 15
    
    // Driving record
    if (formData.drivingRecord === 'accidents') baseRate *= 1.5
    else if (formData.drivingRecord === 'violations') baseRate *= 1.25
    
    const fullCoverage = Math.round(baseRate)
    const liabilityOnly = Math.round(baseRate * 0.4)
    
    return {
      fullCoverage: {
        monthly: fullCoverage,
        annual: fullCoverage * 12,
        includes: ['Liability', 'Collision', 'Comprehensive', 'Uninsured Motorist']
      },
      liabilityOnly: {
        monthly: liabilityOnly,
        annual: liabilityOnly * 12,
        includes: ['Liability Only']
      },
      recommendedDeductible: formData.vehicleValue > 20000 ? 500 : 1000
    }
  }

  const calculateHomeInsurance = () => {
    const baseRate = formData.homeValue * 0.003 / 12
    
    // Age adjustment
    const ageAdjustment = formData.yearBuilt < 1980 ? 1.2 : formData.yearBuilt > 2010 ? 0.9 : 1
    
    // Deductible adjustment
    const deductibleAdjustment = formData.deductiblePreference === 500 ? 1.15 : 
                                  formData.deductiblePreference === 2500 ? 0.85 : 1
    
    const monthly = Math.round(baseRate * ageAdjustment * deductibleAdjustment)
    
    return {
      monthly,
      annual: monthly * 12,
      dwellingCoverage: formData.homeValue,
      personalProperty: Math.round(formData.homeValue * 0.5),
      liability: 100000,
      deductible: formData.deductiblePreference
    }
  }

  const handleCalculate = () => {
    switch(calculatorType) {
      case 'life':
        setResults({ type: 'life', data: calculateLifeInsurance() })
        break
      case 'health':
        setResults({ type: 'health', data: calculateHealthInsurance() })
        break
      case 'auto':
        setResults({ type: 'auto', data: calculateAutoInsurance() })
        break
      case 'home':
        setResults({ type: 'home', data: calculateHomeInsurance() })
        break
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Calculator className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Insurance Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized estimates for your insurance needs. Our calculators help you understand coverage requirements and potential costs.
          </p>
        </div>

        {/* Calculator Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { type: 'life' as const, icon: Shield, label: 'Life Insurance' },
            { type: 'health' as const, icon: Heart, label: 'Health Insurance' },
            { type: 'auto' as const, icon: Car, label: 'Auto Insurance' },
            { type: 'home' as const, icon: Home, label: 'Home Insurance' }
          ].map((calc) => (
            <button
              key={calc.type}
              onClick={() => { setCalculatorType(calc.type); setResults(null); }}
              className={`p-4 rounded-lg border-2 transition text-center ${
                calculatorType === calc.type 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <calc.icon className={`h-8 w-8 mx-auto mb-2 ${calculatorType === calc.type ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`font-medium ${calculatorType === calc.type ? 'text-primary' : ''}`}>{calc.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">
              {calculatorType === 'life' && 'Life Insurance Calculator'}
              {calculatorType === 'health' && 'Health Insurance Calculator'}
              {calculatorType === 'auto' && 'Auto Insurance Calculator'}
              {calculatorType === 'home' && 'Home Insurance Calculator'}
            </h2>

            {calculatorType === 'life' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Annual Income</label>
                  <input
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({...formData, annualIncome: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Income to Replace</label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={formData.yearsToReplace}
                    onChange={(e) => setFormData({...formData, yearsToReplace: Number(e.target.value)})}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">{formData.yearsToReplace} years</span>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Existing Debts (Mortgage, Loans)</label>
                  <input
                    type="number"
                    value={formData.existingDebts}
                    onChange={(e) => setFormData({...formData, existingDebts: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Future Costs (Education, etc.)</label>
                  <input
                    type="number"
                    value={formData.futureCosts}
                    onChange={(e) => setFormData({...formData, futureCosts: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Existing Life Insurance Coverage</label>
                  <input
                    type="number"
                    value={formData.existingCoverage}
                    onChange={(e) => setFormData({...formData, existingCoverage: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            )}

            {calculatorType === 'health' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Family Size</label>
                  <select
                    value={formData.familySize}
                    onChange={(e) => setFormData({...formData, familySize: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value={1}>Individual</option>
                    <option value={2}>Couple</option>
                    <option value={3}>Family (3+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Doctor Visits Per Year</label>
                  <input
                    type="number"
                    value={formData.expectedVisits}
                    onChange={(e) => setFormData({...formData, expectedVisits: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Prescriptions</label>
                  <input
                    type="number"
                    value={formData.prescriptions}
                    onChange={(e) => setFormData({...formData, prescriptions: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            )}

            {calculatorType === 'auto' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle Value</label>
                  <input
                    type="number"
                    value={formData.vehicleValue}
                    onChange={(e) => setFormData({...formData, vehicleValue: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle Age (Years)</label>
                  <input
                    type="number"
                    value={formData.vehicleAge}
                    onChange={(e) => setFormData({...formData, vehicleAge: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Annual Mileage</label>
                  <input
                    type="number"
                    value={formData.annualMileage}
                    onChange={(e) => setFormData({...formData, annualMileage: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Driving Record</label>
                  <select
                    value={formData.drivingRecord}
                    onChange={(e) => setFormData({...formData, drivingRecord: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="clean">Clean Record</option>
                    <option value="violations">Minor Violations</option>
                    <option value="accidents">At-Fault Accidents</option>
                  </select>
                </div>
              </div>
            )}

            {calculatorType === 'home' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Home Value</label>
                  <input
                    type="number"
                    value={formData.homeValue}
                    onChange={(e) => setFormData({...formData, homeValue: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Square Footage</label>
                  <input
                    type="number"
                    value={formData.squareFootage}
                    onChange={(e) => setFormData({...formData, squareFootage: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Year Built</label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({...formData, yearBuilt: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Deductible</label>
                  <select
                    value={formData.deductiblePreference}
                    onChange={(e) => setFormData({...formData, deductiblePreference: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value={500}>$500</option>
                    <option value={1000}>$1,000</option>
                    <option value={2500}>$2,500</option>
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={handleCalculate}
              className="w-full mt-8 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Estimate
            </button>
          </div>

          {/* Results */}
          <div>
            {results ? (
              <div className="bg-primary/5 border border-primary/20 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 text-primary mr-2" />
                  Your Estimate
                </h2>

                {results.type === 'life' && (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-primary text-primary-foreground rounded-lg">
                      <p className="text-sm opacity-90 mb-2">Recommended Coverage</p>
                      <p className="text-4xl font-bold">{formatCurrency(results.data.recommendedCoverage)}</p>
                      <p className="text-sm opacity-90 mt-2">Est. Monthly Premium: {formatCurrency(results.data.estimatedMonthlyPremium)}</p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold">Coverage Breakdown:</h3>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Income Replacement</span>
                        <span>{formatCurrency(results.data.breakdown.incomeReplacement)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Debt Coverage</span>
                        <span>{formatCurrency(results.data.breakdown.debts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Future Costs</span>
                        <span>{formatCurrency(results.data.breakdown.futureCosts)}</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>Less: Existing Coverage</span>
                        <span>-{formatCurrency(results.data.breakdown.existingCoverage)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {results.type === 'health' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold mb-2">Low Deductible Plan</h3>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.data.lowDeductiblePlan.monthly)}/mo</p>
                        <p className="text-sm text-muted-foreground">Deductible: $500</p>
                        <p className="text-sm text-muted-foreground">Est. Annual Total: {formatCurrency(results.data.lowDeductiblePlan.estimatedTotal)}</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold mb-2">High Deductible Plan</h3>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.data.highDeductiblePlan.monthly)}/mo</p>
                        <p className="text-sm text-muted-foreground">Deductible: $3,000</p>
                        <p className="text-sm text-muted-foreground">Est. Annual Total: {formatCurrency(results.data.highDeductiblePlan.estimatedTotal)}</p>
                        <p className="text-sm text-primary mt-2">HSA Eligible!</p>
                      </div>
                    </div>
                  </div>
                )}

                {results.type === 'auto' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold mb-2">Full Coverage</h3>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.data.fullCoverage.monthly)}/mo</p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          {results.data.fullCoverage.includes.map((item: string) => (
                            <li key={item} className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-primary mr-1" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-semibold mb-2">Liability Only</h3>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.data.liabilityOnly.monthly)}/mo</p>
                        <p className="text-sm text-muted-foreground mt-2">Basic liability protection</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Recommended deductible: {formatCurrency(results.data.recommendedDeductible)}
                    </p>
                  </div>
                )}

                {results.type === 'home' && (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-primary text-primary-foreground rounded-lg">
                      <p className="text-sm opacity-90 mb-2">Estimated Monthly Premium</p>
                      <p className="text-4xl font-bold">{formatCurrency(results.data.monthly)}</p>
                      <p className="text-sm opacity-90 mt-2">Annual: {formatCurrency(results.data.annual)}</p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold">Coverage Estimates:</h3>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dwelling Coverage</span>
                        <span>{formatCurrency(results.data.dwellingCoverage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Personal Property</span>
                        <span>{formatCurrency(results.data.personalProperty)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Liability</span>
                        <span>{formatCurrency(results.data.liability)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deductible</span>
                        <span>{formatCurrency(results.data.deductible)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Disclaimer:</strong> These are estimates only. Actual premiums vary based on many factors including location, health history, and insurance provider. Always get quotes from multiple insurers for accurate pricing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/50 p-8 rounded-lg text-center">
                <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Enter Your Information</h3>
                <p className="text-muted-foreground">Fill out the form and click calculate to see your personalized insurance estimates.</p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-8 text-center">Understanding Insurance Calculations: A Complete Guide</h2>
          
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=400&fit=crop" alt="Financial planning and insurance calculation concepts" className="w-full h-64 object-cover rounded-lg mb-8" />
          
          <p className="lead">Making informed decisions about insurance coverage requires understanding how insurance companies calculate premiums and how to determine your actual coverage needs. This comprehensive guide explains the factors that influence insurance costs and helps you make smarter choices about your protection.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">How Insurance Companies Calculate Premiums</h3>
          <p>Insurance premiums aren't arbitrary numbers pulled from thin air. They're carefully calculated based on actuarial data – statistical analysis of risk factors that predict the likelihood of claims. Understanding these factors helps you both anticipate costs and identify opportunities for savings.</p>

          <p>Every type of insurance uses different risk factors, but the underlying principle remains consistent: higher risk equals higher premiums. Insurance companies pool risk across many policyholders, using premium payments from the majority who don't file claims to cover the costs of those who do.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Life Insurance Premium Factors</h4>
          <p>Life insurance premiums depend heavily on mortality risk – the statistical likelihood of death during the coverage period. Key factors include:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Age:</strong> The most significant factor. Premiums increase exponentially with age because mortality risk rises. A policy purchased at 25 costs far less than the same coverage at 45</li>
            <li><strong>Health Status:</strong> Medical history, current conditions, and family health history all influence rates. Insurers typically require medical exams for larger policies</li>
            <li><strong>Tobacco Use:</strong> Smokers pay 2-3 times more than non-smokers due to significantly higher mortality rates</li>
            <li><strong>Occupation and Hobbies:</strong> High-risk jobs (commercial fishing, logging, mining) and dangerous hobbies (skydiving, rock climbing) increase premiums</li>
            <li><strong>Gender:</strong> Women typically pay less because they statistically live longer than men</li>
            <li><strong>Coverage Amount and Term:</strong> Higher death benefits and longer terms cost more</li>
          </ul>

          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop" alt="Person reviewing insurance documents and calculating costs" className="rounded-lg my-8 w-full" />

          <h4 className="text-xl font-semibold mt-8 mb-3">Health Insurance Premium Factors</h4>
          <p>The Affordable Care Act limited the factors that can affect health insurance premiums, creating more predictable pricing. Permitted factors include:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Age:</strong> Older enrollees can be charged up to 3 times more than younger enrollees</li>
            <li><strong>Location:</strong> Healthcare costs vary dramatically by region, affecting premiums</li>
            <li><strong>Tobacco Use:</strong> Insurers can charge tobacco users up to 50% more</li>
            <li><strong>Plan Category:</strong> Bronze, Silver, Gold, and Platinum plans offer different premium/cost-sharing trade-offs</li>
            <li><strong>Family Size:</strong> Coverage for additional family members increases costs</li>
          </ul>

          <p>Notably, health insurers cannot charge more based on pre-existing conditions, gender, or health status – a significant protection that didn't exist before the ACA.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Auto Insurance Premium Factors</h4>
          <p>Auto insurance uses extensive data to predict claim likelihood. Factors include:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Driving Record:</strong> Accidents, violations, and DUIs significantly increase rates</li>
            <li><strong>Age and Experience:</strong> Teen drivers pay the highest rates; rates decrease through middle age</li>
            <li><strong>Vehicle Type:</strong> Sports cars, luxury vehicles, and cars frequently stolen cost more to insure</li>
            <li><strong>Location:</strong> Urban areas with higher accident rates and theft increase premiums</li>
            <li><strong>Credit Score:</strong> In most states, credit-based insurance scores affect rates</li>
            <li><strong>Annual Mileage:</strong> More miles driven means more exposure to accidents</li>
            <li><strong>Coverage Levels:</strong> Higher liability limits and lower deductibles increase premiums</li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-3">Home Insurance Premium Factors</h4>
          <p>Homeowners insurance considers both property characteristics and location-based risks:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Home Value and Size:</strong> More expensive homes cost more to repair or replace</li>
            <li><strong>Construction Type:</strong> Materials, quality, and building practices affect risk</li>
            <li><strong>Location:</strong> Proximity to fire stations, flood zones, and crime rates matter</li>
            <li><strong>Age of Home:</strong> Older homes may have outdated electrical, plumbing, or roofing</li>
            <li><strong>Claims History:</strong> Previous claims on the property increase rates</li>
            <li><strong>Protective Devices:</strong> Security systems, smoke detectors, and storm shutters can reduce costs</li>
            <li><strong>Deductible Choice:</strong> Higher deductibles mean lower premiums</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4">Determining Your Coverage Needs</h3>
          <p>Having the right amount of coverage – not too much, not too little – is essential for financial protection without overspending. Here's how to think about coverage needs for each type:</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Life Insurance: The DIME Method</h4>
          <p>A popular approach to calculating life insurance needs is the DIME method:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>D - Debt:</strong> Total all debts including mortgage, car loans, student loans, and credit cards</li>
            <li><strong>I - Income:</strong> Multiply annual income by years your family would need support (often 10-15 years)</li>
            <li><strong>M - Mortgage:</strong> Amount needed to pay off the home (may overlap with Debt)</li>
            <li><strong>E - Education:</strong> Estimated college costs for children</li>
          </ul>

          <p>Add these together, then subtract existing assets (savings, investments, existing life insurance) to determine your coverage gap. Our calculator above uses a similar approach to generate recommendations.</p>

          <h4 className="text-xl font-semibold mt-8 mb-3">Health Insurance: Balancing Premiums and Out-of-Pocket Costs</h4>
          <p>The right health plan depends on your anticipated healthcare usage. Consider:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Frequent Healthcare Users:</strong> Those with chronic conditions or regular prescriptions often save money with lower-deductible plans despite higher premiums</li>
            <li><strong>Healthy Individuals:</strong> High-deductible plans with HSAs can save money when you rarely need care beyond preventive services</li>
            <li><strong>The Key Calculation:</strong> Compare total annual costs (premiums + expected out-of-pocket expenses) rather than just monthly premiums</li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-3">Auto Insurance: Protecting Your Assets</h4>
          <p>Liability coverage should reflect your assets and potential exposure:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Liability Limits:</strong> Should at least equal your net worth to protect assets in a lawsuit</li>
            <li><strong>Collision/Comprehensive:</strong> Makes sense when vehicle value significantly exceeds annual premium cost</li>
            <li><strong>Deductibles:</strong> Choose based on your emergency fund capacity</li>
            <li><strong>Umbrella Insurance:</strong> Consider if you have significant assets beyond standard liability limits</li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-3">Home Insurance: Replacement Cost Considerations</h4>
          <p>Home insurance should cover the cost to rebuild – not market value or purchase price:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Dwelling Coverage:</strong> Based on reconstruction costs, not real estate market value</li>
            <li><strong>Personal Property:</strong> Create a home inventory to accurately estimate belongings value</li>
            <li><strong>Liability Coverage:</strong> Minimum $100,000, preferably $300,000 or more</li>
            <li><strong>Replacement Cost vs. Actual Cash Value:</strong> Replacement cost coverage is worth the extra premium</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4">Tips for Using Insurance Calculators Effectively</h3>
          <p>Online insurance calculators, including ours, provide valuable starting points but have limitations. Here's how to get the most from them:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Use realistic inputs:</strong> Accurate information yields meaningful estimates</li>
            <li><strong>Compare multiple sources:</strong> Different calculators use different assumptions</li>
            <li><strong>Understand limitations:</strong> Calculators can't account for all individual factors</li>
            <li><strong>Get actual quotes:</strong> Use calculator results as a baseline, then obtain real quotes from insurers</li>
            <li><strong>Review regularly:</strong> Recalculate annually or after major life changes</li>
          </ul>

          <p>For more detailed information on specific coverage types, explore our comprehensive guides on <a href="/health-insurance">health insurance</a> and <a href="/life-insurance">life insurance</a>. Our <a href="/blog">blog</a> also covers topics like <a href="/blog/saving-money-on-insurance-premiums">saving on premiums</a> and <a href="/blog/understanding-health-insurance-deductibles">understanding deductibles</a>.</p>

          <h3 className="text-2xl font-bold mt-10 mb-4">When to Consult a Professional</h3>
          <p>While calculators and self-education go far, certain situations benefit from professional guidance:</p>
          
          <ul className="space-y-2 mb-6">
            <li><strong>Complex estates:</strong> High net worth or complicated family situations</li>
            <li><strong>Business insurance:</strong> Commercial coverage has specialized requirements</li>
            <li><strong>Special circumstances:</strong> Unique health conditions, high-risk occupations, or unusual property</li>
            <li><strong>Major life transitions:</strong> Marriage, divorce, retirement, or significant asset changes</li>
          </ul>

          <p>Independent insurance agents can compare options across multiple carriers, while fee-only financial advisors provide unbiased guidance without commission incentives.</p>
        </div>

        {/* Related Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/health-insurance" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Health Insurance Guide</h3>
            <p className="opacity-90">Learn about health coverage options</p>
            <ArrowRight className="h-5 w-5 mx-auto mt-4" />
          </Link>

          <Link to="/life-insurance" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Life Insurance Guide</h3>
            <p className="opacity-90">Protect your family's future</p>
            <ArrowRight className="h-5 w-5 mx-auto mt-4" />
          </Link>

          <Link to="/blog" className="bg-primary text-primary-foreground p-6 rounded-lg hover:shadow-xl transition text-center">
            <Info className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Insurance Blog</h3>
            <p className="opacity-90">Expert tips and guides</p>
            <ArrowRight className="h-5 w-5 mx-auto mt-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}