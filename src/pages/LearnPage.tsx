import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

/* ─── Data ─────────────────────────────────────────────────────────── */

const topics = [
  {
    title: 'Basics',
    slug: 'basics',
    description:
      'What estate planning actually is, the documents involved, the professionals you may need, and how the pieces fit together — explained in plain language.',
  },
  {
    title: 'Wills vs. Trusts',
    slug: 'wills-vs-trusts',
    description:
      'General frameworks for understanding how wills and trusts differ, the trade-offs families commonly weigh, and the questions worth bringing to a licensed attorney.',
  },
  {
    title: 'Funding & Administration',
    slug: 'funding',
    description:
      'Signing documents is the start, not the finish. How trust funding, retitling, and ongoing administration determine whether an estate plan actually works.',
  },
  {
    title: 'California',
    slug: 'california',
    description:
      'Community property, Prop 19, probate procedures, and other concepts specific to California families — explained generally, not as advice.',
  },
  {
    title: 'Glossary',
    slug: 'glossary',
    description:
      'The terms of estate planning, defined without the jargon.',
  },
]

const featuredArticles = [
  {
    slug: 'why-most-trusts-fail',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '8 min read',
    title: 'Why most trusts fail when families need them most',
    excerpt:
      'Wealth transfers fail far more often from poor funding, communication, and coordination than from bad documents. A look at the gap nobody talks about.',
  },
  {
    slug: 'wills-vs-trusts-framework',
    category: 'Wills vs. Trusts',
    categorySlug: 'wills-vs-trusts',
    readTime: '8 min read',
    title: 'Wills vs. trusts: a framework for thinking about the choice',
    excerpt:
      'A general framework for understanding how wills and trusts differ — probate, incapacity, privacy, cost, and complexity — without telling you which to pick.',
  },
  {
    slug: 'prop-19-california',
    category: 'California',
    categorySlug: 'california',
    readTime: '8 min read',
    title: 'Prop 19 and what it changed for California families',
    excerpt:
      'A general explainer of Proposition 19: how it narrowed the parent-child property tax exclusion and expanded base-year transfers for homeowners 55 and over.',
  },
]

const allArticles = [
  {
    slug: '8-documents-complete-estate-plan',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '9 min read',
    title: 'The 8 documents in a complete estate plan',
    excerpt:
      'A plain-language taxonomy of the documents most estate plans include — what each one generally does, and why the set matters more than any single piece.',
  },
  {
    slug: 'california-community-property',
    category: 'California',
    categorySlug: 'california',
    readTime: '8 min read',
    title: 'California community property and your estate plan',
    excerpt:
      'How California\'s community property system interacts with estate planning generally — characterization, the double basis step-up, and why titling matters.',
  },
  {
    slug: 'role-of-cpa-estate-planning',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '7 min read',
    title: 'The role of a CPA in estate planning',
    excerpt:
      'Estate planning is a team sport. What the CPA\'s lane actually covers — projections, basis, gifting analysis, fiduciary returns — and how it complements the attorney\'s.',
  },
  {
    slug: 'questions-before-hiring-estate-attorney',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '8 min read',
    title: 'Questions to ask before you hire an estate planning attorney',
    excerpt:
      'A preparation guide: how families generally evaluate estate planning attorneys, what to ask in the first meeting, and what to bring so the engagement is efficient.',
  },
  {
    slug: 'what-is-trust-funding',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '8 min read',
    title: 'What is trust funding and why nobody talks about it',
    excerpt:
      'The most consequential step in estate planning is the one most families skip. A plain-language explanation of what trust funding is and why it matters.',
  },
  {
    slug: 'trust-administration-first-90-days',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '9 min read',
    title: 'Trust administration after a death: a family\'s first 90 days',
    excerpt:
      'What actually happens after a trustmaker dies. A step-by-step look at the immediate tasks, who handles them, and what to watch out for.',
  },
  {
    slug: 'when-self-service-estate-planning-makes-sense',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '8 min read',
    title: 'When self-service estate planning makes sense (and when it doesn\'t)',
    excerpt:
      'An honest general framework for online estate planning platforms: situations where they tend to fit, signals that a family needs an attorney, and the gaps to plan for.',
  },
]

