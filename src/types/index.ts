// Common types for the Generation Catalyst application
import { ReactNode } from 'react'

// Navigation and Routing
export interface NavigationItem {
  name: string
  href: string
  current?: boolean
  icon?: ReactNode
  badge?: string | number
  subItems?: NavigationItem[]
}

export interface BreadcrumbItem {
  name: string
  href?: string
  current?: boolean
}

// Service Related Types
export interface Service {
  id: string
  title: string
  description: string
  icon: ReactNode
  features: string[]
  pricing?: PricingInfo
  category?: ServiceCategory
  popular?: boolean
  details?: ServiceDetails
}

export interface PricingInfo {
  startingPrice: number
  currency: string
  period?: 'one-time' | 'monthly' | 'yearly'
  discount?: number
  features?: string[]
}

export interface ServiceDetails {
  longDescription: string
  process: ProcessStep[]
  deliverables: string[]
  timeline: string
  requirements?: string[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  duration?: string
}

export type ServiceCategory =
  | 'estate-planning'
  | 'trusts'
  | 'business'
  | 'tax-planning'
  | 'elder-law'

// Team and Organization
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  expertise: string[]
  credentials: string[]
  email?: string
  phone?: string
  linkedIn?: string
  availability?: 'available' | 'busy' | 'unavailable'
}

export interface ContactInfo {
  phone: string
  email: string
  address: Address
  hours: BusinessHours
  socialMedia?: SocialMedia
}

export interface Address {
  street: string
  suite?: string
  city: string
  state: string
  zip: string
  country?: string
}

export interface BusinessHours {
  weekdays: string
  saturday?: string
  sunday?: string
  holidays?: string
  timezone?: string
}

export interface SocialMedia {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  youtube?: string
}

// Client and Testimonials
export interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  rating: number
  image?: string
  date?: string
  serviceUsed?: string
  verified?: boolean
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  status: ClientStatus
  createdAt: Date
  lastActivity?: Date
  documents?: Document[]
  cases?: Case[]
}

export type ClientStatus = 'active' | 'inactive' | 'pending' | 'archived'

// Content Types
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  authorId?: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  slug: string
  featuredImage?: string
  readTime?: number
  views?: number
  likes?: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order?: number
  helpful?: number
  notHelpful?: number
}

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  url?: string
  downloadUrl?: string
  category: string
  tags: string[]
  fileSize?: number
  format?: string
  createdAt: string
  downloads?: number
}

export type ResourceType = 
  | 'document' 
  | 'video' 
  | 'guide' 
  | 'checklist' 
  | 'template' 
  | 'ebook'

// Form Types with Validation
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  preferredContact?: 'email' | 'phone' | 'text'
  hearAboutUs?: string
  acceptPrivacy?: boolean
}

export interface ConsultationFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Consultation Details
  consultationType: ConsultationType
  preferredDate?: string
  preferredTime?: PreferredTime
  alternateDate?: string
  
  // Estate Information
  estateValue?: EstateValue
  hasWill?: boolean
  hasTrust?: boolean
  maritalStatus?: MaritalStatus
  hasChildren?: boolean
  numberOfChildren?: number
  
  // Additional Information
  urgency?: 'immediate' | 'week' | 'month' | 'standard'
  specificConcerns?: string[]
  message?: string
  
  // Consent
  acceptTerms?: boolean
  acceptPrivacy?: boolean
  allowMarketing?: boolean
}

export type ConsultationType =
  | 'estate-planning'
  | 'will-only'
  | 'trust'
  | 'business'
  | 'tax-planning'
  | 'update'
  | 'other'

export type PreferredTime = 
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'weekend'
  | 'flexible'

export type EstateValue = 
  | 'under-500k'
  | '500k-1m'
  | '1m-5m'
  | '5m-10m'
  | 'over-10m'
  | 'prefer-not-say'

export type MaritalStatus = 
  | 'single'
  | 'married'
  | 'divorced'
  | 'widowed'
  | 'domestic-partnership'

