import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';
import AdminOverview from './AdminOverview';
import AdminReservations from './AdminReservations';
import AdminMenu from './AdminMenu';

const API_BASE_URL = 'http://localhost:3000';

export default function AdminLayout({ 
  currentUser: propUser, 
  onLogout: propLogout, 
  reservations: propReservations, 
  menu: propMenu,
  onGoToWebsite: propGoToWebsite
}) {
  const { user: authUser, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const currentUser = propUser || authUser;
  const onLogout = propLogout || (() => {
    authLogout();
    navigate('/login');
  });
  const onGoToWebsite = propGoToWebsite || (() => navigate('/'));

  const [activeSection, setActiveSection] = useState('overview');
  const [reservations, setReservations] = useState(propReservations || []);
  const [menu, setMenu] = useState(propMenu || []);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde JSON Server
  useEffect(() => {
    let isMounted = true;

    const loadAdminData = async () => {
      try {
        const [resRes, resMenu] = await Promise.all([
          fetch(`${API_BASE_URL}/reservations`).catch(() => null),
          fetch(`${API_BASE_URL}/menu`).catch(() => null)
        ]);

        if (isMounted && resRes && resRes.ok) {
          const reservationsData = await resRes.json();
          setReservations(reservationsData);
        }
        if (isMounted && resMenu && resMenu.ok) {
          const menuData = await resMenu.json();
          setMenu(menuData);
        }
      } catch (err) {
        console.error('Error cargando datos de admin desde JSON Server:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Actualizar estatus de una reserva (PATCH en JSON Server)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setReservations(prev => 
          prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
        );
      } else {
        // Fallback a actualizar en estado
        setReservations(prev => 
          prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
        );
      }
    } catch (err) {
      console.error('Error al actualizar estatus de reserva:', err);
    }
  };

  // Eliminar una reserva (DELETE en JSON Server)
  const handleDeleteReservation = async (id) => {
    if (!window.confirm(`¿Estás seguro de eliminar la reservación #${id}?`)) return;

    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setReservations(prev => prev.filter(r => r.id !== id));
      } else {
        setReservations(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
      setReservations(prev => prev.filter(r => r.id !== id));
    }
  };

  // Añadir un nuevo platillo al menú (POST en JSON Server)
  const handleAddMenuItem = async (newDish) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDish)
      });

      if (response.ok) {
        const savedDish = await response.json();
        setMenu(prev => [...prev, savedDish]);
      } else {
        setMenu(prev => [...prev, newDish]);
      }
    } catch (err) {
      console.error('Error al añadir platillo:', err);
      setMenu(prev => [...prev, newDish]);
    }
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <AdminOverview reservations={reservations} menu={menu} />;
      case 'reservations':
        return (
          <AdminReservations 
            reservations={reservations} 
            onUpdateStatus={handleUpdateStatus} 
            onDeleteReservation={handleDeleteReservation} 
          />
        );
      case 'menu':
        return <AdminMenu menu={menu} onAddMenuItem={handleAddMenuItem} />;
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
          <button 
            className="btn-exit-admin" 
            onClick={onLogout}
            style={{ marginTop: '0.5rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
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
              <span className="user-role">ADMINISTRADOR</span>
              <span className="user-name">{currentUser?.name || 'Admin Tacología'}</span>
            </div>
            <div className="admin-avatar">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="admin-content-scroll">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
              Cargando panel administrativo desde JSON Server...
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
}
