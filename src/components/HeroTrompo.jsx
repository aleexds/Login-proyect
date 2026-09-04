import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import trompoImg from '../assets/trompo.jpg';
import './HeroTrompo.css';

/* ─── Generador de chispas holográficas ─── */
function generateSparks(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 15 + Math.random() * 70,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    drift: -80 + Math.random() * 160,
    color: Math.random() > 0.5 ? '#f59e0b' : '#e65100', // Ámbar y fuego
  }));
}

export default function HeroTrompo() {
  const containerRef = useRef(null);
  const sparks = useMemo(() => generateSparks(40), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Escala global del trompo y rotación de secuencia
  const globalScale = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [1.0, 1.2, 1.25, 0.95]);
  const globalRotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const globalOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.2]);
  
  // Parpadeo glitch holográfico en los momentos de mayor separación
  const glitchOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.4, 0.6, 0.65, 0.8, 0.85, 1],
    [0, 0,   0.7,  0.1, 0.8, 0.1,  0.9, 0,    0]
  );

  // ════ SECUENCIA PROGRESIVA DE CORTES (SLICES) ════
  // Fase 1 (0 -> 0.20): Unidos completamente
  // Fase 2 (0.20 -> 0.65): Se deconstruyen y abren revelando el fuego interior
  // Fase 3 (0.65 -> 0.90): Máxima expansión
  // Fase 4 (0.90 -> 1.0): Convergencia armónica
  const s1Y = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -220, -50]);
  const s1R = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -10, 0]);
  const s1X = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -35, 0]);

  const s2Y = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -90, -20]);
  const s2R = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 6, 0]);
  const s2X = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 25, 0]);

  const s3Y = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 0, 0]); // Centro
  const s3R = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -3, 0]);
  const s3X = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -10, 0]);

  const s4Y = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 110, 20]);
  const s4R = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 8, 0]);
  const s4X = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 20, 0]);

  const s5Y = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 260, 60]);
  const s5R = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -8, 0]);
  const s5X = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, -30, 0]);

  // ════ NÚCLEO DE ENERGÍA (Brillo ígneo interior) ════
  const coreScale = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0.4, 1.2, 2.5, 0.8]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.8, 1], [0, 0.3, 0.9, 0.7, 0]);

  // ════ SECUENCIA DE TEXTOS (4 Fases continuas) ════
  // Slide 1: Visible desde el inicio (scroll 0) para impacto visual inmediato
  const t1O = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.16, 0.24], [0, 0, -40]);

  // Slide 2: Fuego en expansión
  const t2O = useTransform(scrollYProgress, [0.25, 0.32, 0.45, 0.51], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.25, 0.32, 0.45, 0.51], [40, 0, 0, -40]);

  // Slide 3: Núcleo al pastor
  const t3O = useTransform(scrollYProgress, [0.52, 0.59, 0.72, 0.78], [0, 1, 1, 0]);
  const t3Y = useTransform(scrollYProgress, [0.52, 0.59, 0.72, 0.78], [40, 0, 0, -40]);

  // Slide 4: Conexión directa y botón CTA
  const t4O = useTransform(scrollYProgress, [0.79, 0.85, 0.96, 1], [0, 1, 1, 0.2]);
  const t4Y = useTransform(scrollYProgress, [0.79, 0.85, 0.96, 1], [40, 0, 0, -20]);

  const slices = [
    { id: 1, y: s1Y, r: s1R, x: s1X, className: 'slice-1' },
    { id: 2, y: s2Y, r: s2R, x: s2X, className: 'slice-2' },
    { id: 3, y: s3Y, r: s3R, x: s3X, className: 'slice-3' },
    { id: 4, y: s4Y, r: s4R, x: s4X, className: 'slice-4' },
    { id: 5, y: s5Y, r: s5R, x: s5X, className: 'slice-5' },
  ];

  return (
    <section ref={containerRef} className="hero-trompo-outer brutal-hologram">
      <div className="hero-trompo-sticky">
        
        {/* Filtro de Scanlines holográficas */}
        <div className="hologram-scanlines" />

        {/* Glow de ambiente */}
        <div className="brutal-glow" />

        {/* Chispas y brasas flotantes */}
        <div className="spark-container">
          {sparks.map((s) => (
            <div
              key={s.id}
              className="spark"
              style={{
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                color: s.color,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
                '--drift': `${s.drift}px`,
              }}
            />
          ))}
        </div>

        {/* ════ TROMPO INTERACTIVO CON SECUENCIA 3D ════ */}
        <motion.div 
          className="hero-trompo-image-wrap" 
          style={{ 
            scale: globalScale, 
            rotateY: globalRotateY,
            opacity: globalOpacity,
            perspective: 1200 
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          {/* Núcleo ígneo de energía que emana del centro */}
          <motion.div 
            className="trompo-core-energy" 
            style={{ scale: coreScale, opacity: coreOpacity }} 
          />

          {slices.map((slice) => (
            <motion.div 
              key={slice.id} 
              className={`slice-wrapper ${slice.className}`}
              style={{ y: slice.y, x: slice.x, rotateZ: slice.r }}
            >
              {/* Imagen Base con Blend Mode Screen */}
              <img src={trompoImg} className="slice-img slice-base" alt="Trompo Tacología" />
              
              {/* Capas de Aberración Cromática (Glitch) */}
              <motion.img 
                src={trompoImg} 
                className="slice-img glitch-cyan" 
                style={{ opacity: glitchOpacity }} 
                alt="" 
                draggable={false}
              />
              <motion.img 
                src={trompoImg} 
                className="slice-img glitch-red" 
                style={{ opacity: glitchOpacity }} 
                alt="" 
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ════ SECUENCIA DE TEXTOS SINCRONIZADOS ════ */}
        <div className="hero-text-layer">
          
          <motion.div className="hero-slide" style={{ opacity: t1O, y: t1Y }}>
            <span className="hero-eyebrow">EXPERIENCIA INMERSIVA</span>
            <h1 className="hero-main-title brutal-text">
              TACO<br />
              <span className="hero-title-accent">LOGÍA</span>
            </h1>
            <p className="hero-subtitle">
              Adéntrate en una experiencia sensorial sin precedentes. La esencia del maíz criollo y el fuego tradicional deconstruida.
            </p>
          </motion.div>

          <motion.div className="hero-slide" style={{ opacity: t2O, y: t2Y }}>
            <span className="hero-eyebrow">ROMPER LA TRADICIÓN</span>
            <h2 className="hero-secondary-title brutal-text">
              Fuego en<br />
              <span className="hero-title-accent">expansión.</span>
            </h2>
            <p className="hero-subtitle">
              Desarmamos lo clásico para construir algo visualmente explosivo y culinariamente perfecto.
            </p>
          </motion.div>

          <motion.div className="hero-slide" style={{ opacity: t3O, y: t3Y }}>
            <span className="hero-eyebrow">NÚCLEO AL PASTOR</span>
            <h2 className="hero-secondary-title brutal-text">
              Sabor al<br />
              <span className="hero-title-accent">descubierto.</span>
            </h2>
            <p className="hero-subtitle">
              Capas de intensidad al carbón, expuestas en su máxima expresión gastronómica.
            </p>
          </motion.div>

          <motion.div className="hero-slide" style={{ opacity: t4O, y: t4Y }}>
            <span className="hero-eyebrow">CONEXIÓN DIRECTA</span>
            <h2 className="hero-secondary-title brutal-text">
              Inicia tu<br />
              <span className="hero-title-accent">secuencia.</span>
            </h2>
            <a href="#booking-section" className="hero-cta-button glitch-btn">
              Reservar una Mesa
              <span className="cta-arrow">→</span>
            </a>
          </motion.div>

        </div>

        {/* Indicador de Scroll Dinámico */}
        <motion.div 
          className="hero-scroll-indicator"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
        >
          <span className="scroll-label">DESLIZA PARA CONTINUAR LA SECUENCIA</span>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
        </motion.div>

      </div>
    </section>
  );
}
