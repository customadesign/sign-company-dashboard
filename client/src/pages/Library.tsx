import { useState } from 'react';
import {
  FolderIcon,
  DocumentIcon,
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  ChevronRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { FolderIcon as FolderSolidIcon } from '@heroicons/react/24/solid';

// Mock data for file library
const folders = [
  { id: 1, name: 'Marketing Materials', items: 45, lastModified: '2024-01-15', size: '2.4 GB' },
  { id: 2, name: 'Training Videos', items: 23, lastModified: '2024-01-10', size: '15.8 GB' },
  { id: 3, name: 'Legal Documents', items: 67, lastModified: '2024-01-12', size: '890 MB' },
  { id: 4, name: 'Event Photos', items: 342, lastModified: '2024-01-08', size: '5.2 GB' },
];

const recentFiles = [
  { id: 1, name: 'Q1_Marketing_Strategy.pdf', type: 'pdf', size: '2.4 MB', modified: '2 hours ago', folder: 'Marketing Materials' },
  { id: 2, name: 'Installation_Guide_2024.docx', type: 'doc', size: '1.8 MB', modified: '5 hours ago', folder: 'Training Videos' },
  { id: 3, name: 'Brand_Guidelines_V3.pdf', type: 'pdf', size: '12.3 MB', modified: '1 day ago', folder: 'Marketing Materials' },
  { id: 4, name: 'Convention_Highlights_2023.mp4', type: 'video', size: '245 MB', modified: '2 days ago', folder: 'Event Photos' },
  { id: 5, name: 'Territory_Agreement_Template.docx', type: 'doc', size: '156 KB', modified: '3 days ago', folder: 'Legal Documents' },
];

const fileTypeStats = [
  { type: 'Documents', count: 234, icon: DocumentTextIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
  { type: 'Images', count: 456, icon: PhotoIcon, color: 'text-green-600', bg: 'bg-green-100' },
  { type: 'Videos', count: 89, icon: FilmIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
  { type: 'Other', count: 121, icon: DocumentIcon, color: 'text-gray-600', bg: 'bg-gray-100' },
];

const Library = () => {
  console.log('Library component is rendering');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <DocumentTextIcon className="h-8 w-8 text-red-500" />;
      case 'doc':
        return <DocumentTextIcon className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <FilmIcon className="h-8 w-8 text-purple-500" />;
      case 'image':
        return <PhotoIcon className="h-8 w-8 text-green-500" />;
      default:
        return <DocumentIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  console.log('Library component is returning JSX');
  
  try {
    return (
      <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                File Library
              </h1>
              <p className="mt-3 text-lg text-primary-100">
                Access and manage all your Sign Company resources in one place
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200">
              <PlusIcon className="h-5 w-5 mr-2" />
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* File Type Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {fileTypeStats.map((stat) => (
          <div key={stat.type} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-sm text-gray-600">{stat.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
              Filter
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
                <ViewColumnsIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Folders Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FolderSolidIcon className="h-5 w-5 mr-2 text-primary-600" />
                Folders
              </h3>
            </div>
            <div className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <FolderIcon className="h-10 w-10 text-primary-600 group-hover:text-primary-700" />
                          <div className="ml-3">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-primary-600 line-clamp-2">
                              {folder.name}
                            </h4>
                            <p className="text-xs text-gray-500">{folder.items} items</p>
                          </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600" />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <span>{folder.size}</span>
                        <span>{folder.lastModified}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                    >
                      <div className="flex items-center flex-1">
                        <FolderIcon className="h-8 w-8 text-primary-600" />
                        <div className="ml-3 flex-1">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-primary-600 line-clamp-2">
                            {folder.name}
                          </h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500 mt-1">
                            <span>{folder.items} items</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{folder.size}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{folder.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Files Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-primary-600" />
                Recent Files
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                  >
                    <div className="flex items-center min-w-0">
                      {getFileIcon(file.type)}
                      <div className="ml-3 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate group-hover:text-primary-600">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.folder} • {file.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 ml-2">
                      <span className="text-xs text-gray-500 whitespace-nowrap">{file.modified}</span>
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all duration-200">
                        <ArrowDownTrayIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all recent files →
              </button>
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Used</span>
                  <span className="font-medium text-gray-900">24.2 GB of 50 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '48.4%' }}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                25.8 GB available • Upgrade for more storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error rendering Library component:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error rendering Library component. Check console for details.
      </div>
    );
  }
};

export default Library;