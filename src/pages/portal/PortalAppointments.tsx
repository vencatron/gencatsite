import { useEffect, useMemo, useState } from 'react'

type Appt = { name: string; email: string; phone?: string; notes?: string; slot: string }

const PortalAppointments = () => {
  const [appts, setAppts] = useState<Appt[]>([])

  function refresh() {
    try {
      const raw = localStorage.getItem('gc_scheduled_consults')
      setAppts(raw ? JSON.parse(raw) : [])
    } catch {
      setAppts([])
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  function cancel(slot: string) {
    const next = appts.filter((a) => a.slot !== slot)
    localStorage.setItem('gc_scheduled_consults', JSON.stringify(next))
    setAppts(next)
  }

  const upcoming = useMemo(() => {
    const now = Date.now()
    return appts
      .map((a) => ({ ...a, t: new Date(a.slot).getTime() }))
      .filter((a) => a.t >= now)
      .sort((a, b) => a.t - b.t)
  }, [appts])

  const past = useMemo(() => {
    const now = Date.now()
    return appts
      .map((a) => ({ ...a, t: new Date(a.slot).getTime() }))
      .filter((a) => a.t < now)
      .sort((a, b) => b.t - a.t)
  }, [appts])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Appointments</h2>
        <a href="/schedule" className="btn-primary">Book Consultation</a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-3">Upcoming</h3>
          <ul className="space-y-3">
            {upcoming.map((a) => (
              <li key={a.slot} className="flex items-center justify-between">
                <div>
                  <div className="text-neutral-900 text-sm">{new Date(a.slot).toLocaleString()}</div>
                  <div className="text-neutral-500 text-xs">30 minutes</div>
                </div>
                <button className="btn-ghost text-red-600 text-sm" onClick={() => cancel(a.slot)}>Cancel</button>
              </li>
            ))}
            {upcoming.length === 0 && <li className="text-neutral-500 text-sm">No upcoming appointments</li>}
          </ul>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900 mb-3">Past</h3>
          <ul className="space-y-3">
            {past.map((a) => (
              <li key={a.slot} className="text-neutral-700 text-sm">{new Date(a.slot).toLocaleString()}</li>
            ))}
            {past.length === 0 && <li className="text-neutral-500 text-sm">No past appointments</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PortalAppointments

