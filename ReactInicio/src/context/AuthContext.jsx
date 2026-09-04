import { createContext, useState, useContext } from 'react';

// 1. Crear el contexto de React
const AuthContext = createContext();

// 2. Componente Proveedor (envuelve la app)
export const AuthProvider = ({ children }) => {
  // El usuario vive SOLO en la memoria del estado de React
  const [user, setUser] = useState(null);

  // Función para validar contra db.json
  const login = async (email, password) => {
    try {
      // Petición a JSON Server filtrando credenciales
      const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      
      if (!response.ok) {
        throw new Error('Error al conectar con el backend simulado.');
      }

      const users = await response.json();

      // Si el arreglo devuelto tiene elementos, las credenciales son válidas
      if (users.length > 0) {
        const loggedUser = users[0];
        
        // Guardamos los datos del usuario en el estado global
        setUser({
          id: loggedUser.id,
          name: loggedUser.name,
          email: loggedUser.email,
          role: loggedUser.role,
        });

        return { success: true };
      } else {
        return { success: false, message: 'Correo o contraseña incorrectos.' };
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      return { success: false, message: 'No se pudo conectar con JSON Server.' };
    }
  };

  // Función para cerrar sesión (simplemente borra el estado)
  const logout = () => {
    setUser(null);
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