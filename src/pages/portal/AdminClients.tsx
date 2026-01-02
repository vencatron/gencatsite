import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService, User } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { Link } from 'react-router-dom'

// Icons
const Icons = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Invoice: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
}

const AdminClients = () => {
  const [clients, setClients] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { user: currentUser } = usePortalAuth()

  // Create Client form state
  const [clientFormData, setClientFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })
  const [creating, setCreating] = useState(false)

  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.')
      setLoading(false)
      return
    }
    loadClients()
  }, [isAdmin])

  const loadClients = async () => {
    try {
      setLoading(true)
      setError(null)
      const allUsers = await apiService.getAllUsers()
      // Filter to only show clients (non-admins)
      const clientsOnly = allUsers.filter(u => u.role !== 'admin')
      setClients(clientsOnly)
    } catch (err: any) {
      setError(err.message || 'Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setClientFormData({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    })
  }

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)
    setSuccess(null)

    try {
      const clientData: {
        email: string
        firstName: string
        lastName: string
        phoneNumber?: string
      } = {
        email: clientFormData.email,
        firstName: clientFormData.firstName,
        lastName: clientFormData.lastName,
      }
      if (clientFormData.phoneNumber) {
        clientData.phoneNumber = clientFormData.phoneNumber
      }

      const result = await apiService.createClient(clientData)
      setSuccess(result.message)
      setShowCreateModal(false)
      resetForm()
      await loadClients()
    } catch (err: any) {
      setError(err.message || 'Failed to create client')
    } finally {
      setCreating(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">You do not have permission to access the admin clients page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Client Management</h1>
          <p className="text-neutral-600 mt-1">
            {clients.length} client{clients.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Icons.Plus />
          Add Client
        </button>
      </div>

      {/* Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <span className="text-red-800">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-600 hover:text-red-800">
            <Icons.Close />
          </button>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <span className="text-green-800">{success}</span>
          <button onClick={() => setSuccess(null)} className="ml-auto text-green-600 hover:text-green-800">
            <Icons.Close />
          </button>
        </motion.div>
      )}

      {/* Client List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <div className="text-neutral-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Clients Yet</h3>
          <p className="text-neutral-600 mb-6">Get started by adding your first client.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Icons.Plus />
            Add First Client
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Docs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Invoiced</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {(client.firstName?.[0] ?? client.username?.[0] ?? '?').toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {client.firstName && client.lastName
                              ? `${client.firstName} ${client.lastName}`
                              : client.username}
                          </div>
                          <div className="text-sm text-neutral-500">@{client.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">{client.email}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {client.phoneNumber || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">{client.documentCount ?? 0}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.hasInvoice
                          ? 'bg-green-100 text-green-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {client.hasInvoice ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/client-portal/admin/invoices?client=${client.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Icons.Invoice />
                        Create Invoice
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-neutral-900">Add New Client</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  resetForm()
                  setError(null)
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <Icons.Close />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              {/* Error display inside modal */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={clientFormData.firstName}
                  onChange={(e) => setClientFormData({ ...clientFormData, firstName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={clientFormData.lastName}
                  onChange={(e) => setClientFormData({ ...clientFormData, lastName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={clientFormData.email}
                  onChange={(e) => setClientFormData({ ...clientFormData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={clientFormData.phoneNumber}
                  onChange={(e) => setClientFormData({ ...clientFormData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <p className="text-xs text-neutral-500">
                * Clients created here are for invoicing purposes. They will not have login access unless you set up their credentials separately.
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    resetForm()
                    setError(null)
                  }}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {creating ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Creating...
                    </>
                  ) : (
                    'Add Client'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminClients
