const rateLimit = require('express-rate-limit');

// General search rate limiter
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: 'Too many search requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// More lenient limiter for suggestions
const suggestionsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many suggestion requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  searchLimiter,
  suggestionsLimiter
};