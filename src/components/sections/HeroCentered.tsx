import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HeroCentered = () => {
  return (
    <section className="relative bg-neutral-50 py-20 lg:py-28 overflow-hidden">
      {/* Subtle decorative blob top-right */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[480px] h-[480px] bg-primary-100/60 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/4"
      />
      {/* Very faint bottom-left accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100/40 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <p className="eyebrow-accent mb-5 tracking-widest">
              Education · Tax · Coordination
            </p>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-primary-900 leading-tight mb-6">
              Your family&rsquo;s legacy is held in trust by every decision you make.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed mb-10 max-w-xl">
              Generation Catalyst helps California families coordinate their estate
              planning — connecting you with the right professionals and handling the
              tax, funding, and administration most plans get wrong.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/learn" className="btn-primary text-center">
                Start Learning
              </Link>
              <Link to="/schedule" className="btn-outline text-center">
                Book a Family Planning Conversation
              </Link>
            </div>
          </motion.div>

          {/* ── Right column: decorative illustration placeholder ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            aria-hidden="true"
          >
            {/* Abstract geometric shape composition */}
            <div className="relative w-[400px] h-[400px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-200/60" />
              {/* Inner filled circle */}
              <div className="absolute inset-10 rounded-full bg-primary-100/70" />
              {/* Floating accent orb top-right */}
              <motion.div
                className="absolute top-6 right-6 w-20 h-20 rounded-full bg-accent-200/80"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Floating primary orb bottom-left */}
              <motion.div
                className="absolute bottom-10 left-4 w-14 h-14 rounded-full bg-primary-200/80"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
              {/* Center card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-7 w-52 text-center">
                  <p className="font-serif text-5xl font-bold text-primary-800 mb-1">3</p>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">pillars</p>
                  <div className="space-y-1.5 text-sm text-neutral-600">
                    <p>Education</p>
                    <div className="w-full h-px bg-neutral-200" />
                    <p>Tax Strategy</p>
                    <div className="w-full h-px bg-neutral-200" />
                    <p>Coordination</p>
                  </div>
                </div>
              </div>
              {/* Small decorative dot cluster */}
              <div className="absolute bottom-6 right-10 grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-300/60" />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HeroCentered
