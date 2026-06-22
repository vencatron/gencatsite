import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'

const CREDENTIALS = [
  'Licensed CPA — State of California (active)',
  'Big Four accounting firm alumni — audit practice',
  'Corporate accounting and interim controller experience',
  'Fractional CFO to business owners through Generation Catalyst LLC',
  'Member, CalCPA and AICPA',
]

const PHILOSOPHY = [
  {
    title: 'Education before engagement',
    text: 'Families should understand the process before they pay anyone — including us. That’s why the Learn hub is free, general, and honest about complexity.',
  },
  {
    title: 'Stay in our lane, deeply',
    text: 'Tax, analysis, funding, and coordination are our lane, and we go deep in it. Legal advice and document drafting are an attorney’s lane — we never blur that line.',
  },
  {
    title: 'Follow-through is the product',
    text: 'Advice without implementation is decoration. Every engagement ends with completed work, documented proof, and a family that knows where everything stands.',
  },
  {
    title: 'A team, coordinated',
    text: 'Attorneys, advisors, insurance professionals, and CPAs each see a slice. Someone has to be accountable for the whole. That’s the seat we take.',
  },
]

const AboutPage = () => {
  return (
    <div>
      <Seo
        title="About | Generation Catalyst — Estate Planning Coordination by a California CPA"
        description="Generation Catalyst was founded by a California CPA — Big Four trained, fractional CFO to business owners — to coordinate the tax, funding, and administration side of estate planning alongside licensed attorneys."
        path="/about"
      />

      {/* Hero / intro */}
      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">About Generation Catalyst</p>
            <h1 className="heading-lg mb-5">The coordinator’s seat at the estate planning table</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Generation Catalyst LLC is an education and coordination practice founded by a
              California-licensed CPA, based in Pomona and serving LA County, the San Gabriel
              Valley, and remote clients nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Background story */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 article-body">
              <h2 className="!mt-0">The path here</h2>
              <p>
                The founder’s career started in a Big Four accounting firm’s audit practice —
                learning, engagement after engagement, how organizations actually fail: rarely
                from bad intentions or bad documents, almost always from broken processes and
                missing follow-through. From there came corporate accounting, then interim
                controller and fractional CFO work for business owners through Generation
                Catalyst LLC.
              </p>
              <p>
                Fractional CFO work means sitting beside business owners for years at a time — and
                eventually, every one of those conversations arrives at the same place: what
                happens to all of this when something happens to me? Watching families navigate
                that question exposed a consistent gap. The attorney drafts excellent documents
                and the engagement ends. The financial advisor manages the portfolio. The CPA
                files the returns. And the work that connects them — funding the trust, aligning
                beneficiary designations, projecting the taxes, preparing the heirs — belongs to
                nobody.
              </p>
              <h2>Why this practice exists</h2>
              <p>
                Generation Catalyst exists to own that gap. We educate families on how the process
                works, analyze the tax side with CPA rigor, coordinate the professional team, and
                project-manage implementation until it is verifiably done. The result is not a
                binder on a shelf — it’s a plan that is funded, current, taxed sensibly, and
                understood by the people it protects.
              </p>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h2 className="heading-sm !mt-0 mb-4">Credentials</h2>
                <ul className="space-y-3">
                  {CREDENTIALS.map((c) => (
                    <li key={c} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
                      <svg
                        className="h-5 w-5 text-accent-600 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card bg-primary-950 border-primary-900">
                <h2 className="font-serif text-lg font-semibold text-white mb-3">Our scope, plainly</h2>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  “As a CPA, I provide tax, financial, and coordination services. I do not draft
                  legal documents or provide legal advice — for that, you need a licensed estate
                  planning attorney. I work alongside attorneys to make sure your full estate
                  plan, including the tax and implementation side, actually works.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-neutral-100 border-y border-neutral-200">
        <div className="container-width section-padding">
          <h2 className="heading-md mb-10">How we work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PHILOSOPHY.map((item) => (
              <div key={item.title} className="card bg-white">
                <h3 className="font-serif text-xl font-semibold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-neutral-700 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/services" className="btn-outline">
              See how the services are structured
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Start with a conversation"
        text="The Family Planning Conversation is how every relationship here begins: 90 minutes, a clear roadmap, and no obligation beyond it."
      />
    </div>
  )
}

export default AboutPage
