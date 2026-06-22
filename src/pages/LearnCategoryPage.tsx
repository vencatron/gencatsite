import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'

/* ─── Category metadata ─────────────────────────────────────────────── */

interface Category {
  slug: string
  title: string
  description: string
}

const categories: Record<string, Category> = {
  basics: {
    slug: 'basics',
    title: 'Estate planning basics',
    description:
      'What estate planning actually is, the documents involved, the professionals you may need, and how the pieces fit together — explained in plain language.',
  },
  'wills-vs-trusts': {
    slug: 'wills-vs-trusts',
    title: 'Wills vs. trusts: general frameworks',
    description:
      'General frameworks for understanding how wills and trusts differ, the trade-offs families commonly weigh, and the questions worth bringing to a licensed attorney.',
  },
  funding: {
    slug: 'funding',
    title: 'Funding & administration',
    description:
      'Signing documents is the start, not the finish. How trust funding, retitling, and ongoing administration determine whether an estate plan actually works.',
  },
  california: {
    slug: 'california',
    title: 'California-specific concepts',
    description:
      'Community property, Prop 19, probate procedures, and other concepts specific to California families — explained generally, not as advice.',
  },
  glossary: {
    slug: 'glossary',
    title: 'Glossary',
    description:
      'The terms of estate planning, defined without the jargon.',
  },
}

/* ─── Article index ─────────────────────────────────────────────────── */

interface Article {
  slug: string
  category: string
  categorySlug: string
  readTime: string
  title: string
  excerpt: string
}

