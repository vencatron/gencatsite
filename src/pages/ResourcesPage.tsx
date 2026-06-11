import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'

const HUBS = [
  {
    title: 'Free Downloads',
    href: '/resources/checklist',
    description:
      'The Estate Planning Readiness Checklist, Document Inventory Worksheet, Family Meeting Discussion Guide, and our "Questions to Ask Your Attorney" guide.',
    label: 'Get the guides',
  },
  {
    title: 'Partner Network',
    href: '/resources/partners',
    description:
      'Vetted, licensed estate planning attorneys we coordinate with. We connect families with the right professional for their situation.',
    label: 'Meet the network',
  },
  {
    title: 'Recommended Tools',
    href: '/resources/recommended-tools',
    description:
      'Self-service platforms and tools we’ve personally vetted, with honest framing about when they fit — and when they don’t. Includes affiliate links, plainly disclosed.',
    label: 'See the tools',
  },
]

const ResourcesPage = () => {
  return (
    <div>
      <Seo
        title="Resources | Free Guides, Partner Network & Tools | Generation Catalyst"
        description="Free estate planning preparation guides, our vetted attorney partner network, and honestly framed tool recommendations for California families."
        path="/resources"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Resources</p>
            <h1 className="heading-lg mb-5">Tools and guides for getting organized</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Everything here is built around the same idea: prepared families get better outcomes
              from every professional they engage. Start with the free downloads, and use the
              partner network when you’re ready for licensed legal help.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width">
          <div className="grid md:grid-cols-3 gap-6">
            {HUBS.map((hub) => (
              <Link key={hub.href} to={hub.href} className="card card-hover flex flex-col group">
                <h2 className="font-serif text-2xl font-semibold text-primary-900 group-hover:text-primary-700 mb-3">
                  {hub.title}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-1">
                  {hub.description}
                </p>
                <span className="text-sm font-medium text-accent-700">{hub.label} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

export default ResourcesPage
