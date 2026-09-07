import { createContext, useState, useContext } from 'react';

// 1. Crear el contexto de React
const AuthContext = createContext();

// 2. Componente Proveedor (envuelve la app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('tacologia_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Función para validar contra db.json
  const login = async (email, password) => {
    try {
      // Petición a JSON Server filtrando credenciales
      const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      
      if (!response.ok) {
        throw new Error('Error al conectar con el backend simulado.');
      }

      const users = await response.json();

      // Si el arreglo devuelto tiene elementos, las credenciales son válidas
      if (users.length > 0) {
        const loggedUser = users[0];
        
        const userData = {
          id: loggedUser.id,
          name: loggedUser.name,
          email: loggedUser.email,
          role: loggedUser.role,
        };

        setUser(userData);
        localStorage.setItem('tacologia_user', JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        return { success: false, message: 'Correo o contraseña incorrectos.' };
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      return { success: false, message: 'No se pudo conectar con JSON Server.' };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('tacologia_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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