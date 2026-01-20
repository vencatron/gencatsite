import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const EstatePlanningPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const components = [
    {
      title: 'Revocable Living Trust',
      description:
        'A flexible foundation that allows you to manage assets during your lifetime and transfer them seamlessly to beneficiaries without probate. You maintain full control and can modify terms as circumstances change.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'Pour-Over Will',
      description:
        'Works alongside your trust to "catch" any assets not transferred during your lifetime. Ensures everything ends up in the right place, even if you acquire new property or accounts.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'Durable Power of Attorney',
      description:
        'Designates someone you trust to handle financial matters if you become incapacitated. "Durable" means it remains valid even if you lose mental capacity—critical for avoiding court intervention.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: 'Healthcare Directive',
      description:
        'Specifies your medical treatment preferences and appoints a healthcare agent to make decisions on your behalf. Includes living will provisions for end-of-life care.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Beneficiary Designations',
      description:
        'Coordinates retirement accounts, life insurance, and payable-on-death accounts with your overall plan. These designations override your will, so alignment is essential.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Asset Protection Planning',
      description:
        'Structures ownership to shield assets from creditors, lawsuits, and unexpected claims while maintaining legitimate access for you and your family.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description:
        'We learn about your family, assets, goals, and concerns. This conversation shapes every recommendation that follows.',
    },
    {
      step: '02',
      title: 'Strategy Design',
      description:
        'We present options tailored to your situation—explaining trade-offs in plain language so you can make informed decisions.',
    },
    {
      step: '03',
      title: 'Document Drafting',
      description:
        'Our attorneys prepare your documents with precision, ensuring legal compliance and alignment with your stated wishes.',
    },
    {
      step: '04',
      title: 'Signing & Funding',
      description:
        'We guide you through proper execution and help transfer assets into your trust—the step most often overlooked.',
    },
    {
      step: '05',
      title: 'Ongoing Review',
      description:
        'Life changes. We recommend reviewing your plan every 3-5 years or after major events like marriage, divorce, or new grandchildren.',
    },
  ]

  const faqs = [
    {
      question: 'What is the difference between a will and a trust?',
      answer:
        'A will takes effect only after death and must go through probate—a public court process that can take months. A trust is effective immediately, avoids probate, keeps your affairs private, and allows for incapacity planning. Most comprehensive estate plans include both: a trust as the primary vehicle and a pour-over will as a backup.',
    },
    {
      question: 'Do I need an estate plan if I am not wealthy?',
      answer:
        'Yes. Estate planning is not just about money—it is about control. Without a plan, state law decides who raises your children, who manages your finances if you are incapacitated, and who inherits your belongings. A basic plan ensures your wishes are followed and can prevent family conflict.',
    },
    {
      question: 'How often should I update my estate plan?',
      answer:
        'Review your plan every 3-5 years or whenever you experience a major life change: marriage, divorce, birth of a child, death in the family, significant change in assets, or moving to a new state. Laws change too, so periodic review keeps your plan current.',
    },
    {
      question: 'What happens if I die without an estate plan?',
      answer:
        'Your state\'s "intestacy" laws determine who inherits your assets—typically your spouse and children in fixed proportions that may not match your wishes. A court appoints someone to manage your estate, and if you have minor children, a judge decides their guardian. The process is public, often slow, and more expensive.',
    },
    {
      question: 'Can I create my own estate plan using online forms?',
      answer:
        'While DIY templates exist, they rarely account for state-specific requirements, tax implications, or complex family situations. Errors in execution can invalidate documents entirely. Professional guidance ensures your plan actually works when needed and coordinates all pieces—trust, will, beneficiary designations, and titles—into a cohesive whole.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[50vh] w-full overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-[50vh] items-center">
          <div className="container-width py-16">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100"
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
                Estate Planning
              </motion.h1>
              <motion.p
                className="mb-8 text-lg text-primary-100 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A comprehensive approach to protecting your assets, providing for your loved ones, and ensuring your wishes are honored—during your lifetime and beyond.
              </motion.p>
              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link
                  to="/schedule"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
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

      {/* What Is Estate Planning */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mx-auto max-w-3xl" {...fadeInUp}>
            <h2 className="mb-6 text-3xl font-bold text-gradient sm:text-4xl">
              What Is Estate Planning?
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p className="text-lg leading-relaxed">
                Estate planning is the process of arranging for the management and transfer of your assets during your lifetime and after death. But it is far more than a set of legal documents—it is a framework for protecting the people and causes you care about most.
              </p>
              <p className="leading-relaxed">
                A well-crafted estate plan answers critical questions: Who will make medical decisions if you cannot? Who manages your finances during incapacity? How will your assets pass to your children—outright or in trust? What happens to your business? How can you minimize taxes and avoid probate?
              </p>
              <p className="leading-relaxed">
                Without clear answers, these decisions fall to courts, state laws, and sometimes family members in conflict. Estate planning puts you in control.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Components */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Key Components of an Estate Plan
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Each piece serves a specific purpose. Together, they form a coordinated system that works in any scenario.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component, index) => (
              <motion.div
                key={component.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  {component.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  {component.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {component.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Our Estate Planning Process
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              We guide you through each step with clarity, ensuring you understand your options and feel confident in your decisions.
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
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Timeline line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-14 h-full w-px bg-primary-200" />
                )}
                {/* Step number */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                  {step.step}
                </div>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs Estate Planning */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeInUp}>
              <h2 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
                Who Needs Estate Planning?
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  The short answer: everyone with assets, dependents, or specific wishes about their care. The complexity of your plan scales with your situation, but the need is universal.
                </p>
                <p>
                  <strong className="text-neutral-900">Parents with minor children</strong> need guardianship designations and trusts to ensure their children are raised and supported according to their values.
                </p>
                <p>
                  <strong className="text-neutral-900">Business owners</strong> require succession planning to protect both the business and their family from disruption.
                </p>
                <p>
                  <strong className="text-neutral-900">Blended families</strong> face unique challenges balancing obligations to current spouses and children from prior relationships.
                </p>
                <p>
                  <strong className="text-neutral-900">High-net-worth individuals</strong> benefit from advanced strategies that minimize estate taxes and preserve wealth across generations.
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
                { label: 'Families with Children', stat: 'Guardianship + Trust' },
                { label: 'Business Owners', stat: 'Succession Planning' },
                { label: 'Retirees', stat: 'Asset Protection' },
                { label: 'Blended Families', stat: 'Custom Provisions' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-1 text-sm font-medium text-primary-600">
                    {item.stat}
                  </div>
                  <div className="text-lg font-semibold text-neutral-900">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
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
              Clear answers to common questions about estate planning.
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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-width py-16">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Protect Your Legacy?
            </h2>
            <p className="mb-8 text-lg text-primary-100">
              Schedule a consultation to discuss your goals and learn how a customized estate plan can provide peace of mind for you and your family.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                Schedule Free Consultation
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default EstatePlanningPage
