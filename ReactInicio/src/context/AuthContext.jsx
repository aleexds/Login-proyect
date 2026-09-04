import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'tacologia-session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY)
    return savedSession ? JSON.parse(savedSession) : null
  })

  const role = user?.role ?? null
  const isAuthenticated = Boolean(user)

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      role,
      isAuthenticated,
      login: (nextUser) => setUser(nextUser),
      logout: () => setUser(null),
    }),
    [isAuthenticated, role, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
