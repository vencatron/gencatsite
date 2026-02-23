import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const EstatePlanningPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const planningSteps = [
    {
      step: '01',
      title: 'Discovery Consultation',
      description: 'We begin with a comprehensive conversation about your family, assets, goals, and concerns. This helps us understand your unique situation and priorities.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Strategy Design',
      description: 'Based on your needs, we develop a customized plan that addresses asset protection, family dynamics, tax considerations, and long-term goals.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Document Preparation',
      description: 'Our team drafts all necessary legal documents, including wills, trusts, powers of attorney, and healthcare directives tailored to your situation.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Implementation & Review',
      description: 'We guide you through signing, funding trusts, and updating beneficiaries. Regular reviews ensure your plan stays current with life changes.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      )
    }
  ]

  const keyComponents = [
    {
      title: 'Revocable Living Trust',
      description: 'A flexible trust that allows you to maintain control of assets during your lifetime while avoiding probate and ensuring smooth asset transfer.',
      benefits: ['Avoids lengthy probate process', 'Maintains privacy of asset distribution', 'Allows for incapacity planning', 'Can be modified as circumstances change']
    },
    {
      title: 'Last Will and Testament',
      description: 'A foundational document that names guardians for minor children, specifies asset distribution, and appoints an executor for your estate.',
      benefits: ['Names guardians for children', 'Directs asset distribution', 'Appoints trusted executor', 'Provides clear instructions']
    },
    {
      title: 'Powers of Attorney',
      description: 'Legal documents that designate trusted individuals to make financial and legal decisions on your behalf if you become incapacitated.',
      benefits: ['Ensures bills get paid', 'Allows business continuity', 'Prevents court intervention', 'Protects your interests']
    },
    {
      title: 'Healthcare Directives',
      description: 'Documents including living wills and healthcare powers of attorney that communicate your medical wishes and designate decision-makers.',
      benefits: ['Expresses end-of-life wishes', 'Designates healthcare agent', 'Reduces family burden', 'Ensures wishes are followed']
    }
  ]

  const faqs = [
    {
      question: 'How is estate planning different from just having a will?',
      answer: 'While a will is an important component, comprehensive estate planning goes much further. It includes strategies for asset protection, incapacity planning, minimizing taxes, avoiding probate, and ensuring your wishes are carried out efficiently. A complete estate plan typically includes trusts, powers of attorney, healthcare directives, and beneficiary designations working together as a coordinated system.'
    },
    {
      question: 'When should I start estate planning?',
      answer: 'The best time to start estate planning is now, regardless of age or wealth. Major life events like marriage, having children, buying property, or starting a business are particularly important triggers. Young adults should at minimum have healthcare directives and powers of attorney in place, as accidents and illnesses can happen at any age.'
    },
    {
      question: 'How much does estate planning cost?',
      answer: 'Costs vary based on complexity. A basic plan for a single person or couple might range from $1,500 to $3,500, while plans involving business interests, multiple properties, or complex family situations may cost more. However, proper planning typically saves families significantly more in probate costs, taxes, and legal fees down the road.'
    },
    {
      question: 'What happens to my plan if I move to another state?',
      answer: 'Estate planning documents are generally valid across states, but laws vary significantly. If you relocate, we recommend having your plan reviewed to ensure it complies with your new state laws and takes advantage of any favorable provisions. California, for example, has specific requirements for certain documents.'
    },
    {
      question: 'How often should I update my estate plan?',
      answer: 'Review your plan every 3-5 years or whenever significant life changes occur: marriage, divorce, birth of children or grandchildren, death of beneficiaries, substantial changes in assets, changes in tax laws, or changes in health. Even if nothing has changed, periodic reviews ensure everything remains current.'
    },
    {
      question: 'Can I do estate planning myself with online forms?',
      answer: 'While online forms exist, estate planning involves complex legal and tax considerations that vary by state and individual circumstances. DIY documents often contain errors, omit important provisions, or fail to address unique situations. The cost of fixing improperly drafted documents—or dealing with their consequences—typically far exceeds professional planning fees.'
    }
  ]

  const commonMistakes = [
    {
      mistake: 'Procrastinating',
      consequence: 'Unexpected events can happen at any time, leaving families without guidance or protection.',
      solution: 'Start with basic documents and build from there as your situation evolves.'
    },
    {
      mistake: 'Not Funding Trusts',
      consequence: 'An unfunded trust provides no probate avoidance—assets must be properly titled.',
      solution: 'Work with your advisor to transfer assets and update beneficiary designations.'
    },
    {
      mistake: 'Outdated Beneficiary Designations',
      consequence: 'Old beneficiaries on accounts override your will, causing unintended distributions.',
      solution: 'Review and update beneficiaries on all accounts annually.'
    },
    {
      mistake: 'One-Size-Fits-All Approach',
      consequence: 'Generic plans miss opportunities for tax savings and asset protection.',
      solution: 'Work with qualified professionals who understand your unique situation.'
    }
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
            backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/70 to-primary-900/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-width">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm mb-6">
                Comprehensive Planning
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Estate Planning That <span className="text-primary-300">Protects</span> What Matters Most
              </h1>
              <p className="text-lg sm:text-xl text-neutral-200 mb-8 leading-relaxed">
                Create a comprehensive plan that protects your assets, provides for your loved ones, and ensures your wishes are honored for generations to come.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/schedule" className="btn-primary text-center">
                  Schedule Free Consultation
                </Link>
                <a href="#learn-more" className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 text-center">
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Estate Planning Section */}
      <section id="learn-more" className="section-padding bg-white">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-primary mb-4">Understanding Estate Planning</span>
              <h2 className="heading-lg text-neutral-900 mb-6">
                What Is <span className="text-gradient">Estate Planning</span>?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-neutral-700 mb-4">
                  Estate planning is the process of arranging for the management and transfer of your assets during your lifetime and after death. It encompasses far more than simply writing a will—it is a comprehensive approach to protecting everything you have worked to build.
                </p>
                <p className="text-neutral-700 mb-4">
                  A well-crafted estate plan addresses critical questions: Who will care for your children if something happens to you? How can you minimize taxes on your estate? Who will make medical decisions if you cannot? How can you protect assets from creditors or ensure a beneficiary with special needs remains eligible for government benefits?
                </p>
                <p className="text-neutral-700">
                  At Generation Catalyst, we believe estate planning is not just for the wealthy. Everyone over 18 should have basic planning documents in place. Our approach focuses on understanding your unique goals and crafting solutions that give you peace of mind.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">Why Estate Planning Matters</h3>
                <ul className="space-y-4">
                  {[
                    'Protect your family from unnecessary legal battles',
                    'Minimize estate taxes and maximize inheritance',
                    'Ensure your children are cared for by people you trust',
                    'Keep your healthcare wishes clear and documented',
                    'Avoid the costly and public probate process',
                    'Protect assets from creditors and lawsuits',
                    'Plan for potential incapacity during your lifetime',
                    'Leave a lasting legacy aligned with your values'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Our Process</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              How We Create Your <span className="text-gradient">Estate Plan</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Our structured approach ensures nothing is overlooked while making the process as simple as possible for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {planningSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                      {step.icon}
                    </div>
                    <span className="text-4xl font-bold text-primary-200">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
                {index < planningSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Components Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">What is Included</span>
            <h2 className="heading-lg text-neutral-900 mb-4">
              Key Components of Your <span className="text-gradient">Estate Plan</span>
            </h2>
            <p className="text-lg text-neutral-600">
              A comprehensive estate plan includes several interconnected documents that work together to protect you and your family.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {keyComponents.map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-200 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">{component.title}</h3>
                <p className="text-neutral-600 mb-6">{component.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {component.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span className="text-sm text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="section-padding bg-primary-800 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white mb-4">
              Avoid These Pitfalls
            </span>
            <h2 className="heading-lg mb-4">
              Common Estate Planning Mistakes
            </h2>
            <p className="text-lg text-primary-100">
              Understanding these common pitfalls can help you make better decisions for your family.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonMistakes.map((item, index) => (
              <motion.div
                key={item.mistake}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.mistake}</h3>
                <p className="text-primary-200 text-sm mb-4">{item.consequence}</p>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs uppercase tracking-wider text-primary-300">Solution</span>
                  <p className="text-sm text-white mt-1">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Estate Planning <span className="text-gradient">FAQ</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Answers to the most common questions we receive about estate planning.
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
              Ready to Protect Your Family's Future?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Take the first step toward peace of mind. Schedule a free consultation to discuss your estate planning needs with our experienced team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/schedule"
                className="bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                Schedule Free Consultation
              </Link>
              <Link
                to="/resources/faq"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                View All FAQs
              </Link>
            </div>
            <p className="text-primary-200 text-sm mt-8">
              No obligation. No pressure. Just straightforward guidance for your family.
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
                title: 'Wills & Trusts',
                description: 'Professional drafting and administration of wills and trusts tailored to your needs.',
                href: '/services/wills-trusts'
              },
              {
                title: 'Tax Planning',
                description: 'Strategic planning to minimize estate, gift, and income tax exposure.',
                href: '/services/tax-planning'
              },
              {
                title: 'Asset Protection',
                description: 'Strategies to protect your wealth from creditors and lawsuits.',
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

export default EstatePlanningPage
