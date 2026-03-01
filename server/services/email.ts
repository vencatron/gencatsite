import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter | null = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      if (!process.env.SMTP_HOST) {
        console.warn('Email service: Missing SMTP host configuration, email sending will be disabled');
        return;
      }

      // Check if we're using Google Workspace SMTP relay without auth
      const isGoogleRelay = process.env.SMTP_HOST === 'smtp-relay.gmail.com';
      const requiresAuth = process.env.SMTP_USER && process.env.SMTP_PASS;

      interface SmtpConfig {
        host: string;
        port: number;
        secure: boolean;
        requireTLS?: boolean;
        auth?: {
          user: string;
          pass: string;
        };
      }

      const config: SmtpConfig = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      };

      // Only add auth if credentials are provided
      if (requiresAuth) {
        config.auth = {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        };
      } else if (isGoogleRelay) {
        // Google Workspace relay without auth (requires IP whitelisting in Google Admin)
        console.log('Using Google Workspace SMTP relay without authentication');
        config.secure = false;
        config.requireTLS = true;
      }

      this.transporter = nodemailer.createTransport(config);
      this.isInitialized = true;
      console.log('Email service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
    }
  }

  /**
   * Generate a secure verification token
   */
  generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate a 6-digit verification code for simpler verification flows
   */
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Send an email
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.isInitialized || !this.transporter) {
      console.warn('Email service not initialized, skipping email send');
      return false;
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@iamatrust.com',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  /**
   * Send email verification email
   */
  async sendVerificationEmail(email: string, username: string, verificationToken: string): Promise<boolean> {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f7f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #b19373;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #b19373;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: 600;
          }
          .button:hover {
            background-color: #9a7e5f;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .logo {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #b19373;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Generation Catalyst</div>
          <h1>Welcome, ${username}!</h1>
          <p>Thank you for registering with Generation Catalyst. To complete your registration and access your client portal, please verify your email address.</p>

          <a href="${verificationUrl}" class="button">Verify Email Address</a>

          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666; font-size: 14px;">${verificationUrl}</p>

          <p>This link will expire in 24 hours for security purposes.</p>

          <div class="footer">
            <p>If you didn't create an account with Generation Catalyst, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} Generation Catalyst. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Welcome to Generation Catalyst, ${username}!

Please verify your email address by clicking the link below:
${verificationUrl}

This link will expire in 24 hours.

If you didn't create an account with Generation Catalyst, please ignore this email.

Best regards,
Generation Catalyst Team
    `;

    return this.sendEmail({
      to: email,
      subject: 'Verify Your Email - Generation Catalyst',
      html,
      text,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, username: string, resetToken: string): Promise<boolean> {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f7f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #b19373;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #b19373;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: 600;
          }
          .button:hover {
            background-color: #9a7e5f;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .logo {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #b19373;
            margin-bottom: 20px;
          }
          .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Generation Catalyst</div>
          <h1>Password Reset Request</h1>
          <p>Hello ${username},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>

          <a href="${resetUrl}" class="button">Reset Password</a>

          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666; font-size: 14px;">${resetUrl}</p>

          <div class="warning">
            <strong>Important:</strong> This link will expire in 1 hour for security purposes.
          </div>

          <div class="footer">
            <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>&copy; ${new Date().getFullYear()} Generation Catalyst. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Hello ${username},

We received a request to reset your password for your Generation Catalyst account.

Please click the link below to reset your password:
${resetUrl}

This link will expire in 1 hour for security purposes.

If you didn't request a password reset, please ignore this email or contact support if you have concerns.

Best regards,
Generation Catalyst Team
    `;

    return this.sendEmail({
      to: email,
      subject: 'Password Reset Request - Generation Catalyst',
      html,
      text,
    });
  }

  /**
   * Send 2FA setup confirmation email
   */
  async send2FASetupEmail(email: string, username: string): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Two-Factor Authentication Enabled</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f7f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #b19373;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #155724;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .logo {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #b19373;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Generation Catalyst</div>
          <h1>Two-Factor Authentication Enabled</h1>

          <div class="success">
            <strong>Success!</strong> Two-factor authentication has been successfully enabled for your account.
          </div>

          <p>Hello ${username},</p>
          <p>Your account is now protected with an additional layer of security. You will need to enter a verification code from your authenticator app each time you log in.</p>

          <h3>Important Reminders:</h3>
          <ul>
            <li>Keep your backup codes in a safe place</li>
            <li>Don't lose access to your authenticator device</li>
            <li>Contact support immediately if you suspect unauthorized access</li>
          </ul>

          <div class="footer">
            <p>If you didn't enable 2FA on your account, please contact our support team immediately.</p>
            <p>&copy; ${new Date().getFullYear()} Generation Catalyst. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Hello ${username},

Two-factor authentication has been successfully enabled for your Generation Catalyst account.

Your account is now protected with an additional layer of security. You will need to enter a verification code from your authenticator app each time you log in.

Important Reminders:
- Keep your backup codes in a safe place
- Don't lose access to your authenticator device
- Contact support immediately if you suspect unauthorized access

If you didn't enable 2FA on your account, please contact our support team immediately.

Best regards,
Generation Catalyst Team
    `;

    return this.sendEmail({
      to: email,
      subject: 'Two-Factor Authentication Enabled - Generation Catalyst',
      html,
      text,
    });
  }

  /**
   * Send invoice email to client
   */
  async sendInvoiceEmail(
    email: string,
    clientName: string,
    invoice: {
      invoiceNumber: string;
      amount: string;
      tax?: string;
      totalAmount: string;
      description?: string;
      dueDate: Date;
      lineItems?: Array<{ description: string; amount: string }>;
    }
  ): Promise<boolean> {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
    const portalUrl = `${baseUrl}/client-portal/billing`;
    const formattedDueDate = new Date(invoice.dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Build line items HTML if available
    let lineItemsHtml = '';
    if (invoice.lineItems && invoice.lineItems.length > 0) {
      lineItemsHtml = `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f8f7f4;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #b19373;">Description</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #b19373;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.lineItems.map(item => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.description}</td>
                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #eee;">$${parseFloat(item.amount).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice from Generation Catalyst</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f7f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #b19373;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #b19373;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: 600;
          }
          .button:hover {
            background-color: #9a7e5f;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .logo {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #b19373;
            margin-bottom: 20px;
          }
          .invoice-box {
            background-color: #f8f7f4;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          .invoice-total {
            font-size: 24px;
            font-weight: bold;
            color: #b19373;
            margin-top: 10px;
          }
          .due-date {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            border-radius: 5px;
            padding: 12px;
            margin: 15px 0;
            color: #856404;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Generation Catalyst</div>
          <h1>New Invoice</h1>

          <p>Hello ${clientName},</p>
          <p>A new invoice has been created for your account. Please review the details below:</p>

          <div class="invoice-box">
            <div style="margin-bottom: 15px;">
              <strong>Invoice #:</strong> ${invoice.invoiceNumber}
            </div>
            ${invoice.description ? `<div style="margin-bottom: 15px;"><strong>Description:</strong> ${invoice.description}</div>` : ''}

            ${lineItemsHtml}

            <div style="border-top: 2px solid #b19373; padding-top: 15px; margin-top: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>Subtotal:</span>
                <span>$${parseFloat(invoice.amount).toFixed(2)}</span>
              </div>
              ${invoice.tax && parseFloat(invoice.tax) > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>Tax:</span>
                  <span>$${parseFloat(invoice.tax).toFixed(2)}</span>
                </div>
              ` : ''}
              <div class="invoice-total" style="display: flex; justify-content: space-between;">
                <span>Total Due:</span>
                <span>$${parseFloat(invoice.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="due-date">
            <strong>Due Date:</strong> ${formattedDueDate}
          </div>

          <p>To pay this invoice, please log in to your client portal:</p>

          <a href="${portalUrl}" class="button">Pay Invoice</a>

          <p style="font-size: 14px; color: #666;">
            Or copy and paste this link into your browser:<br>
            <span style="word-break: break-all;">${portalUrl}</span>
          </p>

          <div class="footer">
            <p>If you have any questions about this invoice, please contact our support team.</p>
            <p>&copy; ${new Date().getFullYear()} Generation Catalyst. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Build line items text if available
    let lineItemsText = '';
    if (invoice.lineItems && invoice.lineItems.length > 0) {
      lineItemsText = '\nLine Items:\n' + invoice.lineItems.map(item =>
        `  - ${item.description}: $${parseFloat(item.amount).toFixed(2)}`
      ).join('\n') + '\n';
    }

    const text = `
Hello ${clientName},

A new invoice has been created for your account.

Invoice Details:
----------------
Invoice #: ${invoice.invoiceNumber}
${invoice.description ? `Description: ${invoice.description}\n` : ''}${lineItemsText}
Subtotal: $${parseFloat(invoice.amount).toFixed(2)}
${invoice.tax && parseFloat(invoice.tax) > 0 ? `Tax: $${parseFloat(invoice.tax).toFixed(2)}\n` : ''}Total Due: $${parseFloat(invoice.totalAmount).toFixed(2)}

Due Date: ${formattedDueDate}

To pay this invoice, please log in to your client portal:
${portalUrl}

If you have any questions about this invoice, please contact our support team.

Best regards,
Generation Catalyst Team
    `;

    return this.sendEmail({
      to: email,
      subject: `Invoice #${invoice.invoiceNumber} from Generation Catalyst - $${parseFloat(invoice.totalAmount).toFixed(2)} Due`,
      html,
      text,
    });
  }

  /**
   * Send payment receipt email
   */
  async sendPaymentReceiptEmail(
    email: string,
    clientName: string,
    payment: {
      invoiceNumber: string;
      amount: string;
      paymentDate: Date;
      paymentMethod?: string;
    }
  ): Promise<boolean> {
    const formattedDate = new Date(payment.paymentDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Receipt - Generation Catalyst</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f7f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #b19373;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .logo {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #b19373;
            margin-bottom: 20px;
          }
          .success-box {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .success-icon {
            font-size: 48px;
            color: #28a745;
            margin-bottom: 10px;
          }
          .receipt-details {
            background-color: #f8f7f4;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .receipt-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .receipt-row:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Generation Catalyst</div>

          <div class="success-box">
            <div class="success-icon">✓</div>
            <h1 style="margin: 0;">Payment Received</h1>
            <p style="margin: 10px 0 0 0; color: #155724;">Thank you for your payment!</p>
          </div>

          <p>Hello ${clientName},</p>
          <p>We've received your payment. Here are the details for your records:</p>

          <div class="receipt-details">
            <div class="receipt-row">
              <span>Invoice Number:</span>
              <span>#${payment.invoiceNumber}</span>
            </div>
            <div class="receipt-row">
              <span>Payment Date:</span>
              <span>${formattedDate}</span>
            </div>
            ${payment.paymentMethod ? `
              <div class="receipt-row">
                <span>Payment Method:</span>
                <span>${payment.paymentMethod}</span>
              </div>
            ` : ''}
            <div class="receipt-row">
              <span>Amount Paid:</span>
              <span>$${parseFloat(payment.amount).toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for your business. If you have any questions, please don't hesitate to contact us.</p>
            <p>&copy; ${new Date().getFullYear()} Generation Catalyst. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Hello ${clientName},

Payment Received - Thank you!

We've received your payment. Here are the details for your records:

Invoice Number: #${payment.invoiceNumber}
Payment Date: ${formattedDate}
${payment.paymentMethod ? `Payment Method: ${payment.paymentMethod}\n` : ''}Amount Paid: $${parseFloat(payment.amount).toFixed(2)}

Thank you for your business. If you have any questions, please don't hesitate to contact us.

Best regards,
Generation Catalyst Team
    `;

    return this.sendEmail({
      to: email,
      subject: `Payment Receipt - Invoice #${payment.invoiceNumber} - Generation Catalyst`,
      html,
      text,
    });
  }

  /**
   * Verify email service connection
   */
  async verifyConnection(): Promise<boolean> {
    if (!this.isInitialized || !this.transporter) {
      console.warn('Email service not initialized');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('Email service connection verified');
      return true;
    } catch (error) {
      console.error('Email service connection verification failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();