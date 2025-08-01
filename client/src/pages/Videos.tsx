import { useState } from 'react';
import {
  VideoCameraIcon,
  PlayIcon,
  ClockIcon,
  EyeIcon,
  AcademicCapIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  BookmarkIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon, PlayIcon as PlaySolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  category: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  isBookmarked: boolean;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
}

const videos: Video[] = [
  {
    id: 1,
    title: "Getting Started with Vehicle Wraps - Complete Guide",
    description: "Learn the fundamentals of vehicle wrapping, from material selection to installation techniques. Perfect for beginners looking to expand their service offerings.",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    duration: "45:30",
    views: 12543,
    uploadDate: "2 days ago",
    category: "Vehicle Wraps",
    instructor: "Mike Johnson",
    level: "Beginner",
    rating: 4.9,
    isBookmarked: false,
    isFeatured: true,
    isNew: true,
    tags: ["vehicle wraps", "installation", "basics"]
  },
  {
    id: 2,
    title: "Advanced LED Sign Programming & Troubleshooting",
    description: "Master the art of programming and maintaining LED signs. Covers advanced features, common issues, and professional troubleshooting techniques.",
    thumbnail: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80",
    duration: "1:02:45",
    views: 8921,
    uploadDate: "1 week ago",
    category: "Technical Training",
    instructor: "Sarah Chen",
    level: "Advanced",
    rating: 4.8,
    isBookmarked: true,
    isFeatured: false,
    isNew: false,
    tags: ["LED", "programming", "troubleshooting"]
  },
  {
    id: 3,
    title: "Marketing Your Sign Business: Social Media Strategies",
    description: "Discover proven social media marketing strategies specifically tailored for sign businesses. Increase your online presence and attract more customers.",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    duration: "32:15",
    views: 6789,
    uploadDate: "3 weeks ago",
    category: "Business Growth",
    instructor: "Lisa Thompson",
    level: "Intermediate",
    rating: 4.7,
    isBookmarked: false,
    isFeatured: true,
    isNew: false,
    tags: ["marketing", "social media", "business growth"]
  },
  {
    id: 4,
    title: "Monument Sign Installation: Step-by-Step Process",
    description: "Complete walkthrough of monument sign installation, including site preparation, foundation work, and finishing touches.",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    duration: "38:20",
    views: 4532,
    uploadDate: "1 month ago",
    category: "Installation",
    instructor: "David Martinez",
    level: "Intermediate",
    rating: 4.9,
    isBookmarked: false,
    isFeatured: false,
    isNew: false,
    tags: ["monument signs", "installation", "construction"]
  }
];

const categories = [
  { name: "All Videos", icon: VideoCameraIcon, count: 156 },
  { name: "Vehicle Wraps", icon: ArrowTrendingUpIcon, count: 34 },
  { name: "Technical Training", icon: WrenchScrewdriverIcon, count: 45 },
  { name: "Business Growth", icon: LightBulbIcon, count: 28 },
  { name: "Installation", icon: SparklesIcon, count: 23 },
  { name: "Design Tips", icon: AcademicCapIcon, count: 26 }
];

const playlists = [
  { name: "New Owner Essentials", videos: 12, duration: "4h 30m" },
  { name: "Advanced Techniques", videos: 8, duration: "3h 15m" },
  { name: "Marketing Mastery", videos: 6, duration: "2h 45m" },
  { name: "Equipment Maintenance", videos: 10, duration: "3h 50m" }
];

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoList, setVideoList] = useState(videos);

  const toggleBookmark = (videoId: number) => {
    setVideoList(videoList.map(video =>
      video.id === videoId
        ? { ...video, isBookmarked: !video.isBookmarked }
        : video
    ));
  };

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const filteredVideos = videoList.filter(video => {
    if (selectedCategory !== 'All Videos' && video.category !== selectedCategory) return false;
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !video.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <VideoCameraIcon className="h-8 w-8 mr-3" />
                Video Learning Center
              </h1>
              <p className="mt-3 text-lg text-primary-100">
                Expert tutorials and training videos to grow your business
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200">
              <PlayCircleIcon className="h-5 w-5 mr-2" />
              Watch Intro
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <VideoCameraIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600">Total Videos</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">48h</p>
          <p className="text-sm text-gray-600">Total Content</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <EyeIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">234K</p>
          <p className="text-sm text-gray-600">Total Views</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <StarIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">4.8</p>
          <p className="text-sm text-gray-600">Avg. Rating</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos by title, topic, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
            Filter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between transition-all duration-200 ${
                      selectedCategory === category.name
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <category.icon className={`h-5 w-5 mr-3 ${
                        selectedCategory === category.name ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <span>{category.name}</span>
                    </div>
                    <span className={`text-sm ${
                      selectedCategory === category.name ? 'text-primary-600' : 'text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Playlists */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Playlists</h3>
            <div className="space-y-3">
              {playlists.map((playlist) => (
                <button
                  key={playlist.name}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                        {playlist.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {playlist.videos} videos • {playlist.duration}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-primary-600 flex-shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="lg:col-span-3">
          {/* Featured Video */}
          {!searchQuery && selectedCategory === 'All Videos' && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Video</h3>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative group cursor-pointer">
                  <img
                    src={videos[0].thumbnail}
                    alt={videos[0].title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <PlaySolidIcon className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                      ⭐ Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-black bg-opacity-75 text-white text-sm">
                      {videos[0].duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{videos[0].title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{videos[0].description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                      <span>{videos[0].instructor}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{videos[0].views.toLocaleString()} views</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{videos[0].uploadDate}</span>
                    </div>
                    <button 
                      onClick={() => openVideo(videos[0])}
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 relative group">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <PlaySolidIcon className="h-12 w-12 text-white" />
                  </div>
                  {video.isNew && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                        New
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-black bg-opacity-75 text-white text-xs">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 flex-1">
                      {video.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(video.id);
                      }}
                      className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {video.isBookmarked ? (
                        <BookmarkSolidIcon className="h-5 w-5 text-primary-600" />
                      ) : (
                        <BookmarkIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      video.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {video.level}
                    </span>
                    <span className="text-xs text-gray-500">{video.category}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                      <span>{video.instructor}</span>
                      <div className="flex items-center">
                        <StarSolidIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{video.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                      <span className="whitespace-nowrap">{video.views.toLocaleString()} views</span>
                      <span className="whitespace-nowrap">{video.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Load More Videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;