# Client Portal User Guide

**Generation Catalyst Estate Planning - Client Portal Features**

This guide provides a brief overview of the client portal features and how to use them.

---

## Getting Started

### Registration & Login

1. **Create Account:** Navigate to `/client-portal` and click "Register"
   - Provide username, email, and password (minimum 8 characters)
   - Check email for verification link
   - Click verification link to activate account

2. **Login:** Use username/email and password
   - Optional: Enable 2FA for enhanced security
   - Access tokens expire after 15 minutes (auto-refresh)
   - Stay logged in for 7 days via refresh token

3. **Password Reset:** Click "Forgot Password" on login page
   - Enter registered email address
   - Check email for reset link (expires in 1 hour)
   - Set new password and auto-login

---

## Portal Dashboard

**Location:** `/client-portal/dashboard`

The dashboard provides an overview of your account:

- **Quick Stats:**
  - Total documents uploaded
  - Unread messages count
  - Pending invoices
  - Upcoming appointments

- **Recent Activity:**
  - Latest document uploads
  - Recent message threads
  - Payment status updates

- **Navigation:** Quick access to all portal sections

---

## Document Management

**Location:** `/client-portal/documents`

### Upload Documents

1. Click "Upload Document" button
2. Select file (PDF, Word, Excel, images, etc.)
3. Add optional metadata:
   - **Category:** estate, legal, tax, personal
   - **Description:** Brief note about the document
   - **Tags:** Comma-separated keywords for searching

**Supported Formats:**
- PDF, Word (.doc, .docx)
- Excel (.xls, .xlsx)
- PowerPoint (.ppt, .pptx)
- Images (JPEG, PNG, GIF, WebP, SVG)
- Text (.txt, .csv)
- ZIP archives

**File Limits:** 50MB maximum per file

### View Documents

- **List View:** All uploaded documents with metadata
- **Search:** Filter by name, category, or tags
- **Sort:** By date, name, or file type
- **Status:** Active or archived documents

### Download Documents

1. Click document name or download icon
2. System generates secure S3 signed URL (1-hour expiry)
3. File downloads directly to your device

**Security:** URLs expire after 1 hour for security

### Update Document Info

1. Click edit icon on document row
2. Update category, description, or tags
3. Rename file (metadata only, not actual filename)
4. Archive document (status: active → archived)

### Delete Documents

- Click delete icon
- Confirm deletion (permanent - removes from both database and S3 storage)

---

## Secure Messaging

**Location:** `/client-portal/messages`

### Send Message to Support

1. Click "New Message" button
2. Enter subject (optional)
3. Write message content
4. Set priority: low, normal, high, urgent
5. Attach documents (optional, by document ID)
6. Click "Send"

### Message Threads

- Messages automatically grouped by thread
- View conversation history
- Reply to existing threads
- See message status (read/unread)

### Message Features

- **Unread Count:** Badge showing unread messages
- **Auto-Mark Read:** Messages marked read when opened
- **Priority Levels:** Visual indicators for urgent messages
- **Pagination:** 20 messages per page (configurable up to 100)
- **Delete:** Soft delete (admin can still access if needed)

### WebSocket Real-Time Updates

- Real-time message delivery (when online)
- Instant notifications for new messages
- Auto-update message list without refresh

---

## Billing & Invoices

**Location:** `/client-portal/billing`

### View Invoices

- **Invoice List:** All invoices with status
- **Status Types:**
  - **Pending:** Payment not yet received
  - **Paid:** Payment confirmed
  - **Overdue:** Past due date
  - **Cancelled:** Invoice voided

### Invoice Details

Each invoice shows:
- Invoice number (unique identifier)
- Amount, tax, and total
- Due date
- Payment method (if paid)
- Line items breakdown
- Payment history notes

### Payment Status

- **View Stats:** Total amount, paid amount, outstanding balance
- **Update Status:** Mark invoice as paid (requires payment details)
- **Payment Methods:** Credit card, bank transfer, check, etc.

### Invoice Actions

- **Download:** Generate PDF invoice (if implemented)
- **View History:** See all invoices and payment records
- **Contact Support:** Message about billing questions

---

## Appointments

**Location:** `/client-portal/appointments`

### Schedule Appointment

1. View available time slots
2. Select preferred date/time
3. Choose meeting type:
   - In-person
   - Phone call
   - Video conference
