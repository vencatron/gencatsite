export type EmailPayload = {
  to: string
  name: string
  startISO: string
  endISO: string
  notes?: string | undefined
  phone?: string | undefined
  ics?: string | undefined
}

// Lightweight email sender. Posts to a configured endpoint.
// Configure in .env.local:
// - VITE_EMAIL_API_URL=https://your-endpoint.example.com/send
// - VITE_EMAIL_API_KEY=secret
export async function sendConfirmationEmail(payload: EmailPayload): Promise<boolean> {
  const url = import.meta.env.VITE_EMAIL_API_URL as string | undefined
  if (!url) return false

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  const apiKey = import.meta.env.VITE_EMAIL_API_KEY as string | undefined
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'consultation.confirmation',
        ...payload,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

