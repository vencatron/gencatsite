import { motion } from 'framer-motion'

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

  return (
    <motion.div
      className="min-h-screen py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-12 text-center">Our Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary-700">{service.title}</h3>
              <p className="text-neutral-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ServicesPage