import { FormEvent, useState } from 'react'
import Seo from '@/components/common/Seo'
import Scheduler from '@/components/common/Scheduler'
import { COMPANY_INFO, CONTACT_FORM_DISCLAIMER } from '@/utils/constants'
import { submitLead } from '@/utils/leads'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    const delivered = await submitLead({ ...form, source: 'contact-inquiry' })
    if (!delivered) {
      // No inquiry endpoint configured — hand off to the visitor's email client
      // so the message still reaches us.
      const subject = encodeURIComponent('Inquiry from iamatrust.com')
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
      )
      window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`
    }
    setStatus('done')
  }

  return (
    <div>
      <Seo
        title="Contact | Book a Family Planning Conversation | Generation Catalyst"
        description="Book a Family Planning Conversation or send a general inquiry. Based in Pomona, California — serving LA County, the San Gabriel Valley, and remote clients nationwide."
        path="/contact"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="heading-lg mb-5">Start the conversation</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Book a Family Planning Conversation directly below, or send a general inquiry and
              we’ll reach out. Either way, there’s no obligation — the first step is always just
              a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="section-padding" id="book">
        <div className="container-width">
          <div className="max-w-3xl mb-8">
            <h2 className="heading-md mb-3">Book a Family Planning Conversation</h2>
            <p className="text-neutral-700 leading-relaxed">
              Choose a time that works for your family. You’ll receive a confirmation and a short
              intake questionnaire so the session starts at altitude.
            </p>
          </div>
          <Scheduler />
        </div>
      </section>

      {/* Inquiry + info */}
      <section className="pb-16 lg:pb-24">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="card">
              <h2 className="heading-sm mb-6">General inquiry</h2>
              {status === 'done' ? (
                <div className="rounded-lg bg-primary-50 border border-primary-200 p-6">
                  <p className="font-medium text-primary-900 mb-1">Thank you.</p>
                  <p className="text-sm text-neutral-700">
                    We’ve received your message and will reach out to schedule a no-obligation
                    initial conversation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label-field">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-field">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label-field">
                      Phone <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="label-field">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field"
                      placeholder="Tell us a little about your situation and what you’re looking for…"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
                  </button>
                  <p className="legal-disclaimer">{CONTACT_FORM_DISCLAIMER}</p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="heading-sm mb-5">Reach us directly</h2>
                <div className="space-y-4 text-neutral-700">
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-neutral-800 mb-1">Email</h3>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-primary-700 hover:text-primary-800"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-neutral-800 mb-1">
                      Service area
                    </h3>
                    <p className="text-sm leading-relaxed">{COMPANY_INFO.serviceArea}.</p>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-neutral-800 mb-1">Hours</h3>
                    <p className="text-sm">{COMPANY_INFO.hours.weekdays}</p>
                    <p className="text-sm">{COMPANY_INFO.hours.weekends}</p>
                  </div>
                </div>
              </div>
              <div className="card bg-neutral-100">
                <h2 className="font-serif text-lg font-semibold text-primary-900 mb-3">
                  Looking for legal help?
                </h2>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  We are not a law firm and cannot answer legal questions. If you need an estate
                  planning attorney, we’re glad to make an introduction from our vetted partner
                  network — just mention it in your inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
