import { useEffect, useRef, useState, useCallback } from 'react';
import { usePortalAuth } from '@/context/PortalAuthContext';
import { apiService, Message } from '@/services/api';

interface WebSocketMessage {
  type: 'message' | 'typing' | 'read' | 'ping' | 'pong' | 'error';
  data?: unknown;
}

// Type guards for WebSocket message data
function isMessage(data: unknown): data is Message {
  return typeof data === 'object' && data !== null && 'id' in data && 'text' in data;
}

function isTypingIndicator(data: unknown): data is { isTyping: boolean } {
  return typeof data === 'object' && data !== null && 'isTyping' in data;
}

function isReadConfirmation(data: unknown): data is { messageId: number } {
  return typeof data === 'object' && data !== null && 'messageId' in data;
}

function isErrorMessage(data: unknown): data is { error: string } {
  return typeof data === 'object' && data !== null && 'error' in data;
}

interface MessagingState {
  messages: Message[];
  connected: boolean;
  typing: boolean;
  error: string | null;
}

export const useMessaging = () => {
  const { isAuthenticated } = usePortalAuth();
  const [state, setState] = useState<MessagingState>({
    messages: [],
    connected: false,
    typing: false,
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;

  // Check if we're in a production environment that doesn't support WebSockets
  // Vercel serverless functions don't support persistent WebSocket connections
  const isProductionWithoutWebSocket = useCallback(() => {
    const hostname = window.location.hostname;
    return hostname.includes('vercel.app') || hostname.includes('iamatrust.com');
  }, []);

  const getWebSocketUrl = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostname = window.location.hostname;

    // For Replit
    if (hostname.includes('replit')) {
      return `${protocol}//${hostname}:3001/ws/messages`;
    }

    // For local development
    return `ws://localhost:3001/ws/messages`;
  }, []);

  const connect = useCallback(() => {
    // Skip WebSocket connection for production environments that don't support it
    // (Vercel serverless doesn't support WebSockets - use HTTP polling instead)
    if (isProductionWithoutWebSocket()) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const accessToken = apiService.getAccessToken();
    if (!accessToken) {
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const wsUrl = getWebSocketUrl();
      const ws = new WebSocket(`${wsUrl}?token=${accessToken}`);

      ws.onopen = () => {
        reconnectAttemptsRef.current = 0;
        setState(prev => ({ ...prev, connected: true, error: null }));
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          switch (message.type) {
            case 'message': {
              // New message received
              const msgData = message.data;
              if (isMessage(msgData)) {
                setState(prev => ({
                  ...prev,
                  messages: [...prev.messages, msgData],
                }));
              }
              break;
            }

            case 'typing': {
              // Typing indicator
              const typingData = message.data;
              if (isTypingIndicator(typingData)) {
                setState(prev => ({
                  ...prev,
                  typing: typingData.isTyping,
                }));
              }
              break;
            }

            case 'read': {
              // Message was read
              const readData = message.data;
              if (isReadConfirmation(readData)) {
                const messageId = readData.messageId;
                setState(prev => ({
                  ...prev,
                  messages: prev.messages.map(msg =>
                    msg.id === messageId
                      ? { ...msg, isRead: true }
                      : msg
                  ),
                }));
              }
              break;
            }

            case 'ping':
            case 'pong':
              // Heartbeat - no action needed
              break;

            case 'error': {
              const errData = message.data;
              if (isErrorMessage(errData)) {
                setState(prev => ({
                  ...prev,
                  error: errData.error,
                }));
              }
              break;
            }

            default:
              // Ignore unknown message types
              break;
          }
        } catch (_err) {
          // Ignore malformed messages
        }
      };

      ws.onerror = () => {
        setState(prev => ({
          ...prev,
          connected: false,
          error: 'Connection error',
        }));
      };

      ws.onclose = () => {
        setState(prev => ({ ...prev, connected: false }));

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);

          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            connect();
          }, delay);
        } else {
          setState(prev => ({
            ...prev,
            error: 'Failed to connect after multiple attempts',
          }));
        }
      };

      wsRef.current = ws;
    } catch (_err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to create connection',
      }));
    }
  }, [getWebSocketUrl, isAuthenticated, isProductionWithoutWebSocket]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setState(prev => ({ ...prev, connected: false }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Try WebSocket first
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({
          type: 'message',
          data: { content },
        }));
        return true;
      } catch (_err) {
        // Fall through to HTTP fallback
      }
    }

    // Fallback to HTTP
    try {
      const message = await apiService.sendMessage(content);
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, message],
        error: null
      }));
      return true;
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to send message',
      }));
      return false;
    }
  }, []);

  const sendTyping = useCallback((isTyping: boolean) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'typing',
        data: { isTyping },
      }));
    } catch (_err) {
      // Silently ignore typing indicator failures
    }
  }, []);

  const markAsRead = useCallback((messageId: number) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      // WebSocket not available - read status will sync on next poll/reconnect
      return;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'read',
        data: { messageId },
      }));
    } catch (_err) {
      // Silently ignore - read status will sync on next poll
    }
  }, []);

  const setMessages = useCallback((messages: Message[]) => {
    setState(prev => ({ ...prev, messages }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Polling for messages if WebSocket is not connected
  useEffect(() => {
    if (state.connected || !isAuthenticated) return;

    const pollInterval = setInterval(async () => {
      try {
        const msgs = await apiService.getMessages();
        setState(prev => {
          const lastNewMessageId = msgs.length > 0 ? msgs[msgs.length - 1]!.id : undefined;
          const lastExistingMessageId = prev.messages.length > 0 ? prev.messages[prev.messages.length - 1]!.id : undefined;

          if (msgs.length !== prev.messages.length || lastNewMessageId !== lastExistingMessageId) {
             return { ...prev, messages: msgs, error: null };
          }
          return prev;
        });
      } catch (_err) {
        // Polling error - will retry on next interval
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [state.connected, isAuthenticated]);

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    messages: state.messages,
    connected: state.connected,
    typing: state.typing,
    error: state.error,
    sendMessage,
    sendTyping,
    markAsRead,
    setMessages,
    clearError,
    reconnect: connect,
  };
};
