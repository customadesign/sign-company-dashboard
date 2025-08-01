const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { protect } = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

// All search routes require authentication
router.use(protect);

// Main AI-powered search
router.post('/', rateLimiter.searchLimiter, searchController.search);

// Advanced search with filters
router.post('/advanced', rateLimiter.searchLimiter, searchController.advancedSearch);

// Get search suggestions
router.get('/suggestions', rateLimiter.suggestionsLimiter, searchController.getSuggestions);

// Get user's recent searches
router.get('/recent', searchController.getRecentSearches);

// Get popular searches
router.get('/popular', searchController.getPopularSearches);

module.exports = router;