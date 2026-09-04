import React, { useState } from 'react';
import TrompoTaco from '../components/TrompoTaco';
import './Home.css';

export default function Home({ onNavigate, menu = [], onQuickReserve }) {
  const [reserveForm, setReserveForm] = useState({
    name: '',
    phone: '',
    date: '2026-09-12',
    time: '20:00',
    guests: 2,
    tableArea: 'Terraza Agave'
  });
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reserveForm.name || !reserveForm.phone) {
      setFeedback('Por favor completa tu nombre y teléfono para confirmar la reserva.');
      return;
    }
    if (onQuickReserve) {
      onQuickReserve(reserveForm);
    }
    setFeedback(`¡Mesa solicitada con éxito para ${reserveForm.guests} personas a nombre de ${reserveForm.name}!`);
    setReserveForm({
      name: '',
      phone: '',
      date: '2026-09-12',
      time: '20:00',
      guests: 2,
      tableArea: 'Terraza Agave'
    });
  };

  return (
    <div className="home-container">
      {/* Trompo 3D interactivo fijo al lado derecho — gira con el scroll */}
      <TrompoTaco />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag">EXPERIENCIA GASTRONÓMICA MEXICANA</div>
          <h1 className="hero-title">
            El Arte Supremo del <span className="text-highlight">Taco de Autor</span>
          </h1>
          <p className="hero-description">
            En Tacología combinamos técnicas ancestrales de nixtamalización con los cortes 
            y mariscos más selectos del país. Aromas a leña, destilados de agave y un ambiente 
            incomparable diseñado para sibaritas.
          </p>
          <div className="hero-actions">
            <a href="#booking-section" className="btn-primary">
              Reservar una Mesa
            </a>
            <button onClick={() => onNavigate && onNavigate('menu')} className="btn-secondary">
              Ver Menú Exclusivo
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Maíz Criollo Nixtamalizado</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">+40</span>
              <span className="stat-label">Etiquetas de Mezcal & Tequila</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">4.9 ★</span>
              <span className="stat-label">Excelencia Culinaria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Highlights */}
      <section className="menu-preview-section">
        <div className="section-header">
          <span className="section-subtitle">CREACIONES ESTRELLA</span>
          <h2 className="section-title">Nuestra Carta de Temporada</h2>
          <p className="section-description">
            Platillos conceptualizados por nuestros maestros taqueros con insumos de denominación de origen.
          </p>
        </div>

        <div className="menu-cards-grid">
          {menu.map((dish) => (
            <div className="dish-card" key={dish.id}>
              <div className="dish-badge">{dish.badge || dish.category}</div>
              <div className="dish-body">
                <div className="dish-top">
                  <h3 className="dish-name">{dish.name}</h3>
                  <span className="dish-price">${dish.price} MXN</span>
                </div>
                <p className="dish-desc">{dish.description}</p>
                <div className="dish-footer">
                  <span className="dish-category-tag">{dish.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-section" className="booking-section">
        <div className="booking-wrapper">
          <div className="booking-info">
            <span className="section-subtitle">EXPERIENCIA PRIVADA</span>
            <h2 className="section-title">Reserva tu Experiencia</h2>
            <p className="booking-text">
              Garantiza tu lugar en nuestro salón principal, cava de mezcales o terraza al aire libre. 
              Ideal para celebraciones memorables y veladas de alta cocina.
            </p>
            <div className="perks-list">
              <div className="perk-item">
                <span className="perk-icon">✦</span>
                <div>
                  <strong>Mesas Exclusivas:</strong> Servicio personalizado de sommelier de agaves.
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✦</span>
                <div>
                  <strong>Control de Reserva:</strong> Puedes consultar o actualizar tu estatus desde tu cuenta.
                </div>
              </div>
            </div>
          </div>

          <div className="booking-form-card">
            <h3>Solicitar Reservación</h3>
            {feedback && <div className="feedback-alert">{feedback}</div>}
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label>Nombre y Apellidos</label>
                <input 
                  type="text" 
                  placeholder="Ej. Sofía Valenzuela"
                  value={reserveForm.name}
                  onChange={(e) => setReserveForm({...reserveForm, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono de Contacto</label>
                  <input 
                    type="tel" 
                    placeholder="+52 55 ..."
                    value={reserveForm.phone}
                    onChange={(e) => setReserveForm({...reserveForm, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Número de Personas</label>
                  <select 
                    value={reserveForm.guests}
                    onChange={(e) => setReserveForm({...reserveForm, guests: Number(e.target.value)})}
                  >
                    <option value={1}>1 Persona</option>
                    <option value={2}>2 Personas (Mesa íntima)</option>
                    <option value={4}>4 Personas</option>
                    <option value={6}>6 Personas</option>
                    <option value={8}>8+ Personas (Grupo)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input 
                    type="date"
                    value={reserveForm.date}
                    onChange={(e) => setReserveForm({...reserveForm, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hora</label>
                  <select 
                    value={reserveForm.time}
                    onChange={(e) => setReserveForm({...reserveForm, time: e.target.value})}
                  >
                    <option value="14:00">14:00 hrs (Comida)</option>
                    <option value="16:00">16:00 hrs</option>
                    <option value="19:00">19:00 hrs (Cena)</option>
                    <option value="20:30">20:30 hrs</option>
                    <option value="22:00">22:00 hrs</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Zona Preferida</label>
                <select 
                  value={reserveForm.tableArea}
                  onChange={(e) => setReserveForm({...reserveForm, tableArea: e.target.value})}
                >
                  <option value="Terraza Agave">Terraza Agave (Exterior con vista)</option>
                  <option value="Salón Mezcal">Salón Mezcal (Íntimo & Cava)</option>
                  <option value="Barra Oaxaqueña">Barra del Chef Taquero</option>
                </select>
              </div>

              <button type="submit" className="btn-submit-booking">
                Confirmar Solicitud de Reserva
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
