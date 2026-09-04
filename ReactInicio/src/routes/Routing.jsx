import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Login } from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import AdminLayout from '../pages/Admin/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/Navbar';

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

// Mock data temporal hasta que se conecte el backend
const INITIAL_MENU = [];
const INITIAL_RESERVATIONS = [];

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<PublicLayout activeTab="home"><Home menu={INITIAL_MENU} /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout activeTab="login"><Login /></PublicLayout>} />

          {/* Rutas Protegidas / Privadas */}
          <Route path="/admin" element={<AdminLayout menu={INITIAL_MENU} reservations={INITIAL_RESERVATIONS} />} />
          <Route path="/dashboard" element={<PublicLayout activeTab="dashboard"><Dashboard reservations={INITIAL_RESERVATIONS} /></PublicLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};