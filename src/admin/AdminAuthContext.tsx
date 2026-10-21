import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { API_URL } from '../lib/api'

const TOKEN_KEY = 'eraydigital_admin_token'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

type AdminAuthValue = {
  token: string | null
  status: AuthStatus
  /** Résout si la connexion réussit, sinon rejette avec le message du serveur. */
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null)

async function verify(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.ok
  } catch {
    return false
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [status, setStatus] = useState<AuthStatus>('checking')

  useEffect(() => {
    let cancelled = false

    if (!token) {
      setStatus('unauthenticated')
      return
    }

    setStatus('checking')
    verify(token).then((ok) => {
      if (cancelled) return
      if (ok) {
        setStatus('authenticated')
      } else {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        setStatus('unauthenticated')
      }
    })

    return () => {
      cancelled = true
    }
  }, [token])

  async function login(email: string, password: string) {
    let res: Response
    try {
      res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
    } catch {
      throw new Error('Serveur injoignable. Vérifiez que l’API tourne (cd server && npm run dev).')
    }
    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.token) throw new Error(data?.error || 'Connexion impossible.')

    localStorage.setItem(TOKEN_KEY, data.token)
    setToken(data.token)
    setStatus('authenticated')
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setStatus('unauthenticated')
  }

  return (
    <AdminAuthContext.Provider value={{ token, status, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
