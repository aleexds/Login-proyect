import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Login } from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          {/* Rutas Públicas */}

          <Route path="/" element={<Login />} />

          {/* Rutas Protegidas */}



          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};