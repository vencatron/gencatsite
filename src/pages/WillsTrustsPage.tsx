import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const WillsTrustsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'wills' | 'trusts'>('wills')

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const willTypes = [
    {
      title: 'Simple Will',
      description:
        'Names beneficiaries, appoints an executor, and designates guardians for minor children. Suitable for straightforward estates with direct distributions.',
      bestFor: 'Younger adults, modest estates, simple family structures',
    },
    {
      title: 'Pour-Over Will',
      description:
        'Transfers any assets not already in your trust at death into the trust. Acts as a safety net to ensure complete asset coordination.',
      bestFor: 'Anyone with a revocable living trust',
    },
    {
      title: 'Testamentary Trust Will',
      description:
        'Creates one or more trusts upon your death. Useful for controlling distributions to minors or beneficiaries who need structured support.',
      bestFor: 'Parents with young children, special needs planning',
    },
    {
      title: 'Joint Will',
      description:
        'A single document covering both spouses. Generally not recommended due to inflexibility—changes require both parties\' consent even after one dies.',
      bestFor: 'Rarely advisable; mutual wills offer better protection',
    },
  ]

  const trustTypes = [
    {
      title: 'Revocable Living Trust',
      description:
        'The foundation of most estate plans. You maintain full control during your lifetime, can modify terms at any time, and assets transfer seamlessly at death without probate.',
      benefits: ['Avoids probate', 'Privacy preserved', 'Incapacity planning', 'Flexible modifications'],
      color: 'primary',
    },
    {
      title: 'Irrevocable Trust',
      description:
        'Cannot be changed once established (with limited exceptions). Removes assets from your taxable estate and provides superior asset protection.',
      benefits: ['Estate tax reduction', 'Asset protection', 'Medicaid planning', 'Generation-skipping'],
      color: 'secondary',
    },
    {
      title: 'Special Needs Trust',
      description:
        'Provides for a disabled beneficiary without disqualifying them from government benefits like SSI or Medicaid. Funds supplement—not replace—public assistance.',
      benefits: ['Preserves benefits', 'Quality of life', 'Lifetime care', 'Third-party funding'],
      color: 'accent',
    },
    {
      title: 'Charitable Trust',
      description:
        'Supports charitable causes while providing tax benefits. Charitable Remainder Trusts (CRT) pay income to you first; Charitable Lead Trusts (CLT) pay charity first.',
      benefits: ['Income tax deduction', 'Capital gains deferral', 'Legacy giving', 'Estate tax reduction'],
      color: 'primary',
    },
  ]

  const comparisonData = [
    { feature: 'Avoids Probate', will: false, trust: true },
    { feature: 'Effective Immediately', will: false, trust: true },
    { feature: 'Incapacity Planning', will: false, trust: true },
    { feature: 'Privacy (Not Public Record)', will: false, trust: true },
    { feature: 'Requires Funding', will: false, trust: true },
    { feature: 'Names Guardians for Children', will: true, trust: false },
    { feature: 'Lower Initial Cost', will: true, trust: false },
    { feature: 'Court Supervision', will: true, trust: false },
  ]

  const faqs = [
    {
      question: 'Do I need both a will and a trust?',
      answer:
        'In most comprehensive estate plans, yes. A revocable living trust handles the bulk of your assets and avoids probate, while a pour-over will catches any assets not transferred to the trust during your lifetime. The will also names guardians for minor children—something a trust cannot do.',
    },
    {
      question: 'What makes a will legally valid?',
      answer:
        'Requirements vary by state, but generally you must be at least 18, of sound mind, and sign the document in the presence of two witnesses who also sign. Some states accept holographic (handwritten) wills without witnesses, but these are more easily contested. Notarization is not required but adds a layer of authenticity.',
    },
    {
      question: 'How do I "fund" a trust?',
      answer:
        'Funding means transferring ownership of assets from your name into the trust\'s name. This includes re-titling real estate, changing bank account ownership, and updating beneficiary designations. An unfunded trust provides no probate avoidance—this step is essential and often overlooked.',
    },
    {
      question: 'Can I be my own trustee?',
      answer:
        'Yes. With a revocable living trust, you typically serve as the initial trustee, maintaining full control over your assets. You\'ll name a successor trustee to take over if you become incapacitated or pass away. This structure gives you flexibility during life and seamless management afterward.',
    },
    {
      question: 'What is the difference between a trustee and an executor?',
      answer:
        'An executor manages your estate through the probate process after death—collecting assets, paying debts, and distributing inheritances under court supervision. A trustee manages trust assets according to trust terms, potentially for years after death, without court involvement. Different roles, sometimes the same person.',
    },
    {
      question: 'Can creditors reach assets in a trust?',
      answer:
        'With a revocable trust, yes—because you retain control, creditors can still reach those assets. Irrevocable trusts offer stronger protection since you\'ve given up ownership. However, transfers made to avoid known creditors can be reversed as fraudulent conveyances. Asset protection planning requires advance preparation.',
    },
  ]

  const fundingSteps = [
    {
      asset: 'Real Estate',
      action: 'Record a new deed transferring property to the trust',
      note: 'May trigger due-on-sale clause review (rarely enforced for trusts)',
    },
    {
      asset: 'Bank Accounts',
      action: 'Change account title or open new accounts in trust name',
      note: 'Keep a small personal account for convenience',
    },
    {
      asset: 'Investment Accounts',
      action: 'Transfer to trust or update beneficiary designation',
      note: 'Some brokerages require specific forms',
    },
    {
      asset: 'Life Insurance',
      action: 'Update beneficiary to trust (or keep individuals as primary)',
      note: 'Consider an Irrevocable Life Insurance Trust for large policies',
    },
    {
      asset: 'Retirement Accounts',
      action: 'Name individuals or trust as beneficiary—never transfer ownership',
      note: 'Trust as beneficiary has complex RMD implications',
    },
    {
      asset: 'Vehicles',
      action: 'Optional—often left outside trust to simplify registration',
      note: 'Pour-over will catches these at death',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[50vh] w-full overflow-hidden bg-gradient-to-br from-secondary-800 via-secondary-700 to-secondary-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-[50vh] items-center">
          <div className="container-width py-16">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-secondary-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Core Service
              </motion.span>
              <motion.h1
                className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Wills & Trusts
              </motion.h1>
              <motion.p
                className="mb-8 text-lg text-secondary-100 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The essential documents that ensure your assets reach the right people, in the right way, at the right time—with clarity and legal certainty.
              </motion.p>
              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link
                  to="/schedule"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-secondary-700 transition-colors hover:bg-secondary-50"
                >
                  Schedule Consultation
                </Link>
                <Link
                  to="/services"
                  className="rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View All Services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mx-auto max-w-3xl" {...fadeInUp}>
            <h2 className="mb-6 text-3xl font-bold text-gradient sm:text-4xl">
              Understanding Wills and Trusts
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p className="text-lg leading-relaxed">
                Wills and trusts are the foundational tools of estate planning, yet they serve different purposes and work in different ways. Understanding when to use each—and how they complement one another—is essential for creating a plan that actually works.
              </p>
              <p className="leading-relaxed">
                A <strong className="text-neutral-900">will</strong> is a legal document that takes effect only after death. It must go through probate—a court-supervised process that validates the document, pays debts, and distributes assets. Probate is public, can be slow, and may be expensive.
              </p>
              <p className="leading-relaxed">
                A <strong className="text-neutral-900">trust</strong> is a legal arrangement where you transfer assets to a trustee who manages them for beneficiaries according to your instructions. Trusts can be effective during your lifetime, avoid probate entirely, and provide ongoing management for years after death.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Section: Types of Wills / Types of Trusts */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-8 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Types of Wills & Trusts
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
              Each type serves specific needs. Understanding your options helps you choose the right structure for your situation.
            </p>

            {/* Tab buttons */}
            <div className="inline-flex rounded-lg bg-neutral-200 p-1">
              <button
                onClick={() => setActiveTab('wills')}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'wills'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Types of Wills
              </button>
              <button
                onClick={() => setActiveTab('trusts')}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'trusts'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Types of Trusts
              </button>
            </div>
          </motion.div>

          {/* Wills Content */}
          {activeTab === 'wills' && (
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {willTypes.map((will) => (
                <div
                  key={will.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                    {will.title}
                  </h3>
                  <p className="mb-4 text-neutral-600">{will.description}</p>
                  <div className="rounded-lg bg-primary-50 p-3">
                    <span className="text-sm font-medium text-primary-700">
                      Best for:{' '}
                    </span>
                    <span className="text-sm text-primary-600">{will.bestFor}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Trusts Content */}
          {activeTab === 'trusts' && (
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {trustTypes.map((trust) => (
                <div
                  key={trust.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                    {trust.title}
                  </h3>
                  <p className="mb-4 text-neutral-600">{trust.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {trust.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          trust.color === 'primary'
                            ? 'bg-primary-100 text-primary-700'
                            : trust.color === 'secondary'
                            ? 'bg-secondary-100 text-secondary-700'
                            : 'bg-accent-100 text-accent-700'
                        }`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Will vs. Trust: A Direct Comparison
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Understanding the practical differences helps you determine which tools you need.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-3 bg-neutral-50 p-4 font-semibold text-neutral-900">
              <div>Feature</div>
              <div className="text-center">Will</div>
              <div className="text-center">Revocable Trust</div>
            </div>
            {comparisonData.map((row, index) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 p-4 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                }`}
              >
                <div className="text-neutral-700">{row.feature}</div>
                <div className="flex justify-center">
                  {row.will ? (
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-neutral-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex justify-center">
                  {row.trust ? (
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-neutral-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-center text-sm text-neutral-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Most comprehensive estate plans include both a revocable living trust and a pour-over will.
          </motion.p>
        </div>
      </section>

      {/* Trust Funding Guide */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Funding Your Trust
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              A trust only works if assets are properly transferred into it. This step is essential—and often overlooked.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {fundingSteps.map((step, index) => (
                <motion.div
                  key={step.asset}
                  className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 text-sm font-bold text-primary-700">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-neutral-900">
                        {step.asset}
                      </h3>
                      <p className="mb-2 text-neutral-600">{step.action}</p>
                      <p className="text-sm text-neutral-500 italic">{step.note}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Common questions about wills and trusts answered clearly.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-neutral-200 last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="pr-4 text-lg font-medium text-neutral-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <motion.div
                    className="pb-5 text-neutral-600"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-secondary-600 to-secondary-800 text-white">
        <div className="container-width py-16">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Create Your Documents?
            </h2>
            <p className="mb-8 text-lg text-secondary-100">
              Whether you need a simple will, a comprehensive trust-based plan, or updates to existing documents, we can help you get it right.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-secondary-700 transition-colors hover:bg-secondary-50"
              >
                Schedule Free Consultation
              </Link>
              <Link
                to="/services/estate-planning"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Learn About Estate Planning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WillsTrustsPage
