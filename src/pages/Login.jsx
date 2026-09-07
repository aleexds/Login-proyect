import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Por favor ingrese su correo y contraseña.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      // Redirigir según origen previo o rol
      if (from) {
        navigate(from, { replace: true });
      } else if (result.user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  const fillCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <div className="ambient-glow"></div>

      <div className="login-card">
        <div className="login-header">
          {/* Ilustración de Trompo de Pastor con Piña */}
          <div className="trompo-icon-wrapper">
            <svg className="trompo-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="4" width="4" height="56" rx="2" fill="#9CA3AF" />
              <polygon points="32,6 26,14 38,14" fill="#F59E0B" />
              <path d="M20 18 C20 18, 32 16, 44 18 L48 26 C48 26, 32 28, 16 26 Z" fill="#EA580C" />
              <path d="M18 27 C18 27, 32 25, 46 27 L44 36 C44 36, 32 38, 20 36 Z" fill="#F97316" />
              <path d="M21 37 C21 37, 32 35, 43 37 L40 45 C40 45, 32 47, 24 45 Z" fill="#C2410C" />
              <path d="M25 46 C25 46, 32 45, 39 46 L35 52 C35 52, 32 54, 29 52 Z" fill="#9A3412" />
            </svg>
          </div>

          <h1 className="brand-title">TACOLOGÍA</h1>
          <p className="brand-subtitle">Alta Taquería Mexicana</p>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo Electrónico</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@tacologia.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Acceder al Sistema</span>
            )}
          </button>
        </form>

        {/* Accesos directos para pruebas académicas */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #2e384d', fontSize: '0.8rem', color: '#9ca3af' }}>
          <p style={{ marginBottom: '0.5rem', textAlign: 'center', fontWeight: 600 }}>Cargar credenciales de prueba:</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => fillCredentials('admin@tacologia.com', '1234')}
              style={{
                background: '#202632',
                border: '1px solid #f59e0b',
                color: '#f59e0b',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              👑 Admin Demo
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('user@tacologia.com', '1234')}
              style={{
                background: '#202632',
                border: '1px solid #3b82f6',
                color: '#60a5fa',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              👤 Cliente Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;