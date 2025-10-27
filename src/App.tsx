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
import PortalLayout from '@/pages/portal/PortalLayout'
import PortalDashboard from '@/pages/portal/PortalDashboard'
import PortalDocuments from '@/pages/portal/PortalDocuments'
import PortalMessages from '@/pages/portal/PortalMessages'
import PortalAppointments from '@/pages/portal/PortalAppointments'
import PortalBilling from '@/pages/portal/PortalBilling'
import PortalSettings from '@/pages/portal/PortalSettings'
import AdminPage from '@/pages/portal/AdminPage'
import RequirePortalAuth from '@/routes/RequirePortalAuth'
import EstatePlanningPage from '@/pages/EstatePlanningPage'
import WillsTrustsPage from '@/pages/WillsTrustsPage'
import TaxPlanningPage from '@/pages/TaxPlanningPage'
import SchedulePage from '@/pages/SchedulePage'
import VerifyEmail from '@/pages/VerifyEmail'
import ResetPassword from '@/pages/ResetPassword'

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
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<RequirePortalAuth />}>
            <Route path="/client-portal" element={<PortalLayout />}>
              <Route path="dashboard" element={<PortalDashboard />} />
              <Route path="documents" element={<PortalDocuments />} />
              <Route path="messages" element={<PortalMessages />} />
              <Route path="appointments" element={<PortalAppointments />} />
              <Route path="billing" element={<PortalBilling />} />
              <Route path="settings" element={<PortalSettings />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>
          </Route>
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App
