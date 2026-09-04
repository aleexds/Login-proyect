import React, { useState } from 'react';
import './AdminLayout.css';
import AdminOverview from './AdminOverview';
import AdminReservations from './AdminReservations';
import AdminMenu from './AdminMenu';

export default function AdminLayout({ 
  currentUser, 
  onLogout, 
  reservations, 
  onUpdateStatus, 
  onDeleteReservation,
  menu,
  onAddMenuItem,
  onGoToWebsite
}) {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <AdminOverview reservations={reservations} menu={menu} />;
      case 'reservations':
        return <AdminReservations 
          reservations={reservations} 
          onUpdateStatus={onUpdateStatus} 
          onDeleteReservation={onDeleteReservation} 
        />;
      case 'menu':
        return <AdminMenu menu={menu} onAddMenuItem={onAddMenuItem} />;
      default:
        return <AdminOverview reservations={reservations} menu={menu} />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-icon">🌮</span>
          <span className="brand-text">Tacología <strong>Admin</strong></span>
        </div>

        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            📊 Resumen
          </button>
          <button 
            className={`admin-nav-item ${activeSection === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveSection('reservations')}
          >
            📅 Reservaciones
            {reservations.filter(r => r.status === 'pendiente').length > 0 && (
              <span className="nav-badge">
                {reservations.filter(r => r.status === 'pendiente').length}
              </span>
            )}
          </button>
          <button 
            className={`admin-nav-item ${activeSection === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveSection('menu')}
          >
            🧾 Menú Digital
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="btn-exit-admin" onClick={onGoToWebsite}>
            ← Volver al Sitio
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <input type="text" placeholder="Buscar reservas, platillos..." />
          </div>
          <div className="topbar-actions">
            <div className="admin-user-info">
              <span className="user-role">Admin</span>
              <span className="user-name">{currentUser?.name || 'Administrador'}</span>
            </div>
            <div className="admin-avatar">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="admin-content-scroll">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
