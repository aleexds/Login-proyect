import { Link } from 'react-router-dom'

export default function Home() {
  return <main className="hero-page"><section className="hero-copy"><span className="eyebrow">Cocina mexicana contemporanea</span><h1>El maiz tambien puede ser <em>lujo.</em></h1><p>Sabores de origen, fuego lento y una mesa hecha para quedarse un rato mas.</p><Link className="button button-primary" to="/reservas">Reservar una mesa</Link></section><div className="hero-stamp">CDMX<br /><span>desde 2014</span></div></main>
}
