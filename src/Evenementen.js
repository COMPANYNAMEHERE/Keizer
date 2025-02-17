import React, { useState, useEffect } from 'react';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import './css/app.css';

// Replace these with your actual Google Calendar credentials
const GOOGLE_CALENDAR_API_KEY = 'AIzaSyA2QxErGoue-y_Cklk8ko_eZ3kKuWXhFaI';
// Use your personal Gmail address as the Calendar ID if using your default calendar
const CALENDAR_ID = 'zuipenenvreten@gmail.com';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime`
        );
        const data = await response.json();

        if (data.error) {
          console.error('Error fetching events:', data.error);
        }
        setEvents(data.items || []);
      } catch (error) {
        console.error('Fout bij ophalen van evenementen:', error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const maxDisplay = 5;
  const displayEvents = events.slice(0, maxDisplay);
  const extraCount = events.length - maxDisplay;

  return (
    <div className="calendar-container">
      {loading ? (
        <p>Evenementen worden geladen...</p>
      ) : displayEvents.length ? (
        <>
          <div
            className="events-list"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {displayEvents.map((event, index) => (
              <section
                key={event.id || index}
                className="event-subsection"
                style={{ width: '100%', maxWidth: '300px' }}
              >
                <motion.div
                  className="event-card"
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
                  }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '12px',
                    cursor: 'pointer',
                    boxShadow:
                      '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 style={{ margin: '4px 0', fontSize: '1.1rem' }}>
                    {event.summary}
                  </h4>
                  <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                    {new Date(
                      event.start.dateTime || event.start.date
                    ).toLocaleString('nl-NL')}
                  </p>
                </motion.div>
              </section>
            ))}
            {extraCount > 0 && (
              <motion.div
                className="more-events"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '16px',
                }}
              >
                <p>en nog {extraCount} evenementen gepland</p>
              </motion.div>
            )}
          </div>
          {/* Extra Info Section */}
          <motion.div
            className="extra-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              marginTop: '32px',
              padding: '16px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow:
                '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)',
              textAlign: 'left',
            }}
          >
            <h3>Extra Informatie</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Integer nec odio. Praesent libero. Sed cursus ante dapibus
              diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
              sagittis ipsum.
            </p>
          </motion.div>
        </>
      ) : (
        <p>Geen aankomende evenementen.</p>
      )}

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="modal-overlay"
            onClick={() => setSelectedEvent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '24px',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2 style={{ marginTop: 0 }}>{selectedEvent.summary}</h2>
              <p>
                <strong>Start:</strong>{' '}
                {new Date(
                  selectedEvent.start.dateTime || selectedEvent.start.date
                ).toLocaleString('nl-NL')}
              </p>
              {selectedEvent.end && (
                <p>
                  <strong>Eind:</strong>{' '}
                  {new Date(
                    selectedEvent.end.dateTime || selectedEvent.end.date
                  ).toLocaleString('nl-NL')}
                </p>
              )}
              {selectedEvent.location && (
                <p>
                  <strong>Locatie:</strong> {selectedEvent.location}
                </p>
              )}
              {selectedEvent.description && <p>{selectedEvent.description}</p>}
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#2196F3',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Sluiten
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Evenementen() {
  return (
    <>
      <Header />
      <main className="events-page container" style={{ textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Evenementen
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Bekijk hier onze aankomende evenementen.
        </motion.p>
        <Calendar />
      </main>
    </>
  );
}

export default Evenementen;