import { Link, Navigate, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import Seo from '@/components/common/Seo'
import { getServiceBySlug, ServiceTier } from '@/data/services'

function buildSchema(tier: ServiceTier): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tier.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ]
}

const CheckIcon = () => (
  <svg
    className="h-5 w-5 text-primary-600 shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg
    className="h-5 w-5 text-secondary-600 shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const tier = slug ? getServiceBySlug(slug) : undefined
  const schema = useMemo(() => (tier ? buildSchema(tier) : []), [tier])

  if (!tier) {
    return <Navigate to="/services" replace />
  }

  return (
    <div>
      <Seo
        title={`${tier.name} | Services | Generation Catalyst`}
        description={tier.description}
        path={`/services/${tier.slug}`}
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <Link to="/services" className="text-sm font-medium text-accent-700 hover:text-accent-800">
              ← All services
            </Link>
            <h1 className="heading-lg mt-4 mb-3">{tier.name}</h1>
            <p className="text-lg text-neutral-700 leading-relaxed mb-8">{tier.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary">
                Inquire about this service
              </Link>
              <Link to="/services" className="btn-ghost">
                Compare all tiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="container-width pt-12">
        <div className="max-w-3xl rounded-xl bg-accent-50 border border-accent-200 p-7">
          <h2 className="font-serif text-lg font-semibold text-primary-900 mb-2">Who this is for</h2>
          <p className="text-neutral-700 leading-relaxed">{tier.bestFor}</p>
        </div>
      </section>

      {/* Included / Not included */}
      <section className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="heading-sm mb-6">What’s included</h2>
            <ul className="space-y-4">
              {tier.included.map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-700 text-[0.95rem] leading-relaxed">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-secondary-200 bg-secondary-50/40">
            <h2 className="heading-sm mb-2">What’s not included</h2>
            <p className="text-sm text-neutral-600 mb-6">
              We are not a law firm. Legal advice, document drafting, and attorney services are
              never part of this engagement.
            </p>
            <ul className="space-y-4">
              {tier.notIncluded.map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-700 text-[0.95rem] leading-relaxed">
                  <XIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-neutral-100 border-y border-neutral-200">
        <div className="container-width section-padding">
          <h2 className="heading-md mb-10">How it works</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tier.process.map((step, i) => (
              <li key={i} className="card bg-white">
                <p className="font-serif text-3xl font-semibold text-accent-500 mb-3">{i + 1}</p>
                <h3 className="font-serif text-lg font-semibold text-primary-900 mb-2">{step.step}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Investment + FAQ */}
      <section className="container-width section-padding">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="heading-sm mb-4">Pricing</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              We provide a fixed quote upfront — after a brief initial conversation — before any engagement begins.
              No hourly billing, no surprises.
            </p>
            <Link to="/contact" className="btn-primary w-full sm:w-auto">
              Start the conversation
            </Link>
          </div>
          <div className="lg:col-span-2">
            <h2 className="heading-sm mb-6">Frequently asked questions</h2>
            <div className="space-y-6">
              {tier.faq.map((f, i) => (
                <div key={i} className="border-b border-neutral-200 pb-6 last:border-0">
                  <h3 className="font-serif text-lg font-semibold text-primary-900 mb-2">
                    {f.question}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
