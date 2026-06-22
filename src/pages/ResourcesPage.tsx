import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ResourcesPage = () => {
  const resourceCards = [
    {
      title: 'Free Downloads',
      description:
        'The Estate Planning Readiness Checklist, Document Inventory Worksheet, Family Meeting Discussion Guide, and our Questions to Ask Your Attorney guide.',
      cta: 'Get the guides',
      href: '/resources/checklist',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
    },
    {
      title: 'Partner Network',
      description:
        'Vetted, licensed estate planning attorneys we coordinate with. We connect families with the right professional for their situation.',
      cta: 'Meet the network',
      href: '/resources/partners',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
    {
      title: 'Recommended Tools',
      description:
        'Self-service platforms and tools we have personally vetted, with honest framing about when they fit — and when they do not. Includes affiliate links, plainly disclosed.',
      cta: 'See the tools',
      href: '/resources/recommended-tools',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
    },
  ]

  const existingResources = [
    {
      title: 'Guides Library',
      description: 'Downloadable PDF guides on wills, trusts, tax strategies, business succession, and more.',
      href: '/resources/guides',
      badge: 'Free Downloads',
    },
    {
      title: 'FAQ',
      description: 'Answers to the most common estate planning questions, organized by topic.',
      href: '/resources/faq',
      badge: 'Quick Reference',
    },
    {
      title: 'Planning Tools',
      description: 'Interactive calculators and worksheets to estimate estate tax exposure and map your plan.',
      href: '/resources/tools',
      badge: 'Interactive',
    },
    {
      title: 'Blog',
      description: 'Articles on estate planning law changes, family planning strategies, and practical advice.',
      href: '/resources/blog',
      badge: 'Articles',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white border-b border-primary-100 py-20">
        <div className="container-width">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4 block">
              Resources
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-900 leading-tight mb-6">
              Tools and guides for getting organized
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Everything here is built around the same idea: prepared families get better outcomes from every
              professional they engage. Start with the free downloads, and use the partner network when
              you are ready for licensed legal help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Resource Cards */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid md:grid-cols-3 gap-8">
            {resourceCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-700 mb-5">
                  {card.icon}
                </div>
                <h2 className="font-serif text-xl font-bold text-primary-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-neutral-600 text-sm leading-relaxed flex-grow mb-6">
                  {card.description}
                </p>
                <Link
                  to={card.href}
                  className="text-accent-700 hover:text-accent-600 font-semibold text-sm inline-flex items-center gap-1 transition-colors duration-200"
                >
                  {card.cta} &rarr;
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Resources */}
      <section className="section-padding bg-primary-50">
        <div className="container-width">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-3">
              More Resources
            </h2>
            <p className="text-neutral-600 max-w-2xl">
              Guides, tools, articles, and answers — all free, no account required.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {existingResources.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-xs font-semibold tracking-wide uppercase text-primary-600 bg-primary-100 px-2 py-1 rounded mb-3 self-start">
                  {item.badge}
                </span>
                <h3 className="font-serif font-bold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed flex-grow mb-4">
                  {item.description}
                </p>
                <Link
                  to={item.href}
                  className="text-accent-700 hover:text-accent-600 font-semibold text-sm inline-flex items-center gap-1 transition-colors duration-200 mt-auto"
                >
                  Explore &rarr;
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-900 py-16">
        <div className="container-width">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl font-bold text-white mb-4">
                Not sure where to start?
              </h2>
              <p className="text-primary-200 leading-relaxed">
                A Family Planning Conversation is a 90-minute structured session that orients your
                family on the process, identifies gaps, and produces a roadmap of the professionals
                you will need — before you spend a dollar on legal fees.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/services"
                className="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white hover:text-primary-900 transition-colors duration-200 text-center"
              >
                How it works
              </Link>
              <Link
                to="/schedule"
                className="bg-accent-500 hover:bg-accent-400 text-primary-950 font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 text-center"
              >
                Book a Family Planning Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ResourcesPage
