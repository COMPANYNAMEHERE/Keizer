import React, { useState, useEffect } from 'react';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import './css/app.css';
import './css/evenementen.css';

const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

function Calendar() {
  const currentDate = new Date();
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Allow navigation up to 3 months ahead from the current month.
  const getNextAllowed = () => {
    let nextMonth = currentDate.getMonth() + 3;
    let nextYear = currentDate.getFullYear();
    if (nextMonth > 11) {
      nextYear += Math.floor(nextMonth / 12);
      nextMonth = nextMonth % 12;
    }
    return { nextMonth, nextYear };
  };

  const { nextMonth: allowedNextMonth, nextYear: allowedNextYear } = getNextAllowed();

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      try {
        const start = new Date(displayedYear, displayedMonth, 1);
        const lastDay = new Date(displayedYear, displayedMonth + 1, 0).getDate();
        const end = new Date(displayedYear, displayedMonth, lastDay, 23, 59, 59);
        const timeMin = start.toISOString();
        const timeMax = end.toISOString();

        // Use encodeURIComponent to ensure Calendar ID is properly encoded
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          CALENDAR_ID
        )}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
        console.log("Fetching events from URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching events:", data.error);
        }
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [displayedMonth, displayedYear]);

  const renderCalendarGrid = () => {
    const firstDayIndex = new Date(displayedYear, displayedMonth, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

    // Previous month info:
    const prevMonth = displayedMonth === 0 ? 11 : displayedMonth - 1;
    const prevYear = displayedMonth === 0 ? displayedYear - 1 : displayedYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    const totalCells = 42; // 6 weeks * 7 days
    let cells = [];

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayIndex) {
        // Dates from previous month.
        const day = daysInPrevMonth - firstDayIndex + i + 1;
        cells.push({
          day,
          month: prevMonth,
          year: prevYear,
          inCurrentMonth: false,
        });
      } else if (i < firstDayIndex + daysInMonth) {
        // Dates in the current month.
        const day = i - firstDayIndex + 1;
        cells.push({
          day,
          month: displayedMonth,
          year: displayedYear,
          inCurrentMonth: true,
        });
      } else {
        // Dates from next month.
        const day = i - firstDayIndex - daysInMonth + 1;
        const nextMo = displayedMonth === 11 ? 0 : displayedMonth + 1;
        const nextYr = displayedMonth === 11 ? displayedYear + 1 : displayedYear;
        cells.push({
          day,
          month: nextMo,
          year: nextYr,
          inCurrentMonth: false,
        });
      }
    }

    let weeksElements = [];
    for (let week = 0; week < 6; week++) {
      let weekCells = [];
      for (let day = 0; day < 7; day++) {
        const cellIndex = week * 7 + day;
        const cell = cells[cellIndex];

        // Format date as YYYY-MM-DD
        const formattedDate = `${cell.year}-${(cell.month + 1)
          .toString()
          .padStart(2, '0')}-${cell.day.toString().padStart(2, '0')}`;

        // Only show events for days in the current month.
        const eventsForDay = cell.inCurrentMonth
          ? events.filter((event) => {
              let eventDate;
              if (event.start.date) {
                eventDate = event.start.date;
              } else if (event.start.dateTime) {
                eventDate = event.start.dateTime.split('T')[0];
              }
              return eventDate === formattedDate;
            })
          : [];

        // Check if this cell is "today"
        const isToday =
          cell.inCurrentMonth &&
          cell.day === currentDate.getDate() &&
          cell.year === currentDate.getFullYear() &&
          cell.month === currentDate.getMonth();

        weekCells.push(
          <td key={formattedDate}>
            <div
              className={`calendar-cell ${
                cell.inCurrentMonth ? '' : 'overlap'
              } ${isToday ? 'today' : ''}`}
            >
              <div className="date-number">{cell.day}</div>
              <div className="events">
                {eventsForDay.map((event, idx) => (
                  <motion.div
                    key={event.id || idx}
                    onClick={() => setSelectedEvent(event)}
                    whileHover={{ scale: 1.05 }}
                    className="event"
                  >
                    {event.summary}
                  </motion.div>
                ))}
              </div>
            </div>
          </td>
        );
      }
      weeksElements.push(<tr key={`week-${week}`}>{weekCells}</tr>);
    }

    return (
      <motion.div
        className="calendar-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{weeksElements}</tbody>
        </table>
      </motion.div>
    );
  };

  const handlePrev = () => {
    if (
      displayedYear > currentDate.getFullYear() ||
      (displayedYear === currentDate.getFullYear() &&
        displayedMonth > currentDate.getMonth())
    ) {
      let newMonth = displayedMonth - 1;
      let newYear = displayedYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      setDisplayedMonth(newMonth);
      setDisplayedYear(newYear);
    }
  };

  const handleNext = () => {
    if (
      displayedYear < allowedNextYear ||
      (displayedYear === allowedNextYear &&
        displayedMonth < allowedNextMonth)
    ) {
      let newMonth = displayedMonth + 1;
      let newYear = displayedYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      setDisplayedMonth(newMonth);
      setDisplayedYear(newYear);
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="calendar-container">
      <motion.div
        className="calendar-header"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={handlePrev}
          disabled={
            displayedYear === currentDate.getFullYear() &&
            displayedMonth === currentDate.getMonth()
          }
          className="nav-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Previous
        </motion.button>

        <motion.h2
          className="month-year"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {monthNames[displayedMonth]} {displayedYear}
        </motion.h2>

        <motion.button
          onClick={handleNext}
          disabled={
            displayedYear === allowedNextYear &&
            displayedMonth === allowedNextMonth
          }
          className="nav-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </motion.div>

      {loading ? <p>Evenementen worden geladen...</p> : renderCalendarGrid()}

      <motion.div
        className="extra-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h3>Extra Informatie</h3>
        <p>
          Elke woensdagavond is er dartavond, donderdag avond jamsessie.
        </p>
      </motion.div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="modal-overlay"
            onClick={() => setSelectedEvent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>{selectedEvent.summary}</h2>
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
              <button onClick={() => setSelectedEvent(null)} className="close-button">
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
      <main className="events-page container">
        <Calendar />
      </main>
    </>
  );
}

export default Evenementen;