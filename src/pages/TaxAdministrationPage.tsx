import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TaxAdministrationPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const requiredFilings = [
    {
      form: 'Form 1041',
      title: 'Fiduciary Income Tax Return',
      description:
        'Filed by the trustee or executor to report income earned by the estate or trust after the decedent\'s death. Required if gross income exceeds $600, or if any beneficiary is a nonresident alien. Trusts with ongoing income must file annually.',
      deadline: 'April 15 (same as personal returns) — extension to September 30 available',
      who: 'Estate or trust',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      form: 'Form 706',
      title: 'Estate Tax Return',
      description:
        'Reports the value of the gross estate and calculates any federal estate tax owed. Required for estates exceeding the current exemption ($13.61 million per person in 2024). Also filed to claim portability of the unused exemption — even when no tax is owed.',
      deadline: '9 months after date of death — 6-month extension available',
      who: 'Estate (filed by executor)',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      form: 'Form 709',
      title: 'Gift Tax Return',
      description:
        'Reports taxable gifts made during the calendar year — those exceeding the annual exclusion ($18,000 per recipient in 2024) or involving special assets. Gifts to trusts, gifts of interests in family entities, and gifts of property often require reporting even when no tax is due.',
      deadline: 'April 15 of the year following the gift — extension to October 15 available',
      who: 'Donor (the person making the gift)',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      form: 'Form 1040 (Final)',
      title: 'Decedent\'s Final Income Tax Return',
      description:
        'Covers income earned from January 1 through the date of death. Filed by the executor or surviving spouse. Deductions and credits are claimed for the partial year. Refunds, if any, are paid to the estate. Medical expenses paid within one year of death may be deducted on either this return or the estate tax return.',
      deadline: 'April 15 of the year following death — standard extension applies',
      who: 'Executor or surviving spouse',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      form: 'State Filings',
      title: 'State Estate & Fiduciary Returns',
      description:
        'Many states impose their own estate or inheritance taxes — often at lower exemption thresholds than federal. California has no state estate tax, but trusts and estates with California-source income must file a California Fiduciary Income Tax Return (Form 541). Real property in other states may require additional filings in those jurisdictions.',
      deadline: 'Varies by state — typically parallel federal deadlines',
      who: 'Estate or trust (varies by state)',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
    },
  ]

  const administrationTimeline = [
    {
      period: 'Within days',
      label: 'Immediate steps',
      items: [
        'Secure assets and gather financial statements',
        'Locate the will and trust documents',
        'Obtain certified copies of the death certificate (15–20 copies)',
        'Notify Social Security Administration',
      ],
    },
    {
      period: '1–3 months',
      label: 'Early administration',
      items: [
        'Open an estate bank account',
        'Obtain an EIN (employer identification number) for the estate',
        'Inventory all assets and liabilities',
        'Notify known creditors and publish notice to creditors',
        'Begin gathering records for the decedent\'s final income tax return',
      ],
    },
    {
      period: '3–9 months',
      label: 'Tax filings and elections',
      items: [
        'File the decedent\'s final Form 1040 (due April 15)',
        'File Form 706 for portability election or estate tax (due 9 months after death)',
        'Make date-of-death asset valuations',
        'Evaluate fiscal year election for the estate (vs. calendar year)',
        'Determine whether income items are IRD (income in respect of a decedent)',
      ],
    },
    {
      period: '9–24 months',
      label: 'Ongoing compliance',
      items: [
        'File Form 1041 for estate income (annually until estate closes)',
        'Prepare beneficiary K-1s reporting distributed income',
        'Handle IRS closing letter or state tax clearances as needed',
        'Make final distributions to beneficiaries',
        'File final Form 1041 marked as the closing return',
      ],
    },
  ]

  const portabilitySection = {
    title: 'Portability: The Election That Protects the Surviving Spouse',
    body: [
      'When the first spouse dies, any unused federal estate tax exemption can be transferred to the surviving spouse — but only if the executor files Form 706 within 9 months of death (or within 15 months with an extension). This is called portability.',
      'The portability election is valuable even when the deceased spouse\'s estate is far below the exemption threshold. If the first spouse dies with no taxable estate but leaves $13 million in unused exemption, the surviving spouse can use it — potentially sheltering $27+ million combined before federal estate tax applies.',
      'Without the election, that exemption is permanently lost. There is no second chance. Courts have allowed some late portability elections, but the process is costly and uncertain. Filing timely — even on a simple estate — protects the family\'s full exemption.',
    ],
    warning: 'Portability does not carry over automatically. The election requires an affirmative Form 706 filing. Many families miss this window because no estate tax was owed, so they assumed no return was needed.',
  }

  const cpaCoordination = [
    {
      scenario: 'Family has an existing CPA for personal returns',
      approach:
        'We take on the fiduciary and estate-specific work — Form 1041, Form 706, gift returns, K-1s — and coordinate with the personal CPA to ensure income items are allocated correctly between the decedent\'s final return and the estate. Nothing falls between the two engagements.',
    },
    {
      scenario: 'Estate was handled by a general practice CPA without estate experience',
      approach:
        'We review prior filings for missed elections, basis tracking gaps, and K-1 errors. Where corrections are warranted, we coordinate amended returns. Our role is to catch what was missed and prevent ongoing errors from compounding.',
    },
    {
      scenario: 'Trustee is handling administration without professional tax support',
      approach:
        'We provide the full tax workstream: return preparation, estimated tax payments, beneficiary reporting, and annual check-ins. Trustees have a fiduciary duty to manage tax obligations competently — our engagement documents that obligation is being met.',
    },
    {
      scenario: 'Multiple advisors involved (attorney, financial advisor, CPA)',
      approach:
        'We take ownership of the tax layer and communicate proactively with each advisor about items in our lane. Tax decisions that affect the legal documents — like income distribution elections — are coordinated with the attorney before implementation.',
    },
  ]

  const commonMistakes = [
    {
      mistake: 'Missing the portability election',
      consequence: 'Permanent loss of the deceased spouse\'s unused exemption — potentially millions in avoidable future estate tax.',
      prevention: 'File Form 706 within 9 months of death, regardless of whether estate tax is owed.',
    },
    {
      mistake: 'Failing to get proper date-of-death valuations',
      consequence: 'Incorrect basis for inherited assets; capital gains tax errors for beneficiaries who later sell.',
      prevention: 'Obtain qualified appraisals for real property, closely held business interests, and other non-market assets within the valuation window.',
    },
    {
      mistake: 'Distributing assets before tax obligations are settled',
      consequence: 'Executor/trustee personal liability if distributed assets were needed to pay estate taxes or creditor claims.',
      prevention: 'Obtain a tax clearance or closing letter, or withhold a reasonable reserve, before making final distributions.',
    },
    {
      mistake: 'Not filing a Form 1041 because "there was no income"',
      consequence: 'IRS penalties for unfiled returns; missed deductions; errors in K-1 reporting to beneficiaries.',
      prevention: 'File if gross income exceeds $600, or if any beneficiary is a nonresident alien — the threshold is low.',
    },
    {
      mistake: 'Incorrect treatment of income in respect of a decedent (IRD)',
      consequence: 'Double taxation: IRD items (like IRA distributions and unpaid wages) are taxable to the recipient and included in the gross estate, but a deduction is available — and often overlooked.',
      prevention: 'Identify all IRD items during estate inventory; ensure the IRD deduction is claimed on the beneficiary\'s Form 1040.',
    },
    {
      mistake: 'Overlooking the fiscal year election for the estate',
      consequence: 'Missed income tax planning opportunity — estates can elect a non-calendar fiscal year, deferring income distribution to beneficiaries by up to 11 months.',
      prevention: 'Evaluate the fiscal year election early; it must be made on the first Form 1041 filing.',
    },
  ]

  const faqs = [
    {
      question: 'Do we need to file an estate tax return if no tax is owed?',
      answer:
        'Possibly — and often yes. The main reason to file Form 706 even when no estate tax is owed is to make the portability election, which transfers any unused exemption to the surviving spouse. Without this filing, that exemption is forfeited. The portability election is one of the most valuable — and most missed — actions in post-death administration.',
    },
    {
      question: 'How long does estate administration typically take?',
      answer:
        'Simple estates with no ongoing trusts and no estate tax can close in 12–18 months once all tax returns are filed and a closing letter is received. More complex estates — those with business interests, real estate in multiple states, or charitable structures — often run 2–3 years. Trusts created at death may have ongoing tax obligations for decades.',
    },
    {
      question: 'What is basis and why does it matter for inherited assets?',
      answer:
        'When you inherit an asset, your cost basis is "stepped up" to the fair market value on the date of death. This means that if you inherit stock worth $500,000 that the decedent originally bought for $50,000, you owe no capital gains tax if you sell at the inherited value. Accurate date-of-death valuations are essential — and so is tracking basis over the life of a trust holding these assets.',
    },
    {
      question: 'Can we work with the attorney who handled the estate documents?',
      answer:
        'Yes, and we typically do. The attorney advises on legal questions — whether distributions are permissible under the trust terms, how to handle disputes, document amendments — while we handle the tax filings. We communicate directly with the attorney when tax decisions require legal input, and vice versa.',
    },
    {
      question: 'We just inherited through a trust. What do we do first?',
      answer:
        'The first step is understanding what you received: a copy of the trust, a statement of assets, and an accounting from the trustee. The tax picture depends heavily on when the trust was funded, the character of its income, and whether there are assets with embedded gains. We can walk through what you\'ve received and identify the tax implications — including any IRD items and basis questions — before you make any decisions.',
    },
    {
      question: 'Is estate administration in California different from other states?',
      answer:
        'California has no state estate or inheritance tax, which simplifies the picture for California residents. However, California trusts and estates with California-source income must file Form 541 (Fiduciary Income Tax Return) with the FTB. Real property in California held in an out-of-state trust still creates California filing obligations. The probate process in California is also notably court-supervised and time-consuming — another reason most plans use a revocable trust to avoid it.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[55vh] w-full overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-500/10 blur-2xl" />
        </div>

        <div className="relative z-10 flex min-h-[55vh] items-center">
          <div className="container-width py-16">
            <div className="mx-auto max-w-3xl">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-300 hover:text-accent-200 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All services
                </Link>
              </motion.div>

              <motion.span
                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Ongoing Administration
              </motion.span>

              <motion.h1
                className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Estate &amp; Trust Tax Administration
              </motion.h1>

              <motion.p
                className="mb-3 text-2xl font-semibold text-accent-300 font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                $1,500 – $8,000 / year
              </motion.p>

              <motion.p
                className="mb-8 text-lg text-primary-100 sm:text-xl leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The compliance work that follows a death — or continues through the life of a trust — requires a specific set of filings, elections, and coordination. We handle the tax workstream so trustees, executors, and heirs can focus on everything else.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link
                  to="/schedule"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-primary-800 transition-colors hover:bg-primary-50"
                >
                  Get Administration Help
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
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
          <motion.div className="mx-auto max-w-3xl" {...fadeInUp}>
            <div className="rounded-2xl border-2 border-accent-200 bg-accent-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 font-serif">
                Who this is for
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                Trustees, executors, and heirs navigating the tax obligations that arise after a death — or the ongoing compliance that keeps an established trust current. If you are holding a trustee role, settling an estate, or have recently inherited through a trust, this is the work that needs to get done.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Required Filings */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl font-serif">
              What Filings Are Required
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Estate and trust administration involves a distinct set of federal and state returns — separate from the decedent's personal returns. Each has its own rules, deadlines, and elections.
            </p>
          </motion.div>

          <div className="space-y-4 mx-auto max-w-4xl">
            {requiredFilings.map((filing, index) => (
              <motion.div
                key={filing.form}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                      {filing.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="rounded-md bg-primary-800 px-2.5 py-0.5 text-xs font-bold text-white tracking-wide">
                        {filing.form}
                      </span>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {filing.title}
                      </h3>
                    </div>
                    <p className="mb-4 text-neutral-600 leading-relaxed">{filing.description}</p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                      <div className="rounded-lg bg-neutral-50 px-3 py-2">
                        <span className="text-xs font-medium text-neutral-500 block mb-0.5">Filed by</span>
                        <span className="text-sm text-neutral-700">{filing.who}</span>
                      </div>
                      <div className="rounded-lg bg-neutral-50 px-3 py-2">
                        <span className="text-xs font-medium text-neutral-500 block mb-0.5">Deadline</span>
                        <span className="text-sm text-neutral-700">{filing.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portability Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
              <div className="lg:col-span-3">
                <h2 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl font-serif">
                  {portabilitySection.title}
                </h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  {portabilitySection.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-2xl border-2 border-primary-200 bg-primary-50 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-primary-900 text-lg">Common pitfall</h4>
                  </div>
                  <p className="text-primary-800 text-sm leading-relaxed">
                    {portabilitySection.warning}
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-800 font-serif">9 months</div>
                      <div className="text-xs text-primary-600 mt-1">Deadline to elect portability after date of death</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Administration Timeline */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl font-serif">
              When Filings Are Due: The Administration Timeline
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Estate administration has a defined sequence. Understanding the timeline prevents missed deadlines and preserves valuable elections.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-primary-200 sm:left-8" />

              {administrationTimeline.map((phase, index) => (
                <motion.div
                  key={phase.period}
                  className="relative mb-8 pl-16 sm:pl-20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-primary-500 bg-white sm:left-6" />

                  <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                        {phase.period}
                      </span>
                      <h3 className="font-semibold text-neutral-900">{phase.label}</h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2.5 text-neutral-600 text-sm">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CPA Coordination */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl font-serif">
              How Generation Catalyst Coordinates With Your Other Advisors
            </h2>
            <p className="max-w-3xl text-neutral-600">
              Most families have a CPA for personal returns, an attorney who drafted their documents, and a financial advisor managing investments. We take on the fiduciary and estate-specific tax work and coordinate the rest — so nothing falls between advisors.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {cpaCoordination.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary-700 text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-neutral-900 leading-snug">{item.scenario}</h3>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed pl-10">{item.approach}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl font-serif">
              Common Administration Mistakes — and How to Avoid Them
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              These errors are avoidable. They tend to occur when estate administration is treated as a formality rather than a disciplined compliance process.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-4">
            {commonMistakes.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 border border-red-200">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-neutral-900">{item.mistake}</h3>
                    <p className="mb-3 text-sm text-neutral-600">
                      <span className="font-medium text-neutral-700">Consequence: </span>
                      {item.consequence}
                    </p>
                    <div className="flex items-start gap-2 rounded-lg bg-primary-50 p-3">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-primary-800">
                        <span className="font-medium">Prevention: </span>
                        {item.prevention}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment + CTA */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="mx-auto max-w-4xl grid gap-10 lg:grid-cols-5 lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg:col-span-2">
              <h2 className="mb-3 text-2xl font-bold text-neutral-900 font-serif">Investment</h2>
              <div className="text-3xl font-bold text-primary-700 font-serif mb-3">
                $1,500 – $8,000 / year
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                Final pricing depends on scope and complexity. You will receive a fixed quote after an initial conversation, before any engagement begins.
              </p>
              <Link
                to="/schedule"
                className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-7 py-3 font-semibold text-white transition-colors hover:bg-primary-800"
              >
                Get Administration Help
              </Link>
            </div>

            <div className="lg:col-span-3">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900 font-serif">
                Frequently asked questions
              </h2>
              <div className="divide-y divide-neutral-200">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="pr-4 font-medium text-neutral-900 leading-snug">
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
                        className="pb-4 text-sm text-neutral-600 leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container-width py-16">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl font-serif">
              Start the conversation
            </h2>
            <p className="mb-8 text-lg text-primary-100 max-w-2xl mx-auto">
              Whether you are settling an estate, stepping into a trustee role, or managing the ongoing tax compliance for an existing trust, we can help. The first step is a conversation.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-800 transition-colors hover:bg-primary-50"
              >
                Get Administration Help
              </Link>
              <Link
                to="/services/tax-planning"
                className="rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                See ongoing tax planning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TaxAdministrationPage
