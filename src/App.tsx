import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import ContactPage from '@/pages/ContactPage'
import ResourcesPage from '@/pages/ResourcesPage'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import ClientPortal from '@/components/sections/ClientPortal'
import EstatePlanningPage from '@/pages/EstatePlanningPage'
import WillsTrustsPage from '@/pages/WillsTrustsPage'
import TaxPlanningPage from '@/pages/TaxPlanningPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/estate-planning" element={<EstatePlanningPage />} />
          <Route path="/services/wills-trusts" element={<WillsTrustsPage />} />
          <Route path="/services/tax-planning" element={<TaxPlanningPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/client-portal" element={<ClientPortal />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App
