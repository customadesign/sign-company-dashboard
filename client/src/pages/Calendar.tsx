import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, isToday } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'meeting' | 'training' | 'convention' | 'webinar' | 'deadline';
  attendees: number;
  description: string;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Mock events data - Note: Month is 0-indexed (0 = January, 7 = August)
  const events: Event[] = [
    {
      id: '1',
      title: 'Monthly Owner Meeting',
      date: new Date(2025, 7, 15, 14, 0), // August 15, 2025
      time: '2:00 PM - 3:30 PM',
      location: 'Virtual - Zoom',
      type: 'meeting',
      attendees: 45,
      description: 'Monthly meeting to discuss Q3 goals and performance metrics.'
    },
    {
      id: '2',
      title: 'Sign Design Workshop',
      date: new Date(2025, 7, 8, 10, 0), // August 8, 2025
      time: '10:00 AM - 12:00 PM',
      location: 'Training Center - Room A',
      type: 'training',
      attendees: 25,
      description: 'Learn advanced techniques for creating eye-catching sign designs.'
    },
    {
      id: '3',
      title: 'Annual Convention 2025',
      date: new Date(2025, 7, 22, 9, 0), // August 22, 2025
      time: 'All Day Event',
      location: 'Las Vegas Convention Center',
      type: 'convention',
      attendees: 500,
      description: 'The biggest Sign Company event of the year! Network, learn, and celebrate.'
    },
    {
      id: '4',
      title: 'Digital Marketing Webinar',
      date: new Date(2025, 7, 18, 13, 0), // August 18, 2025
      time: '1:00 PM - 2:00 PM',
      location: 'Online',
      type: 'webinar',
      attendees: 120,
      description: 'Strategies for growing your sign business with digital marketing.'
    },
    {
      id: '5',
      title: 'Q3 Reports Due',
      date: new Date(2025, 7, 30, 17, 0), // August 30, 2025 (31st doesn't exist in all months)
      time: '5:00 PM',
      location: 'Submit Online',
      type: 'deadline',
      attendees: 0,
      description: 'Quarterly financial and performance reports submission deadline.'
    }
  ];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'training': return 'bg-green-100 text-green-800 border-green-200';
      case 'convention': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'webinar': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
        {/* Header */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Calendar & Events</h2>
            <p className="mt-1 text-sm text-gray-600">Manage your schedule and stay updated with Sign Company events</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
              <CalendarDaysIcon className="h-5 w-5 mr-2" />
              Add Event
            </button>
            <div className="flex justify-center rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === 'month' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-gray-300 ${
                  viewMode === 'week' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-gray-300 ${
                  viewMode === 'day' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Day
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-xl p-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              {/* Week days */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-gray-50 px-1 sm:px-2 py-2 sm:py-3 text-center border-b border-gray-200">
                  <span className="text-xs font-semibold text-gray-600">{day}</span>
                </div>
              ))}
              
              {/* Calendar days */}
              {days.map((day, idx) => {
                const dayEvents = getEventsForDate(day);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);
                
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      bg-white p-1 sm:p-2 min-h-[80px] sm:min-h-[100px] cursor-pointer transition-all border-r border-b border-gray-100 last:border-r-0
                      ${!isCurrentMonth ? 'text-gray-400 bg-gray-25' : 'text-gray-900'}
                      ${isSelected ? 'ring-2 ring-primary-400 bg-primary-25 shadow-sm' : 'hover:bg-gray-50 hover:shadow-sm'}
                    `}
                  >
                    <div className={`
                      inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-base rounded-full mb-1 transition-colors
                      ${isTodayDate ? 'bg-primary-600 text-white font-semibold shadow-sm' : 'hover:bg-gray-100'}
                    `}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                          }}
                          className={`
                            text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded border cursor-pointer
                            ${getEventTypeColor(event.type)}
                            hover:shadow-sm transition-shadow
                          `}
                        >
                          <p className="truncate font-medium text-[10px] sm:text-xs">{event.title}</p>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <p className="text-[10px] sm:text-xs text-gray-500 px-1 sm:px-2">+{dayEvents.length - 2} more</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {format(event.date, 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <span className={`
                      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${getEventTypeColor(event.type)}
                    `}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Types Legend */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
            <div className="space-y-3">
              {[
                { type: 'meeting', label: 'Meetings', color: 'bg-blue-100 text-blue-800' },
                { type: 'training', label: 'Training Sessions', color: 'bg-green-100 text-green-800' },
                { type: 'convention', label: 'Conventions', color: 'bg-purple-100 text-purple-800' },
                { type: 'webinar', label: 'Webinars', color: 'bg-yellow-100 text-yellow-800' },
                { type: 'deadline', label: 'Deadlines', color: 'bg-red-100 text-red-800' },
              ].map(({ type, label, color }) => (
                <div key={type} className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-3 ${color.split(' ')[0]}`}></span>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 z-50">
          <div className="bg-white rounded-t-xl sm:rounded-xl max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-700">
                <CalendarDaysIcon className="h-5 w-5 mr-3 text-primary-500" />
                <span className="font-medium">{format(selectedEvent.date, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <ClockIcon className="h-5 w-5 mr-3 text-primary-500" />
                <span className="font-medium">{selectedEvent.time}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPinIcon className="h-5 w-5 mr-3 text-primary-500" />
                <span className="font-medium">{selectedEvent.location}</span>
              </div>
              {selectedEvent.attendees > 0 && (
                <div className="flex items-center text-gray-700">
                  <UserGroupIcon className="h-5 w-5 mr-3 text-primary-500" />
                  <span className="font-medium">{selectedEvent.attendees} attendees</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={`
                inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                ${getEventTypeColor(selectedEvent.type)}
              `}>
                {selectedEvent.type}
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-center">
                  Edit
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center">
                  Join Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
