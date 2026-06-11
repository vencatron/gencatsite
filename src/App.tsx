import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import ServiceDetailPage from '@/pages/ServiceDetailPage'
import ContactPage from '@/pages/ContactPage'
import ResourcesPage from '@/pages/ResourcesPage'
import ChecklistPage from '@/pages/resources/ChecklistPage'
import PartnersPage from '@/pages/resources/PartnersPage'
import RecommendedToolsPage from '@/pages/resources/RecommendedToolsPage'
import LearnPage from '@/pages/learn/LearnPage'
import LearnCategoryPage from '@/pages/learn/LearnCategoryPage'
import LearnArticlePage from '@/pages/learn/LearnArticlePage'
import GlossaryPage from '@/pages/learn/GlossaryPage'
import DisclaimerPage from '@/pages/legal/DisclaimerPage'
import TermsPage from '@/pages/legal/TermsPage'
import PrivacyPage from '@/pages/legal/PrivacyPage'
import AffiliateDisclosurePage from '@/pages/legal/AffiliateDisclosurePage'
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

          {/* Learn hub */}
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/basics" element={<LearnCategoryPage categoryId="basics" />} />
          <Route
            path="/learn/wills-vs-trusts"
            element={<LearnCategoryPage categoryId="wills-vs-trusts" />}
          />
          <Route path="/learn/funding" element={<LearnCategoryPage categoryId="funding" />} />
          <Route path="/learn/california" element={<LearnCategoryPage categoryId="california" />} />
          <Route path="/learn/glossary" element={<GlossaryPage />} />
          <Route path="/learn/:slug" element={<LearnArticlePage />} />

          {/* Services */}
          <Route path="/services" element={<ServicesPage />} />
          {/* Legacy service URLs */}
          <Route path="/services/wills-trusts" element={<Navigate to="/learn/wills-vs-trusts" replace />} />
          <Route path="/services/tax-planning" element={<Navigate to="/services/tax-administration" replace />} />
          <Route path="/services/estate-planning" element={<Navigate to="/services" replace />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* Resources */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/checklist" element={<ChecklistPage />} />
          <Route path="/resources/partners" element={<PartnersPage />} />
          <Route path="/resources/recommended-tools" element={<RecommendedToolsPage />} />
          {/* Legacy resource URLs */}
          <Route path="/resources/blog" element={<Navigate to="/learn" replace />} />
          <Route path="/resources/faq" element={<Navigate to="/learn" replace />} />
          <Route path="/resources/guides" element={<Navigate to="/resources/checklist" replace />} />
          <Route path="/resources/tools" element={<Navigate to="/resources/recommended-tools" replace />} />

          {/* Company */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/team" element={<Navigate to="/about" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/schedule" element={<Navigate to="/contact" replace />} />

          {/* Legal */}
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
          <Route path="/disclosures" element={<Navigate to="/disclaimer" replace />} />
          <Route path="/service-info" element={<Navigate to="/disclaimer" replace />} />

          {/* Client portal */}
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
              <Route path="admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="invoices" element={<AdminInvoices />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App
