import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import HealthInsurance from './pages/HealthInsurance'
import LifeInsurance from './pages/LifeInsurance'
import AutoInsurance from './pages/AutoInsurance'
import HomeInsurance from './pages/HomeInsurance'
import InsuranceCalculator from './pages/InsuranceCalculator'
import ComparisonTool from './pages/ComparisonTool'
import FAQ from './pages/FAQ'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health-insurance" element={<HealthInsurance />} />
          <Route path="/life-insurance" element={<LifeInsurance />} />
          <Route path="/auto-insurance" element={<AutoInsurance />} />
          <Route path="/home-insurance" element={<HomeInsurance />} />
          <Route path="/calculator" element={<InsuranceCalculator />} />
          <Route path="/compare" element={<ComparisonTool />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
