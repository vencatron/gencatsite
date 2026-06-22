import { motion } from 'framer-motion'

interface ResetPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  username: string
  onReset: () => void
  loading: boolean
  error: string | null
  newPassword: string
  setNewPassword: (val: string) => void
  confirmPassword: string
  setConfirmPassword: (val: string) => void
}

const ResetPasswordModal = ({
  isOpen,
  onClose,
  username,
  onReset,
  loading,
  error,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}: ResetPasswordModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          Reset Password for {username}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="label-field">
              New Password (min 8 characters)
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label-field">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onReset}
              disabled={loading || !newPassword || !confirmPassword}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 btn-ghost"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPasswordModal