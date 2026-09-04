import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor ingrese su correo y contraseña.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="ambient-glow"></div>

      <div className="login-card">
        <div className="login-header">
          {/* Ilustración de Trompo de Pastor con Piña */}
          <div className="trompo-icon-wrapper">
            <svg className="trompo-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Varilla / Espada metalica */}
              <rect x="30" y="4" width="4" height="56" rx="2" fill="#9CA3AF" />
              {/* Piña en la punta */}
              <polygon points="32,6 26,14 38,14" fill="#F59E0B" />
              {/* Carne de Trompo (capas inclinadas) */}
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
      </div>
    </div>
  );
};