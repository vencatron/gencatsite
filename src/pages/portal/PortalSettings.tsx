import { useState, useEffect } from 'react'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { apiService } from '@/services/api'
import { useNavigate } from 'react-router-dom'
import TwoFactorSetup from '@/components/portal/TwoFactorSetup'

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

  // 2FA state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)
  const [disabling2FA, setDisabling2FA] = useState(false)
  const [disable2FAData, setDisable2FAData] = useState({
    password: '',
    token: '',
  })
  const [twoFALoading, setTwoFALoading] = useState(false)

  // Fetch 2FA status on mount
  useEffect(() => {
    async function fetch2FAStatus() {
      try {
        const status = await apiService.get2FAStatus()
        setTwoFAEnabled(status.enabled)
      } catch (err) {
        console.error('Error fetching 2FA status:', err)
      }
    }
    fetch2FAStatus()
  }, [])

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

  async function handleDisable2FA(e: React.FormEvent) {
    e.preventDefault()
    setTwoFALoading(true)
    setError(null)
    setSuccess(null)

    try {
      await apiService.disable2FA(disable2FAData.password, disable2FAData.token)
      setTwoFAEnabled(false)
      setDisabling2FA(false)
      setDisable2FAData({ password: '', token: '' })
      setSuccess('Two-factor authentication has been disabled.')
    } catch (err: any) {
      console.error('Error disabling 2FA:', err)
      setError(err.message || 'Failed to disable 2FA. Please check your password and code.')
    } finally {
      setTwoFALoading(false)
    }
  }

  async function handle2FASetupComplete() {
    setShowTwoFactorSetup(false)
    setTwoFAEnabled(true)
    setSuccess('Two-factor authentication has been enabled successfully!')
  }

  function handle2FASetupCancel() {
    setShowTwoFactorSetup(false)
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
        <h3 className="font-semibold text-neutral-900 mb-4">Two-Factor Authentication</h3>

        {showTwoFactorSetup ? (
          <TwoFactorSetup
            onComplete={handle2FASetupComplete}
            onCancel={handle2FASetupCancel}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-neutral-700 text-sm mb-2">
                  Status: {' '}
                  <span className={`font-semibold ${twoFAEnabled ? 'text-green-600' : 'text-neutral-500'}`}>
                    {twoFAEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
                <p className="text-neutral-600 text-sm">
                  {twoFAEnabled
                    ? 'Your account is protected with two-factor authentication.'
                    : 'Add an extra layer of security to your account by enabling 2FA.'}
                </p>
              </div>
              {twoFAEnabled && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Active
                </div>
              )}
            </div>

            {!twoFAEnabled ? (
              <button
                className="btn-primary"
                onClick={() => setShowTwoFactorSetup(true)}
                disabled={twoFALoading}
              >
                Enable Two-Factor Authentication
              </button>
            ) : (
              <>
                {!disabling2FA ? (
                  <button
                    className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => setDisabling2FA(true)}
                  >
                    Disable Two-Factor Authentication
                  </button>
                ) : (
                  <form onSubmit={handleDisable2FA} className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 font-medium mb-2">
                        ⚠️ Warning: Disabling 2FA will reduce your account security
                      </p>
                      <p className="text-sm text-yellow-700">
                        You'll need to enter your password and a 2FA code to confirm.
                      </p>
                    </div>
                    <div>
                      <label className="label-field text-sm">Current Password</label>
                      <input
                        type="password"
                        required
                        value={disable2FAData.password}
                        onChange={(e) => setDisable2FAData({ ...disable2FAData, password: e.target.value })}
                        className="input-field"
                        disabled={twoFALoading}
                      />
                    </div>
                    <div>
                      <label className="label-field text-sm">2FA Code</label>
                      <input
                        type="text"
                        required
                        value={disable2FAData.token}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 6) {
                            setDisable2FAData({ ...disable2FAData, token: value })
                          }
                        }}
                        className="input-field text-center font-mono text-lg tracking-widest"
                        placeholder="000000"
                        maxLength={6}
                        disabled={twoFALoading}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
                        disabled={twoFALoading}
                      >
                        {twoFALoading ? 'Disabling...' : 'Confirm Disable'}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => {
                          setDisabling2FA(false)
                          setDisable2FAData({ password: '', token: '' })
                        }}
                        disabled={twoFALoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </>
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