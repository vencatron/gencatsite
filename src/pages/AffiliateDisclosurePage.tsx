import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AffiliateDisclosurePage = () => {
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
            Affiliate Disclosure
          </motion.h1>
          <p className="text-neutral-600 text-lg">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-width">
          <div className="max-w-prose-wide mx-auto prose prose-neutral">
            <h2>Our Affiliate Relationships</h2>
            <p>
              Generation Catalyst LLC participates in affiliate marketing programs. This means
              that when you click certain links on this site and make a purchase or sign up
              for a service, we may earn a commission or referral fee at no additional cost
              to you.
            </p>

            <h2>What This Means for You</h2>
            <p>
              Our editorial content — including articles, guides, tool recommendations, and
              partner listings — reflects our genuine assessment of products and services
              we believe may be useful to families navigating estate planning. We only
              recommend products and services we believe are reputable and relevant.
            </p>
            <p>
              Affiliate relationships do not influence the substance of our educational
              content or our general information about estate planning topics. We aim to
              provide accurate, balanced information regardless of whether a product or
              service has an affiliate relationship with us.
            </p>

            <h2>Specific Affiliate Relationships</h2>
            <p>
              Pages on this site that may contain affiliate links include:
            </p>
            <ul>
              <li>
                <Link to="/resources/recommended-tools" className="text-primary-700 underline hover:text-primary-900">
                  Recommended Tools
                </Link>
              </li>
              <li>
                <Link to="/resources/partners" className="text-primary-700 underline hover:text-primary-900">
                  Partners
                </Link>
              </li>
            </ul>
            <p>
              When a link on those pages includes an affiliate relationship, we aim to note
              it clearly near the link or at the top of the page.
            </p>

            <h2>FTC Compliance</h2>
            <p>
              In accordance with the Federal Trade Commission's guidelines, we disclose
              any material connection between Generation Catalyst LLC and the products or
              services we recommend. If you have any questions about our affiliate
              relationships, please{' '}
              <Link to="/contact" className="text-primary-700 underline hover:text-primary-900">
                contact us
              </Link>
              .
            </p>

            <h2>No Additional Cost to You</h2>
            <p>
              Clicking an affiliate link does not increase the price you pay. Commissions
              are paid by the merchant, not by you. Our goal is to help you find useful
              resources — affiliate relationships are a way to support the cost of
              maintaining this site.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AffiliateDisclosurePage
