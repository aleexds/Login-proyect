import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard({ currentUser, reservations = [], onCancelReservation }) {
  const { user: authUser } = useAuth();
  const effectiveUser = currentUser || authUser;

  // Filtrar reservaciones que correspondan al usuario si es rol user
  const userReservations = effectiveUser?.role === 'admin' 
    ? reservations 
    : reservations.filter((r) => String(r.userId) === String(effectiveUser?.id) || !r.userId);

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
              <span className="material-symbols-outlined empty-icon" style={{ fontSize: '2.5rem', color: '#d4af37' }}>
                calendar_month
              </span>
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
                      <span className="detail-label">Mesa / Zona</span>
                      <span className="detail-value">{res.tableArea || 'Terraza Volcán'}</span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <span className="material-symbols-outlined" style={{ color: '#d4af37' }}>info</span>
              <h3 style={{ margin: 0 }}>Tacología Costa Rica</h3>
            </div>
            <p>
              Ubicados en <strong>Avenida Escazú, San José, Costa Rica</strong>. Toda nuestra alta cocina de autor cuenta con ingredientes seleccionados y precios en <strong>Colones Costarricenses (₡ CRC)</strong> con impuestos incluidos.
            </p>
            <ul>
              <li>Tolerancia máxima de 15 minutos en mesa.</li>
              <li>Código de vestimenta: Smart Casual.</li>
              <li>Servicio de Valet Parking de cortesía.</li>
              <li>Cata de mezcales artesanales y destilados.</li>
              <li>Teléfono Concierge: +506 2288-TACO (8226)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
