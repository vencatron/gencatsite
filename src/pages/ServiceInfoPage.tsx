import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ServiceInfoPage = () => {
  const serviceAreas = [
    'Los Angeles County',
    'Orange County',
    'San Bernardino County',
    'Riverside County',
    'Ventura County',
    'San Diego County'
  ]

  const feeStructure = [
    {
      service: 'Initial Consultation',
      description: 'Comprehensive review of your estate planning needs and goals',
      fee: 'Complimentary',
      duration: '60 minutes'
    },
    {
      service: 'Basic Estate Plan',
      description: 'Will, healthcare directive, and financial power of attorney',
      fee: 'Starting at $1,500',
      duration: '2-3 weeks'
    },
    {
      service: 'Revocable Living Trust Package',
      description: 'Complete trust-based estate plan with funding guidance',
      fee: 'Starting at $3,000',
      duration: '3-4 weeks'
    },
    {
      service: 'Advanced Estate Planning',
      description: 'Complex trusts, tax planning, and asset protection strategies',
      fee: 'Custom quote',
      duration: 'Varies'
    },
    {
      service: 'Trust Administration',
      description: 'Guidance for trustees on administration duties and procedures',
      fee: 'Hourly or flat fee',
      duration: 'As needed'
    },
    {
      service: 'Plan Review and Updates',
      description: 'Review of existing documents with recommended amendments',
      fee: 'Starting at $500',
      duration: '1-2 weeks'
    }
  ]

  const consultationSteps = [
    {
      step: 1,
      title: 'Schedule Your Appointment',
      description: 'Book your complimentary consultation online or by phone. We offer both in-person meetings at our Claremont office and virtual consultations for your convenience.'
    },
    {
      step: 2,
      title: 'Complete Intake Questionnaire',
      description: 'Before your consultation, you will receive a confidential questionnaire to help us understand your family situation, assets, and planning goals. This preparation ensures we make the most of our time together.'
    },
    {
      step: 3,
      title: 'Discovery Meeting',
      description: 'During your consultation, our specialist will discuss your goals, explain your options, and answer your questions. We will assess your current situation and recommend an appropriate planning approach.'
    },
    {
      step: 4,
      title: 'Receive Your Proposal',
      description: 'Following the consultation, you will receive a detailed written proposal outlining recommended services, scope of work, timeline, and transparent pricing. There is no obligation to proceed.'
    },
    {
      step: 5,
      title: 'Plan Development',
      description: 'Once you decide to move forward, we gather additional information, draft your documents, and schedule a review meeting to explain each document in detail.'
    },
    {
      step: 6,
      title: 'Signing and Implementation',
      description: 'After your review and approval, we conduct a formal signing ceremony with proper witnessing and notarization. We provide guidance on funding your trust and updating beneficiary designations.'
    },
    {
      step: 7,
      title: 'Ongoing Support',
      description: 'Your relationship with Generation Catalyst does not end at signing. We provide ongoing support, periodic reviews, and updates as your life circumstances change.'
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
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Service Information
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              Service Information
            </h1>
            <p className="text-lg text-neutral-600">
              Comprehensive information about our estate planning services, fee structure, service areas, and what to expect when working with Generation Catalyst.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Our Services</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-neutral-700 leading-relaxed mb-4">
                Generation Catalyst provides comprehensive estate planning services designed to protect your family and preserve your legacy. Our experienced specialists work closely with you to create customized plans that address your unique needs, goals, and circumstances.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                We offer a full range of estate planning services, from basic wills and healthcare directives to sophisticated trust strategies for high-net-worth families. Our collaborative approach ensures that your estate plan integrates seamlessly with your overall financial and legal strategy.
              </p>
            </div>
          </motion.div>

          {/* Fee Structure */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Fee Structure</h2>
            <p className="text-neutral-600 mb-6">
              We believe in transparent, upfront pricing. Below are our standard service packages. Custom quotes are provided for complex matters following an initial assessment.
            </p>
            <div className="space-y-4">
              {feeStructure.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.service}</h3>
                      <p className="text-neutral-600 text-sm">{item.description}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="text-primary-600 font-semibold">{item.fee}</span>
                      <span className="text-neutral-500 text-sm">{item.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-neutral-500 text-sm mt-4">
              * Fees are subject to change. Actual fees may vary based on complexity. A detailed written quote will be provided before any work begins.
            </p>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Service Areas</h2>
            <p className="text-neutral-600 mb-6">
              Generation Catalyst proudly serves families throughout Southern California. Our primary service areas include:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {serviceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-neutral-50 px-4 py-3 rounded-lg border border-neutral-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-neutral-700 font-medium">{area}</span>
                </motion.div>
              ))}
            </div>
            <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
              <h3 className="font-semibold text-neutral-900 mb-2">Virtual Consultations Available</h3>
              <p className="text-neutral-700 text-sm">
                For clients outside our immediate service area or those who prefer remote meetings, we offer secure video consultations. California residents can receive most services virtually, with in-person signing appointments arranged as needed.
              </p>
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">What to Expect During Your Consultation</h2>
            <p className="text-neutral-600 mb-8">
              Our estate planning process is designed to be thorough yet accessible. Here is what you can expect when working with Generation Catalyst:
            </p>
            <div className="space-y-6">
              {consultationSteps.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Licensing */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Professional Licensing and Credentials</h2>
            <div className="bg-white border border-neutral-200 rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Certified Estate Planning Specialists</h3>
                  <p className="text-neutral-600 text-sm">
                    Our team includes certified estate planning specialists with extensive experience in California estate law. We maintain professional certifications and participate in ongoing education to stay current with legal and tax developments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Professional Network</h3>
                  <p className="text-neutral-600 text-sm">
                    We work collaboratively with a network of licensed attorneys, CPAs, financial advisors, and insurance professionals. When your situation requires specialized expertise, we can coordinate with the appropriate professionals.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Continuing Education</h3>
                  <p className="text-neutral-600 text-sm">
                    Our specialists complete regular continuing education to maintain their certifications and stay informed about changes in estate planning law, tax regulations, and best practices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Schedule your complimentary consultation to discuss your estate planning needs with one of our experienced specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/schedule"
                className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
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
              to="/disclosures"
              className="text-primary-600 hover:text-primary-500 font-medium text-sm"
            >
              Professional Disclosures
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ServiceInfoPage
