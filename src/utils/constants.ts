// Application constants for Generation Catalyst

export const COMPANY_INFO = {
  name: 'Generation Catalyst',
  tagline: 'Professional Estate Planning Services',
  phone: '(555) 123-4567',
  email: 'info@iamatrust.com',
  address: {
    street: '123 Estate Planning Blvd',
    city: 'Claremont',
    state: 'CA',
    zip: '91711',
  },
  hours: {
    weekdays: 'Mon - Fri: 9:00 AM - 5:00 PM',
    weekends: 'Sat: By appointment only',
    sunday: 'Closed',
  },
  social: {
    linkedin: 'https://linkedin.com/company/generation-catalyst',
    facebook: 'https://facebook.com/generation-catalyst',
    twitter: 'https://twitter.com/gen_catalyst',
  },
} as const

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
] as const

export const SERVICE_CATEGORIES = [
  'Estate Planning',
  'Wills & Trusts',
  'Tax Planning',
  'Asset Protection',
  'Business Succession',
] as const

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
