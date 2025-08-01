import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, isToday } from 'date-fns';
import CalendarShareLinks from '../components/calendar/CalendarShareLinks';
import CalendarShareLinksCompact from '../components/calendar/CalendarShareLinksCompact';
import CalendarShareSection from '../components/calendar/CalendarShareSection';
import calendarService, { type CalendarEvent } from '../services/calendarService';

// Map backend CalendarEvent to frontend Event interface
interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'meeting' | 'training' | 'convention' | 'webinar' | 'deadline' | 'social' | 'other';
  attendees: number;
  description: string;
  color?: string;
  isOnline?: boolean;
  onlineLink?: string;
  organizer?: string;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert CalendarEvent to Event format
  const mapCalendarEventToEvent = (calendarEvent: CalendarEvent): Event => {
    const startDate = new Date(calendarEvent.startDate);
    const endDate = new Date(calendarEvent.endDate);
    
    // Format time display
    const timeFormat = 'h:mm a';
    let time: string;
    if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
      // Same day event
      time = `${format(startDate, timeFormat)} - ${format(endDate, timeFormat)}`;
    } else {
      // Multi-day event
      time = `${format(startDate, 'MMM d, yyyy h:mm a')} - ${format(endDate, 'MMM d, yyyy h:mm a')}`;
    }
    
    return {
      id: calendarEvent._id,
      title: calendarEvent.title,
      date: startDate,
      time,
      location: calendarEvent.location || (calendarEvent.isOnline ? 'Online' : 'TBD'),
      type: calendarEvent.category as Event['type'],
      attendees: calendarEvent.attendees?.filter(a => a.status === 'confirmed').length || 0,
      description: calendarEvent.description,
      color: calendarEvent.color,
      isOnline: calendarEvent.isOnline,
      onlineLink: calendarEvent.onlineLink,
      organizer: calendarEvent.organizer?.name
    };
  };

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const calendarEvents = await calendarService.getEvents();
      const mappedEvents = calendarEvents.map(mapCalendarEventToEvent);
      setEvents(mappedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load calendar events. Please try again.');
      // Fallback to empty array
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

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
      case 'social': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'other': return 'bg-gray-100 text-gray-800 border-gray-200';
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
      {/* Loading State */}
      {loading && (
        <div className="bg-white shadow-sm rounded-xl p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading calendar events...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={fetchEvents}
                className="text-sm text-red-600 hover:text-red-500 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Calendar & Events</h2>
            <p className="mt-1 text-sm text-gray-600">Manage your schedule and stay updated with Sign Company events</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <CalendarShareLinksCompact 
              events={events}
              calendarName="Sign Company Calendar"
              className="sm:order-last"
            />
            <button className="inline-flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 transition-all duration-200 shadow-sm hover:shadow-md">
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
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-xl p-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-200 shadow-sm hover:shadow-md"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm"
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

          {/* Calendar Share Section - New prominent placement below calendar */}
          <CalendarShareSection 
            events={events}
            calendarName="Sign Company Calendar"
          />
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
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md hover:bg-primary-25 transition-all duration-200 cursor-pointer"
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
                { type: 'social', label: 'Social Events', color: 'bg-pink-100 text-pink-800' },
                { type: 'other', label: 'Other Events', color: 'bg-gray-100 text-gray-800' },
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
                <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-200 text-center">
                  Edit
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:shadow-md transition-all duration-200 text-center">
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