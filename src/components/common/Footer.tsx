import { Link } from 'react-router-dom'
import { COMPANY_INFO, FOOTER_DISCLAIMER } from '@/utils/constants'

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Learn', href: '/learn' },
    { name: 'Services', href: '/services' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const legalLinks = [
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    { name: 'Do Not Sell My Personal Information', href: '/privacy#do-not-sell' },
  ]

  const learnLinks = [
    { name: 'Estate planning basics', href: '/learn/basics' },
    { name: 'Wills vs. trusts', href: '/learn/wills-vs-trusts' },
    { name: 'The funding gap', href: '/learn/funding' },
    { name: 'California concepts', href: '/learn/california' },
    { name: 'Glossary', href: '/learn/glossary' },
  ]

  const serviceLinks = [
    { name: 'Family Planning Conversation', href: '/services/family-conversation' },
    { name: 'Trust Funding & Implementation', href: '/services/trust-funding' },
    { name: 'Ongoing Tax & Administration', href: '/services/tax-administration' },
    { name: 'Strategic Engagement', href: '/services/strategic' },
  ]

  return (
    <footer className="bg-primary-950 text-neutral-200">
      <div className="container-width py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img src="/logo-GC.png" alt="" className="h-10 w-auto" />
              <span className="leading-tight">
                <span className="block font-serif text-xl font-semibold text-white">
                  {COMPANY_INFO.name}
                </span>
                <span className="block text-[0.65rem] font-sans uppercase tracking-[0.22em] text-accent-400">
                  {COMPANY_INFO.tagline}
                </span>
              </span>
            </Link>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6 max-w-md">
              Estate planning education and coordination for families — we handle the tax,
              funding, and administration side of your plan, and connect you with the licensed
              professionals who handle the rest.
            </p>
            <div className="space-y-2 text-sm text-neutral-300">
              <p>
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}
              </p>
              <p className="text-neutral-400">{COMPANY_INFO.serviceArea}</p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-block text-accent-300 hover:text-accent-200 transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Learn */}
          <nav aria-label="Learn hub">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Learn
            </h4>
            <ul className="space-y-2.5">
              {learnLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal links */}
        <div className="border-t border-primary-900 pt-8 mb-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-xs text-neutral-400 hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Required disclaimer — must appear on every page */}
        <div className="border-t border-primary-900 pt-8">
          <p className="text-xs text-neutral-400 leading-relaxed max-w-4xl mb-6">
            {FOOTER_DISCLAIMER}{' '}
            <Link to="/disclaimer" className="underline hover:text-white">
              Read our full disclaimer.
            </Link>
          </p>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