const articles: Article[] = [
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
    slug: 'when-self-service-estate-planning-makes-sense',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '8 min read',
    title: 'When self-service estate planning makes sense (and when it doesn\'t)',
    excerpt:
      'An honest general framework for online estate planning platforms: situations where they tend to fit, signals that a family needs an attorney, and the gaps to plan for.',
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
    slug: 'why-most-trusts-fail',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '8 min read',
    title: 'Why most trusts fail when families need them most',
    excerpt:
      'Wealth transfers fail far more often from poor funding, communication, and coordination than from bad documents. A look at the gap nobody talks about.',
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
    slug: 'california-community-property',
    category: 'California',
    categorySlug: 'california',
    readTime: '8 min read',
    title: 'California community property and your estate plan',
    excerpt:
      'How California\'s community property system interacts with estate planning generally — characterization, the double basis step-up, and why titling matters.',
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

/* ─── Glossary terms ─────────────────────────────────────────────────── */

const glossaryTerms = [
  {
    term: 'Beneficiary',
    definition:
      'A person or entity designated to receive assets from a trust, will, retirement account, or life insurance policy.',
  },
  {
    term: 'Decedent',
    definition:
      'The person who has died. Used in legal and tax contexts to refer to the individual whose estate is being administered.',
  },
  {
    term: 'Estate',
    definition:
      'The total of all assets and liabilities owned by a person at the time of death, before distribution to heirs.',
  },
  {
    term: 'Executor / Personal Representative',
    definition:
      'The person named in a will to manage the probate process — collecting assets, paying debts, and distributing property to beneficiaries under court supervision.',
  },
  {
    term: 'Fiduciary',
    definition:
      'A person legally obligated to act in the best interests of another. Trustees, executors, and agents under a power of attorney are fiduciaries.',
  },
  {
    term: 'Funding (trust funding)',
    definition:
      'The process of transferring ownership of assets into a trust so the trust can control them. A trust that is not funded provides no probate avoidance.',
  },
  {
    term: 'Grantor / Trustmaker / Settlor',
    definition:
      'The person who creates a trust. All three terms refer to the same role; usage varies by state and practitioner.',
  },
  {
    term: 'Intestate',
    definition:
      'Dying without a valid will. State intestacy laws then determine how assets are distributed, which may not match the decedent\'s wishes.',
  },
  {
    term: 'Irrevocable Trust',
    definition:
      'A trust that generally cannot be modified or revoked after creation. Assets transferred in are typically removed from the grantor\'s taxable estate.',
  },
  {
    term: 'Letters Testamentary / Letters of Administration',
    definition:
      'Court documents authorizing an executor or administrator to act on behalf of an estate. Financial institutions and agencies require these before releasing assets.',
  },
  {
    term: 'Pour-Over Will',
    definition:
      'A will designed to work alongside a trust, directing any assets not already in the trust at death to "pour over" into the trust through probate.',
  },
  {
    term: 'Power of Attorney (Financial)',
    definition:
      'A legal document authorizing a designated agent to manage financial affairs on behalf of the principal. A "durable" power of attorney remains valid if the principal becomes incapacitated.',
  },
  {
    term: 'Probate',
    definition:
      'The court-supervised process of validating a will, paying debts, and distributing a decedent\'s assets. Probate is public record, can take many months, and involves statutory fees.',
  },
  {
    term: 'Revocable Living Trust',
    definition:
      'A trust created during the grantor\'s lifetime that can be modified or revoked at any time. Assets held in the trust avoid probate at death and can be managed by a successor trustee during incapacity.',
  },
  {
    term: 'Step-Up in Basis',
    definition:
      'When an heir inherits an asset, its cost basis is generally "stepped up" to the fair market value at the date of death, potentially eliminating capital gains tax on appreciation during the decedent\'s lifetime.',
  },
  {
    term: 'Successor Trustee',
    definition:
      'The person or institution named to take over management of a trust if the original trustee dies, resigns, or becomes incapacitated.',
  },
  {
    term: 'Trustee',
    definition:
      'The person or institution that manages trust assets according to the trust\'s terms and in the interest of the beneficiaries.',
  },
]

/* ─── Components ─────────────────────────────────────────────────────── */

const ArticleCard = ({ article }: { article: Article }) => (
  <div className="card card-hover flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <span className="badge-category">{article.category}</span>
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

const GlossaryPage = () => (
  <div className="min-h-screen">
    <section className="bg-primary-50 border-b border-neutral-200">
      <div className="container-width py-14 lg:py-16">
        <Link
          to="/learn"
          className="text-sm font-medium text-accent-700 hover:text-accent-800 inline-flex items-center gap-1 mb-6 transition-colors duration-150"
        >
          <span aria-hidden="true">&larr;</span> All topics
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="heading-lg text-primary-900 mb-4">Glossary</h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            The terms of estate planning, defined without the jargon.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="bg-white section-padding">
      <div className="container-width">
        <div className="max-w-3xl mx-auto divide-y divide-neutral-200">
          {glossaryTerms.map((item, i) => (
            <motion.div
              key={item.term}
              className="py-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <dt className="font-serif text-lg font-semibold text-primary-900 mb-1">
                {item.term}
              </dt>
              <dd className="text-neutral-600 leading-relaxed">{item.definition}</dd>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CtaBanner />
  </div>
)

const CtaBanner = () => (
  <section className="section-cta section-padding">
    <div className="container-width">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="heading-md text-white mb-3">Not sure where to start?</h2>
          <p className="text-primary-200 leading-relaxed">
            A Family Planning Conversation is a 90-minute structured session that
            orients your family on the process, identifies gaps, and produces a
            roadmap of the professionals you'll need — before you spend a dollar on
            legal fees.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link to="/services/family-conversation" className="btn-secondary">
            How it works
          </Link>
          <Link to="/contact" className="btn-accent">
            Book a Family Planning Conversation
          </Link>
        </div>
      </div>
    </div>
  </section>
)

/* ─── Page ─────────────────────────────────────────────────────────── */

const LearnCategoryPage = () => {
  // Supports both :slug (from LearnSlugPage router) and :categorySlug (direct route)
  const params = useParams<{ slug?: string; categorySlug?: string }>()
  const categorySlug = params.slug ?? params.categorySlug

  if (categorySlug === 'glossary') {
    return <GlossaryPage />
  }

  const category = categorySlug ? categories[categorySlug] : undefined

  if (!category) {
    return <Navigate to="/learn" replace />
  }

  const categoryArticles = articles.filter(
    (a) => a.categorySlug === category.slug,
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary-50 border-b border-neutral-200">
        <div className="container-width py-14 lg:py-16">
          <Link
            to="/learn"
            className="text-sm font-medium text-accent-700 hover:text-accent-800 inline-flex items-center gap-1 mb-6 transition-colors duration-150"
          >
            <span aria-hidden="true">&larr;</span> All topics
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="heading-lg text-primary-900 mb-4">{category.title}</h1>
            <p className="text-lg text-neutral-600 max-w-2xl">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-white section-padding">
        <div className="container-width">
          {categoryArticles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryArticles.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">
              Articles for this topic are coming soon.
            </p>
          )}
        </div>
      </section>

      <CtaBanner />
    </div>
  )
}

export default LearnCategoryPage
