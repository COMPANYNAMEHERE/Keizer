// src/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/landingpage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Wait 1 second after click, then navigate to the home page
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="landing-container" onClick={handleClick}>
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={process.env.PUBLIC_URL + '/images/zev.svg'}
          alt="Zev Logo"
          className="landing-logo"
        />
        <h1 className="landing-title">ZEV - Zuipen & Eten</h1>
      </motion.div>
    </div>
  );
}

export default LandingPage;