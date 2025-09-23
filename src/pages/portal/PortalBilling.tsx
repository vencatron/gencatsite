import { useEffect, useState } from 'react'
import { apiService, Invoice } from '@/services/api'
import { useNavigate } from 'react-router-dom'

const PortalBilling = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function refresh() {
    try {
      setLoading(true)
      setError(null)
      const invs = await apiService.getInvoices()
      setInvoices(invs)
    } catch (err: any) {
      console.error('Error fetching invoices:', err)
      if (err.message?.includes('401')) {
        navigate('/client-portal')
      } else {
        setError('Failed to load invoices. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function pay(id: number) {
    try {
      setPaying(id)
      setError(null)
      await apiService.payInvoice(id)
      await refresh()
    } catch (err: any) {
      console.error('Error paying invoice:', err)
      setError('Failed to process payment. Please try again.')
    } finally {
      setPaying(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-amber-100 text-amber-700'
      case 'overdue':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Billing & Invoices</h2>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
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
              <tr className="border-b border-neutral-200 text-neutral-600">
                <th className="py-3 px-4">Invoice</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-neutral-100">
                  <td className="py-3 px-4 font-medium text-neutral-900">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 text-neutral-700">${inv.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-neutral-600 max-w-xs truncate">{inv.description || '—'}</td>
                  <td className="py-3 px-4 text-right">
                    {inv.status === 'pending' || inv.status === 'overdue' ? (
                      <button 
                        className="btn-primary text-xs" 
                        onClick={() => pay(inv.id)}
                        disabled={paying === inv.id}
                      >
                        {paying === inv.id ? 'Processing...' : 'Pay'}
                      </button>
                    ) : inv.paidDate ? (
                      <span className="text-neutral-400 text-xs">
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
                  <td className="py-6 px-4 text-neutral-500 text-center" colSpan={6}>
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PortalBilling