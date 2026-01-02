import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const GuidesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    'All',
    'Getting Started',
    'Advanced Planning',
    'Tax Strategies',
    'Special Topics'
  ]

  const guides = [
    {
      title: 'Complete Estate Planning Guide',
      description: 'A comprehensive guide covering all aspects of estate planning, from basic documents to advanced strategies. Perfect for anyone starting their estate planning journey.',
      category: 'Getting Started',
      pages: 45,
      downloadUrl: '/resources/complete-estate-planning-guide.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      features: ['Wills & Trusts Overview', 'Powers of Attorney', 'Healthcare Directives', 'Beneficiary Designations'],
      popular: true
    },
    {
      title: 'Trust Administration Handbook',
      description: 'Step-by-step guide for trustees on managing and administering trusts. Includes checklists, timelines, and common pitfalls to avoid.',
      category: 'Advanced Planning',
      pages: 32,
      downloadUrl: '/resources/trust-administration-handbook.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      features: ['Trustee Duties', 'Asset Management', 'Distribution Rules', 'Record Keeping'],
      popular: false
    },
    {
      title: 'California Estate Tax Guide',
      description: 'Everything you need to know about estate taxes in California, including federal coordination, exemption planning, and tax reduction strategies.',
      category: 'Tax Strategies',
      pages: 28,
      downloadUrl: '/resources/california-estate-tax-guide.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      features: ['Federal Exemptions', 'State Tax Rules', 'Gift Strategies', 'Portability'],
      popular: true
    },
    {
      title: 'Special Needs Planning Guide',
      description: 'Comprehensive resource for families planning for loved ones with disabilities. Covers special needs trusts, ABLE accounts, and government benefits preservation.',
      category: 'Special Topics',
      pages: 36,
      downloadUrl: '/resources/special-needs-planning-guide.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      features: ['Third-Party Trusts', 'First-Party Trusts', 'ABLE Accounts', 'Benefits Coordination'],
      popular: false
    },
    {
      title: 'Charitable Giving Strategies',
      description: 'Explore tax-efficient ways to support the causes you care about while maximizing benefits for your estate and heirs.',
      category: 'Tax Strategies',
      pages: 24,
      downloadUrl: '/resources/charitable-giving-strategies.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      features: ['Charitable Trusts', 'Donor-Advised Funds', 'Private Foundations', 'Tax Deductions'],
      popular: false
    },
    {
      title: 'Digital Estate Planning',
      description: 'Modern guide to managing your digital footprint, including cryptocurrency, online accounts, social media, and digital intellectual property.',
      category: 'Special Topics',
      pages: 20,
      downloadUrl: '/resources/digital-estate-planning.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        </svg>
      ),
      features: ['Digital Asset Inventory', 'Password Management', 'Cryptocurrency', 'Social Media'],
      popular: true
    },
    {
      title: 'Business Succession Planning',
      description: 'Essential guide for business owners on transitioning ownership, buy-sell agreements, and protecting family business interests.',
      category: 'Advanced Planning',
      pages: 38,
      downloadUrl: '/resources/business-succession-planning.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      ),
      features: ['Buy-Sell Agreements', 'Valuation Methods', 'Transfer Strategies', 'Key Person Planning'],
      popular: false
    },
    {
      title: 'Estate Planning Checklist',
      description: 'Practical checklist to ensure you have covered all essential aspects of your estate plan. Great for initial planning and periodic reviews.',
      category: 'Getting Started',
      pages: 12,
      downloadUrl: '/resources/estate-planning-checklist.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      features: ['Document Review', 'Asset Inventory', 'Beneficiary Audit', 'Update Timeline'],
      popular: true
    },
    {
      title: 'Blended Family Planning Guide',
      description: 'Navigate the complexities of estate planning when you have children from multiple relationships. Strategies to protect all family members.',
      category: 'Special Topics',
      pages: 26,
      downloadUrl: '/resources/blended-family-planning.pdf',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      features: ['QTIP Trusts', 'Prenuptial Agreements', 'Fair Distribution', 'Family Communication'],
      popular: false
    }
  ]

  const filteredGuides = activeCategory && activeCategory !== 'All'
    ? guides.filter(guide => guide.category === activeCategory)
    : guides

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">
              Free Downloads
            </span>
            <h1 className="heading-xl mb-6">
              Estate Planning <span className="text-gradient">Guides</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Download our comprehensive guides and resources to help you understand
              estate planning concepts and make informed decisions about your future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-width">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === 'All' ? null : category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  (category === 'All' && !activeCategory) || activeCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-600">
              Showing {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''}
              {activeCategory && activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.title}
                className="card card-hover relative flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {guide.popular && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full">
                    Popular
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                    {guide.icon}
                  </div>
                  <div>
                    <span className="badge-secondary text-xs mb-2">
                      {guide.category}
                    </span>
                    <h3 className="font-bold text-neutral-900 text-lg">
                      {guide.title}
                    </h3>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 flex-grow">
                  {guide.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-neutral-500 mb-2">What is covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-neutral-500 text-sm">
                    {guide.pages} pages
                  </span>
                  <a
                    href={guide.downloadUrl}
                    download
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Free
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4">
              How to Use Our <span className="text-gradient">Guides</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our guides are designed to educate and empower you, but they are not a substitute
              for professional advice tailored to your specific situation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Download & Review',
                description: 'Download the guides relevant to your situation and take time to review the information thoroughly.'
              },
              {
                step: '2',
                title: 'Make Notes',
                description: 'As you read, note questions and areas that apply to your specific circumstances and goals.'
              },
              {
                step: '3',
                title: 'Schedule a Consultation',
                description: 'Bring your questions to a consultation with our specialists for personalized guidance.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Custom Guide */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-md mb-4">
                  Need a Guide on a Specific Topic?
                </h2>
                <p className="text-neutral-600 mb-6">
                  We are always looking to expand our resource library. If there is a topic you would
                  like us to cover, let us know and we will consider creating a new guide.
                </p>
                <Link to="/contact" className="btn-primary">
                  Request a Guide
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">9+</p>
                  <p className="text-neutral-600 text-sm">Free Guides</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">250+</p>
                  <p className="text-neutral-600 text-sm">Total Pages</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">4</p>
                  <p className="text-neutral-600 text-sm">Categories</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">100%</p>
                  <p className="text-neutral-600 text-sm">Free Access</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready for Personalized Guidance?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Our guides provide valuable information, but every situation is unique.
              Schedule a consultation to discuss how these concepts apply to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                Schedule a Consultation
              </Link>
              <Link to="/resources" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                View All Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default GuidesPage
