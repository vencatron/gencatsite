/**
 * Validation utilities for form handling
 */

import { 
  ValidationRule, 
  ValidationRules, 
  ValidationErrors,
  ContactFormData,
  ConsultationFormData,
  LoginCredentials,
  SignupData,
  PasswordResetConfirm
} from '@/types'

// Regular expressions for validation
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const PHONE_REGEX = /^[\d\s\-\(\)\+]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
const ZIP_REGEX = /^\d{5}(-\d{4})?$/
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

/**
 * Validate a single field against a validation rule
 */
export const validateField = (value: any, rule: ValidationRule, values?: Record<string, any>): string | null => {
  // Required validation
  if (rule.required && !value) {
    return rule.message || 'This field is required'
  }

  // Skip other validations if field is empty and not required
  if (!value && !rule.required) {
    return null
  }

  // String validations
  if (typeof value === 'string') {
    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Must be at least ${rule.minLength} characters`
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Must be no more than ${rule.maxLength} characters`
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Invalid format'
    }
  }

  // Custom validation
  if (rule.custom) {
    const result = rule.custom(value, values)
    if (typeof result === 'string') {
      return result
    }
    if (!result) {
      return rule.message || 'Invalid value'
    }
  }

  return null
}

/**
 * Validate all fields in an object against validation rules
 */
export const validateForm = <T extends Record<string, any>>(
  values: T,
  rules: ValidationRules<T>
): ValidationErrors<T> => {
  const errors: ValidationErrors<T> = {}

  for (const key in rules) {
    const rule = rules[key]
    const value = values[key]
    
    if (rule) {
      const error = validateField(value, rule, values)
      if (error) {
        errors[key] = error
      }
    }
  }

  return errors
}

// Common validation rules
export const commonValidationRules = {
  email: {
    required: true,
    pattern: EMAIL_REGEX,
    message: 'Please enter a valid email address'
  },
  
  phone: {
    pattern: PHONE_REGEX,
    minLength: 10,
    message: 'Please enter a valid phone number'
  },
  
  requiredPhone: {
    required: true,
    pattern: PHONE_REGEX,
    minLength: 10,
    message: 'Please enter a valid phone number'
  },
  
  password: {
    required: true,
    pattern: PASSWORD_REGEX,
    minLength: 8,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
  },
  
  confirmPassword: (password: string) => ({
    required: true,
    custom: (value: string) => value === password || 'Passwords do not match'
  }),
  
  required: {
    required: true
  },
  
  requiredCheckbox: {
    required: true,
    custom: (value: boolean) => value === true || 'You must accept to continue'
  },
  
  zipCode: {
    pattern: ZIP_REGEX,
    message: 'Please enter a valid ZIP code'
  },
  
  url: {
    pattern: URL_REGEX,
    message: 'Please enter a valid URL'
  },
  
  minLength: (min: number) => ({
    minLength: min,
    message: `Must be at least ${min} characters`
  }),
  
  maxLength: (max: number) => ({
    maxLength: max,
    message: `Must be no more than ${max} characters`
  }),
  
  minMaxLength: (min: number, max: number) => ({
    minLength: min,
    maxLength: max,
    message: `Must be between ${min} and ${max} characters`
  })
}

// Contact Form Validation Rules
export const contactFormValidationRules: ValidationRules<ContactFormData> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Please enter your first name'
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Please enter your last name'
  },
  email: commonValidationRules.email,
  phone: commonValidationRules.phone,
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100,
    message: 'Please enter a subject'
  },
  message: {
    required: true,
    minLength: 20,
    maxLength: 2000,
    message: 'Please enter a message (20-2000 characters)'
  },
  acceptPrivacy: commonValidationRules.requiredCheckbox
}

