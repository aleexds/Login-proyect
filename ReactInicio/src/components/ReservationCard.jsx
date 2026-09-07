export default function ReservationCard({ reservation, showOwner = false }) {
  return (
    <article className="reservation-card">
      <div className="reservation-date">
        <span>{new Date(`${reservation.date}T00:00:00`).toLocaleDateString('es-CR', { day: '2-digit' })}</span>
        <small>{new Date(`${reservation.date}T00:00:00`).toLocaleDateString('es-CR', { month: 'short' })}</small>
      </div>
      <div className="reservation-info">
        <h3>{reservation.time} · {reservation.guests} {reservation.guests === 1 ? 'persona' : 'personas'}</h3>
        <p>{showOwner ? `Cliente #${reservation.userId}` : 'Mesa reservada en Tacologia'}</p>
      </div>
      <span className="status-badge">{reservation.status}</span>
    </article>
  )
}
