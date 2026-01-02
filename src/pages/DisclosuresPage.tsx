import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const DisclosuresPage = () => {
  const lastUpdated = 'January 1, 2025'

  const certifications = [
    {
      title: 'Certified Estate Planner (CEP)',
      issuer: 'National Institute of Certified Estate Planners',
      description: 'Comprehensive certification covering estate planning strategies, document preparation, and client service.'
    },
    {
      title: 'Accredited Estate Planner (AEP)',
      issuer: 'National Association of Estate Planners & Councils',
      description: 'Advanced designation for professionals demonstrating excellence in estate planning practice.'
    },
    {
      title: 'Certified Trust and Fiduciary Advisor (CTFA)',
      issuer: 'American Bankers Association',
      description: 'Specialized certification in trust administration, fiduciary responsibilities, and wealth management.'
    }
  ]

  const affiliations = [
    'National Association of Estate Planners & Councils (NAEPC)',
    'California Association of Estate Planners (CalAEP)',
    'WealthCounsel Estate Planning Network',
    'American Academy of Estate Planning Attorneys',
    'Los Angeles County Estate Planning Council',
    'Inland Empire Estate Planning Council',
    'Better Business Bureau (A+ Rating)'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Transparency
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              Professional Disclosures
            </h1>
            <p className="text-lg text-neutral-600 mb-2">
              Our commitment to transparency includes clear disclosure of our professional credentials, affiliations, insurance coverage, and regulatory compliance.
            </p>
            <p className="text-sm text-neutral-500">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Professional Certifications */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Professional Certifications</h2>
            <p className="text-neutral-600 mb-6">
              Our team members hold professional certifications that demonstrate expertise and commitment to high standards in estate planning. These certifications require rigorous examination, continuing education, and adherence to ethical standards.
            </p>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-neutral-200 rounded-xl p-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{cert.title}</h3>
                      <p className="text-primary-600 text-sm mb-2">{cert.issuer}</p>
                      <p className="text-neutral-600 text-sm">{cert.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Affiliations */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Professional Affiliations</h2>
            <p className="text-neutral-600 mb-6">
              Generation Catalyst maintains memberships in leading professional organizations that promote excellence and ethical standards in estate planning.
            </p>
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
              <ul className="grid sm:grid-cols-2 gap-3">
                {affiliations.map((affiliation, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="text-neutral-700 text-sm">{affiliation}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Insurance Information */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Insurance Information</h2>
            <div className="space-y-6">
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Professional Liability Insurance (Errors and Omissions)</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Generation Catalyst maintains comprehensive professional liability insurance (errors and omissions coverage) to protect our clients in the unlikely event of professional negligence. Our coverage meets or exceeds industry standards and is provided by an A-rated insurance carrier.
                </p>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-500">Coverage Amount:</span>
                      <span className="ml-2 text-neutral-900 font-medium">$2,000,000 per occurrence</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Aggregate Limit:</span>
                      <span className="ml-2 text-neutral-900 font-medium">$4,000,000 annual</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">General Liability Insurance</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  We carry general liability insurance covering our business premises and operations to protect visitors and third parties from injury or property damage that may occur on our premises or as a result of our business activities.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Cyber Liability Insurance</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Given the sensitive nature of estate planning information, we maintain cyber liability insurance to protect against data breaches and cyber incidents. This coverage helps ensure that we can respond appropriately to any security incidents and mitigate potential harm to our clients.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Fidelity Bond</h3>
                <p className="text-neutral-600 text-sm">
                  As an additional protection for our clients, Generation Catalyst maintains a fidelity bond covering employee dishonesty. This bond provides coverage in the event of theft or fraudulent conduct by any team member.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Conflict of Interest Disclosures */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Conflict of Interest Disclosures</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Fiduciary Duty</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Generation Catalyst operates under a fiduciary duty to our clients, meaning we are obligated to act in your best interests. We do not receive commissions or referral fees from financial products, insurance policies, or other services that may be recommended as part of your estate plan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Professional Referrals</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  When we refer you to attorneys, accountants, financial advisors, or other professionals, we do so based solely on our assessment of their qualifications and fit for your needs. We do not receive any compensation for these referrals. If our relationship with any referred professional ever changes, we will provide updated disclosure.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Corporate Services</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Generation Catalyst offers both estate planning services and trust administration services. If we recommend our trust administration services for trusts we helped create, this dual capacity is disclosed to you. You are always free to choose any qualified trustee or trust administration service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Document Preparation</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  We prepare estate planning documents using professional document drafting systems and may customize templates for your specific situation. We disclose when documents are based on standardized templates versus custom-drafted provisions. All documents are reviewed by qualified professionals before finalization.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Regulatory Information */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Regulatory Information</h2>
            <div className="space-y-6">
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Nature of Services</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Generation Catalyst provides estate planning consultation and document preparation services. For matters requiring legal representation, court appearances, or formal legal advice, we work with or refer you to licensed attorneys. We are not a law firm and do not provide legal representation.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Tax Services Disclosure</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Tax planning strategies discussed in connection with your estate plan are for informational and planning purposes. Any written tax advice provided was not intended or written to be used, and cannot be used, for the purpose of avoiding penalties that may be imposed under the Internal Revenue Code. For formal tax advice and tax return preparation, we recommend working with a licensed CPA or tax attorney.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Financial Services Disclosure</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Generation Catalyst is not a registered investment adviser and does not provide investment advice or portfolio management services. While we may discuss how your estate plan interacts with your investment accounts and beneficiary designations, we do not recommend specific investments or manage investment portfolios.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">California Business License</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Generation Catalyst Estate Planning is a registered business in the State of California. Our business license and registration information is available upon request. We comply with all applicable state and local business regulations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Professional Standards */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Professional Standards</h2>
            <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
              <h3 className="font-semibold text-neutral-900 mb-4">Our Commitment to Excellence</h3>
              <p className="text-neutral-700 text-sm mb-4">
                Generation Catalyst is committed to maintaining the highest professional standards in all aspects of our practice. We adhere to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-neutral-700 text-sm">Code of ethics established by our professional certifying organizations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-neutral-700 text-sm">Continuing education requirements to maintain current knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-neutral-700 text-sm">Strict confidentiality protections for all client information</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-neutral-700 text-sm">Transparent communication about services, fees, and limitations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-neutral-700 text-sm">Regular internal audits and quality assurance procedures</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Questions */}
          <motion.div
            className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-neutral-900 mb-2">Questions About Our Disclosures?</h3>
            <p className="text-neutral-600 text-sm mb-4">
              We believe in complete transparency about our qualifications, practices, and business relationships. If you have any questions about these disclosures or would like additional information, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="btn-primary text-center text-sm"
              >
                Contact Us
              </Link>
              <a
                href="mailto:compliance@iamatrust.com"
                className="btn-outline text-center text-sm"
              >
                Email Compliance Team
              </a>
            </div>
          </motion.div>

          {/* Related Links */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/privacy"
              className="text-primary-600 hover:text-primary-500 font-medium text-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              to="/terms"
              className="text-primary-600 hover:text-primary-500 font-medium text-sm"
            >
              Terms of Service
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              to="/service-info"
              className="text-primary-600 hover:text-primary-500 font-medium text-sm"
            >
              Service Information
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default DisclosuresPage
