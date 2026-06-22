import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Tool {
  name: string
  category: string
  description: string
  bestFor: string
  notFor: string
  url: string
  affiliate: boolean
  rating: 'Strong Recommend' | 'Situational' | 'Use With Caution'
}

const tools: Tool[] = [
  {
    name: 'Trust & Will',
    category: 'Online Estate Planning',
    description:
      'Browser-based platform that guides users through creating wills, trusts, and powers of attorney with attorney review included in higher tiers. Best for straightforward situations without complex assets or blended families.',
    bestFor: 'Single adults and married couples with straightforward estates under $500K, no business interests, and clear beneficiary wishes.',
    notFor: 'Blended families, business owners, estates with real property in multiple states, or anyone needing irrevocable trusts.',
    url: 'https://trustandwill.com',
    affiliate: true,
    rating: 'Situational',
  },
  {
    name: 'Everplans',
    category: 'Document Vault & Organization',
    description:
      'A secure digital vault for storing and sharing estate planning documents, account information, and end-of-life instructions with designated people. Not a legal drafting platform — purely organizational.',
    bestFor: 'Families who already have estate documents and need a secure, organized place to store them with conditional access for heirs.',
    notFor: 'Drafting legal documents. This is storage and organization only.',
    url: 'https://www.everplans.com',
    affiliate: false,
    rating: 'Strong Recommend',
  },
  {
    name: 'Wealth.com',
    category: 'Online Estate Planning',
    description:
      'Attorney-backed platform with live attorney access, trust creation, and integration with financial institutions. More robust than Trust & Will for complex situations, though still not a substitute for a full-service estate attorney.',
    bestFor: 'Families with moderate complexity — real property, multiple accounts, minor children — who want a cost-effective alternative to a traditional attorney for standard documents.',
    notFor: 'Business succession planning, significant irrevocable trust strategies, or estates over $5M with tax planning needs.',
    url: 'https://wealth.com',
    affiliate: true,
    rating: 'Situational',
  },
  {
    name: 'Monarch Money',
    category: 'Financial Organization',
    description:
      'Comprehensive personal finance tracker that aggregates accounts, tracks net worth, and provides a clear picture of all assets in one place. Useful for creating the asset inventory that estate planning requires.',
    bestFor: 'Anyone starting the estate planning process who needs a clear picture of their financial landscape before meeting with an attorney.',
    notFor: 'Estate planning itself — this is financial tracking, not legal planning.',
    url: 'https://monarchmoney.com',
    affiliate: true,
    rating: 'Strong Recommend',
  },
  {
    name: 'DocuSign',
    category: 'Document Execution',
    description:
      'Electronic signature platform. Note: California requires wet (physical) signatures on wills and many trust documents. DocuSign is useful for powers of attorney and other documents that permit electronic execution.',
    bestFor: 'Signing documents that legally permit electronic execution — powers of attorney, certain financial account forms.',
    notFor: 'Wills and most trust documents in California, which require physical signature and notarization. Always confirm with your attorney before e-signing estate documents.',
    url: 'https://docusign.com',
    affiliate: false,
    rating: 'Use With Caution',
  },
  {
    name: '1Password',
    category: 'Digital Asset Management',
    description:
      'Password manager with an "Emergency Kit" feature that can be given to a trusted person. For estate planning, the goal is ensuring a trustee or executor can access digital accounts after death or incapacity.',
    bestFor: 'Anyone with significant online accounts, cryptocurrency, or digital subscriptions who wants to ensure their executor can access them.',
    notFor: 'Storing legal documents — use a proper document vault for those.',
    url: 'https://1password.com',
    affiliate: false,
    rating: 'Strong Recommend',
  },
]

const ratingConfig = {
  'Strong Recommend': {
    color: 'text-primary-700 bg-primary-100',
    dot: 'bg-primary-600',
  },
  'Situational': {
    color: 'text-accent-700 bg-accent-100',
    dot: 'bg-accent-500',
  },
  'Use With Caution': {
    color: 'text-neutral-700 bg-neutral-200',
    dot: 'bg-neutral-500',
  },
}

