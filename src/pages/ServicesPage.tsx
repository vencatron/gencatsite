import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ServicesPage = () => {
  const services = [
    {
      title: 'Estate Planning',
      description: 'Comprehensive estate planning strategies tailored to your needs.',
    },
    {
      title: 'Will & Trust Services',
      description: 'Professional will and trust preparation and management.',
    },
    {
      title: 'Probate Services',
      description: 'Expert guidance through the probate process.',
    },
    {
      title: 'Tax Planning',
      description: 'Strategic tax planning to minimize estate tax burden.',
    },
  ]

  const icons = [
    (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
    (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
    (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
  ]

  const images = [
    { src: '/images/service-estate.svg', alt: 'Estate planning illustration' },
    { src: '/images/service-wills.svg', alt: 'Wills and trusts illustration' },
    { src: '/images/service-probate.svg', alt: 'Probate illustration' },
    { src: '/images/service-tax.svg', alt: 'Tax planning illustration' },
  ]

  const paths = ['/services/estate-planning', '/services/wills-trusts', '/services/probate', '/services/tax-planning']

  return (
    <motion.main
      className="min-h-screen bg-white py-16 px-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-primary-800">Our Services</h1>
          <p className="mt-3 text-neutral-700">Four core offerings to protect your assets, simplify processes, and preserve your legacy.</p>
        </header>

        <motion.section
          className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800"
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={paths[index] ?? '/services'} className="absolute inset-0" aria-label={`Learn more about ${service.title}`}></Link>
              {/* Hover image overlay */}
              <img
                src={images[index]?.src ?? '/images/service-estate.svg'}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -bottom-10 w-64 opacity-0 blur-[0px] transition-all duration-300 ease-out group-hover:opacity-90 group-hover:translate-y-[-6px] group-hover:scale-105"
              />
              <div className="mb-4 flex items-center gap-3 text-primary-600">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-100 text-primary-700">
                  {icons[index]}
                </div>
                <h3 className="text-xl font-semibold text-primary-800">
                  {service.title}
                </h3>
              </div>
              <p className="text-neutral-700">
                {service.description}
              </p>
              <div className="mt-5 text-sm font-medium text-primary-700">Learn more →</div>

              {/* Accent underlay on hover - subtle */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary-200/50 via-accent-200/50 to-primary-200/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.article>
          ))}
        </motion.section>
      </div>
    </motion.main>
  )
}

export default ServicesPage
