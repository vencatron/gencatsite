import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const StrategicPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const whoThisIsFor = [
    {
      title: 'Business Owners',
      description:
        'Owners of closely held businesses navigating succession, buy-sell structures, entity restructuring, and the intersection of business value with personal estate exposure.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'High-Net-Worth Families',
      description:
        'Families with estates above or approaching the federal exemption threshold who need multi-year tax projections, gifting strategies, and coordinated implementation across professionals.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Blended & Multi-Generational Families',
      description:
        'Families with complex dynamics — step-children, prior marriages, multi-generational trusts, or family members with special needs — requiring structures that balance competing interests without conflict.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Pre-Liquidity Event Planning',
      description:
        'Founders and executives approaching a sale, IPO, or significant compensation event who need strategies in place before the event closes — when options are broadest.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ]

  const included = [
    'Comprehensive estate and income tax projections — multi-year modeling with real numbers',
    'Multi-year gifting strategy design, including annual exclusion and larger exemption gifts',
    'Business succession coordination — entity structure, buy-sell alignment, and ownership transition',
    'Valuation discount analysis (modeling only — we engage qualified appraisers)',
    'Advanced trust structure analysis: GRAT, ILIT, SLAT, dynasty trust, and generation-skipping',
    'Family meeting facilitation — aligning family members on goals, values, and expectations',
    'Full coordination with your attorney, CPA, financial advisor, and insurance professionals',
    'Project management of implementation: funding, retitling, insurance reviews, and timeline',
  ]

  const notIncluded = [
    'Legal opinions or legal advice of any kind',
    'Document drafting — your estate planning attorney prepares all legal instruments',
    'Fiduciary services — we do not serve as trustee, executor, or guardian',
    'Formal business valuations for tax filing purposes (we help engage qualified appraisers)',
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Baseline',
      description:
        'We assemble the full picture: all entities, assets, cost basis, existing documents, insurance policies, family structure, and long-term goals. Nothing is assumed.',
    },
    {
      step: '02',
      title: 'Projection & Strategy',
      description:
        'We model estate tax exposure under multiple scenarios, identify the highest-leverage gifting paths, evaluate succession structures, and stress-test liquidity at each step — with real numbers.',
    },
    {
      step: '03',
      title: 'Coordinated Implementation',
      description:
        'Your attorney designs and drafts the legal instruments. Generation Catalyst project-manages implementation: funding, retitling, appraisals, insurance reviews, and cross-professional coordination — one party accountable for the whole.',
    },
    {
      step: '04',
      title: 'Ongoing Stewardship',
      description:
        'Annual projections are refreshed, gifting is executed on schedule, family meetings are facilitated, and your professional team is convened whenever laws or circumstances change.',
    },
    {
      step: '05',
      title: 'Strategic Review',
      description:
        'Formal annual review sessions reassess your plan against current law, market changes, and life events — ensuring your strategy remains optimized, not just documented.',
    },
  ]

  const advancedStructures = [
    {
      acronym: 'GRAT',
      name: 'Grantor Retained Annuity Trust',
      description:
        'Transfer appreciating assets to a trust while retaining annuity payments. If assets grow faster than the IRS hurdle rate, the excess passes to beneficiaries free of transfer tax. Highly effective for concentrated positions and low-interest-rate environments.',
      bestFor: 'Concentrated equity, expected-appreciation assets',
    },
    {
      acronym: 'ILIT',
      name: 'Irrevocable Life Insurance Trust',
      description:
        'Remove life insurance from your taxable estate while preserving the death benefit for your family. Proceeds pass income and estate tax-free, providing liquidity to pay estate taxes without forced asset sales.',
      bestFor: 'Estate liquidity, insurance outside the estate',
    },
    {
      acronym: 'SLAT',
      name: 'Spousal Lifetime Access Trust',
      description:
        'One spouse gifts assets irrevocably to a trust for the benefit of the other spouse, using lifetime exemption while maintaining indirect family access. Popular as a hedge against exemption reduction.',
      bestFor: 'Exemption utilization before sunset, married couples',
    },
    {
      acronym: 'GST',
      name: 'Generation-Skipping Trust',
      description:
        'Pass wealth across multiple generations using the generation-skipping transfer tax exemption. Assets grow inside the trust for grandchildren and beyond, shielded from estate tax at each generation.',
      bestFor: 'Multi-generational wealth transfer, dynasty planning',
    },
  ]

  const coordinationAdvantages = [
    {
      title: 'One Accountable Party',
      description:
        'Complex estates typically involve three or more professionals — an attorney, a CPA, a financial advisor, and sometimes an insurance specialist. Each is expert in their lane. No one is responsible for the whole. Generation Catalyst fills that gap.',
    },
    {
      title: 'Integrated Tax Modeling',
      description:
        'We translate legal structures into numbers — projecting estate tax exposure, gift tax utilization, income tax basis impacts, and liquidity requirements — so your attorney drafts instruments that actually accomplish the tax goals.',
    },
    {
      title: 'Implementation Follow-Through',
      description:
        'Signed documents are not a finished plan. Trust funding, asset retitling, beneficiary designation updates, and insurance coordination must all follow. We manage this through completion.',
    },
    {
      title: 'Ongoing Recalibration',
      description:
        'Tax law changes. Asset values change. Family circumstances change. Your professional team reconvenes reactively at best. We ensure proactive, coordinated reviews on a defined schedule.',
    },
  ]

  const faqs = [
    {
      question: 'We already have an attorney, CPA, and financial advisor. What do you add?',
      answer:
        'Each of those professionals is an expert in their domain. The attorney prepares legal documents. The CPA handles tax returns and compliance. The financial advisor manages investments. What typically does not exist is a party responsible for coordinating all three, modeling how the pieces interact, and managing implementation from strategy through completion. That is the coordination gap Generation Catalyst fills — not expertise, but accountability for the whole.',
    },
    {
      question: 'How does pricing work at this engagement level?',
      answer:
        'All engagements are fixed-fee and quoted after an initial conversation, before any work begins. You will never receive a bill you did not agree to in advance. Scope and complexity determine the quote. Ongoing annual stewardship is priced separately at the start of each year.',
    },
    {
      question: 'Does this replace our estate planning attorney?',
      answer:
        'No — and it never will. Every legal instrument in your plan is prepared and reviewed by a licensed estate planning attorney. Our role is to give your attorney better inputs, model the tax consequences of structural choices, manage implementation, and ensure coordination across professionals. Think of us as the project lead on a construction you hired an architect to design.',
    },
    {
      question: 'When is the right time to start a Strategic Engagement?',
      answer:
        'Ideally before a triggering event — a sale, liquidity event, or significant appreciation — when the planning window is broadest. For families already holding significant assets, the 2026 federal exemption sunset creates urgency around large-scale gifting strategies. The right time is almost always earlier than it feels.',
    },
    {
      question: 'What is the 2026 exemption sunset and why does it matter for us?',
      answer:
        'Under current law, the federal estate tax exemption of approximately $13.6 million per person is scheduled to revert to roughly $7 million per person on January 1, 2026 (adjusted for inflation). For married couples, that means roughly $13 million in combined exemption versus $27 million today. The IRS has confirmed that gifts made using the higher exemption before sunset will not be clawed back. This creates a limited, time-sensitive window for large-scale gifting strategies that may not exist after 2025.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] w-full overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-700/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-600/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-600/10 blur-2xl" />
        </div>

        <div className="relative z-10 flex min-h-[60vh] items-center">
          <div className="container-width py-20">
            <div className="mx-auto max-w-4xl">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mb-6"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-300 transition-colors hover:text-accent-200"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All services
                </Link>
              </motion.div>

              {/* Badge */}
              <motion.span
                className="mb-5 inline-block rounded-full border border-accent-500/30 bg-accent-600/10 px-4 py-1.5 text-sm font-medium text-accent-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Premium Engagement
              </motion.span>

              {/* Heading */}
              <motion.h1
                className="mb-4 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Strategic Estate
                <br />
                <span className="text-accent-400">Planning</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mb-10 max-w-2xl text-lg leading-relaxed text-primary-200 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                A comprehensive engagement for business owners and high-net-worth families: multi-year tax projections, gifting strategy, business succession coordination, and facilitation across your full professional team — attorney, financial advisor, and CPA — with one party accountable for the whole.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  to="/schedule"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-primary-800 transition-all hover:bg-accent-50 hover:shadow-lg"
                >
                  Schedule a Strategic Review
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Compare all services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Who This Is For */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12" {...fadeInUp}>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-primary-900 sm:text-4xl">
                Who this is for
              </h2>
              <p className="text-lg text-neutral-600">
                Business owners and families with significant or complex estates whose planning involves multiple professionals, multiple entities, and decisions measured in years — not a single document signing.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoThisIsFor.map((item, index) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-primary-100 bg-primary-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-primary-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary-900 sm:text-4xl">
              Scope of engagement
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Clarity about what is and is not included protects your interests — and ensures you have the right professional for every task.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Included */}
            <motion.div
              className="rounded-2xl border border-primary-200 bg-white p-8 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-6 text-xl font-semibold text-primary-900">What's included</h3>
              <ul className="space-y-4">
                {included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <svg className="h-3 w-3 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Included */}
            <motion.div
              className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5 rounded-xl border border-accent-200 bg-accent-50 p-4">
                <p className="text-sm text-accent-800">
                  <strong>Important:</strong> Generation Catalyst is not a law firm. Legal advice, document drafting, and attorney services are never part of this engagement. Your estate planning attorney provides those services — we ensure they have better inputs and that implementation is completed.
                </p>
              </div>
              <h3 className="mb-6 text-xl font-semibold text-neutral-900">What's not included</h3>
              <ul className="space-y-4">
                {notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100">
                      <svg className="h-3 w-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Trust Structures */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary-900 sm:text-4xl">
              Advanced trust structures
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              These vehicles are purpose-built for high-net-worth planning. We model each in the context of your specific numbers before recommending them.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {advancedStructures.map((structure, index) => (
              <motion.div
                key={structure.acronym}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary-800 text-base font-bold tracking-wide text-white">
                    {structure.acronym}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{structure.name}</h3>
                    <span className="mt-1 inline-block rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-medium text-accent-700">
                      Best for: {structure.bestFor}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">{structure.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Coordination Advantage */}
      <section className="section-padding bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="container-width">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-serif text-3xl font-bold sm:text-4xl">
              The coordination advantage
            </h2>
            <p className="mx-auto max-w-2xl text-primary-200">
              Complexity creates gaps. When three professionals work in parallel with no one accountable for the whole, critical steps fall through the cracks.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {coordinationAdvantages.map((item, index) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-primary-700 bg-primary-800/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <h3 className="mb-3 text-lg font-semibold text-accent-300">{item.title}</h3>
                <p className="text-sm leading-relaxed text-primary-200">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Diagram: coordination visual */}
          <motion.div
            className="mx-auto mt-14 max-w-2xl rounded-2xl border border-primary-700 bg-primary-800/60 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mb-6 text-sm uppercase tracking-widest text-primary-400">How it works</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {['Estate Attorney', 'CPA / Tax', 'Financial Advisor', 'Insurance'].map((role, i) => (
                <div key={role} className="flex items-center gap-4">
                  <div className="rounded-xl border border-primary-600 bg-primary-700 px-4 py-3 text-sm font-medium text-white">
                    {role}
                  </div>
                  {i < 3 && (
                    <svg className="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="my-5 flex justify-center">
              <svg className="h-8 w-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="mx-auto rounded-2xl border-2 border-accent-500 bg-accent-600/10 px-8 py-4">
              <p className="text-base font-semibold text-accent-300">Generation Catalyst</p>
              <p className="mt-1 text-xs text-primary-300">Strategy • Coordination • Implementation • Stewardship</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              A structured five-phase process that transforms complexity into a coordinated, executed plan.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative flex gap-6 pb-12 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {/* Timeline line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-14 h-full w-px bg-primary-200" />
                )}
                {/* Step number */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-800 text-sm font-bold text-white">
                  {step.step}
                </div>
                {/* Content */}
                <div className="pt-1.5">
                  <h3 className="mb-2 text-xl font-semibold text-primary-900">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="mx-auto max-w-3xl rounded-2xl border border-primary-100 bg-primary-50 p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-sm uppercase tracking-widest text-primary-500">How it works</p>
            <div className="mb-4 font-serif text-3xl font-bold text-primary-900 sm:text-4xl">
              Fixed quote, provided upfront
            </div>
            <p className="mb-8 text-lg text-neutral-600">
              You will receive a fixed quote after an initial conversation — before any engagement begins. Scope and complexity determine the fee. No surprises.
            </p>
            <div className="mx-auto mb-8 grid max-w-lg gap-4 text-left sm:grid-cols-2">
              {[
                { label: 'Quote timing', value: 'After initial conversation' },
                { label: 'Payment structure', value: 'Fixed fee, agreed in advance' },
                { label: 'Ongoing stewardship', value: 'Priced annually at engagement start' },
                { label: 'Engagement structure', value: 'Scoped to your situation' },
              ].map((detail) => (
                <div key={detail.label} className="rounded-xl border border-primary-100 bg-white p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary-500">{detail.label}</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-800">{detail.value}</p>
                </div>
              ))}
            </div>
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center rounded-full bg-primary-800 px-10 py-3.5 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
            >
              Schedule a Strategic Review
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Common questions about the Strategic Engagement.
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
                    className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white">
        <div className="container-width py-20">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-serif text-3xl font-bold sm:text-4xl">
              Ready to start the conversation?
            </h2>
            <p className="mb-10 text-lg text-primary-200">
              The Strategic Engagement begins with a single conversation — no commitment, no paperwork. We learn about your situation and you learn whether this is the right fit.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-50 hover:shadow-xl"
              >
                Schedule a Strategic Review
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-10 py-4 font-semibold text-white transition-all hover:bg-white/10"
              >
                Compare all services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default StrategicPage
