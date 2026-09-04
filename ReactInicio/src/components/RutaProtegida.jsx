import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function RutaProtegida({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, role } = useAuth()
  const location = useLocation()
  const currentRole = role ?? user?.role

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/acceso-denegado" replace />
  }

  return children
}
