// src/Home.js
import React from 'react';
import Header from './Header';
import MapComponent from './MapComponent';
import './App.css';

function SectionCard({ children, id }) {
  return (
    <div className="card" id={id}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="divider" />;
}

function TitleSection() {
  return (
    <>
      <SectionCard id="intro">
        <h1 className="title-heading">ZEV - Zuipen en Vreten</h1>
        <p className="title-description">
          ZEV heeft midden in Rotterdam een spot neergezet waar je kunt chillen,
          vreten en genieten van vette graffiti vibes. Neem de tijd en ontdek de
          unieke sfeer van onze plek.
        </p>
      </SectionCard>
      <Divider />
    </>
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

// Nieuwe component om de aankomende evenementen dynamisch op te halen
function UpcomingEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Vervang hieronder de API-key en Calendar ID door jouw gegevens
  const GOOGLE_CALENDAR_API_KEY = 'AIzaSyA2QxErGoue-y_Cklk8ko_eZ3kKuWXhFaI';
  const CALENDAR_ID = 'zuipenenvreten@gmail.com';

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime`
        );
        const data = await response.json();
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Evenementen worden geladen...</p>;
  if (!events.length) return <p>Geen aankomende evenementen.</p>;

  return (
    <ul className="events-list">
      {events.slice(0, 3).map((event) => (
        <li key={event.id}>
          {event.summary} -{" "}
          {new Date(event.start.dateTime || event.start.date).toLocaleString("nl-NL")}
        </li>
      ))}
    </ul>
  );
}

function EventsSection() {
  return (
    <>
      <SectionCard id="events">
        <h2 className="events-heading">Upcoming Events</h2>
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