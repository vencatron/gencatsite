// API Service Layer for Client Portal
// Handles all backend communication with proper TypeScript types

// API Configuration
const getApiUrl = () => {
  // For Replit environment, backend is accessed through a proxy
  if (typeof window !== 'undefined' && window.location.hostname.includes('replit')) {
    // In Replit, the backend should be accessible on the same domain
    // The proxy will route API calls to the backend server
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}`;
  }
  // For local development
  return 'http://localhost:3001';
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
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}

export interface Document {
  id: number;
  userId: number;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  metadata?: any;
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
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  paidDate: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  error: string;
  details?: any;
}

// Helper function for API calls with proper error handling
class ApiService {
  private accessToken: string | null = null;

  // Set the access token
  setAccessToken(token: string | null) {
    this.accessToken = token;
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
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

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
    let data: any;
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
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

    const response = await fetch(`${API_URL}/api/documents`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type - let browser set it with boundary for FormData
        ...(this.accessToken ? { 'Authorization': `Bearer ${this.accessToken}` } : {}),
      },
      credentials: 'include',
      body: formData,
    });

    const data = await this.handleResponse<{ document: Document }>(response);
    return data.document;
  }

  async downloadDocument(id: number): Promise<Blob> {
    const response = await this.fetchWithAuth(`/api/documents/${id}/download`);
    
    if (!response.ok) {
      throw new Error(`Failed to download document: ${response.statusText}`);
    }
    
    return response.blob();
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
      body: JSON.stringify({ text }),
    });
    const data = await this.handleResponse<{ message: Message }>(response);
    return data.message;
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
}

// Export a singleton instance
export const apiService = new ApiService();