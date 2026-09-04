import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destination = location.state?.from?.pathname || '/dashboard'
  function signIn(nextUser) { login(nextUser); navigate(destination, { replace: true }) }
  return <main className="centered-page"><section className="login-card"><span className="eyebrow">Bienvenido a Tacologia</span><h1>Entra a tu mesa</h1><p>Selecciona un perfil de demostracion para explorar el flujo.</p><button className="profile-button" type="button" onClick={() => signIn({ id: 1, name: 'Ana', role: 'user' })}><strong>Cliente</strong><span>Consulta y crea tus reservas</span></button><button className="profile-button" type="button" onClick={() => signIn({ id: 99, name: 'Equipo Tacologia', role: 'admin' })}><strong>Administrador</strong><span>Supervisa toda la agenda</span></button></section></main>
}
