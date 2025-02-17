// src/Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/header.css'; // Updated import path to src/css/header.css
import zevLogo from './images/zev.svg';

function Header() {
  const navigate = useNavigate();
  const THRESHOLD = 300000; // 5 minutes in milliseconds

  const [shouldAnimate, setShouldAnimate] = useState(() => {
    const lastTime = localStorage.getItem('headerAnimatedTimestamp');
    return !lastTime || Date.now() - parseInt(lastTime, 10) > THRESHOLD;
  });

  useEffect(() => {
    if (shouldAnimate) {
      localStorage.setItem('headerAnimatedTimestamp', Date.now().toString());
    }
  }, [shouldAnimate]);

  return (
    <motion.header 
      className="header"
      initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <img 
        src={zevLogo} 
        alt="zev-logo" 
        className="header-logo"
        onClick={() => navigate('/home')}
      />
      <nav className="nav-links">
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/menu')}>Menu</button>
        <button onClick={() => navigate('/evenementen')}>Evenementen</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
      </nav>
      <div className="header-subtext" onClick={() => navigate('/home')}>
        <div>Zuipen</div>
        <div>&</div>
        <div>Vreten</div>
      </div>
    </motion.header>
  );
}

export default Header;