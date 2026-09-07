import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import AdminLayout from '../pages/Admin/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Reservas from '../pages/Reservas';
import AccesoDenegado from '../pages/AccesoDenegado';
import Navbar from '../components/Navbar';
import RutaProtegida from '../components/RutaProtegida';

// Wrapper para las vistas públicas y privadas que usan Navbar y Footer estándar
const PublicLayout = ({ children }) => (
  <div className="tacologia-app">
    <Navbar />
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
      <p>© 2026 <strong>Tacología</strong> · Restaurante de Comida Mexicana de Autor.</p>
    </footer>
  </div>
);

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas Públicas */}
          <Route 
            path="/" 
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            } 
          />

          <Route 
            path="/login" 
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            } 
          />

          <Route 
            path="/acceso-denegado" 
            element={
              <PublicLayout>
                <AccesoDenegado />
              </PublicLayout>
            } 
          />

          {/* Rutas Protegidas (Requieren inicio de sesión) */}
          <Route 
            path="/dashboard" 
            element={
              <RutaProtegida>
                <PublicLayout>
                  <Dashboard />
                </PublicLayout>
              </RutaProtegida>
            } 
          />

          <Route 
            path="/reservas" 
            element={
              <RutaProtegida>
                <PublicLayout>
                  <Reservas />
                </PublicLayout>
              </RutaProtegida>
            } 
          />

          {/* Rutas Administrativas (Requieren rol 'admin') */}
          <Route 
            path="/admin" 
            element={
              <RutaProtegida requiredRole="admin">
                <AdminLayout />
              </RutaProtegida>
            } 
          />

          {/* Ruta por defecto ante URLs inexistentes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;