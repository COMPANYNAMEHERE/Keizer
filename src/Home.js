// src/Home.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import MapComponent from './MapComponent';
import './css/app.css';
import './css/home.css'; // Home-specific styles

// Import slideshow images
import purser1 from './images/purser1.jpeg';
import purser2 from './images/purser2.PNG';
import purser3 from './images/purser3.PNG';
import purser4 from './images/purser4.PNG';

function SectionCard({ children, id, noMargin }) {
  return (
    <div className={`card ${noMargin ? 'no-margin' : ''}`} id={id}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="divider" />;
}

// New Slideshow Section as the first section
function SlideshowSection() {
  const images = [purser1, purser2, purser3, purser4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000); // rotate every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <SectionCard id="slideshow">
      <div className="slideshow-section">
        <h1 className="slideshow-title">De Keizer</h1>
        <div className="slideshow-container">
          <AnimatePresence>
            <motion.img
              key={images[current]}
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="slideshow-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </SectionCard>
  );
}

function LocationSection() {
  return (
    <>
      <SectionCard id="location">
        <h2 className="location-heading">Locatie</h2>
        <a 
          href="https://www.google.com/maps/place/De+Keizer" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          <MapComponent />
        </a>
      </SectionCard>
      <Divider />
    </>
  );
}

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
        const timeMin = now.toISOString();
        const timeMax = sevenDaysLater.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
        );
        const data = await response.json();
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [CALENDAR_ID, GOOGLE_CALENDAR_API_KEY]);

  if (loading)
    return <p className="events-loading">Evenementen worden geladen...</p>;
  if (!events.length)
    return (
      <p className="no-events">
        Geen aankomende evenementen binnen de komende 7 dagen.
      </p>
    );

  return (
    <div className="upcoming-events">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <h3 className="event-title">{event.summary}</h3>
          <p className="event-date">
            {new Date(
              event.start.dateTime || event.start.date
            ).toLocaleString("nl-NL")}
          </p>
          {event.location && (
            <p className="event-location">
              <strong>Locatie:</strong> {event.location}
            </p>
          )}
          {event.description && (
            <p className="event-description">{event.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function EventsSection() {
  return (
    <>
      <SectionCard id="events">
        <h2 className="events-heading">Events komende week:</h2>
        <UpcomingEvents />
      </SectionCard>
      <Divider />
    </>
  );
}

function ReviewSection() {
  return (
    <>
      <SectionCard id="reviews">
        <h2 className="reviews-heading">Laat een Google review achter!</h2>
        <p className="reviews-description">
          We horen graag wat je van De Keizer vindt. Laat een review achter op Google.
        </p>
        <a 
          className="google-review-link" 
          href="https://www.google.com/maps/place/De+Keizer" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Laat hier je review achter
        </a>
      </SectionCard>
      <Divider />
    </>
  );
}

function Home() {
  return (
    <>
      <Header />
      {/* Removed inline paddingTop; top margin is now managed in home.css */}
      <div className="main-site">
        <SlideshowSection />
        <LocationSection />
        <EventsSection />
        <ReviewSection />
      </div>
    </>
  );
}

export default Home;