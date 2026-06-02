import axios from 'axios'

<<<<<<< HEAD
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'
=======
// Prefer the Vite-provided `VITE_API_URL` at build time. Fall back to the
// production backend URL when the env var is not set (safe default for Render).
const API_URL = import.meta.env['VITE_API_URL'] ?? 'https://twiggys-backend.onrender.com'
>>>>>>> dcafa27 (fix(frontend): use VITE_API_URL fallback to production backend; update vite config; ignore and untrack build artifacts)

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
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
