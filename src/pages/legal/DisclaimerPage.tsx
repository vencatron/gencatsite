import Seo from '@/components/common/Seo'

const SECTIONS = [
  {
    title: 'Not a law firm; no legal services',
    body: 'Generation Catalyst LLC is not a law firm. We are not attorneys, we do not practice law, and no person associated with Generation Catalyst LLC is authorized to provide legal services on its behalf. We do not draft, prepare, or review legal documents; we do not provide legal advice or legal opinions; and we do not represent clients in legal matters or before any court.',
  },
  {
    title: 'No legal advice',
    body: 'Nothing on this website — including articles, guides, glossary entries, downloads, emails, and service descriptions — constitutes legal advice. Content on this site is general educational information intended for a broad audience. It is not tailored to your circumstances, and it should not be relied upon as a substitute for advice from a licensed attorney in your jurisdiction. Estate planning outcomes depend heavily on individual facts and state law; only a licensed attorney can advise you on what is right for your situation.',
  },
  {
    title: 'No attorney-client or professional relationship from site use',
    body: 'Visiting this website, downloading materials, subscribing to emails, submitting a form, or otherwise contacting us does not create an attorney-client relationship (we are not attorneys), a fiduciary relationship, an accountant-client relationship, or any other professional relationship. Professional relationships with Generation Catalyst LLC are formed only through a signed engagement agreement defining a specific scope of services.',
  },
  {
    title: 'Educational content is general',
    body: 'Our educational content describes how laws, processes, and planning concepts generally work. Laws change, and general descriptions cannot account for every exception, transition rule, or local variation. We make reasonable efforts to keep content current but make no warranty as to its accuracy, completeness, or timeliness, and we expressly disclaim liability for actions taken or not taken based on it.',
  },
  {
    title: 'State-specific issues require licensed counsel',
    body: 'Estate planning is governed primarily by state law, and rules differ significantly between states. Content on this site that discusses California concepts is general information about California law, not advice about your situation, and may not apply in other states. For legal advice specific to your situation, consult a qualified estate planning attorney licensed in your state.',
  },
  {
    title: 'Tax content is general',
    body: 'Tax-related content on this site is general information about how tax rules commonly operate and is not tax advice for your situation. Tax outcomes depend on individual facts, elections, and current law. When Generation Catalyst LLC provides tax services, it does so as a CPA practice under a written engagement; nothing on this public site constitutes such an engagement. Nothing on this site is intended or written to be used, and cannot be used, for the purpose of avoiding penalties under the Internal Revenue Code.',
  },
  {
    title: 'No guarantees of outcomes',
    body: 'We make no guarantees, warranties, or predictions regarding the outcome of any planning process, professional engagement, tax position, or legal matter. Descriptions of our services, client experiences, and educational examples are illustrative and do not promise similar results.',
  },
  {
    title: 'Third parties and referrals',
    body: 'We may refer you to, or coordinate with, third-party professionals — including licensed attorneys — and third-party tools and platforms. These third parties are independent of Generation Catalyst LLC. Engaging an attorney creates a relationship with that attorney or their firm, not with us. We are not responsible for the services, advice, or products of any third party. Certain third-party links are affiliate links; see our Affiliate Disclosure.',
  },
]

const DisclaimerPage = () => {
  return (
    <div>
      <Seo
        title="Disclaimer | Generation Catalyst"
        description="Full disclaimer for Generation Catalyst LLC: not a law firm, no legal advice, no attorney-client relationship from site use, general educational content only."
        path="/disclaimer"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="heading-lg mb-5">Disclaimer</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Please read this page carefully. It governs how the information and services on this
              website may be understood and used.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width max-w-3xl">
          <div className="rounded-xl border-2 border-accent-300 bg-accent-50 p-7 mb-12">
            <p className="text-neutral-800 leading-relaxed italic">
              Generation Catalyst LLC is not a law firm and does not provide legal advice, draft
              legal documents, or represent clients in legal matters. We provide tax,
              coordination, and educational services. Information on this site is for general
              educational purposes only and is not a substitute for advice from a licensed
              attorney, financial advisor, or tax professional in your jurisdiction. Visiting this
              site or contacting us does not create an attorney-client, fiduciary, or other
              professional relationship. Consult a qualified estate planning attorney licensed in
              your state for legal advice specific to your situation.
            </p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <div key={s.title}>
                <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-3">
                  {i + 1}. {s.title}
                </h2>
                <p className="text-neutral-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="legal-disclaimer mt-12">
            Questions about this disclaimer may be directed to info@iamatrust.com. Last updated
            June 2026.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DisclaimerPage
