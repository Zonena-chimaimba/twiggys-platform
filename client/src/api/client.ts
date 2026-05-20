import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ts_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      window.location.pathname.startsWith('/admin') &&
      !window.location.pathname.includes('/login')
    ) {
      localStorage.removeItem('ts_admin_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)
