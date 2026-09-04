import React from 'react';
import './AdminOverview.css';

export default function AdminOverview({ reservations = [], menu = [] }) {
  const pendingReservations = reservations.filter(r => r.status === 'pendiente').length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmada').length;
  const popularDish = menu.find(m => m.badge === 'Popular') || menu[0];

  // Datos simulados de ingresos semanales para la gráfica
  const weekData = [12, 19, 15, 22, 30, 45, 38];
  const maxVal = Math.max(...weekData);

  return (
    <div className="admin-overview">
      <div className="overview-header">
        <h1>Resumen de Operaciones</h1>
        <p>Métricas y estado general de Tacología al día de hoy.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon pending">⏳</div>
          <div className="kpi-info">
            <h3>Reservas Pendientes</h3>
            <p className="kpi-value">{pendingReservations}</p>
          </div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-icon confirmed">✅</div>
          <div className="kpi-info">
            <h3>Reservas Confirmadas</h3>
            <p className="kpi-value">{confirmedReservations}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon highlight">🌮</div>
          <div className="kpi-info">
            <h3>Platillo Estrella</h3>
            <p className="kpi-value text-small">{popularDish?.name}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon revenue">💰</div>
          <div className="kpi-info">
            <h3>Ingresos Proyectados</h3>
            <p className="kpi-value">$24,500 MXN</p>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-row">
        <div className="chart-card">
          <h3>Tráfico de Comensales (Semana)</h3>
          <div className="css-bar-chart">
            {weekData.map((val, i) => (
              <div key={i} className="bar-group">
                <div className="bar-bg">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${(val / maxVal) * 100}%` }}
                  ></div>
                </div>
                <span className="bar-label">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-card">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            {reservations.slice(0, 4).map(res => (
              <div key={res.id} className="activity-item">
                <div className={`activity-dot ${res.status}`}></div>
                <div className="activity-details">
                  <p><strong>{res.name}</strong> {res.status === 'confirmada' ? 'confirmó' : 'solicitó'} una mesa.</p>
                  <span>Para el {res.date} a las {res.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
