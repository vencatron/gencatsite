import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const TaxPlanningPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeStrategy, setActiveStrategy] = useState<number>(0)

  const taxTypes = [
    {
      name: 'Estate Tax',
      description: 'Federal tax on the transfer of property at death',
      exemption: '$13.61 million (2024)',
      rate: 'Up to 40%',
      details: 'Applies to estates exceeding the exemption. The exemption is portable between spouses, effectively doubling to $27.22 million for married couples.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    },
    {
      name: 'Gift Tax',
      description: 'Tax on lifetime transfers to others',
      exemption: '$18,000/person/year (2024)',
      rate: 'Up to 40%',
      details: 'Annual exclusion allows tax-free gifts up to the limit per recipient. Gifts above this count against your lifetime exemption.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
        </svg>
      )
    },
    {
      name: 'Generation-Skipping Transfer Tax',
      description: 'Tax on transfers to grandchildren or more remote descendants',
      exemption: '$13.61 million (2024)',
      rate: 'Flat 40%',
      details: 'Prevents families from avoiding estate tax by skipping a generation. Separate exemption from estate/gift tax but same amount.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    },
    {
      name: 'Capital Gains Tax',
      description: 'Tax on appreciation of assets when sold',
      exemption: 'Stepped-up basis at death',
      rate: '0%, 15%, or 20%',
      details: 'Inherited assets receive a "step-up" in basis to fair market value at death, potentially eliminating decades of capital gains.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      )
    }
  ]

  const strategies = [
    {
      title: 'Annual Gift Exclusion',
      category: 'Gifting Strategies',
      description: 'Make tax-free gifts up to the annual exclusion amount to reduce your taxable estate over time.',
      howItWorks: 'In 2024, you can give $18,000 per recipient per year without filing a gift tax return or using any of your lifetime exemption. A married couple can give $36,000 per recipient ($18,000 each). Over time, this significantly reduces your taxable estate.',
      benefits: ['Reduces taxable estate', 'No gift tax return required', 'Unlimited number of recipients', 'Can combine with other strategies'],
      considerations: ['Must be completed gifts', 'Cannot retain control', 'Consider beneficiary needs', 'Track gifts carefully'],
      example: 'A couple with 3 children and 6 grandchildren can transfer $324,000 per year ($36,000 × 9 recipients) without gift tax consequences.'
    },
    {
      title: 'Grantor Retained Annuity Trust (GRAT)',
      category: 'Advanced Trusts',
      description: 'Transfer appreciation on assets to beneficiaries with minimal gift tax, ideal for assets expected to grow significantly.',
      howItWorks: 'You transfer assets to a trust and receive annuity payments for a fixed term. At the end, remaining assets pass to beneficiaries. If structured properly (zeroed-out GRAT), there is little or no gift tax. Any growth above the IRS assumed rate passes tax-free.',
      benefits: ['Minimal or zero gift tax', 'Transfers appreciation tax-free', 'Retain income during term', 'Can use serial GRATs'],
      considerations: ['Must survive the term', 'Complex to administer', 'Works best with appreciating assets', 'IRS 7520 rate affects efficiency'],
      example: 'Fund a 2-year GRAT with $1M in stock. If stock grows 20%, approximately $200,000 passes to heirs gift-tax-free (minus the 7520 rate growth).'
    },
    {
      title: 'Irrevocable Life Insurance Trust (ILIT)',
      category: 'Insurance Planning',
      description: 'Remove life insurance proceeds from your taxable estate, potentially saving millions in estate taxes.',
      howItWorks: 'An irrevocable trust owns your life insurance policy. You make annual gifts to the trust to pay premiums (using Crummey notices). At death, proceeds are paid to the trust—not your estate—and distributed to beneficiaries estate-tax-free.',
      benefits: ['Removes insurance from estate', 'Provides estate liquidity', 'Protects proceeds from creditors', 'Benefits multiple generations'],
      considerations: ['Irrevocable—cannot change', 'Annual gift tax planning needed', 'Three-year look-back rule', 'Trustee must manage properly'],
      example: 'A $5M life insurance policy in your estate could cost $2M in estate taxes. In an ILIT, the full $5M goes to your family tax-free.'
    },
    {
      title: 'Charitable Remainder Trust (CRT)',
      category: 'Charitable Planning',
      description: 'Donate appreciated assets, receive lifetime income, get an immediate tax deduction, and support charity.',
      howItWorks: 'Transfer appreciated assets to the trust. You receive annual income (annuity or unitrust amount) for life or a term of years. At the end, the remainder goes to your chosen charity. You avoid capital gains on the transfer and get an immediate charitable deduction.',
      benefits: ['Avoid capital gains tax', 'Immediate charitable deduction', 'Lifetime income stream', 'Support causes you care about'],
      considerations: ['Irrevocable gift', 'Minimum 10% remainder to charity', 'Income is taxable', 'Complex to establish'],
      example: 'Transfer $1M of stock with $100K basis. Avoid $180K in capital gains tax, receive ~$50K annual income, and get a $300K+ charitable deduction.'
    },
    {
      title: 'Qualified Personal Residence Trust (QPRT)',
      category: 'Real Estate Planning',
      description: 'Transfer your home to heirs at a significantly reduced gift tax value while continuing to live there.',
      howItWorks: 'Transfer your home to an irrevocable trust while retaining the right to live there for a fixed term. The gift value is reduced because you keep the residence interest. After the term, the home passes to beneficiaries outside your estate.',
      benefits: ['Reduced gift tax value', 'Continue living in home', 'Removes future appreciation', 'Estate tax savings'],
      considerations: ['Must survive the term', 'Pay fair market rent after term', 'Cannot sell during term', 'Best with appreciating properties'],
      example: 'A 60-year-old transfers a $2M home with a 15-year QPRT. Gift value may be only $600K, saving gift tax on $1.4M and removing all future appreciation.'
    },
    {
      title: 'Family Limited Partnership/LLC',
      category: 'Business Planning',
      description: 'Transfer business or investment assets at discounted values while maintaining control.',
      howItWorks: 'You create a partnership or LLC, contribute assets, and gift limited partnership interests to family members. Because limited partners lack control and marketability, the value of gifted interests is discounted—often 25-40%. You retain control as general partner.',
      benefits: ['Valuation discounts', 'Retain management control', 'Asset protection benefits', 'Centralized management'],
      considerations: ['Must have legitimate business purpose', 'Proper formalities required', 'IRS scrutiny of discounts', 'Complex structure'],
      example: 'Transfer $10M in investments to an FLP. Gift 40% to children at a 35% discount—$2.6M gift value instead of $4M, saving $560K in gift tax.'
    },
    {
      title: 'Spousal Lifetime Access Trust (SLAT)',
      category: 'Spousal Planning',
      description: 'Use your estate tax exemption now while maintaining indirect access to assets through your spouse.',
      howItWorks: 'One spouse creates an irrevocable trust for the benefit of the other spouse (and children). The grantor spouse uses their exemption to fund the trust. The beneficiary spouse can receive distributions, providing indirect access to the assets.',
      benefits: ['Uses exemption before it decreases', 'Indirect access through spouse', 'Asset protection', 'Removes appreciation from estate'],
      considerations: ['Irrevocable gift', 'Divorce risk', 'Cannot be identical if both spouses create', 'Beneficiary spouse cannot be trustee'],
      example: 'With exemption potentially dropping to $6M in 2026, a SLAT allows you to use $13.61M exemption now while spouse can still benefit from the trust.'
    },
    {
      title: 'Charitable Lead Trust (CLT)',
      category: 'Charitable Planning',
      description: 'Provide income to charity now, then pass assets to family with reduced or eliminated gift/estate tax.',
      howItWorks: 'Assets are transferred to a trust that pays income to charity for a term of years. At the end, remaining assets pass to your designated beneficiaries. The gift/estate tax value of the remainder is reduced by the value of the charitable interest.',
      benefits: ['Reduced transfer taxes', 'Support charity during lifetime', 'Pass wealth to family', 'Income tax benefits (grantor CLT)'],
      considerations: ['Assets tied up during term', 'Charity receives income first', 'Complex planning required', 'Best with low interest rates'],
      example: 'Transfer $5M to a 20-year CLT paying 5% to charity. After $5M in charitable payments, remaining assets (with growth) pass to heirs at reduced tax cost.'
    }
  ]

  const currentYearData = {
    year: 2024,
    estateExemption: '$13.61 million',
    giftAnnualExclusion: '$18,000',
    gstExemption: '$13.61 million',
    topRate: '40%',
    portability: 'Yes',
    sunsetYear: 2026,
    projectedExemption: '~$6-7 million'
  }

  const faqs = [
    {
      question: 'Will the estate tax exemption really decrease in 2026?',
      answer: 'Under current law, yes. The Tax Cuts and Jobs Act of 2017 doubled the exemption through 2025. On January 1, 2026, it is scheduled to revert to approximately $6-7 million (adjusted for inflation). Congress could change this, but prudent planning assumes the sunset will occur. This makes current planning especially valuable.'
    },
    {
      question: 'What is portability and how does it work?',
      answer: 'Portability allows a surviving spouse to use any unused portion of their deceased spouse\'s estate tax exemption. For example, if the first spouse to die uses only $5 million of their $13.61 million exemption, the surviving spouse can use the remaining $8.61 million plus their own exemption. However, portability must be elected on a timely filed estate tax return, even if no tax is due.'
    },
    {
      question: 'What is the "step-up in basis" and why does it matter?',
      answer: 'When you inherit assets, their tax basis is "stepped up" to fair market value at the date of death. This eliminates capital gains tax on appreciation that occurred during the decedent\'s lifetime. For example, if your parent bought stock for $10,000 that\'s worth $100,000 at death, you inherit it with a $100,000 basis—the $90,000 gain disappears. This makes holding appreciated assets until death often preferable to gifting them.'
    },
    {
      question: 'How do I know if my estate will owe taxes?',
      answer: 'Calculate your total estate: real estate, investments, retirement accounts, life insurance death benefits, business interests, and personal property. If this exceeds $13.61 million (or $27.22 million for a married couple using portability), estate tax may apply. However, proper planning can often reduce or eliminate tax even for larger estates. California has no state estate tax, which is an advantage.'
    },
    {
      question: 'Should I make large gifts now before the exemption decreases?',
      answer: 'For many people with substantial estates, using the higher exemption now makes sense. The IRS has confirmed there will be no "clawback"—gifts made under the higher exemption will not be penalized if the exemption later decreases. However, gifted assets do not receive a step-up in basis, so the decision involves balancing estate tax savings against potential capital gains tax.'
    },
    {
      question: 'What is the difference between gift tax and estate tax?',
      answer: 'Gift tax applies to transfers during your lifetime; estate tax applies to transfers at death. They share a unified exemption ($13.61 million in 2024) and the same top rate (40%). Gifts above the annual exclusion ($18,000/person/year) reduce your available estate tax exemption dollar-for-dollar. The key difference is that gifted assets retain the donor\'s basis, while inherited assets receive a stepped-up basis.'
    },
    {
      question: 'How does life insurance factor into estate taxes?',
      answer: 'Life insurance proceeds are included in your taxable estate if you own the policy or have any "incidents of ownership." A $5 million policy could cost your estate $2 million in taxes. The solution is an Irrevocable Life Insurance Trust (ILIT), which removes the proceeds from your estate while providing liquidity for your beneficiaries. Note the three-year look-back rule for transferred policies.'
    },
    {
      question: 'What tax planning strategies work for smaller estates?',
      answer: 'Even if your estate is below the exemption, planning can save income taxes and provide other benefits. Consider: maximizing the step-up in basis, using annual exclusion gifts strategically, proper beneficiary designations on retirement accounts, charitable giving strategies for income tax deductions, and ensuring proper titling to avoid probate costs.'
    }
  ]

  const timeline = [
    { year: '2017', exemption: '$5.49M', event: 'Pre-TCJA baseline' },
    { year: '2018', exemption: '$11.18M', event: 'TCJA doubles exemption' },
    { year: '2024', exemption: '$13.61M', event: 'Current exemption (inflation adjusted)' },
    { year: '2025', exemption: '~$14M', event: 'Last year of doubled exemption' },
    { year: '2026', exemption: '~$6-7M', event: 'Scheduled sunset (without legislation)' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/70 to-accent-900/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-width">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm mb-6">
                Strategic Tax Reduction
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Tax Planning That <span className="text-accent-300">Preserves</span> Your Wealth
              </h1>
              <p className="text-lg sm:text-xl text-neutral-200 mb-8 leading-relaxed">
                Minimize estate, gift, and income taxes with proven strategies. Keep more of what you have built for the people and causes you care about.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/schedule" className="btn-primary text-center">
                  Schedule Tax Consultation
                </Link>
                <a href="#strategies" className="btn-outline border-white text-white hover:bg-white hover:text-accent-800 text-center">
                  Explore Strategies
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgent Notice Banner */}
      <section className="bg-accent-600 text-white py-4">
        <div className="container-width">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span className="font-medium">
                Estate tax exemption scheduled to drop by ~50% in 2026. Planning now could save millions.
              </span>
            </div>
            <Link to="/schedule" className="text-white font-semibold underline hover:no-underline whitespace-nowrap">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Understanding Transfer Taxes */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-accent mb-4">Tax Education</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              Understanding <span className="text-gradient">Transfer Taxes</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Effective planning starts with understanding the taxes that affect wealth transfer. Here is what you need to know.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {taxTypes.map((tax, index) => (
              <motion.div
                key={tax.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-200 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 flex-shrink-0">
                    {tax.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">{tax.name}</h3>
                    <p className="text-neutral-600 text-sm">{tax.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <span className="text-xs font-medium text-primary-700 uppercase tracking-wider">Exemption</span>
                    <p className="text-primary-900 font-semibold mt-1">{tax.exemption}</p>
                  </div>
                  <div className="bg-accent-50 rounded-lg p-3">
                    <span className="text-xs font-medium text-accent-700 uppercase tracking-wider">Rate</span>
                    <p className="text-accent-900 font-semibold mt-1">{tax.rate}</p>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm">{tax.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemption Timeline */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white mb-4">
              Critical Timeline
            </span>
            <h2 className="heading-lg mb-4">
              Estate Tax Exemption: Then and Now
            </h2>
            <p className="text-lg text-neutral-300">
              The window to use the historically high exemption is closing. Here is how it has changed and where it is headed.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-neutral-700" />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${item.year === '2024' ? 'lg:col-span-1' : ''}`}
                >
                  <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-5 border ${
                    item.year === '2024'
                      ? 'border-accent-400 ring-2 ring-accent-400/50'
                      : item.year === '2026'
                        ? 'border-red-400/50'
                        : 'border-white/10'
                  }`}>
                    {/* Timeline dot */}
                    <div className={`hidden lg:block absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${
                      item.year === '2024' ? 'bg-accent-400' : item.year === '2026' ? 'bg-red-400' : 'bg-neutral-500'
                    }`} />

                    <div className="text-center">
                      <span className={`text-3xl font-bold ${
                        item.year === '2024' ? 'text-accent-400' : item.year === '2026' ? 'text-red-400' : 'text-white'
                      }`}>
                        {item.year}
                      </span>
                      <p className="text-2xl font-semibold text-white mt-2">{item.exemption}</p>
                      <p className="text-sm text-neutral-400 mt-2">{item.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-white/5 rounded-xl p-6 text-center"
          >
            <p className="text-neutral-300">
              The IRS has confirmed: <span className="text-white font-medium">no clawback</span> for gifts made under the higher exemption.
              Gifts made today remain protected even if the exemption decreases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tax Strategies Section */}
      <section id="strategies" className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Planning Strategies</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              Proven Tax <span className="text-gradient">Reduction Strategies</span>
            </h2>
            <p className="text-lg text-neutral-600">
              From simple annual gifting to sophisticated trust structures, explore strategies that can significantly reduce your tax burden.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Strategy Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-2">
                {strategies.map((strategy, index) => (
                  <button
                    key={strategy.title}
                    onClick={() => setActiveStrategy(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeStrategy === index
                        ? 'bg-primary-100 text-primary-800 font-medium'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">
                      {strategy.category}
                    </span>
                    {strategy.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Details */}
            {strategies[activeStrategy] && (
              <motion.div
                key={activeStrategy}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                  <span className="badge-primary mb-4">{strategies[activeStrategy].category}</span>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                    {strategies[activeStrategy].title}
                  </h3>
                  <p className="text-neutral-600 text-lg mb-6">
                    {strategies[activeStrategy].description}
                  </p>

                  <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-6">
                    <h4 className="font-semibold text-neutral-900 mb-3">How It Works</h4>
                    <p className="text-neutral-700">{strategies[activeStrategy].howItWorks}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-primary-50 rounded-xl p-5">
                      <h4 className="font-semibold text-primary-900 mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {strategies[activeStrategy].benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <span className="text-sm text-primary-800">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-neutral-100 rounded-xl p-5">
                      <h4 className="font-semibold text-neutral-900 mb-3">Considerations</h4>
                      <ul className="space-y-2">
                        {strategies[activeStrategy].considerations.map((consideration, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            <span className="text-sm text-neutral-700">{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-accent-50 rounded-xl p-5 border border-accent-200">
                    <h4 className="font-semibold text-accent-900 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                      </svg>
                      Real-World Example
                    </h4>
                    <p className="text-accent-800">{strategies[activeStrategy].example}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Current Year Quick Reference */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Quick Reference</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              {currentYearData.year} Tax Numbers <span className="text-gradient">At a Glance</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Key figures you need to know for this year's planning decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Estate Tax Exemption', value: currentYearData.estateExemption, note: 'Per person' },
              { label: 'Annual Gift Exclusion', value: currentYearData.giftAnnualExclusion, note: 'Per recipient' },
              { label: 'GST Tax Exemption', value: currentYearData.gstExemption, note: 'Per person' },
              { label: 'Top Tax Rate', value: currentYearData.topRate, note: 'Estate, gift, and GST' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm text-center"
              >
                <p className="text-neutral-600 text-sm mb-2">{item.label}</p>
                <p className="text-3xl font-bold text-primary-700">{item.value}</p>
                <p className="text-neutral-500 text-xs mt-2">{item.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 bg-white rounded-xl p-6 border border-neutral-200 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-semibold text-neutral-900">California Advantage</h4>
                <p className="text-neutral-600">California has no state estate or inheritance tax, simplifying planning for California residents.</p>
              </div>
              <Link to="/schedule" className="btn-primary whitespace-nowrap">
                Discuss Your Situation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Common Questions</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              Tax Planning <span className="text-gradient">FAQ</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Answers to the most common tax planning questions we receive.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-neutral-100 transition-colors"
                    aria-expanded={activeFaq === index}
                  >
                    <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-primary-600 flex-shrink-0 transform transition-transform duration-200 ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeFaq === index ? 'auto' : 0,
                      opacity: activeFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t border-neutral-200">
                      <p className="text-neutral-700 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-6">
              Ready to Minimize Your Tax Burden?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Every situation is unique. Let our experienced team analyze your estate and recommend the strategies that will work best for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/schedule"
                className="bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                Schedule Tax Consultation
              </Link>
              <Link
                to="/services/estate-planning"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Learn About Estate Planning
              </Link>
            </div>
            <p className="text-primary-200 text-sm mt-8">
              The window for using the higher exemption is closing. Act now to protect your wealth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md text-neutral-900 mb-4">Related Services</h2>
            <p className="text-neutral-600">Explore our other estate planning services</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Estate Planning',
                description: 'Comprehensive strategies to protect your assets and provide for your family.',
                href: '/services/estate-planning'
              },
              {
                title: 'Wills & Trusts',
                description: 'Professional drafting of the foundation documents for your estate plan.',
                href: '/services/wills-trusts'
              },
              {
                title: 'Asset Protection',
                description: 'Shield your wealth from creditors, lawsuits, and other threats.',
                href: '/services/asset-protection'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={service.href}
                  className="block bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 h-full"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{service.title}</h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  <span className="text-primary-600 font-medium inline-flex items-center gap-2">
                    Learn more
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default TaxPlanningPage
