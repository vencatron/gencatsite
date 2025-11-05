import { useEffect, useRef, useState, useCallback } from 'react';
import { usePortalAuth } from '@/context/PortalAuthContext';
import { Message } from '@/services/api';

interface WebSocketMessage {
  type: 'message' | 'typing' | 'read' | 'ping' | 'pong' | 'error';
  data?: any;
}

interface MessagingState {
  messages: Message[];
  connected: boolean;
  typing: boolean;
  error: string | null;
}

export const useMessaging = () => {
  const { accessToken } = usePortalAuth();
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

  const getWebSocketUrl = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostname = window.location.hostname;

    // For Vercel deployment
    if (hostname.includes('vercel.app') || hostname.includes('iamatrust.com')) {
      return `${protocol}//${hostname}/ws/messages`;
    }

    // For Replit
    if (hostname.includes('replit')) {
      return `${protocol}//${hostname}:3001/ws/messages`;
    }

    // For local development
    return `ws://localhost:3001/ws/messages`;
  }, []);

  const connect = useCallback(() => {
    if (!accessToken) {
      console.log('No access token, skipping WebSocket connection');
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    try {
      const wsUrl = getWebSocketUrl();
      const ws = new WebSocket(`${wsUrl}?token=${accessToken}`);

      ws.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttemptsRef.current = 0;
        setState(prev => ({ ...prev, connected: true, error: null }));
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          switch (message.type) {
            case 'message':
              // New message received
              setState(prev => ({
                ...prev,
                messages: [...prev.messages, message.data],
              }));
              break;

            case 'typing':
              // Typing indicator
              setState(prev => ({
                ...prev,
                typing: message.data.isTyping,
              }));
              break;

            case 'read':
              // Message was read
              setState(prev => ({
                ...prev,
                messages: prev.messages.map(msg =>
                  msg.id === message.data.messageId
                    ? { ...msg, isRead: true }
                    : msg
                ),
              }));
              break;

            case 'ping':
            case 'pong':
              // Heartbeat - no action needed
              break;

            case 'error':
              console.error('WebSocket error message:', message.data);
              setState(prev => ({
                ...prev,
                error: message.data.error,
              }));
              break;

            default:
              console.log('Unknown message type:', message.type);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setState(prev => ({
          ...prev,
          connected: false,
          error: 'Connection error',
        }));
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setState(prev => ({ ...prev, connected: false }));

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${MAX_RECONNECT_ATTEMPTS})`);

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
    } catch (err) {
      console.error('Error creating WebSocket:', err);
      setState(prev => ({
        ...prev,
        error: 'Failed to create connection',
      }));
    }
  }, [accessToken, getWebSocketUrl]);

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

  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      setState(prev => ({
        ...prev,
        error: 'Not connected to server',
      }));
      return false;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        data: { content },
      }));
      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      setState(prev => ({
        ...prev,
        error: 'Failed to send message',
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
    } catch (err) {
      console.error('Error sending typing indicator:', err);
    }
  }, []);

  const markAsRead = useCallback((messageId: number) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'read',
        data: { messageId },
      }));
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  }, []);

  const setMessages = useCallback((messages: Message[]) => {
    setState(prev => ({ ...prev, messages }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

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
