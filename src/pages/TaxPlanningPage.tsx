import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TaxPlanningPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const taxTypes = [
    {
      title: 'Federal Estate Tax',
      description:
        'A tax on the transfer of your estate at death. Only applies to estates exceeding the exemption amount (currently $13.61 million per person in 2024). The top rate is 40%.',
      exemption: '$13.61M (2024)',
      rate: 'Up to 40%',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Gift Tax',
      description:
        'Applies to lifetime transfers exceeding annual exclusion ($18,000 per recipient in 2024). Uses the same lifetime exemption as estate tax—gifts reduce what\'s available at death.',
      exemption: '$18K annual / $13.61M lifetime',
      rate: 'Up to 40%',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      title: 'Generation-Skipping Transfer Tax',
      description:
        'An additional tax on transfers to grandchildren or others more than one generation below you. Prevents families from skipping a generation to avoid estate tax.',
      exemption: '$13.61M (2024)',
      rate: 'Flat 40%',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'State Estate/Inheritance Tax',
      description:
        'Many states impose their own estate or inheritance taxes with lower exemptions than federal. Some tax the estate; others tax beneficiaries based on their relationship to you.',
      exemption: 'Varies by state',
      rate: 'Varies (0-20%)',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
    },
  ]

  const strategies = [
    {
      title: 'Annual Exclusion Gifting',
      description:
        'Give up to $18,000 per recipient annually (2024) without using any lifetime exemption. A married couple can gift $36,000 to each recipient. Over time, this removes significant wealth from your taxable estate.',
      impact: 'Removes assets + future growth from estate',
      complexity: 'Low',
    },
    {
      title: 'Grantor Retained Annuity Trust (GRAT)',
      description:
        'Transfer appreciating assets to a trust while retaining annuity payments. If assets grow faster than IRS interest rates, excess passes to beneficiaries tax-free. Effective for concentrated stock positions.',
      impact: 'Transfers appreciation above hurdle rate tax-free',
      complexity: 'Medium',
    },
    {
      title: 'Irrevocable Life Insurance Trust (ILIT)',
      description:
        'Owns life insurance outside your estate. Proceeds pass to beneficiaries free of estate tax. Particularly valuable for providing liquidity to pay estate taxes without selling assets.',
      impact: 'Insurance proceeds excluded from estate',
      complexity: 'Medium',
    },
    {
      title: 'Charitable Remainder Trust (CRT)',
      description:
        'Transfer assets to a trust that pays you income for life or a term of years; remainder goes to charity. Provides immediate income tax deduction and removes assets from estate.',
      impact: 'Income stream + charitable deduction + estate reduction',
      complexity: 'Medium-High',
    },
    {
      title: 'Spousal Lifetime Access Trust (SLAT)',
      description:
        'One spouse gifts assets to an irrevocable trust for the benefit of the other spouse. Uses gift exemption while maintaining indirect access to funds. Popular before potential exemption reduction.',
      impact: 'Uses exemption while retaining family access',
      complexity: 'Medium-High',
    },
    {
      title: 'Family Limited Partnership (FLP)',
      description:
        'Pool family assets in a partnership, then gift limited partnership interests at discounted values. Valuation discounts for lack of control and marketability can reduce gift tax impact.',
      impact: 'Valuation discounts on transferred interests',
      complexity: 'High',
    },
  ]

  const exemptionTimeline = [
    { year: '2017', amount: '$5.49M', note: 'Pre-TCJA level' },
    { year: '2018', amount: '$11.18M', note: 'TCJA doubled exemption' },
    { year: '2024', amount: '$13.61M', note: 'Current (inflation-adjusted)' },
    { year: '2026', amount: '~$7M (projected)', note: 'TCJA sunset—reverts to pre-2018 levels' },
  ]

  const charitableOptions = [
    {
      name: 'Charitable Remainder Trust (CRT)',
      howItWorks: 'You receive income; charity gets remainder',
      taxBenefit: 'Partial income tax deduction now',
      bestFor: 'Those wanting income stream + charitable impact',
    },
    {
      name: 'Charitable Lead Trust (CLT)',
      howItWorks: 'Charity receives income; family gets remainder',
      taxBenefit: 'Estate/gift tax reduction',
      bestFor: 'Wealthy families wanting to pass assets to heirs',
    },
    {
      name: 'Donor-Advised Fund (DAF)',
      howItWorks: 'Contribute now, recommend grants later',
      taxBenefit: 'Immediate deduction, flexible giving',
      bestFor: 'Those wanting to "bunch" charitable deductions',
    },
    {
      name: 'Private Foundation',
      howItWorks: 'Create and control your own charitable entity',
      taxBenefit: 'Deduction + family involvement',
      bestFor: 'Families with significant philanthropic goals',
    },
  ]

  const faqs = [
    {
      question: 'Will the estate tax exemption really drop in 2026?',
      answer:
        'Under current law (the Tax Cuts and Jobs Act), the doubled exemption sunsets on January 1, 2026, reverting to approximately $7 million per person (adjusted for inflation). Congress could extend the higher exemption, but without legislation, the reduction is automatic. This "use it or lose it" window has driven significant planning activity.',
    },
    {
      question: 'How does portability work between spouses?',
      answer:
        'Portability allows a surviving spouse to use the deceased spouse\'s unused estate tax exemption. If the first spouse dies with a $13.61 million exemption and only uses $3 million, the surviving spouse can "port" the remaining $10.61 million by filing an estate tax return (Form 706) within 9 months. Combined with their own exemption, the surviving spouse could shelter over $24 million.',
    },
    {
      question: 'Are life insurance proceeds taxable?',
      answer:
        'Life insurance proceeds are income tax-free to beneficiaries. However, if you own the policy at death, the proceeds are included in your taxable estate. An Irrevocable Life Insurance Trust (ILIT) removes the policy from your estate, making proceeds both income and estate tax-free.',
    },
    {
      question: 'What is a "step-up in basis" and why does it matter?',
      answer:
        'When you inherit assets, your cost basis "steps up" to fair market value at the date of death. If you inherit stock your parent bought for $10 that\'s worth $100 at death, your basis is $100—you owe no capital gains if you sell immediately. This benefit makes holding appreciated assets until death sometimes more tax-efficient than gifting during life.',
    },
    {
      question: 'Can I give unlimited amounts to pay for education or medical expenses?',
      answer:
        'Yes—with conditions. Payments made directly to educational institutions for tuition or to medical providers for healthcare are exempt from gift tax with no dollar limit. These payments don\'t count against your annual exclusion or lifetime exemption. However, payments for room, board, or books don\'t qualify; they must be for tuition specifically.',
    },
    {
      question: 'How do state estate taxes affect planning?',
      answer:
        'About a dozen states impose estate or inheritance taxes with exemptions much lower than federal (some as low as $1 million). If you live in—or own real estate in—one of these states, you may owe state tax even if your estate is well below the federal threshold. Strategies like qualified personal residence trusts (QPRTs) or relocation can help.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[50vh] w-full overflow-hidden bg-gradient-to-br from-accent-700 via-accent-600 to-accent-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-[50vh] items-center">
          <div className="container-width py-16">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent-100"
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
                Tax Planning
              </motion.h1>
              <motion.p
                className="mb-8 text-lg text-accent-100 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Strategic approaches to minimize estate, gift, and generation-skipping transfer taxes—preserving more of your wealth for the people and causes you care about.
              </motion.p>
              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link
                  to="/schedule"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-accent-700 transition-colors hover:bg-accent-50"
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
              Why Tax Planning Matters
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p className="text-lg leading-relaxed">
                For families with significant assets, transfer taxes can erode up to 40% of wealth passed to the next generation. But with thoughtful planning, these taxes are largely—sometimes entirely—avoidable.
              </p>
              <p className="leading-relaxed">
                Estate tax planning is not about avoiding legal obligations. It is about using the tools Congress has provided—exemptions, trusts, charitable structures, and valuation techniques—to transfer wealth efficiently while achieving your broader goals.
              </p>
              <p className="leading-relaxed">
                The current high federal exemption ($13.61 million per person in 2024) means fewer families face federal estate tax today. But that window is scheduled to close in 2026, and state-level taxes often apply at much lower thresholds. Planning now preserves options.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding the Taxes */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Understanding Transfer Taxes
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Four types of taxes can apply when you transfer wealth. Understanding each helps you develop effective strategies.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {taxTypes.map((tax, index) => (
              <motion.div
                key={tax.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                    {tax.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {tax.title}
                    </h3>
                  </div>
                </div>
                <p className="mb-4 text-neutral-600">{tax.description}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-lg bg-neutral-50 px-3 py-2">
                    <span className="text-xs text-neutral-500">Exemption</span>
                    <div className="text-sm font-semibold text-neutral-900">{tax.exemption}</div>
                  </div>
                  <div className="rounded-lg bg-neutral-50 px-3 py-2">
                    <span className="text-xs text-neutral-500">Tax Rate</span>
                    <div className="text-sm font-semibold text-neutral-900">{tax.rate}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemption Timeline */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              The 2026 Exemption Sunset
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              The federal estate tax exemption is scheduled to drop significantly. Understanding this timeline is critical for planning.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-accent-200 sm:left-1/2 sm:-translate-x-0.5" />

              {exemptionTimeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative mb-8 flex items-center ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`ml-16 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <div className="text-sm font-medium text-accent-600">{item.year}</div>
                      <div className="text-xl font-bold text-neutral-900">{item.amount}</div>
                      <div className="text-sm text-neutral-500">{item.note}</div>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 flex h-4 w-4 items-center justify-center rounded-full border-4 border-accent-500 bg-white sm:left-1/2 sm:-translate-x-1/2" />
                </div>
              ))}
            </div>

            <motion.div
              className="mt-8 rounded-xl border border-accent-200 bg-accent-50 p-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-accent-800">Planning Window</h4>
                  <p className="text-sm text-accent-700">
                    The IRS has confirmed that gifts made using the higher exemption before 2026 will not be "clawed back" if the exemption drops. This creates a limited opportunity for families to lock in current exemptions through strategic gifting.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Strategies */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Tax Reduction Strategies
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Effective estate tax planning uses a combination of techniques tailored to your specific situation.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  {strategy.title}
                </h3>
                <p className="mb-4 text-neutral-600">{strategy.description}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-lg bg-primary-50 px-3 py-1.5">
                    <span className="text-xs font-medium text-primary-700">Impact: </span>
                    <span className="text-xs text-primary-600">{strategy.impact}</span>
                  </div>
                  <div className="rounded-lg bg-neutral-100 px-3 py-1.5">
                    <span className="text-xs font-medium text-neutral-700">Complexity: </span>
                    <span className="text-xs text-neutral-600">{strategy.complexity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charitable Planning */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12" {...fadeInUp}>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
                  Charitable Planning
                </h2>
                <div className="space-y-4 text-neutral-700">
                  <p>
                    Charitable giving offers a unique opportunity to support causes you care about while reducing your tax burden. The key is choosing the right vehicle for your goals.
                  </p>
                  <p>
                    Charitable planning can provide immediate income tax deductions, reduce estate tax exposure, and create a lasting philanthropic legacy. Some structures even provide you with income for life.
                  </p>
                  <p>
                    The best approach depends on your timeline, the assets you want to give, your income needs, and how involved you want to be in directing grants.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {charitableOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <h4 className="mb-2 font-semibold text-neutral-900">{option.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-neutral-600">
                        <span className="font-medium text-neutral-700">How it works: </span>
                        {option.howItWorks}
                      </p>
                      <p className="text-neutral-600">
                        <span className="font-medium text-neutral-700">Tax benefit: </span>
                        {option.taxBenefit}
                      </p>
                      <p className="text-neutral-600">
                        <span className="font-medium text-neutral-700">Best for: </span>
                        {option.bestFor}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* When to Act */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-width">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">When to Act</h2>
            <p className="mb-8 text-lg text-neutral-300">
              Tax planning is most effective when done proactively. Consider these triggers for reviewing your strategy:
            </p>
            <div className="grid gap-4 text-left sm:grid-cols-2">
              {[
                'Net worth approaching $5 million+',
                'Major liquidity event (sale of business, inheritance)',
                'Approaching the 2026 exemption sunset',
                'Significant appreciation in concentrated positions',
                'Change in marital status',
                'Birth of grandchildren',
                'Relocation to a high-tax state',
                'Change in philanthropic goals',
              ].map((trigger, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-neutral-800 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <svg className="h-5 w-5 flex-shrink-0 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-200">{trigger}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Common questions about estate and gift tax planning.
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
      <section className="bg-gradient-to-br from-accent-600 to-accent-800 text-white">
        <div className="container-width py-16">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Optimize Your Tax Strategy
            </h2>
            <p className="mb-8 text-lg text-accent-100">
              Schedule a consultation to review your current situation and explore strategies that could preserve more of your wealth for future generations.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-accent-700 transition-colors hover:bg-accent-50"
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

export default TaxPlanningPage
