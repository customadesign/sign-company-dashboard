const searchService = require('../services/searchService');

class SearchController {
  async search(req, res) {
    try {
      const { query, limit = 20 } = req.body;
      const userId = req.user.id;

      if (!query || query.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Query must be at least 2 characters long'
        });
      }

      const results = await searchService.performAISearch(query, userId);

      res.json({
        success: true,
        results: results.slice(0, limit),
        query,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform search',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async advancedSearch(req, res) {
    try {
      const { 
        query, 
        dataTypes, 
        filters, 
        sortBy = 'relevance',
        limit = 20,
        page = 1
      } = req.body;
      
      const userId = req.user.id;

      const intent = {
        dataTypes: dataTypes || ['files', 'owners', 'events', 'forum', 'stories'],
        filters: filters || {},
        keywords: query.split(' ').filter(w => w.length > 2),
        sortBy
      };

      const results = await searchService.executeSearch(intent);
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = results.slice(startIndex, endIndex);

      res.json({
        success: true,
        results: paginatedResults,
        totalResults: results.length,
        page,
        totalPages: Math.ceil(results.length / limit),
        query,
        filters,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Advanced search error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform advanced search',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async getSuggestions(req, res) {
    try {
      const { query, limit = 5 } = req.query;

      if (!query || query.length < 2) {
        return res.json({
          success: true,
          suggestions: []
        });
      }

      const suggestions = await searchService.getSuggestions(query, parseInt(limit));

      res.json({
        success: true,
        suggestions
      });
    } catch (error) {
      console.error('Suggestions error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get suggestions',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async getRecentSearches(req, res) {
    try {
      const userId = req.user.id;
      const { limit = 10 } = req.query;

      const searches = await searchService.getRecentSearches(userId, parseInt(limit));

      res.json({
        success: true,
        searches
      });
    } catch (error) {
      console.error('Recent searches error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get recent searches',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async getPopularSearches(req, res) {
    try {
      const { limit = 10 } = req.query;

      const searches = await searchService.getPopularSearches(parseInt(limit));

      res.json({
        success: true,
        searches
      });
    } catch (error) {
      console.error('Popular searches error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get popular searches',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = new SearchController();