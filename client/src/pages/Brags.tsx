import { useState } from 'react';
import {
  TrophyIcon,
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  FireIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface SuccessStory {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  location: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  metrics: {
    revenue?: string;
    growth?: string;
    timeframe?: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  image: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    title: "From Zero to $1M: How We Built Our Sign Empire",
    author: "Sarah Johnson",
    authorAvatar: "SJ",
    location: "Phoenix, AZ",
    date: "2 days ago",
    readTime: "5 min read",
    category: "Growth Story",
    excerpt: "Starting with just one vinyl cutter in my garage, I built a thriving sign business that now serves over 500 clients across Arizona.",
    content: "Full story content here...",
    metrics: {
      revenue: "$1.2M",
      growth: "+340%",
      timeframe: "24 months"
    },
    likes: 234,
    comments: 45,
    isLiked: false,
    tags: ["growth", "startup", "inspiration"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
  },
  {
    id: 2,
    title: "Landing the City's Biggest Contract: A Step-by-Step Guide",
    author: "Michael Chen",
    authorAvatar: "MC",
    location: "Seattle, WA",
    date: "1 week ago",
    readTime: "8 min read",
    category: "Big Wins",
    excerpt: "How strategic networking and quality work helped us secure a $500K contract with the city for all municipal signage.",
    content: "Full story content here...",
    metrics: {
      revenue: "$500K",
      timeframe: "Single Contract"
    },
    likes: 189,
    comments: 32,
    isLiked: true,
    tags: ["contracts", "networking", "municipal"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
  },
  {
    id: 3,
    title: "Innovation in Action: Our Award-Winning LED Display",
    author: "Emily Rodriguez",
    authorAvatar: "ER",
    location: "Miami, FL",
    date: "2 weeks ago",
    readTime: "6 min read",
    category: "Innovation",
    excerpt: "We developed a revolutionary weatherproof LED display system that won the Sign Company Innovation Award and transformed our business.",
    content: "Full story content here...",
    metrics: {
      growth: "+85%",
      timeframe: "6 months"
    },
    likes: 312,
    comments: 56,
    isLiked: false,
    tags: ["innovation", "technology", "awards"],
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80"
  }
];

const categories = [
  { name: 'All Stories', count: 156 },
  { name: 'Growth Story', count: 45 },
  { name: 'Big Wins', count: 32 },
  { name: 'Innovation', count: 28 },
  { name: 'Community Impact', count: 21 },
  { name: 'Team Building', count: 18 },
  { name: 'Challenges Overcome', count: 12 }
];

const Brags = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [stories, setStories] = useState(successStories);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (storyId: number) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, isLiked: !story.isLiked, likes: story.isLiked ? story.likes - 1 : story.likes + 1 }
        : story
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <TrophyIcon className="h-8 w-8 mr-3" />
                Success Stories
              </h1>
              <p className="mt-3 text-lg text-primary-100">
                Celebrating achievements and milestones from our Sign Company community
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200">
              <PlusIcon className="h-5 w-5 mr-2" />
              Share Your Story
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <FireIcon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600">Success Stories</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <ChartBarIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">$45M</p>
          <p className="text-sm text-gray-600">Revenue Generated</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <SparklesIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-600">Awards Won</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <StarIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">4.9</p>
          <p className="text-sm text-gray-600">Avg. Rating</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search success stories..."
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
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
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
                  <span>{category.name}</span>
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

        {/* Stories Grid */}
        <div className="lg:col-span-3 space-y-6">
          {stories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-48 sm:h-auto">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                        {story.authorAvatar}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{story.author}</p>
                        <p className="text-xs text-gray-500">{story.location} • {story.date}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                      {story.category}
                    </span>
                  </div>

                  {/* Story Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{story.excerpt}</p>

                  {/* Metrics */}
                  {story.metrics && (
                    <div className="flex flex-wrap gap-4 mb-4">
                      {story.metrics.revenue && (
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <ChartBarIcon className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="ml-2">
                            <p className="text-xs text-gray-500">Revenue</p>
                            <p className="text-sm font-bold text-gray-900">{story.metrics.revenue}</p>
                          </div>
                        </div>
                      )}
                      {story.metrics.growth && (
                        <div className="flex items-center">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <SparklesIcon className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="ml-2">
                            <p className="text-xs text-gray-500">Growth</p>
                            <p className="text-sm font-bold text-gray-900">{story.metrics.growth}</p>
                          </div>
                        </div>
                      )}
                      {story.metrics.timeframe && (
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <ClockIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-2">
                            <p className="text-xs text-gray-500">Timeframe</p>
                            <p className="text-sm font-bold text-gray-900">{story.metrics.timeframe}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(story.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        {story.isLiked ? (
                          <HeartSolidIcon className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                        <span className="text-sm">{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        <span className="text-sm">{story.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <ShareIcon className="h-5 w-5" />
                      </button>
                      <span className="text-sm text-gray-500">{story.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Load More */}
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Load More Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brags;