4. Add notes or questions
5. Confirm appointment

### Manage Appointments

- **View Upcoming:** All scheduled appointments
- **Appointment Details:** Time, location, meeting type, notes
- **Status:** scheduled, completed, cancelled
- **Reschedule:** Update appointment time
- **Cancel:** Cancel appointment with notification

---

## Account Settings

**Location:** `/client-portal/settings`

### Profile Management

**Update Personal Information:**
- First name, last name
- Email address (requires re-verification)
- Phone number
- Mailing address (address, city, state, ZIP)

### Security Settings

**Change Password:**
1. Enter current password
2. Enter new password (min 8 characters)
3. Confirm new password
4. Submit (requires re-login)

**Two-Factor Authentication (2FA):**
1. Enable 2FA in settings
2. Scan QR code with authenticator app (Google Authenticator, Authy, etc.)
3. Enter 6-digit code to confirm
4. Save backup codes (use if phone is lost)
5. Required on every login after activation

**Email Verification:**
- Verify email to access full portal features
- Resend verification email if needed

### Account Status

- View account creation date
- See last login timestamp
- Check email verification status
- Review 2FA activation status

---

## Security Features

### Password Requirements

- Minimum 8 characters
- Mix of uppercase, lowercase, numbers recommended
- Validated on registration and password change

### Session Management

- **Access Tokens:** 15-minute expiry (auto-refresh)
- **Refresh Tokens:** 7-day expiry (httpOnly cookie)
- **Auto-Logout:** On token expiration
- **Secure Cookies:** httpOnly, secure (production), sameSite

### Data Protection

- **Bcrypt Hashing:** 10 rounds for password storage
- **Input Sanitization:** All user inputs sanitized
- **S3 Storage:** Documents stored in encrypted AWS S3
- **Signed URLs:** Temporary download links (1-hour expiry)
- **Role-Based Access:** Client/admin role separation

### Email Verification

- Required for account activation
- 24-hour token expiry
- Resend option available
- Auto-login after verification

---

## Common Tasks

### Upload and Share Documents with Your Attorney

1. Go to Documents section
2. Upload file with category "legal"
3. Add description: "For review"
4. Send message to support referencing document

### Check Payment Status

1. Go to Billing section
2. View invoice list
3. Check status column
4. Click invoice for detailed payment history

### Request Consultation

1. Go to Appointments section
2. Click "Schedule Appointment"
3. Select available time slot
4. Choose meeting type
5. Add consultation topics in notes

### Update Contact Information

1. Go to Settings section
2. Update profile fields
3. Save changes
4. Verify email if email changed

---

## Troubleshooting

### Can't Login

- **Wrong Password:** Use "Forgot Password" to reset
- **Account Deactivated:** Contact administrator
- **Email Not Verified:** Check email for verification link
- **2FA Issues:** Use backup code if authenticator unavailable

### Document Upload Fails

- **File Too Large:** Maximum 50MB per file
- **Unsupported Format:** Check allowed file types
- **Network Error:** Check internet connection and retry
- **S3 Configuration:** Contact support if persistent

### Messages Not Sending

- **Content Required:** Message content is mandatory
- **Invalid Recipient:** Verify recipient ID
- **Authentication Expired:** Refresh page to renew token

### Token Expired Error

- **Automatic Refresh:** Page should auto-refresh token
- **Manual Refresh:** Logout and login again
- **Clear Cookies:** Delete cookies if refresh fails

---

## Support & Contact

### Get Help

- **Secure Messaging:** Use portal messaging system
- **Email:** Contact support email (from website)
- **Phone:** Call during business hours
- **FAQ:** Check resources section

### Report Issues

- Send message with priority "urgent"
- Include error screenshots
- Describe steps to reproduce
- Provide browser and device info

---

## Best Practices

### Document Organization

- Use consistent naming conventions
- Add descriptive categories and tags
- Archive old documents
- Regular backups (download important files)

### Security Habits

- Enable 2FA for enhanced security
- Use strong, unique passwords
- Never share login credentials
- Logout on shared devices
- Keep email address current

### Communication

- Use subject lines for clarity
- Set appropriate priority levels
- Check messages regularly
- Respond to time-sensitive requests promptly

---

**Last Updated:** January 2025
**Portal Version:** 1.0
**For Technical Support:** Use in-portal messaging system
