import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import RutaProtegida from './components/RutaProtegida'
import AccesoDenegado from './pages/AccesoDenegado'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Reservas from './pages/Reservas'
import { useAuth } from './context/useAuth'

function Navigation() {
  const { isAuthenticated, logout } = useAuth()
  return <nav className="navigation"><Link className="brand" to="/">TACOLOGIA<span>.</span></Link><div className="nav-links">{isAuthenticated ? <><Link to="/dashboard">Dashboard</Link><Link to="/reservas">Reservas</Link><button className="nav-logout" type="button" onClick={logout}>Salir</button></> : <Link to="/login">Iniciar sesion</Link>}</div></nav>
}

export default function App() {
  return <BrowserRouter><Navigation /><Routes><Route path="/" element={<Home />} /><Route path="/login" element={<Login />} /><Route path="/acceso-denegado" element={<AccesoDenegado />} /><Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} /><Route path="/reservas" element={<RutaProtegida allowedRoles={['admin', 'user']}><Reservas /></RutaProtegida>} /><Route path="*" element={<Home />} /></Routes></BrowserRouter>
}
