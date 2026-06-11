// Lead capture sender. Posts to the configured email-marketing endpoint
// (ConvertKit, MailerLite, or any webhook) when one is set:
//   VITE_LEADS_API_URL=https://your-endpoint.example.com/subscribe
//   VITE_LEADS_API_KEY=secret (optional)

export type LeadPayload = {
  email: string
  name?: string
  phone?: string
  message?: string
  /** Where on the site the lead came from, e.g. "home-checklist" */
  source: string
}

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  const url = import.meta.env.VITE_LEADS_API_URL as string | undefined
  if (!url) {
    // No email service configured — capture is a no-op in this environment.
    console.warn('Lead capture endpoint not configured (VITE_LEADS_API_URL).')
    return false
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const apiKey = import.meta.env.VITE_LEADS_API_KEY as string | undefined
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
