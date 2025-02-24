// src/SlideShow.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import purser1 from './images/purser1.jpeg';
import purser2 from './images/purser2.PNG';
import purser3 from './images/purser3.PNG';
import purser4 from './images/purser4.PNG';
import './css/slideShow.css';

function SlideShow() {
  const images = [purser1, purser2, purser3, purser4];
  const [current, setCurrent] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images using Promise.allSettled as fallback
  useEffect(() => {
    const promises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.allSettled(promises)
      .then(() => {
        setImagesLoaded(true);
      });
  }, [images]);

  // Rotate images every 6 seconds after preload
  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [imagesLoaded, images.length]);

  if (!imagesLoaded) {
    return <div className="slideShow-loading">Loading slideshow...</div>;
  }

  return (
    <motion.div
      className="slideShow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className="slideShow-container">
        <AnimatePresence>
          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="slideShow-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.5, ease: 'easeOut' },
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </AnimatePresence>
        {/* Progress bar indicates the 6s duration until the next image */}
        <motion.div
          className="progress-bar"
          key={images[current] + '-progress'}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

export default SlideShow;