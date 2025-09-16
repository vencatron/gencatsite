import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Pricing = () => {
  const packages = [
    {
      name: 'Essential Will Package',
      price: '$799',
      description: 'Perfect for individuals and couples starting their estate planning journey',
      popular: false,
      features: [
        'Last Will & Testament',
        'Financial Power of Attorney',
        'Healthcare Power of Attorney',
        'HIPAA Authorization',
        'Personal Property Memorandum',
        'Estate Planning Questionnaire Review',
        'Document Signing Ceremony',
        'Secure Document Storage',
        '1-Year Free Updates',
      ],
      notIncluded: [
        'Trust Creation',
        'Tax Planning Strategies',
        'Business Succession Planning',
      ],
    },
    {
      name: 'Comprehensive Trust Package',
      price: '$2,499',
      description: 'Complete estate planning solution for families with significant assets',
      popular: true,
      features: [
        'Revocable Living Trust',
        'Pour-Over Will',
        'Financial Power of Attorney',
        'Healthcare Power of Attorney',
        'HIPAA Authorization',
        'Trust Funding Assistance',
        'Successor Trustee Instructions',
        'Tax Planning Consultation',
        'Asset Protection Strategies',
        'Secure Document Storage',
        'Lifetime Document Updates',
        'Annual Plan Review',
      ],
      notIncluded: [
        'Complex Tax Structures',
        'International Assets',
      ],
    },
    {
      name: 'Premium Estate Plan',
      price: '$4,999',
      description: 'Advanced strategies for high-net-worth individuals and business owners',
      popular: false,
      features: [
        'Multiple Trust Structures',
        'Generation-Skipping Trusts',
        'Business Succession Planning',
        'Advanced Tax Strategies',
        'Charitable Giving Plans',
        'Asset Protection Trusts',
        'Family Limited Partnership',
        'International Estate Planning',
        'Family Governance Documents',
        'Ongoing Tax Monitoring',
        'Quarterly Strategy Reviews',
        'Priority Client Support',
        'Lifetime Updates & Revisions',
      ],
      notIncluded: [],
    },
  ]

  const addOns = [
    {
      name: 'Guardianship Documents',
      price: '$299',
      description: 'Nomination of guardian for minor children',
    },
    {
      name: 'Gun Trust',
      price: '$499',
      description: 'Specialized trust for firearms and NFA items',
    },
    {
      name: 'Pet Trust',
      price: '$399',
      description: 'Ensure your pets are cared for',
    },
    {
      name: 'Business Entity Review',
      price: '$599',
      description: 'Analysis of business structure for estate planning',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-20 bg-neutral-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-accent-100 text-accent-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Fixed-Price Estate Planning{' '}
            <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            No hourly billing. No surprise fees. Choose the package that's right for your family 
            and know exactly what you'll pay upfront.
          </p>
          
          {/* Value proposition */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-primary-800 font-medium">Free Initial Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-primary-800 font-medium">Payment Plans Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-primary-800 font-medium">30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Package Comparison */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

       

          {packages.map((pkg, _index) => (

            <motion.div
              key={pkg.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                pkg.popular
                  ? 'border-2 border-primary-500 transform scale-105'
                  : 'border border-neutral-200'
              }`}
              variants={itemVariants}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{pkg.name}</h3>
                <p className="text-neutral-600 mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">{pkg.price}</span>
                  <span className="text-neutral-600 ml-2">one-time fee</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-neutral-900 text-sm uppercase tracking-wide">
                  What's Included:
                </h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-neutral-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {pkg.notIncluded.length > 0 && (
                  <>
                    <h4 className="font-semibold text-neutral-900 text-sm uppercase tracking-wide mt-6">
                      Not Included:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.notIncluded.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                          <span className="text-neutral-500 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    pkg.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                  }`}
                >
                  Get Started Today
                </Link>
                <p className="text-xs text-neutral-500 text-center">
                  Free consultation • No obligation
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Additional Services & Add-Ons
            </h3>
            <p className="text-neutral-600">
              Customize your estate plan with these specialized services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <h4 className="font-semibold text-neutral-900 mb-2">{addon.name}</h4>
                <p className="text-sm text-neutral-600 mb-4">{addon.description}</p>
                <div className="text-lg font-bold text-primary-600">{addon.price}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16 bg-neutral-100 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Do you offer payment plans?</h4>
              <p className="text-neutral-600 mb-6">
                Yes! We offer flexible payment plans for all packages. Split your payment into 2, 3, or 6 monthly installments with no interest or fees.
              </p>
              
              <h4 className="font-semibold text-neutral-900 mb-3">What if I need changes later?</h4>
              <p className="text-neutral-600">
                All packages include document updates. The Essential package includes 1 year of free updates, while Trust and Premium packages include lifetime updates.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">How long does the process take?</h4>
              <p className="text-neutral-600 mb-6">
                Most estate plans are completed within 2-3 weeks from our initial meeting. Complex Premium plans may take 4-6 weeks depending on the structures involved.
              </p>
              
              <h4 className="font-semibold text-neutral-900 mb-3">Is the consultation really free?</h4>
              <p className="text-neutral-600">
                Absolutely! Your initial consultation is completely free with no obligation. We'll assess your needs and recommend the right package for your situation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            Ready to Protect Your Family's Future?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Schedule your free consultation today and discover which estate planning package is right for your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary shadow-lg hover:shadow-xl transition-shadow">
              Schedule Free Consultation
            </Link>
            <a href="tel:(555)123-4567" className="btn-outline">
              Call (555) 123-4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
