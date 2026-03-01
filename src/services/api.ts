// API Service Layer for Client Portal
// Handles all backend communication with proper TypeScript types

// API Configuration
export const ACCESS_TOKEN_STORAGE_KEY = 'portalAccessToken';

const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering
    return '';
  }
  
  // Use relative URL for both production and local development
  // In production: Vercel handles routing
  // In local dev: 'vercel dev' handles routing to /api and frontend
  return '';
};

const API_URL = getApiUrl();

// TypeScript Types for API Responses
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  role: 'client' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  documentCount?: number;
  hasInvoice?: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  emailVerificationRequired?: boolean;
  requires2FA?: boolean;
  userId?: number;
  tempToken?: string;
}

export interface Document {
  id: number;
  userId: number;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  metadata?: Record<string, unknown>;
}

export interface Message {
  id: number;
  userId: number;
  from: 'user' | 'support';
  text: string;
  isRead: boolean;
  createdAt: string;
}

export interface Invoice {
  id: number;
  userId: number;
  invoiceNumber: string;
  amount: number | string;
  tax?: number | string;
  totalAmount?: number | string;
  currency?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'processing';
  dueDate: string;
  paidDate: string | null;
  paymentMethod?: string | null;
  description: string | null;
  lineItems?: string | null;
  stripePaymentIntentId?: string | null;
  stripeCustomerId?: string | null;
  stripePaymentStatus?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  error: string;
  details?: string | string[];
}

// Custom error class for API responses with typed response data
export class ApiServiceError extends Error {
  public response: {
    status: number;
    data: Record<string, unknown>;
  };

  constructor(message: string, status: number, data: Record<string, unknown>) {
    super(message);
    this.name = 'ApiServiceError';
    this.response = { status, data };
  }
}

export interface RecentUser {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  documentCount?: number;
  hasInvoice?: boolean;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalDocuments: number;
  totalMessages: number;
  unreadMessages: number;
  totalInvoices: number;
  pendingInvoices: number;
  totalRevenue: number;
  recentUsers: RecentUser[];
}

// Helper function for API calls with proper error handling
class ApiService {
  private accessToken: string | null = null;
  
