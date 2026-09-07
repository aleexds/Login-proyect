import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const API_BASE_URL = 'http://localhost:3000';

export default function Dashboard({ currentUser: propUser, reservations: propReservations, onCancelReservation }) {
  const { user: authUser } = useAuth();
  const currentUser = propUser || authUser;

  const [fetchedReservations, setFetchedReservations] = useState([]);
  const [loading, setLoading] = useState(!propReservations);

  const reservations = propReservations || fetchedReservations;

  useEffect(() => {
    if (propReservations) return;

    let isMounted = true;
    const fetchReservations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reservations`);
        if (isMounted && res.ok) {
          const data = await res.json();
          setFetchedReservations(data);
        }
      } catch (err) {
        console.error('Error al cargar reservaciones en Dashboard:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReservations();

    return () => {
      isMounted = false;
    };
  }, [propReservations]);

  const handleCancel = async (id) => {
    if (onCancelReservation) {
      onCancelReservation(id);
      return;
    }

    if (!window.confirm(`¿Deseas cancelar la reservación #${id}?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setFetchedReservations(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error('Error cancelando reserva:', err);
    }
  };

  // Filtrar reservaciones que correspondan al usuario si es rol user
  const userReservations = currentUser?.role === 'admin' 
    ? reservations 
    : reservations.filter((r) => 
        String(r.userId) === String(currentUser?.id) || 
        (r.name && currentUser?.name && r.name.toLowerCase() === currentUser.name.toLowerCase())
      );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-tag">ÁREA DE HUÉSPEDES</span>
          <h1 className="dashboard-title">Mis Reservaciones</h1>
          <p className="dashboard-subtitle">
            Bienvenido, <strong>{currentUser?.name || 'Cliente'}</strong>. Consulta y gestiona tus visitas programadas en Tacología.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/reservas" 
            style={{
              background: 'linear-gradient(135deg, #e65100, #f57c00)',
              color: '#fff',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(230, 81, 0, 0.3)'
            }}
          >
            + Nueva Reservación
          </Link>
          {currentUser?.role === 'admin' && (
            <Link 
              to="/admin" 
              style={{
                background: '#202632',
                color: '#f59e0b',
                border: '1px solid #f59e0b',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              ⚙️ Abrir Panel Admin
            </Link>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="reservations-list-container">
          <h2 className="list-title">
            Historial y Próximas Citas ({userReservations.length})
          </h2>
          
          {loading ? (
            <div className="empty-state">
              <p>Cargando información desde JSON Server...</p>
            </div>
          ) : userReservations.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📅</span>
              <p>No tienes reservaciones activas en este momento.</p>
              <Link to="/reservas" style={{ color: '#e65100', marginTop: '0.5rem', display: 'inline-block' }}>
                Hacer mi primera reserva →
              </Link>
            </div>
          ) : (
            <div className="cards-stack">
              {userReservations.map((res) => (
                <div className="res-card" key={res.id}>
                  <div className="res-card-top">
                    <div className="res-code">Reserva #{res.id}</div>
                    <span className={`status-pill ${res.status || 'pendiente'}`}>
                      {res.status || 'pendiente'}
                    </span>
                  </div>

                  <div className="res-details-grid">
                    <div className="detail-box">
                      <span className="detail-label">Fecha</span>
                      <span className="detail-value">{res.date}</span>
                    </div>
                    <div className="detail-box">
                      <span className="detail-label">Hora</span>
                      <span className="detail-value">{res.time} hrs</span>
                    </div>
                    <div className="detail-box">
                      <span className="detail-label">Comensales</span>
                      <span className="detail-value">{res.guests} personas</span>
                    </div>
                    <div className="detail-box">
                      <span className="detail-label">Zona</span>
                      <span className="detail-value">{res.tableArea || 'Terraza Agave'}</span>
                    </div>
                  </div>

                  {res.notes && (
                    <div className="res-notes">
                      <strong>Detalles:</strong> {res.notes}
                    </div>
                  )}

                  <div className="res-actions">
                    <button 
                      className="btn-cancel-res"
                      onClick={() => handleCancel(res.id)}
                    >
                      Cancelar Reserva
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="dashboard-sidebar">
          <div className="info-box">
            <h3>Política del Restaurante</h3>
            <p>Se otorga una tolerancia máxima de 15 minutos en mesa. En caso de retraso, contáctanos directamente a concierge.</p>
            <ul>
              <li>Código de vestir: Smart Casual</li>
              <li>Valet Parking de cortesía</li>
              <li>Cata de mezcales bajo solicitud previa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
