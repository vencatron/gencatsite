// Application constants for Generation Catalyst / iamatrust.com

export const COMPANY_INFO = {
  name: 'Generation Catalyst LLC',
  brand: 'Generation Catalyst',
  tagline: 'Estate Planning Education & Coordination',
  email: 'info@iamatrust.com',
  address: {
    city: 'Pomona',
    state: 'CA',
  },
  serviceArea:
    'Based in Pomona, California — serving LA County, the San Gabriel Valley, and remote clients nationwide',
  hours: {
    weekdays: 'Mon - Fri: 9:00 AM - 5:00 PM',
    weekends: 'Sat: By appointment only',
    sunday: 'Closed',
  },
} as const

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Services', href: '/services' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
] as const

// Required on every page of the site (see /disclaimer for the full version).
export const FOOTER_DISCLAIMER =
  'Generation Catalyst LLC is not a law firm and does not provide legal advice, draft legal documents, or represent clients in legal matters. We provide tax, coordination, and educational services. Information on this site is for general educational purposes only and is not a substitute for advice from a licensed attorney, financial advisor, or tax professional in your jurisdiction. Visiting this site or contacting us does not create an attorney-client, fiduciary, or other professional relationship. Consult a qualified estate planning attorney licensed in your state for legal advice specific to your situation.'

export const CONTACT_FORM_DISCLAIMER =
  'Submitting this form does not create a professional relationship. We will reach out to schedule a no-obligation initial conversation.'

export const CONSULTATION_TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
] as const

export const FORM_VALIDATION = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 50, message: 'Name must be less than 50 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^[+]?[1-9]\d{0,15}$/,
      message: 'Invalid phone number',
    },
  },
  message: {
    required: 'Message is required',
    minLength: { value: 10, message: 'Message must be at least 10 characters' },
    maxLength: { value: 1000, message: 'Message must be less than 1000 characters' },
  },
} as const

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const
