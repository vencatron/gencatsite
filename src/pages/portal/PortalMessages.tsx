import { useEffect, useRef, useState } from 'react'
import { apiService } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { useNavigate } from 'react-router-dom'
import { useMessaging } from '@/hooks/useMessaging'

const PortalMessages = () => {
  const { user } = usePortalAuth()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [initialError, setInitialError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const {
    messages,
    connected,
    typing,
    error: wsError,
    sendMessage,
    sendTyping,
    setMessages,
    clearError,
    reconnect,
  } = useMessaging()

  // Load initial messages on mount
  useEffect(() => {
    async function loadInitialMessages() {
      try {
        setLoading(true)
        setInitialError(null)
        const msgs = await apiService.getMessages()
        setMessages(msgs)
      } catch (err) {
        console.error('Error fetching messages:', err)
        if (err.message?.includes('401')) {
          navigate('/client-portal')
        } else {
          setInitialError('Failed to load messages. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }
    loadInitialMessages()
  }, [navigate, setMessages])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleTextChange = (newText: string) => {
    setText(newText)

    // Send typing indicator
    if (newText.trim()) {
      sendTyping(true)

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Stop typing indicator after 2 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(false)
      }, 2000)
    } else {
      sendTyping(false)
    }
  }

  const handleSend = async () => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    // Send via WebSocket or HTTP Fallback
    const success = await sendMessage(trimmedText)

    if (success) {
      setText('')
      sendTyping(false)

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  const error = initialError || wsError

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Secure Messages</h2>
            <p className="text-sm text-neutral-600">You're messaging as {user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            {(() => {
              // Check if we're in production (Vercel) where HTTP polling is used
              const isProduction = window.location.hostname.includes('vercel.app') ||
                                   window.location.hostname.includes('iamatrust.com');

              if (isProduction) {
                // In production, always show green since HTTP polling is active
                return (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-neutral-600">Active</span>
                  </>
                );
              }

              // In development, show WebSocket connection status
              return (
                <>
                  <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-neutral-600">
                    {connected ? 'Connected' : 'Disconnected'}
                  </span>
                  {!connected && (
                    <button
                      onClick={reconnect}
                      className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                    >
                      Reconnect
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
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
            <div
              key={m.id}
              className={`max-w-[75%] p-3 rounded-lg transition-all ${
                m.from === 'user'
                  ? 'ml-auto bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-900'
              }`}
            >
              <div className="text-xs opacity-80 mb-1">
                {m.from === 'user' ? 'You' : 'Support'}
              </div>
              <div className="whitespace-pre-wrap text-sm">{m.text}</div>
              <div className="text-[11px] opacity-70 mt-1 flex items-center justify-between">
                <span>{new Date(m.createdAt).toLocaleString()}</span>
                {m.from === 'user' && (
                  <span className="ml-2">{m.isRead ? '✓✓' : '✓'}</span>
                )}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-neutral-500 py-8">
              No messages yet. Start a conversation below.
            </div>
          )}
          {typing && (
            <div className="max-w-[75%] p-3 rounded-lg bg-neutral-100 text-neutral-900">
              <div className="text-xs opacity-80 mb-1">Support</div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          rows={2}
          placeholder="Type your message… (Press Enter to send)"
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !text.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default PortalMessages
