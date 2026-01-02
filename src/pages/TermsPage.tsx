import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ContentItem {
  subtitle?: string
  text: string
}

interface Section {
  title: string
  content: ContentItem[]
}

const TermsPage = () => {
  const lastUpdated = 'January 1, 2025'
  const effectiveDate = 'January 1, 2025'

  const sections: Section[] = [
    {
      title: 'Acceptance of Terms',
      content: [
        {
          text: 'By accessing or using the Generation Catalyst website, client portal, or any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not access or use our website or services.'
        },
        {
          text: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of our services after any such changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically for updates.'
        }
      ]
    },
    {
      title: 'Description of Services',
      content: [
        {
          subtitle: 'Estate Planning Services',
          text: 'Generation Catalyst provides professional estate planning services including, but not limited to: estate planning consultations and assessments, preparation of wills, trusts, and related documents, trust administration guidance, estate tax planning strategies, powers of attorney and healthcare directives, beneficiary designations review, and ongoing plan maintenance and updates.'
        },
        {
          subtitle: 'Client Portal',
          text: 'Our secure client portal provides registered users with access to document storage and management, secure messaging with our team, appointment scheduling, billing and invoice management, and case status updates. Use of the client portal is subject to additional terms and requires account registration.'
        },
        {
          subtitle: 'Educational Resources',
          text: 'Our website offers educational resources, articles, guides, and tools for informational purposes. These materials are designed to provide general information about estate planning topics and should not be considered professional advice specific to your situation.'
        }
      ]
    },
    {
      title: 'User Obligations',
      content: [
        {
          subtitle: 'Accurate Information',
          text: 'You agree to provide accurate, current, and complete information when using our services or registering for an account. You are responsible for maintaining the accuracy of your information and must promptly update any changes. Providing false or misleading information may result in termination of services.'
        },
        {
          subtitle: 'Account Security',
          text: 'If you create an account on our client portal, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to protect your account information.'
        },
        {
          subtitle: 'Prohibited Conduct',
          text: 'You agree not to: use our services for any unlawful purpose; attempt to gain unauthorized access to our systems or other users\' accounts; transmit viruses, malware, or other harmful code; interfere with or disrupt the integrity or performance of our website or services; impersonate any person or entity; or use automated systems to access our website without permission.'
        },
        {
          subtitle: 'Cooperation',
          text: 'Effective estate planning requires your active participation and timely cooperation. You agree to provide requested documents and information promptly, respond to communications in a reasonable timeframe, attend scheduled appointments or provide adequate notice of cancellation, and review and sign documents in a timely manner.'
        }
      ]
    },
    {
      title: 'Estate Planning Disclaimers',
      content: [
        {
          subtitle: 'No Legal Advice',
          text: 'The information provided on this website is for general informational purposes only and does not constitute legal advice. Estate planning involves complex legal, tax, and financial considerations that vary based on individual circumstances. The general information on this website should not be relied upon as a substitute for professional advice tailored to your specific situation.'
        },
        {
          subtitle: 'Professional Consultation Required',
          text: 'Before making any estate planning decisions, you should consult with qualified professionals, including attorneys, tax advisors, and financial planners, who can evaluate your unique circumstances. Generation Catalyst works with a network of licensed professionals and can provide referrals as appropriate.'
        },
        {
          subtitle: 'No Guarantee of Outcomes',
          text: 'While we strive to provide high-quality estate planning services, we cannot guarantee any particular outcome or result. Estate planning effectiveness depends on many factors, including changes in law, individual circumstances, and proper implementation. Past results do not guarantee future outcomes.'
        },
        {
          subtitle: 'State-Specific Laws',
          text: 'Estate planning is governed by state-specific laws that vary significantly. Our services are primarily designed for residents of California and may not be appropriate for residents of other states without modification. If you reside outside California, additional consultation may be necessary.'
        }
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        {
          subtitle: 'Ownership',
          text: 'All content on this website, including text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Generation Catalyst or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.'
        },
        {
          subtitle: 'Limited License',
          text: 'You are granted a limited, non-exclusive, non-transferable license to access and make personal use of this website. This license does not include any right to: download, copy, or modify any portion of the website for commercial purposes; use any data mining, robots, or similar data gathering tools; frame or use framing techniques; or use any meta tags or other hidden text.'
        },
        {
          subtitle: 'Your Content',
          text: 'By uploading documents or other content to our client portal, you retain ownership of that content but grant us a limited license to use, store, and process that content as necessary to provide our services. We will maintain the confidentiality of your content in accordance with our Privacy Policy.'
        }
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        {
          subtitle: 'Disclaimer of Warranties',
          text: 'This website and our services are provided on an "as is" and "as available" basis. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that our services will be uninterrupted, timely, secure, or error-free.'
        },
        {
          subtitle: 'Limitation of Damages',
          text: 'To the maximum extent permitted by law, Generation Catalyst and its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of our website or services.'
        },
        {
          subtitle: 'Maximum Liability',
          text: 'In no event shall our total liability to you for all claims arising out of or relating to these terms or your use of our services exceed the amount you have paid to us for services in the twelve (12) months preceding the claim. Some jurisdictions do not allow limitations on liability, so these limitations may not apply to you.'
        }
      ]
    },
    {
      title: 'Indemnification',
      content: [
        {
          text: 'You agree to indemnify, defend, and hold harmless Generation Catalyst and its officers, directors, employees, agents, affiliates, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising out of or relating to your violation of these Terms of Service, your use of our website or services, your provision of inaccurate or incomplete information, or your violation of any third-party rights.'
        }
      ]
    },
    {
      title: 'Dispute Resolution',
      content: [
        {
          subtitle: 'Governing Law',
          text: 'These Terms of Service and any disputes arising out of or related to these terms or our services shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.'
        },
        {
          subtitle: 'Arbitration',
          text: 'Any dispute, controversy, or claim arising out of or relating to these Terms of Service or our services shall be resolved by binding arbitration administered by JAMS in accordance with its Comprehensive Arbitration Rules. The arbitration shall take place in Los Angeles County, California. The arbitrator\'s decision shall be final and binding, and judgment on the award may be entered in any court having jurisdiction.'
        },
        {
          subtitle: 'Class Action Waiver',
          text: 'You agree that any arbitration or legal proceeding shall be conducted on an individual basis and not as a class action, collective action, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration against Generation Catalyst.'
        }
      ]
    },
    {
      title: 'Termination',
      content: [
        {
          subtitle: 'Termination by Us',
          text: 'We reserve the right to suspend or terminate your access to our website or services at any time, with or without cause, and with or without notice. Reasons for termination may include violation of these terms, non-payment of fees, or conduct that we determine to be harmful to our business or other users.'
        },
        {
          subtitle: 'Termination by You',
          text: 'You may terminate your relationship with us at any time by discontinuing use of our services and closing your account. Please note that termination does not relieve you of any payment obligations for services already rendered or affect any provisions of these terms that by their nature should survive termination.'
        },
        {
          subtitle: 'Effect of Termination',
          text: 'Upon termination, your right to use our services will immediately cease. We will retain your documents and information in accordance with our data retention policies and legal obligations. You may request a copy of your documents prior to or following termination.'
        }
      ]
    },
    {
      title: 'General Provisions',
      content: [
        {
          subtitle: 'Entire Agreement',
          text: 'These Terms of Service, together with our Privacy Policy and any other agreements entered into for specific services, constitute the entire agreement between you and Generation Catalyst regarding your use of our website and services.'
        },
        {
          subtitle: 'Severability',
          text: 'If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.'
        },
        {
          subtitle: 'Waiver',
          text: 'Our failure to enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative of Generation Catalyst.'
        },
        {
          subtitle: 'Assignment',
          text: 'You may not assign or transfer these Terms of Service or any rights or obligations hereunder without our prior written consent. We may assign or transfer these terms without restriction.'
        }
      ]
    },
    {
      title: 'Contact Information',
      content: [
        {
          text: 'If you have any questions about these Terms of Service, please contact us at: Generation Catalyst, 123 Estate Planning Blvd, Suite 500, Claremont, CA 91711. Email: legal@iamatrust.com. Phone: (555) 123-4567. We will respond to your inquiry within a reasonable timeframe.'
        }
      ]
    }
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
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-neutral-600 mb-2">
              Please read these terms carefully before using our website or services.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
              <span>Effective Date: {effectiveDate}</span>
              <span className="hidden sm:inline">|</span>
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            className="prose prose-lg max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-neutral-700 leading-relaxed">
              Welcome to Generation Catalyst Estate Planning. These Terms of Service ("Terms") govern your access to and use of our website (www.iamatrust.com), client portal, and all services provided by Generation Catalyst Estate Planning ("Generation Catalyst," "we," "us," or "our").
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            className="bg-neutral-50 rounded-xl p-6 mb-12 border border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Table of Contents</h2>
            <nav className="grid sm:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-primary-600 hover:text-primary-500 text-sm"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                id={`section-${sectionIndex + 1}`}
                className="border-b border-neutral-200 pb-12 last:border-b-0 scroll-mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.03 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  {sectionIndex + 1}. {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-neutral-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Acknowledgment */}
          <motion.div
            className="mt-12 bg-primary-50 rounded-xl p-6 border border-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-neutral-900 mb-2">Acknowledgment</h3>
            <p className="text-neutral-700 text-sm leading-relaxed">
              By using our website or services, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them. If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization to these terms.
            </p>
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
              to="/disclosures"
              className="text-primary-600 hover:text-primary-500 font-medium text-sm"
            >
              Professional Disclosures
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

export default TermsPage
