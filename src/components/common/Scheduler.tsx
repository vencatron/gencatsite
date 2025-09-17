import { useEffect, useMemo, useState } from 'react'
import { COMPANY_INFO } from '@/utils/constants'
import { sendConfirmationEmail } from '@/utils/email'

type Slot = {
  iso: string
  label: string
}

type Appointment = {
  name: string
  email: string
  phone?: string
  notes?: string
  slot: string // ISO string
}

const startHour = 9 // 9:00 AM
const endHour = 17 // 5:00 PM (last start at 16:30)

function formatISOToReadable(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function yyyyMmDd(date: Date) {
  return date.toISOString().slice(0, 10)
}

function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

function nextBusinessDate(base: Date) {
  const d = new Date(base)
  while (isWeekend(d)) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

// US Federal bank holidays (observed) helpers
function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number) {
  const first = new Date(Date.UTC(year, month, 1))
  const offset = (weekday - first.getUTCDay() + 7) % 7
  const day = 1 + offset + (n - 1) * 7
  return new Date(Date.UTC(year, month, day))
}

function lastWeekdayOfMonth(year: number, month: number, weekday: number) {
  const last = new Date(Date.UTC(year, month + 1, 0))
  const offset = (last.getUTCDay() - weekday + 7) % 7
  const day = last.getUTCDate() - offset
  return new Date(Date.UTC(year, month, day))
}

function observeIfWeekend(d: Date) {
  const wd = d.getUTCDay()
  const observed = new Date(d)
  if (wd === 6) observed.setUTCDate(d.getUTCDate() - 1) // Sat -> Fri
  if (wd === 0) observed.setUTCDate(d.getUTCDate() + 1) // Sun -> Mon
  return observed
}

function getUSHolidaysMap(year: number): Record<string, string> {
  const map: Record<string, string> = {}
  const add = (date: Date, name: string) => {
    const key = date.toISOString().slice(0, 10)
    map[key] = name
  }
  // Fixed dates with observation
  add(observeIfWeekend(new Date(Date.UTC(year, 0, 1))), "New Year's Day (Observed)")
  add(observeIfWeekend(new Date(Date.UTC(year, 5, 19))), 'Juneteenth (Observed)')
  add(observeIfWeekend(new Date(Date.UTC(year, 6, 4))), 'Independence Day (Observed)')
  add(observeIfWeekend(new Date(Date.UTC(year, 10, 11))), 'Veterans Day (Observed)')
  add(observeIfWeekend(new Date(Date.UTC(year, 11, 25))), 'Christmas Day (Observed)')
  // Monday holidays
  add(nthWeekdayOfMonth(year, 0, 1, 3), 'Martin Luther King Jr. Day')
  add(nthWeekdayOfMonth(year, 1, 1, 3), "Presidents' Day")
  add(lastWeekdayOfMonth(year, 4, 1), 'Memorial Day')
  add(nthWeekdayOfMonth(year, 8, 1, 1), 'Labor Day')
  add(nthWeekdayOfMonth(year, 9, 1, 2), 'Indigenous Peoples/Columbus Day')
  // Thanksgiving: 4th Thu in Nov (weekday: 4)
  add(nthWeekdayOfMonth(year, 10, 4, 4), 'Thanksgiving Day')
  return map
}

function getHolidayName(dateStr: string): string | null {
  const d = new Date(dateStr + 'T00:00:00Z')
  const map = getUSHolidaysMap(d.getUTCFullYear())
  return map[dateStr] ?? null
}

function genSlotsForDate(dateStr: string): Slot[] {
  const now = new Date()
  const date = new Date(dateStr + 'T00:00:00')
  const holiday = getHolidayName(dateStr)
  if (holiday) return []
  if (isWeekend(date)) return []

  const slots: Slot[] = []
  for (let h = startHour; h < endHour; h++) {
    for (const m of [0, 30]) {
      const slot = new Date(date)
      slot.setHours(h, m, 0, 0)
      // If selected date is today, filter past times
      if (date.toDateString() === now.toDateString() && slot <= now) continue
      const iso = slot.toISOString()
      const label = slot.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
      })
      slots.push({ iso, label })
    }
  }
  return slots
}

