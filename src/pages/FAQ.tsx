import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    category: 'General Insurance Questions',
    questions: [
      {
        q: 'What is an insurance premium?',
        a: 'An insurance premium is the amount you pay regularly (usually monthly or annually) to maintain your insurance coverage. Think of it as the price you pay to keep your policy active. Premium amounts are determined by factors like your age, coverage amount, health status, and risk level.'
      },
      {
        q: 'What is a deductible and how does it work?',
        a: 'A deductible is the amount you must pay out-of-pocket for covered services before your insurance company starts paying. For example, with a $1,000 deductible, you pay the first $1,000 of covered expenses, and then your insurance begins covering costs according to your policy terms. Generally, higher deductibles mean lower premiums and vice versa.'
      },
      {
        q: 'What does "out-of-pocket maximum" mean?',
        a: 'The out-of-pocket maximum is the most you will have to pay for covered services in a policy period (usually one year). Once you reach this amount through deductibles, copayments, and coinsurance, your insurance covers 100% of covered services for the rest of the period. This protects you from catastrophic medical expenses.'
      },
      {
        q: 'Can I have multiple insurance policies of the same type?',
        a: 'Yes, you can have multiple policies, but it does not mean you will receive double benefits. When you have two health insurance policies, for example, one is designated as primary and the other as secondary. The primary insurance pays first, and the secondary insurance may cover some of the remaining costs. This is called coordination of benefits.'
      }
    ]
  },
  {
    category: 'Health Insurance',
    questions: [
      {
        q: 'What is the difference between an HMO and PPO?',
        a: 'HMO (Health Maintenance Organization) plans typically require you to choose a primary care physician and get referrals for specialists. They usually have lower premiums but less flexibility. PPO (Preferred Provider Organization) plans offer more freedom to see any doctor without referrals, including out-of-network providers, but have higher premiums and deductibles.'
      },
      {
        q: 'Are preventive care services covered?',
        a: 'Under the Affordable Care Act, most health insurance plans must cover preventive services like annual checkups, vaccinations, and certain screenings at no cost to you. These services are covered even before you meet your deductible. However, any additional tests or treatments beyond standard preventive care may require cost-sharing.'
      },
      {
        q: 'What happens if I miss my open enrollment period?',
        a: 'If you miss open enrollment for health insurance, you typically cannot enroll until the next open enrollment period unless you qualify for a Special Enrollment Period (SEP). SEP eligibility is triggered by qualifying life events such as losing other coverage, getting married, having a baby, or moving to a new state.'
      },
      {
        q: 'Do I need health insurance if I am healthy?',
        a: 'Yes, health insurance is important even if you are currently healthy. Unexpected accidents and illnesses can happen to anyone, and without insurance, you could face significant financial burden. Additionally, under the Affordable Care Act, most Americans are required to have health insurance or face potential tax penalties.'
      }
    ]
  },
  {
    category: 'Life Insurance',
    questions: [
      {
        q: 'How much life insurance coverage do I need?',
        a: 'A common rule of thumb is to have coverage worth 10-12 times your annual income. However, your specific needs depend on factors like outstanding debts, number of dependents, future education costs, and existing savings. Consider your mortgage, other debts, income replacement needs, and final expenses when determining coverage amount.'
      },
      {
        q: 'What is the difference between term and whole life insurance?',
        a: 'Term life insurance provides coverage for a specific period (typically 10, 20, or 30 years) and is generally more affordable. Whole life insurance provides lifetime coverage and includes a cash value component that grows over time, but has much higher premiums. Term is usually better for temporary needs, while whole life may suit permanent needs and estate planning.'
      },
      {
        q: 'Can I get life insurance if I have a pre-existing condition?',
        a: 'Yes, but it may be more expensive or have certain limitations. The impact depends on the type and severity of your condition. Some insurers specialize in coverage for people with health issues. Options include guaranteed issue policies (no medical exam required but higher premiums) or simplified issue policies (basic health questions only).'
      },
      {
        q: 'What happens if I stop paying my life insurance premiums?',
        a: 'For term life insurance, if you stop paying premiums, your coverage typically ends after a short grace period (usually 30-31 days). For whole life insurance, you may have options to use accumulated cash value to keep the policy active temporarily, or convert to a reduced paid-up policy with lower death benefit but no further premiums required.'
      }
    ]
  },
  {
    category: 'Auto Insurance',
    questions: [
      {
        q: 'What auto insurance coverage is legally required?',
        a: 'Requirements vary by state, but most states require liability insurance, which covers damage you cause to others. This typically includes bodily injury liability and property damage liability. Some states also require personal injury protection (PIP) or uninsured motorist coverage. Check your state specific requirements as minimum coverage amounts vary.'
      },
      {
        q: 'What factors affect my auto insurance rates?',
        a: 'Multiple factors influence rates including your driving record, age, gender, location, type of vehicle, credit score, coverage levels, and deductibles. Young drivers and those with accidents or violations pay more. Urban areas typically have higher rates than rural ones. Safe, less expensive cars cost less to insure than luxury or sports vehicles.'
      },
      {
        q: 'Should I get collision and comprehensive coverage?',
        a: 'Collision covers damage to your car from accidents, while comprehensive covers theft, vandalism, weather, and other non-collision events. These coverages are optional but usually required if you have a car loan or lease. If your car is older and worth less than $3,000-4,000, you might consider dropping these coverages to save on premiums.'
      },
      {
        q: 'What should I do immediately after a car accident?',
        a: 'First, ensure everyone is safe and call 911 if there are injuries. Exchange information with other drivers including names, contact details, insurance information, and vehicle details. Document the scene with photos and note any witnesses. Report the accident to your insurance company as soon as possible, typically within 24 hours, even if you are not at fault.'
      }
    ]
  },
  {
    category: 'Home Insurance',
    questions: [
      {
        q: 'What does homeowners insurance typically cover?',
        a: 'Standard homeowners insurance typically covers your dwelling structure, other structures (like garages), personal belongings, loss of use (temporary housing if your home is uninhabitable), personal liability, and medical payments for guests injured on your property. Coverage amounts and specific inclusions vary by policy, so review your policy details carefully.'
      },
      {
        q: 'Do I need flood insurance?',
        a: 'Standard homeowners insurance does not cover flood damage. If you live in a flood-prone area (100-year flood plain), your mortgage lender will require flood insurance. However, flooding can happen anywhere, and 20% of flood claims come from moderate-to-low risk areas. Consider purchasing flood insurance through the National Flood Insurance Program (NFIP) or private insurers.'
      },
      {
        q: 'What is the difference between replacement cost and actual cash value?',
        a: 'Replacement cost coverage pays to replace damaged items with new ones of similar kind and quality, without deducting for depreciation. Actual cash value coverage pays the replacement cost minus depreciation based on the item\'s age and condition. Replacement cost coverage has higher premiums but provides better protection when you need to replace belongings.'
      },
      {
        q: 'How can I lower my homeowners insurance premiums?',
        a: 'Several strategies can reduce premiums: increase your deductible, bundle home and auto insurance with the same company, improve home security with alarms and deadbolts, maintain good credit, make your home more disaster-resistant, avoid filing small claims, and review your coverage annually to ensure you are not over-insured or paying for coverage you do not need.'
      }
    ]
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-secondary/50 transition"
      >
        <span className="font-semibold text-left">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-border bg-secondary/30">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about insurance coverage, policies, and planning
          </p>
        </div>

        {faqs.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
            <div>
              {category.questions.map((item, qIdx) => (
                <FAQItem key={qIdx} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6 opacity-90">
            If you could not find the answer you were looking for, feel free to reach out to us directly
          </p>
          <a href="/contact" className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
