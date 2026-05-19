import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { adminApi } from '@/api/admin'
import type { Admin } from '@/types'

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  admin: Admin | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Token storage key ────────────────────────────────────────────────────

const TOKEN_KEY = 'ts_admin_token'

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY)
  )
  const [isLoading, setIsLoading] = useState(true)

  // On mount: verify any stored token is still valid by hitting /admin/me
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (!stored) {
      setIsLoading(false)
      return
    }
    adminApi
      .getMe()
      .then((fetchedAdmin) => {
        setAdmin(fetchedAdmin)
      })
      .catch(() => {
        // Token invalid or expired — clear it
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const result = await adminApi.login(username, password)
    localStorage.setItem(TOKEN_KEY, result.token)
    setToken(result.token)
    setAdmin(result.admin)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
