import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'

// Affiliate links: set the partner URL (with tracking parameters) per tool.
const TOOLS = [
  {
    name: 'Trust & Will',
    category: 'Self-service estate planning documents',
    affiliate: true,
    url: 'https://trustandwill.com',
    summary:
      'A well-built online platform for state-specific wills, trusts, and related documents, created through a guided questionnaire with attorney-developed templates.',
    goodFit:
      'Families with straightforward assets and conventional wishes who want baseline documents in place now — especially as a stopgap while preparing for fuller planning.',
    notFit:
      'Business owners, blended families, beneficiaries with special needs, significant or multi-state assets, or anyone who needs advice about what their documents should say. Those situations call for a licensed attorney.',
  },
]

const RecommendedToolsPage = () => {
  return (
    <div>
      <Seo
        title="Recommended Tools | Honestly Framed | Generation Catalyst"
        description="Estate planning tools we’ve personally vetted, including Trust & Will, with honest framing about when self-service fits and when it doesn’t. Affiliate relationships plainly disclosed."
        path="/resources/recommended-tools"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <Link to="/resources" className="text-sm font-medium text-accent-700 hover:text-accent-800">
              ← All resources
            </Link>
            <h1 className="heading-lg mt-4 mb-5">Recommended tools</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Tools we think well of, with honest framing about where they fit. No tool on this
              page replaces a licensed attorney — and we say so on each one.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width max-w-4xl">
          {/* Required disclosure — must appear at top */}
          <div className="rounded-xl border-2 border-accent-300 bg-accent-50 p-6 mb-10">
            <p className="text-sm text-neutral-800 leading-relaxed">
              <strong>Disclosure:</strong> Generation Catalyst may receive compensation when you
              use partner links on this page. We only recommend tools we’ve personally vetted. See
              our{' '}
              <Link to="/affiliate-disclosure" className="text-primary-700 underline font-medium">
                full affiliate disclosure
              </Link>
              .
            </p>
          </div>

          <div className="space-y-8">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="card">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-semibold text-primary-900">{tool.name}</h2>
                  {tool.affiliate && <span className="badge-accent">Affiliate partner</span>}
                </div>
                <p className="text-sm font-medium text-accent-700 mb-4">{tool.category}</p>
                <p className="text-neutral-700 leading-relaxed mb-5">{tool.summary}</p>
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="rounded-lg bg-primary-50 border border-primary-100 p-5">
                    <h3 className="font-sans text-sm font-semibold text-primary-800 mb-2">
                      Generally a good fit for
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">{tool.goodFit}</p>
                  </div>
                  <div className="rounded-lg bg-secondary-50 border border-secondary-100 p-5">
                    <h3 className="font-sans text-sm font-semibold text-secondary-800 mb-2">
                      Generally not the right fit for
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">{tool.notFit}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn-primary"
                  >
                    Visit {tool.name}
                  </a>
                  <Link
                    to="/learn/when-self-service-estate-planning-makes-sense"
                    className="text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    Read our full framework on self-service planning →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="legal-disclaimer mt-10">
            Whether any tool fits your situation is a question these pages cannot answer for you.
            For advice specific to your circumstances, consult a licensed estate planning attorney
            in your state.
          </p>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

export default RecommendedToolsPage
