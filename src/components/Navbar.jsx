import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToMenu = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const menuEl = document.querySelector('.menu-preview-section');
        if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const menuEl = document.querySelector('.menu-preview-section');
      if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌮</span>
          <div className="brand-text">
            <span className="brand-title">TACOLOGÍA</span>
            <span className="brand-subtitle">Cocina Mexicana de Autor</span>
          </div>
        </Link>

        <nav className="navbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Inicio
          </Link>
          
          <button 
            type="button"
            className="nav-link"
            onClick={scrollToMenu}
          >
            Menú Exclusivo
          </button>

          {isAuthenticated && user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>

              <Link 
                to="/reservas" 
                className={`nav-link ${location.pathname === '/reservas' ? 'active' : ''}`}
              >
                Reservas
              </Link>

              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`nav-link admin-badge ${location.pathname === '/admin' ? 'active' : ''}`}
                >
                  ⚙️ Panel Admin
                </Link>
              )}

              <div className="user-profile-badge">
                <span className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                <div className="user-info-text">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role-label">
                    {user.role === 'admin' ? '👑 Administrador' : '👤 Cliente'}
                  </span>
                </div>
                <button 
                  className="btn-logout" 
                  onClick={handleLogout} 
                  title="Cerrar sesión"
                >
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="btn-login">
                Iniciar Sesión
              </Link>
              <Link to="/reservas" className="btn-reserve-cta">
                Reservar Mesa
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
