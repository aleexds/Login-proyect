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
          <span className="material-symbols-outlined" style={{ color: '#d4af37', fontSize: '1.8rem' }}>
            restaurant
          </span>
          <span className="brand-text">Tacología <strong>Admin</strong></span>
        </div>

        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>analytics</span>
            Resumen
          </button>
          <button 
            className={`admin-nav-item ${activeSection === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveSection('reservations')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>table_restaurant</span>
            Reservaciones
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
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>menu_book</span>
            Menú Digital
          </button>
        </nav>

        <div className="admin-sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button className="btn-exit-admin" onClick={onGoToWebsite} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
            Volver al Sitio
          </button>
          <button 
            className="btn-exit-admin" 
            style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }} 
            onClick={onLogout}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>logout</span>
            Cerrar Sesión
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
