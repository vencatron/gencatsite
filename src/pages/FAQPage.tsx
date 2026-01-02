import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const FAQPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const faqCategories = [
    {
      title: 'Estate Planning Basics',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      faqs: [
        {
          question: 'What is estate planning and why do I need it?',
          answer: 'Estate planning is the process of arranging for the management and disposal of your estate during your life and after death. It includes creating legal documents like wills, trusts, and powers of attorney to ensure your assets are distributed according to your wishes and your loved ones are protected. Everyone over 18 should have basic estate planning documents, regardless of the size of their estate.'
        },
        {
          question: 'At what age should I start estate planning?',
          answer: 'You should start estate planning as soon as you reach the age of majority (18 in most states). Major life events like marriage, having children, buying a home, or starting a business are all good triggers to create or update your estate plan.'
        },
        {
          question: 'How often should I update my estate plan?',
          answer: 'You should review your estate plan every 3-5 years or after major life changes such as marriage, divorce, birth of children, death of beneficiaries, significant changes in assets, or relocation to another state. Tax law changes may also require updates to your plan.'
        },
        {
          question: 'What happens if I die without an estate plan?',
          answer: 'If you die without an estate plan (intestate), your assets will be distributed according to your state\'s intestacy laws. This process is typically slower, more expensive, and may not reflect your wishes. The court will appoint an administrator and distribute assets based on a predetermined formula that may not align with your preferences.'
        },
        {
          question: 'What documents are included in a basic estate plan?',
          answer: 'A basic estate plan typically includes: a Last Will and Testament, a Revocable Living Trust (optional but recommended), a Durable Power of Attorney for finances, an Advance Healthcare Directive (living will and healthcare power of attorney), and HIPAA authorization forms. Depending on your situation, you may also need additional documents like a pour-over will or guardianship nominations.'
        },
        {
          question: 'How long does it take to create an estate plan?',
          answer: 'The timeline varies depending on the complexity of your situation. A basic estate plan can typically be completed in 2-4 weeks, while more complex plans involving business interests, multiple trusts, or tax planning strategies may take 4-8 weeks or longer. The initial consultation usually takes 1-2 hours.'
        }
      ]
    },
    {
      title: 'Wills and Trusts',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      faqs: [
        {
          question: 'What is the difference between a will and a trust?',
          answer: 'A will is a legal document that directs how your assets are distributed after death and must go through the court system. A trust is a legal entity that can hold assets during your lifetime and after death, often avoiding court involvement. Trusts can provide more privacy, faster distribution, and better control over asset distribution than wills alone.'
        },
        {
          question: 'Do I need a trust if I already have a will?',
          answer: 'It depends on your specific situation. While a will is essential for everyone, a trust might be beneficial if you have significant assets, minor children, want to avoid court proceedings, have privacy concerns, or need specific control over asset distribution. Many comprehensive estate plans include both a will and one or more trusts.'
        },
        {
          question: 'What is a living trust vs. a testamentary trust?',
          answer: 'A living trust (or revocable trust) is created and funded during your lifetime, allowing you to manage assets while alive and distribute them after death without court involvement. A testamentary trust is created through your will and only comes into effect after death. Living trusts offer more flexibility and immediate benefits.'
        },
        {
          question: 'Can I change my will or trust after it is created?',
          answer: 'Yes, wills can be changed through amendments (codicils) or by creating a new will. Revocable trusts can be modified or revoked entirely during your lifetime as long as you are mentally competent. Irrevocable trusts are generally more difficult to change and may require court approval or beneficiary consent.'
        },
        {
          question: 'What is a pour-over will?',
          answer: 'A pour-over will is used in conjunction with a revocable living trust. It directs that any assets not already in your trust at death should be "poured over" into the trust. This ensures that all assets ultimately pass through your trust and are distributed according to its terms, even if you forgot to transfer some assets during your lifetime.'
        },
        {
          question: 'What types of trusts are available?',
          answer: 'Common types include revocable living trusts, irrevocable trusts, special needs trusts, charitable remainder trusts, qualified personal residence trusts (QPRTs), grantor retained annuity trusts (GRATs), and irrevocable life insurance trusts (ILITs). Each serves different purposes depending on your goals for asset protection, tax planning, and beneficiary needs.'
        }
      ]
    },
    {
      title: 'Probate and Administration',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      ),
      faqs: [
        {
          question: 'What is probate and how long does it take?',
          answer: 'Probate is the court-supervised process of validating a will, paying debts, and distributing assets. In California, probate typically takes 9-18 months but can take longer for complex estates. The process involves filing paperwork, notifying creditors and beneficiaries, and obtaining court approval for distributions.'
        },
        {
          question: 'How can I avoid probate?',
          answer: 'Common probate avoidance strategies include creating a revocable living trust, using joint ownership with rights of survivorship, designating beneficiaries on accounts and insurance policies, and using transfer-on-death (TOD) or payable-on-death (POD) designations. Each method has pros and cons that should be evaluated with a specialist.'
        },
        {
          question: 'What are the costs associated with probate?',
          answer: 'Probate costs typically include court fees, attorney fees, executor fees, appraisal costs, and accounting fees. Total costs usually range from 3-7% of the estate value. These costs vary by state and estate complexity. Creating a trust can often reduce or eliminate these costs.'
        },
        {
          question: 'Who can serve as executor of my estate?',
          answer: 'An executor should be someone you trust who is organized, responsible, and capable of handling financial matters. This can be a spouse, adult child, other family member, friend, or professional fiduciary. The person should be willing to serve and preferably live in the same state as you. You can also name co-executors or successor executors.'
        },
        {
          question: 'What are the executor responsibilities?',
          answer: 'The executor is responsible for: locating and filing the will with the probate court, inventorying assets, notifying creditors and beneficiaries, paying debts and taxes, managing estate assets during probate, filing final tax returns, and distributing assets according to the will. This can be a time-consuming responsibility.'
        },
        {
          question: 'What is a small estate affidavit?',
          answer: 'A small estate affidavit allows heirs to claim assets from small estates without formal probate. In California, this is available for estates valued at $184,500 or less (as of 2024). This simplified process can save significant time and money compared to full probate proceedings.'
        }
      ]
    },
    {
      title: 'Taxes and Financial Planning',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      faqs: [
        {
          question: 'Will my estate owe estate taxes?',
          answer: 'For 2024, the federal estate tax exemption is $13.61 million per person. California has no state estate tax, which is an advantage for estate planning. Most estates will not owe federal estate tax, but larger estates should plan for potential tax liability through various strategies.'
        },
        {
          question: 'What is the gift tax and how does it work?',
          answer: 'The gift tax applies to transfers of money or property to others without receiving full value in return. For 2024, you can give up to $18,000 per person per year without filing a gift tax return. Gifts above this amount count against your lifetime exemption. Certain gifts, like those to spouses or charities, are unlimited.'
        },
        {
          question: 'How can I minimize estate taxes?',
          answer: 'Tax minimization strategies include annual gifting, charitable giving, irrevocable life insurance trusts (ILITs), grantor retained annuity trusts (GRATs), family limited partnerships, and generation-skipping trusts. The best strategy depends on your estate size, family situation, and goals. Professional guidance is essential for tax planning.'
        },
        {
          question: 'What is the step-up in basis for inherited assets?',
          answer: 'When you inherit assets, their tax basis is "stepped up" to fair market value at the time of death, potentially eliminating capital gains tax on appreciation that occurred during the deceased lifetime. This makes it advantageous to hold appreciated assets until death rather than gifting them during lifetime in many cases.'
        },
        {
          question: 'What is generation-skipping transfer tax?',
          answer: 'The generation-skipping transfer (GST) tax applies to transfers to grandchildren or others more than one generation below you. This tax exists to prevent families from avoiding estate tax by skipping a generation. The GST exemption matches the estate tax exemption ($13.61 million in 2024).'
        },
        {
          question: 'How does life insurance factor into estate planning?',
          answer: 'Life insurance proceeds are generally income tax-free to beneficiaries but are included in your taxable estate. Using an irrevocable life insurance trust (ILIT) can remove life insurance from your estate, potentially saving significant estate taxes. Life insurance can also provide liquidity to pay estate taxes without forcing the sale of other assets.'
        }
      ]
    },
    {
      title: 'Powers of Attorney and Healthcare',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
        </svg>
      ),
      faqs: [
        {
          question: 'What is a durable power of attorney?',
          answer: 'A durable power of attorney is a legal document that allows you to appoint someone (your agent) to make financial decisions on your behalf. "Durable" means it remains effective even if you become incapacitated. This is essential for managing your affairs if you cannot do so yourself.'
        },
        {
          question: 'What is an advance healthcare directive?',
          answer: 'An advance healthcare directive (also called a living will) documents your wishes for medical care if you cannot communicate them yourself. It typically includes your preferences for life-sustaining treatment and appoints a healthcare agent to make decisions on your behalf.'
        },
        {
          question: 'Who should I name as my agent?',
          answer: 'Choose someone you trust completely who understands your values and wishes. This person should be willing and able to serve, available when needed, and comfortable making difficult decisions. You can name different people for financial and healthcare matters. Always name successor agents in case your first choice cannot serve.'
        },
        {
          question: 'What is a HIPAA authorization?',
          answer: 'A HIPAA authorization allows designated individuals to access your protected health information. This is separate from your healthcare directive and ensures your family members or agents can communicate with your doctors and access your medical records when needed.'
        },
        {
          question: 'When does a power of attorney take effect?',
          answer: 'This depends on how the document is drafted. A "springing" power of attorney takes effect only when you become incapacitated, while an "immediate" power of attorney is effective as soon as it is signed. Most estate planners recommend immediate powers of attorney for convenience, with trusted agents.'
        }
      ]
    },
    {
      title: 'Special Situations',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      faqs: [
        {
          question: 'How do I plan for minor children?',
          answer: 'Planning for minor children includes naming guardians in your will, establishing trusts for their inheritance, designating trustees to manage assets, and specifying age milestones for distributions. You should also consider life insurance to provide for their needs and name custodians for any accounts.'
        },
        {
          question: 'What is a special needs trust?',
          answer: 'A special needs trust (also called a supplemental needs trust) is designed to provide for a beneficiary with disabilities without disqualifying them from government benefits like SSI or Medicaid. These trusts can fund quality-of-life expenses not covered by government programs.'
        },
        {
          question: 'How do I plan for a blended family?',
          answer: 'Blended family planning requires careful consideration of competing interests. Strategies may include QTIP trusts to provide for a surviving spouse while preserving assets for children from a prior relationship, separate trusts for different family lines, or prenuptial agreements.'
        },
        {
          question: 'What if I own property in multiple states?',
          answer: 'Owning property in multiple states can require ancillary probate proceedings in each state. A revocable living trust can avoid this by holding title to real property. You should also consider each state tax implications and work with attorneys familiar with the laws in each jurisdiction.'
        },
        {
          question: 'How do I include digital assets in my estate plan?',
          answer: 'Digital assets include online accounts, cryptocurrency, digital photos, and intellectual property. Create an inventory of your digital assets, include provisions in your estate plan for their management and distribution, and provide secure access to passwords or recovery keys. Some states have adopted the Uniform Fiduciary Access to Digital Assets Act.'
        },
        {
          question: 'What is charitable planning?',
          answer: 'Charitable planning includes strategies to benefit charities while providing tax benefits. Options include charitable remainder trusts, charitable lead trusts, donor-advised funds, and private foundations. These can reduce income, gift, and estate taxes while supporting causes you care about.'
        }
      ]
    }
  ]

  const allCategories = ['All', ...faqCategories.map(cat => cat.title)]

  const filteredFaqCategories = useMemo(() => {
    return faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => {
      const matchesCategory = !activeCategory || activeCategory === 'All' || category.title === activeCategory
      return matchesCategory && category.faqs.length > 0
    })
  }, [searchQuery, activeCategory])

  const totalFaqs = filteredFaqCategories.reduce((sum, cat) => sum + cat.faqs.length, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">
              Get Answers
            </span>
            <h1 className="heading-xl mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Find answers to common estate planning questions. Our comprehensive FAQ covers
              everything from basic concepts to advanced strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category === 'All' ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    (category === 'All' && !activeCategory) || activeCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center lg:text-left">
            <p className="text-neutral-500 text-sm">
              Showing {totalFaqs} question{totalFaqs !== 1 ? 's' : ''}
              {activeCategory && activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-width">
          {filteredFaqCategories.length > 0 ? (
            <div className="space-y-8">
              {filteredFaqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-8 py-6 border-b border-neutral-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-neutral-900">
                          {category.title}
                        </h2>
                        <p className="text-neutral-500 text-sm">
                          {category.faqs.length} question{category.faqs.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex
                        return (
                          <div
                            key={faqIndex}
                            className="border border-neutral-200 rounded-lg overflow-hidden"
                          >
                            <button
                              className="w-full px-6 py-4 text-left bg-white hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 transition-colors duration-200"
                              onClick={() => setActiveFaq(activeFaq === globalIndex ? null : globalIndex)}
                              aria-expanded={activeFaq === globalIndex}
                            >
                              <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-neutral-900 pr-4">
                                  {faq.question}
                                </h3>
                                <svg
                                  className={`w-5 h-5 text-neutral-500 transform transition-transform duration-200 flex-shrink-0 ${
                                    activeFaq === globalIndex ? 'rotate-180' : ''
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                </svg>
                              </div>
                            </button>
                            <motion.div
                              initial={false}
                              animate={{
                                height: activeFaq === globalIndex ? 'auto' : 0,
                                opacity: activeFaq === globalIndex ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-4 border-t border-neutral-100 bg-neutral-50">
                                <p className="text-neutral-700 leading-relaxed pt-4">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-20 h-20 text-neutral-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">No questions found</h3>
              <p className="text-neutral-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory(null)
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="heading-md mb-4">
              Did not Find Your Answer?
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Our experienced estate planning specialists are here to answer your specific questions
              and provide personalized guidance for your unique situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link to="/schedule" className="btn-outline">
                Schedule a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Estate Plan?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Understanding estate planning is the first step. Let our experienced specialists
              help you create a comprehensive plan tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                Schedule a Consultation
              </Link>
              <a href="tel:(555)123-4567" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                Call (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default FAQPage