// Consultation Form Validation Rules
export const consultationFormValidationRules: ValidationRules<ConsultationFormData> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Please enter your first name'
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Please enter your last name'
  },
  email: commonValidationRules.email,
  phone: commonValidationRules.requiredPhone,
  consultationType: commonValidationRules.required,
  preferredDate: {
    custom: (value: string) => {
      if (!value) return true // Optional field
      const date = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date >= today || 'Please select a future date'
    }
  },
  alternateDate: {
    custom: (value: string, values: any) => {
      if (!value) return true // Optional field
      const date = new Date(value)
      const preferredDate = values.preferredDate ? new Date(values.preferredDate) : null
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (date < today) return 'Please select a future date'
      if (preferredDate && date.getTime() === preferredDate.getTime()) {
        return 'Alternate date must be different from preferred date'
      }
      return true
    }
  },
  message: {
    maxLength: 1000,
    message: 'Message must be less than 1000 characters'
  },
  acceptTerms: {
    required: true,
    custom: (value: boolean) => value === true || 'You must accept the terms and conditions'
  },
  acceptPrivacy: {
    required: true,
    custom: (value: boolean) => value === true || 'You must accept the privacy policy'
  }
}

// Login Form Validation Rules
export const loginFormValidationRules: ValidationRules<LoginCredentials> = {
  email: commonValidationRules.email,
  password: {
    required: true,
    minLength: 8,
    message: 'Please enter your password'
  }
}

// Signup Form Validation Rules
export const signupFormValidationRules: ValidationRules<SignupData> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Please enter your first name'
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Please enter your last name'
  },
  email: commonValidationRules.email,
  password: commonValidationRules.password,
  phone: commonValidationRules.phone,
  acceptTerms: {
    required: true,
    custom: (value: boolean) => value === true || 'You must accept the terms and conditions'
  }
}

// Password Reset Validation Rules
export const passwordResetValidationRules: ValidationRules<PasswordResetConfirm> = {
  token: commonValidationRules.required,
  password: commonValidationRules.password,
  confirmPassword: {
    required: true,
    custom: (value: string, values: any) => 
      value === values.password || 'Passwords do not match'
  }
}

// Utility functions for specific validations
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password)
}

export const isValidZipCode = (zip: string): boolean => {
  return ZIP_REGEX.test(zip)
}

export const isValidUrl = (url: string): boolean => {
  return URL_REGEX.test(url)
}

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

/**
 * Format ZIP code for display
 */
export const formatZipCode = (zip: string): string => {
  const cleaned = zip.replace(/\D/g, '')
  
  if (cleaned.length === 5) {
    return cleaned
  }
  
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
  }
  
  return zip
}

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Check if a date is in the future
 */
export const isFutureDate = (date: string | Date): boolean => {
  const checkDate = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return checkDate >= today
}

/**
 * Check if a date is within business hours
 */
export const isBusinessHours = (date: Date): boolean => {
  const hours = date.getHours()
  const day = date.getDay()
  
  // Monday-Friday, 9 AM - 5 PM
  if (day >= 1 && day <= 5) {
    return hours >= 9 && hours < 17
  }
  
  // Saturday, 9 AM - 12 PM
  if (day === 6) {
    return hours >= 9 && hours < 12
  }
  
  // Sunday - closed
  return false
}

/**
 * Get validation error message for a field
 */
export const getFieldError = <T extends Record<string, any>>(
  errors: ValidationErrors<T>,
  touched: Partial<Record<keyof T, boolean>>,
  fieldName: keyof T
): string | undefined => {
  if (touched[fieldName] && errors[fieldName]) {
    return errors[fieldName]
  }
  return undefined
}

/**
 * Check if form has any errors
 */
export const hasFormErrors = <T extends Record<string, any>>(
  errors: ValidationErrors<T>
): boolean => {
  return Object.keys(errors).length > 0
}

/**
 * Check if all required fields are filled
 */
export const areRequiredFieldsFilled = <T extends Record<string, any>>(
  values: T,
  rules: ValidationRules<T>
): boolean => {
  for (const key in rules) {
    const rule = rules[key]
    const value = values[key]
    
    if (rule?.required && !value) {
      return false
    }
  }
  
  return true
}
