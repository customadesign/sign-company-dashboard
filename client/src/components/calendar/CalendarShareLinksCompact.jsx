import React from 'react';
import CalendarShareLinks from './CalendarShareLinks';

/**
 * Compact version of CalendarShareLinks component
 * Ideal for integration in smaller spaces like sidebars, headers, or modal footers
 */
const CalendarShareLinksCompact = ({ 
  events = [], 
  calendarName = "Sign Company Calendar",
  onShareLinkGenerated = null,
  className = ""
}) => {
  return (
    <div className={`calendar-share-compact-wrapper ${className}`}>
      <CalendarShareLinks
        events={events}
        calendarName={calendarName}
        onShareLinkGenerated={onShareLinkGenerated}
        compact={true}
      />
    </div>
  );
};

export default CalendarShareLinksCompact;