import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    slug: 'understanding-health-insurance-deductibles',
    title: 'Understanding Health Insurance Deductibles: A Complete Guide',
    excerpt: 'Learn everything you need to know about health insurance deductibles, how they work, and how to choose the right deductible amount for your situation.',
    date: '2024-01-15',
    author: 'Sarah Johnson',
    category: 'Health Insurance'
  },
  {
    slug: 'term-vs-whole-life-insurance',
    title: 'Term vs Whole Life Insurance: Which is Right for You?',
    excerpt: 'Compare the key differences between term and whole life insurance policies to determine which type best fits your financial goals and family needs.',
    date: '2024-01-10',
    author: 'Michael Chen',
    category: 'Life Insurance'
  },
  {
    slug: 'auto-insurance-coverage-explained',
    title: 'Auto Insurance Coverage Types Explained',
    excerpt: 'A comprehensive breakdown of liability, collision, comprehensive, and other auto insurance coverage types to help you build the right policy.',
    date: '2024-01-05',
    author: 'Emily Rodriguez',
    category: 'Auto Insurance'
  },
  {
    slug: 'home-insurance-claims-process',
    title: 'How to File a Home Insurance Claim: Step-by-Step Guide',
    excerpt: 'Navigate the home insurance claims process with confidence using our detailed guide covering documentation, communication, and common pitfalls to avoid.',
    date: '2023-12-28',
    author: 'David Thompson',
    category: 'Home Insurance'
  },
  {
    slug: 'saving-money-on-insurance-premiums',
    title: '10 Proven Ways to Save Money on Insurance Premiums',
    excerpt: 'Discover practical strategies to reduce your insurance costs across all policy types without sacrificing essential coverage protection.',
    date: '2023-12-20',
    author: 'Sarah Johnson',
    category: 'Insurance Tips'
  },
  {
    slug: 'insurance-for-young-adults',
    title: 'Essential Insurance Guide for Young Adults',
    excerpt: 'Learn which insurance policies young adults need as they start their careers and become financially independent, with practical advice for each type.',
    date: '2023-12-15',
    author: 'Michael Chen',
    category: 'Insurance Planning'
  }
]

export default function Blog() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Insurance Insights Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert advice, guides, and tips to help you make informed decisions about your insurance coverage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-secondary rounded-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div className="mb-3">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 hover:text-primary transition">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`} className="text-primary font-semibold flex items-center hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Insurance News</h2>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter to receive the latest insurance tips, guides, and industry updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-lg text-foreground"
            />
            <button className="bg-background text-foreground px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
