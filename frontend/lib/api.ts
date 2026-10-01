// User management
interface User {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  role: string;
  totalSpent?: number;
  loyaltyGift?: number;
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Unable to read saved account:', error);
    return null;
  }
}

export function setUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}

export function logout() {
  setUser(null);
  setToken(null);
  if (typeof window !== 'undefined') window.location.assign('/login');
}

// Auth API
type AuthUser = {
  id: string;
  username: string;
  role: string;
  displayName: string;
  email: string;
  phone?: string;
  totalSpent?: number;
  loyaltyGift?: number;
};

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

function authHeaders(): Record<string, string> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const authApi = {
  async register(data: {
    displayName: string;
    email: string;
    phone: string;
    password: string;
    username?: string;
  }): Promise<{ success: boolean; error?: string; user?: AuthUser; token?: string }> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: data.displayName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Auth register error:', error);
      return { success: false, error: 'Network error' };
    }
  },

  async login(username: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser; token?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Auth login error:', error);
      return { success: false, error: 'Network error' };
    }
  },
};

// Product API
function productAuthHeaders(): Record<string, string> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const productApi = {
  async getAll(limit = 500, sort = 'id_desc') {
    const response = await fetch(`/api/products?limit=${limit}&sort=${sort}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'تعذر تحميل المنتجات');
    return result;
  },

  async getCategories() {
    const response = await fetch('/api/products/categories');
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'تعذر تحميل الأقسام');
    return result;
  },

  async create(data: any) {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...productAuthHeaders() },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: number, data: any) {
    const response = await fetch('/api/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...productAuthHeaders() },
      body: JSON.stringify({ id, ...data }),
    });
    return response.json();
  },

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.set('file', file);
    const response = await fetch('/api/admin/product-image', {
      method: 'POST',
      headers: productAuthHeaders(),
      body: formData,
    });
    return response.json();
  },
};

// Stats API
export const statsApi = {
  async getAdmin() {
    const response = await fetch('/api/admin/stats', { headers: authHeaders() });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'تعذر تحميل الإحصائيات');
    return result;
  },

  async getCashier() {
    const response = await fetch('/api/cashier/stats', { headers: authHeaders() });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'تعذر تحميل بيانات الكاشير');
    return result;
  },
};

// Order API
export const orderApi = {
  async getAll(query?: string) {
    try {
      const url = query ? `/api/orders?${query}` : '/api/orders';
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'تعذر تحميل الطلبات');
      return result;
    } catch (error) {
      console.error('Order API error:', error);
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to create order');
      return result;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  },

  async createDineIn(data: any) {
    try {
      const response = await fetch('/api/orders/dine-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create dine-in order');
      return await response.json();
    } catch (error) {
      console.error('Dine-in order error:', error);
      throw error;
    }
  },

  async updateStatus(id: string, status: string) {
    try {
      const response = await fetch('/api/orders/dine-in', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ orderId: id, status }),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return await response.json();
    } catch (error) {
      console.error('Order update error:', error);
      throw error;
    }
  },

  async updateSpend(orderId: string) {
    try {
      const response = await fetch('/api/users/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) throw new Error('Failed to update spend');
      return await response.json();
    } catch (error) {
      console.error('Spend update error:', error);
      throw error;
    }
  },
};
