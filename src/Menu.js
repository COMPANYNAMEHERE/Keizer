import React from 'react';
import Header from './Header';
import './App.css';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 1, naam: 'Frietjes', prijs: '€3,50', afbeelding: '/images/frietjes.jpg' },
  { id: 2, naam: 'Bitterballen', prijs: '€5,00', afbeelding: '/images/bitterballen.jpg' },
  { id: 3, naam: 'Americano', prijs: '€2,50', afbeelding: '/images/americano.jpg' },
  { id: 4, naam: 'Broodje Bal', prijs: '€4,50', afbeelding: '/images/broodje-bal.jpg' },
  { id: 5, naam: 'Kaassoufflé', prijs: '€3,00', afbeelding: '/images/kaassouffle.jpg' },
  { id: 6, naam: 'Kroket', prijs: '€3,50', afbeelding: '/images/kroket.jpg' },
];

// Container variants to stagger child animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Menu() {
  return (
    <>
      <Header />
      <motion.main
        className="menu-page container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top description section */}
        <motion.section
          className="menu-beschrijving"
          style={{ marginBottom: '2rem', textAlign: 'center' }}
          variants={itemVariants}
        >
          <motion.h2
            variants={itemVariants}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Ons Menu
          </motion.h2>
          <motion.p
            variants={itemVariants}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            Wij serveren onze gerechten van 12:00 tot 22:00. Onze keuken gebruikt verse
            ingrediënten en zorgt voor een gezellige sfeer.
          </motion.p>
        </motion.section>

        {/* Menu items grid */}
        <motion.section
          className="menu-items-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
          variants={containerVariants}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className="menu-item-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              }}
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'default',
                width: '100%',
                paddingTop: '56.25%', // 16:9 aspect ratio
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              {/* Image */}
              <motion.img
                src={item.afbeelding}
                alt={item.naam}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Overlay with text */}
              <motion.div
                className="card-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem',
                  background: 'rgba(0,0,0,0.2)',
                }}
                variants={itemVariants}
              >
                <motion.h3
                  style={{
                    margin: '0.2rem 0',
                    color: '#fff',
                    fontSize: '1.4rem',
                    textAlign: 'center',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                  variants={itemVariants}
                >
                  {item.naam}
                </motion.h3>
                <motion.p
                  style={{
                    margin: '0.2rem 0',
                    color: '#fff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                  variants={itemVariants}
                >
                  {item.prijs}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.section>

        {/* Footer section */}
        <motion.section
          className="menu-footer"
          style={{ marginTop: '2rem', textAlign: 'center' }}
          variants={itemVariants}
        >
          <motion.p
            variants={itemVariants}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            style={{ fontSize: '1rem', fontStyle: 'italic' }}
          >
            Geen bezorging, kom maar gezellig langs.
          </motion.p>
        </motion.section>
      </motion.main>
    </>
  );
}

export default Menu;