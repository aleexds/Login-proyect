import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import trompoImg from '../assets/trompo.jpg';
import './HeroTrompo.css';

/* ─── Generador de chispas holográficas ─── */
function generateSparks(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 20 + Math.random() * 60,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    drift: -100 + Math.random() * 200,
    color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff', // Cyan y magenta
  }));
}

export default function HeroTrompo() {
  const containerRef = useRef(null);
  const sparks = useMemo(() => generateSparks(50), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Escala global del trompo (se acerca dramáticamente al final)
  const globalScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.3, 2.0]);

  // Parpadeo glitch holográfico intenso en puntos clave del scroll
  const glitchOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2, 0.4, 0.45, 0.5, 0.7, 0.75, 0.8, 1],
    [0, 0, 0.9, 0, 0, 0.8, 0, 0, 1, 0, 0.6]
  );

  // ════ ANIMACIONES DE LOS CORTES (SLICES) ════
  // Se separan en los ejes Y y X, y rotan sutilmente
  const s1Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const s1R = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const s1X = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const s2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const s2R = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const s2X = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const s3Y = useTransform(scrollYProgress, [0, 1], [0, 0]); // Centro estático
  const s3R = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const s3X = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const s4Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const s4R = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const s4X = useTransform(scrollYProgress, [0, 1], [0, 35]);

  const s5Y = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const s5R = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const s5X = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // ════ NÚCLEO DE ENERGÍA (Aparece cuando la carne se abre) ════
  const coreScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 4]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0.8, 1, 0]);

  // ════ TEXTOS (4 Slides distribuidos en el scroll largo) ════
  const t1O = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [60, 0, 0, -60]);

  const t2O = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.48], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.48], [60, 0, 0, -60]);

  const t3O = useTransform(scrollYProgress, [0.50, 0.56, 0.70, 0.76], [0, 1, 1, 0]);
  const t3Y = useTransform(scrollYProgress, [0.50, 0.56, 0.70, 0.76], [60, 0, 0, -60]);

  const t4O = useTransform(scrollYProgress, [0.78, 0.84, 0.94, 1], [0, 1, 1, 0]);
  const t4Y = useTransform(scrollYProgress, [0.78, 0.84, 0.94, 1], [60, 0, 0, -60]);

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

        {/* Filtro de Scanlines de holograma */}
        <div className="hologram-scanlines" />

        {/* Glow de ambiente */}
        <div className="brutal-glow" />

        {/* Chispas Cyberpunk */}
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

        {/* ════ EL TROMPO QUE SE ABRE EN PEDAZOS ════ */}
        <motion.div className="hero-trompo-image-wrap" style={{ scale: globalScale }}>

          {/* Luz intensa que sale de las grietas */}
          <motion.div className="trompo-core-energy" style={{ scale: coreScale, opacity: coreOpacity }} />

          {slices.map((slice) => (
            <motion.div
              key={slice.id}
              className={`slice-wrapper ${slice.className}`}
              style={{ y: slice.y, x: slice.x, rotateZ: slice.r }}
            >
              {/* Imagen Base con Blend Mode Screen para desaparecer el negro */}
              <img src={trompoImg} className="slice-img slice-base" alt="" />

              {/* Aberración Cromática (Glitch) */}
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

        {/* ════ TEXTOS BRUTALES ════ */}
        <div className="hero-text-layer">

          <motion.div className="hero-slide" style={{ opacity: t1O, y: t1Y }}>
            <span className="hero-eyebrow">EXPERIENCIA INMERSIVA</span>
            <h1 className="hero-main-title brutal-text">
              TACO<br />
              <span className="hero-title-accent">LOGÍA</span>
            </h1>
            <p className="hero-subtitle">
              Adéntrate en una experiencia sensorial sin precedentes. La esencia del maíz criollo deconstruida.
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
              Capas de intensidad al carbón, expuestas en su máxima expresión.
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

        {/* Scroll Indicator */}
        <motion.div
          className="hero-scroll-indicator"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        >
          <span className="scroll-label">INICIAR SCROLL</span>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
        </motion.div>

      </div>
    </section>
  );
}
