import React from 'react';
import './Navbar.css';

export default function Navbar({ currentUser, onLogout, activeTab, setActiveTab }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setActiveTab && setActiveTab('home')}>
          <span className="brand-icon">🌮</span>
          <div className="brand-text">
            <span className="brand-title">TACOLOGÍA</span>
            <span className="brand-subtitle">Cocina Mexicana de Autor</span>
          </div>
        </div>

        <nav className="navbar-nav">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab && setActiveTab('home')}
          >
            Inicio
          </button>
          
          <button 
            className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab && setActiveTab('menu')}
          >
            Menú Exclusivo
          </button>

          {currentUser ? (
            <>
              <button 
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab && setActiveTab('dashboard')}
              >
                Mis Reservas
              </button>

              {currentUser.role === 'admin' && (
                <button 
                  className={`nav-link admin-badge ${activeTab === 'admin' ? 'active' : ''}`}
                  onClick={() => setActiveTab && setActiveTab('admin')}
                >
                  Panel Admin
                </button>
              )}

              <div className="user-profile-badge">
                <span className="user-avatar">{currentUser.name.charAt(0)}</span>
                <div className="user-info-text">
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-role-label">{currentUser.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
                </div>
                <button className="btn-logout" onClick={onLogout} title="Cerrar sesión">
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth-buttons">
              <button 
                className="btn-login"
                onClick={() => setActiveTab && setActiveTab('login')}
              >
                Iniciar Sesión
              </button>
              <button 
                className="btn-reserve-cta"
                onClick={() => setActiveTab && setActiveTab('home')}
              >
                Reservar Mesa
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
