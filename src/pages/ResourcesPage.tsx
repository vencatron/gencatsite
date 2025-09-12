import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ResourcesPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const faqCategories = [
    {
      title: 'Estate Planning Basics',
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
        }
      ]
    },
    {
      title: 'Wills and Trusts',
      faqs: [
        {
          question: 'What\'s the difference between a will and a trust?',
          answer: 'A will is a legal document that directs how your assets are distributed after death and goes through probate court. A trust is a legal entity that can hold assets during your lifetime and after death, often avoiding probate. Trusts can provide more privacy, faster distribution, and better control over asset distribution than wills alone.'
        },
        {
          question: 'Do I need a trust if I already have a will?',
          answer: 'It depends on your specific situation. While a will is essential for everyone, a trust might be beneficial if you have significant assets, minor children, want to avoid probate, have privacy concerns, or need specific control over asset distribution. Many comprehensive estate plans include both a will and one or more trusts.'
        },
        {
          question: 'What is a living trust vs. a testamentary trust?',
          answer: 'A living trust (or revocable trust) is created and funded during your lifetime, allowing you to manage assets while alive and distribute them after death without probate. A testamentary trust is created through your will and only comes into effect after death. Living trusts offer more flexibility and immediate benefits.'
        },
        {
          question: 'Can I change my will or trust after it\'s created?',
          answer: 'Yes, wills can be changed through amendments (codicils) or by creating a new will. Revocable trusts can be modified or revoked entirely during your lifetime as long as you\'re mentally competent. Irrevocable trusts are generally more difficult to change and may require court approval or beneficiary consent.'
        }
      ]
    },
    {
      title: 'Probate and Administration',
      faqs: [
        {
          question: 'What is probate and how long does it take?',
          answer: 'Probate is the court-supervised process of validating a will, paying debts, and distributing assets. In Oregon and Washington, probate typically takes 9-18 months but can take longer for complex estates. The process involves filing paperwork, notifying creditors and beneficiaries, and obtaining court approval for distributions.'
        },
        {
          question: 'How can I avoid probate?',
          answer: 'Common probate avoidance strategies include creating a revocable living trust, using joint ownership with rights of survivorship, designating beneficiaries on accounts and insurance policies, and using transfer-on-death (TOD) or payable-on-death (POD) designations. Each method has pros and cons that should be evaluated with an attorney.'
        },
        {
          question: 'What are the costs associated with probate?',
          answer: 'Probate costs typically include court fees, attorney fees, executor fees, appraisal costs, and accounting fees. Total costs usually range from 3-7% of the estate value. These costs vary by state and estate complexity. Creating a trust can often reduce or eliminate these costs.'
        },
        {
          question: 'Who can serve as executor of my estate?',
          answer: 'An executor should be someone you trust who is organized, responsible, and capable of handling financial matters. This can be a spouse, adult child, other family member, friend, or professional fiduciary. The person should be willing to serve and preferably live in the same state as you. You can also name co-executors or successor executors.'
        }
      ]
    },
    {
      title: 'Taxes and Financial Planning',
      faqs: [
        {
          question: 'Will my estate owe estate taxes?',
          answer: 'For 2024, the federal estate tax exemption is $13.61 million per person. Oregon has no state estate tax, but Washington has a state estate tax with a $2.193 million exemption. Most estates won\'t owe federal estate tax, but larger estates should plan for potential tax liability through various strategies.'
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
          answer: 'When you inherit assets, their tax basis is "stepped up" to fair market value at the time of death, potentially eliminating capital gains tax on appreciation that occurred during the deceased\'s lifetime. This makes it advantageous to hold appreciated assets until death rather than gifting them during lifetime in many cases.'
        }
      ]
    }
  ]

  const resources = [
    {
      title: 'Estate Planning Checklist',
      description: 'A comprehensive guide to creating your estate plan',
      type: 'PDF Guide',
      downloadUrl: '/resources/estate-planning-checklist.pdf',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    {
      title: 'Will vs Trust Comparison',
      description: 'Understand the differences and benefits of each',
      type: 'Interactive Guide',
      downloadUrl: '/resources/will-vs-trust-guide',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.41-1.41L15.5 16.75L11.91 20.34 10.5 18.93l1.41-1.41 2.59 2.58L19.91 15.75l1.41 1.41-6.32 6.32z"/>
        </svg>
      )
    },
    {
      title: 'Estate Tax Calculator',
      description: 'Estimate your potential estate tax liability',
      type: 'Calculator',
      downloadUrl: '/resources/estate-tax-calculator',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      )
    },
    {
      title: 'Document Storage Guide',
      description: 'Best practices for organizing important documents',
      type: 'PDF Guide',
      downloadUrl: '/resources/document-storage-guide.pdf',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
        </svg>
      )
    }
  ]

  const blogPosts = [
    {
      title: '2024 Estate Planning Changes: What You Need to Know',
      excerpt: 'Important updates to estate tax laws and planning strategies for the new year.',
      date: 'September 15, 2024',
      category: 'Tax Planning',
      readTime: '5 min read',
      slug: '2024-estate-planning-changes'
    },
    {
      title: 'Protecting Your Digital Assets in Your Estate Plan',
      excerpt: 'How to include cryptocurrency, online accounts, and digital files in your estate plan.',
      date: 'September 10, 2024',
      category: 'Estate Planning',
      readTime: '7 min read',
      slug: 'protecting-digital-assets'
    },
    {
      title: 'Planning for Blended Families: Special Considerations',
      excerpt: 'Estate planning strategies for families with children from previous relationships.',
      date: 'September 5, 2024',
      category: 'Family Planning',
      readTime: '6 min read',
      slug: 'blended-family-planning'
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
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">
              Free Resources
            </span>
            <h1 className="heading-xl mb-6">
              Estate Planning <span className="text-gradient">Resources</span> & FAQ
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Everything you need to know about estate planning, from basic concepts to advanced strategies. 
              Get answers to common questions and access our free planning tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Get answers to the most common estate planning questions from our experienced attorneys.
            </p>
          </motion.div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="bg-white rounded-2xl shadow-lg p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div
                        key={faqIndex}
                        className="border border-neutral-200 rounded-lg overflow-hidden"
                      >
                        <button
                          className="w-full px-6 py-4 text-left bg-white hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 transition-colors duration-200"
                          onClick={() => setActiveFaq(activeFaq === globalIndex ? null : globalIndex)}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-neutral-900 pr-4">
                              {faq.question}
                            </h4>
                            <svg
                              className={`w-5 h-5 text-neutral-500 transform transition-transform duration-200 ${
                                activeFaq === globalIndex ? 'rotate-180' : ''
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                            </svg>
                          </div>
                        </button>
                        {activeFaq === globalIndex && (
                          <div className="px-6 pb-4 border-t border-neutral-100 bg-neutral-50">
                            <p className="text-neutral-700 leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              Free Estate Planning <span className="text-gradient">Tools</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Download our comprehensive guides and use our planning tools to get started with your estate plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                className="card card-hover text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {resource.icon}
                </div>
                <span className="badge-secondary mb-3">
                  {resource.type}
                </span>
                <h3 className="font-semibold text-neutral-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-6">
                  {resource.description}
                </p>
                <a
                  href={resource.downloadUrl}
                  className="btn-primary text-sm"
                  download
                >
                  Download Free
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              Latest <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Stay informed with our latest insights on estate planning, tax law changes, and family protection strategies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                className="card card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-primary">
                    {post.category}
                  </span>
                  <span className="text-neutral-500 text-sm">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-neutral-900 mb-3 text-lg">
                  {post.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 text-xs">
                    {post.date}
                  </span>
                  <Link
                    to={`/resources/blog/${post.slug}`}
                    className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <Link to="/resources/blog" className="btn-outline">
              View All Articles
            </Link>
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
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Our experienced estate planning attorneys are here to provide personalized guidance 
              for your unique situation. Schedule your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                Schedule Free Consultation
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

export default ResourcesPage