export default function Scheduler() {
  const [date, setDate] = useState<string>(() => yyyyMmDd(nextBusinessDate(new Date())))
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmed, setConfirmed] = useState<Appointment | null>(null)
  const [icsUrl, setIcsUrl] = useState<string | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [date])

  const slots = useMemo(() => genSlotsForDate(date), [date])

  const canSubmit = selected && name.trim() && /@/.test(email)

  function handleConfirm() {
    if (!selected) return
    const appt: Appointment = { name: name.trim(), email: email.trim(), phone, notes, slot: selected }
    try {
      const key = 'gc_scheduled_consults'
      const current: Appointment[] = JSON.parse(localStorage.getItem(key) || '[]')
      current.push(appt)
      localStorage.setItem(key, JSON.stringify(current))
    } catch {
      // ignore persistence errors
    }
    // Build ICS and Google Calendar helpers
    const start = new Date(appt.slot)
    const end = new Date(start.getTime() + 30 * 60 * 1000)
    const toCal = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
    const dtstamp = toCal(new Date())
    const summary = 'Estate Planning Consultation (30 minutes)'
    const descriptionLines = [
      `Client: ${appt.name}`,
      `Email: ${appt.email}`,
      appt.phone ? `Phone: ${appt.phone}` : null,
      appt.notes ? `Notes: ${appt.notes}` : null,
    ].filter(Boolean) as string[]
    const description = descriptionLines.join('\\n')
    const organizer = COMPANY_INFO.email || 'info@iamatrust.com'
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Generation Catalyst//Consultation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@iamatrust.com`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${toCal(start)}`,
      `DTEND:${toCal(end)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `ORGANIZER;CN=Generation Catalyst:MAILTO:${organizer}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    try {
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      setIcsUrl(url)
    } catch {
      setIcsUrl(null)
    }

    // Fire-and-forget email via lightweight API endpoint if configured
    const emailPayload: any = {
      to: appt.email,
      name: appt.name,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      ics,
    }
    if (appt.notes) emailPayload.notes = appt.notes
    if (appt.phone) emailPayload.phone = appt.phone
    sendConfirmationEmail(emailPayload).catch(() => {})

    setConfirmed(appt)
  }

  if (confirmed) {
    const start = new Date(confirmed.slot)
    const end = new Date(start.getTime() + 30 * 60 * 1000)
    const toCal = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Estate Planning Consultation (30 minutes)')}&dates=${toCal(start)}/${toCal(end)}&details=${encodeURIComponent(`Client: ${confirmed.name}\nEmail: ${confirmed.email}${confirmed.phone ? `\nPhone: ${confirmed.phone}` : ''}${confirmed.notes ? `\nNotes: ${confirmed.notes}` : ''}`)}&location=${encodeURIComponent('Phone or Video — Generation Catalyst')}`
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 text-center mb-2">Consultation Scheduled</h3>
        <p className="text-neutral-700 text-center mb-6">
          {formatISOToReadable(confirmed.slot)} (30 minutes)
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-neutral-700 mb-6">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-neutral-500">Name</div>
            <div className="font-medium">{confirmed.name}</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-neutral-500">Email</div>
            <div className="font-medium">{confirmed.email}</div>
          </div>
        </div>
        <p className="text-neutral-600 text-center mb-6">
          Your booking is confirmed. Add it to your calendar or check your email for details.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {icsUrl && (
            <a href={icsUrl} download="consultation.ics" className="btn-primary text-center">
              Download .ics
            </a>
          )}
          <a href={googleUrl} target="_blank" rel="noreferrer" className="btn-outline text-center">
            Add to Google Calendar
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Date and slots */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">Choose a date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min={yyyyMmDd(new Date())}
              />
              <p className="text-xs text-neutral-500 mt-2">Business hours: Mon–Fri, 9:00 AM – 5:00 PM</p>
            </div>
          </div>

          {(() => {
            const holidayName = getHolidayName(date)
            if (holidayName) {
              return (
                <div className="p-6 bg-neutral-50 rounded-lg text-neutral-700">
                  Closed for US holiday: <span className="font-medium">{holidayName}</span>. Please choose another date.
                </div>
              )
            }
            if (isWeekend(new Date(date))) {
              return (
                <div className="p-6 bg-neutral-50 rounded-lg text-neutral-600">
                  We’re closed on weekends. Please select a weekday.
                </div>
              )
            }
            if (slots.length === 0) {
              return (
                <div className="p-6 bg-neutral-50 rounded-lg text-neutral-600">
                  No remaining times today. Pick another date.
                </div>
              )
            }
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((s) => (
                  <button
                    key={s.iso}
                    onClick={() => setSelected(s.iso)}
                    className={`px-3 py-2 rounded-lg text-sm border transition ${
                      selected === s.iso
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-400 hover:text-primary-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )
          })()}
        </div>
      </div>

      {/* Details */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Your details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                placeholder="jane@iamatrust.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Notes (optional)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                placeholder="Anything we should prepare before the call?"
              />
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!canSubmit}
            className="mt-6 w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {selected ? `Confirm ${formatISOToReadable(selected)} (30 min)` : 'Select a time'}
          </button>
          <p className="text-xs text-neutral-500 mt-3">We’ll email a confirmation and calendar invite.</p>
        </div>
      </div>
    </div>
  )
}
