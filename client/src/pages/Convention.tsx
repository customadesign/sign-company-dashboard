import { useState, useEffect } from 'react';
import { CalendarDaysIcon, MapPinIcon, ClockIcon, TicketIcon, UserGroupIcon, SparklesIcon, MicrophoneIcon, AcademicCapIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  bio: string;
  topic: string;
  day: string;
  time: string;
}

interface Schedule {
  day: string;
  date: string;
  events: {
    time: string;
    title: string;
    speaker?: string;
    location: string;
    type: 'keynote' | 'workshop' | 'networking' | 'meal' | 'exhibition';
  }[];
}

const Convention = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRegistered, setIsRegistered] = useState(false);

  // Convention date - August 22, 2025
  const conventionDate = new Date(2025, 7, 22, 9, 0, 0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = conventionDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mock speakers data
  const speakers: Speaker[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'CEO & Industry Leader',
      company: 'SignTech Innovations',
      image: 'https://via.placeholder.com/150',
      bio: 'With over 20 years in the sign industry, Sarah has revolutionized digital signage solutions.',
      topic: 'The Future of Digital Signage',
      day: 'Day 1',
      time: '9:30 AM'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Marketing Director',
      company: 'BrandVision Group',
      image: 'https://via.placeholder.com/150',
      bio: 'Expert in brand development and marketing strategies for sign businesses.',
      topic: 'Building Your Sign Business Brand',
      day: 'Day 1',
      time: '11:00 AM'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      title: 'Technical Specialist',
      company: 'LED Solutions Pro',
      image: 'https://via.placeholder.com/150',
      bio: 'Leading expert in LED technology and sustainable sign solutions.',
      topic: 'Sustainable Sign Manufacturing',
      day: 'Day 2',
      time: '10:00 AM'
    },
    {
      id: '4',
      name: 'David Thompson',
      title: 'Business Coach',
      company: 'Growth Strategies Inc.',
      image: 'https://via.placeholder.com/150',
      bio: 'Helps sign businesses scale operations and increase profitability.',
      topic: 'Scaling Your Sign Business',
      day: 'Day 2',
      time: '2:00 PM'
    }
  ];

  // Mock schedule data
  const schedule: Schedule[] = [
    {
      day: 'Day 1',
      date: 'August 22, 2025',
      events: [
        { time: '8:00 AM', title: 'Registration & Welcome Breakfast', location: 'Main Lobby', type: 'meal' },
        { time: '9:00 AM', title: 'Opening Ceremony', location: 'Grand Ballroom', type: 'keynote' },
        { time: '9:30 AM', title: 'The Future of Digital Signage', speaker: 'Sarah Johnson', location: 'Grand Ballroom', type: 'keynote' },
        { time: '11:00 AM', title: 'Building Your Sign Business Brand', speaker: 'Michael Chen', location: 'Room A', type: 'workshop' },
        { time: '12:30 PM', title: 'Networking Lunch', location: 'Dining Hall', type: 'meal' },
        { time: '2:00 PM', title: 'Innovation Exhibition', location: 'Exhibition Hall', type: 'exhibition' },
        { time: '4:00 PM', title: 'Panel Discussion: Industry Trends', location: 'Grand Ballroom', type: 'keynote' },
        { time: '6:00 PM', title: 'Welcome Reception', location: 'Rooftop Terrace', type: 'networking' }
      ]
    },
    {
      day: 'Day 2',
      date: 'August 23, 2025',
      events: [
        { time: '8:30 AM', title: 'Morning Coffee & Networking', location: 'Main Lobby', type: 'networking' },
        { time: '10:00 AM', title: 'Sustainable Sign Manufacturing', speaker: 'Lisa Rodriguez', location: 'Room B', type: 'workshop' },
        { time: '11:30 AM', title: 'Technology Showcase', location: 'Exhibition Hall', type: 'exhibition' },
        { time: '1:00 PM', title: 'Awards Luncheon', location: 'Grand Ballroom', type: 'meal' },
        { time: '2:00 PM', title: 'Scaling Your Sign Business', speaker: 'David Thompson', location: 'Room A', type: 'workshop' },
        { time: '3:30 PM', title: 'Best Practices Roundtable', location: 'Conference Room C', type: 'networking' },
        { time: '5:00 PM', title: 'Closing Ceremony', location: 'Grand Ballroom', type: 'keynote' },
        { time: '7:00 PM', title: 'Gala Dinner', location: 'Crystal Ballroom', type: 'meal' }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: SparklesIcon },
    { id: 'schedule', label: 'Schedule', icon: CalendarDaysIcon },
    { id: 'speakers', label: 'Speakers', icon: MicrophoneIcon },
    { id: 'registration', label: 'Registration', icon: TicketIcon },
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'keynote': return '🎤';
      case 'workshop': return '🛠️';
      case 'networking': return '🤝';
      case 'meal': return '🍽️';
      case 'exhibition': return '🏛️';
      default: return '📅';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'workshop': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'networking': return 'bg-green-100 text-green-800 border-green-200';
      case 'meal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exhibition': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Countdown */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Sign Company Convention 2025</h1>
            <p className="text-lg sm:text-xl mb-4 text-primary-100">Innovate. Connect. Grow.</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                August 22-23, 2025
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Las Vegas Convention Center
              </div>
            </div>
          </div>
          
          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Event Starts In</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{countdown.days}</div>
                <div className="text-xs uppercase tracking-wide">Days</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{countdown.hours}</div>
                <div className="text-xs uppercase tracking-wide">Hours</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{countdown.minutes}</div>
                <div className="text-xs uppercase tracking-wide">Minutes</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{countdown.seconds}</div>
                <div className="text-xs uppercase tracking-wide">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm rounded-xl">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto scrollbar-hide space-x-4 sm:space-x-8 px-4 sm:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <UserGroupIcon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                  <p className="text-gray-700">Expected Attendees</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <AcademicCapIcon className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">30+</h3>
                  <p className="text-gray-700">Educational Sessions</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <GlobeAmericasIcon className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                  <p className="text-gray-700">Industry Exhibitors</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Convention</h3>
                <p className="text-gray-600 mb-4">
                  Join us for the most anticipated Sign Company event of the year! The 2025 Annual Convention brings together 
                  sign industry professionals from across the nation for two days of learning, networking, and innovation.
                </p>
                <p className="text-gray-600 mb-4">
                  Discover cutting-edge technologies, learn from industry leaders, and connect with fellow sign business 
                  owners. Whether you're looking to grow your business, stay ahead of trends, or find new partnerships, 
                  this convention has something for everyone.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What to Expect</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Keynote presentations from industry visionaries
                  </li>
                  <li className="flex items-start">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Hands-on workshops and technical training sessions
                  </li>
                  <li className="flex items-start">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Exhibition hall featuring the latest products and services
                  </li>
                  <li className="flex items-start">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Networking opportunities with peers and partners
                  </li>
                  <li className="flex items-start">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Awards ceremony recognizing excellence in the industry
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {schedule.map((day) => (
                <div key={day.day} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{day.day}</h3>
                    <span className="text-sm text-gray-600">{day.date}</span>
                  </div>
                  <div className="space-y-3">
                    {day.events.map((event, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 sm:p-4 flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              {event.speaker && (
                                <p className="text-sm text-gray-600 mt-1">Speaker: {event.speaker}</p>
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-500">
                                <span className="flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  {event.time}
                                </span>
                                <span className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-1" />
                                  {event.location}
                                </span>
                              </div>
                            </div>
                            <span className={`
                              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                              ${getEventTypeColor(event.type)}
                            `}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Speakers Tab */}
          {activeTab === 'speakers' && (
            <div className="space-y-6">
              <p className="text-gray-600 mb-6">
                Learn from the best in the industry. Our speakers bring decades of experience and cutting-edge insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {speakers.map((speaker) => (
                  <div
                    key={speaker.id}
                    onClick={() => setSelectedSpeaker(speaker)}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {speaker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{speaker.name}</h4>
                        <p className="text-sm text-gray-600">{speaker.title}</p>
                        <p className="text-sm text-primary-600">{speaker.company}</p>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-900">Topic:</p>
                          <p className="text-sm text-gray-700">{speaker.topic}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <CalendarDaysIcon className="h-4 w-4 mr-1" />
                          {speaker.day} • {speaker.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration Tab */}
          {activeTab === 'registration' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Reserve Your Spot</h3>
                <p className="text-gray-600">Join us for an unforgettable experience at Sign Company Convention 2025</p>
              </div>

              {!isRegistered ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Registration Options</h4>
                    <div className="space-y-4">
                      <label className="block">
                        <input type="radio" name="registration" className="mr-3" defaultChecked />
                        <span className="text-gray-700">
                          <strong>Full Convention Pass</strong> - $599
                          <span className="block text-sm text-gray-600 ml-6">
                            Access to all sessions, workshops, exhibition hall, and meals
                          </span>
                        </span>
                      </label>
                      <label className="block">
                        <input type="radio" name="registration" className="mr-3" />
                        <span className="text-gray-700">
                          <strong>Day Pass</strong> - $349
                          <span className="block text-sm text-gray-600 ml-6">
                            Single day access to sessions and exhibition hall
                          </span>
                        </span>
                      </label>
                      <label className="block">
                        <input type="radio" name="registration" className="mr-3" />
                        <span className="text-gray-700">
                          <strong>Virtual Pass</strong> - $199
                          <span className="block text-sm text-gray-600 ml-6">
                            Live streaming access to keynote sessions
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Early Bird Special:</strong> Register before July 1st and save 20% on all passes!
                    </p>
                  </div>

                  <button
                    onClick={() => setIsRegistered(true)}
                    className="w-full py-3 px-6 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Complete Registration
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Registration Complete!</h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for registering for Sign Company Convention 2025. 
                    We've sent a confirmation email with your ticket details.
                  </p>
                  <div className="inline-flex items-center space-x-4">
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Download Ticket
                    </button>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Speaker Details Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center sm:p-4 z-50">
          <div className="bg-white rounded-t-xl sm:rounded-xl max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Speaker Profile</h3>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {selectedSpeaker.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-gray-900">{selectedSpeaker.name}</h4>
                <p className="text-lg text-gray-600">{selectedSpeaker.title}</p>
                <p className="text-primary-600 mb-4">{selectedSpeaker.company}</p>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Biography</h5>
                    <p className="text-gray-600">{selectedSpeaker.bio}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Session Topic</h5>
                    <p className="text-gray-800 font-medium">{selectedSpeaker.topic}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <CalendarDaysIcon className="h-4 w-4 mr-1" />
                      {selectedSpeaker.day} • {selectedSpeaker.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Convention;