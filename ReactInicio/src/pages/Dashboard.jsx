import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  return <main className="centered-page"><section className="dashboard-card"><span className="eyebrow">Hola, {user.name}</span><h1>Tu experiencia empieza aqui</h1><p>Gestiona tus visitas y deja que nosotros nos ocupemos del resto.</p><Link className="button button-primary" to="/reservas">Ver reservas</Link></section></main>
}
