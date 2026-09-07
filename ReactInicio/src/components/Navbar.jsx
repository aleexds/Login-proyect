import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import mrTaquitoImg from '../assets/mr-taquito-face.png';
import './Navbar.css';

export default function Navbar({ activeTab }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={mrTaquitoImg} alt="Mr. Taquito Logo" className="brand-taco-icon" draggable="false" />
          <div className="brand-text">
            <span className="brand-title">TACOLOGÍA</span>
            <span className="brand-subtitle">La ciencia exacta del antojo</span>
          </div>
        </Link>

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`navbar-nav ${mobileOpen ? 'nav-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => { setMobileOpen(false); if (user) handleLogout(); }}
          >
            Inicio
          </Link>
          
          <a href="/#menu-section" className="nav-link" onClick={() => setMobileOpen(false)}>
            Menú
          </a>

          <a href="/#manifiesto-section" className="nav-link" onClick={() => setMobileOpen(false)}>
            Manifiesto
          </a>

          <a href="/#booking-section" className="nav-link" onClick={() => setMobileOpen(false)}>
            Reservar
          </a>

          {user?.role === 'admin' ? (
            <>
              <Link 
                to="/admin" 
                className={`nav-link admin-badge ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
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
              <Link to="/login" className="btn-login" onClick={() => setMobileOpen(false)}>
                Acceso Admin
              </Link>
              <a href="/#booking-section" className="btn-reserve-cta" onClick={() => setMobileOpen(false)}>
                Reservar Mesa
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
