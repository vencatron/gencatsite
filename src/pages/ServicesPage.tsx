import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const tiers = [
  {
    tier: 'Tier 1',
    title: 'Family Planning Conversation',
    tagline: 'Get oriented before you engage anyone else.',
    blurb:
      'A 90-minute structured consultation that orients your family on the estate planning process, identifies gaps, and produces a personalized roadmap of the professionals you need.',
    href: '/services/family-conversation',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-2 12H6v-2h12v2zm0-4H6V8h12v2z" />
      </svg>
    ),
  },
  {
    tier: 'Tier 2',
    title: 'Trust Funding & Implementation',
    tagline: 'Your attorney designed the plan. We make sure it gets connected to your assets.',
    blurb:
      'Project-manages trust funding — retitling accounts and real estate, assigning business interests, updating beneficiaries — tracked to completion with proof.',
    href: '/services/trust-funding',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
  },
  {
    tier: 'Tier 3',
    title: 'Ongoing Tax & Administration',
    tagline: 'The annual tax discipline that keeps an estate plan working.',
    blurb:
      'Standard CPA services built around estate plans: fiduciary and gift tax compliance, basis tracking, beneficiary K-1s, and an annual check-in to keep everything current.',
    href: '/services/tax-administration',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
  },
  {
    tier: 'Tier 4',
    title: 'Strategic Engagement',
    tagline: 'Full-spectrum coordination for business owners and complex estates.',
    blurb:
      'Comprehensive multi-year engagement: tax projections, gifting strategy, business succession coordination, and full professional-team facilitation.',
    href: '/services/strategic',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

const additionalServices = [
  {
    title: 'Estate Planning',
    blurb:
      'Tailored plans to protect your family, assets, and legacy — coordinating every professional on your team so nothing falls through the cracks.',
    href: '/services/estate-planning',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    title: 'Wills & Trusts',
    blurb:
      'Most trusts are never properly funded. We ensure your assets are actually transferred into your trust after it is created — the step most attorneys skip.',
    href: '/services/wills-trusts',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    title: 'Tax Planning',
    blurb:
      'Smart, proactive strategies to minimize estate tax exposure — charitable strategies, wealth transfer, and generation-skipping trusts designed to last.',
    href: '/services/tax-planning',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
]

const compareRows: { label: string; values: string[] }[] = [
  {
    label: 'Best for',
    values: [
      'Families just getting started',
      'Families with a signed trust',
      'Ongoing estate tax compliance',
      'Business owners & complex estates',
    ],
  },
  {
    label: 'Engagement length',
    values: ['One session (90 min)', '3 – 6 months', 'Annual retainer', 'Multi-year'],
  },
  {
    label: 'Tax compliance (1041/709/706)',
    values: ['—', '—', '✓ Included', '✓ Included'],
  },
  {
    label: 'Trust funding project management',
    values: ['—', '✓ Included', '—', '✓ Included'],
  },
  {
    label: 'Tax projections & gifting strategy',
    values: ['—', '—', 'Basic', '✓ Full'],
  },
  {
    label: 'Professional team coordination',
    values: ['Roadmap only', '—', 'Annual check-in', '✓ Full'],
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const ServicesPage = () => {
  return (
    <motion.main
      className="min-h-screen bg-neutral-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="bg-primary-50 border-b border-primary-100">
        <div className="container-width py-20">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 mb-4">
              Services
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-900 leading-tight mb-5">
              Four ways we help California families navigate estate planning
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
              We educate, analyze, coordinate, and project-manage — the tax and implementation
              side of estate planning. We do not provide legal advice or draft legal documents;
              every engagement works alongside your licensed attorney.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Tiers */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {tiers.map((t) => (
              <motion.article
                key={t.title}
                variants={item}
                className="flex flex-col rounded-2xl border border-primary-100 bg-primary-50 p-7 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-700 text-accent-300">
                    {t.icon}
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-primary-500">
                    {t.tier}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary-900 mb-1">{t.title}</h3>
                <p className="text-primary-700 italic text-sm mb-3">&ldquo;{t.tagline}&rdquo;</p>
                <p className="text-neutral-700 leading-relaxed text-sm flex-1 mb-5">{t.blurb}</p>
                <Link
                  to={t.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                >
                  Explore this service
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-white border-t border-primary-100">
        <div className="container-width">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-2">
              Additional services
            </h2>
            <p className="text-neutral-600">
              Deeper support across estate planning, wills &amp; trusts, and tax strategy.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {additionalServices.map((s) => (
              <motion.article
                key={s.title}
                variants={item}
                className="flex flex-col rounded-2xl border border-primary-100 bg-primary-50 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-700 text-accent-300 mb-4">
                  {s.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-primary-900 mb-2">{s.title}</h3>
                <p className="text-neutral-700 leading-relaxed text-sm flex-1 mb-5">{s.blurb}</p>
                <Link
                  to={s.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                >
                  Explore this service
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-8">
              Compare the four tiers
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-primary-100">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-primary-800 text-white">
                    <th className="px-5 py-4 font-semibold w-1/4 rounded-tl-2xl"></th>
                    <th className="px-5 py-4 font-semibold text-center">Family Conversation</th>
                    <th className="px-5 py-4 font-semibold text-center">Funding &amp; Implementation</th>
                    <th className="px-5 py-4 font-semibold text-center">Tax &amp; Administration</th>
                    <th className="px-5 py-4 font-semibold text-center rounded-tr-2xl">Strategic</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, idx) => (
                    <tr
                      key={row.label}
                      className={idx % 2 === 0 ? 'bg-primary-50' : 'bg-white'}
                    >
                      <td className="px-5 py-4 font-semibold text-primary-900">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`px-5 py-4 text-center ${
                            v === '✓ Included' || v === '✓ Full'
                              ? 'text-primary-700 font-semibold'
                              : v === '—'
                              ? 'text-neutral-300'
                              : 'text-neutral-700'
                          }`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer callout */}
      <section className="container-width pb-12">
        <motion.div
          className="rounded-2xl border border-accent-200 bg-accent-50 px-7 py-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-serif text-lg font-bold text-primary-900 mb-2">
            What no tier includes
          </h3>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Generation Catalyst is not a law firm. No engagement includes legal advice, the
            drafting of legal documents, or the legal administration of an estate or trust.
            For all legal work, we refer clients to vetted attorneys in our partner network.
            Our role is education, tax compliance, project management, and professional-team
            coordination.
          </p>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary-900 text-white">
        <div className="container-width py-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl font-bold mb-4">Not sure which is right for you?</h2>
            <p className="text-primary-200 text-lg leading-relaxed mb-8">
              Start with a Family Planning Conversation. In 90 minutes we'll orient your family
              on the process, identify the gaps, and map out exactly which professionals — and
              which of these services, if any — your situation calls for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services/family-conversation"
                className="border-2 border-primary-200 text-primary-100 font-semibold px-7 py-3 rounded-lg hover:bg-primary-800 transition-colors text-center"
              >
                How it works
              </Link>
              <Link
                to="/schedule"
                className="bg-accent-300 text-primary-900 font-semibold px-7 py-3 rounded-lg hover:bg-accent-400 transition-colors text-center"
              >
                Book a Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}

export default ServicesPage
