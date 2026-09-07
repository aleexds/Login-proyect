import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para proteger rutas privadas y validar roles
 * - Si no está autenticado -> Redirige a /login
 * - Si está autenticado pero no tiene el rol requerido -> Redirige a /acceso-denegado
 */
export const RutaProtegida = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3f4f6',
        fontFamily: 'inherit'
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🌮</span>
          <p>Verificando credenciales...</p>
        </div>
      </div>
    );
  }

  // 1. Si no está autenticado, va a /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Si se requiere un rol (ej. admin) y no coincide, va a /acceso-denegado
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // 3. Usuario autenticado con permisos correctos
  return children;
};

export default RutaProtegida;
