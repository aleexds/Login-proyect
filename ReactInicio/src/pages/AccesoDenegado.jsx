import { Link } from 'react-router-dom'

export default function AccesoDenegado() {
  return (
    <main className="centered-page">
      <section className="access-card">
        <span className="access-symbol">!</span>
        <span className="eyebrow">Acceso restringido</span>
        <h1>Esta mesa no esta disponible para ti</h1>
        <p>No tienes los permisos necesarios para acceder a esta seccion. Regresa al inicio o consulta tu panel.</p>
        <div className="action-row">
          <Link className="button button-primary" to="/">Volver al inicio</Link>
          <Link className="button button-secondary" to="/dashboard">Ir al dashboard</Link>
        </div>
      </section>
    </main>
  )
}
