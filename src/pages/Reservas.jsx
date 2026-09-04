import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Reservas.css';

const API_BASE_URL = 'http://localhost:3000';

export default function Reservas() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: 2,
    tableArea: 'Terraza Agave',
    notes: ''
  });

  // Cargar reservas desde JSON Server
  const fetchReservations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`);
      if (res.ok) {
        const data = await res.json();
        if (user?.role === 'admin') {
          setReservations(data);
        } else {
          const filtered = data.filter(r => 
            String(r.userId) === String(user?.id) || 
            (r.name && user?.name && r.name.toLowerCase() === user.name.toLowerCase())
          );
          setReservations(filtered);
        }
      }
    } catch (err) {
      console.error('Error al obtener reservaciones de JSON Server:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reservations`);
        if (isMounted && res.ok) {
          const data = await res.json();
          if (user?.role === 'admin') {
            setReservations(data);
          } else {
            const filtered = data.filter(r => 
              String(r.userId) === String(user?.id) || 
              (r.name && user?.name && r.name.toLowerCase() === user.name.toLowerCase())
            );
            setReservations(filtered);
          }
        }
      } catch (err) {
        console.error('Error al obtener reservaciones de JSON Server:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Manejar creación de nueva reserva (Operación de escritura en JSON Server)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setFeedback({ type: 'error', message: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    setSubmitting(true);
    try {
      const newReservation = {
        userId: user?.id || 2,
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        tableArea: formData.tableArea,
        status: 'pendiente',
        notes: formData.notes
      };

      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
      });

      if (!response.ok) {
        throw new Error('Error al registrar reserva en el servidor');
      }

      const created = await response.json();
      setFeedback({
        type: 'success',
        message: `¡Reservación #${created.id} registrada con éxito para el ${created.date} a las ${created.time} hrs!`
      });

      // Resetear formulario manteniendo el nombre del usuario
      setFormData({
        name: user?.name || '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '20:00',
        guests: 2,
        tableArea: 'Terraza Agave',
        notes: ''
      });

      // Recargar la lista desde el servidor
      await fetchReservations();
    } catch (err) {
      console.error('Error al guardar la reservación:', err);
      setFeedback({
        type: 'error',
        message: 'No se pudo guardar la reserva en JSON Server. Verifica que el servidor esté activo.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Cancelar/Eliminar reserva
  const handleCancelReservation = async (id) => {
    if (!window.confirm(`¿Estás seguro de cancelar la reservación #${id}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setReservations(prev => prev.filter(r => r.id !== id));
        setFeedback({ type: 'success', message: `La reservación #${id} ha sido cancelada.` });
      } else {
        throw new Error('No se pudo cancelar en el servidor');
      }
    } catch (err) {
      console.error('Error al cancelar reserva:', err);
      setFeedback({ type: 'error', message: 'Error al cancelar la reservación en el servidor.' });
    }
  };

  return (
    <div className="reservas-page">
      <div className="reservas-header">
        <span className="reservas-tag">SISTEMA DE RESERVAS</span>
        <h1 className="reservas-title">Gestionar Reservaciones</h1>
        <p className="reservas-subtitle">
          Programa tu próxima visita gourmet en Tacología. Todos los registros son sincronizados directamente con nuestro backend.
        </p>
      </div>

      <div className="reservas-layout-grid">
        {/* Formulario de Escritura */}
        <div className="reserva-form-card">
          <h2><span>📝</span> Nueva Solicitud de Reserva</h2>

          {feedback.message && (
            <div className={`alert-box alert-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-res">
              <label>Nombre del Titular *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre completo"
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group-res">
                <label>Teléfono de Contacto *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+52 55 ..."
                  required
                />
              </div>

              <div className="form-group-res">
                <label>Número de Comensales *</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                >
                  <option value={1}>1 Persona</option>
                  <option value={2}>2 Personas</option>
                  <option value={4}>4 Personas</option>
                  <option value={6}>6 Personas</option>
                  <option value={8}>8+ Personas</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group-res">
                <label>Fecha *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-res">
                <label>Hora *</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="13:30">13:30 hrs</option>
                  <option value="15:00">15:00 hrs</option>
                  <option value="19:00">19:00 hrs</option>
                  <option value="20:00">20:00 hrs</option>
                  <option value="21:30">21:30 hrs</option>
                </select>
              </div>
            </div>

            <div className="form-group-res">
              <label>Zona de Mesa</label>
              <select
                value={formData.tableArea}
                onChange={(e) => setFormData({ ...formData, tableArea: e.target.value })}
              >
                <option value="Terraza Agave">Terraza Agave (Exterior)</option>
                <option value="Salón Mezcal">Salón Mezcal (Íntimo & Cava)</option>
                <option value="Barra Oaxaqueña">Barra Oaxaqueña</option>
              </select>
            </div>

            <div className="form-group-res">
              <label>Notas Especiales o Alergias (Opcional)</label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ej. Aniversario, mesa silenciosa, silla alta para bebé..."
              />
            </div>

            <button type="submit" className="btn-submit-reserva" disabled={submitting}>
              {submitting ? 'Procesando en JSON Server...' : 'Confirmar Reservación'}
            </button>
          </form>
        </div>

        {/* Panel de Visualización */}
        <div className="reservas-list-panel">
          <div className="panel-header-flex">
            <h2>{user?.role === 'admin' ? 'Todas las Reservas (Admin)' : 'Mis Reservaciones'}</h2>
            <span className="res-count-badge">{reservations.length} activas</span>
          </div>

          {loading ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>
              Cargando reservas desde backend...
            </p>
          ) : reservations.length === 0 ? (
            <div className="empty-res-card">
              <span className="empty-res-icon">📅</span>
              <p>No tienes reservaciones registradas en este momento.</p>
            </div>
          ) : (
            <div className="reservas-items-stack">
              {reservations.map((res) => (
                <div className="res-item-card" key={res.id}>
                  <div className="res-item-top">
                    <span className="res-num">Reserva #{res.id}</span>
                    <span className={`status-badge ${res.status || 'pendiente'}`}>
                      {res.status || 'pendiente'}
                    </span>
                  </div>

                  <div className="res-grid-info">
                    <div className="info-cell">
                      <span className="info-cell-label">Cliente</span>
                      <span className="info-cell-val">{res.name}</span>
                    </div>
                    <div className="info-cell">
                      <span className="info-cell-label">Fecha</span>
                      <span className="info-cell-val">{res.date}</span>
                    </div>
                    <div className="info-cell">
                      <span className="info-cell-label">Hora</span>
                      <span className="info-cell-val">{res.time} hrs</span>
                    </div>
                    <div className="info-cell">
                      <span className="info-cell-label">Mesa / Zona</span>
                      <span className="info-cell-val">{res.tableArea || 'Terraza'}</span>
                    </div>
                    <div className="info-cell">
                      <span className="info-cell-label">Comensales</span>
                      <span className="info-cell-val">{res.guests} pers.</span>
                    </div>
                  </div>

                  {res.notes && (
                    <div className="res-notes-text">
                      <strong>Detalles:</strong> {res.notes}
                    </div>
                  )}

                  <div className="res-actions-bar">
                    <button
                      className="btn-cancel-reserva"
                      onClick={() => handleCancelReservation(res.id)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
