import { useState, useEffect, useCallback } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  youtubeUrl: string;
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

interface UseVideosOptions {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
}

export const useVideos = (options: UseVideosOptions = {}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(options.page || 1);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
      if (options.category && options.category !== 'All Videos') {
        params.append('category', options.category.toLowerCase().replace(' ', '-'));
      }
      
      if (options.search) {
        params.append('search', options.search);
      }
      
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }
      
      if (currentPage) {
        params.append('page', currentPage.toString());
      }
      
      const queryString = params.toString();
      const url = `/api/videos${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch videos');
      }
      
      if (data.success && data.data) {
        // Transform API data to match our interface
        const transformedVideos = data.data.map((video: any, index: number) => ({
          id: video._id || index + 1,
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
          youtubeId: video.youtubeId,
          youtubeUrl: video.youtubeUrl,
          duration: video.duration || 'N/A',
          views: video.views || 0,
          uploadDate: video.publishedAt ? 
            new Date(video.publishedAt).toLocaleDateString() : 
            new Date(video.createdAt).toLocaleDateString(),
          category: transformCategory(video.category),
          instructor: video.presenter?.name || 'Sign Expert',
          level: determineLevel(video.tags),
          rating: 4.5 + Math.random() * 0.5, // Placeholder rating
          isBookmarked: false,
          isFeatured: video.isFeatured || false,
          isNew: isNewVideo(video.publishedAt || video.createdAt),
          tags: video.tags || []
        }));
        
        setVideos(transformedVideos);
        
        if (data.pagination) {
          setTotalPages(data.pagination.pages);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  }, [options.category, options.search, options.limit, currentPage]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const transformCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'training': 'Technical Training',
      'technical': 'Technical Training',
      'business': 'Business Growth',
      'marketing': 'Business Growth',
      'product-demo': 'Installation',
      'webinar': 'Business Growth',
      'other': 'Installation'
    };
    
    return categoryMap[category] || 'Installation';
  };

  const determineLevel = (tags: string[]): 'Beginner' | 'Intermediate' | 'Advanced' => {
    if (tags.some(tag => tag.toLowerCase().includes('beginner') || tag.toLowerCase().includes('basic'))) {
      return 'Beginner';
    }
    if (tags.some(tag => tag.toLowerCase().includes('advanced') || tag.toLowerCase().includes('expert'))) {
      return 'Advanced';
    }
    return 'Intermediate';
  };

  const isNewVideo = (date: string): boolean => {
    const videoDate = new Date(date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return videoDate > thirtyDaysAgo;
  };

  const toggleBookmark = (videoId: number | string) => {
    setVideos(videos.map(video =>
      video.id === videoId || video.id.toString() === videoId.toString()
        ? { ...video, isBookmarked: !video.isBookmarked }
        : video
    ));
  };

  const incrementViews = (videoId: number | string) => {
    setVideos(videos.map(video =>
      video.id === videoId || video.id.toString() === videoId.toString()
        ? { ...video, views: video.views + 1 }
        : video
    ));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    videos,
    loading,
    error,
    totalPages,
    currentPage,
    toggleBookmark,
    incrementViews,
    nextPage,
    previousPage,
    refetch: fetchVideos
  };
};

export default useVideos;