// Client Portal Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  phoneNumber?: string
  createdAt: Date
  lastLogin?: Date
  emailVerified?: boolean
  twoFactorEnabled?: boolean
}

export type UserRole = 'client' | 'attorney' | 'admin' | 'staff'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupData extends LoginCredentials {
  firstName: string
  lastName: string
  phone?: string
  acceptTerms: boolean
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
  confirmPassword: string
}

// Document Management
export interface Document {
  id: string
  name: string
  type: DocumentType
  size: number
  uploadedAt: Date
  uploadedBy: string
  clientId?: string
  caseId?: string
  url?: string
  status: DocumentStatus
  tags?: string[]
  description?: string
}

export type DocumentType = 
  | 'will'
  | 'trust'
  | 'power-of-attorney'
  | 'healthcare-directive'
  | 'financial-statement'
  | 'property-deed'
  | 'insurance-policy'
  | 'other'

export type DocumentStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'archived'

export interface DocumentUploadRequest {
  file: File
  type: DocumentType
  description?: string
  tags?: string[]
}

// Case Management
export interface Case {
  id: string
  clientId: string
  attorneyId?: string
  type: ServiceCategory
  status: CaseStatus
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  notes?: CaseNote[]
  documents?: Document[]
  tasks?: Task[]
  billing?: BillingInfo
}

export type CaseStatus = 
  | 'intake'
  | 'in-progress'
  | 'review'
  | 'completed'
  | 'on-hold'
  | 'cancelled'

export interface CaseNote {
  id: string
  caseId: string
  authorId: string
  content: string
  createdAt: Date
  isPrivate?: boolean
}

export interface Task {
  id: string
  title: string
  description?: string
  assignedTo?: string
  dueDate?: Date
  status: TaskStatus
  priority: TaskPriority
  createdAt: Date
  completedAt?: Date
}

export type TaskStatus = 
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'cancelled'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

// Billing and Pricing
export interface BillingInfo {
  id: string
  caseId?: string
  clientId: string
  amount: number
  currency: string
  status: BillingStatus
  dueDate?: Date
  paidDate?: Date
  paymentMethod?: PaymentMethod
  invoiceUrl?: string
}

export type BillingStatus = 
  | 'pending'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'refunded'

export type PaymentMethod = 
  | 'credit-card'
  | 'debit-card'
  | 'bank-transfer'
  | 'check'
  | 'cash'

export interface PricingCalculatorData {
  serviceType: ServiceCategory
  estateValue: EstateValue
  complexity: 'simple' | 'moderate' | 'complex'
  additionalServices: string[]
  discountCode?: string
}

export interface PricingEstimate {
  basePrice: number
  additionalFees: PriceFee[]
  discount?: number
  total: number
  currency: string
  validUntil?: Date
}

export interface PriceFee {
  name: string
  amount: number
  description?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  timestamp?: string
}

export interface ApiError {
  code: string
  message: string
  field?: string
  details?: Record<string, any>
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

// Search and Filter Types
export interface SearchParams {
  query: string
  category?: string
  tags?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

export interface FilterOption {
  label: string
  value: string
  count?: number
}

// Animation and UI Types
export interface AnimationVariants {
  initial: Record<string, unknown>
  animate: Record<string, unknown>
  exit?: Record<string, unknown>
  transition?: Record<string, unknown>
  whileHover?: Record<string, unknown>
  whileTap?: Record<string, unknown>
}

export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Validation Types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any, values?: any) => boolean | string
  message?: string
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule
}

export type ValidationErrors<T> = {
  [K in keyof T]?: string
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  id?: string
  testId?: string
  children?: ReactNode
}

export interface FormFieldProps<T = string> {
  name: string
  label?: string
  value: T
  onChange: (value: T) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  required?: boolean
  disabled?: boolean
  placeholder?: string
  helpText?: string
  className?: string
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
}
