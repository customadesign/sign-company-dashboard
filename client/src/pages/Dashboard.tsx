import { useAuth } from '../context/AuthContext';
import {
  CalendarIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  VideoCameraIcon,
  ChartBarIcon,
  BellIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Owners', value: '127', icon: UserGroupIcon, change: '+4.5%', changeType: 'positive' },
  { name: 'Upcoming Events', value: '8', icon: CalendarIcon, change: '3 this week', changeType: 'neutral' },
  { name: 'Library Files', value: '342', icon: DocumentDuplicateIcon, change: '+12', changeType: 'positive' },
  { name: 'Video Lessons', value: '56', icon: VideoCameraIcon, change: '2 new', changeType: 'positive' },
];

const recentActivities = [
  { id: 1, type: 'event', message: 'New event: Q1 Training Webinar', time: '2 hours ago' },
  { id: 2, type: 'owner', message: 'John Smith joined the network', time: '4 hours ago' },
  { id: 3, type: 'file', message: 'Marketing templates updated', time: '1 day ago' },
  { id: 4, type: 'forum', message: 'New discussion: Equipment recommendations', time: '2 days ago' },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-3 text-lg text-primary-100">
            Here's what's happening in your Sign Company network today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <span
                      className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stat.changeType === 'positive'
                          ? 'bg-green-100 text-green-800'
                          : stat.changeType === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BellIcon className="h-5 w-5 mr-2 text-primary-600" />
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <div className="h-2 w-2 bg-primary-600 rounded-full" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-primary-600" />
              Quick Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">View Upcoming Events</span>
                </span>
                <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="flex items-center">
                  <VideoCameraIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Browse Video Library</span>
                </span>
                <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Search Owner Directory</span>
                </span>
                <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="flex items-center">
                  <FolderIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Download Resources</span>
                </span>
                <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;