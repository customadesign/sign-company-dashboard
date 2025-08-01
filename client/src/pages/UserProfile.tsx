import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  UserIcon,
  CogIcon,
  CreditCardIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import UserSettings from '../components/profile/UserSettings';
import UserBilling from '../components/profile/UserBilling';

const tabs = [
  {
    id: 'settings',
    name: 'Settings',
    icon: CogIcon,
    description: 'Manage your account settings and preferences',
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: CreditCardIcon,
    description: 'View subscription, payment methods, and billing history',
  },
];

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return <UserSettings />;
      case 'billing':
        return <UserBilling />;
      default:
        return <UserSettings />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-primary-500 flex items-center justify-center ring-4 ring-white shadow-xl">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">{user?.name || 'User Profile'}</h1>
              <p className="text-xl text-primary-100 mt-1">{user?.email}</p>
              {user?.company && (
                <p className="text-lg text-primary-200 mt-1">{user.company}</p>
              )}
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-800 text-primary-100">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                {user?.role === 'admin' ? 'Administrator' : 'Owner'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Profile tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative min-w-0 flex-1 overflow-hidden py-6 px-6 text-center hover:bg-gray-50 focus:z-10 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <tab.icon 
                    className={`h-6 w-6 ${
                      activeTab === tab.id ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className="text-sm font-medium">{tab.name}</span>
                  <span className="text-xs text-gray-500 hidden sm:block max-w-xs">
                    {tab.description}
                  </span>
                </div>
                {activeTab === tab.id && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;