import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '@/utils/constants'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header className="bg-neutral-50/95 backdrop-blur border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-width">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label="Generation Catalyst — home">
            <img src="/logo-GC.png" alt="" className="h-10 w-auto" />
            <span className="hidden sm:block leading-tight">
              <span className="block font-serif text-lg font-semibold text-primary-900">
                Generation Catalyst
              </span>
              <span className="block text-[0.65rem] font-sans uppercase tracking-[0.22em] text-accent-700">
                Estate Planning Coordination
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 pb-1 border-b-2 ${
                  isActive(item.href)
                    ? 'text-primary-800 border-accent-500'
                    : 'text-neutral-600 border-transparent hover:text-primary-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/client-portal"
              className="text-sm font-medium text-neutral-600 hover:text-primary-700 transition-colors duration-200"
            >
              Client Portal
            </Link>
            <Link to="/contact" className="btn-primary !py-2.5 text-sm">
              Book a Conversation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-neutral-600 hover:text-primary-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200 animate-slide-down">
            <nav className="flex flex-col space-y-1" aria-label="Primary mobile">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-800 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="text-sm font-medium px-4 py-2.5 rounded-md text-neutral-600 hover:text-primary-700 hover:bg-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/client-portal"
                className="text-sm font-medium px-4 py-2.5 rounded-md text-neutral-600 hover:text-primary-700 hover:bg-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Client Portal
              </Link>
              <div className="px-4 pt-3">
                <Link to="/contact" className="btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
                  Book a Family Planning Conversation
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
