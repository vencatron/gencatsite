import { motion } from 'framer-motion'

const Testimonials = () => {
<<<<<<< HEAD
=======
  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      role: 'Business Owners',
      location: 'Claremont, CA',
      content: 'Generation Catalyst made estate planning so easy and stress-free. They explained everything in plain English and helped us create a comprehensive plan that protects our business and our children\'s future. We now have complete peace of mind.',
      rating: 5,
      image: '👩‍💼',
      services: ['Estate Planning', 'Business Succession'],
    },
    {
      id: 2,
      name: 'Robert Chen',
      role: 'Retiree',
      location: 'Pomona, CA',
      content: 'After my spouse passed away, I needed help updating my estate plan. The team was incredibly compassionate and professional. They handled everything efficiently and made sure my assets would be distributed exactly as I wanted.',
      rating: 5,
      image: '👨‍💼',
      services: ['Will Updates', 'Trust Administration'],
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Single Mother',
      location: 'La Verne, CA',
      content: 'As a single mom, I was worried about what would happen to my daughter if something happened to me. Generation Catalyst helped me set up guardianship documents and a trust that ensures she\'ll be taken care of. The process was affordable and thorough.',
      rating: 5,
      image: '👩',
      services: ['Guardianship Planning', 'Minor\'s Trust'],
    },
    {
      id: 4,
      name: 'James & Linda Thompson',
      role: 'Grandparents',
      location: 'Upland, CA',
      content: 'We wanted to leave a legacy for our grandchildren while minimizing estate taxes. The team created an excellent plan using generation-skipping trusts that will benefit our family for generations to come. Highly recommend their expertise!',
      rating: 5,
      image: '👴',
      services: ['Tax Planning', 'Generation-Skipping Trusts'],
    },
  ]

  const stats = [
    { label: 'Client Satisfaction', value: '100%', icon: '😊' },

    { label: 'Families Served', value: '150+', icon: '👨‍👩‍👧‍👦' },


    { label: 'Years Experience', value: '25+', icon: '⚖️' },
    { label: 'Estate Plans Created', value: '300+', icon: '📋' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }
>>>>>>> 4b76437f2f3dfade3787f677a6ca857a4fbe4eee

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
<<<<<<< HEAD
            Dedicated to Protecting{' '}
            <span className="text-gradient">Your Family's Future</span>
=======
            Trusted by Families Across{' '}
            <span className="text-gradient">Southern California</span>
>>>>>>> 4b76437f2f3dfade3787f677a6ca857a4fbe4eee
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
<<<<<<< HEAD
            Ready to protect your family's future? Contact us today.
=======
            Join the families who've secured their future with Generation Catalyst
>>>>>>> 4b76437f2f3dfade3787f677a6ca857a4fbe4eee
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
