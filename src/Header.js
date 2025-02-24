import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/header.css';
import keizerLogo from './images/KeizerLogo.svg';

function Header() {
  const navigate = useNavigate();

  // Check if coming from LandingPage
  const [animateFromLanding] = useState(() => {
    const fromLanding = localStorage.getItem('fromLanding') === 'true';
    if (fromLanding) localStorage.removeItem('fromLanding');
    return fromLanding;
  });

  return (
    <motion.header 
      className="header"
      initial={animateFromLanding ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <motion.img 
        src={keizerLogo} 
        alt="The Keizer"  // Updated alt text for clarity
        className="header-logo"
        onClick={() => navigate('/home')}
        whileHover={{ scale: 0.95 }}
        transition={{ ease: 'easeOut' }}
      />
      <nav className="nav-links">
        <button onClick={() => navigate('/menu')}>Menu</button>
        <button onClick={() => navigate('/evenementen')}>Evenementen</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
      </nav>
    </motion.header>
  );
}

export default Header;