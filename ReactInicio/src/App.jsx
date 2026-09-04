import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

// Datos iniciales tomados de db.json para funcionamiento autónomo e integrado
const INITIAL_USERS = [
  { id: 1, name: "Admin Tacologia", email: "admin@tacologia.com", password: "1234", role: "admin" },
  { id: 2, name: "Cliente Demo", email: "user@tacologia.com", password: "1234", role: "user" }
];

const INITIAL_RESERVATIONS = [
  { id: 1, userId: 2, name: "Cliente Demo", phone: "+52 55 1234 5678", date: "2026-09-10", time: "19:00", guests: 2, tableArea: "Terraza Agave", status: "confirmada", notes: "Mesa con vista y velada de aniversario" },
  { id: 2, userId: 2, name: "Cliente Demo", phone: "+52 55 9876 5432", date: "2026-09-15", time: "21:00", guests: 4, tableArea: "Salón Mezcal", status: "pendiente", notes: "Cumpleaños, menú degustación" }
];

const INITIAL_MENU = [
  { id: 1, name: "Taco de Rib Eye con Tuétano Asado", category: "Especialidades", description: "Corte prime en tortilla nixtamalizada a mano con sal de Colima y chimichurri serrano.", price: 280, badge: "Insignia" },
  { id: 2, name: "Taco Gobernador Tacología", category: "Del Mar", description: "Camarón pacífico marinado en adobo de chiles secos, queso menonita fundido y aguacate criollo.", price: 240, badge: "Popular" },
  { id: 3, name: "Lechón Confitado en Horno de Leña", category: "Especialidades", description: "Piel crujiente, cebolla morada encurtida al habanero y jugo concentrado de naranja agria.", price: 260, badge: "Chef Choice" },
  { id: 4, name: "Tasting de Mezcales Artesanales", category: "Bebidas", description: "Selección de 3 mezcales oaxaqueños silvestres con sales de gusano y naranja criolla.", price: 320, badge: "Exclusivo" }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[1]); // Por defecto logueado como usuario para probar la UI
  const [activeTab, setActiveTab] = useState('home');
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [menu, setMenu] = useState(INITIAL_MENU);

  // Funciones de Reservación
  const handleQuickReserve = (reservationData) => {
    const newReservation = {
      ...reservationData,
      id: reservations.length + 1,
      userId: currentUser?.id || 2,
      status: 'pendiente'
    };
    setReservations([newReservation, ...reservations]);
  };

  const handleCancelReservation = (id) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  // Funciones Admin
  const handleUpdateStatus = (id, newStatus) => {
    setReservations(
      reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  const handleAddMenuItem = (item) => {
    setMenu([item, ...menu]);
  };

  // Simulación de cambio de usuario / roles para pruebas de integración
  const toggleRole = () => {
    if (currentUser?.role === 'admin') {
      setCurrentUser(INITIAL_USERS[1]);
    } else {
      setCurrentUser(INITIAL_USERS[0]);
    }
  };

  return (
    <div className="tacologia-app">
      {/* Barra superior de ayuda para el evaluador / tester */}
      <div style={{
        background: '#13161c',
        padding: '0.4rem 1rem',
        fontSize: '0.78rem',
        borderBottom: '1px solid #232a38',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#9ca3af'
      }}>
        <span>🌮 <strong>Tacología Dev Bar</strong> (feature/inicio-ui - Victor)</span>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <span>Sesión actual: <strong style={{ color: '#ffb74d' }}>{currentUser?.name}</strong> ({currentUser?.role})</span>
          <button 
            onClick={toggleRole}
            style={{
              background: '#202632',
              border: '1px solid #3b465e',
              color: '#fff',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
          >
            Cambiar a {currentUser?.role === 'admin' ? 'Cliente (user)' : 'Admin (admin)'}
          </button>
        </div>
      </div>

      <Navbar 
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="tacologia-main-content">
        {activeTab === 'home' && (
          <Home 
            onNavigate={setActiveTab}
            menu={menu}
            onQuickReserve={handleQuickReserve}
          />
        )}

        {activeTab === 'menu' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <Home 
              onNavigate={setActiveTab}
              menu={menu}
              onQuickReserve={handleQuickReserve}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            currentUser={currentUser}
            reservations={reservations}
            onCancelReservation={handleCancelReservation}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            reservations={reservations}
            onUpdateStatus={handleUpdateStatus}
            onDeleteReservation={handleDeleteReservation}
            menu={menu}
            onAddMenuItem={handleAddMenuItem}
          />
        )}

        {activeTab === 'login' && (
          <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: '#202632', borderRadius: '12px', border: '1px solid #2e384d', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Acceso al Sistema</h2>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Módulo asignado a <strong>Alex (feature/autenticacion)</strong>. Puedes seleccionar un rol en la barra superior para navegar como Admin o Cliente.
            </p>
            <button 
              onClick={() => { setCurrentUser(INITIAL_USERS[1]); setActiveTab('dashboard'); }}
              style={{ width: '100%', padding: '0.7rem', background: '#e65100', color: '#fff', borderRadius: '6px', fontWeight: 'bold', marginBottom: '0.8rem', cursor: 'pointer' }}
            >
              Entrar como Cliente Demo
            </button>
            <button 
              onClick={() => { setCurrentUser(INITIAL_USERS[0]); setActiveTab('admin'); }}
              style={{ width: '100%', padding: '0.7rem', background: '#2e7d32', color: '#fff', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Entrar como Administrador
            </button>
          </div>
        )}
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
        <p style={{ marginTop: '0.4rem', fontSize: '0.75rem' }}>Desarrollado en equipo por Ulysses, Alex, Kendall y Victor.</p>
      </footer>
    </div>
  );
}
