// src/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import MapComponent from './MapComponent';
import SlideShow from './slideShow';
import './css/app.css';
import './css/home.css';

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

function LocationSection() {
  return (
    <>
      <SectionCard id="location">
        <h2 className="location-heading">Locatie</h2>
        <div className="location-content">
          <a 
            href="https://www.google.com/maps/place/De+Keizer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="location-map"
          >
            <MapComponent />
          </a>
          <div className="cafe-details">
            <div className="cafe-info">
              <h3 className="cafe-title">Café De Keizer</h3>
              <p>
                <strong>Adres:</strong> Keizerstraat 160, 3011 GH Rotterdam, Netherlands
              </p>
              <p>
                <strong>Telefoon:</strong> 010-12345678
              </p>
            </div>
            <div className="opening-hours-container">
              <h3 className="opening-hours-title">Openingstijden</h3>
              <table className="opening-hours">
                <thead>
                  <tr>
                    <th>Dag</th>
                    <th>Open</th>
                    <th>Sluit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Maandag</td>
                    <td>15:00</td>
                    <td>23:00</td>
                  </tr>
                  <tr>
                    <td>Dinsdag</td>
                    <td>15:00</td>
                    <td>23:00</td>
                  </tr>
                  <tr>
                    <td>Woensdag</td>
                    <td>15:00</td>
                    <td>23:00</td>
                  </tr>
                  <tr>
                    <td>Donderdag</td>
                    <td>15:00</td>
                    <td>23:00</td>
                  </tr>
                  <tr>
                    <td>Vrijdag</td>
                    <td>15:00</td>
                    <td>01:00</td>
                  </tr>
                  <tr>
                    <td>Zaterdag</td>
                    <td>15:00</td>
                    <td>01:00</td>
                  </tr>
                  <tr>
                    <td>Zondag</td>
                    <td>16:00</td>
                    <td>22:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionCard>
      <Divider />
    </>
  );
}

function UpcomingEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

  React.useEffect(() => {
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
      <div className="main-site">
        {/* Slideshow Section */}
        <SectionCard id="slideshow">
          <motion.h1
            className="home-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '1rem' }}
          >
            Kom naar de Keizer!
          </motion.h1>
          <SlideShow />
        </SectionCard>
        <LocationSection />
        <EventsSection />
        <ReviewSection />
      </div>
    </>
  );
}

export default Home;