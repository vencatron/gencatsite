import { useEffect, useState, useCallback } from 'react'
import { apiService, Invoice } from '@/services/api'
import { useNavigate, useLocation } from 'react-router-dom'
import { PaymentModal } from '@/components/payments'

const PortalBilling = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    invoice: Invoice | null
  }>({ isOpen: false, invoice: null })
  const navigate = useNavigate()
  const location = useLocation()

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const invs = await apiService.getInvoices()
      setInvoices(invs)
    } catch (err) {
      if (err.message?.includes('401')) {
        navigate('/client-portal')
      } else {
        setError('Failed to load invoices. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    refresh()

    // Check for payment success from redirect
    const params = new URLSearchParams(location.search)
    if (params.get('payment') === 'success') {
      setSuccessMessage('Payment completed successfully!')
      // Clear the URL params
      navigate('/client-portal/billing', { replace: true })
    }
  }, [location.search, navigate, refresh])

  const openPaymentModal = (invoice: Invoice) => {
    setPaymentModal({ isOpen: true, invoice })
  }

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, invoice: null })
  }

  const handlePaymentSuccess = () => {
    setSuccessMessage('Payment completed successfully!')
    refresh()
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-amber-100 text-amber-700'
      case 'overdue':
        return 'bg-red-100 text-red-700'
      case 'processing':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'overdue':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  // Calculate summary stats
  const stats = {
    totalDue: invoices
      .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + (typeof inv.amount === 'number' ? inv.amount : parseFloat(String(inv.amount) || '0')), 0),
    totalPaid: invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + (typeof inv.amount === 'number' ? inv.amount : parseFloat(String(inv.amount) || '0')), 0),
    overdueCount: invoices.filter(inv => inv.status === 'overdue').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Billing & Invoices</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="text-sm text-neutral-600 mb-1">Total Due</div>
          <div className="text-2xl font-semibold text-neutral-900">
            ${stats.totalDue.toFixed(2)}
          </div>
          {stats.overdueCount > 0 && (
            <div className="text-xs text-red-600 mt-1">
              {stats.overdueCount} invoice{stats.overdueCount > 1 ? 's' : ''} overdue
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="text-sm text-neutral-600 mb-1">Total Paid</div>
          <div className="text-2xl font-semibold text-green-600">
            ${stats.totalPaid.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="text-sm text-neutral-600 mb-1">Payment Methods</div>
          <div className="flex items-center gap-2 mt-2">
            <svg className="w-8 h-5 text-neutral-400" viewBox="0 0 32 20" fill="currentColor">
              <rect width="32" height="20" rx="2" fill="#1a1f71"/>
              <text x="16" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VISA</text>
            </svg>
            <svg className="w-8 h-5 text-neutral-400" viewBox="0 0 32 20" fill="currentColor">
              <rect width="32" height="20" rx="2" fill="#eb001b"/>
              <circle cx="12" cy="10" r="6" fill="#eb001b"/>
              <circle cx="20" cy="10" r="6" fill="#f79e1b"/>
              <path d="M16 5.5a6 6 0 000 9" fill="#ff5f00"/>
            </svg>
            <span className="text-xs text-neutral-500">& more</span>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-neutral-600">Loading invoices...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600">
                <th className="py-3 px-4 font-medium">Invoice</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Due Date</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-neutral-900">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 text-neutral-700 font-medium">
                    ${(typeof inv.amount === 'number' ? inv.amount : parseFloat(String(inv.amount) || '0')).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(inv.status)}`}>
                      {getStatusIcon(inv.status)}
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">
                    {new Date(inv.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-neutral-600 max-w-xs truncate">
                    {inv.description || '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inv.status === 'pending' || inv.status === 'overdue' ? (
                      <button
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        onClick={() => openPaymentModal(inv)}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Pay Now
                      </button>
                    ) : inv.paidDate ? (
                      <span className="text-green-600 text-xs font-medium">
                        Paid {new Date(inv.paidDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-neutral-400 text-xs">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td className="py-12 px-4 text-neutral-500 text-center" colSpan={6}>
                    <svg className="w-12 h-12 mx-auto mb-3 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModal.invoice && (
        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={closePaymentModal}
          invoiceId={paymentModal.invoice.id}
          invoiceNumber={paymentModal.invoice.invoiceNumber}
          amount={String(paymentModal.invoice.amount)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

export default PortalBilling
