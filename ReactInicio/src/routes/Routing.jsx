import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';

import { Login } from '../pages/Login';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import AdminLayout from '../pages/Admin/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/Navbar';
import RutaProtegida from '../components/RutaProtegida';

// Wrapper para las vistas públicas que necesitan Navbar y Footer
const PublicLayout = ({ children, activeTab }) => (
  <div className="tacologia-app">
    <Navbar activeTab={activeTab} />
    <main className="tacologia-main-content">
      {children}
    </main>
    <footer style={{
      background: '#0a0c0f',
      borderTop: '1px solid #1f2532',
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '0.85rem'
    }}>
      <p>© 2026 <strong>Tacología</strong> · Restaurante de Comida Mexicana Premium.</p>
    </footer>
  </div>
);

// Componente intermediario para AdminLayout con navegación y useAuth
const AdminRoute = ({ menu, reservations, onUpdateStatus, onDeleteReservation, onAddMenuItem }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AdminLayout
      currentUser={user}
      menu={menu}
      reservations={reservations}
      onUpdateStatus={onUpdateStatus}
      onDeleteReservation={onDeleteReservation}
      onAddMenuItem={onAddMenuItem}
      onLogout={() => {
        logout();
        navigate('/login');
      }}
      onGoToWebsite={() => {
        logout();
        navigate('/');
      }}
    />
  );
};

export const Routing = () => {
  const [menu, setMenu] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Cargar datos reales desde json-server (o fallback)
  const fetchData = useCallback(async () => {
    try {
      const [resMenu, resReservations] = await Promise.all([
        fetch('http://localhost:3000/menu'),
        fetch('http://localhost:3000/reservations')
      ]);

      if (resMenu.ok) {
        const dataMenu = await resMenu.json();
        setMenu(dataMenu);
      }
      if (resReservations.ok) {
        const dataReservations = await resReservations.json();
        setReservations(dataReservations);
      }
    } catch (err) {
      console.warn('Backend json-server no disponible, cargando datos locales o vacíos.', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actualizar estado de una reservación (confirmada, cancelada, etc.)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      } else {
        // Fallback optimista local
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      }
    } catch {
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  // Eliminar / Cancelar una reservación
  const handleDeleteReservation = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: 'DELETE'
      });

      if (response.ok || response.status === 404) {
        setReservations(prev => prev.filter(r => r.id !== id));
      } else {
        setReservations(prev => prev.filter(r => r.id !== id));
      }
    } catch {
      setReservations(prev => prev.filter(r => r.id !== id));
    }
  };

  // Agregar nuevo platillo
  const handleAddMenuItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:3000/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        const saved = await response.json();
        setMenu(prev => [...prev, saved]);
      } else {
        setMenu(prev => [...prev, newItem]);
      }
    } catch {
      setMenu(prev => [...prev, newItem]);
    }
  };

  // Crear reserva desde la landing page
  const handleQuickReserve = async (formData) => {
    const newReservation = {
      ...formData,
      id: Date.now().toString(),
      status: 'pendiente'
    };

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
      });

      if (response.ok) {
        const saved = await response.json();
        setReservations(prev => [saved, ...prev]);
      } else {
        setReservations(prev => [newReservation, ...prev]);
      }
    } catch {
      setReservations(prev => [newReservation, ...prev]);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route 
          path="/" 
          element={
            <PublicLayout activeTab="home">
              <Home menu={menu} onQuickReserve={handleQuickReserve} />
            </PublicLayout>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicLayout activeTab="login">
              <Login />
            </PublicLayout>
          } 
        />

        {/* Rutas Protegidas / Privadas */}
        <Route 
          path="/admin" 
          element={
            <RutaProtegida allowedRoles={['admin']}>
              <AdminRoute 
                menu={menu}
                reservations={reservations}
                onUpdateStatus={handleUpdateStatus}
                onDeleteReservation={handleDeleteReservation}
                onAddMenuItem={handleAddMenuItem}
              />
            </RutaProtegida>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <RutaProtegida allowedRoles={['admin', 'user']}>
              <PublicLayout activeTab="dashboard">
                <Dashboard 
                  reservations={reservations} 
                  onCancelReservation={handleDeleteReservation}
                />
              </PublicLayout>
            </RutaProtegida>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};