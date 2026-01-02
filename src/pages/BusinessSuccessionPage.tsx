import { motion } from 'framer-motion'

const BusinessSuccessionPage = () => {
  return (
    <motion.div
      className="min-h-screen py-16 px-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-800">Business Succession</h1>
          <p className="mt-3 text-neutral-700">Protect your business legacy with strategic succession planning.</p>
        </header>

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <img src="/images/service-business.svg" alt="" aria-hidden className="absolute right-0 bottom-0 w-64 opacity-30" />
          <div className="relative">
            <h2 className="text-xl font-semibold text-primary-800">What's included</h2>
            <ul className="mt-4 grid gap-2 text-neutral-700 sm:grid-cols-2">
              <li>Ownership transfer planning</li>
              <li>Buy-sell agreements</li>
              <li>Key person insurance strategies</li>
              <li>Family business transitions</li>
              <li>Business valuation coordination</li>
            </ul>
            <p className="mt-6 text-neutral-700">We help business owners develop comprehensive succession strategies that ensure smooth transitions, protect family relationships, and preserve the value you've built.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BusinessSuccessionPage
