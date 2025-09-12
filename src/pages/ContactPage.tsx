import { motion } from 'framer-motion'

const ContactPage = () => {
  return (
    <motion.div
      className="min-h-screen py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-12 text-center">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary-700">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-800">Address</h3>
                <p className="text-neutral-700">123 Legal Street<br />Estate City, ST 12345</p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">Phone</h3>
                <p className="text-neutral-700">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">Email</h3>
                <p className="text-neutral-700">info@generationcatalyst.com</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6 text-primary-700">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactPage