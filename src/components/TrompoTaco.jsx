import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import trompoImg from '../assets/trompo.jpg';

/**
 * TrompoTaco — Secuencia de rotación 3D que acompaña el scroll en la página
 * Aparece a partir de que el usuario supera el hero para darle continuidad visual al trompo
 */
export default function TrompoTaco() {
  const containerRef = useRef(null);

  // Captura el progreso global del scroll (0 al inicio, 1 al final de la pagina)
  const { scrollYProgress } = useScroll();

  // Rotación continua según el scroll (1080° = 3 vueltas completas)
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  // Aparece de forma fluida después del Hero (a partir del 25% de scroll) y se mantiene hasta el final
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.30, 0.95, 1], [0, 0, 1, 1, 0]);

  // Escala sutil y dinámica
  const scale = useTransform(scrollYProgress, [0.25, 0.6, 1], [0.85, 1, 0.9]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none
                 hidden lg:flex flex-col items-center justify-center
                 w-48 h-64 xl:w-56 xl:h-72"
      style={{ opacity, scale }}
    >
      {/* Resplandor ambiental ambar detrás del trompo */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(230,81,0,0.35) 0%, rgba(212,175,55,0.15) 50%, transparent 70%)',
          rotateY,
        }}
      />

      {/* Imagen del trompo con blend mode para desaparecer fondo negro y rotación 3D */}
      <motion.img
        src={trompoImg}
        alt="Trompo al pastor girando"
        className="relative w-full h-full object-contain select-none"
        style={{
          rotateY,
          mixBlendMode: 'screen',
          filter: 'contrast(1.15) saturate(1.25) drop-shadow(0 0 15px rgba(230,81,0,0.4))',
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        draggable={false}
      />

      {/* Indicador de secuencia */}
      <motion.div
        className="mt-2 text-center"
        style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.9, 0.98], [0, 1, 1, 0]) }}
      >
        <span className="block text-[10px] font-extrabold tracking-[0.2em] uppercase text-amber-400/80 bg-black/60 px-3 py-1 rounded-full border border-amber-500/30 backdrop-blur-sm shadow-lg">
          Secuencia Al Pastor
        </span>
      </motion.div>
    </motion.div>
  );
}
