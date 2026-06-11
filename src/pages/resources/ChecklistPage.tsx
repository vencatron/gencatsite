import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'
import EmailCapture from '@/components/common/EmailCapture'

const DOWNLOADS = [
  {
    title: 'Estate Planning Readiness Checklist',
    href: '/resources/downloads/estate-planning-readiness-checklist.html',
    description:
      'The starting point: a plain-language walkthrough of getting your family organized — assets, people, documents, and decisions — before engaging any professional.',
  },
  {
    title: 'Document Inventory Worksheet',
    href: '/resources/downloads/document-inventory-worksheet.html',
    description:
      'A structured worksheet for cataloguing what you own, how it’s titled, and where the paperwork lives — the raw material every attorney and CPA will ask for.',
  },
  {
    title: 'Family Meeting Discussion Guide',
    href: '/resources/downloads/family-meeting-discussion-guide.html',
    description:
      'An agenda and question set for the conversation most families postpone: talking with each other about wishes, roles, and expectations.',
  },
  {
    title: 'Questions to Ask Your Attorney',
    href: '/resources/downloads/questions-to-ask-your-attorney.html',
    description:
      'The companion to our Learn article: the fit, scope, funding, and fee questions that make a first attorney meeting count.',
  },
]

const ChecklistPage = () => {
  return (
    <div>
      <Seo
        title="Free Downloads | Estate Planning Checklists & Guides | Generation Catalyst"
        description="Free estate planning preparation downloads: readiness checklist, document inventory worksheet, family meeting guide, and questions to ask your attorney."
        path="/resources/checklist"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <Link to="/resources" className="text-sm font-medium text-accent-700 hover:text-accent-800">
              ← All resources
            </Link>
            <h1 className="heading-lg mt-4 mb-5">Free downloads</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Four preparation guides, free in exchange for your email. Each one is general
              education — designed to organize your thinking and your paperwork, not to substitute
              for advice from a licensed attorney or tax professional.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <EmailCapture
              source="resources-downloads"
              heading="Unlock all four guides"
              description="Enter your email and every download on this page opens instantly. We’ll also send the guides to your inbox along with occasional educational content."
              buttonLabel="Get the guides"
              successContent={
                <ul className="space-y-3 mt-2">
                  {DOWNLOADS.map((d) => (
                    <li key={d.href}>
                      <a
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-700 font-medium underline hover:text-primary-800"
                      >
                        {d.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              }
            />

            <div className="mt-12 space-y-6">
              {DOWNLOADS.map((d) => (
                <div key={d.href} className="card">
                  <h2 className="font-serif text-xl font-semibold text-primary-900 mb-2">{d.title}</h2>
                  <p className="text-sm text-neutral-600 leading-relaxed">{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

export default ChecklistPage
