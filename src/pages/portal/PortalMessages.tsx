import { useEffect, useRef, useState } from 'react'
import { apiService, Message } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { useNavigate } from 'react-router-dom'

const PortalMessages = () => {
  const { user } = usePortalAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  async function refresh() {
    try {
      setLoading(true)
      setError(null)
      const msgs = await apiService.getMessages()
      setMessages(msgs)
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (err: any) {
      console.error('Error fetching messages:', err)
      if (err.message?.includes('401')) {
        navigate('/client-portal')
      } else {
        setError('Failed to load messages. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function send() {
    const t = text.trim()
    if (!t) return
    setSending(true)
    setError(null)
    setText('')
    
    try {
      await apiService.sendMessage(t)
      await refresh()
    } catch (err: any) {
      console.error('Error sending message:', err)
      setError('Failed to send message. Please try again.')
      setText(t) // Restore the text if sending failed
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">Secure Messages</h2>
        <p className="text-sm text-neutral-600">You're messaging as {user?.email}</p>
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex-1 flex items-center justify-center rounded-xl border border-neutral-200 bg-white">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-neutral-600">Loading messages...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[75%] p-3 rounded-lg ${m.from === 'user' ? 'ml-auto bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
              <div className="text-xs opacity-80 mb-1">{m.from === 'user' ? 'You' : 'Support'}</div>
              <div className="whitespace-pre-wrap text-sm">{m.text}</div>
              <div className="text-[11px] opacity-70 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-neutral-500 py-8">
              No messages yet. Start a conversation below.
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          rows={2}
          placeholder="Type your message… (Press Enter to send)"
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={sending}
        />
        <button onClick={send} className="btn-primary self-end" disabled={sending || !text.trim()}>
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default PortalMessages