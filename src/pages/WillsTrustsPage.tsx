import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const WillsTrustsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'wills' | 'trusts'>('wills')

  const trustTypes = [
    {
      name: 'Revocable Living Trust',
      description: 'The most common trust type, allowing you to maintain control of assets during your lifetime and modify terms as needed.',
      bestFor: 'Most individuals and families seeking probate avoidance and privacy',
      keyFeatures: ['Avoids probate', 'Maintains control during lifetime', 'Can be modified or revoked', 'Provides incapacity planning'],
      considerations: 'Requires proper funding to be effective. Assets must be titled in the trust name.'
    },
    {
      name: 'Irrevocable Life Insurance Trust (ILIT)',
      description: 'Removes life insurance proceeds from your taxable estate, potentially saving significant estate taxes.',
      bestFor: 'Individuals with substantial life insurance policies and taxable estates',
      keyFeatures: ['Removes insurance from estate', 'Provides liquidity for estate taxes', 'Protects proceeds from creditors', 'Benefits multiple generations'],
      considerations: 'Cannot be changed once created. Requires annual gift tax exclusion planning.'
    },
    {
      name: 'Special Needs Trust',
      description: 'Provides for a beneficiary with disabilities without disqualifying them from government benefits.',
      bestFor: 'Families with disabled beneficiaries receiving SSI, Medicaid, or other means-tested benefits',
      keyFeatures: ['Preserves government benefits', 'Funds quality-of-life expenses', 'Professional trustee options', 'Third-party or self-settled types'],
      considerations: 'Must comply with strict government regulations. Requires experienced drafting.'
    },
    {
      name: 'Charitable Remainder Trust',
      description: 'Provides income to you or beneficiaries for a period, with the remainder going to charity.',
      bestFor: 'Individuals with appreciated assets who want income and charitable giving',
      keyFeatures: ['Immediate charitable deduction', 'Avoids capital gains on transfer', 'Provides lifetime income', 'Supports charitable causes'],
      considerations: 'Irrevocable once funded. Requires careful planning of income percentages.'
    },
    {
      name: 'Qualified Personal Residence Trust (QPRT)',
      description: 'Transfers your home to beneficiaries at a reduced gift tax cost while you continue to live there.',
      bestFor: 'Homeowners with valuable residences seeking to reduce estate tax on real property',
      keyFeatures: ['Reduces gift tax value', 'Continued residence during term', 'Removes appreciation from estate', 'Freezes value for transfer'],
      considerations: 'Must survive the trust term. Requires rent payment if remaining after term.'
    },
    {
      name: 'Grantor Retained Annuity Trust (GRAT)',
      description: 'Transfers appreciation on assets to beneficiaries with minimal or zero gift tax consequences.',
      bestFor: 'Individuals with assets expected to appreciate significantly',
      keyFeatures: ['Minimal gift tax exposure', 'Transfers growth to beneficiaries', 'Short-term options available', 'Estate freeze technique'],
      considerations: 'Grantor must survive the term. Returns annuity payments to grantor.'
    }
  ]

  const willComponents = [
    {
      title: 'Executor Designation',
      description: 'Names the person responsible for managing your estate through probate, paying debts, and distributing assets.',
      importance: 'A trusted executor ensures your wishes are carried out efficiently and honestly.',
      tip: 'Choose someone organized, trustworthy, and willing to serve. Consider naming alternates.'
    },
    {
      title: 'Guardian Nominations',
      description: 'Designates who will care for your minor children if both parents pass away.',
      importance: 'Without a nomination, courts decide who raises your children—potentially someone you would not choose.',
      tip: 'Discuss with potential guardians first. Consider their parenting style, location, and values.'
    },
    {
      title: 'Asset Distribution',
      description: 'Specifies exactly how your property should be divided among beneficiaries.',
      importance: 'Clear instructions prevent family disputes and ensure your wishes are honored.',
      tip: 'Be specific about items with sentimental value. Consider percentage-based distributions for flexibility.'
    },
    {
      title: 'Residuary Clause',
      description: 'Directs how any assets not specifically mentioned should be distributed.',
      importance: 'Catches assets you may acquire after creating the will or forgot to include.',
      tip: 'Essential for a complete will. Usually directs residue to primary beneficiaries.'
    },
    {
      title: 'No-Contest Clause',
      description: 'Discourages beneficiaries from challenging the will by threatening disinheritance.',
      importance: 'Helps prevent costly litigation that depletes the estate.',
      tip: 'Effectiveness varies by state. Works best when beneficiaries have something to lose.'
    },
    {
      title: 'Debt and Tax Provisions',
      description: 'Specifies how debts, taxes, and estate expenses should be paid.',
      importance: 'Prevents unintended burden on specific beneficiaries or assets.',
      tip: 'Consider which assets should bear these costs—usually the residuary estate.'
    }
  ]

  const trustVsWill = [
    {
      feature: 'Probate',
      will: 'Required—public court process',
      trust: 'Avoided—private distribution'
    },
    {
      feature: 'Privacy',
      will: 'Public record after death',
      trust: 'Remains private'
    },
    {
      feature: 'Cost',
      will: 'Lower upfront, higher at death',
      trust: 'Higher upfront, lower at death'
    },
    {
      feature: 'Incapacity Planning',
      will: 'No protection',
      trust: 'Built-in provisions'
    },
    {
      feature: 'Effective Date',
      will: 'Only at death',
      trust: 'Immediate (for living trusts)'
    },
    {
      feature: 'Contests',
      will: 'Easier to challenge',
      trust: 'More difficult to challenge'
    },
    {
      feature: 'Multiple States',
      will: 'May require probate in each state',
      trust: 'Single administration'
    },
    {
      feature: 'Flexibility',
      will: 'Easy to change',
      trust: 'Revocable trusts can change; irrevocable cannot'
    }
  ]

  const faqs = [
    {
      question: 'Do I need both a will and a trust?',
      answer: 'In most comprehensive estate plans, yes. A will serves important functions even when you have a trust—it names guardians for minor children, appoints an executor, and serves as a safety net (pour-over will) for any assets not transferred to your trust. The trust handles the bulk of asset distribution and probate avoidance.'
    },
    {
      question: 'What is the difference between a living trust and a testamentary trust?',
      answer: 'A living trust is created and funded during your lifetime, allowing you to manage assets while alive and distribute them after death without probate. A testamentary trust is created through your will and only comes into existence after your death—it must go through probate first. Living trusts offer immediate benefits and more flexibility.'
    },
    {
      question: 'How do I "fund" a trust?',
      answer: 'Funding a trust means transferring ownership of assets into the trust. This typically involves changing the title on deeds (real estate), re-registering investment accounts, and updating beneficiary designations. An unfunded trust provides no probate avoidance—this is one of the most common estate planning mistakes.'
    },
    {
      question: 'Can I be the trustee of my own trust?',
      answer: 'Yes, with a revocable living trust, you typically serve as your own trustee during your lifetime, maintaining complete control over your assets. You also name successor trustees who take over if you become incapacitated or pass away. This structure gives you flexibility while ensuring continuity.'
    },
    {
      question: 'What happens if I die without a will (intestate)?',
      answer: 'Your state intestacy laws determine how your assets are distributed—usually to your closest relatives in a predetermined order. This may not match your wishes: unmarried partners receive nothing, and assets may be split in ways you would not choose. The court also appoints an administrator and, if you have minor children, a guardian.'
    },
    {
      question: 'How often should I update my will or trust?',
      answer: 'Review your documents every 3-5 years and after major life events: marriage, divorce, birth of children, death of beneficiaries, significant asset changes, or moving to a new state. Even if nothing has changed, periodic reviews ensure your plan still reflects your wishes and complies with current laws.'
    },
    {
      question: 'Can creditors access assets in a trust?',
      answer: 'For revocable trusts, creditors can reach assets during your lifetime just as if you owned them directly. After death, trust assets may be subject to creditor claims depending on state law. Irrevocable trusts offer better creditor protection, but there are specific rules about timing and fraudulent transfers.'
    },
    {
      question: 'What is a pour-over will?',
      answer: 'A pour-over will works with your living trust by directing that any assets not already in the trust at your death "pour over" into it. This ensures all assets are eventually distributed according to your trust terms. These assets still go through probate, but end up in the trust for unified administration.'
    }
  ]

  const trustFundingChecklist = [
    { category: 'Real Estate', items: ['Primary residence', 'Vacation properties', 'Rental properties', 'Vacant land'] },
    { category: 'Financial Accounts', items: ['Brokerage accounts', 'Savings accounts', 'CDs and money markets', 'Business accounts'] },
    { category: 'Business Interests', items: ['LLC membership interests', 'Partnership interests', 'Corporate stock', 'Sole proprietorship assets'] },
    { category: 'Personal Property', items: ['Vehicles (in some states)', 'Valuable collections', 'Jewelry and artwork', 'Intellectual property'] }
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
            backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/70 to-secondary-900/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-width">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm mb-6">
                Foundation Documents
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Wills & Trusts That <span className="text-secondary-300">Secure</span> Your Legacy
              </h1>
              <p className="text-lg sm:text-xl text-neutral-200 mb-8 leading-relaxed">
                From simple wills to sophisticated trusts, we craft documents that protect your family, preserve your assets, and ensure your wishes are honored.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/schedule" className="btn-primary text-center">
                  Schedule Consultation
                </Link>
                <a href="#comparison" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-800 text-center">
                  Will vs Trust
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-secondary mb-4">Understanding the Basics</span>
              <h2 className="heading-lg text-neutral-900 mb-6">
                The Building Blocks of Your <span className="text-gradient">Estate Plan</span>
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-neutral-700 mb-4">
                  Wills and trusts are the foundational documents of estate planning. While often discussed together, they serve different purposes and work in different ways. Understanding these differences helps you make informed decisions about which tools best serve your family.
                </p>
                <p className="text-neutral-700 mb-4">
                  A <strong>will</strong> is a legal document that takes effect at your death. It directs how your assets should be distributed, names guardians for minor children, and appoints an executor to manage the process. Wills must go through probate—a court-supervised process that can take months or years.
                </p>
                <p className="text-neutral-700">
                  A <strong>trust</strong> is a legal entity that can hold assets during your lifetime and after death. Certain trusts avoid probate entirely, provide privacy, and offer sophisticated planning opportunities like tax reduction and asset protection. Many people benefit from having both.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">Who Needs These Documents?</h3>
                <div className="space-y-4">
                  {[
                    { who: 'Parents with minor children', why: 'Name guardians and protect their inheritance' },
                    { who: 'Homeowners', why: 'Avoid probate on real estate, simplify transfer' },
                    { who: 'Business owners', why: 'Ensure smooth succession, protect operations' },
                    { who: 'Blended families', why: 'Balance competing interests, prevent disputes' },
                    { who: 'Anyone over 18', why: 'At minimum, basic will and healthcare directives' },
                    { who: 'High-net-worth individuals', why: 'Maximize tax efficiency, protect wealth' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-secondary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <div>
                        <span className="font-medium text-neutral-900">{item.who}</span>
                        <p className="text-sm text-neutral-600">{item.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Will vs Trust Comparison */}
      <section id="comparison" className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Comparison</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              Will vs Trust: <span className="text-gradient">Key Differences</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Understanding how these documents compare helps you decide what is right for your situation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-50 to-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-neutral-900">Feature</th>
                    <th className="px-6 py-4 text-left font-semibold text-neutral-900">Will</th>
                    <th className="px-6 py-4 text-left font-semibold text-neutral-900">Revocable Living Trust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {trustVsWill.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-6 py-4 font-medium text-neutral-900">{row.feature}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.will}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.trust}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-neutral-600 mt-6"
          >
            Most comprehensive estate plans include both a will (for guardian nominations and as a safety net) and a trust (for probate avoidance and privacy).
          </motion.p>
        </div>
      </section>

      {/* Tabbed Content: Wills and Trusts Deep Dive */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Deep Dive</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              Understanding Your <span className="text-gradient">Options</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Explore the components of wills and the various types of trusts available.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-neutral-100 p-1">
              <button
                onClick={() => setActiveTab('wills')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'wills'
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Will Components
              </button>
              <button
                onClick={() => setActiveTab('trusts')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'trusts'
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Types of Trusts
              </button>
            </div>
          </div>

          {/* Will Components Content */}
          {activeTab === 'wills' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {willComponents.map((component, index) => (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-6 border border-neutral-200 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{component.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{component.description}</p>
                  <div className="space-y-3">
                    <div className="bg-primary-50 rounded-lg p-3">
                      <span className="text-xs font-medium text-primary-700 uppercase tracking-wider">Why It Matters</span>
                      <p className="text-sm text-primary-900 mt-1">{component.importance}</p>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-3">
                      <span className="text-xs font-medium text-secondary-700 uppercase tracking-wider">Pro Tip</span>
                      <p className="text-sm text-secondary-900 mt-1">{component.tip}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Trust Types Content */}
          {activeTab === 'trusts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {trustTypes.map((trust, index) => (
                <motion.div
                  key={trust.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 lg:p-8">
                    <div className="lg:flex lg:items-start lg:gap-8">
                      <div className="lg:flex-1">
                        <h3 className="text-2xl font-semibold text-neutral-900 mb-2">{trust.name}</h3>
                        <p className="text-neutral-600 mb-4">{trust.description}</p>
                        <div className="bg-primary-50 rounded-lg p-4 mb-4">
                          <span className="text-sm font-medium text-primary-700">Best For:</span>
                          <p className="text-primary-900">{trust.bestFor}</p>
                        </div>
                      </div>
                      <div className="lg:w-80 mt-6 lg:mt-0">
                        <h4 className="font-medium text-neutral-900 mb-3">Key Features</h4>
                        <ul className="space-y-2 mb-4">
                          {trust.keyFeatures.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                              <span className="text-sm text-neutral-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-neutral-100 rounded-lg p-3">
                          <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Considerations</span>
                          <p className="text-sm text-neutral-700 mt-1">{trust.considerations}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Funding Checklist */}
      <section className="section-padding bg-secondary-800 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white mb-4">
              Critical Step
            </span>
            <h2 className="heading-lg mb-4">
              Trust Funding Checklist
            </h2>
            <p className="text-lg text-secondary-200">
              An unfunded trust is like a safe with nothing inside. Ensure your trust is properly funded with these asset categories.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFundingChecklist.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-secondary-300 rounded flex-shrink-0" />
                      <span className="text-secondary-100 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-secondary-200 text-sm">
              Note: Some assets like retirement accounts and life insurance should NOT be titled in your trust—they use beneficiary designations instead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-neutral-50">
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
              Wills & Trusts <span className="text-gradient">FAQ</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Answers to the questions we hear most often about wills and trusts.
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
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors"
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
                    <div className="px-6 pb-5 border-t border-neutral-100">
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
              Ready to Create Your Will or Trust?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Let our experienced team help you choose the right documents for your situation and draft them with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/schedule"
                className="bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/services/estate-planning"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Learn About Estate Planning
              </Link>
            </div>
            <p className="text-primary-200 text-sm mt-8">
              Professional guidance ensures your documents work together as a cohesive plan.
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
                title: 'Tax Planning',
                description: 'Minimize estate, gift, and income taxes with smart planning strategies.',
                href: '/services/tax-planning'
              },
              {
                title: 'Probate Services',
                description: 'Compassionate guidance through the probate process and estate administration.',
                href: '/services/probate'
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

export default WillsTrustsPage
