import React, { useState, useEffect } from 'react';
import CalendarShareLinks from './CalendarShareLinks';
import CalendarShareLinksCompact from './CalendarShareLinksCompact';
import './CalendarShareLinks.css';

// Example calendar page component showing integration
const CalendarPage = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the base URL from environment or current location
  const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;

  useEffect(() => {
    // Fetch calendars from your API
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await fetch('/api/calendars');
      const data = await response.json();
      setCalendars(data);
    } catch (error) {
      console.error('Error fetching calendars:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="calendar-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading calendars...</p>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <h1>Company Calendars</h1>
        <p>Subscribe to stay updated with our schedules</p>
      </header>

      <div className="calendars-grid">
        {calendars.map((calendar) => (
          <div key={calendar.id} className="calendar-card">
            <div className="calendar-info">
              <h3 className="calendar-name">{calendar.name}</h3>
              <p className="calendar-description">{calendar.description}</p>
              
              {/* Calendar events preview */}
              <div className="calendar-preview">
                <h4>Upcoming Events</h4>
                {calendar.upcomingEvents?.slice(0, 3).map((event, index) => (
                  <div key={index} className="event-preview">
                    <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                    <span className="event-title">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Option 1: Full share links component */}
            <CalendarShareLinks 
              calendar={calendar} 
              baseUrl={baseUrl}
            />

            {/* Alternative: Compact share links in header */}
            {/* 
            <div className="calendar-actions">
              <CalendarShareLinksCompact 
                calendar={calendar} 
                baseUrl={baseUrl}
              />
            </div>
            */}
          </div>
        ))}
      </div>

      <style jsx>{`
        .calendar-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .calendar-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .calendar-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .calendar-header p {
          font-size: 16px;
          color: #6b7280;
          margin: 0;
        }

        .calendars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .calendar-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .calendar-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .calendar-info {
          margin-bottom: 20px;
        }

        .calendar-name {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .calendar-description {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .calendar-preview h4 {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px 0;
        }

        .event-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .event-preview:last-child {
          border-bottom: none;
        }

        .event-date {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
        }

        .event-title {
          font-size: 13px;
          color: #374151;
          flex: 1;
          margin-left: 12px;
        }

        .calendar-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }

        .calendar-page-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          color: #6b7280;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #f3f4f6;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .calendar-page {
            padding: 16px;
          }

          .calendars-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .calendar-card {
            padding: 20px;
          }

          .calendar-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;