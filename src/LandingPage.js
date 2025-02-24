// src/LandingPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import keizerLogo from './images/KeizerLogo.svg';
import './css/landingpage.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set flag so that Header knows to animate in
    localStorage.setItem('fromLanding', 'true');
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000); // Navigate after 4 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container">
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      >
        <img src={keizerLogo} alt="Keizer Logo" className="landing-logo" />
      </motion.div>
    </div>
  );
}

export default LandingPage;