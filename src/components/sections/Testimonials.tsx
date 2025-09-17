import { motion } from 'framer-motion'

const Testimonials = () => {

  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Professional Estate Planning
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Dedicated to Protecting{' '}
            <span className="text-gradient">Your Family's Future</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our comprehensive estate planning services help families across the Pacific Northwest
            protect their assets and secure their legacies.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-neutral-600 mb-6">
            Ready to protect your family's future? Contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary shadow-lg hover:shadow-xl transition-shadow"
            >
              Schedule a Consultation
            </a>
            <a
              href="tel:(555)123-4567"
              className="btn-outline"
            >
              Call (555) 123-4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
