// Momence API Service
// Handles authentication and customer data fetching from Momence

class MomenceAPI {
  private accessToken: string = '';
  private refreshToken: string = '';
  private baseURL: string;
  private authToken: string;
  private username: string;
  private password: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_MOMENCE_API_BASE_URL || 'https://api.momence.com/api/v2';
    this.authToken = process.env.REACT_APP_MOMENCE_AUTH_TOKEN || '';
    this.username = process.env.REACT_APP_MOMENCE_USERNAME || '';
    this.password = process.env.REACT_APP_MOMENCE_PASSWORD || '';
    
    // Debug: Check if environment variables are set
    if (!this.authToken || !this.username || !this.password) {
      console.warn('Momence API: Missing environment variables. Customer search will be disabled.');
      console.warn({
        hasAuthToken: !!this.authToken,
        hasUsername: !!this.username,
        hasPassword: !!this.password
      });
    }
  }

  async authenticate(): Promise<boolean> {
    try {
      // Check if credentials are available
      if (!this.authToken || !this.username || !this.password) {
        console.warn('Momence API: Cannot authenticate - missing credentials');
        return false;
      }

      const response = await fetch(`${this.baseURL}/auth/token`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${this.authToken}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: this.username,
          password: this.password,
        }),
      });

      if (!response.ok) {
        console.error('Momence auth failed:', response.status, response.statusText);
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refreshToken;
      
      return true;
    } catch (error) {
      console.error('Momence authentication error:', error);
      return false;
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/token`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${this.authToken}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refreshToken;
      
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  async searchCustomers(query: string): Promise<any[]> {
    try {
      // Early return if no credentials
      if (!this.authToken || !this.username || !this.password) {
        console.warn('Momence API: Customer search disabled - missing environment variables');
        return [];
      }

      if (!this.accessToken) {
        const authSuccess = await this.authenticate();
        if (!authSuccess) {
          console.warn('Momence API: Authentication failed, skipping search');
          return [];
        }
      }

      const response = await fetch(
        `${this.baseURL}/host/members?search=${encodeURIComponent(query)}&pageSize=50`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (response.status === 401) {
        const refreshSuccess = await this.refreshAccessToken();
        if (refreshSuccess) {
          return this.searchCustomers(query);
        } else {
          console.warn('Momence API: Token refresh failed');
          return [];
        }
      }

      if (!response.ok) {
        console.error('Momence search failed:', response.status, response.statusText);
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data.payload || [];
    } catch (error) {
      console.error('Customer search error:', error);
      return [];
    }
  }

  async getCustomerById(memberId: string): Promise<any> {
    try {
      if (!this.accessToken) {
        await this.authenticate();
      }

      const response = await fetch(
        `${this.baseURL}/host/members/${memberId}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (response.status === 401) {
        await this.refreshAccessToken();
        return this.getCustomerById(memberId);
      }

      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get customer error:', error);
      return null;
    }
  }

  async getCustomerBookings(memberId: string): Promise<any[]> {
    try {
      if (!this.accessToken) {
        await this.authenticate();
      }

      const response = await fetch(
        `${this.baseURL}/host/members/${memberId}/bookings`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (response.status === 401) {
        await this.refreshAccessToken();
        return this.getCustomerBookings(memberId);
      }

      if (!response.ok) {
        throw new Error('Failed to fetch customer bookings');
      }

      const data = await response.json();
      return data.payload || [];
    } catch (error) {
      console.error('Get customer bookings error:', error);
      return [];
    }
  }

  formatCustomerData(customer: any) {
    return {
      id: customer.id,
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer.email || '',
      phone: customer.phone || '',
      membershipId: customer.membershipNumber || '',
      membershipStatus: customer.membershipStatus || 'inactive',
      joinDate: customer.createdAt || null,
      lastVisit: customer.lastBookingDate || null,
      totalBookings: customer.totalBookings || 0,
      notes: customer.notes || '',
    };
  }
}

export const momenceAPI = new MomenceAPI();
