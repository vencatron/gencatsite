import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'
import { SERVICE_TIERS } from '@/data/services'

const COMPARISON_ROWS: { label: string; values: [string, string, string, string] }[] = [
  {
    label: 'Best for',
    values: [
      'Families getting oriented',
      'Families with signed documents',
      'Trustees & established plans',
      'Business owners & complex estates',
    ],
  },
  {
    label: 'Engagement length',
    values: ['90 minutes + summary', '2–4 months', 'Ongoing, annual', 'Multi-year'],
  },
  {
    label: 'Tax compliance (1041 / 709 / 706)',
    values: ['—', '—', 'Included', 'Included'],
  },
  {
    label: 'Trust funding project management',
    values: ['—', 'Included', '—', 'Included'],
  },
  {
    label: 'Tax projections & gifting strategy',
    values: ['—', '—', 'Annual check-in', 'Comprehensive'],
  },
  {
    label: 'Professional team coordination',
    values: ['Roadmap of who to engage', 'Institutions & recorder', 'Attorney flag-ups', 'Full team facilitation'],
  },
  {
    label: 'Investment',
    values: SERVICE_TIERS.map((t) => t.priceRange) as [string, string, string, string],
  },
]

const ServicesPage = () => {
  return (
    <div>
      <Seo
        title="Services | Estate Planning Coordination, Tax & Funding | Generation Catalyst"
        description="Four ways we help California families navigate estate planning: orientation conversations, trust funding project management, ongoing tax and administration, and strategic engagements. No legal advice or document drafting — we coordinate alongside your attorney."
        path="/services"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Services</p>
            <h1 className="heading-lg mb-5">
              Four ways we help California families navigate estate planning
            </h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              We educate, analyze, coordinate, and project-manage — the tax and implementation
              side of estate planning. We do not provide legal advice or draft legal documents;
              every engagement works alongside your licensed attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICE_TIERS.map((tier, idx) => (
              <div key={tier.slug} className="card card-hover flex flex-col">
                <p className="eyebrow !text-neutral-400 mb-2">Tier {idx + 1}</p>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="font-serif text-2xl font-semibold text-primary-900">{tier.name}</h2>
                </div>
                <p className="text-sm font-medium text-accent-700 mb-4">{tier.priceRange}</p>
                <p className="text-neutral-700 leading-relaxed mb-3">{tier.tagline}</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-1">
                  {tier.description}
                </p>
                <Link to={`/services/${tier.slug}`} className="btn-outline self-start">
                  Explore this service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-16 lg:pb-24">
        <div className="container-width">
          <h2 className="heading-md mb-8">Compare the four tiers</h2>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100">
                  <th className="text-left font-sans font-semibold text-neutral-700 p-4 min-w-[10rem]" scope="col">
                    &nbsp;
                  </th>
                  {SERVICE_TIERS.map((tier) => (
                    <th key={tier.slug} className="text-left p-4 min-w-[11rem]" scope="col">
                      <Link
                        to={`/services/${tier.slug}`}
                        className="font-serif text-base font-semibold text-primary-900 hover:text-primary-700"
                      >
                        {tier.shortName}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-neutral-100 last:border-0">
                    <th className="text-left font-sans font-medium text-neutral-700 p-4 align-top" scope="row">
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={i} className="p-4 text-neutral-600 align-top">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* What's never included */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-100 p-7">
            <h3 className="font-serif text-lg font-semibold text-primary-900 mb-3">
              What no tier includes
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Generation Catalyst is not a law firm. No engagement includes legal advice, legal
              document drafting, document review for legal sufficiency, or attorney services.
              Where your plan needs legal work, we help you prepare for — and coordinate with —
              a licensed estate planning attorney of your choice, including attorneys from our{' '}
              <Link to="/resources/partners" className="text-primary-700 underline">
                partner network
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Not sure which is right for you?"
        text="Start with a Family Planning Conversation. In 90 minutes we’ll orient your family on the process, identify the gaps, and map out exactly which professionals — and which of these services, if any — your situation calls for."
      />
    </div>
  )
}

export default ServicesPage
