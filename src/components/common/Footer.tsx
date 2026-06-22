import { Link } from 'react-router-dom'

// ─── Logo Mark (matches Header) ───────────────────────────────────────────────

const FooterLogoMark = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="18" fill="white" fillOpacity="0.15" />
    <path
      d="M11 13h7.5M11 18h5M11 23h9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 11l3 3-3 3"
      stroke="#e5d47e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navigate = [
    { name: 'Home',           href: '/' },
    { name: 'Learn',          href: '/learn/basics' },
    { name: 'Services',       href: '/services' },
    { name: 'Resources',      href: '/resources' },
    { name: 'About',          href: '/about' },
    { name: 'Contact',        href: '/contact' },
  ]

  const learn = [
    { name: 'Estate planning basics',  href: '/learn/basics' },
    { name: 'Wills vs. trusts',        href: '/learn/wills-vs-trusts' },
    { name: 'The funding gap',         href: '/learn/why-most-trusts-fail' },
    { name: 'California concepts',     href: '/learn/california' },
    { name: 'Glossary',                href: '/resources' },
  ]

  const services = [
    { name: 'Family Planning Conversation',   href: '/services/family-conversation' },
    { name: 'Trust Funding & Implementation', href: '/services/trust-funding' },
    { name: 'Ongoing Tax & Administration',   href: '/services/tax-administration' },
    { name: 'Strategic Engagement',           href: '/services/strategic' },
  ]

  const legal = [
    { name: 'Disclaimer',                       href: '/disclosures' },
    { name: 'Terms',                             href: '/terms' },
    { name: 'Privacy',                           href: '/privacy' },
    { name: 'Affiliate Disclosure',              href: '/disclosures' },
    { name: 'Do Not Sell My Personal Information', href: '/privacy' },
  ]

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* ── Main Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-5 group"
              aria-label="Generation Catalyst — home"
            >
              <FooterLogoMark />
              <div className="leading-tight">
                <span className="block font-serif text-base font-semibold text-white group-hover:text-primary-200 transition-colors">
                  Generation Catalyst
                </span>
                <span className="block text-[9px] font-medium tracking-[0.18em] uppercase text-primary-300 group-hover:text-primary-200 transition-colors">
                  Estate Planning Coordination
                </span>
              </div>
            </Link>

            <p className="text-sm text-primary-200 leading-relaxed mb-6">
              Helping California families coordinate their estate planning —
              connecting you with the right professionals and handling the tax,
              funding, and administration most plans get wrong.
            </p>

            <div className="space-y-2 text-sm text-primary-300">
              <p>Pomona, CA</p>
              <a
                href="mailto:info@iamatrust.com"
                className="block hover:text-white transition-colors"
              >
                info@iamatrust.com
              </a>
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navigate.map((link) => (
                <li key={link.href + link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Learn */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-5">
              Learn
            </h4>
            <ul className="space-y-3">
              {learn.map((link) => (
                <li key={link.href + link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href + link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA nudge */}
            <div className="mt-8">
              <Link
                to="/schedule"
                className="inline-block bg-accent-200 hover:bg-accent-300 text-primary-950 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                Book a Conversation
              </Link>
            </div>
          </div>
        </div>

        {/* ── Legal disclaimer ───────────────────────────────────────── */}
        <div className="border-t border-primary-800 pt-8 mb-6">
          <p className="text-xs text-primary-400 leading-relaxed max-w-4xl">
            Generation Catalyst LLC is a California-licensed CPA firm. We provide tax, coordination,
            and administrative services — we do not provide legal advice and are not a law firm.
            Estate planning legal documents must be prepared and executed by a licensed attorney.
            The information on this site is for educational purposes only and does not constitute
            professional advice. Prior results do not guarantee a similar outcome.
          </p>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="border-t border-primary-800 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-primary-400">
            © {currentYear} Generation Catalyst LLC. All rights reserved.
          </p>

          <nav aria-label="Legal links" className="flex flex-wrap gap-x-4 gap-y-1">
            {legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs text-primary-400 hover:text-primary-200 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
