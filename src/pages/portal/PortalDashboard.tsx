import { useEffect, useMemo, useState } from 'react'
import { listDocuments, DocRecord } from '@/utils/portalDb'

type Appt = { name: string; email: string; slot: string }
type Step = { id: string; label: string; done: boolean }

const PortalDashboard = () => {
  const [docs, setDocs] = useState<DocRecord[]>([])
  const [appointments, setAppointments] = useState<Appt[]>([])
  const [steps, setSteps] = useState<Step[]>(
    () => JSON.parse(localStorage.getItem('portal_plan_steps') || 'null') || [
      { id: 's1', label: 'Initial consultation', done: true },
      { id: 's2', label: 'Questionnaire received', done: true },
      { id: 's3', label: 'Draft documents prepared', done: false },
      { id: 's4', label: 'Review meeting scheduled', done: false },
      { id: 's5', label: 'Signing ceremony', done: false },
    ]
  )

  useEffect(() => {
    listDocuments().then(setDocs)
    const raw = localStorage.getItem('gc_scheduled_consults')
    if (raw) setAppointments(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('portal_plan_steps', JSON.stringify(steps))
  }, [steps])

  const nextAppt = useMemo(() => {
    const now = Date.now()
    return appointments
      .map((a) => ({ ...a, t: new Date(a.slot).getTime() }))
      .filter((a) => a.t >= now)
      .sort((a, b) => a.t - b.t)[0]
  }, [appointments])

  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-2">Next Appointment</h3>
          {nextAppt ? (
            <p className="text-neutral-700">
              {new Date(nextAppt.slot).toLocaleString()} ({'30 min'})
            </p>
          ) : (
            <p className="text-neutral-500">No upcoming appointments</p>
          )}
          <a href="/schedule" className="btn-outline mt-4 inline-block">Book Another</a>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-2">Recent Documents</h3>
          <ul className="space-y-2 text-sm">
            {docs.slice(0, 3).map((d) => (
              <li key={d.id} className="flex justify-between text-neutral-700">
                <span className="truncate pr-2">{d.name}</span>
                <span className="text-neutral-500">{Math.round(d.size / 1024)} KB</span>
              </li>
            ))}
          </ul>
          <a href="/client-portal/documents" className="btn-outline mt-4 inline-block">Open Documents</a>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-2">Plan Progress</h3>
          <ul className="space-y-2">
            {steps.map((s: Step) => (
              <li key={s.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={s.done}
                  onChange={(e) => setSteps((prev: Step[]) => prev.map((p) => (p.id === s.id ? { ...p, done: e.target.checked } : p)))}
                />
                <span className={s.done ? 'line-through text-neutral-500' : 'text-neutral-700'}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Help */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-900">Need assistance?</h3>
            <p className="text-neutral-600 text-sm">Send us a secure message and we’ll respond promptly.</p>
          </div>
          <a href="/client-portal/messages" className="btn-primary">Message Support</a>
        </div>
      </div>
    </div>
  )
}

export default PortalDashboard
