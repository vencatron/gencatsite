import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { apiService } from '@/services/api'
import TwoFactorVerification from '@/components/portal/TwoFactorVerification'

const ClientPortal = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requires2FA, setRequires2FA] = useState(false)
  const [twoFAUserId, setTwoFAUserId] = useState<number | null>(null)
  const [isVerifying2FA, setIsVerifying2FA] = useState(false)
  const { register } = usePortalAuth()
  const navigate = useNavigate()
  const location = useLocation() as any

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setError(null)
    try {
      const response = await apiService.login(loginData.email, loginData.password)

      // Check if 2FA is required
      if ((response as any).requires2FA) {
        setRequires2FA(true)
        setTwoFAUserId((response as any).userId)
        setIsLoggingIn(false)
        return
      }

      // Regular login without 2FA
      const redirectTo = location?.state?.from || '/client-portal/dashboard'
      navigate(redirectTo)
      window.location.reload() // Reload to update auth context
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handle2FAVerification = async (token: string, isBackupCode: boolean) => {
    if (!twoFAUserId) return

    setIsVerifying2FA(true)
    setError(null)

    try {
      await apiService.verify2FALogin(twoFAUserId, token, isBackupCode)
      const redirectTo = location?.state?.from || '/client-portal/dashboard'
      navigate(redirectTo)
      window.location.reload() // Reload to update auth context
    } catch (err: any) {
      throw new Error(err.message || '2FA verification failed')
    } finally {
      setIsVerifying2FA(false)
    }
  }

  const handle2FACancel = () => {
    setRequires2FA(false)
    setTwoFAUserId(null)
    setLoginData({ email: '', password: '' })
    setError(null)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)
    setError(null)
    
    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match')
      setIsRegistering(false)
      return
    }
    
    // Validate password strength (min 8 chars)
    if (registerData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsRegistering(false)
      return
    }
    
    try {
      await register(
        registerData.username,
        registerData.email,
        registerData.password,
        registerData.confirmPassword,
        registerData.firstName,
        registerData.lastName,
        registerData.phoneNumber
      )
      const redirectTo = '/client-portal/dashboard'
      navigate(redirectTo)
      window.location.reload() // Reload to update auth context
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsRegistering(false)
    }
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
    setError(null)
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
    setError(null)
  }

  const portalFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      title: 'Document Access',
      description: 'View and download all your estate planning documents securely'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      title: 'Plan Updates',
      description: 'Track changes and updates to your estate plan over time'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'Secure Messaging',
      description: 'Communicate directly with your estate planning attorney'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v5h2v-5zm4 0h-2v5h2v-5zm4 0h-2v5h2v-5zM19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      ),
      title: 'Appointment Scheduling',
      description: 'Schedule consultations and review meetings online'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      ),
      title: 'Important Reminders',
      description: 'Receive notifications about plan reviews and updates'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      title: 'Billing & Payments',
      description: 'View invoices and make payments securely online'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Portal Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                Secure Client Access
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Your Estate Planning{' '}
                <span className="text-gradient">Command Center</span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Access your estate planning documents, communicate with your attorney, 
                and manage your plan updates all in one secure location, available 24/7.
              </p>
            </div>

            <div className="grid gap-6">
              {portalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                    <p className="text-neutral-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 text-sm">Bank-Level Security</h4>
                  <p className="text-green-700 text-xs">256-bit SSL encryption protects all your sensitive information</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Client Portal Login
                </h3>
                <p className="text-neutral-600">
                  Access your secure estate planning dashboard
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {requires2FA ? (
                <TwoFactorVerification
                  userId={twoFAUserId!}
                  onVerify={handle2FAVerification}
                  onCancel={handle2FACancel}
                  isLoading={isVerifying2FA}
                />
              ) : !showForgotPassword && !showRegister ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="label-field">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="input-field"
                      placeholder="your.email@iamatrust.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="label-field">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="input-field"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-neutral-700">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full btn-primary"
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In to Portal'
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-sm text-neutral-600">Don't have an account? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRegister(true)
                        setError(null)
                      }}
                      className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              ) : showRegister ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="label-field text-sm">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="label-field text-sm">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="username" className="label-field text-sm">
                      Username *
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      className="input-field"
                      placeholder="johndoe"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-email" className="label-field text-sm">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="input-field"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="label-field text-sm">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={registerData.phoneNumber}
                      onChange={handleRegisterChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-password" className="label-field text-sm">
                      Password * (min 8 characters)
                    </label>
                    <input
                      type="password"
                      id="reg-password"
                      name="password"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="input-field"
                      placeholder="Enter a strong password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="label-field text-sm">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="input-field"
                      placeholder="Re-enter your password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full btn-primary"
                  >
                    {isRegistering ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowRegister(false)
                      setError(null)
                    }}
                    className="w-full btn-ghost"
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="reset-email" className="label-field">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="reset-email"
                      className="input-field"
                      placeholder="your.email@iamatrust.com"
                    />
                  </div>
                  <button className="w-full btn-primary">
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setError(null)
                    }}
                    className="w-full btn-ghost"
                  >
                    Back to Login
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                  <div className="text-center space-y-4">
                  <p className="text-sm text-neutral-600">
                    Need help accessing your portal?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:(555)123-4567"
                      className="btn-outline text-center text-sm py-2 px-4"
                    >
                      Call (555) 123-4567
                    </a>
                    <Link
                      to="/contact"
                      className="btn-ghost text-center text-sm py-2 px-4"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>

              {/* New Client */}
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg text-center">
                <p className="text-sm text-neutral-700 mb-2">New client? Your portal access will be set up after your first consultation.</p>
                <Link
                  to="/schedule"
                  className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                >
                  Schedule a Consultation →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Don't Have an Estate Plan Yet?
            </h3>
            <p className="text-neutral-600 mb-6">
              Trust Generation Catalyst to protect your legacy.
              Start with a consultation and get your secure client portal access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="btn-primary">
                Schedule a Consultation
              </Link>
              <Link to="/services" className="btn-outline">
                View Our Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClientPortal
