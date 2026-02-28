import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService, User } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import UsersTable from '@/components/admin/UsersTable'
import ResetPasswordModal from '@/components/admin/ResetPasswordModal'
import Loading from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMessage'

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const { user: currentUser } = usePortalAuth()

  // Check if current user is admin
  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.')
      setLoading(false)
      return
    }
    loadUsers()
  }, [isAdmin])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const allUsers = await apiService.getAllUsers()
      setUsers(allUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!selectedUser) return

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      setActionLoading(true)
      setError(null)
      await apiService.resetUserPassword(selectedUser.id, newPassword)
      setSuccessMessage(`Password reset successfully for ${selectedUser.username}`)
      setShowResetPasswordModal(false)
      setSelectedUser(null)
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to deactivate user ${user.username}? This can be reversed later.`)) {
      return
    }

    try {
      setActionLoading(true)
      setError(null)
      await apiService.deleteUser(user.id)
      setSuccessMessage(`User ${user.username} deactivated successfully`)
      await loadUsers() // Reload users
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deactivate user')
    } finally {
      setActionLoading(false)
    }
  }

  const handleActivateUser = async (user: User) => {
    try {
      setActionLoading(true)
      setError(null)
      await apiService.activateUser(user.id)
      setSuccessMessage(`User ${user.username} activated successfully`)
      await loadUsers() // Reload users
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to activate user')
    } finally {
      setActionLoading(false)
    }
  }

  const handleChangeUserRole = async (user: User, targetRole: 'admin' | 'client') => {
    if (targetRole === 'client') {
      const confirmed = confirm(`Remove admin access for ${user.username}? They will lose access to the admin portal.`)
      if (!confirmed) {
        return
      }
    }

    try {
      setActionLoading(true)
      setError(null)
      const result = await apiService.updateUserRole(user.id, targetRole)
      setSuccessMessage(`User ${user.username} is now set to ${result.role}`)
      await loadUsers()
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user role')
    } finally {
      setActionLoading(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message="Admin privileges required to view this page." />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading message="Loading users..." />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AdminPageHeader 
          title="User Management" 
          description="Manage user accounts, reset passwords, and control access" 
        />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="text-red-600 text-sm mt-2 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        <UsersTable 
          users={users}
          currentUser={currentUser}
          onRoleChange={handleChangeUserRole}
          onDelete={handleDeleteUser}
          onActivate={handleActivateUser}
          onResetPassword={(user) => {
            setSelectedUser(user)
            setShowResetPasswordModal(true)
          }}
          actionLoading={actionLoading}
        />
      </motion.div>

      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false)
          setSelectedUser(null)
          setNewPassword('')
          setConfirmPassword('')
          setError(null)
        }}
        username={selectedUser?.username || ''}
        onReset={handleResetPassword}
        loading={actionLoading}
        error={error}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </div>
  )
}

export default AdminUsers