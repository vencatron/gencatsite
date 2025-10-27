import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isResetting, setIsResetting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.')
    }
  }, [token])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsResetting(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Store the access token if provided (auto-login)
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken)
        }
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/client-portal/dashboard')
        }, 3000)
      } else {
        setError(data.error || 'Failed to reset password')
      }
    } catch (err) {
      console.error('Password reset error:', err)
      setError('An error occurred while resetting your password')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-neutral-600">
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{error}</p>
              {error.includes('expired') && (
                <Link
                  to="/client-portal"
                  className="mt-2 inline-block text-sm underline hover:text-red-900"
                >
                  Request a new reset link
                </Link>
              )}
            </div>
          )}

          {success ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded">
                <h4 className="font-semibold mb-2">Password Reset Successful!</h4>
                <p className="mb-3">
                  Your password has been successfully reset.
                </p>
                <p className="text-sm">
                  You will be redirected to your dashboard in a few seconds...
                </p>
              </div>
              <Link
                to="/client-portal/dashboard"
                className="w-full btn-primary block text-center"
              >
                Go to Dashboard Now
              </Link>
            </div>
          ) : !token ? (
            <div className="text-center">
              <p className="text-neutral-600 mb-6">
                The password reset link is invalid or missing.
              </p>
              <Link
                to="/client-portal"
                className="btn-primary inline-block"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="label-field">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                  placeholder="Enter your new password"
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label-field">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  placeholder="Re-enter your new password"
                />
              </div>

              <button
                type="submit"
                disabled={isResetting || !newPassword || !confirmPassword}
                className="w-full btn-primary"
              >
                {isResetting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/client-portal"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            Password reset links expire after 1 hour for security purposes
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPassword