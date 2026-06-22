import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'

const AffiliateDisclosurePage = () => {
  return (
    <div>
      <Seo
        title="Affiliate Disclosure | Generation Catalyst"
        description="FTC-compliant affiliate disclosure: which partners compensate Generation Catalyst, how recommendations are made, and what it means for you."
        path="/affiliate-disclosure"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="heading-lg mb-5">Affiliate Disclosure</h1>
            <p className="text-neutral-600">Last updated: June 2026</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width max-w-3xl article-body">
          <p>
            In the interest of full transparency — and in compliance with the Federal Trade
            Commission’s guidelines on endorsements and testimonials — this page explains the
            affiliate relationships behind some of the links on this site.
          </p>

          <h2>Which partners compensate us</h2>
          <p>
            Some links on this site, primarily on our{' '}
            <Link to="/resources/recommended-tools" className="text-primary-700 underline">
              Recommended Tools
            </Link>{' '}
            page, are affiliate links. If you click one and sign up or make a purchase, Generation
            Catalyst LLC may receive a referral commission. Our current affiliate partners
            include:
          </p>
          <ul>
            <li>Trust &amp; Will — online estate planning document platform.</li>
          </ul>
          <p>
            This list is updated as partnerships change. Affiliate links on the site are
            identified where they appear, and affiliate partners are labeled on the Recommended
            Tools page.
          </p>

          <h2>Recommendations are based on quality</h2>
          <p>
            We only recommend tools we have personally vetted, and our editorial framing —
            including the honest discussion of when a tool is <em>not</em> a good fit — is not
            influenced by compensation. No partner reviews or approves our content. If a partner’s
            quality stops meeting our standard, the recommendation comes down regardless of the
            commission.
          </p>

          <h2>You pay no more for using our links</h2>
          <p>
            Affiliate commissions are paid by the partner, not by you. Using an affiliate link on
            this site does not increase the price you pay; in some cases partner links include a
            discount.
          </p>

          <h2>Attorney referrals are different</h2>
          <p>
            Our{' '}
            <Link to="/resources/partners" className="text-primary-700 underline">
              attorney partner network
            </Link>{' '}
            is not an affiliate program. We do not receive referral fees for attorney
            introductions unless explicitly disclosed to you at the time of the referral, and any
            such arrangement would comply with applicable California professional responsibility
            rules.
          </p>

          <h2>Questions</h2>
          <p>
            If anything about these relationships is unclear, ask us:{' '}
            <a href="mailto:info@iamatrust.com" className="text-primary-700 underline">
              info@iamatrust.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}

export default AffiliateDisclosurePage
