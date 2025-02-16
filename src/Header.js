// src/Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

function Header() {
  const navigate = useNavigate();
  const THRESHOLD = 300000; // 5 minuten in milliseconden

  // Bepaal of de animatie al recent is afgespeeld
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    const lastTime = localStorage.getItem('headerAnimatedTimestamp');
    if (!lastTime) return true; // nog nooit afgespeeld
    return Date.now() - parseInt(lastTime, 10) > THRESHOLD;
  });

  useEffect(() => {
    // Als de animatie moet afspelen, sla dan de huidige timestamp op
    if (shouldAnimate) {
      localStorage.setItem('headerAnimatedTimestamp', Date.now().toString());
    }
  }, [shouldAnimate]);

  return (
    <motion.header 
      className="header"
      // Gebruik de animatie enkel als shouldAnimate true is
      initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <h1
        className="header-title"
        style={{ marginBottom: '1rem' }}
        onClick={() => navigate('/home')}
      >
        ZEV - Zuipen en Vreten
      </h1>
      <nav className="nav-links">
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/menu')}>Menu</button>
        <button onClick={() => navigate('/evenementen')}>Evenementen</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
      </nav>
    </motion.header>
  );
}

export default Header;