import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PrivacyPage = () => {
  const lastUpdated = 'January 1, 2025'

  const sections = [
    {
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you use our services, we may collect personal information that you voluntarily provide, including but not limited to: your name, email address, phone number, mailing address, date of birth, Social Security number (for estate planning services), financial information, family information, and any other information you choose to provide during consultations or through our client portal.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, we collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site.'
        },
        {
          subtitle: 'Client Portal Data',
          text: 'If you register for our secure client portal, we collect and store information related to your estate planning matters, including uploaded documents, communications with our team, appointment schedules, billing information, and any notes or updates related to your case.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your personal information to provide estate planning services, including preparing legal documents, providing consultations, managing your client account, processing payments, and communicating with you about your estate planning matters.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send you important updates about your case, respond to your inquiries, provide customer support, send appointment reminders, and keep you informed about changes to our services or policies. With your consent, we may also send educational newsletters about estate planning topics.'
        },
        {
          subtitle: 'Website Improvement',
          text: 'We use automatically collected information to analyze website traffic and usage patterns, improve our website functionality and user experience, detect and prevent fraud or security issues, and comply with legal obligations.'
        }
      ]
    },
    {
      title: 'Data Protection and Security',
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, secure servers with access controls, regular security assessments and updates, employee training on data protection, and physical security measures for our offices.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Estate planning documents and related information may be retained for extended periods in accordance with legal requirements and professional standards.'
        },
        {
          subtitle: 'Confidentiality',
          text: 'All information you provide to Generation Catalyst is treated as strictly confidential. Our team members are bound by confidentiality agreements, and we maintain professional standards for handling sensitive personal and financial information.'
        }
      ]
    },
    {
      title: 'Cookies and Tracking Technologies',
      content: [
        {
          subtitle: 'What Are Cookies',
          text: 'Cookies are small data files placed on your device when you visit a website. We use cookies to improve your browsing experience, remember your preferences, understand how you use our website, and provide relevant content.'
        },
        {
          subtitle: 'Types of Cookies We Use',
          text: 'We use essential cookies necessary for website functionality, preference cookies that remember your settings, analytics cookies that help us understand website usage, and security cookies that protect your information. We do not use cookies for advertising purposes.'
        },
        {
          subtitle: 'Managing Cookies',
          text: 'You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website, particularly features of the secure client portal.'
        }
      ]
    },
    {
      title: 'Third-Party Services',
      content: [
        {
          subtitle: 'Service Providers',
          text: 'We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you. These providers include secure document storage services, payment processors, email service providers, and website hosting services. All service providers are bound by confidentiality agreements and are prohibited from using your information for any purpose other than providing services to us.'
        },
        {
          subtitle: 'Professional Collaborations',
          text: 'With your explicit consent, we may share relevant information with other professionals involved in your estate planning, such as attorneys, accountants, financial advisors, or insurance professionals. We will always inform you before sharing information with any third party.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, subpoena, or other legal process, or if we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.'
        }
      ]
    },
    {
      title: 'Your Rights and Choices',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access the personal information we hold about you and to request corrections to any inaccurate or incomplete information. You can update your information through the client portal or by contacting us directly.'
        },
        {
          subtitle: 'Data Portability',
          text: 'Upon request, we will provide you with a copy of your personal information in a structured, commonly used, and machine-readable format, to the extent technically feasible.'
        },
        {
          subtitle: 'Deletion Requests',
          text: 'You may request deletion of your personal information, subject to certain exceptions required by law or professional obligations. Please note that we may be required to retain certain information for legal, regulatory, or legitimate business purposes.'
        },
        {
          subtitle: 'California Privacy Rights',
          text: 'California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to request deletion, and the right to opt-out of the sale of personal information. We do not sell personal information.'
        }
      ]
    },
    {
      title: 'Contact Information',
      content: [
        {
          subtitle: 'Questions or Concerns',
          text: 'If you have any questions about this Privacy Policy or our data practices, please contact us at: Generation Catalyst, 123 Estate Planning Blvd, Suite 500, Claremont, CA 91711. Email: privacy@iamatrust.com. Phone: (555) 123-4567.'
        },
        {
          subtitle: 'Policy Updates',
          text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically.'
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
              Privacy Policy
            </h1>
            <p className="text-lg text-neutral-600 mb-2">
              Your privacy is important to us. This policy explains how Generation Catalyst collects, uses, and protects your personal information.
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
          {/* Introduction */}
          <motion.div
            className="prose prose-lg max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-neutral-700 leading-relaxed">
              Generation Catalyst Estate Planning ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, use our client portal, or engage our estate planning services.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              By using our website or services, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="border-b border-neutral-200 pb-12 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  {sectionIndex + 1}. {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            className="mt-12 bg-neutral-50 rounded-xl p-6 border border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-600 text-sm leading-relaxed">
              This Privacy Policy was last updated on {lastUpdated}. If you have any questions about this policy or our privacy practices, please contact us using the information provided above or visit our <Link to="/contact" className="text-primary-600 hover:text-primary-500 underline">Contact Page</Link>.
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
              to="/terms"
              className="text-primary-600 hover:text-primary-500 font-medium text-sm"
            >
              Terms of Service
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

export default PrivacyPage
