// src/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Send user to the main site content
    navigate('/home');
  };

  return (
    <div className="landing-container" onClick={handleClick}>
      <div className="video-wrapper">
        <iframe
          className="video-background"
          src="https://www.youtube.com/embed/U0eCDEpZ51k?autoplay=1&mute=1&controls=0&loop=1&playlist=U0eCDEpZ51k&modestbranding=1&rel=0&start=20"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Background Video"
        ></iframe>
      </div>
      <div className="landing-content">
        <h1 className="landing-heading">ZEV - Zuipen en Vreten</h1>
        <p className="landing-subtext">- Klik om door te gaan -</p>
      </div>
    </div>
  );
}

export default LandingPage;
