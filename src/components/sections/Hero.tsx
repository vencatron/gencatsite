import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/40"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="w-72 h-72 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust indicators bar */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 mb-16 pb-8 border-b border-neutral-200/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center text-sm text-neutral-600">
            <svg className="w-5 h-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="font-medium">25+ Years Experience</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <svg className="w-5 h-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="font-medium">1,500+ Families Served</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-600">
            <svg className="w-5 h-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="font-medium">A+ Better Business Bureau</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <span className="inline-block bg-accent-100 text-accent-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                Trusted Estate Planning Experts
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Protect What Matters Most to{' '}
                <span className="text-gradient">Your Family</span>
              </h1>
            </div>
            <p className="text-xl text-neutral-600 mb-8 max-w-lg leading-relaxed">
              Don't leave your family's future to chance. Our experienced estate planning attorneys 
              create comprehensive strategies that protect your assets, minimize taxes, and ensure 
              your legacy lives on exactly as you intend.
            </p>
            
            {/* Key benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-neutral-700 font-medium">Free Initial Consultation</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-neutral-700 font-medium">Fixed-Price Packages</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-neutral-700 font-medium">Lifetime Document Updates</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-neutral-700 font-medium">24/7 Client Portal Access</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary text-center shadow-lg hover:shadow-xl transition-shadow">
                Start Your Free Consultation
              </Link>
              <Link to="/services" className="btn-outline text-center">
                Explore Our Services
              </Link>
            </div>
            
            {/* Urgency message */}
            <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <div className="text-sm">
                  <p className="font-medium text-accent-800">Don't Wait Until It's Too Late</p>
                  <p className="text-accent-700">70% of Americans don't have an updated estate plan. Protect your family today.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Main testimonial card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1 9 7V9C9 10.1 9.9 11 11 11V21C11 22.1 11.9 23 13 23H15C16.1 23 17 22.1 17 21V11C18.1 11 19 10.1 19 9H21Z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-accent-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-neutral-500">5.0</span>
                  </div>
                  <p className="text-neutral-700 italic mb-4">
                    "Generation Catalyst made estate planning so easy. They explained everything clearly 
                    and our family now has complete peace of mind."
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold text-neutral-900">Sarah & Michael Johnson</p>
                    <p className="text-neutral-600">Estate Planning Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Comprehensive Planning</h3>
                <p className="text-sm text-neutral-600">Tailored strategies for every family</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Secure & Protected</h3>
                <p className="text-sm text-neutral-600">Bank-level security for all documents</p>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-20 -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full opacity-15 -z-10"></div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Floating glow accents */}
            <motion.div
              className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-primary-200/50 to-accent-200/40 rounded-full blur-2xl"
              animate={{ y: [0, -8, 0], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-10 -right-12 w-48 h-48 bg-gradient-to-br from-secondary-200/40 to-primary-200/40 rounded-full blur-2xl"
              animate={{ y: [0, 10, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Hero image */}
            <motion.img
              src="/hero-illustration.svg"
              alt="Family estate planning illustration"
              className="relative z-10 w-full max-w-xl mx-auto drop-shadow-xl select-none"
              loading="eager"
              decoding="async"
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: [12, 0, 12], opacity: 1 }}
              transition={{
                duration: 0.8,
                opacity: { duration: 0.5 },
                y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.02 }}
            />

            {/* Sub-caption */}
            <div className="text-center mt-6 text-neutral-600">
              <span className="inline-flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Secure, modern planning for every generation
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