/* ─── Sub-components ─────────────────────────────────────────────── */

const ArticleCard = ({
  article,
}: {
  article: (typeof featuredArticles)[0] | (typeof allArticles)[0]
}) => (
  <div className="card card-hover flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <Link
        to={`/learn/${article.categorySlug}`}
        className="badge-category hover:bg-primary-200 transition-colors duration-150"
      >
        {article.category}
      </Link>
      <span className="text-xs text-neutral-500">{article.readTime}</span>
    </div>
    <h3 className="font-serif text-lg font-semibold text-primary-900 mb-2 leading-snug">
      {article.title}
    </h3>
    <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
      {article.excerpt}
    </p>
    <Link
      to={`/learn/${article.slug}`}
      className="text-sm font-medium text-accent-700 hover:text-accent-800 inline-flex items-center gap-1 transition-colors duration-150"
    >
      Read article <span aria-hidden="true">&rarr;</span>
    </Link>
  </div>
)

/* ─── Page ─────────────────────────────────────────────────────────── */

const LearnPage = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailCapture = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to an email service
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 border-b border-neutral-200">
        <div className="container-width py-16 lg:py-20">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow-accent mb-4">The Learn Hub</p>
            <h1 className="heading-lg text-primary-900 mb-5">
              Estate planning, explained in plain language
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              General frameworks for understanding how estate planning works — the
              documents, the professionals, the taxes, and the follow-through.
              Everything here is education for any reader, not advice for your
              specific situation; for that, you need a licensed attorney.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Browse by topic ──────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <motion.h2
            className="heading-sm text-primary-900 mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Browse by topic
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={`/learn/${topic.slug}`}
                  className="block card card-hover h-full group"
                >
                  <h3 className="font-serif text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors duration-150">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {topic.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────────────── */}
      <section className="bg-neutral-50 section-padding border-t border-neutral-200">
        <div className="container-width">
          <motion.h2
            className="heading-sm text-primary-900 mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Featured
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All articles ─────────────────────────────────────────────── */}
      <section className="bg-white section-padding border-t border-neutral-200">
        <div className="container-width">
          <motion.h2
            className="heading-sm text-primary-900 mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            All articles
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email capture ────────────────────────────────────────────── */}
      <section className="bg-primary-900 py-14 lg:py-16">
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">
                Get the Estate Planning Readiness Checklist
              </h2>
              <p className="text-primary-200 mb-6 leading-relaxed">
                The companion to these articles: a plain-language checklist for
                getting your family organized before engaging any professional.
              </p>

              {submitted ? (
                <p className="text-accent-300 font-medium">
                  Check your inbox — the checklist is on its way.
                </p>
              ) : (
                <form
                  onSubmit={handleEmailCapture}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <label htmlFor="checklist-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="checklist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 input-field"
                  />
                  <button type="submit" className="btn-accent whitespace-nowrap">
                    Get the checklist
                  </button>
                </form>
              )}

              <p className="text-xs text-primary-400 mt-4">
                We'll send the checklist plus occasional educational content. No
                spam, unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="bg-primary-50 section-padding border-t border-primary-100">
        <div className="container-width">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-md text-primary-900 mb-3">
                Not sure where to start?
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                A Family Planning Conversation is a 90-minute structured session
                that orients your family on the process, identifies gaps, and
                produces a roadmap of the professionals you'll need — before you
                spend a dollar on legal fees.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/services/family-conversation" className="btn-outline">
                How it works
              </Link>
              <Link to="/contact" className="btn-primary">
                Book a Family Planning Conversation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LearnPage
