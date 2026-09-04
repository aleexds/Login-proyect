import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import trompoImg from '../assets/trompo.jpg';

/**
 * HeroTrompo — Sección hero inmersiva scroll-driven estilo agencia creativa.
 *
 * Arquitectura del scroll:
 *  - Contenedor exterior de 300vh → genera el "espacio de scroll" para la animación.
 *  - Contenedor interno sticky h-screen → mantiene el viewport fijo mientras se scrollea.
 *  - useScroll({ target, offset }) vincula el progreso del scroll (0→1) al contenedor.
 *
 * Animaciones sincronizadas al scroll:
 *  1. Trompo rota 1080° sobre eje Y (3 giros completos).
 *  2. Escala del trompo pulsa suavemente (0.7 → 1.1 → 0.85).
 *  3. Textos promocionales aparecen/desaparecen en secuencia:
 *     - Slide 1 (0%–33%): "TACOLOGÍA" + tagline de bienvenida.
 *     - Slide 2 (33%–66%): Frase gastronómica de impacto.
 *     - Slide 3 (66%–100%): CTA "Reserva tu experiencia".
 *
 * @author Victor — feature/inicio-ui
 */
export default function HeroTrompo() {
  const containerRef = useRef(null);

  // Vincula el scroll al contenedor de 300vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ─── Trompo transforms ─── */
  const trompoRotateY = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const trompoScale   = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.7, 1.1, 1.05, 0.85]);
  const trompoBrightness = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.5]);

  /* ─── Glow pulse (resplandor naranja detrás del trompo) ─── */
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.1, 0.5, 0.7, 0.5, 0.1]);
  const glowScale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 0.9]);

  /* ─── Slide 1: "TACOLOGÍA" (visible 0%–33%) ─── */
  const s1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.30], [0, 1, 1, 0]);
  const s1Y       = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.30], [60, 0, 0, -60]);

  /* ─── Slide 2: Frase gastronómica (visible 33%–66%) ─── */
  const s2Opacity = useTransform(scrollYProgress, [0.30, 0.38, 0.55, 0.63], [0, 1, 1, 0]);
  const s2Y       = useTransform(scrollYProgress, [0.30, 0.38, 0.55, 0.63], [60, 0, 0, -60]);

  /* ─── Slide 3: CTA final (visible 66%–100%) ─── */
  const s3Opacity = useTransform(scrollYProgress, [0.63, 0.72, 0.88, 0.96], [0, 1, 1, 0]);
  const s3Y       = useTransform(scrollYProgress, [0.63, 0.72, 0.88, 0.96], [60, 0, 0, -60]);

  /* ─── Scroll indicator (visible solo al inicio) ─── */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0a0a0a]">
      {/* ══════════════════ Sticky viewport ══════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ─── Fondo de partículas / grain sutil ─── */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ─── Glow ambiental ─── */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(230,81,0,0.45) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)',
            opacity: glowOpacity,
            scale: glowScale,
          }}
        />

        {/* ─── TROMPO (centro) ─── */}
        <motion.div
          className="relative z-10 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] md:w-[400px] md:h-[600px] lg:w-[450px] lg:h-[675px]"
          style={{
            perspective: 1200,
          }}
        >
          <motion.img
            src={trompoImg}
            alt="Trompo al pastor de Tacología girando con el scroll"
            className="w-full h-full object-contain select-none"
            draggable={false}
            style={{
              rotateY: trompoRotateY,
              scale: trompoScale,
              filter: useTransform(trompoBrightness, (v) => `brightness(${v}) drop-shadow(0 0 60px rgba(230,81,0,0.4))`),
              transformStyle: 'preserve-3d',
            }}
          />
        </motion.div>

        {/* ─── TEXTOS PROMOCIONALES (posición absoluta, lado izquierdo) ─── */}
        <div className="absolute left-6 sm:left-10 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-[420px] pointer-events-none">

          {/* Slide 1 */}
          <motion.div
            className="absolute top-0"
            style={{ opacity: s1Opacity, y: s1Y }}
          >
            <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-amber-400/80 mb-3 border border-amber-400/30 px-3 py-1 rounded-full">
              Experiencia Culinaria
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white mt-4">
              TACO
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                LOGÍA
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 mt-5 leading-relaxed max-w-[360px]">
              Donde la tradición milenaria del maíz criollo se encuentra con la alta cocina contemporánea.
            </p>
          </motion.div>

          {/* Slide 2 */}
          <motion.div
            className="absolute top-0"
            style={{ opacity: s2Opacity, y: s2Y }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-400/80 mb-3">
              Nixtamal · Leña · Agave
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-white mt-4">
              Fuego lento,
              <br />
              <span className="text-orange-400">sabor eterno.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mt-5 leading-relaxed max-w-[360px]">
              +40 etiquetas de mezcal artesanal, cortes premium y mariscos del Pacífico en un solo destino gastronómico.
            </p>
          </motion.div>

          {/* Slide 3 */}
          <motion.div
            className="absolute top-0"
            style={{ opacity: s3Opacity, y: s3Y }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-emerald-400/80 mb-3">
              Tu mesa te espera
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-white mt-4">
              Reserva tu
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                experiencia.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mt-5 leading-relaxed max-w-[360px]">
              Terraza Agave, Salón Mezcal o la Barra del Chef Taquero. Elige tu escenario perfecto.
            </p>
            <a
              href="#booking-section"
              className="pointer-events-auto inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg shadow-[0_8px_30px_rgba(230,81,0,0.4)] hover:shadow-[0_12px_40px_rgba(230,81,0,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Reservar una Mesa
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ─── Badge lateral derecho ─── */}
        <motion.div
          className="absolute right-6 sm:right-10 md:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-end gap-6"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.6, 0.6, 0]) }}
        >
          <div className="text-right">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-neutral-500 font-medium">Cocina de autor</p>
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-neutral-500 font-medium mt-1">CDMX · 2026</p>
          </div>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-600/40 to-transparent" />
          <div className="text-right">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-neutral-500 font-medium">100% Maíz Criollo</p>
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-neutral-500 font-medium mt-1">Nixtamalizado</p>
          </div>
        </motion.div>

        {/* ─── Scroll indicator ─── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-neutral-500 font-medium">
            Scroll para explorar
          </span>
          <div className="w-5 h-8 border-2 border-neutral-600 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-amber-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* ─── Gradiente inferior para transición suave ─── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f1115] to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
}
