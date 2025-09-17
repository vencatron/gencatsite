import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
<<<<<<< HEAD
=======
  const stats = [
    { number: '150+', label: 'Families Served' },
    { number: '25+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '$5M+', label: 'Assets Protected' },

    { number: '$10M+', label: 'Assets Protected' },

  ]
>>>>>>> 4b76437f2f3dfade3787f677a6ca857a4fbe4eee

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Why Choose <span className="text-gradient">Generation Catalyst</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-6">
              At Generation Catalyst, we understand that estate planning is about more than 
              just documents—it's about protecting your family's future and preserving your legacy.
            </p>
            <p className="text-neutral-600 mb-8">
              Our experienced team combines estate planning expertise with personalized service to create 
              comprehensive estate plans that reflect your unique circumstances and goals. We guide 
              you through every step of the process with clarity and compassion.
            </p>


            <Link to="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Personalized Planning</h3>
                    <p className="text-sm text-neutral-600">Tailored to your unique needs</p>
                  </div>
                </div>
                <p className="text-neutral-700 text-sm">
                  Our experienced team combines legal expertise with personalized service
                  to create comprehensive estate plans that protect your family's future.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-neutral-900">Trust Administration</h4>
                  <div className="text-green-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Document Review</span>
                    <span className="text-green-600 font-medium">Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Asset Transfer</span>
                    <span className="text-green-600 font-medium">Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Final Distribution</span>
                    <span className="text-primary-600 font-medium">In Progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full opacity-30 -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-20 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
