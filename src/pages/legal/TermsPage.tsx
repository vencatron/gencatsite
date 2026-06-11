import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'

const SECTIONS: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Acceptance of these terms',
    paragraphs: [
      'These Terms of Service ("Terms") govern your access to and use of the website operated by Generation Catalyst LLC at iamatrust.com (the "Site"). By accessing or using the Site, you agree to be bound by these Terms and by our Privacy Policy, Disclaimer, and Affiliate Disclosure, which are incorporated by reference. If you do not agree, do not use the Site.',
    ],
  },
  {
    title: 'Nature of the Site; no legal services',
    paragraphs: [
      'The Site provides general educational content about estate planning concepts and describes the tax, coordination, and educational services offered by Generation Catalyst LLC. Generation Catalyst LLC is not a law firm and does not provide legal advice or draft legal documents. Content on the Site is general information only and is not professional advice of any kind. Use of the Site does not create an attorney-client, fiduciary, accountant-client, or other professional relationship. See our Disclaimer for full details.',
    ],
  },
  {
    title: 'Acceptable use',
    paragraphs: [
      'You agree to use the Site only for lawful purposes. You may not: (a) use the Site in any way that violates applicable law; (b) attempt to gain unauthorized access to the Site, its servers, or any connected systems, including other users’ accounts in the client portal; (c) interfere with the Site’s operation, including by introducing malicious code or imposing an unreasonable load on our infrastructure; (d) scrape, harvest, or collect information from the Site by automated means without our written permission; or (e) misrepresent your identity or affiliation.',
      'If you create a client portal account, you are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us promptly of any suspected unauthorized use.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'The Site and its content — including text, articles, guides, downloads, graphics, logos, and design — are owned by Generation Catalyst LLC or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may view, download, and print content for your personal, non-commercial use, provided you retain all copyright and proprietary notices. Any other reproduction, distribution, modification, or republication without our prior written consent is prohibited.',
    ],
  },
  {
    title: 'Third-party links and affiliate relationships',
    paragraphs: [
      'The Site contains links to third-party websites, tools, and professionals, some of which are affiliate links for which we may receive compensation, as described in our Affiliate Disclosure. We do not control and are not responsible for third-party sites, services, or professionals. Your dealings with any third party are solely between you and that party.',
    ],
  },
  {
    title: 'Disclaimer of warranties',
    paragraphs: [
      'THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, OR AVAILABILITY. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.',
    ],
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'TO THE FULLEST EXTENT PERMITTED BY LAW, GENERATION CATALYST LLC AND ITS MEMBERS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES — INCLUDING LOST PROFITS, LOST DATA, OR COSTS OF SUBSTITUTE SERVICES — ARISING OUT OF OR RELATING TO YOUR USE OF THE SITE OR ITS CONTENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THE SITE EXCEED ONE HUNDRED DOLLARS ($100). SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS, SO SOME OF THE ABOVE MAY NOT APPLY TO YOU. THIS SECTION APPLIES TO USE OF THE SITE; LIABILITY ARISING FROM ENGAGED PROFESSIONAL SERVICES IS GOVERNED BY THE APPLICABLE ENGAGEMENT AGREEMENT.',
    ],
  },
  {
    title: 'Indemnification',
    paragraphs: [
      'You agree to indemnify, defend, and hold harmless Generation Catalyst LLC and its members, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or related to your violation of these Terms or your misuse of the Site.',
    ],
  },
  {
    title: 'Governing law',
    paragraphs: [
      'These Terms are governed by the laws of the State of California, without regard to its conflict-of-laws principles.',
    ],
  },
  {
    title: 'Dispute resolution; binding arbitration',
    paragraphs: [
      'Any dispute arising out of or relating to these Terms or the Site that cannot be resolved informally shall be resolved by binding arbitration administered in Los Angeles County, California, under the rules of a recognized arbitration provider agreed by the parties (or, absent agreement, JAMS), before a single arbitrator. Each party waives the right to a jury trial and to participate in a class action to the extent permitted by law. Either party may bring qualifying claims in small claims court instead. Judgment on the award may be entered in any court of competent jurisdiction.',
    ],
  },
  {
    title: 'Modification of terms',
    paragraphs: [
      'We may modify these Terms at any time by posting an updated version on this page with a revised "last updated" date. Changes take effect when posted. Your continued use of the Site after changes are posted constitutes acceptance of the modified Terms.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Questions about these Terms may be directed to info@iamatrust.com.',
    ],
  },
]

const TermsPage = () => {
  return (
    <div>
      <Seo
        title="Terms of Service | Generation Catalyst"
        description="Terms of Service for iamatrust.com, operated by Generation Catalyst LLC — acceptable use, intellectual property, limitation of liability, governing law, and dispute resolution."
        path="/terms"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="heading-lg mb-5">Terms of Service</h1>
            <p className="text-neutral-600">Last updated: June 2026</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width max-w-3xl">
          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <div key={s.title}>
                <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-3">
                  {i + 1}. {s.title}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-neutral-700 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <p className="legal-disclaimer mt-12">
            See also our <Link to="/disclaimer" className="underline">Disclaimer</Link>,{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>, and{' '}
            <Link to="/affiliate-disclosure" className="underline">Affiliate Disclosure</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}

export default TermsPage
