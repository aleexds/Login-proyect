import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AccesoDenegado.css';

export default function AccesoDenegado() {
  const { user } = useAuth();

  return (
    <div className="acceso-denegado-container">
      <div className="acceso-card">
        <div className="acceso-icon-box">
          <span>🚫</span>
        </div>

        <span className="acceso-code">Error 403 · Permisos Insuficientes</span>
        <h1 className="acceso-title">Acceso Restringido</h1>

        <p className="acceso-desc">
          Lo sentimos, esta sección es exclusiva para el personal administrativo de <strong>Tacología</strong>. 
          Tu cuenta actual no posee los privilegios necesarios para ver este módulo.
        </p>

        {user && (
          <div className="acceso-user-meta">
            <p><strong>Usuario:</strong> {user.name} ({user.email})</p>
            <p><strong>Rol asignado:</strong> <span style={{ textTransform: 'uppercase', color: '#f59e0b' }}>{user.role}</span></p>
            <p><strong>Nivel requerido:</strong> <span style={{ textTransform: 'uppercase', color: '#ef4444' }}>ADMIN</span></p>
          </div>
        )}

        <div className="acceso-actions">
          <Link to="/dashboard" className="btn-acceso-primary">
            Ir a Mi Dashboard
          </Link>
          <Link to="/" className="btn-acceso-secondary">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