const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))]

import { useState } from 'react'

const ResourcesRecommendedToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All'
    ? tools
    : tools.filter(t => t.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white border-b border-primary-100 py-20">
        <div className="container-width">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/resources"
              className="text-sm text-primary-600 hover:text-primary-500 inline-flex items-center gap-1 mb-6"
            >
              &larr; All Resources
            </Link>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4 block">
              Recommended Tools
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-900 leading-tight mb-6">
              Tools We Recommend
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Self-service platforms and tools we have personally evaluated. We include honest framing
              about when each one fits — and when it does not. Some links are affiliate links, which
              is disclosed plainly on each card.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Affiliate disclosure banner */}
      <section className="bg-accent-50 border-b border-accent-200 py-4">
        <div className="container-width">
          <p className="text-xs text-accent-800 flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <span>
              <strong>Affiliate disclosure:</strong> Some tools on this page include affiliate links — marked
              with "Affiliate link" on the card. If you purchase through those links, Generation Catalyst may
              earn a commission at no added cost to you. We only recommend tools we have evaluated and would
              use ourselves. Affiliate relationships do not influence our ratings.
            </span>
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-6 bg-white border-b border-neutral-200">
        <div className="container-width">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-700 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((tool, index) => {
              const rating = ratingConfig[tool.rating]
              return (
                <motion.div
                  key={tool.name}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  viewport={{ once: true }}
                >
                  {/* Card header */}
                  <div className="p-6 border-b border-neutral-100">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block mb-1">
                          {tool.category}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-primary-900">{tool.name}</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${rating.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${rating.dot}`} />
                        {tool.rating}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{tool.description}</p>
                  </div>

                  {/* Best for / Not for */}
                  <div className="p-6 flex-grow grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        Best for
                      </p>
                      <p className="text-xs text-neutral-600 leading-relaxed">{tool.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                        Not for
                      </p>
                      <p className="text-xs text-neutral-600 leading-relaxed">{tool.notFor}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
                    {tool.affiliate && (
                      <span className="text-xs text-accent-700 font-medium">Affiliate link</span>
                    )}
                    {!tool.affiliate && (
                      <span className="text-xs text-neutral-400">No affiliate relationship</span>
                    )}
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary-700 hover:text-primary-600 inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      Visit site
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="py-10 bg-white border-t border-neutral-200">
        <div className="container-width max-w-3xl">
          <h3 className="font-semibold text-neutral-800 mb-2 text-sm">How we evaluate tools</h3>
          <p className="text-xs text-neutral-500 leading-relaxed mb-3">
            We evaluate tools against three questions: (1) Does it work as advertised? (2) Is the
            scope honest — does the tool know what it is not? (3) Would we recommend it to a client
            without embarrassment? A tool that works well for simple situations but overpromises for
            complex ones gets a Situational rating, not a Strong Recommend.
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Generation Catalyst LLC is not affiliated with any of the companies listed above unless
            explicitly noted as an affiliate relationship. Tool ratings reflect our independent
            evaluation and are not influenced by commercial relationships.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-900 py-16">
        <div className="container-width">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl font-bold text-white mb-3">
                Not sure which tool is right for you?
              </h2>
              <p className="text-primary-200 leading-relaxed">
                A Family Planning Conversation will tell you exactly what you need — and whether a
                self-service tool is the right fit or whether you need a licensed professional.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/resources/checklist"
                className="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white hover:text-primary-900 transition-colors duration-200 text-center"
              >
                Start with the checklist
              </Link>
              <Link
                to="/schedule"
                className="bg-accent-500 hover:bg-accent-400 text-primary-950 font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 text-center"
              >
                Book a Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ResourcesRecommendedToolsPage
