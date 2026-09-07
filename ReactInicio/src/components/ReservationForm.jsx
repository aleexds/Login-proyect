import { useState } from 'react'

const initialForm = { date: '', time: '', guests: 2 }

export default function ReservationForm({ onSubmit, isSubmitting, error }) {
  const [form, setForm] = useState(initialForm)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const wasCreated = await onSubmit({ ...form, guests: Number(form.guests) })
    if (wasCreated) setForm(initialForm)
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="eyebrow">Tu mesa, tu momento</span>
        <h2>Nueva reserva</h2>
      </div>
      <div className="form-grid">
        <label>
          Fecha
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Hora
          <input name="time" type="time" value={form.time} onChange={handleChange} required />
        </label>
        <label>
          Personas
          <input name="guests" type="number" min="1" max="20" value={form.guests} onChange={handleChange} required />
        </label>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Confirmar reserva'}
      </button>
    </form>
  )
}
