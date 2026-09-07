import React, { useState, useEffect } from 'react';
import mrTaquitoImg from '../assets/mr-taquito.png';
import './MrTaquito.css';

const FRASES = [
  "¡Tacología: La ciencia exacta del antojo!",
  "¡Bienvenidos al laboratorio del sabor!",
  "¿Ya hiciste tu reservación, compadre?",
  "¡Hoy la ciencia dice: más tacos!",
  "¡El secreto está en la tortilla!",
  "¡Pura vida y puros tacos!",
  "¡Un taco al día, alegría garantizada!",
];

export default function MrTaquito({ size = 320, className = '', waving = true, showBubble = true }) {
  const [fraseIndex, setFraseIndex] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setFraseIndex(prev => (prev + 1) % FRASES.length);
        setBubbleVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [showBubble]);

  return (
    <div className={`mr-taquito-wrapper ${waving ? 'mr-taquito-float' : ''} ${className}`}>
      {/* Speech Bubble */}
      {showBubble && (
        <div className={`speech-bubble ${bubbleVisible ? 'bubble-visible' : 'bubble-hidden'}`}>
          <p>{FRASES[fraseIndex]}</p>
          <div className="bubble-tail" />
        </div>
      )}

      {/* Mr. Taquito — Ilustración profesional */}
      <img
        src={mrTaquitoImg}
        alt="Mr. Taquito — La mascota de Tacología"
        className="mr-taquito-img"
        style={{ width: size, height: 'auto' }}
        draggable={false}
      />
    </div>
  );
}
