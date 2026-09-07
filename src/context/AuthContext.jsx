import { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el contexto de React
const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:3000';

// 2. Componente Proveedor (envuelve la app)
export const AuthProvider = ({ children }) => {
  // Inicializar estado con usuario persistido en localStorage si existe
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('tacologia_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Error al leer usuario de localStorage:', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sincronizar localStorage cuando cambie el usuario
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('tacologia_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('tacologia_user');
      }
    } catch (e) {
      console.error('Error al actualizar localStorage:', e);
    }
  }, [user]);

  // Función para validar contra db.json / JSON Server
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Consultamos a JSON Server por usuarios
      let users = [];
      try {
        const response = await fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(email)}`);
        if (response.ok) {
          users = await response.json();
        } else {
          // Fallback a todos los usuarios si query params difieren de version json-server
          const allRes = await fetch(`${API_BASE_URL}/users`);
          if (allRes.ok) {
            const allUsers = await allRes.json();
            users = allUsers.filter(u => u.email?.toLowerCase() === email.trim().toLowerCase());
          }
        }
      } catch (fetchErr) {
        console.warn('Error en consulta filtrada, intentando endpoint directo:', fetchErr);
        const fallbackRes = await fetch(`${API_BASE_URL}/users`);
        if (!fallbackRes.ok) {
          throw new Error('Servidor no disponible', { cause: fetchErr });
        }
        const allUsers = await fallbackRes.json();
        users = allUsers.filter(u => u.email?.toLowerCase() === email.trim().toLowerCase());
      }

      // Validar si el usuario existe
      if (!users || users.length === 0) {
        setLoading(false);
        return { 
          success: false, 
          message: 'El correo electrónico ingresado no se encuentra registrado en el sistema.' 
        };
      }

      // Validar contraseña
      const matchedUser = users.find(u => u.password === password);
      if (!matchedUser) {
        setLoading(false);
        return { 
          success: false, 
          message: 'Contraseña incorrecta. Por favor verifica tus credenciales.' 
        };
      }

      // Credenciales válidas: preparamos el usuario de sesión
      const sessionUser = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role || 'user',
      };

      setUser(sessionUser);
      setLoading(false);
      return { success: true, user: sessionUser };
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      setLoading(false);
      return { 
        success: false, 
        message: 'No se pudo conectar con el servidor (JSON Server en puerto 3000). Asegúrate de iniciar npm run server.' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('tacologia_user');
    } catch (e) {
      console.error('Error al limpiar localStorage en logout:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;