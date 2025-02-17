// src/Home.js
import React from 'react';
import Header from './Header';
import MapComponent from './MapComponent';
import './css/app.css';
import './css/home.css'; // Home-specific styles

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

function TitleSection() {
  return (
    <SectionCard id="intro" noMargin>
      <h1 className="title-heading">ZEV - Zuipen en Vreten</h1>
      <p className="title-description">
        ZEV heeft midden in Rotterdam een spot neergezet waar je kunt chillen,
        vreten en genieten van vette graffiti vibes. Neem de tijd en ontdek de
        unieke sfeer van onze plek.
      </p>
    </SectionCard>
  );
}

function LocationSection() {
  return (
    <>
      <SectionCard id="location">
        <h2 className="location-heading">Locatie</h2>
        <MapComponent />
      </SectionCard>
      <Divider />
    </>
  );
}

// UpcomingEvents now renders each event as a modern card.
function UpcomingEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get API keys from environment variables
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

function Home() {
  return (
    <>
      <Header />
      <div className="main-site">
        <TitleSection />
        <LocationSection />
        <EventsSection />
      </div>
    </>
  );
}

export default Home;