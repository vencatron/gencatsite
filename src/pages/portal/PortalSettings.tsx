import { usePortalAuth } from '@/context/PortalAuthContext'
import { DocRecord, InvoiceRecord, MessageRecord, listDocuments, listInvoices, listMessages } from '@/utils/portalDb'

const PortalSettings = () => {
  const { user, logout } = usePortalAuth()

  async function exportData() {
    const docs: DocRecord[] = await listDocuments()
    const msgs: MessageRecord[] = await listMessages()
    const invs: InvoiceRecord[] = await listInvoices()
    const apptsRaw = localStorage.getItem('gc_scheduled_consults') || '[]'
    const data = {
      user,
      documents: docs,
      messages: msgs,
      invoices: invs,
      appointments: JSON.parse(apptsRaw),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portal-export.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Settings</h2>
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900 mb-2">Profile</h3>
        <p className="text-neutral-700 text-sm">Name: <span className="font-medium">{user?.name}</span></p>
        <p className="text-neutral-700 text-sm">Email: <span className="font-medium">{user?.email}</span></p>
        <div className="flex gap-3 mt-4">
          <button className="btn-outline" onClick={exportData}>Export my data</button>
          <button className="btn-ghost text-red-600" onClick={logout}>Sign out</button>
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

