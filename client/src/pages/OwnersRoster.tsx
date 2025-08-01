import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Owner {
  id: number;
  name: string;
  avatar: string;
  company: string;
  location: string;
  joinDate: string;
  yearsInBusiness: number;
  specialties: string[];
  rating: number;
  totalProjects: number;
  email: string;
  phone: string;
  territory: string;
  status: 'active' | 'inactive' | 'new';
  awards: number;
  certifications: string[];
  bio: string;
}

const owners: Owner[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    company: "Arizona Signs & Graphics",
    location: "Phoenix, AZ",
    joinDate: "Jan 2019",
    yearsInBusiness: 5,
    specialties: ["Vehicle Wraps", "LED Signs", "Monument Signs"],
    rating: 4.9,
    totalProjects: 342,
    email: "sarah@arizonasigns.com",
    phone: "(602) 555-0123",
    territory: "Phoenix Metro",
    status: "active",
    awards: 3,
    certifications: ["3M Certified", "OSHA Certified", "Sign Company Elite"],
    bio: "Leading the Arizona market with innovative signage solutions and exceptional customer service."
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    company: "Pacific Coast Signage",
    location: "Seattle, WA",
    joinDate: "Mar 2018",
    yearsInBusiness: 8,
    specialties: ["Digital Displays", "Wayfinding", "Corporate Branding"],
    rating: 4.8,
    totalProjects: 567,
    email: "mchen@pacificcoastsigns.com",
    phone: "(206) 555-0456",
    territory: "Seattle & Tacoma",
    status: "active",
    awards: 5,
    certifications: ["ISA Certified", "UL Listed", "Sign Company Master"],
    bio: "Specializing in high-tech digital signage solutions for the Pacific Northwest's leading businesses."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "ER",
    company: "Miami Signs International",
    location: "Miami, FL",
    joinDate: "Jun 2020",
    yearsInBusiness: 3,
    specialties: ["Neon Signs", "Channel Letters", "Window Graphics"],
    rating: 4.7,
    totalProjects: 189,
    email: "emily@miamisigns.com",
    phone: "(305) 555-0789",
    territory: "Miami-Dade County",
    status: "new",
    awards: 1,
    certifications: ["3M Certified", "Sign Company Professional"],
    bio: "Bringing vibrant, creative signage to South Florida with a focus on quality and innovation."
  },
  {
    id: 4,
    name: "David Martinez",
    avatar: "DM",
    company: "Texas Premier Signs",
    location: "Austin, TX",
    joinDate: "Sep 2017",
    yearsInBusiness: 10,
    specialties: ["Monument Signs", "Pylon Signs", "ADA Signage"],
    rating: 5.0,
    totalProjects: 892,
    email: "david@texaspremiersigns.com",
    phone: "(512) 555-0234",
    territory: "Central Texas",
    status: "active",
    awards: 7,
    certifications: ["ISA Elite", "OSHA Certified", "Sign Company Master", "LEED AP"],
    bio: "A decade of excellence in commercial signage, serving Austin's fastest-growing businesses."
  }
];

const territories = [
  { name: "All Territories", count: 127 },
  { name: "West Coast", count: 34 },
  { name: "Southwest", count: 28 },
  { name: "Midwest", count: 22 },
  { name: "Southeast", count: 25 },
  { name: "Northeast", count: 18 }
];

const specialtyFilters = [
  "Vehicle Wraps",
  "LED Signs",
  "Monument Signs",
  "Digital Displays",
  "Channel Letters",
  "Wayfinding",
  "Neon Signs",
  "ADA Signage"
];

const OwnersRoster = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState('All Territories');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <UserGroupIcon className="h-8 w-8 mr-3" />
                Owners Roster
              </h1>
              <p className="mt-3 text-lg text-primary-100">
                Connect with Sign Company franchise owners across the country
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export Directory
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <UserGroupIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">127</p>
          <p className="text-sm text-gray-600">Total Owners</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <MapPinIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">42</p>
          <p className="text-sm text-gray-600">States Covered</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <StarIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">4.8</p>
          <p className="text-sm text-gray-600">Avg. Rating</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <BuildingOfficeIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">$125M</p>
          <p className="text-sm text-gray-600">Combined Revenue</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
                Filters
                {showFilters ? (
                  <ChevronUpIcon className="h-4 w-4 ml-1 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-400" />
                )}
              </button>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Territory</h4>
                <div className="flex flex-wrap gap-2">
                  {territories.map((territory) => (
                    <button
                      key={territory.name}
                      onClick={() => setSelectedTerritory(territory.name)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedTerritory === territory.name
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {territory.name} ({territory.count})
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {specialtyFilters.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => toggleSpecialty(specialty)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedSpecialties.includes(specialty)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Owners Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {owners.map((owner) => (
            <Link
              key={owner.id}
              to={`/owners/${owner.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer block"
            >
              <div className="p-6">
                {/* Owner Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl">
                      {owner.avatar}
                    </div>
                    <div className="ml-4 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{owner.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{owner.company}</p>
                      <div className="flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs sm:text-sm text-gray-500 truncate">{owner.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(owner.status)}`}>
                    {owner.status}
                  </span>
                </div>

                {/* Owner Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Territory</span>
                    <span className="font-medium text-gray-900">{owner.territory}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Years in Business</span>
                    <span className="font-medium text-gray-900">{owner.yearsInBusiness}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Projects</span>
                    <span className="font-medium text-gray-900">{owner.totalProjects}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rating</span>
                    <div className="flex items-center">
                      <StarSolidIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium text-gray-900">{owner.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {owner.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-700"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle email action
                    }}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <EnvelopeIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                    Email
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle message action
                    }}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-primary-600 text-xs sm:text-sm font-medium rounded-lg text-white hover:bg-primary-700 transition-colors">
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-1.5" />
                    Message
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {owners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                          {owner.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{owner.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{owner.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-900">{owner.location}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{owner.territory}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {owner.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <div className="text-xs sm:text-sm">
                          <span className="text-gray-500">Projects: </span>
                          <span className="font-medium text-gray-900">{owner.totalProjects}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm">
                          <StarSolidIcon className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium text-gray-900">{owner.rating}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(owner.status)}`}>
                        {owner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link to={`/owners/${owner.id}`} className="text-primary-600 hover:text-primary-900 text-xs sm:text-sm">
                          View Profile
                        </Link>
                        <button className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm">
                          Contact
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Load More */}
      <div className="text-center">
        <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200">
          Load More Owners
        </button>
      </div>
    </div>
  );
};

export default OwnersRoster;