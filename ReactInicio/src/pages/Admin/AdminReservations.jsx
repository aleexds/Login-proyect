import React, { useState } from 'react';
import './AdminReservations.css';

export default function AdminReservations({ reservations, onUpdateStatus, onDeleteReservation }) {
  const [filter, setFilter] = useState('todas');
  const [search, setSearch] = useState('');

  const filteredReservations = reservations.filter(res => {
    if (filter !== 'todas' && res.status !== filter) return false;
    if (search && !res.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="admin-section">
      <div className="section-header-actions">
        <div>
          <h2>Gestión de Reservaciones</h2>
          <p>Administra las reservas entrantes y confirmadas.</p>
        </div>
        <div className="actions-right">
          <input 
            type="text" 
            placeholder="Buscar por cliente..." 
            className="admin-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="admin-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmada">Confirmadas</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha & Hora</th>
              <th>Detalles</th>
              <th>Zona (Mesa)</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-empty">No hay reservaciones con estos criterios.</td>
              </tr>
            ) : (
              filteredReservations.map(res => (
                <tr key={res.id}>
                  <td><span className="res-id">#{res.id}</span></td>
                  <td>
                    <div className="client-cell">
                      <span className="client-name">{res.name}</span>
                      <span className="client-phone">{res.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="datetime-cell">
                      <span className="date">{res.date}</span>
                      <span className="time">{res.time} hrs</span>
                    </div>
                  </td>
                  <td>
                    <span className="guests-badge">👤 {res.guests}</span>
                    {res.notes && <p className="res-notes" title={res.notes}>{res.notes}</p>}
                  </td>
                  <td><span className="zone-tag">{res.tableArea || 'Principal'}</span></td>
                  <td>
                    <span className={`status-pill ${res.status}`}>
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {res.status === 'pendiente' && (
                        <button 
                          className="btn-icon approve"
                          title="Confirmar"
                          onClick={() => onUpdateStatus(res.id, 'confirmada')}
                        >✓</button>
                      )}
                      <button 
                        className="btn-icon delete"
                        title="Eliminar"
                        onClick={() => onDeleteReservation(res.id)}
                      >✕</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
