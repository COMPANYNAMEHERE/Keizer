import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/header.css';
import keizerLogo from './images/KeizerLogo.svg';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if coming from LandingPage
  const [animateFromLanding] = useState(() => {
    const fromLanding = localStorage.getItem('fromLanding') === 'true';
    if (fromLanding) localStorage.removeItem('fromLanding');
    return fromLanding;
  });

  // Helper function to determine active route
  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      className="header"
      initial={animateFromLanding ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <motion.img 
        src={keizerLogo} 
        alt="The Keizer"  
        className="header-logo"
        onClick={() => navigate('/home')}
        whileHover={{ scale: 0.95 }}
        transition={{ ease: 'easeOut' }}
      />
      <nav className="nav-links">
        <button 
          onClick={() => navigate('/menu')}
          className={isActive('/menu') ? 'active' : ''}
        >
          Menu
        </button>
        <button 
          onClick={() => navigate('/evenementen')}
          className={isActive('/evenementen') ? 'active' : ''}
        >
          Evenementen
        </button>
        <button 
          onClick={() => navigate('/contact')}
          className={isActive('/contact') ? 'active' : ''}
        >
          Contact
        </button>
      </nav>
    </motion.header>
  );
}

export default Header;