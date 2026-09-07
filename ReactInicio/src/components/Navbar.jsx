import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ activeTab }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={user ? handleLogout : undefined}
          >
            Inicio
          </Link>
          
          <a 
            href="/#booking-section" 
            className="nav-link"
          >
            Reservar
          </a>

          {user?.role === 'admin' ? (
            <>
              <Link 
                to="/admin" 
                className={`nav-link admin-badge ${activeTab === 'admin' ? 'active' : ''}`}
              >
                Panel Admin
              </Link>

              <div className="user-profile-badge">
                <span className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'A'}</span>
                <div className="user-info-text">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role-label">Administrador</span>
                </div>
                <button className="btn-logout" onClick={handleLogout} title="Cerrar sesión">
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth-buttons">
              <Link 
                to="/login" 
                className="btn-login"
              >
                Acceso Admin
              </Link>
              <a 
                href="/#booking-section" 
                className="btn-reserve-cta"
              >
                Reservar Mesa
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
