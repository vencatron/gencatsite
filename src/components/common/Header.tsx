import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  name: string
  href: string
  description?: string
}

interface NavItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const learnItems: DropdownItem[] = [
  { name: 'Estate Planning Basics',    href: '/learn/basics',               description: 'Start here if you\'re new to estate planning' },
  { name: 'Why Most Trusts Fail',      href: '/learn/why-most-trusts-fail', description: 'The coordination gap nobody talks about' },
  { name: 'Wills vs. Trusts',          href: '/learn/wills-vs-trusts',      description: 'A framework for thinking about the choice' },
  { name: 'California Rules',          href: '/learn/california',           description: 'What\'s different about planning in California' },
]

const serviceItems: DropdownItem[] = [
  { name: 'Family Planning Conversation',    href: '/services/family-conversation',    description: 'Get oriented before you engage anyone else' },
  { name: 'Trust Funding & Implementation',  href: '/services/trust-funding',          description: 'Connect your plan to your assets' },
  { name: 'Ongoing Tax & Administration',    href: '/services/tax-administration',     description: 'The annual discipline that keeps plans working' },
  { name: 'Strategic Engagement',            href: '/services/strategic',              description: 'Full-spectrum coordination for complex estates' },
  { name: 'Estate Planning',                 href: '/services/estate-planning',        description: 'Comprehensive estate planning coordination' },
  { name: 'Wills & Trusts',                  href: '/services/wills-trusts',           description: 'Document strategy and guidance' },
  { name: 'Tax Planning',                    href: '/services/tax-planning',           description: 'Tax strategy around your estate plan' },
]

const navigation: NavItem[] = [
  { name: 'Home',      href: '/' },
  { name: 'Learn',     href: '/learn',    dropdown: learnItems },
  { name: 'Services',  href: '/services', dropdown: serviceItems },
  { name: 'Resources', href: '/resources' },
  { name: 'About',     href: '/about' },
]

// ─── Dropdown Menu ────────────────────────────────────────────────────────────

interface DropdownProps {
  items: DropdownItem[]
  isOpen: boolean
}

const Dropdown = ({ items, isOpen }: DropdownProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50"
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-3 hover:bg-primary-50 transition-colors group"
            >
              <span className="block text-sm font-medium text-primary-900 group-hover:text-primary-700">
                {item.name}
              </span>
              {item.description && (
                <span className="block text-xs text-neutral-500 mt-0.5 group-hover:text-neutral-600">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

// ─── Logo Mark ────────────────────────────────────────────────────────────────

const LogoMark = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="18" fill="currentColor" className="text-primary-800" />
    <path
      d="M11 13h7.5M11 18h5M11 23h9"
      stroke="#fff"
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

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = () => {
  const [isScrolled, setIsScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]          = useState(false)
  const [openDropdown, setOpenDropdown]      = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded]  = useState<string | null>(null)
  const location                             = useLocation()
  const closeTimer                           = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  const isActive = (href: string) =>
    href === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(href)

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(name)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const toggleMobileExpand = (name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name))
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? 'bg-white shadow-md border-b border-neutral-200'
          : 'bg-white/95 backdrop-blur-sm border-b border-neutral-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            aria-label="Generation Catalyst — home"
          >
            <LogoMark />
            <div className="leading-tight">
              <span className="block font-serif text-lg font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                Generation Catalyst
              </span>
              <span className="block text-[9px] font-medium tracking-[0.2em] uppercase text-neutral-500 group-hover:text-neutral-600 transition-colors">
                Estate Planning Coordination
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown ? handleMouseEnter(item.name) : undefined}
                onMouseLeave={() => item.dropdown ? handleMouseLeave() : undefined}
              >
                {item.dropdown ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActive(item.href)
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-800 hover:bg-primary-50'
                    }`}
                    aria-expanded={openDropdown === item.name}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  >
                    {item.name}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 block ${
                      isActive(item.href)
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-800 hover:bg-primary-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {item.dropdown && (
                  <Dropdown
                    items={item.dropdown}
                    isOpen={openDropdown === item.name}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* ── Desktop CTAs ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/client-portal"
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-150 ${
                isActive('/client-portal')
                  ? 'text-primary-800 bg-primary-50'
                  : 'text-neutral-600 hover:text-primary-800 hover:bg-primary-50'
              }`}
            >
              Client Portal
            </Link>
            <Link
              to="/schedule"
              className="btn-primary text-sm py-2 px-5 inline-block"
            >
              Book a Conversation
            </Link>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────────────────── */}
          <button
            className="lg:hidden p-2 rounded-md text-neutral-600 hover:text-primary-800 hover:bg-primary-50 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden border-t border-neutral-200 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'text-primary-800 bg-primary-50'
                            : 'text-neutral-700 hover:text-primary-800 hover:bg-neutral-50'
                        }`}
                        onClick={() => toggleMobileExpand(item.name)}
                        aria-expanded={mobileExpanded === item.name}
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform duration-150 ${
                            mobileExpanded === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.href}
                                to={sub.href}
                                className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'text-primary-800 bg-primary-50'
                          : 'text-neutral-700 hover:text-primary-800 hover:bg-neutral-50'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-neutral-200 pt-3 mt-2 space-y-2">
                <Link
                  to="/client-portal"
                  className="block px-4 py-3 text-sm font-medium text-neutral-600 hover:text-primary-800 hover:bg-neutral-50 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Client Portal
                </Link>
                <Link
                  to="/schedule"
                  className="btn-primary block text-center text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Conversation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
