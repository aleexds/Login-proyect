import React, { useState, useEffect } from 'react';
import HeroTrompo from '../components/HeroTrompo';
import MrTaquito from '../components/MrTaquito';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home({ onNavigate, menu = [], onQuickReserve }) {
  const { logout, user } = useAuth();

  // Por seguridad: cada vez que se devuelve a la página inicial se cierra la sesión
  useEffect(() => {
    if (user) {
      logout();
    }
  }, []);

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
      {/* Hero inmersivo scroll-driven con trompo 3D rotando */}
      <HeroTrompo />

      {/* ═══ SECCIÓN MR. TAQUITO — Presentación del Personaje ═══ */}
      <section className="mr-taquito-section">
        <div className="mr-taquito-content">
          <div className="mr-taquito-text">
            <span className="section-eyebrow">CONOCE A NUESTRO CHEF</span>
            <h2 className="section-heading">Mr. Taquito</h2>
            <p className="section-paragraph">
              Nuestro maestro taquero desde 1930. Con guantes blancos y corazón de maíz, 
              Mr. Taquito supervisa cada receta en el laboratorio del sabor. 
              Su filosofía es simple: <strong>"La ciencia exacta del antojo"</strong>.
            </p>
            <div className="taquito-facts">
              <div className="fact-chip">
                <span className="fact-icon">🌽</span>
                <span>Tortilla nixtamalizada</span>
              </div>
              <div className="fact-chip">
                <span className="fact-icon">🔬</span>
                <span>Recetas de laboratorio</span>
              </div>
              <div className="fact-chip">
                <span className="fact-icon">🌶️</span>
                <span>Salsas artesanales</span>
              </div>
            </div>
          </div>
          <div className="mr-taquito-character">
            <MrTaquito size={340} waving={true} showBubble={true} />
          </div>
        </div>
      </section>

      {/* ═══ EL LABORATORIO DE TACOS — Menú Interactivo ═══ */}
      <section id="menu-section" className="menu-lab-section">
        <div className="section-header-centered">
          <span className="section-eyebrow">EL LABORATORIO DE TACOS</span>
          <h2 className="section-heading">Nuestra Carta de Temporada</h2>
          <p className="section-paragraph-center">
            Platillos conceptualizados por Mr. Taquito y su equipo de maestros taqueros con insumos de denominación de origen.
          </p>
        </div>

        <div className="menu-lab-grid">
          {menu.map((dish) => (
            <div className="lab-card" key={dish.id}>
              <div className="lab-card-badge">{dish.badge || dish.category}</div>
              <div className="lab-card-body">
                <div className="lab-card-top">
                  <h3 className="lab-card-name">{dish.name}</h3>
                  <span className="lab-card-price">₡{Number(dish.price).toLocaleString('es-CR')}</span>
                </div>
                <p className="lab-card-desc">{dish.description}</p>
                <div className="lab-card-footer">
                  <span className="lab-card-category">{dish.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MANIFIESTO TACOLOGÍA ═══ */}
      <section id="manifiesto-section" className="manifiesto-section">
        <div className="manifiesto-content">
          <span className="section-eyebrow">NUESTRO MANIFIESTO</span>
          <h2 className="section-heading">La Filosofía del Taco Perfecto</h2>
          <div className="manifiesto-grid">
            <div className="manifiesto-card">
              <div className="manifiesto-icon-wrap">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#F2B84B" opacity="0.15" stroke="#F2B84B" strokeWidth="2"/>
                  <path d="M16 24 L22 30 L34 18" stroke="#F2B84B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <h3>Ingredientes Auténticos</h3>
              <p>Maíz criollo nixtamalizado, chiles de Oaxaca y especias de primera. Sin atajos, sin sustitutos.</p>
            </div>
            <div className="manifiesto-card">
              <div className="manifiesto-icon-wrap">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#D93829" opacity="0.15" stroke="#D93829" strokeWidth="2"/>
                  <path d="M24 12 L24 24 L32 28" stroke="#D93829" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <h3>Fuego y Paciencia</h3>
              <p>Cada trompo gira por horas sobre carbón. La prisa es enemiga del sabor perfecto.</p>
            </div>
            <div className="manifiesto-card">
              <div className="manifiesto-icon-wrap">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#4A8C3F" opacity="0.15" stroke="#4A8C3F" strokeWidth="2"/>
                  <path d="M24 14 C18 14 14 18 14 24 C14 30 24 36 24 36 C24 36 34 30 34 24 C34 18 30 14 24 14Z" stroke="#4A8C3F" strokeWidth="2.5" fill="none"/>
                </svg>
              </div>
              <h3>Hecho con Amor</h3>
              <p>Cada taco es una obra de arte que Mr. Taquito prepara con el cariño de la tradición mexicana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESERVACIONES ═══ */}
      <section id="booking-section" className="booking-section">
        <div className="booking-wrapper">
          <div className="booking-info">
            <span className="section-eyebrow">EXPERIENCIA PRIVADA · COSTA RICA</span>
            <h2 className="section-heading">Reserva tu Experiencia</h2>
            <p className="booking-text">
              Garantiza tu lugar en nuestra sede en <strong>Avenida Escazú, Costa Rica</strong>. Salón principal, cava privada de mezcales y terraza al aire libre.
            </p>
            <div className="perks-list">
              <div className="perk-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26Z" fill="#F2B84B" stroke="#D9A23A" strokeWidth="1"/>
                </svg>
                <div>
                  <strong>Alta Gastronomía:</strong> Sabores mexicanos auténticos con ingredientes de primera.
                </div>
              </div>
              <div className="perk-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="3" stroke="#4A8C3F" strokeWidth="2" fill="none"/>
                  <path d="M2 10 L22 10" stroke="#4A8C3F" strokeWidth="2"/>
                  <text x="7" y="18" fill="#4A8C3F" fontSize="6" fontWeight="bold">₡</text>
                </svg>
                <div>
                  <strong>Precios Transparentes:</strong> Todos los valores expresados en Colones Costarricenses (₡ CRC).
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
                  placeholder="Ej. Juan Carlos Morales"
                  value={reserveForm.name}
                  onChange={(e) => setReserveForm({...reserveForm, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono (Costa Rica)</label>
                  <input 
                    type="tel" 
                    placeholder="+506 8888 9999"
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
                    <option value="14:00">14:00 hrs (Almuerzo)</option>
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
                  <option value="Terraza Volcán">Terraza Volcán (Exterior con vista)</option>
                  <option value="Salón Mezcal Escazú">Salón Mezcal Escazú (Íntimo & Cava)</option>
                  <option value="Barra Central del Chef">Barra Central del Chef Taquero</option>
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
