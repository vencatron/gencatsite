import { useEffect, useRef, useState } from 'react'
import { addMessage, listMessages, MessageRecord } from '@/utils/portalDb'
import { usePortalAuth } from '@/context/PortalAuthContext'

const PortalMessages = () => {
  const { user } = usePortalAuth()
  const [messages, setMessages] = useState<MessageRecord[]>([])
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  async function refresh() {
    const list = await listMessages()
    setMessages(list)
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    refresh()
  }, [])

  async function send() {
    const t = text.trim()
    if (!t) return
    setText('')
    await addMessage({ from: 'user', text: t })
    await refresh()
    // Simulated support reply
    setTimeout(async () => {
      await addMessage({ from: 'support', text: 'Thanks for your message! Our team will follow up shortly.' })
      await refresh()
    }, 800)
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">Secure Messages</h2>
        <p className="text-sm text-neutral-600">You’re messaging as {user?.email}</p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[75%] p-3 rounded-lg ${m.from === 'user' ? 'ml-auto bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
            <div className="text-xs opacity-80 mb-1">{m.from === 'user' ? 'You' : 'Support'}</div>
            <div className="whitespace-pre-wrap text-sm">{m.text}</div>
            <div className="text-[11px] opacity-70 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Type your message…"
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button onClick={send} className="btn-primary self-end">Send</button>
      </div>
    </div>
  )
}

export default PortalMessages

