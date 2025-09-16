import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      role: 'Business Owners',
      location: 'Portland, OR',
      content: 'Generation Catalyst made estate planning so easy and stress-free. They explained everything in plain English and helped us create a comprehensive plan that protects our business and our children\'s future. We now have complete peace of mind.',
      rating: 5,
      image: '👩‍💼',
      services: ['Estate Planning', 'Business Succession'],
    },
    {
      id: 2,
      name: 'Robert Chen',
      role: 'Retiree',
      location: 'Seattle, WA',
      content: 'After my spouse passed away, I needed help updating my estate plan. The team was incredibly compassionate and professional. They handled everything efficiently and made sure my assets would be distributed exactly as I wanted.',
      rating: 5,
      image: '👨‍💼',
      services: ['Will Updates', 'Trust Administration'],
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Single Mother',
      location: 'Eugene, OR',
      content: 'As a single mom, I was worried about what would happen to my daughter if something happened to me. Generation Catalyst helped me set up guardianship documents and a trust that ensures she\'ll be taken care of. The process was affordable and thorough.',
      rating: 5,
      image: '👩',
      services: ['Guardianship Planning', 'Minor\'s Trust'],
    },
    {
      id: 4,
      name: 'James & Linda Thompson',
      role: 'Grandparents',
      location: 'Bend, OR',
      content: 'We wanted to leave a legacy for our grandchildren while minimizing estate taxes. The team created an excellent plan using generation-skipping trusts that will benefit our family for generations to come. Highly recommend their expertise!',
      rating: 5,
      image: '👴',
      services: ['Tax Planning', 'Generation-Skipping Trusts'],
    },
  ]

  const stats = [
    { label: 'Client Satisfaction', value: '100%', icon: '😊' },
    { label: 'Families Served', value: '1,500+', icon: '👨‍👩‍👧‍👦' },
    { label: 'Years Experience', value: '25+', icon: '⚖️' },
    { label: 'Estate Plans Created', value: '3,200+', icon: '📋' },
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
            Client Success Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Trusted by Families Across the{' '}
            <span className="text-gradient">Pacific Northwest</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            See how we've helped thousands of families protect their legacies and secure their futures 
            with comprehensive estate planning solutions.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
              <div className="text-neutral-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-neutral-500 ml-2">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Content */}
              <blockquote className="text-neutral-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                  <div className="text-sm text-neutral-500">{testimonial.location}</div>
                </div>
              </div>

              {/* Services */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="text-xs text-neutral-500 uppercase tracking-wide font-medium mb-2">
                  Services Used
                </div>
                <div className="flex flex-wrap gap-2">
                  {testimonial.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-md"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">BBB A+ Rating</h3>
              <p className="text-sm text-neutral-600">Accredited Business</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Client Referrals</h3>
              <p className="text-sm text-neutral-600">85% from referrals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">5-Star Reviews</h3>
              <p className="text-sm text-neutral-600">Google & Yelp Verified</p>
            </div>
          </div>
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
            Join thousands of families who've secured their future with Generation Catalyst
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary shadow-lg hover:shadow-xl transition-shadow"
            >
              Schedule Your Free Consultation
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
