import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Estate Planning', href: '/services/estate-planning' },
      { name: 'Wills & Trusts', href: '/services/wills-trusts' },
      { name: 'Probate Services', href: '/services/probate' },
      { name: 'Tax Planning', href: '/services/tax-planning' },
      { name: 'Business Succession', href: '/services/business-succession' },
      { name: 'Asset Protection', href: '/services/asset-protection' },
    ],
    resources: [
      { name: 'Estate Planning FAQ', href: '/resources/faq' },
      { name: 'Estate Planning Blog', href: '/resources/blog' },
      { name: 'Free Resources', href: '/resources' },
      { name: 'Estate Planning Guides', href: '/resources/guides' },
      { name: 'Calculators & Tools', href: '/resources/tools' },
    ],
    company: [
      { name: 'About Generation Catalyst', href: '/about' },
      { name: 'Our Attorneys', href: '/about/team' },
      { name: 'Client Testimonials', href: '/testimonials' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Client Portal', href: '/client-portal' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Attorney Advertising', href: '/attorney-advertising' },
      { name: 'Professional Disclosures', href: '/disclosures' },
    ],
  }

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold">Generation Catalyst</h3>
              <p className="text-primary-400 text-sm font-medium">Estate Planning Attorneys</p>
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Protecting families and preserving legacies throughout the Pacific Northwest 
              for over 25 years. Trust our board-certified attorneys to secure your family's future.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:(555)123-4567" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:info@generationcatalyst.com" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  info@generationcatalyst.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div className="text-neutral-300">
                  <p>123 Estate Planning Blvd, Suite 500</p>
                  <p>Portland, OR 97205</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.219.085.338-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="border-t border-neutral-700 pt-8 mb-8">
          <div className="bg-neutral-800 rounded-lg p-6">
            <h5 className="font-semibold text-white mb-4">Important Legal Disclaimers</h5>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-neutral-400 leading-relaxed">
              <div>
                <p className="mb-3">
                  <strong className="text-neutral-300">Attorney Advertising:</strong> This website constitutes attorney advertising. 
                  Prior results do not guarantee a similar outcome. The choice of a lawyer is an important decision 
                  that should not be based solely upon advertisements.
                </p>
                <p className="mb-3">
                  <strong className="text-neutral-300">No Attorney-Client Relationship:</strong> The information on this website 
                  is for general information purposes only and does not constitute legal advice. 
                  Contacting us does not create an attorney-client relationship.
                </p>
              </div>
              <div>
                <p className="mb-3">
                  <strong className="text-neutral-300">Professional Licenses:</strong> Our attorneys are licensed to practice 
                  law in the states of Oregon and Washington. We may associate with local counsel 
                  in other jurisdictions as needed.
                </p>
                <p>
                  <strong className="text-neutral-300">Tax Advice Disclaimer:</strong> Any tax advice contained in this website 
                  was not intended or written to be used for the purpose of avoiding penalties 
                  imposed by the Internal Revenue Code.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-neutral-400 text-sm">
                © {currentYear} Generation Catalyst Estate Planning. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-neutral-500">
                <span>Licensed in OR & WA</span>
                <span>•</span>
                <span>Bar No. 123456</span>
                <span>•</span>
                <span>A+ BBB Rating</span>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="text-center lg:text-right">
              <p className="text-neutral-400 text-sm mb-1">24/7 Emergency Line</p>
              <a 
                href="tel:(555)123-4567" 
                className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors"
              >
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer