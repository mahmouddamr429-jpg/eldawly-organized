const API_BASE = '/api';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('eldawly_token') : null;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401) clearAuth();
      throw new Error(data.message || data.error || 'حدث خطأ');
    }
    return data;
  } catch (e: any) {
    if (e.message === 'Failed to fetch') throw new Error('خطأ في الشبكة');
    throw e;
  }
}

export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<{ success: boolean; user: any; token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  register: (data: { username: string; password: string; displayName: string; email: string; phone: string }) =>
    apiFetch<{ success: boolean; user: any; token: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
};

export const productApi = {
  getAll: (params?: string) => apiFetch<any>(`/products${params ? `?${params}` : ''}`),
  getCategories: () => apiFetch<string[]>('/categories'),
};

export const orderApi = {
  create: (data: any) => apiFetch<{ success: boolean; orderId: string }>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params?: string) => apiFetch<any>(`/orders${params ? `?${params}` : ''}`),
  createDineIn: (data: any) => apiFetch<{ success: boolean; orderId: string; order: any }>('/orders/dine-in', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (orderId: string, status: string) => apiFetch<{ success: boolean }>('/orders/dine-in', { method: 'PATCH', body: JSON.stringify({ orderId, status }) }),
  updateSpend: (userId: number, amount: number) => apiFetch<{ success: boolean; totalSpent: number; loyaltyGift: boolean; justEarnedGift: boolean }>('/users/spend', { method: 'POST', body: JSON.stringify({ userId, amount }) }),
};

export const statsApi = {
  getAdmin: () => apiFetch<any>('/admin/stats'),
  getCashier: () => apiFetch<{ pending: any[]; completed: any[] }>('/cashier/stats'),
};

export function getUser() {
  if (typeof window === 'undefined') return null;
  try { const s = localStorage.getItem('eldawly_user'); return s ? JSON.parse(s) : null; } catch { return null; }
}
export function setUser(user: any) { localStorage.setItem('eldawly_user', JSON.stringify(user)); }
export function setToken(token: string) { localStorage.setItem('eldawly_token', token); }
export function clearAuth() { localStorage.removeItem('eldawly_user'); localStorage.removeItem('eldawly_token'); }
export function logout() { clearAuth(); window.location.href = '/login'; }
