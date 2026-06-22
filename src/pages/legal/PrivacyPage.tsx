import Seo from '@/components/common/Seo'

const PrivacyPage = () => {
  return (
    <div>
      <Seo
        title="Privacy Policy | Generation Catalyst"
        description="CCPA/CPRA-compliant privacy policy for iamatrust.com: what we collect, why, who we share it with, cookies, and California residents' privacy rights."
        path="/privacy"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="heading-lg mb-5">Privacy Policy</h1>
            <p className="text-neutral-600">Last updated: June 2026</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width max-w-3xl article-body">
          <p>
            This Privacy Policy describes how Generation Catalyst LLC (&ldquo;we,&rdquo;
            &ldquo;us&rdquo;) collects, uses, and shares personal information when you visit
            iamatrust.com (the &ldquo;Site&rdquo;), and the rights available to you — including
            rights for California residents under the California Consumer Privacy Act as amended by
            the California Privacy Rights Act (CCPA/CPRA).
          </p>

          <h2>1. Categories of information we collect</h2>
          <ul>
            <li>
              Identifiers and contact information — such as your name, email address, and phone
              number, when you submit a form, subscribe to emails, book a conversation, or create
              a client portal account.
            </li>
            <li>
              Inquiry and intake content — information you choose to include in messages, intake
              questionnaires, or portal communications.
            </li>
            <li>
              Account and commercial information — portal account details, appointment history,
              service engagements, and billing records for clients.
            </li>
            <li>
              Internet activity — IP address, browser type, device information, pages viewed, and
              referring URLs, collected through cookies and analytics tools.
            </li>
          </ul>
          <p>
            We do not knowingly collect information from children under 16, and the Site is not
            directed to them. We do not collect sensitive personal information except what you
            voluntarily provide in connection with requesting or receiving services.
          </p>

          <h2>2. Purposes of collection</h2>
          <ul>
            <li>Providing, operating, and securing the Site and client portal;</li>
            <li>Responding to inquiries and scheduling conversations;</li>
            <li>Delivering requested downloads and email content you subscribed to;</li>
            <li>Providing engaged services, including billing and client communications;</li>
            <li>Analyzing Site usage to improve content and performance;</li>
            <li>Complying with legal obligations and enforcing our terms.</li>
          </ul>

          <h2>3. Third parties we share information with</h2>
          <p>
            We share personal information only with service providers who process it on our
            behalf, under contracts limiting their use of it. Categories include: website hosting
            and infrastructure providers; analytics providers; email delivery and marketing
            platforms; scheduling tools; payment processors (for clients); and cloud storage
            providers for client documents. If you follow an affiliate link, the destination
            partner may set its own cookies under its own privacy policy; our Affiliate Disclosure
            explains those relationships.
          </p>
          <p>
            We do not sell personal information for money. We do not knowingly
            &ldquo;share&rdquo; personal information for cross-context behavioral advertising as
            defined by the CPRA. If our practices change, we will update this policy and provide
            the required opt-out mechanisms before doing so.
          </p>

          <h2>4. Cookies</h2>
          <p>
            The Site uses strictly necessary cookies (for portal sessions and security) and, where
            enabled, analytics cookies that help us understand how the Site is used. You can
            control cookies through your browser settings; disabling necessary cookies may break
            portal functionality. Where a cookie consent banner is presented, analytics cookies
            are set only according to your choices.
          </p>

          <h2>5. California residents’ rights (CCPA/CPRA)</h2>
          <p>California residents have the right to:</p>
          <ul>
            <li>Know what personal information we collect, use, and disclose;</li>
            <li>Access the specific pieces of personal information we hold about you;</li>
            <li>Request deletion of your personal information, subject to legal exceptions;</li>
            <li>Request correction of inaccurate personal information;</li>
            <li>
              Opt out of the sale or sharing of personal information (we do not sell or share as
              defined by the CPRA — see section 3 and &ldquo;Do Not Sell&rdquo; below);
            </li>
            <li>Limit use of sensitive personal information (we use none beyond permitted purposes);</li>
            <li>Be free from discrimination for exercising any of these rights.</li>
          </ul>
          <p>
            To exercise any of these rights, email <strong>info@iamatrust.com</strong> with the
            subject line &ldquo;Privacy Request.&rdquo; We will verify your identity (typically by
            matching the email address on file) and respond within the timeframes the law
            requires. You may designate an authorized agent to submit requests on your behalf.
          </p>

          <h2 id="do-not-sell">6. Do Not Sell or Share My Personal Information</h2>
          <p>
            We do not sell personal information for money and do not share it for cross-context
            behavioral advertising. Because we honor this by default, no opt-out action is
            required. If you nonetheless wish to register an opt-out preference, email
            info@iamatrust.com with the subject line &ldquo;Do Not Sell My Personal
            Information&rdquo; and we will record it. We also honor opt-out preference signals
            (such as Global Privacy Control) where technically feasible.
          </p>

          <h2>7. Data retention and security</h2>
          <p>
            We retain personal information only as long as needed for the purposes described
            above, for client records as required by professional standards, and as required by
            law. We use reasonable administrative, technical, and physical safeguards — including
            encrypted connections, hashed credentials, and access controls — but no method of
            transmission or storage is completely secure.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;last updated&rdquo;
            date above reflects the most recent revision, and material changes will be noted on
            this page.
          </p>

          <h2>9. Contact for privacy requests</h2>
          <p>
            Generation Catalyst LLC · Pomona, California ·{' '}
            <a href="mailto:info@iamatrust.com" className="text-primary-700 underline">
              info@iamatrust.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
