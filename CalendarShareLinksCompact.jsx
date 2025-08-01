import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CalendarShareLinksCompact = ({ calendar, baseUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');

  const generateICalUrl = () => {
    const calendarUrl = `${baseUrl}/api/calendars/${calendar.id}/ical`;
    return calendarUrl.replace('https://', 'webcal://').replace('http://', 'webcal://');
  };

  const generateOutlookUrl = () => {
    const icalUrl = `${baseUrl}/api/calendars/${calendar.id}/ical`;
    return `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(icalUrl)}&name=${encodeURIComponent(calendar.name || 'Calendar')}`;
  };

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const icalUrl = generateICalUrl();
  const outlookUrl = generateOutlookUrl();

  return (
    <div className="calendar-share-compact">
      <button 
        className="share-toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label="Toggle calendar subscription options"
      >
        <svg 
          className="share-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
        </svg>
        <span className="share-text">Subscribe</span>
        <svg 
          className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/>
        </svg>
      </button>

      {isExpanded && (
        <div className="share-dropdown">
          <div className="share-option">
            <button
              className="share-option-button"
              onClick={() => window.location.href = icalUrl}
            >
              <svg className="option-icon" viewBox="0 0 24 24" fill="none">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" fill="currentColor"/>
              </svg>
              <span>Apple Calendar / iCal</span>
            </button>
            <button
              className="copy-btn"
              onClick={() => handleCopyLink(icalUrl)}
              title="Copy iCal link"
            >
              {copiedUrl === icalUrl ? '✓' : '📋'}
            </button>
          </div>

          <div className="share-option">
            <button
              className="share-option-button"
              onClick={() => window.open(outlookUrl, '_blank')}
            >
              <svg className="option-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
              </svg>
              <span>Outlook Calendar</span>
            </button>
            <button
              className="copy-btn"
              onClick={() => handleCopyLink(outlookUrl)}
              title="Copy Outlook link"
            >
              {copiedUrl === outlookUrl ? '✓' : '📋'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .calendar-share-compact {
          position: relative;
          display: inline-block;
        }

        .share-toggle-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .share-toggle-button:hover {
          background: #e8e8e8;
          border-color: #ccc;
        }

        .share-icon {
          width: 16px;
          height: 16px;
        }

        .share-text {
          font-weight: 500;
        }

        .chevron-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .chevron-icon.expanded {
          transform: rotate(180deg);
        }

        .share-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 220px;
          z-index: 1000;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .share-option {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
        }

        .share-option:last-child {
          border-bottom: none;
        }

        .share-option-button {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-size: 14px;
          color: #333;
        }

        .share-option-button:hover {
          background: #f8f8f8;
        }

        .option-icon {
          width: 20px;
          height: 20px;
          color: #666;
        }

        .copy-btn {
          padding: 8px;
          background: none;
          border: none;
          border-left: 1px solid #f0f0f0;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s ease;
        }

        .copy-btn:hover {
          background: #f0f0f0;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .share-dropdown {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

CalendarShareLinksCompact.propTypes = {
  calendar: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired,
  baseUrl: PropTypes.string.isRequired
};

export default CalendarShareLinksCompact;