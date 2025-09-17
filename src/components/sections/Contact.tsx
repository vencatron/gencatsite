import { motion } from 'framer-motion'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consultationType: 'estate-planning',
    preferredTime: 'morning',
    message: '',
    urgency: 'standard',
    assets: 'under-500k',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-primary-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
            Consultation
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Secure Your <span className="text-primary-400">Legacy?</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Take the first step toward protecting your family's future. 
            Schedule a free consultation with our expert estate planning specialists today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-green-900 border border-green-700 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-100 mb-4">Consultation Request Received!</h3>
                <p className="text-green-200 mb-6">
                  Thank you for your interest in our estate planning services. We'll contact you within 24 hours to schedule your consultation.
                </p>
                <p className="text-green-300 text-sm">
                  For urgent matters, please call us at <a href="tel:(555)123-4567" className="underline">(555) 123-4567</a>
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">Schedule Your Consultation</h3>
                  <p className="text-neutral-600">
                    Fill out the form below and we'll contact you within 24 hours to schedule your consultation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="john.smith@iamatrust.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="consultationType" className="block text-sm font-medium text-neutral-700 mb-2">
                        Primary Interest *
                      </label>
                      <select
                        id="consultationType"
                        name="consultationType"
                        required
                        value={formData.consultationType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      >
                        <option value="estate-planning">Comprehensive Estate Planning</option>
                        <option value="will-only">Simple Will</option>
                        <option value="trust">Living Trust</option>
                        <option value="business">Business Succession</option>
                        <option value="tax-planning">Tax Planning</option>
                        <option value="update">Update Existing Plan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="assets" className="block text-sm font-medium text-neutral-700 mb-2">
                        Estimated Estate Value
                      </label>
                      <select
                        id="assets"
                        name="assets"
                        value={formData.assets}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      >
                        <option value="under-500k">Under $500,000</option>
                        <option value="500k-1m">$500,000 - $1,000,000</option>
                        <option value="1m-5m">$1,000,000 - $5,000,000</option>
                        <option value="over-5m">Over $5,000,000</option>
                        <option value="prefer-not-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-neutral-700 mb-2">
                        Preferred Meeting Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      >
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                        <option value="evening">Evening (5 PM - 7 PM)</option>
                        <option value="weekend">Weekend</option>
                        <option value="flexible">I'm flexible</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block text-sm font-medium text-neutral-700 mb-2">
                        Timeline
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      >
                        <option value="immediate">ASAP - Urgent</option>
                        <option value="week">Within a week</option>
                        <option value="month">Within a month</option>
                        <option value="standard">No rush</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Tell us about your situation (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      placeholder="Please share any specific concerns or questions you have about estate planning..."
                    />
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                      </svg>
                      <div className="text-sm text-neutral-600">
                        <p className="font-medium text-neutral-800 mb-1">Your information is secure</p>
                        <p>We use bank-level security to protect your data and never share your information with third parties.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scheduling your consultation...
                      </>
                    ) : (
                      <>
                        Schedule My Consultation
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Contact Information & Benefits */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Contact Info */}
            <div className="bg-primary-600 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <div>
                    <a href="tel:(555)123-4567" className="text-white hover:text-primary-200 transition-colors">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <div>
                    <a href="mailto:info@iamatrust.com" className="text-white hover:text-primary-200 transition-colors">
                      info@iamatrust.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-200 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <p className="text-white">
                      123 Estate Planning Blvd<br />
                      Suite 500<br />
                      Claremont, CA 91711
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-200 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <div>
                    <p className="text-white">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: By appointment<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">What to Expect</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Consultation</h4>
                    <p className="text-sm text-neutral-600">No obligation discussion of your needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Personalized Strategy</h4>
                    <p className="text-sm text-neutral-600">Custom estate plan recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Fixed-Price Quote</h4>
                    <p className="text-sm text-neutral-600">Transparent pricing with no hidden fees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Next Steps Outline</h4>
                    <p className="text-sm text-neutral-600">Clear roadmap to protect your family</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Why Choose Generation Catalyst?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-neutral-700">Professional estate planning attorneys</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-neutral-700">Personalized legal solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-neutral-700">Comprehensive estate planning services</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-neutral-700">Certified estate planners</span>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
