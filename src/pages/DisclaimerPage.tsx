import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width py-12 lg:py-16">
          <motion.h1
            className="heading-lg text-primary-900 mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Disclaimer
          </motion.h1>
          <p className="text-neutral-600 text-lg">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-width">
          <div className="max-w-prose-wide mx-auto prose prose-neutral">
            <h2>Not Legal, Tax, or Financial Advice</h2>
            <p>
              Generation Catalyst LLC is not a law firm, CPA firm, or registered investment
              advisor. Nothing on this website — including articles, guides, checklists, tools,
              or any other content — constitutes legal advice, tax advice, or financial advice.
              No content on this site creates an attorney-client, CPA-client, or
              advisor-client relationship.
            </p>
            <p>
              All content is provided for general informational and educational purposes only.
              Laws, regulations, and tax rules vary by state and change over time. Information
              on this site may not reflect the most current legal or tax developments and may
              not apply to your specific situation.
            </p>

            <h2>Consult a Licensed Professional</h2>
            <p>
              Before making any decisions about estate planning, taxes, or related financial
              matters, you should consult a licensed estate planning attorney, CPA, or
              financial advisor who can review your specific circumstances and provide advice
              tailored to your situation.
            </p>

            <h2>No Guarantees</h2>
            <p>
              Generation Catalyst LLC makes no representations or warranties of any kind,
              express or implied, about the completeness, accuracy, reliability, or
              suitability of any information on this site. Any reliance you place on such
              information is strictly at your own risk.
            </p>

            <h2>Third-Party Links and Resources</h2>
            <p>
              This site may contain links to third-party websites, tools, or services.
              These links are provided for convenience only. Generation Catalyst LLC has no
              control over the content of those sites and accepts no responsibility for them
              or for any loss or damage that may arise from your use of them.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this disclaimer, please{' '}
              <Link to="/contact" className="text-primary-700 underline hover:text-primary-900">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DisclaimerPage
