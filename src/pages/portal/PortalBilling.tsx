import { useEffect, useState } from 'react'
import { InvoiceRecord, listInvoices, seedInvoicesIfEmpty, setInvoiceStatus } from '@/utils/portalDb'

const PortalBilling = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([])

  async function refresh() {
    await seedInvoicesIfEmpty()
    const list = await listInvoices()
    setInvoices(list)
  }

  useEffect(() => {
    refresh()
  }, [])

  async function pay(id: string) {
    await setInvoiceStatus(id, 'paid')
    await refresh()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Billing & Invoices</h2>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-600">
              <th className="py-3 px-4">Invoice</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Due</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-neutral-100">
                <td className="py-3 px-4 font-medium text-neutral-900">{inv.number}</td>
                <td className="py-3 px-4 text-neutral-700">${inv.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-neutral-600">{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-right">
                  {inv.status === 'due' ? (
                    <button className="btn-primary text-xs" onClick={() => pay(inv.id)}>Pay</button>
                  ) : (
                    <span className="text-neutral-400 text-xs">Paid</span>
                  )}
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td className="py-6 px-4 text-neutral-500" colSpan={5}>No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PortalBilling

