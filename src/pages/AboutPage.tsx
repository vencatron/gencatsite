import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section
        className="relative h-[46vh] min-h-[360px] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background image - replace with local asset if available at /images/family-hero.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/family-hero.jpg')",
          }}
        />
        {/* Fallback gradient overlay if image is missing or while loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-primary-900/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Your Family. Your Legacy. Our Trust.
              </h1>
              <p className="text-neutral-100/90 text-lg max-w-2xl">
                We help families preserve what matters most with clear, compassionate
                estate planning and trust administration.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main content */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* About copy */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gradient mb-6">About Generation Catalyst</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-neutral-700">
                Generation Catalyst (GenCat) is dedicated to guiding families through the complexities of
                estate planning with confidence and care. We believe effective planning is built on trust,
                clarity, and a deep understanding of your goals.
              </p>
              <p className="text-neutral-700">
                Our advisors partner closely with you to design personalized strategies—from foundational
                wills and living trusts to advanced planning—ensuring your legacy is protected and your
                wishes are carried out.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Family-First Guidance</h3>
                <p className="text-neutral-600 text-sm">
                  We start with your family’s needs and build plans that support long-term
                  stability and harmony across generations.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Trusted Expertise</h3>
                <p className="text-neutral-600 text-sm">
                  Our seasoned team brings practical, plain‑spoken guidance so you can make
                  informed decisions with confidence.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Clarity & Transparency</h3>
                <p className="text-neutral-600 text-sm">
                  From process to pricing, we communicate clearly and keep you informed at
                  every step.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Long-Term Stewardship</h3>
                <p className="text-neutral-600 text-sm">
                  We’re here beyond the paperwork—supporting trustees and families through
                  administration and life’s transitions.
                </p>
              </div>
            </div>

            {/* Approach */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Our Approach</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="rounded-xl bg-neutral-50 p-4 border border-neutral-200">
                  Discovery and goal‑setting to understand your priorities.
                </li>
                <li className="rounded-xl bg-neutral-50 p-4 border border-neutral-200">
                  Tailored plan design with clear, practical recommendations.
                </li>
                <li className="rounded-xl bg-neutral-50 p-4 border border-neutral-200">
                  Document preparation and coordinated implementation.
                </li>
                <li className="rounded-xl bg-neutral-50 p-4 border border-neutral-200">
                  Ongoing guidance for trustees and beneficiaries.
                </li>
              </ul>
            </div>
          </div>

          {/* Contact / Details */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sticky top-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Get in Touch</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-neutral-500">Address</div>
                  <div className="font-medium text-neutral-900">
                    Claremont, CA 91711
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500">Email</div>
                  <a
                    href="mailto:info@iamatrust.com"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    info@iamatrust.com
                  </a>
                </div>
                <div className="pt-2">
                  <a href="/contact" className="btn-primary w-full inline-flex justify-center">
                    Schedule a Consultation
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </motion.section>
    </div>
  )
}

export default AboutPage
