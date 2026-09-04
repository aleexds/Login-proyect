import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import trompoImg from '../assets/trompo.jpg';

/**
 * TrompoTaco — Componente interactivo de scroll-driven 3D rotation.
 *
 * Lógica:
 *  - useScroll() captura el progreso de scroll global (scrollYProgress: 0 → 1).
 *  - useTransform() mapea ese progreso a una rotación de 0° a 1080° (3 vueltas completas)
 *    sobre el eje Y, creando el efecto de que el trompo gira sobre su propio eje vertical
 *    conforme el usuario baja por la página.
 *
 * Posición:
 *  - Fijo (sticky) al lado derecho de la pantalla, sin fondo, usando Tailwind CSS.
 *  - pointer-events-none para no bloquear interacciones con el contenido debajo.
 *
 * Uso:
 *  - Importar en Home.jsx y colocar como hijo directo del contenedor principal.
 *
 * @author Victor — feature/inicio-ui
 */
export default function TrompoTaco() {
  const containerRef = useRef(null);

  // Captura el progreso global del scroll (0 al inicio, 1 al final)
  const { scrollYProgress } = useScroll();

  // Mapea el progreso del scroll a grados de rotación en eje Y
  // 3 rotaciones completas (1080°) a lo largo de todo el scroll
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  // Escala sutil que pulsa levemente con el scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none
                 hidden lg:flex items-center justify-center
                 w-56 h-72 xl:w-64 xl:h-80"
    >
      {/* Resplandor ambiental detrás del trompo */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(230,81,0,0.5) 0%, transparent 70%)',
          rotateY,
        }}
      />

      {/* Imagen del trompo con rotación 3D */}
      <motion.img
        src={trompoImg}
        alt="Trompo al pastor girando"
        className="relative w-full h-full object-contain drop-shadow-2xl select-none"
        style={{
          rotateY,
          scale,
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        draggable={false}
      />

      {/* Label flotante debajo */}
      <motion.span
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap
                   text-xs font-bold tracking-widest uppercase
                   text-amber-400/70"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
      >
        Al Pastor
      </motion.span>
    </div>
  );
}
