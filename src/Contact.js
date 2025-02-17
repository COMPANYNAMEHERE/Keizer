// src/Contact.js
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import Header from './Header';
import './css/app.css';      // Global styles
import './css/contact.css';  // Contact-specific styles

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const formRef = useRef();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormStatus('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_oh3bw8p',     // Your EmailJS Service ID
        'template_71nudzr',   // Your EmailJS Template ID
        formRef.current,
        'gIwJgTMxqClFB4G0m'    // Your EmailJS Public Key
      )
      .then(
        (result) => {
          setFormStatus('Je bericht is succesvol verzonden!');
          formRef.current.reset();
        },
        (error) => {
          setFormStatus('Er is een fout opgetreden. Probeer het later opnieuw.');
        }
      );
  };

  return (
    <>
      <Header />
      <motion.main 
        className="contact-page"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="contact-info-box">
          <h2>Contact</h2>
          <p>Neem gerust contact met ons op. Klik hieronder om ons contactformulier te openen.</p>
          <button className="contact-button" onClick={openModal}>
            Open contactformulier
          </button>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="modal-overlay"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button className="modal-close" onClick={closeModal}>
                  &times;
                </button>
                <h3 className="modal-heading">Contactformulier</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                  <input type="text" name="name" placeholder="Jouw naam" required />
                  <input type="email" name="email" placeholder="Jouw e-mailadres *" required />
                  <input type="tel" name="phone" placeholder="Jouw telefoonnummer" />
                  <textarea name="message" rows="5" placeholder="Jouw bericht *" required />
                  <div className="contact-form-buttons">
                    <button type="button" className="cancel-button" onClick={closeModal}>
                      Annuleren
                    </button>
                    <button type="submit" className="submit-button">
                      Verzenden
                    </button>
                  </div>
                </form>
                {formStatus && <p className="form-status">{formStatus}</p>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="extra-contact-info">
          <h3>Neem contact op via andere kanalen</h3>
          <p>
            Heeft u vragen? Bel ons op: <strong>0123-456789</strong>
          </p>
          <p>Volg ons op sociale media:</p>
          <ul>
            <li>
              Facebook:{' '}
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                facebook.com/onsbedrijf
              </a>
            </li>
            <li>
              Instagram:{' '}
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                @onsbedrijf
              </a>
            </li>
          </ul>
        </section>
      </motion.main>
    </>
  );
}

export default Contact;