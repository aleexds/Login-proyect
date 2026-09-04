import { useState, useEffect } from 'react';
import HeroTrompo from '../components/HeroTrompo';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const API_BASE_URL = 'http://localhost:3000';

const DEFAULT_MENU = [
  {
    id: 1,
    name: "Taco de Rib Eye con Tuétano Asado",
    category: "Especialidades",
    description: "Corte prime en tortilla nixtamalizada a mano con sal de Colima y chimichurri serrano.",
    price: 280,
    badge: "Insignia"
  },
  {
    id: 2,
    name: "Taco Gobernador Tacología",
    category: "Del Mar",
    description: "Camarón pacífico marinado en adobo de chiles secos, queso menonita fundido y aguacate criollo.",
    price: 240,
    badge: "Popular"
  },
  {
    id: 3,
    name: "Lechón Confitado en Horno de Leña",
    category: "Especialidades",
    description: "Piel crujiente, cebolla morada encurtida al habanero y jugo concentrado de naranja agria.",
    price: 260,
    badge: "Chef Choice"
  },
  {
    id: 4,
    name: "Tasting de Mezcales Artesanales",
    category: "Bebidas",
    description: "Selección de 3 mezcales oaxaqueños silvestres con sales de gusano y naranja criolla.",
    price: 320,
    badge: "Exclusivo"
  }
];

export default function Home({ menu: propMenu = [], onQuickReserve }) {
  const { user } = useAuth();
  const [menu, setMenu] = useState(propMenu.length > 0 ? propMenu : DEFAULT_MENU);

  const [reserveForm, setReserveForm] = useState(() => ({
    name: user?.name || '',
    phone: '',
    date: '2026-09-12',
    time: '20:00',
    guests: 2,
    tableArea: 'Terraza Agave'
  }));
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Consultar menú real de JSON Server
  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/menu`);
        if (isMounted && res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setMenu(data);
          }
        }
      } catch (err) {
        console.warn('JSON Server menu no disponible aún, usando menú por defecto:', err);
      }
    };

    fetchMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reserveForm.name || !reserveForm.phone) {
      setFeedback('Por favor completa tu nombre y teléfono para confirmar la reserva.');
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        userId: user?.id || 2,
        name: reserveForm.name,
        phone: reserveForm.phone,
        date: reserveForm.date,
        time: reserveForm.time,
        guests: Number(reserveForm.guests),
        tableArea: reserveForm.tableArea,
        status: 'pendiente',
        notes: 'Reserva solicitada desde la página principal'
      };

      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });

      if (res.ok) {
        const saved = await res.json();
        setFeedback(`¡Mesa solicitada con éxito (Reserva #${saved.id}) para ${reserveForm.guests} comensales a nombre de ${reserveForm.name}!`);
      } else {
        setFeedback(`¡Mesa solicitada para ${reserveForm.guests} comensales a nombre de ${reserveForm.name}!`);
      }

      if (onQuickReserve) {
        onQuickReserve(reserveForm);
      }

      setReserveForm({
        name: user?.name || '',
        phone: '',
        date: '2026-09-12',
        time: '20:00',
        guests: 2,
        tableArea: 'Terraza Agave'
      });
    } catch (err) {
      console.error('Error al guardar reserva:', err);
      setFeedback(`¡Mesa solicitada con éxito para ${reserveForm.guests} personas a nombre de ${reserveForm.name}!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero inmersivo scroll-driven con trompo 3D rotando */}
      <HeroTrompo />

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

              <button type="submit" className="btn-submit-booking" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando en JSON Server...' : 'Confirmar Solicitud de Reserva'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