  constructor() {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (storedToken) {
        this.accessToken = storedToken;
      }
    }
  }

  // Set the access token
  setAccessToken(token: string | null) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
      } else {
        window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      }
    }
  }

  // Get the access token
  getAccessToken() {
    return this.accessToken;
  }

  // Base fetch wrapper with authentication
  private async fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> || {}),
    };

    const isFormDataBody = typeof FormData !== 'undefined' && options.body instanceof FormData;

    if (!isFormDataBody && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    // Add authorization header if we have a token
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: headers as HeadersInit,
      credentials: 'include', // Always include cookies for refresh tokens
    });

    // Handle 401 - try to refresh token
    if (response.status === 401 && url !== '/api/auth/refresh') {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Retry the original request with new token
        headers['Authorization'] = `Bearer ${this.accessToken}`;
        return fetch(`${API_URL}${url}`, {
          ...options,
          headers: headers as HeadersInit,
          credentials: 'include',
        });
      }
    }

    return response;
  }

  // Parse response and handle errors
  private async handleResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    let data: Record<string, unknown> = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
    }

    if (!response.ok) {
      const errorMessageParts = [];
      if (data?.error) {
        errorMessageParts.push(data.error);
      }
      if (data?.details) {
        errorMessageParts.push(data.details);
      }

      const message =
        errorMessageParts.length > 0
          ? errorMessageParts.join(': ')
          : `HTTP error! status: ${response.status}`;

      // Create a typed error that preserves the response data
      throw new ApiServiceError(message, response.status, data as Record<string, unknown>);
    }

    // Cast the parsed JSON to the expected type
    // Note: This is a runtime trust boundary - the caller is responsible for
    // ensuring the response matches the expected type T
    return data as T;
  }

  // Authentication APIs
  async register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string
  ): Promise<AuthResponse> {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      }),
    });

    const data = await this.handleResponse<AuthResponse>(response);
    
    // Store the access token
    if (data.accessToken) {
      this.setAccessToken(data.accessToken);
    }
    
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse<AuthResponse>(response);
    
    // Store the access token
    if (data.accessToken) {
      this.setAccessToken(data.accessToken);
    }
    
    return data;
  }

  async logout(): Promise<void> {
    try {
      const response = await this.fetchWithAuth('/api/auth/logout', {
        method: 'POST',
      });
      
      await this.handleResponse(response);
    } finally {
      // Clear the access token regardless
      this.setAccessToken(null);
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        return false;
      }

      const data = await this.handleResponse<{ accessToken: string }>(response);
      
      if (data.accessToken) {
        this.setAccessToken(data.accessToken);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  async getMe(): Promise<User> {
    const response = await this.fetchWithAuth('/api/auth/me');
    const data = await this.handleResponse<{ user: User }>(response);
    return data.user;
  }

  // User Profile APIs
  async getUserProfile(): Promise<User> {
    const response = await this.fetchWithAuth('/api/users/profile');
    const data = await this.handleResponse<{ profile: User }>(response);
    return data.profile;
  }

  async updateUserProfile(updates: Partial<User>): Promise<User> {
    const response = await this.fetchWithAuth('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    const data = await this.handleResponse<{ profile: User }>(response);
    return data.profile;
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<{ message: string }> {
    const response = await this.fetchWithAuth('/api/users/password', {
      method: 'PUT',
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });
    return this.handleResponse(response);
  }

  // Document APIs
  async getDocuments(): Promise<Document[]> {
    const response = await this.fetchWithAuth('/api/documents');
    const data = await this.handleResponse<{ documents: Document[] }>(response);
    return data.documents;
  }

  async uploadDocument(file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.fetchWithAuth('/api/documents', {
      method: 'POST',
      body: formData,
    });

    const data = await this.handleResponse<{ document: Document }>(response);
    return data.document;
  }

  async downloadDocument(id: number): Promise<Blob> {
    // First get the signed download URL from our API
    const response = await this.fetchWithAuth(`/api/documents/${id}/download`);

    if (!response.ok) {
      throw new Error(`Failed to get download URL: ${response.statusText}`);
    }

    const data = await this.handleResponse<{ downloadUrl: string; filename: string }>(response);

    // Fetch the file from S3 using the signed URL
    const fileResponse = await fetch(data.downloadUrl);

    if (!fileResponse.ok) {
      throw new Error(`Failed to download file from storage: ${fileResponse.statusText}`);
    }

    return fileResponse.blob();
  }

  async renameDocument(id: number, newName: string): Promise<Document> {
    const response = await this.fetchWithAuth(`/api/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName }),
    });
    const data = await this.handleResponse<{ document: Document }>(response);
    return data.document;
  }

  async deleteDocument(id: number): Promise<void> {
    const response = await this.fetchWithAuth(`/api/documents/${id}`, {
      method: 'DELETE',
    });
    await this.handleResponse(response);
  }

  // Message APIs
  async getMessages(): Promise<Message[]> {
    const response = await this.fetchWithAuth('/api/messages');
    const data = await this.handleResponse<{ messages: Message[] }>(response);
    return data.messages;
  }

  async sendMessage(text: string): Promise<Message> {
    const response = await this.fetchWithAuth('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ content: text }), // Backend expects 'content' not 'text'
    });
    const data = await this.handleResponse<{ data: Message }>(response);
    return data.data;
  }

  async markMessageAsRead(id: number): Promise<Message> {
    const response = await this.fetchWithAuth(`/api/messages/${id}/read`, {
      method: 'PUT',
    });
    const data = await this.handleResponse<{ message: Message }>(response);
    return data.message;
  }

  // Invoice APIs
  async getInvoices(): Promise<Invoice[]> {
    const response = await this.fetchWithAuth('/api/invoices');
    const data = await this.handleResponse<{ invoices: Invoice[] }>(response);
    return data.invoices;
  }

  async payInvoice(id: number): Promise<Invoice> {
    const response = await this.fetchWithAuth(`/api/invoices/${id}/pay`, {
      method: 'POST',
    });
    const data = await this.handleResponse<{ invoice: Invoice }>(response);
    return data.invoice;
  }

  // Payment APIs (Stripe)
  async getStripeConfig(): Promise<{ publishableKey: string }> {
    const response = await fetch(`${API_URL}/api/payments/config`);
    return this.handleResponse(response);
  }

  async createPaymentIntent(invoiceId: number): Promise<{
    success: boolean;
    clientSecret: string;
    paymentIntentId: string;
    amount: string;
    currency: string;
  }> {
    const response = await this.fetchWithAuth('/api/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ invoiceId }),
    });
    return this.handleResponse(response);
  }

  async confirmPayment(paymentIntentId: string, invoiceId: number): Promise<{
    success: boolean;
    message: string;
    invoice: Invoice;
  }> {
    const response = await this.fetchWithAuth('/api/payments/confirm-payment', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, invoiceId }),
    });
    return this.handleResponse(response);
  }

  async getPaymentHistory(): Promise<{
    success: boolean;
    payments: Array<{
      id: number;
      invoiceNumber: string;
      amount: string;
      currency: string;
      paymentDate: string;
      paymentMethod: string;
      description: string;
    }>;
    totalPaid: number;
  }> {
    const response = await this.fetchWithAuth('/api/payments/history');
    return this.handleResponse(response);
  }

  // Dashboard data API
  async getDashboardData(): Promise<{
    documents: Document[];
    messages: Message[];
    invoices: Invoice[];
    user: User;
  }> {
    // Fetch all data in parallel for efficiency
    const [documentsRes, messagesRes, invoicesRes, userRes] = await Promise.all([
      this.fetchWithAuth('/api/documents'),
      this.fetchWithAuth('/api/messages'),
      this.fetchWithAuth('/api/invoices'),
      this.fetchWithAuth('/api/users/profile'),
    ]);

    const [documents, messages, invoices, user] = await Promise.all([
      this.handleResponse<{ documents: Document[] }>(documentsRes),
      this.handleResponse<{ messages: Message[] }>(messagesRes),
      this.handleResponse<{ invoices: Invoice[] }>(invoicesRes),
      this.handleResponse<{ profile: User }>(userRes),
    ]);

    return {
      documents: documents.documents,
      messages: messages.messages,
      invoices: invoices.invoices,
      user: user.profile,
    };
  }

  // Two-Factor Authentication APIs
  async get2FAStatus(): Promise<{ enabled: boolean; hasBackupCodes: boolean }> {
    const response = await this.fetchWithAuth('/api/2fa/status');
    return this.handleResponse(response);
  }

  async setup2FA(): Promise<{
    qrCodeUrl: string;
    secret: string;
    backupCodes: string[];
  }> {
    const response = await this.fetchWithAuth('/api/2fa/setup', {
      method: 'POST',
    });
    return this.handleResponse(response);
  }

  async verify2FASetup(
    token: string,
    backupCodes: string[]
  ): Promise<{ message: string; enabled: boolean }> {
    const response = await this.fetchWithAuth('/api/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ token, backupCodes }),
    });
    return this.handleResponse(response);
  }

  async disable2FA(
    password: string,
    token: string
  ): Promise<{ message: string; enabled: boolean }> {
    const response = await this.fetchWithAuth('/api/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ password, token }),
    });
    return this.handleResponse(response);
  }

  async verify2FALogin(
    userId: number,
    token: string,
    isBackupCode: boolean = false
  ): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/verify-2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId, token, isBackupCode }),
    });

    const data = await this.handleResponse<AuthResponse>(response);

    // Store the access token
    if (data.accessToken) {
      this.setAccessToken(data.accessToken);
    }

    return data;
  }

  async regenerateBackupCodes(token: string): Promise<{
    message: string;
    backupCodes: string[];
  }> {
    const response = await this.fetchWithAuth('/api/2fa/regenerate-backup-codes', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    return this.handleResponse(response);
  }

  // Admin APIs
  async getAdminStats(): Promise<AdminStats> {
    const response = await this.fetchWithAuth('/api/admin/stats');
    const data = await this.handleResponse<{ stats: AdminStats }>(response);
    return data.stats;
  }

  async getAllUsers(): Promise<User[]> {
    const response = await this.fetchWithAuth('/api/admin/users');
    const data = await this.handleResponse<{ users: User[] }>(response);
    return data.users;
  }

  async createClient(data: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }): Promise<{ message: string; user: User }> {
    const response = await this.fetchWithAuth('/api/admin/users/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async resetUserPassword(userId: number, newPassword: string): Promise<{ message: string; userId: number }> {
    const response = await this.fetchWithAuth(`/api/admin/users/${userId}/reset-password`, {
      method: 'PUT',
      body: JSON.stringify({ newPassword }),
    });
    return this.handleResponse(response);
  }

  async deleteUser(userId: number): Promise<{ message: string; userId: number }> {
    const response = await this.fetchWithAuth(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    });
    return this.handleResponse(response);
  }

  async activateUser(userId: number): Promise<{ message: string; userId: number }> {
    const response = await this.fetchWithAuth(`/api/admin/users/${userId}/activate`, {
      method: 'PUT',
    });
    return this.handleResponse(response);
  }

  async updateUserRole(userId: number, role: 'admin' | 'client'): Promise<{ message: string; userId: number; role: 'admin' | 'client' }> {
    const response = await this.fetchWithAuth(`/api/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
    return this.handleResponse(response);
  }

  // Admin Invoice APIs
  async getAllInvoices(): Promise<{
    invoices: Array<Invoice & { user: User | null }>;
  }> {
    const response = await this.fetchWithAuth('/api/invoices/all');
    return this.handleResponse(response);
  }

  async createInvoice(data: {
    userId: number;
    invoiceNumber: string;
    amount: number;
    tax?: number;
    description?: string;
    lineItems?: Array<{ description: string; amount: string }>;
    dueDate: string;
    sendEmail?: boolean;
  }): Promise<{ invoice: Invoice; emailSent: boolean }> {
    const response = await this.fetchWithAuth('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async sendInvoiceEmail(invoiceId: number): Promise<{ message: string }> {
    const response = await this.fetchWithAuth(`/api/invoices/${invoiceId}/send`, {
      method: 'POST',
    });
    return this.handleResponse(response);
  }
}

// Export a singleton instance
export const apiService = new ApiService();
