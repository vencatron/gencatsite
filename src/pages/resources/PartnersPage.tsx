import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'

// Vetted attorney partners. Add entries as relationships are formalized:
// { name, firm, focus, location, contactUrl }
const PARTNERS: {
  name: string
  firm: string
  focus: string
  location: string
  contactUrl: string
}[] = []

const PartnersPage = () => {
  return (
    <div>
      <Seo
        title="Partner Network | Vetted Estate Planning Attorneys | Generation Catalyst"
        description="Licensed estate planning attorneys we coordinate with. We connect California families with vetted legal professionals — we are not a law firm ourselves."
        path="/resources/partners"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <Link to="/resources" className="text-sm font-medium text-accent-700 hover:text-accent-800">
              ← All resources
            </Link>
            <h1 className="heading-lg mt-4 mb-5">Our partner network</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Estate planning documents must be designed and prepared by a licensed attorney —
              full stop. Part of our coordination work is connecting families with attorneys whose
              practice actually fits their situation. These are professionals we know, have vetted,
              and coordinate with regularly.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width max-w-4xl">
          {PARTNERS.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {PARTNERS.map((p) => (
                <div key={p.name} className="card">
                  <h2 className="font-serif text-xl font-semibold text-primary-900 mb-1">{p.name}</h2>
                  <p className="text-sm font-medium text-accent-700 mb-3">{p.firm}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-2">{p.focus}</p>
                  <p className="text-xs text-neutral-500 mb-4">{p.location}</p>
                  <a
                    href={p.contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    Contact →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="card mb-10">
              <h2 className="font-serif text-xl font-semibold text-primary-900 mb-3">
                Introductions by request
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We’re in the process of publishing our attorney network here. In the meantime, we
                make introductions directly: tell us about your situation and we’ll connect you
                with a licensed estate planning attorney from our network whose focus fits — at no
                charge and with no obligation.
              </p>
              <Link to="/contact" className="btn-primary">
                Request an introduction
              </Link>
            </div>
          )}

          {/* Required disclosure */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-6">
            <p className="text-sm text-neutral-700 leading-relaxed">
              <strong>Disclosure:</strong> We have professional referral relationships with these
              attorneys. We do not receive referral fees unless explicitly disclosed. Attorneys in
              our network are independent professionals — they are not our employees, and engaging
              them creates an attorney-client relationship with their firm, not with Generation
              Catalyst LLC.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Want help choosing the right attorney?"
        text="A Family Planning Conversation includes a personalized roadmap of the professionals your situation calls for — and a preparation checklist so your first attorney meeting counts."
      />
    </div>
  )
}

export default PartnersPage
