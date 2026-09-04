import React, { useState } from 'react';
import './AdminPanel.css';

export default function AdminPanel({ reservations = [], onUpdateStatus, onDeleteReservation, menu = [], onAddMenuItem }) {
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'Especialidades',
    price: '',
    description: '',
    badge: 'Nuevo'
  });
  const [activeAdminSection, setActiveAdminSection] = useState('reservations');
  const [feedback, setFeedback] = useState('');

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    if (onAddMenuItem) {
      onAddMenuItem({
        ...newDish,
        id: Date.now(),
        price: Number(newDish.price)
      });
    }
    setFeedback(`¡Platillo "${newDish.name}" agregado exitosamente a la carta!`);
    setNewDish({
      name: '',
      category: 'Especialidades',
      price: '',
      description: '',
      badge: 'Nuevo'
    });
  };

  return (
    <div className="admin-panel-page">
      <div className="admin-header">
        <div>
          <span className="admin-tag">GESTIÓN EJECUTIVA</span>
          <h1 className="admin-title">Panel de Administración Tacología</h1>
          <p className="admin-subtitle">
            Control de todas las reservas y administración del menú oficial en vivo.
          </p>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeAdminSection === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveAdminSection('reservations')}
          >
            Reservas Globales ({reservations.length})
          </button>
          <button 
            className={`tab-btn ${activeAdminSection === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveAdminSection('menu')}
          >
            Gestión del Menú ({menu.length})
          </button>
        </div>
      </div>

      {feedback && <div className="admin-feedback">{feedback}</div>}

      {activeAdminSection === 'reservations' ? (
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha & Hora</th>
                <th>Personas</th>
                <th>Zona</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id}>
                  <td><strong>#{res.id}</strong></td>
                  <td>
                    <div className="table-client-info">
                      <span className="name">{res.name || 'Cliente'}</span>
                      <span className="phone">{res.phone || 'S/N'}</span>
                    </div>
                  </td>
                  <td>{res.date} a las {res.time}</td>
                  <td>{res.guests} comensales</td>
                  <td>{res.tableArea || 'Terraza Agave'}</td>
                  <td>
                    <span className={`status-tag ${res.status || 'pendiente'}`}>
                      {res.status || 'pendiente'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-action confirm"
                        onClick={() => onUpdateStatus && onUpdateStatus(res.id, 'confirmada')}
                      >
                        Aprobar
                      </button>
                      <button 
                        className="btn-action delete"
                        onClick={() => onDeleteReservation && onDeleteReservation(res.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="menu-manager-grid">
          <div className="add-dish-form-card">
            <h3>Agregar Nuevo Platillo al Menú</h3>
            <form onSubmit={handleAddDish} className="dish-form">
              <div className="form-group">
                <label>Nombre del Platillo</label>
                <input 
                  type="text" 
                  value={newDish.name}
                  onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                  placeholder="Ej. Taco de Langosta al Mezcal"
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select 
                    value={newDish.category}
                    onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                  >
                    <option value="Especialidades">Especialidades</option>
                    <option value="Del Mar">Del Mar</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Postres">Postres</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio (MXN)</label>
                  <input 
                    type="number" 
                    value={newDish.price}
                    onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                    placeholder="250"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descripción Culinaria</label>
                <textarea 
                  rows="3"
                  value={newDish.description}
                  onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                  placeholder="Ingredientes clave, salsa de acompañamiento y notas de sabor..."
                />
              </div>

              <button type="submit" className="btn-add-dish">
                Registrar en Menú
              </button>
            </form>
          </div>

          <div className="current-dishes-list">
            <h3>Carta Vigente</h3>
            <div className="dishes-mini-list">
              {menu.map((dish) => (
                <div className="dish-mini-item" key={dish.id}>
                  <div>
                    <h4>{dish.name}</h4>
                    <p>{dish.category} · ${dish.price} MXN</p>
                  </div>
                  <span className="dish-mini-badge">{dish.badge || 'Carta'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
