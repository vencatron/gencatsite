import { FormEvent, ReactNode, useState } from 'react'
import { submitLead } from '@/utils/leads'

interface EmailCaptureProps {
  /** Identifies where the signup came from, e.g. "home-checklist" */
  source: string
  heading: string
  description: string
  buttonLabel?: string
  /** Shown after a successful signup — e.g. download links for gated resources */
  successContent?: ReactNode
  dark?: boolean
}

const EmailCapture = ({
  source,
  heading,
  description,
  buttonLabel = 'Get the checklist',
  successContent,
  dark = false,
}: EmailCaptureProps) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || status === 'submitting') return
    setStatus('submitting')
    await submitLead({ email, source })
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div className={`rounded-xl p-8 ${dark ? 'bg-primary-900 text-white' : 'bg-accent-50 border border-accent-200'}`}>
        <h3 className={`heading-sm mb-2 ${dark ? 'text-white' : ''}`}>You’re all set.</h3>
        <p className={`text-sm mb-4 ${dark ? 'text-neutral-200' : 'text-neutral-700'}`}>
          Thanks — your resources are ready below.
        </p>
        {successContent}
      </div>
    )
  }

  return (
    <div className={`rounded-xl p-8 ${dark ? 'bg-primary-900' : 'bg-accent-50 border border-accent-200'}`}>
      <h3 className={`heading-sm mb-2 ${dark ? 'text-white' : ''}`}>{heading}</h3>
      <p className={`text-sm mb-5 ${dark ? 'text-neutral-200' : 'text-neutral-700'}`}>{description}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary whitespace-nowrap" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'One moment…' : buttonLabel}
        </button>
      </form>
      <p className={`text-xs mt-3 ${dark ? 'text-neutral-300' : 'text-neutral-500'}`}>
        We’ll send the checklist plus occasional educational content. No spam, unsubscribe anytime.
      </p>
    </div>
  )
}

export default EmailCapture
