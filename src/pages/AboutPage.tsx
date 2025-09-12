import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <motion.div
      className="min-h-screen py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-8">About Generation Catalyst</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-neutral-700 mb-6">
            At Generation Catalyst, we specialize in comprehensive estate planning services
            designed to protect your legacy and secure your family's future.
          </p>
          <p className="text-neutral-700 mb-6">
            Our experienced team of estate planning specialists and financial advisors work closely with clients
            to develop personalized estate plans that meet their unique needs and objectives.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutPage