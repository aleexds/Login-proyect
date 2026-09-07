# 🌮 Tacología | Alta Taquería Mexicana

Plataforma web integral de gestión gastronómica, catálogo exclusivo, sistema de reservaciones en tiempo real y autenticación con control de acceso basado en roles (RBAC) para el restaurante de autor **Tacología**.

---

## 📋 Tabla de Contenidos
- [Descripción General](#-descripción-general)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Ejecución del Sistema](#-ejecución-del-sistema)
- [Usuarios y Credenciales de Prueba](#-usuarios-y-credenciales-de-prueba)
- [Rutas del Sistema](#-rutas-del-sistema)
- [Control de Acceso y Roles](#-control-de-acceso-y-roles)
- [Flujo de Autenticación y Persistencia](#-flujo-de-autenticación-y-persistencia)
- [Gestión de Reservaciones (JSON Server)](#-gestión-de-reservaciones-json-server)

---

## 🌟 Descripción General
Tacología combina una experiencia visual inmersiva de alta gama (con renderizado 3D deconstruido del trompo al pastor, microanimaciones y diseño oscuro con acentos ámbar y terracota) con una sólida arquitectura cliente-servidor orientada a servicios REST.

La aplicación permite a los comensales explorar el menú de autor y registrar reservaciones conectadas a JSON Server, mientras que proporciona a los administradores un panel de control con métricas, gestión de estados de reservas y administración de platillos.

---

## 🛠 Tecnologías Utilizadas

| Categoría | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework Core** | React 19 (`react`, `react-dom`) | Biblioteca para la interfaz de usuario basada en componentes funcionales y hooks. |
| **Tooling & Build** | Vite 8 | Servidor de desarrollo ultrarrápido y empaquetador para producción. |
| **Enrutamiento** | React Router DOM 7 | Gestión de rutas dinámicas del lado del cliente, rutas protegidas y navegación programática. |
| **Estilos & Animación** | Tailwind CSS v4 & Framer Motion 12 | Estilizado moderno utilitario y animaciones complejas (HeroTrompo scroll-driven). |
| **Backend Mock** | JSON Server (v1 REST API) | Servidor simulado para operaciones CRUD sobre `users`, `reservations` y `menu`. |
| **Concurrencia** | Concurrently | Ejecución simultánea del servidor JSON Server y el frontend en un solo comando. |

---

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura clara respetando el flujo:  
**Componentes → Páginas → Rutas → App → main**

```text
tacologia/
├── db.json                     # Base de datos simulada para JSON Server (users, reservations, menu)
├── index.html                  # Plantilla HTML con SEO y favicon
├── package.json                # Scripts y dependencias del proyecto
├── vite.config.js              # Configuración de Vite y plugins (React + Tailwind)
├── eslint.config.js           # Reglas de linting y calidad de código
└── src/
    ├── main.jsx                # Punto de entrada de React (createRoot)
    ├── App.jsx                 # Componente raíz que monta el Routing
    ├── App.css                 # Estilos globales de la aplicación
    ├── index.css               # Importación de Tailwind y variables CSS del tema
    ├── assets/                 # Recursos multimedia (trompo.jpg, hero.png, SVGs)
    ├── context/
    │   └── AuthContext.jsx     # Contexto global de autenticación, roles y persistencia
    ├── components/
    │   ├── Navbar.jsx          # Barra de navegación adaptable según estado de sesión y rol
    │   ├── Navbar.css          # Estilos del Navbar
    │   ├── RutaProtegida.jsx   # HOC / Guardián para proteger rutas y verificar roles
    │   ├── HeroTrompo.jsx      # Hero inmersivo deconstruido con scroll-driven animation
    │   ├── HeroTrompo.css      # Efectos visuales, scanlines holográficas y chispas
    │   └── TrompoTaco.jsx      # Componente complementario de rotación
    ├── pages/
    │   ├── Home.jsx            # Página principal pública (Hero + Menú + Reserva rápida)
    │   ├── Home.css            # Estilos de la Home
    │   ├── Login.jsx           # Vista de inicio de sesión con validaciones y accesos rápidos
    │   ├── Login.css           # Estilos de la tarjeta de Login
    │   ├── Dashboard.jsx       # Dashboard para usuarios autenticados y sus reservas
    │   ├── Dashboard.css       # Estilos del Dashboard de comensal
    │   ├── Reservas.jsx        # Gestión y solicitud de reservaciones conectadas a JSON Server
    │   ├── Reservas.css        # Estilos del módulo de reservaciones
    │   ├── AccesoDenegado.jsx  # Vista de error 403 cuando no se tienen los privilegios
    │   ├── AccesoDenegado.css  # Estilos para acceso denegado
    │   └── Admin/
    │       ├── AdminLayout.jsx       # Estructura general del panel de administración
    │       ├── AdminLayout.css       # Estilos de barra lateral y contenedor
    │       ├── AdminOverview.jsx     # Tarjetas KPI, gráficos CSS y actividad reciente
    │       ├── AdminOverview.css     # Estilos de métricas
    │       ├── AdminReservations.jsx # Tabla de gestión y confirmación de reservas
    │       ├── AdminReservations.css # Estilos de tabla y acciones
    │       ├── AdminMenu.jsx         # Catálogo y registro de nuevos platillos
    │       └── AdminMenu.css         # Estilos del formulario de platillos
    └── routes/
        └── Routing.jsx         # Declaración centralizada de rutas públicas y privadas
```

---

## ⚙️ Instalación y Configuración

1. **Clonar o situarse en el directorio del proyecto:**
   ```bash
   cd C:\Users\dell5\UQV\Taco\tacologia
   ```

2. **Instalar todas las dependencias del proyecto:**
   ```bash
   npm install
   ```

---

## 🚀 Ejecución del Sistema

Se han configurado scripts claros para ejecutar el entorno de manera sencilla:

### Opción A: Ejecutar Todo en Simultáneo (Recomendado)
Inicia **JSON Server** (puerto 3000) y **Vite** (puerto 5173) en una sola consola con etiquetas de color:
```bash
npm run dev:all
```

### Opción B: Ejecutar por Separado en dos terminales
- **Terminal 1 - Backend (JSON Server):**
  ```bash
  npm run server
  ```
  *Servidor escuchando en `http://localhost:3000` (`/users`, `/reservations`, `/menu`).*

- **Terminal 2 - Frontend (React + Vite):**
  ```bash
  npm run dev
  ```
  *Aplicación accesible en `http://localhost:5173`.*

### Compilación para Producción:
```bash
npm run build
```

---

## 👥 Usuarios y Credenciales de Prueba

Los usuarios están almacenados en `db.json` y se validan en tiempo real contra el backend:

| Rol | Correo Electrónico | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **👑 Administrador** | `admin@tacologia.com` | `1234` | Acceso a todo el sistema, Panel Admin (`/admin`), gestión de reservas y menú. |
| **👤 Cliente / User** | `user@tacologia.com` | `1234` | Acceso a Home, Menú, Dashboard de huésped y Creación de Reservas. |

> 💡 **Tip:** En la pantalla de `/login` existen botones de acceso rápido que autocompletan las credenciales para agilizar las pruebas de evaluación.

---

## 🗺 Rutas del Sistema

| Ruta | Componente | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Público | Página de inicio con Hero inmersivo de Víctor, carta y reserva rápida. |
| `/login` | `Login` | Público | Formulario de autenticación con validación contra JSON Server. |
| `/dashboard` | `Dashboard` | 🔒 Protegido (Cualquier rol) | Visualización y cancelación de las reservas personales del comensal. |
| `/reservas` | `Reservas` | 🔒 Protegido (Cualquier rol) | Módulo de Kendall: lectura y escritura de reservas en JSON Server. |
| `/admin` | `AdminLayout` | 🔒 Protegido (**Solo Admin**) | Métricas operativas, confirmación/eliminación de reservas y catálogo. |
| `/acceso-denegado` | `AccesoDenegado` | Público / Redirección | Error 403 amigable para usuarios comunes que intenten entrar a `/admin`. |

---

## 🛡 Control de Acceso y Roles

El componente `RutaProtegida` (`src/components/RutaProtegida.jsx`) evalúa:
1. **Autenticación:** Si el usuario no ha iniciado sesión, es redirigido automáticamente a `/login`, conservando la ruta intentada en `location.state.from`.
2. **Rol:** Si la ruta requiere un rol específico (como `requiredRole="admin"`) y el usuario tiene rol `user`, es redirigido de inmediato a `/acceso-denegado`.

### Adaptación de Interfaz según Rol:
- **Visitante no autenticado:** Ve en el Navbar: *Inicio*, *Menú Exclusivo*, botón *Iniciar Sesión* y botón *Reservar Mesa*.
- **Cliente (`user`):** Ve: *Inicio*, *Menú*, *Dashboard*, *Reservas*, tarjeta de perfil "👤 Cliente" y botón *Salir*. **No tiene acceso visual ni de ruta a `/admin`**.
- **Administrador (`admin`):** Ve: *Inicio*, *Menú*, *Dashboard*, *Reservas*, acceso directo a *⚙️ Panel Admin*, tarjeta de perfil "👑 Administrador" y botón *Salir*.

---

## 🔄 Flujo de Autenticación y Persistencia

1. El usuario envía sus credenciales desde `/login`.
2. `AuthContext` realiza una consulta a `http://localhost:3000/users` en JSON Server.
3. Se valida el correo y la contraseña. Si son incorrectos o el correo no existe, se muestra un mensaje explicativo en la tarjeta de login.
4. Si son válidos, se genera el estado `user` y se almacena en `localStorage` con la clave `tacologia_user`.
5. Al recargar la página (F5), la sesión persiste sin obligar a loguearse nuevamente.
6. Al pulsar **Salir (Logout)**, se remueve el usuario del estado y de `localStorage`, redirigiendo al login y bloqueando el acceso posterior a las rutas privadas.

---

## 📅 Gestión de Reservaciones (JSON Server)

Las operaciones de reservaciones se comunican directamente con el endpoint REST `http://localhost:3000/reservations`:
- **GET `/reservations`:** Lee todas las reservaciones almacenadas.
- **POST `/reservations`:** Inserta una nueva reservación con fecha, hora, comensales, zona de mesa y notas.
- **PATCH `/reservations/:id`:** Actualiza el estatus de la reserva (ej. de `pendiente` a `confirmada`).
- **DELETE `/reservations/:id`:** Cancela o elimina definitivamente una reserva.

---

© 2026 **Tacología** · Restaurante de Comida Mexicana de Autor.
