import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    'All',
    'Calculators',
    'Comparison Tools',
    'Estimators',
    'Planning Tools'
  ]

  const tools = [
    {
      title: 'Estate Tax Calculator',
      description: 'Estimate your potential federal estate tax liability based on your total estate value. Understand how exemptions and deductions may reduce your tax burden.',
      category: 'Calculators',
      toolUrl: '/resources/estate-tax-calculator.html',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      inputs: ['Total Estate Value', 'Exemption Amount', 'Deductions'],
      outputs: ['Taxable Estate', 'Estimated Tax', 'Effective Rate'],
      featured: true
    },
    {
      title: 'Probate Cost Estimator',
      description: 'Calculate the approximate costs of probate in California, including attorney fees, executor fees, court costs, and other expenses.',
      category: 'Estimators',
      toolUrl: '/resources/tools/probate-cost-estimator',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      inputs: ['Estate Value', 'Property Count', 'Complexity Level'],
      outputs: ['Attorney Fees', 'Executor Fees', 'Total Costs'],
      featured: true
    },
    {
      title: 'Trust vs Will Comparison Tool',
      description: 'Interactive comparison tool to help you understand the differences between trusts and wills, and which might be better for your situation.',
      category: 'Comparison Tools',
      toolUrl: '/resources/will-vs-trust-guide.html',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.41-1.41L15.5 16.75L11.91 20.34 10.5 18.93l1.41-1.41 2.59 2.58L19.91 15.75l1.41 1.41-6.32 6.32z"/>
        </svg>
      ),
      inputs: ['Asset Types', 'Family Situation', 'Privacy Needs'],
      outputs: ['Recommendation', 'Key Differences', 'Cost Comparison'],
      featured: true
    },
    {
      title: 'Retirement Distribution Calculator',
      description: 'Calculate required minimum distributions (RMDs) from retirement accounts and understand the tax implications of different distribution strategies.',
      category: 'Calculators',
      toolUrl: '/resources/tools/retirement-distribution',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
      inputs: ['Account Balance', 'Age', 'Account Type'],
      outputs: ['Annual RMD', 'Distribution Schedule', 'Tax Estimate'],
      featured: false
    },
    {
      title: 'Life Insurance Needs Calculator',
      description: 'Determine how much life insurance coverage you need based on your income, debts, dependents, and financial goals.',
      category: 'Calculators',
      toolUrl: '/resources/tools/life-insurance-needs',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      ),
      inputs: ['Annual Income', 'Outstanding Debts', 'Number of Dependents'],
      outputs: ['Coverage Needed', 'Income Replacement', 'Final Expenses'],
      featured: false
    },
    {
      title: 'Gift Tax Calculator',
      description: 'Calculate whether a gift requires filing a gift tax return and how it affects your lifetime exemption.',
      category: 'Calculators',
      toolUrl: '/resources/tools/gift-tax',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
        </svg>
      ),
      inputs: ['Gift Amount', 'Recipient Type', 'Previous Gifts'],
      outputs: ['Filing Required', 'Taxable Amount', 'Remaining Exemption'],
      featured: false
    },
    {
      title: 'Trust Type Selector',
      description: 'Answer a series of questions to determine which type of trust might best meet your estate planning goals.',
      category: 'Planning Tools',
      toolUrl: '/resources/tools/trust-selector',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      inputs: ['Primary Goals', 'Asset Types', 'Beneficiary Needs'],
      outputs: ['Recommended Trusts', 'Key Features', 'Next Steps'],
      featured: false
    },
    {
      title: 'Charitable Deduction Estimator',
      description: 'Estimate the tax benefits of various charitable giving strategies, including direct gifts, charitable trusts, and donor-advised funds.',
      category: 'Estimators',
      toolUrl: '/resources/tools/charitable-deduction',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      inputs: ['Donation Amount', 'Income Level', 'Gift Type'],
      outputs: ['Tax Deduction', 'Net Cost', 'Comparison'],
      featured: false
    },
    {
      title: 'Estate Plan Review Checklist',
      description: 'Interactive checklist to assess whether your current estate plan is up to date and comprehensive.',
      category: 'Planning Tools',
      toolUrl: '/resources/tools/estate-review-checklist',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      inputs: ['Document Dates', 'Life Changes', 'Beneficiary Status'],
      outputs: ['Review Score', 'Action Items', 'Priority List'],
      featured: false
    }
  ]

  const filteredTools = activeCategory && activeCategory !== 'All'
    ? tools.filter(tool => tool.category === activeCategory)
    : tools

  const featuredTools = filteredTools.filter(tool => tool.featured)
  const regularTools = filteredTools.filter(tool => !tool.featured)

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
              Interactive Tools
            </span>
            <h1 className="heading-xl mb-6">
              Estate Planning <span className="text-gradient">Calculators & Tools</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Use our free interactive tools to estimate taxes, compare options, and plan
              your estate. These calculators provide estimates for educational purposes.
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

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="section-padding">
          <div className="container-width">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-2">
                Featured <span className="text-gradient">Tools</span>
              </h2>
              <p className="text-neutral-600">Our most popular and useful calculators</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {featuredTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  className="card card-hover bg-gradient-to-br from-primary-50 to-white relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full">
                    Featured
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                      {tool.icon}
                    </div>
                    <div>
                      <span className="badge-secondary text-xs">
                        {tool.category}
                      </span>
                      <h3 className="font-bold text-neutral-900 text-lg">
                        {tool.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm mb-6">
                    {tool.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 mb-2">Inputs:</p>
                      <ul className="space-y-1">
                        {tool.inputs.map((input, i) => (
                          <li key={i} className="text-xs text-neutral-600 flex items-center gap-1">
                            <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            {input}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 mb-2">Outputs:</p>
                      <ul className="space-y-1">
                        {tool.outputs.map((output, i) => (
                          <li key={i} className="text-xs text-neutral-600 flex items-center gap-1">
                            <svg className="w-3 h-3 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            {output}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={tool.toolUrl}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Launch Tool
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tools Grid */}
      <section className={`section-padding ${featuredTools.length > 0 ? 'bg-neutral-50' : ''}`}>
        <div className="container-width">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-2">
              {activeCategory && activeCategory !== 'All' ? activeCategory : 'All'} <span className="text-gradient">Tools</span>
            </h2>
            <p className="text-neutral-600">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} available
            </p>
          </motion.div>

          {regularTools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  className="card card-hover flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div>
                      <span className="badge-secondary text-xs mb-1">
                        {tool.category}
                      </span>
                      <h3 className="font-bold text-neutral-900">
                        {tool.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm mb-4 flex-grow">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.outputs.map((output, i) => (
                      <span key={i} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                        {output}
                      </span>
                    ))}
                  </div>

                  <a
                    href={tool.toolUrl}
                    className="btn-outline w-full text-center flex items-center justify-center gap-2"
                  >
                    Use Tool
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-neutral-700 mb-2">No tools in this category</h3>
              <p className="text-neutral-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="bg-secondary-50 border border-secondary-200 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Important Disclaimer</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  These calculators and tools are provided for educational and informational purposes only.
                  Results are estimates based on the information you provide and current tax laws, which may change.
                  These tools do not constitute legal, tax, or financial advice. For personalized guidance specific
                  to your situation, please consult with a qualified estate planning attorney, tax advisor, or
                  financial planner.
                </p>
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
              Need Help Interpreting Your Results?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Our experienced estate planning specialists can help you understand what these
              calculations mean for your specific situation and recommend the best strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                Schedule a Consultation
              </Link>
              <Link to="/resources/guides" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                View Planning Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ToolsPage
