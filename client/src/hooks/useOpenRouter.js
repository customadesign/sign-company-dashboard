import { useState, useCallback } from 'react';
import axios from 'axios';

const useOpenRouter = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/search', {
        query,
        limit: 20
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setSearchResults(response.data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Failed to perform search');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSuggestions = useCallback(async (query) => {
    if (!query.trim()) return [];

    try {
      const response = await axios.get('/api/search/suggestions', {
        params: { query, limit: 5 },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      return response.data.suggestions || [];
    } catch (err) {
      console.error('Suggestions error:', err);
      return [];
    }
  }, []);

  const getRecentSearches = useCallback(async () => {
    try {
      const response = await axios.get('/api/search/recent', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      return response.data.searches || [];
    } catch (err) {
      console.error('Recent searches error:', err);
      return [];
    }
  }, []);

  return {
    searchResults,
    isLoading,
    error,
    performSearch,
    getSuggestions,
    getRecentSearches
  };
};

export default useOpenRouter;