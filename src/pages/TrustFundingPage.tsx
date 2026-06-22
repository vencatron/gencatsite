import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TrustFundingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const assetCategories = [
    {
      title: 'Real Estate',
      subtitle: 'Retitle via recorded deed',
      description:
        'Your home and any investment properties should be deeded into the trust by name. This requires preparing and recording a new deed — typically a grant deed or quitclaim deed — with the county recorder where the property sits.',
      mustFund: true,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      notes: [
        'Each county has its own recording process and fees',
        'Review your mortgage for due-on-sale clauses (lenders rarely enforce these for personal residence transfers to a revocable trust)',
        'Vacation homes in other states require separate deeds in each state',
        'Title insurance often needs to be updated after retitling',
      ],
    },
    {
      title: 'Bank Accounts',
      subtitle: 'Retitle the account or open new ones',
      description:
        'Checking, savings, money market, and CD accounts can be retitled to the trust. You walk into your bank with a copy of the trust certificate (or sometimes the full trust document), and the branch updates the account ownership.',
      mustFund: true,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      notes: [
        'Many banks have specific forms for trust titling — call ahead',
        'You can keep a small personal checking account outside the trust for convenience',
        'Joint accounts may need both owners present',
        'CDs may need to wait until maturity to avoid early-withdrawal penalties',
      ],
    },
    {
      title: 'Brokerage & Investment Accounts',
      subtitle: 'Transfer ownership to the trust',
      description:
        'Taxable brokerage and investment accounts (not IRAs or 401(k)s — those are handled differently) should be transferred to your trust. Most major brokerages have an account retitling process.',
      mustFund: true,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      notes: [
        'Transferring to a revocable trust is not a taxable event — no capital gains triggered',
        'Some brokerages require a "certification of trust" rather than the full document',
        'Mutual fund accounts held directly with fund companies need separate instructions',
        'Margin accounts may require approval before retitling',
      ],
    },
    {
      title: 'Business Interests',
      subtitle: 'Assign membership or stock interests',
      description:
        'LLC membership interests, S-Corp or C-Corp shares, and partnership interests can be assigned to your trust. The mechanics vary by entity type — some require amending operating agreements, others require stock certificate transfers.',
      mustFund: true,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      notes: [
        'S-Corp shares require care — not all trusts qualify as eligible shareholders',
        'LLC operating agreements may restrict transfer without member approval',
        'Coordinate with your business attorney before transferring',
        'Buy-sell agreements may affect your ability to transfer',
      ],
    },
    {
      title: 'Vehicles',
      subtitle: 'Usually left outside the trust',
      description:
        'Everyday vehicles are typically left outside the trust because re-registering them can be cumbersome and the practical benefit is limited. Your pour-over will catches vehicles at death. However, high-value vehicles, boats, or aircraft may warrant transfer.',
      mustFund: false,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      notes: [
        'DMV processes for trust titling vary widely by state',
        'For everyday cars, the administrative burden outweighs the benefit',
        'High-value vehicles, boats, and aircraft are worth retitling',
        'Your pour-over will handles anything left outside the trust at death',
      ],
    },
    {
      title: 'Personal Property',
      subtitle: 'Assignment document or schedule',
      description:
        'Jewelry, artwork, furniture, collectibles, and other personal property can be transferred to a trust via a written assignment document — no deed or financial institution required. You simply sign an assignment that lists the items.',
      mustFund: false,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      notes: [
        'An assignment of personal property is a simple one-page document',
        'High-value items should be specifically listed, not just described generally',
        'Keep the original assignment with your trust documents',
        'For valuable collectibles, update your insurance to reflect trust ownership',
      ],
    },
  ]

  const beneficiaryDesignationAssets = [
    {
      asset: 'Traditional IRA',
      rule: 'Name individuals directly — never the trust as primary',
      why:
        'Naming a trust as beneficiary of a Traditional IRA collapses the 10-year withdrawal rule into a single year in many situations, causing an immediate taxable distribution. Your attorney will advise on whether a specially drafted "see-through trust" makes sense for your situation.',
      warning: true,
    },
    {
      asset: 'Roth IRA',
      rule: 'Name individuals directly',
      why:
        'Same reasoning as Traditional IRA. A Roth IRA named to an individual can grow tax-free over the beneficiary\'s lifetime under the 10-year rule. Routing through a trust can significantly reduce this benefit.',
      warning: true,
    },
    {
      asset: '401(k), 403(b), 457 Plans',
      rule: 'Name individuals — coordinate with your attorney on spousal rights',
      why:
        'Federal law (ERISA) gives a surviving spouse automatic rights to certain retirement plan assets. Naming anyone other than your spouse as primary beneficiary may require spousal consent in writing. These assets do not go through probate regardless of how your trust is funded.',
      warning: false,
    },
    {
      asset: 'Life Insurance',
      rule: 'Usually name individuals; sometimes the trust',
      why:
        'For most families, naming individuals directly keeps things simple and avoids the insurance proceeds being tied up if estate administration is needed. For large policies with estate tax exposure, an Irrevocable Life Insurance Trust (ILIT) may make more sense — but that is a separate structure your attorney creates.',
      warning: false,
    },
    {
      asset: 'Annuities',
      rule: 'Name individuals directly; trust as contingent',
      why:
        'Naming a trust as beneficiary of an annuity can trigger immediate income tax on the deferred gain. Name a person as primary beneficiary. Your attorney can advise if your trust should be named as a contingent beneficiary for fallback purposes.',
      warning: true,
    },
    {
      asset: 'HSA (Health Savings Account)',
      rule: 'Name a spouse if possible; otherwise individuals',
      why:
        'An HSA inherited by a spouse continues as a tax-advantaged HSA. An HSA inherited by anyone else — including a trust — becomes immediately taxable. Coordinate your HSA beneficiary designation carefully with your overall plan.',
      warning: true,
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Kickoff and Inventory',
      description:
        'We start by assembling your complete asset picture: real property by address and county, financial accounts by institution, business interests, insurance policies, and retirement accounts. We review this against your attorney\'s funding instructions to identify gaps and prioritize what needs to move.',
      detail: 'Typically 1–2 weeks, including gathering statements and account information',
    },
    {
      step: '02',
      title: 'Execution',
      description:
        'We coordinate directly with financial institutions, transfer agents, and the county recorder\'s office on your behalf. For real estate, we work with your attorney or a deed preparation service to draft and record deeds. We submit paperwork, track confirmations, and follow up until each institution clears the transfer.',
      detail: 'Most financial accounts retitle in 2–4 weeks; real estate varies by county',
    },
    {
      step: '03',
      title: 'Beneficiary Designations',
      description:
        'We review every retirement account, life insurance policy, and payable-on-death account. We confirm the designations are aligned with your attorney\'s design — primary and contingent beneficiaries, per stirpes vs. per capita, and any special provisions. We flag anything that needs your attorney\'s guidance before we update.',
      detail: 'Coordinate with your estate planning attorney on IRA and retirement plan designations',
    },
    {
      step: '04',
      title: 'Verification and Reconciliation',
      description:
        'Once every institution has confirmed, we reconcile the full asset inventory against what was transferred. Each asset gets one of three outcomes: funded, handled via beneficiary designation, or definitively excluded with a documented reason. Nothing falls through the cracks.',
      detail: 'Final reconciliation report provided to you in writing',
    },
    {
      step: '05',
      title: 'Handoff',
      description:
        'We deliver a final reconciliation report, an organized document inventory (where to find every important document), and trustee education materials — a plain-language orientation for the people you\'ve named as successor trustees. Your estate plan is not just signed; it is finished.',
      detail: 'Includes successor trustee orientation and document organization system',
    },
  ]

  const commonMistakes = [
    {
      mistake: 'Signing but never funding',
      consequence:
        'The most common failure: the trust is drafted and signed, but accounts are never retitled. At death, the unfunded trust provides no probate avoidance — everything still goes through the court process the trust was meant to bypass.',
      fix: 'Treat funding as part of the engagement, not an optional follow-up step.',
    },
    {
      mistake: 'Partial funding',
      consequence:
        'Moving some accounts but forgetting others — often accounts opened after the trust was signed. Each unfunded account is a separate probate proceeding waiting to happen, depending on state thresholds.',
      fix: 'Conduct a systematic inventory and confirm every account, not just the obvious ones.',
    },
    {
      mistake: 'Naming the trust as IRA beneficiary',
      consequence:
        'Without a specially drafted "conduit" or "accumulation" trust, naming your revocable trust as IRA beneficiary can compress years of tax-deferred growth into a single taxable year for your beneficiaries.',
      fix: 'Name individuals directly on IRAs and 401(k)s. Talk to your attorney if trust-as-beneficiary is part of the design — it requires specific drafting.',
    },
    {
      mistake: 'Forgetting out-of-state property',
      consequence:
        'A vacation home in another state means an ancillary probate — a separate court proceeding in that state — if it is not deeded into the trust. Each state has its own recording requirements.',
      fix: 'Record a deed in each state where real property is located.',
    },
    {
      mistake: 'Not updating after acquiring new assets',
      consequence:
        'Accounts opened after the trust was signed are often left in individual names. The pour-over will catches them at death, but they still go through probate first.',
      fix: 'New accounts should be opened in the trust\'s name from day one. Old accounts need periodic review.',
    },
    {
      mistake: 'Conflicting beneficiary designations',
      consequence:
        'Beneficiary designations override your will and your trust. If your 401(k) names an ex-spouse and your trust says something different, the ex-spouse wins — every time.',
      fix: 'Audit all beneficiary designations as part of the funding process, and update them whenever your family or financial situation changes.',
    },
  ]

  const faqs = [
    {
      question: "My attorney said they'd handle funding. Doesn't the attorney do this?",
      answer:
        "Some attorneys include funding coordination as part of their engagement — especially for high-complexity plans. Many deliver documents with a funding instruction letter and leave execution to the family. Neither approach is wrong, but it means families often receive a signed trust and a list of things to do, with no one tracking completion. We pick up wherever your attorney's engagement ends.",
    },
    {
      question: 'Our trust was signed years ago. Is it too late?',
      answer:
        "Funding can be completed at any time while the trust creator is living and able to authorize transfers. Older plans often have the most to gain — accounts opened since signing are usually outside the trust entirely, and the original funding may have been incomplete. We start with a current inventory regardless of when documents were signed.",
    },
    {
      question: 'Do I need my attorney involved in the funding process?',
      answer:
        "For real estate transfers, deeds need to be prepared and recorded — that is legal work, and we coordinate with your attorney or a deed preparation service rather than doing it ourselves. For beneficiary designations on complex accounts (especially IRAs), your attorney's guidance on the design is essential before we implement. For financial account retitling, we handle the institutional coordination directly.",
    },
    {
      question: "What if an institution won't accept the trust?",
      answer:
        "Institutions occasionally push back — asking for documents they don't need or applying internal policies inconsistently. We know what institutions are legally entitled to ask for and what they are not. We escalate when needed and have worked through most of the common institutional friction points. If a transfer requires legal intervention, we flag it and loop in your attorney.",
    },
    {
      question: 'What about retirement accounts — do those go in the trust?',
      answer:
        "Retirement accounts (IRAs, 401(k)s, 403(b)s) are generally not retitled to the trust — they are handled through beneficiary designations instead. Retitling a retirement account to a trust is treated as a distribution, which is an immediate taxable event. The right beneficiary designation depends on your attorney's design and your family situation. We make sure the question gets asked and the answer gets implemented — we don't decide it unilaterally.",
    },
    {
      question: 'How long does trust funding take?',
      answer:
        "Financial account retitling typically takes 2–4 weeks per institution once paperwork is submitted, though some move faster. Real estate depends on the county recorder's processing time, which can range from days to several weeks. We track every open item and follow up until each one clears. From kickoff to final reconciliation report, most plans wrap up in 6–10 weeks.",
    },
    {
      question: "We have a trust from another state. Does that matter?",
      answer:
        "Generally no — a validly executed trust from any state is recognized nationwide. However, if you own real property in another state, the deed transferring that property needs to comply with that state's specific requirements. We work with your attorney or a local deed preparation service in each state where property is located.",
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
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-[55vh] items-center">
          <div className="container-width py-20">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                className="mb-4 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <Link
                  to="/services"
                  className="flex items-center gap-1.5 text-sm font-medium text-primary-200 transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All Services
                </Link>
                <span className="text-primary-400">/</span>
                <span className="text-sm text-primary-300">Trust Funding</span>
              </motion.div>

              <motion.span
                className="mb-4 inline-block rounded-full bg-accent-400/20 px-4 py-1.5 text-sm font-medium text-accent-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Implementation Service
              </motion.span>

              <motion.h1
                className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Trust Funding: The Step Most People Skip
              </motion.h1>

              <motion.p
                className="mb-8 text-lg leading-relaxed text-primary-100 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Signing your trust is the beginning, not the end. A trust that has not been funded provides no probate avoidance — it is a sophisticated legal document with no assets in it. We project-manage the retitling, coordination, and verification until your plan actually works.
              </motion.p>

              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link
                  to="/schedule"
                  className="rounded-lg bg-white px-8 py-3.5 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
                >
                  Get Help Funding Your Trust
                </Link>
                <Link
                  to="/services"
                  className="rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Compare All Services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* The Core Problem */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-4xl">
            <motion.div className="mb-12" {...fadeInUp}>
              <h2 className="mb-6 text-3xl font-bold text-primary-900 sm:text-4xl">
                What Is Trust Funding — and Why Does It Matter?
              </h2>
              <div className="space-y-5 text-lg text-neutral-700">
                <p className="leading-relaxed">
                  When your attorney drafts and you sign a revocable living trust, you now own a trust. But the trust owns nothing. It is a legally valid container that is completely empty until you transfer assets into it.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-neutral-900">Funding</strong> is the process of transferring ownership of your assets from your individual name — or from you and your spouse jointly — into the trust. For real estate, that means recording a new deed. For bank and investment accounts, that means retitling the account in the trust's name. For business interests, that means assigning membership or stock to the trust.
                </p>
                <p className="leading-relaxed">
                  Until that work is done, your trust provides no benefit at death or incapacity. Assets titled in your name alone still go through probate — the court-supervised process your trust was designed to avoid. The documents are in order; the work is not finished.
                </p>
              </div>
            </motion.div>

            {/* Warning callout */}
            <motion.div
              className="rounded-2xl border border-primary-200 bg-primary-50 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <svg className="h-5 w-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-primary-900">
                    The funding gap is the most common estate planning failure
                  </h3>
                  <p className="text-primary-800">
                    Studies consistently show that a significant portion of families with signed trusts have accounts still titled in individual names — sometimes years after signing. The estate plan exists on paper; the protection does not. This is precisely the gap Generation Catalyst closes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What DOES go in the trust */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-primary-900 sm:text-4xl">
              What Assets Go Into the Trust
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Each asset type requires a different transfer mechanism. Understanding the distinction between assets that are retitled versus those handled by beneficiary designation is essential.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assetCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className={`rounded-2xl border p-6 ${
                  category.mustFund
                    ? 'border-primary-200 bg-white shadow-sm'
                    : 'border-neutral-200 bg-white/70 shadow-sm'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="mb-4 flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                      category.mustFund
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{category.title}</h3>
                      {category.mustFund ? (
                        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                          Retitle
                        </span>
                      ) : (
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500">{category.subtitle}</p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                  {category.description}
                </p>

                <ul className="space-y-1.5">
                  {category.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2 text-sm text-neutral-500">
                      <svg
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {note}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What does NOT go in the trust */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12" {...fadeInUp}>
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-4 text-3xl font-bold text-primary-900 sm:text-4xl">
                What Does NOT Go Into the Trust
              </h2>
              <p className="mb-2 text-lg text-neutral-600">
                Retirement accounts and certain tax-advantaged assets are <em>not</em> retitled to the trust — ever. They are handled through beneficiary designations, which function as a separate transfer mechanism entirely.
              </p>
              <p className="text-neutral-600">
                Putting a retirement account <em>into</em> a trust is treated by the IRS as a distribution — meaning you would owe income tax on the entire account balance immediately. The right approach for these accounts is to ensure beneficiary designations are coordinated with your overall plan design.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {beneficiaryDesignationAssets.map((item, index) => (
                <motion.div
                  key={item.asset}
                  className={`rounded-xl border p-5 ${
                    item.warning
                      ? 'border-accent-200 bg-accent-50/50'
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <div className="flex-shrink-0">
                      {item.warning ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-100">
                          <svg
                            className="h-4 w-4 text-accent-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                          <svg
                            className="h-4 w-4 text-primary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-neutral-900">{item.asset}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.warning
                              ? 'bg-accent-100 text-accent-700'
                              : 'bg-primary-100 text-primary-700'
                          }`}
                        >
                          {item.rule}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-600">{item.why}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Beneficiary designations are part of the plan
              </h3>
              <p className="text-neutral-600">
                Coordinating beneficiary designations is not a separate task — it is an integral part of trust funding. A well-funded trust paired with misaligned beneficiary designations can still produce unintended results. We audit every designation as part of the funding process and flag anything that needs your attorney's input before updating.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works - process */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-primary-900 sm:text-4xl">
              How Generation Catalyst Handles Funding
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-700">
              We project-manage the entire funding process from first inventory to final reconciliation report — so nothing falls through the cracks.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative flex gap-6 pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-14 h-full w-px bg-primary-300" />
                )}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                  {step.step}
                </div>
                <div className="pt-1">
                  <h3 className="mb-2 text-xl font-semibold text-primary-900">{step.title}</h3>
                  <p className="mb-2 leading-relaxed text-neutral-700">{step.description}</p>
                  <p className="text-sm italic text-neutral-500">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-primary-900 sm:text-4xl">
              Common Funding Mistakes — and How to Avoid Them
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Most funding failures follow predictable patterns. Understanding them is the first step toward avoiding them.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            {commonMistakes.map((item, index) => (
              <motion.div
                key={item.mistake}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900">{item.mistake}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-neutral-600">{item.consequence}</p>
                <div className="rounded-lg bg-primary-50 p-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                    The fix:{' '}
                  </span>
                  <span className="text-sm text-primary-700">{item.fix}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div {...fadeInUp}>
                <h2 className="mb-6 text-3xl font-bold text-primary-900 sm:text-4xl">
                  Who This Is For
                </h2>
                <div className="space-y-4 text-neutral-700">
                  <p className="leading-relaxed">
                    This service is for families who have a signed trust — whether signed last month or years ago — and want the funding work driven to completion by someone who tracks every open item.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-neutral-900">Recently signed documents:</strong> You just finished with your estate planning attorney. You have a folder of documents and a list of things to do. We take that list and run it down.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-neutral-900">Older trusts:</strong> You signed a trust years ago, and you are not entirely sure what got funded and what did not. We start with a complete audit and fill the gaps.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-neutral-900">Complex situations:</strong> Real estate in multiple states, business interests, multiple financial institutions. These plans have more moving parts — exactly where project management adds the most value.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {[
                  {
                    label: 'Recently Signed',
                    detail: 'Just completed your estate plan',
                    icon: '✓',
                  },
                  {
                    label: 'Older Trusts',
                    detail: 'Signed years ago, unsure what was funded',
                    icon: '✓',
                  },
                  {
                    label: 'Multiple States',
                    detail: 'Real property or accounts across state lines',
                    icon: '✓',
                  },
                  {
                    label: 'Business Owners',
                    detail: 'LLC or corporate interests to coordinate',
                    icon: '✓',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-primary-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-primary-600">{item.icon}</span>
                      <span className="font-semibold text-neutral-900">{item.label}</span>
                    </div>
                    <p className="text-sm text-neutral-500">{item.detail}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-primary-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Common questions about trust funding and how the process works.
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
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="pr-4 text-lg font-medium text-neutral-900">{faq.question}</span>
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
                    className="pb-5 leading-relaxed text-neutral-600"
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
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container-width py-20">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Your Trust Is Signed. Let's Make Sure It Works.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-100">
              Schedule a conversation to discuss your trust and what funding coordination would look like for your situation. We will help you understand exactly what needs to happen and whether this service is the right fit.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="rounded-lg bg-white px-8 py-3.5 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                Get Help Funding Your Trust
              </Link>
              <Link
                to="/services/wills-trusts"
                className="rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Learn About Trusts First
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TrustFundingPage
