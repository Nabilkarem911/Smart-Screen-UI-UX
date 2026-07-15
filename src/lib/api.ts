const API_URL = import.meta.env.VITE_API_URL || '/api'

function getToken(): string | null {
  return localStorage.getItem('token')
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    removeToken()
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || data.error || 'Request failed')
  }

  return data
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getMe: () => request('/auth/me'),

  // Screens
  getScreens: () => request('/screens'),
  getScreen: (id: string) => request(`/screens/${id}`),
  createScreen: (data: any) =>
    request('/screens', { method: 'POST', body: JSON.stringify(data) }),
  updateScreen: (id: string, data: any) =>
    request(`/screens/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteScreen: (id: string) =>
    request(`/screens/${id}`, { method: 'DELETE' }),

  // Groups
  getGroups: () => request('/groups'),
  createGroup: (data: any) =>
    request('/groups', { method: 'POST', body: JSON.stringify(data) }),
  updateGroup: (id: string, data: any) =>
    request(`/groups/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGroup: (id: string) =>
    request(`/groups/${id}`, { method: 'DELETE' }),

  // Devices
  getDevices: () => request('/devices'),
  createDevice: (data: any) =>
    request('/devices', { method: 'POST', body: JSON.stringify(data) }),
  updateDevice: (id: string, data: any) =>
    request(`/devices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteDevice: (id: string) =>
    request(`/devices/${id}`, { method: 'DELETE' }),

  // Media
  getMedia: () => request('/media'),
  uploadMedia: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return request('/media/upload', {
      method: 'POST',
      body: formData as any,
      headers: {} as Record<string, string>,
    })
  },
  deleteMedia: (id: string) =>
    request(`/media/${id}`, { method: 'DELETE' }),

  // Content
  getContent: (params?: string) => request(`/content${params ? `?${params}` : ''}`),
  createContent: (data: any) =>
    request('/content', { method: 'POST', body: JSON.stringify(data) }),
  updateContent: (id: string, data: any) =>
    request(`/content/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContent: (id: string) =>
    request(`/content/${id}`, { method: 'DELETE' }),

  // Approvals
  getApprovals: (status?: string) =>
    request(`/approvals${status ? `?status=${status}` : ''}`),
  createApproval: (data: any) =>
    request('/approvals', { method: 'POST', body: JSON.stringify(data) }),
  reviewApproval: (id: string, status: string, reviewNote?: string) =>
    request(`/approvals/${id}/review`, {
      method: 'PUT',
      body: JSON.stringify({ status, reviewNote }),
    }),

  // Broadcasts
  getBroadcasts: () => request('/broadcasts'),
  createBroadcast: (data: any) =>
    request('/broadcasts', { method: 'POST', body: JSON.stringify(data) }),

  // Analytics
  getStats: () => request('/analytics/stats'),
  getScreenAnalytics: (id: string) => request(`/analytics/screen/${id}`),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id: string) =>
    request(`/notifications/${id}/read`, { method: 'PUT' }),
  markAllNotificationsRead: () =>
    request('/notifications/read-all', { method: 'PUT' }),
}
