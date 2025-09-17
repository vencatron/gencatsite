import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'

const HeroCentered = () => {
  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    target.onerror = null
    target.src = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80'
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-primary-200/40 to-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-secondary-200/40 to-primary-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered content */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-accent-100 text-accent-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full mb-4">
            Trusted Estate Planning for Modern Families
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-4">
            Protect What Matters Most
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 mb-8">
            Comprehensive, compassionate planning to preserve your legacy and secure your family’s future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary shadow-lg hover:shadow-xl transition-shadow">
              Schedule a Consultation
            </Link>
            <Link to="/services" className="btn-outline">
              Explore Our Services
            </Link>
          </div>
        </motion.div>

        {/* Hero photo */}
        <motion.div
          className="relative mt-12 sm:mt-16"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* floating accents */}
          <motion.div
            className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-200/60 to-accent-200/50 rounded-full blur-xl"
            animate={{ y: [0, -6, 0], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br from-secondary-200/60 to-primary-200/50 rounded-full blur-xl"
            animate={{ y: [0, 8, 0], opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.figure
            className="relative mx-auto max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/60"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <motion.img
              src="/family-hero.jpg"
              alt="Smiling family outdoors"
              className="w-full h-[280px] sm:h-[420px] object-cover"
              loading="eager"
              decoding="async"
              onError={handleImgError}
              initial={{ y: 10, opacity: 0.95 }}
              animate={{ y: [10, 0, 10] }}
              transition={{ y: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
            />
            {/* gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent" />
          </motion.figure>

        </motion.div>
      </div>
    </section>
  )
}

export default HeroCentered
