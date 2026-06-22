import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    title: 'Family Planning Conversation',
    tagline: 'Get oriented before you engage anyone else.',
    slug: '/services/family-conversation',
  },
  {
    title: 'Trust Funding & Implementation',
    tagline:
      'Your attorney designed the plan. We make sure it gets connected to your assets.',
    slug: '/services/trust-funding',
  },
  {
    title: 'Ongoing Tax & Administration',
    tagline:
      'The annual tax discipline that keeps an estate plan working.',
    slug: '/services/tax-administration',
  },
  {
    title: 'Strategic Engagement',
    tagline:
      'Full-spectrum coordination for business owners and complex estates.',
    slug: '/services/strategic',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const Services = () => {
  return (
    <section className="py-20 lg:py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-3">What we do</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Four ways we help families navigate estate planning
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            We educate, analyze, coordinate, and project-manage. Your attorney handles
            the legal documents and legal advice — we make sure everything around them
            actually works.
          </p>
        </motion.div>

        {/* Service cards: 2×2 grid */}
        <motion.div
          className="grid sm:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              className="card card-hover group flex flex-col"
              variants={cardVariants}
            >
              {/* Title */}
              <div className="mb-3">
                <h3 className="font-serif text-xl font-semibold text-primary-900 leading-snug">
                  {service.title}
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                {service.tagline}
              </p>

              {/* Learn more link */}
              <div className="mt-5 pt-4 border-t border-neutral-100">
                <Link
                  to={service.slug}
                  className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-150 inline-flex items-center gap-1 group-hover:gap-2"
                >
                  Learn more
                  <span aria-hidden="true" className="transition-all duration-150">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/services" className="btn-outline inline-block">
            View all services
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default Services
