import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft } from 'lucide-react'

const blogContent: Record<string, any> = {
  'understanding-health-insurance-deductibles': {
    title: 'Understanding Health Insurance Deductibles: A Complete Guide',
    date: '2024-01-15',
    author: 'Sarah Johnson',
    category: 'Health Insurance',
    content: `
      <p>Health insurance deductibles are one of the most important factors to understand when choosing a health plan, yet they're often misunderstood. In this comprehensive guide, we'll explain everything you need to know about deductibles and how they impact your healthcare costs.</p>

      <h2>What is a Health Insurance Deductible?</h2>
      <p>A deductible is the amount you must pay out-of-pocket for covered healthcare services before your insurance plan begins to pay. For example, if you have a $1,500 deductible, you'll need to pay the first $1,500 of covered services yourself before your insurance kicks in.</p>

      <h2>How Do Deductibles Work?</h2>
      <p>Here's a step-by-step breakdown of how deductibles work in practice:</p>
      <ul>
        <li><strong>Initial Costs:</strong> At the beginning of your plan year, you pay the full cost of covered services until you meet your deductible.</li>
        <li><strong>Preventive Care Exception:</strong> Most plans cover preventive care services at no cost, even before you meet your deductible.</li>
        <li><strong>After Meeting Deductible:</strong> Once you've paid your deductible amount, your insurance begins to share costs through copayments or coinsurance.</li>
        <li><strong>Annual Reset:</strong> Deductibles typically reset each year, meaning you start over at the beginning of each plan year.</li>
      </ul>

      <h2>Types of Deductibles</h2>
      <p><strong>Individual Deductible:</strong> This is the amount one person must pay before their insurance starts covering costs. If you have individual coverage, this is the only deductible you need to worry about.</p>
      <p><strong>Family Deductible:</strong> For family plans, there are two deductible amounts to consider. The family deductible is usually double the individual amount. The plan starts paying when either one person meets the individual deductible or the family collectively meets the family deductible.</p>

      <h2>Choosing the Right Deductible</h2>
      <p>When selecting a health insurance plan, consider these factors:</p>
      <ul>
        <li><strong>Premium vs. Deductible Trade-off:</strong> Plans with lower deductibles typically have higher monthly premiums, and vice versa.</li>
        <li><strong>Healthcare Usage:</strong> If you expect to use healthcare services frequently, a lower deductible may save you money overall.</li>
        <li><strong>Financial Cushion:</strong> Choose a deductible amount you could afford to pay if you needed significant medical care.</li>
        <li><strong>Savings Accounts:</strong> Consider pairing a high-deductible plan with a Health Savings Account (HSA) for tax advantages.</li>
      </ul>

      <h2>Common Deductible Mistakes to Avoid</h2>
      <p>Many people make these common mistakes when it comes to deductibles:</p>
      <ul>
        <li>Confusing deductibles with out-of-pocket maximums</li>
        <li>Not budgeting for deductible expenses</li>
        <li>Choosing the lowest premium without considering the deductible</li>
        <li>Forgetting that deductibles reset annually</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Understanding how health insurance deductibles work is essential for managing your healthcare costs effectively. By considering your healthcare needs, financial situation, and the trade-offs between premiums and deductibles, you can choose a plan that provides the right balance of coverage and affordability for your circumstances.</p>
    `
  },
  'term-vs-whole-life-insurance': {
    title: 'Term vs Whole Life Insurance: Which is Right for You?',
    date: '2024-01-10',
    author: 'Michael Chen',
    category: 'Life Insurance',
    content: `
      <p>Choosing between term and whole life insurance is one of the most important decisions you'll make when protecting your family's financial future. This guide breaks down the key differences to help you make an informed choice.</p>

      <h2>Term Life Insurance Explained</h2>
      <p>Term life insurance provides coverage for a specific period, typically 10, 20, or 30 years. It's the simpler and more affordable option, offering pure death benefit protection without any cash value component.</p>

      <h3>Advantages of Term Life Insurance:</h3>
      <ul>
        <li><strong>Affordability:</strong> Significantly lower premiums compared to whole life insurance</li>
        <li><strong>Simplicity:</strong> Straightforward coverage with no investment component</li>
        <li><strong>Flexibility:</strong> Can choose term length to match specific needs (like mortgage duration)</li>
        <li><strong>Higher Coverage:</strong> More death benefit for your premium dollar</li>
      </ul>

      <h3>Disadvantages of Term Life Insurance:</h3>
      <ul>
        <li>Coverage expires at the end of the term</li>
        <li>No cash value accumulation</li>
        <li>Renewal can be expensive or impossible depending on health changes</li>
        <li>Premiums may increase with age if you need new coverage</li>
      </ul>

      <h2>Whole Life Insurance Explained</h2>
      <p>Whole life insurance provides lifetime coverage and includes a cash value component that grows over time. It combines death benefit protection with a savings element.</p>

      <h3>Advantages of Whole Life Insurance:</h3>
      <ul>
        <li><strong>Lifetime Coverage:</strong> Protection for your entire life as long as premiums are paid</li>
        <li><strong>Cash Value:</strong> Builds cash value you can borrow against or withdraw</li>
        <li><strong>Fixed Premiums:</strong> Premiums never increase throughout your life</li>
        <li><strong>Guaranteed Death Benefit:</strong> Beneficiaries will receive a payout regardless of when you die</li>
      </ul>

      <h3>Disadvantages of Whole Life Insurance:</h3>
      <ul>
        <li>Much higher premiums than term insurance</li>
        <li>Complex product with various fees and charges</li>
        <li>Cash value grows slowly, especially in early years</li>
        <li>May not be the best investment vehicle compared to other options</li>
      </ul>

      <h2>When to Choose Term Life Insurance</h2>
      <p>Term life insurance is typically the better choice if you:</p>
      <ul>
        <li>Need coverage for a specific time period (like until children are grown)</li>
        <li>Want to maximize death benefit for your budget</li>
        <li>Prefer to invest separately rather than through insurance</li>
        <li>Have temporary financial obligations (mortgage, income replacement during working years)</li>
      </ul>

      <h2>When to Choose Whole Life Insurance</h2>
      <p>Whole life insurance may be more appropriate if you:</p>
      <ul>
        <li>Want lifetime coverage regardless of age or health changes</li>
        <li>Need insurance for estate planning purposes</li>
        <li>Want a forced savings component</li>
        <li>Have maxed out other tax-advantaged savings options</li>
        <li>Can comfortably afford the higher premiums</li>
      </ul>

      <h2>Making Your Decision</h2>
      <p>For most people, term life insurance provides adequate protection at an affordable price. The money saved on premiums can be invested in other vehicles like 401(k)s or IRAs, which typically offer better returns than whole life insurance cash value.</p>

      <p>However, whole life insurance can make sense for high-net-worth individuals with estate planning needs or those who want the discipline of forced savings. Consider consulting with a fee-only financial advisor who can provide unbiased guidance based on your specific situation.</p>
    `
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? blogContent[slug] : null

  if (!post) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-primary font-semibold hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 p-6 bg-secondary rounded-lg">
          <h3 className="text-xl font-bold mb-2">Need Personalized Advice?</h3>
          <p className="text-muted-foreground mb-4">
            While this guide provides general information, every situation is unique. Consider consulting with a licensed insurance professional for advice tailored to your specific needs.
          </p>
          <Link to="/contact" className="text-primary font-semibold hover:underline">
            Contact Us →
          </Link>
        </div>
      </div>
    </article>
  )
}
