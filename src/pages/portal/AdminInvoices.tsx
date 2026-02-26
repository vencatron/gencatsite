import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService, Invoice, User } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'

// Icons
const Icons = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Warning: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
}

type InvoiceWithUser = Invoice & { user: User | null }

interface LineItem {
  description: string
  amount: string
}

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceWithUser[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCreateClientModal, setShowCreateClientModal] = useState(false)
  const [sendingEmail, setSendingEmail] = useState<number | null>(null)
  const { user: currentUser } = usePortalAuth()

  // Form state
  const [formData, setFormData] = useState({
    userId: '',
    invoiceNumber: '',
    amount: '',
    tax: '',
    description: '',
    dueDate: '',
    sendEmail: true,
  })
  const [lineItems, setLineItems] = useState<LineItem[]>([{ description: '', amount: '' }])
  const [creating, setCreating] = useState(false)

  // Create Client form state
  const [clientFormData, setClientFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })
  const [creatingClient, setCreatingClient] = useState(false)

  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.')
      setLoading(false)
      return
    }
    loadData()
  }, [isAdmin])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [invoicesRes, usersRes] = await Promise.all([
        apiService.getAllInvoices(),
        apiService.getAllUsers(),
      ])
      setInvoices(invoicesRes.invoices)
      setUsers(usersRes)
    } catch (err: any) {
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)
    setSuccess(null)

    try {
      // Filter out empty line items
      const validLineItems = lineItems.filter(item => item.description && item.amount)

      const invoiceData: {
        userId: number;
        invoiceNumber: string;
        amount: number;
        tax?: number;
        description?: string;
        lineItems?: Array<{ description: string; amount: string }>;
        dueDate: string;
        sendEmail?: boolean;
      } = {
        userId: parseInt(formData.userId),
        invoiceNumber: formData.invoiceNumber,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        sendEmail: formData.sendEmail,
      }

      if (formData.tax) {
        invoiceData.tax = parseFloat(formData.tax)
      }
      if (formData.description) {
        invoiceData.description = formData.description
      }
      if (validLineItems.length > 0) {
        invoiceData.lineItems = validLineItems
      }

      const result = await apiService.createInvoice(invoiceData)

      setSuccess(`Invoice created successfully!${result.emailSent ? ' Email sent to client.' : ''}`)
      setShowCreateModal(false)
      resetForm()
      loadData()
    } catch (err: any) {
      setError(err.message || 'Failed to create invoice')
    } finally {
      setCreating(false)
    }
  }

  const handleSendEmail = async (invoiceId: number) => {
    setSendingEmail(invoiceId)
    setError(null)
    setSuccess(null)

    try {
      await apiService.sendInvoiceEmail(invoiceId)
      setSuccess('Invoice email sent successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to send invoice email')
    } finally {
      setSendingEmail(null)
    }
  }

  const resetForm = () => {
    setFormData({
      userId: '',
      invoiceNumber: '',
      amount: '',
      tax: '',
      description: '',
      dueDate: '',
      sendEmail: true,
    })
    setLineItems([{ description: '', amount: '' }])
  }

  const resetClientForm = () => {
    setClientFormData({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    })
  }

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreatingClient(true)
    setError(null)
    setSuccess(null)

    try {
      const clientData: {
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
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
      setShowCreateClientModal(false)
      resetClientForm()

      // Reload users list to include the new client
      await loadData()

      // Auto-select the new client in the invoice form if the invoice modal is open
      if (result.user && result.user.id) {
        setFormData(prev => ({ ...prev, userId: String(result.user.id) }))
      }
    } catch (err: any) {
      console.error('Error creating client:', err)
      setError(err.message || 'Failed to create client')
    } finally {
      setCreatingClient(false)
    }
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', amount: '' }])
  }

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index))
    }
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: string) => {
    const updated: LineItem[] = lineItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value }
      }
      return item
    })
    setLineItems(updated)
  }

  const generateInvoiceNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `INV-${year}${month}-${random}`
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      processing: 'bg-blue-100 text-blue-800',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">You do not have permission to access the admin invoices page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Invoice Management</h1>
          <p className="text-neutral-600 mt-1">Create and manage client invoices</p>
        </div>
        <button
          onClick={() => {
            setFormData(prev => ({ ...prev, invoiceNumber: generateInvoiceNumber() }))
            setShowCreateModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Icons.Plus />
          Create Invoice
        </button>
      </div>

      {/* Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <Icons.Warning />
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
          <Icons.Check />
          <span className="text-green-800">{success}</span>
          <button onClick={() => setSuccess(null)} className="ml-auto text-green-600 hover:text-green-800">
            <Icons.Close />
          </button>
        </motion.div>
      )}

      {/* Invoice List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Invoice #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                      No invoices found. Create your first invoice to get started.
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">
                        {invoice.user ? (
                          <div>
                            <div className="text-sm font-medium text-neutral-900">
                              {invoice.user.firstName} {invoice.user.lastName}
                            </div>
                            <div className="text-sm text-neutral-500">{invoice.user.email}</div>
                          </div>
                        ) : (
                          <span className="text-neutral-400">Unknown</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-neutral-900">
                        ${parseFloat(String(invoice.totalAmount || invoice.amount)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {invoice.dueDate
                          ? new Date(invoice.dueDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleSendEmail(invoice.id)}
                          disabled={sendingEmail === invoice.id}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {sendingEmail === invoice.id ? (
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></span>
                          ) : (
                            <Icons.Send />
                          )}
                          {sendingEmail === invoice.id ? 'Sending...' : 'Send Email'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-neutral-900">Create New Invoice</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  resetForm()
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <Icons.Close />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-6">
              {/* Client Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Client *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCreateClientModal(true)}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Icons.Plus />
                    New Client
                  </button>
                </div>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a client...</option>
                  {users.filter(u => u.role !== 'admin').map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Invoice Number */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Invoice Number *
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Line Items */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Line Items
                </label>
                <div className="space-y-3">
                  {lineItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => updateLineItem(index, 'amount', e.target.value)}
                        className="w-32 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      {lineItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Icons.Close />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLineItem}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    + Add Line Item
                  </button>
                </div>
              </div>

              {/* Amount and Tax */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Tax
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tax}
                    onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Optional description for this invoice..."
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Send Email Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={formData.sendEmail}
                  onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="sendEmail" className="text-sm text-neutral-700">
                  Send invoice email to client
                </label>
              </div>

              {/* Total Preview */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex justify-between text-sm text-neutral-600 mb-2">
                  <span>Subtotal:</span>
                  <span>${parseFloat(formData.amount || '0').toFixed(2)}</span>
                </div>
                {formData.tax && (
                  <div className="flex justify-between text-sm text-neutral-600 mb-2">
                    <span>Tax:</span>
                    <span>${parseFloat(formData.tax || '0').toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total:</span>
                  <span>
                    ${(parseFloat(formData.amount || '0') + parseFloat(formData.tax || '0')).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    resetForm()
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
                    'Create Invoice'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Create Client Modal */}
      {showCreateClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-neutral-900">Create New Client</h2>
              <button
                onClick={() => {
                  setShowCreateClientModal(false)
                  resetClientForm()
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

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateClientModal(false)
                    resetClientForm()
                  }}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingClient}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {creatingClient ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Client'
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

export default AdminInvoices
