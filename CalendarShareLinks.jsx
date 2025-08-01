import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CalendarShareLinks = ({ calendar, baseUrl }) => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const [copiedType, setCopiedType] = useState('');

  // Generate calendar URLs
  const generateICalUrl = () => {
    // webcal:// protocol for automatic subscription in calendar apps
    const calendarUrl = `${baseUrl}/api/calendars/${calendar.id}/ical`;
    return calendarUrl.replace('https://', 'webcal://').replace('http://', 'webcal://');
  };

  const generateOutlookUrl = () => {
    // Outlook.com web calendar subscription URL
    const icalUrl = `${baseUrl}/api/calendars/${calendar.id}/ical`;
    return `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(icalUrl)}&name=${encodeURIComponent(calendar.name || 'Calendar')}`;
  };

  const handleCopyLink = async (url, type) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedType(type);
      setShowCopiedTooltip(true);
      setTimeout(() => {
        setShowCopiedTooltip(false);
        setCopiedType('');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const icalUrl = generateICalUrl();
  const outlookUrl = generateOutlookUrl();

  return (
    <div className="calendar-share-links">
      <div className="share-links-container">
        <h4 className="share-links-title">Subscribe to Calendar</h4>
        
        {/* iCal Link */}
        <div className="share-link-item">
          <div className="share-link-content">
            <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/>
            </svg>
            <div className="share-link-info">
              <span className="share-link-label">iCal / Apple Calendar</span>
              <a 
                href={icalUrl}
                className="share-link-url"
                onClick={(e) => e.stopPropagation()}
              >
                {icalUrl}
              </a>
            </div>
          </div>
          <div className="share-link-actions">
            <button
              className="share-link-button subscribe-button"
              onClick={() => window.location.href = icalUrl}
              title="Subscribe in Calendar App"
            >
              Subscribe
            </button>
            <button
              className="share-link-button copy-button"
              onClick={() => handleCopyLink(icalUrl, 'ical')}
              title="Copy Link"
            >
              <svg className="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
              </svg>
              {showCopiedTooltip && copiedType === 'ical' && (
                <span className="copied-tooltip">Copied!</span>
              )}
            </button>
          </div>
        </div>

        {/* Outlook Link */}
        <div className="share-link-item">
          <div className="share-link-content">
            <svg className="calendar-icon outlook-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
            </svg>
            <div className="share-link-info">
              <span className="share-link-label">Outlook Calendar</span>
              <a 
                href={outlookUrl}
                className="share-link-url"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Outlook.com
              </a>
            </div>
          </div>
          <div className="share-link-actions">
            <button
              className="share-link-button subscribe-button"
              onClick={() => window.open(outlookUrl, '_blank')}
              title="Add to Outlook"
            >
              Add
            </button>
            <button
              className="share-link-button copy-button"
              onClick={() => handleCopyLink(outlookUrl, 'outlook')}
              title="Copy Link"
            >
              <svg className="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
              </svg>
              {showCopiedTooltip && copiedType === 'outlook' && (
                <span className="copied-tooltip">Copied!</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calendar-share-links {
          margin: 16px 0;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .share-links-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .share-links-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px 0;
        }

        .share-link-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .share-link-item:hover {
          background: #f0f1f3;
        }

        .share-link-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .calendar-icon {
          width: 24px;
          height: 24px;
          color: #4285f4;
          flex-shrink: 0;
        }

        .outlook-icon {
          color: #0078d4;
        }

        .share-link-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .share-link-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .share-link-url {
          font-size: 12px;
          color: #666;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 300px;
        }

        .share-link-url:hover {
          color: #4285f4;
          text-decoration: underline;
        }

        .share-link-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .share-link-button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .subscribe-button {
          background: #4285f4;
          color: white;
        }

        .subscribe-button:hover {
          background: #3367d6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .copy-button {
          background: #ffffff;
          border: 1px solid #dadce0;
          color: #5f6368;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          min-width: 32px;
          height: 32px;
        }

        .copy-button:hover {
          background: #f8f9fa;
          border-color: #c0c0c0;
        }

        .copy-icon {
          width: 16px;
          height: 16px;
        }

        .copied-tooltip {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          animation: fadeInOut 0.3s ease;
        }

        .copied-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: #333;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-4px);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .calendar-share-links {
            padding: 16px;
            margin: 12px 0;
          }

          .share-link-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .share-link-content {
            width: 100%;
          }

          .share-link-url {
            max-width: 100%;
          }

          .share-link-actions {
            justify-content: flex-end;
            width: 100%;
          }

          .subscribe-button {
            flex: 1;
          }
        }

        @media (max-width: 480px) {
          .share-links-title {
            font-size: 14px;
          }

          .share-link-label {
            font-size: 13px;
          }

          .share-link-button {
            font-size: 12px;
            padding: 4px 10px;
          }

          .copy-button {
            min-width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
};

CalendarShareLinks.propTypes = {
  calendar: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired,
  baseUrl: PropTypes.string.isRequired
};

export default CalendarShareLinks;