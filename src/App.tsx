import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import ContactPage from '@/pages/ContactPage'
import ResourcesPage from '@/pages/ResourcesPage'
import BlogPage from '@/pages/BlogPage'
import FAQPage from '@/pages/FAQPage'
import GuidesPage from '@/pages/GuidesPage'
import ToolsPage from '@/pages/ToolsPage'
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
import AdminLayout from '@/pages/portal/AdminLayout'
import AdminDashboard from '@/pages/portal/AdminDashboard'
import AdminUsers from '@/pages/portal/AdminUsers'
import AdminClients from '@/pages/portal/AdminClients'
import AdminInvoices from '@/pages/portal/AdminInvoices'
import RequirePortalAuth from '@/routes/RequirePortalAuth'
import EstatePlanningPage from '@/pages/EstatePlanningPage'
import WillsTrustsPage from '@/pages/WillsTrustsPage'
import TaxPlanningPage from '@/pages/TaxPlanningPage'
import ProbatePage from '@/pages/ProbatePage'
import BusinessSuccessionPage from '@/pages/BusinessSuccessionPage'
import AssetProtectionPage from '@/pages/AssetProtectionPage'
import TeamPage from '@/pages/TeamPage'
import SchedulePage from '@/pages/SchedulePage'
import VerifyEmail from '@/pages/VerifyEmail'
import ResetPassword from '@/pages/ResetPassword'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import ServiceInfoPage from '@/pages/ServiceInfoPage'
import DisclosuresPage from '@/pages/DisclosuresPage'

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
          <Route path="/about/team" element={<TeamPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/estate-planning" element={<EstatePlanningPage />} />
          <Route path="/services/wills-trusts" element={<WillsTrustsPage />} />
          <Route path="/services/tax-planning" element={<TaxPlanningPage />} />
          <Route path="/services/probate" element={<ProbatePage />} />
          <Route path="/services/business-succession" element={<BusinessSuccessionPage />} />
          <Route path="/services/asset-protection" element={<AssetProtectionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/faq" element={<FAQPage />} />
          <Route path="/resources/guides" element={<GuidesPage />} />
          <Route path="/resources/tools" element={<ToolsPage />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/service-info" element={<ServiceInfoPage />} />
          <Route path="/disclosures" element={<DisclosuresPage />} />
          <Route element={<RequirePortalAuth />}>
            <Route path="/client-portal" element={<PortalLayout />}>
              <Route path="dashboard" element={<PortalDashboard />} />
              <Route path="documents" element={<PortalDocuments />} />
              <Route path="messages" element={<PortalMessages />} />
              <Route path="appointments" element={<PortalAppointments />} />
              <Route path="billing" element={<PortalBilling />} />
              <Route path="settings" element={<PortalSettings />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="invoices" element={<AdminInvoices />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App
