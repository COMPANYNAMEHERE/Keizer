// src/LandingPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import keizerLogo from './images/KeizerLogo.svg';
// Import the heavy slideshow images to preload
import purser1 from './images/purser1.jpeg';
import purser2 from './images/purser2.PNG';
import purser3 from './images/purser3.PNG';
import purser4 from './images/purser4.PNG';
import './css/landingpage.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('fromLanding', 'true');
    // Remove extra top padding for landing
    document.body.classList.add('home');

    // Preload slideshow images
    const slideshowImages = [purser1, purser2, purser3, purser4];
    Promise.all(
      slideshowImages.map(src =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
      )
    )
      .then(() => {
        // All images loaded, wait a bit before navigating
        setTimeout(() => {
          navigate('/home');
        }, 2000); // 2 seconds delay after preloading
      })
      .catch((err) => {
        console.error('Error preloading slideshow images:', err);
        // In case of error, fallback to navigating after a longer delay
        setTimeout(() => {
          navigate('/home');
        }, 4000);
      });

    return () => {
      // Clean up: remove the home class when leaving landing page
      document.body.classList.remove('home');
    };
  }, [navigate]);

  return (
    <div className="landing-container">
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img src={keizerLogo} alt="Keizer Logo" className="landing-logo" />
      </motion.div>
    </div>
  );
}

export default LandingPage;