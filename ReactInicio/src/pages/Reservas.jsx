import { useCallback, useEffect, useMemo, useState } from 'react'
import ReservationCard from '../components/ReservationCard'
import ReservationForm from '../components/ReservationForm'
import { useAuth } from '../context/useAuth'

const API_URL = 'http://localhost:3000/reservations'

export default function Reservas() {
  const { user, role } = useAuth()
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')

  const loadReservations = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('No se pudieron cargar las reservas.')
      setReservations(await response.json())
    } catch (requestError) {
      setError(requestError.message || 'Ocurrio un error al consultar las reservas.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReservations()
  }, [loadReservations])

  const visibleReservations = useMemo(() => {
    if (role === 'admin') return reservations
    return reservations.filter((reservation) => String(reservation.userId) === String(user?.id))
  }, [reservations, role, user?.id])

  async function createReservation(values) {
    setIsSubmitting(true)
    setFormError('')
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, userId: user.id, status: 'confirmada' }),
      })
      if (!response.ok) throw new Error('No se pudo crear la reserva.')
      await loadReservations()
      return true
    } catch (requestError) {
      setFormError(requestError.message || 'Ocurrio un error al crear la reserva.')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <span className="eyebrow">Hospitalidad con alma</span>
          <h1>{role === 'admin' ? 'Todas las reservas' : 'Mis reservas'}</h1>
          <p>{role === 'admin' ? 'Supervisa la agenda completa del restaurante.' : 'Organiza tu proxima experiencia en Tacologia.'}</p>
        </div>
        <span className="role-chip">{role}</span>
      </header>
      {role === 'user' && <ReservationForm onSubmit={createReservation} isSubmitting={isSubmitting} error={formError} />}
      <section className="reservations-section">
        <div className="section-heading">
          <h2>Agenda</h2>
          <button className="text-button" type="button" onClick={loadReservations}>Actualizar</button>
        </div>
        {isLoading && <p className="feedback">Cargando reservas...</p>}
        {!isLoading && error && <div className="feedback feedback-error"><p>{error}</p><button className="button button-secondary" type="button" onClick={loadReservations}>Reintentar</button></div>}
        {!isLoading && !error && visibleReservations.length === 0 && <p className="empty-state">Aun no hay reservas para mostrar.</p>}
        {!isLoading && !error && visibleReservations.length > 0 && <div className="reservation-list">{visibleReservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} showOwner={role === 'admin'} />)}</div>}
      </section>
    </main>
  )
}
