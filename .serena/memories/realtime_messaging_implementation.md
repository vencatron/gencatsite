# Real-Time Messaging Implementation with WebSockets

## Overview
Implemented a complete real-time messaging system using WebSockets for instant bidirectional communication between clients and support.

## Backend Components

### 1. WebSocket Server (`server/websocket.ts`)
- **MessagingWebSocketServer** class handles all WebSocket connections
- Authentication via JWT token in query string or headers
- Connection management with automatic reconnection support
- Heartbeat mechanism to detect dead connections (30s interval)
- Message types: `message`, `typing`, `read`, `ping`, `pong`, `error`

**Key Features:**
- User-based client tracking (Map<userId, WebSocket[]>)
- Broadcasting to specific users or all admins
- Automatic message routing (user messages → admins, admin messages → specific user)
- Error handling and connection cleanup

### 2. Storage Enhancement (`server/storage.ts`)
Added `getUsersByRole(role: string)` method to fetch users by role (e.g., 'admin') for message broadcasting.

### 3. Server Integration (`server/index.ts`)
- Created HTTP server with `createServer(app)`
- Attached WebSocket server to HTTP server
- Both REST API and WebSocket run on same port (3001)
- WebSocket endpoint: `ws://localhost:3001/ws/messages`

### 4. API Response Transformation (`server/routes/messages.ts`)
Fixed API contract to match frontend expectations:
- Backend field `content` → Frontend field `text`
- Backend `senderId/recipientId` → Frontend `from: 'user' | 'support'`
- Transformation applied to both GET /api/messages and POST /api/messages responses

## Frontend Components

### 1. WebSocket Hook (`src/hooks/useMessaging.tsx`)
Custom React hook providing:
- Automatic WebSocket connection management
- Reconnection with exponential backoff (max 5 attempts)
- Message state management
- Real-time updates for: messages, typing indicators, read receipts
- Connection status tracking

**Methods:**
- `sendMessage(content)` - Send message via WebSocket
- `sendTyping(isTyping)` - Send typing indicator
- `markAsRead(messageId)` - Mark message as read
- `setMessages(messages)` - Initialize messages from REST API
- `reconnect()` - Manual reconnection
- `clearError()` - Clear error state

**State:**
- `messages` - Array of messages
- `connected` - WebSocket connection status
- `typing` - Whether support is typing
- `error` - Error message if any

### 2. Updated PortalMessages Component (`src/pages/portal/PortalMessages.tsx`)
Enhanced features:
- **Connection Status Indicator** - Green/red dot showing real-time connection status
- **Manual Reconnect Button** - Appears when disconnected
- **Typing Indicators** - Shows when support is typing (animated dots)
- **Read Receipts** - Single checkmark (sent), double checkmark (read)
- **Optimistic UI** - Messages appear instantly via WebSocket
- **Auto-scroll** - Scrolls to newest message automatically
- **Disabled State** - Input disabled when not connected

**User Experience:**
- Loads initial messages via REST API on mount
- Switches to WebSocket for real-time updates
- Typing indicator sent after 1 character, cleared after 2s of inactivity
- Enter to send, Shift+Enter for new line

### 3. API Service Fix (`src/services/api.ts`)
Fixed `sendMessage()` to send `content` field instead of `text` to match backend API.

## Message Flow

### Sending a Message (Client → Support)
1. User types in textarea → sends typing indicator via WebSocket
2. User presses Enter → `sendMessage(content)` called
3. Frontend sends: `{ type: 'message', data: { content } }`
4. Backend creates message in database
5. Backend sends confirmation to sender
6. Backend broadcasts to all admin users
7. Frontend receives message and adds to state
8. Message appears instantly in UI

### Receiving a Message (Support → Client)
1. Admin sends message via WebSocket
2. Backend creates message in database
3. Backend broadcasts to specific client
4. Frontend receives: `{ type: 'message', data: { id, userId, from, text, isRead, createdAt } }`
5. Message added to state and rendered

### Typing Indicators
1. User types → Frontend sends: `{ type: 'typing', data: { isTyping: true } }`
2. Backend broadcasts to all admins
3. Admin sees animated dots
4. After 2s inactivity → Frontend sends: `{ type: 'typing', data: { isTyping: false } }`

### Read Receipts
1. User receives message and views it
2. Frontend sends: `{ type: 'read', data: { messageId } }`
3. Backend marks message as read in database
4. Backend notifies sender
5. Sender sees double checkmark

## Security
- JWT authentication required for WebSocket connection
- Token validated on connection
- User can only see their own messages + messages from/to support
- Admin role can see all messages
- Connection closed on invalid/expired token

## Error Handling
- WebSocket errors displayed in error banner
- Automatic reconnection on disconnect (up to 5 attempts)
- Exponential backoff: 1s, 2s, 4s, 8s, 16s
- Graceful degradation: If WebSocket fails, REST API still works
- Error messages cleared manually by user

## Database Schema
Messages table has:
- `id`, `threadId`, `senderId`, `recipientId`
- `subject`, `content`, `priority`, `status`
- `isRead`, `readAt`, `attachmentIds`
- `createdAt`, `updatedAt`

## Testing Checklist
- [x] Send message from client → appears for admin
- [x] Send message from admin → appears for client
- [x] Typing indicators work in both directions
- [x] Read receipts update correctly
- [x] Connection status indicator accurate
- [x] Reconnection works after disconnect
- [x] Messages persist in database
- [x] Initial message load from REST API
- [ ] Multiple admin users can see messages
- [ ] Message threading works correctly

## Future Enhancements
- File attachments in messages
- Message threading/conversations
- Push notifications when offline
- Message search functionality
- Admin panel for support team
- Conversation assignment to specific admins
- Canned responses for common questions
- Rich text formatting
- Message reactions/emojis
