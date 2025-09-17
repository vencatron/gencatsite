import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ServicesPage = () => {
  const cards = [
    {
      title: 'Estate Planning',
      blurb: 'Tailored plans to protect your family, assets, and legacy.',
      href: '/services/estate-planning',
      image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80',
      icon: (
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
      features: ['Comprehensive strategies', 'Guardianship planning', 'Asset protection'],
      accent: 'from-primary-100 to-primary-50',
    },
    {
      title: 'Wills & Trusts',
      blurb: 'Professional drafting and administration with clear guidance.',
      href: '/services/wills-trusts',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
      icon: (
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
      features: ['Living trusts', 'Will updates', 'Trust administration'],
      accent: 'from-secondary-100 to-secondary-50',
    },
    {
      title: 'Tax Planning',
      blurb: 'Smart, proactive strategies to minimize estate tax exposure.',
      href: '/services/tax-planning',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      icon: (
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
      ),
      features: ['Charitable strategies', 'Wealth transfer', 'Generation-skipping trusts'],
      accent: 'from-accent-100 to-accent-50',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.main
      className="min-h-screen bg-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width py-16">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-primary mb-4">Our Services</span>
            <h1 className="heading-xl mb-4">
              Plan With Confidence. Protect What Matters.
            </h1>
            <p className="text-neutral-600 text-lg">
              Three core services designed to simplify decisions, reduce risk, and secure your family’s future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {cards.map((c) => (
              <motion.article
                key={c.title}
                variants={item}
                className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Subtle gradient header */}
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${c.accent} opacity-60 rounded-t-2xl pointer-events-none`} />

                <div className="relative z-10">
                  {c.image && (
                    <img
                      src={c.image}
                      alt={`${c.title} — family photo`}
                      loading="lazy"
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary-700 shadow-sm ring-1 ring-neutral-200">
                      {c.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-neutral-900">{c.title}</h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-5">{c.blurb}</p>
                  <ul className="space-y-2 mb-6">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-neutral-700">
                        <svg className="mt-0.5 h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Link to={c.href} className="btn-primary text-center">Learn More</Link>
                  <Link to="/schedule" className="btn-outline text-center">Schedule Consultation</Link>
                </div>

                {/* Decorative glow on hover */}
                <div className="pointer-events-none absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-primary-200/0 via-accent-200/0 to-primary-200/0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-width py-14">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">Not sure where to start?</h2>
            <p className="text-primary-100 mb-6">We’ll recommend the right service for your goals and timeline.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors">Book a Free Consultation</Link>
              <Link to="/resources" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Explore Resources</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}

export default ServicesPage
