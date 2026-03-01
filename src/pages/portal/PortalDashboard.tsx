import { useEffect, useState, useCallback } from 'react'
import { apiService, Document, Invoice, Message } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { useNavigate } from 'react-router-dom'

type Step = { id: string; label: string; done: boolean }

const PortalDashboard = () => {
  const { user } = usePortalAuth()
  const [docs, setDocs] = useState<Document[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [steps, setSteps] = useState<Step[]>(
    () => JSON.parse(localStorage.getItem('portal_plan_steps') || 'null') || [
      { id: 's1', label: 'Initial consultation', done: true },
      { id: 's2', label: 'Questionnaire received', done: true },
      { id: 's3', label: 'Draft documents prepared', done: false },
      { id: 's4', label: 'Review meeting scheduled', done: false },
      { id: 's5', label: 'Signing ceremony', done: false },
    ]
  )
  const navigate = useNavigate()

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getDashboardData()
      setDocs(data.documents)
      setMessages(data.messages)
      setInvoices(data.invoices)
    } catch (err: unknown) {
      if (err instanceof Error && err.message?.includes('401')) {
        navigate('/client-portal')
      } else {
        setError('Failed to load dashboard data. Please refresh the page.')
      }
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  useEffect(() => {
    localStorage.setItem('portal_plan_steps', JSON.stringify(steps))
  }, [steps])

  // Get upcoming invoices
  const upcomingInvoices = invoices.filter(inv => 
    inv.status === 'pending' || inv.status === 'overdue'
  ).slice(0, 2)

  // Get unread messages count
  const unreadMessages = messages.filter(m => m.from === 'support' && !m.isRead).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="bg-primary-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Welcome back, {user?.name || user?.username || 'Client'}!
        </h2>
        <p className="text-neutral-600">
          Here's an overview of your estate planning portal.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Documents</p>
              <p className="text-2xl font-bold text-neutral-900">{docs.length}</p>
            </div>
            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Unread Messages</p>
              <p className="text-2xl font-bold text-neutral-900">{unreadMessages}</p>
            </div>
            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Pending Invoices</p>
              <p className="text-2xl font-bold text-neutral-900">{upcomingInvoices.length}</p>
            </div>
            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Plan Progress</p>
              <p className="text-2xl font-bold text-neutral-900">
                {Math.round((steps.filter(s => s.done).length / steps.length) * 100)}%
              </p>
            </div>
            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 11H7v5h2v-5zm4 0h-2v5h2v-5zm4 0h-2v5h2v-5zM19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Recent Documents</h3>
          {docs.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {docs.slice(0, 3).map((d) => (
                <li key={d.id} className="flex justify-between text-neutral-700">
                  <span className="truncate pr-2">{d.name}</span>
                  <span className="text-neutral-500">{Math.round(d.size / 1024)} KB</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">No documents uploaded yet</p>
          )}
          <a href="/client-portal/documents" className="btn-outline mt-4 inline-block w-full text-center">
            View All Documents
          </a>
        </div>

        {/* Upcoming Invoices */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Upcoming Payments</h3>
          {upcomingInvoices.length > 0 ? (
            <ul className="space-y-3 text-sm">
              {upcomingInvoices.map((inv) => (
                <li key={inv.id} className="border-l-4 border-amber-400 pl-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-900">{inv.invoiceNumber}</span>
                    <span className="text-neutral-700">${(typeof inv.amount === 'number' ? inv.amount : parseFloat(String(inv.amount) || '0')).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Due {new Date(inv.dueDate).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">No pending payments</p>
          )}
          <a href="/client-portal/billing" className="btn-outline mt-4 inline-block w-full text-center">
            View All Invoices
          </a>
        </div>

        {/* Plan Progress */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Estate Plan Progress</h3>
          <ul className="space-y-2">
            {steps.map((s: Step) => (
              <li key={s.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={s.done}
                  onChange={(e) => setSteps((prev: Step[]) => 
                    prev.map((p) => (p.id === s.id ? { ...p, done: e.target.checked } : p))
                  )}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className={s.done ? 'line-through text-neutral-500' : 'text-neutral-700'}>
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-900">Need assistance?</h3>
            <p className="text-neutral-600 text-sm">
              Send us a secure message and we'll respond promptly.
              {unreadMessages > 0 && (
                <span className="ml-2 text-primary-600 font-medium">
                  You have {unreadMessages} unread message{unreadMessages > 1 ? 's' : ''}.
                </span>
              )}
            </p>
          </div>
          <a href="/client-portal/messages" className="btn-primary">
            Message Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default PortalDashboard