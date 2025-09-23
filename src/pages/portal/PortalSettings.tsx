import { useState } from 'react'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { apiService } from '@/services/api'
import { useNavigate } from 'react-router-dom'

const PortalSettings = () => {
  const { user, logout, refreshUser } = usePortalAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    
    try {
      await apiService.updateUserProfile(profileData)
      await refreshUser()
      setIsEditing(false)
      setSuccess('Profile updated successfully!')
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      setSaving(false)
      return
    }
    
    if (passwordData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long')
      setSaving(false)
      return
    }
    
    try {
      const result = await apiService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      )
      setChangingPassword(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setSuccess(result.message || 'Password changed successfully!')
    } catch (err: any) {
      console.error('Error changing password:', err)
      setError(err.message || 'Failed to change password. Please check your current password.')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    try {
      await logout()
      navigate('/client-portal')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  async function exportData() {
    try {
      const data = await apiService.getDashboardData()
      const exportData = {
        user: data.user,
        documents: data.documents,
        messages: data.messages,
        invoices: data.invoices,
        exportedAt: new Date().toISOString(),
      }
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `portal-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error('Error exporting data:', err)
      setError('Failed to export data. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Settings</h2>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Profile Information</h3>
        
        {!isEditing ? (
          <div>
            <p className="text-neutral-700 text-sm mb-2">
              Username: <span className="font-medium">{user?.username}</span>
            </p>
            <p className="text-neutral-700 text-sm mb-2">
              Name: <span className="font-medium">{user?.name}</span>
            </p>
            <p className="text-neutral-700 text-sm mb-2">
              Email: <span className="font-medium">{user?.email}</span>
            </p>
            <p className="text-neutral-700 text-sm mb-4">
              Phone: <span className="font-medium">{user?.phoneNumber || 'Not provided'}</span>
            </p>
            <button className="btn-outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field text-sm">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field text-sm">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="label-field text-sm">Phone Number</label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Security</h3>
        
        {!changingPassword ? (
          <button className="btn-outline" onClick={() => setChangingPassword(true)}>
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="label-field text-sm">Current Password</label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-field text-sm">New Password (min 8 characters)</label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-field text-sm">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Changing...' : 'Change Password'}
              </button>
              <button 
                type="button" 
                className="btn-ghost" 
                onClick={() => {
                  setChangingPassword(false)
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900 mb-2">Data Management</h3>
        <p className="text-neutral-600 text-sm mb-4">
          Export all your data including documents metadata, messages, and invoices.
        </p>
        <div className="flex gap-3">
          <button className="btn-outline" onClick={exportData}>
            Export My Data
          </button>
          <button className="btn-ghost text-red-600" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900 mb-2">Notifications</h3>
        <p className="text-neutral-600 text-sm">Email notifications are enabled for booking confirmations.</p>
      </div>
    </div>
  )
}

export default PortalSettings