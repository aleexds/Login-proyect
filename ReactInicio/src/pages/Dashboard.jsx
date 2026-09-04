import React from 'react';
import './Dashboard.css';

export default function Dashboard({ currentUser, reservations = [], onCancelReservation }) {
  // Filtrar reservaciones que correspondan al usuario si es rol user
  const userReservations = currentUser?.role === 'admin' 
    ? reservations 
    : reservations.filter((r) => r.userId === currentUser?.id || !r.userId);

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
      </div>

      <div className="dashboard-grid">
        <div className="reservations-list-container">
          <h2 className="list-title">Historial y Próximas Citas ({userReservations.length})</h2>
          
          {userReservations.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📅</span>
              <p>No tienes reservaciones activas en este momento.</p>
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
                      onClick={() => onCancelReservation && onCancelReservation(res.id)}
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
