import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface PartnerCategory {
  role: string
  description: string
  whenToEngage: string
  whatWeCoordinate: string[]
  icon: React.ReactNode
}

const partnerCategories: PartnerCategory[] = [
  {
    role: 'Estate Planning Attorneys',
    description:
      'Licensed attorneys who draft the legal documents — trusts, wills, powers of attorney, and healthcare directives. We work with attorneys across California who specialize in estate planning for families at all asset levels.',
    whenToEngage:
      'Once you have completed a Family Planning Conversation and have clarity on what documents you need. We prepare you so your legal time is spent executing, not educating.',
    whatWeCoordinate: [
      'Document drafting and review',
      'Trust amendment and restatements',
      'Special needs trust structuring',
      'Irrevocable trust strategies',
      'Business succession documents',
    ],
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z" />
      </svg>
    ),
  },
  {
    role: 'Certified Public Accountants (CPAs)',
    description:
      'Tax professionals who handle income tax returns, estate and gift tax filings, and trust accounting. Estate planning without tax coordination leaves money on the table — we ensure your attorney and CPA are working from the same playbook.',
    whenToEngage:
      'Concurrently with or just after your legal documents are completed. Also critical during trust administration or after a significant asset event.',
    whatWeCoordinate: [
      'Estate and gift tax return preparation (706, 709)',
      'Income tax planning for trusts (1041)',
      'Portability elections',
      'Roth conversion analysis',
      'Business entity tax strategy',
    ],
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
  },
  {
    role: 'Financial Advisors',
    description:
      'Fee-only and fee-based advisors who manage investment portfolios, insurance planning, and retirement income. We connect families with advisors who understand trust-owned accounts, beneficiary coordination, and estate-aware portfolio management.',
    whenToEngage:
      'When assets need to be re-titled into a trust or when beneficiary designations on retirement accounts need to align with the overall estate plan.',
    whatWeCoordinate: [
      'Trust account setup and re-titling',
      'Beneficiary designation review',
      'Retirement distribution planning',
      'Life insurance needs analysis',
      'Long-term care insurance review',
    ],
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
  },
  {
    role: 'Professional Fiduciaries',
    description:
      'Licensed individuals or corporate trustees who serve as successor trustee when family members cannot or should not. Particularly valuable for blended families, minor beneficiaries, or when objectivity is essential.',
    whenToEngage:
      'When naming a successor trustee and there is no suitable family candidate, or when a neutral third party would reduce family conflict.',
    whatWeCoordinate: [
      'Trustee services during incapacity',
      'Post-death trust administration',
      'Special needs trust management',
      'Conservatorship alternatives',
      'Corporate trustee introductions',
    ],
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Family Planning Conversation',
    description:
      'We start with a 90-minute session to map your situation, identify gaps, and determine which professionals you actually need.',
  },
  {
    step: '02',
    title: 'Warm Introduction',
    description:
      'We connect you directly with the right professional from our network — matched to your situation, asset level, and goals.',
  },
  {
    step: '03',
    title: 'Coordinated Execution',
    description:
      'We stay involved to ensure your attorney, CPA, and financial advisor are aligned — so nothing falls through the cracks.',
  },
]

const ResourcesPartnersPage = () => {
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
              Partner Network
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-900 leading-tight mb-6">
              Trusted Partners
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Generation Catalyst does not provide legal advice. What we do is coordinate — matching
              families with vetted, licensed professionals and ensuring everyone is working from the
              same plan. Our referral network spans estate attorneys, CPAs, financial advisors, and
              professional fiduciaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How the referral network works */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-3">
              How the network works
            </h2>
            <p className="text-neutral-600 max-w-2xl">
              We are coordinators, not advisors. Our value is in knowing which professional fits your
              situation and keeping everyone aligned once they do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <span className="font-mono text-2xl font-bold text-primary-200">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-primary-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="section-padding bg-primary-50">
        <div className="container-width">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-3">
              Who we work with
            </h2>
            <p className="text-neutral-600 max-w-2xl">
              Every professional in our network has been personally vetted. We only make introductions
              we would make for our own family.
            </p>
          </motion.div>

          <div className="space-y-8">
            {partnerCategories.map((category, index) => (
              <motion.div
                key={category.role}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="p-8 grid md:grid-cols-3 gap-8">
                  {/* Left: role + description */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 flex-shrink-0">
                        {category.icon}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary-900">
                        {category.role}
                      </h3>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                      {category.description}
                    </p>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                        When to engage
                      </p>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {category.whenToEngage}
                      </p>
                    </div>
                  </div>

                  {/* Right: what we coordinate */}
                  <div className="bg-primary-50 rounded-xl p-6">
                    <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-3">
                      What we coordinate
                    </p>
                    <ul className="space-y-2">
                      {category.whatWeCoordinate.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                          <svg
                            className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="py-10 bg-white border-t border-neutral-200">
        <div className="container-width max-w-3xl">
          <h3 className="font-semibold text-neutral-800 mb-2 text-sm">Referral Disclosure</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Generation Catalyst LLC may receive compensation from professionals in our partner network.
            All referral relationships are disclosed at the time of introduction. We do not accept payment
            from partners in exchange for preferential placement — our selections are based solely on
            professional quality and fit. Generation Catalyst is not a law firm, financial advisory firm,
            or CPA practice and does not provide legal, investment, or tax advice.
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
                Ready for an introduction?
              </h2>
              <p className="text-primary-200 leading-relaxed">
                Start with a Family Planning Conversation. We will identify exactly which professionals
                you need and make warm introductions from our vetted network.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/resources/checklist"
                className="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white hover:text-primary-900 transition-colors duration-200 text-center"
              >
                Get the checklist first
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

export default ResourcesPartnersPage
