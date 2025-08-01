# AI-Powered Search API Documentation

## Overview

The Sign Company Dashboard features an intelligent AI-powered search system that uses OpenRouter API with Claude 3.5 Sonnet to understand natural language queries and search across multiple data types.

## Base URL
```
/api/search
```

## Authentication

All search endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Natural Language Search

**POST** `/api/search`

Process natural language queries and search across multiple data types.

#### Request Body
```json
{
  "query": "Show me all marketing files from last month",
  "dataTypes": ["files", "owners", "events", "forum", "brags", "suppliers"], // optional
  "filters": { // optional override
    "sortBy": "newest"
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "files": [
      {
        "_id": "...",
        "title": "Marketing Strategy 2024",
        "description": "...",
        "category": "marketing",
        "createdAt": "2024-01-15T..."
      }
    ],
    "owners": [],
    "events": [],
    "forum": [],
    "brags": [],
    "suppliers": [],
    "totalResults": 15
  },
  "searchIntent": {
    "dataTypes": ["files"],
    "filters": {
      "dateRange": {
        "start": "2024-01-01",
        "end": "2024-01-31"
      },
      "categories": ["marketing"]
    },
    "keywords": ["marketing"],
    "sortBy": "newest"
  }
}
```

### 2. Advanced Search

**POST** `/api/search/advanced`

Perform structured searches with specific filters.

#### Request Body
```json
{
  "dataTypes": ["files", "owners"],
  "keywords": ["marketing", "vehicle"],
  "dateRange": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-12-31T23:59:59Z"
  },
  "location": {
    "state": "TX",
    "city": "Austin"
  },
  "categories": ["marketing", "training"],
  "specialties": ["vehicle wraps"],
  "tags": ["sales", "growth"],
  "sortBy": "popular",
  "page": 1,
  "limit": 20
}
```

### 3. Search Suggestions

**GET** `/api/search/suggestions?q=mark`

Get autocomplete suggestions based on partial query.

#### Response
```json
{
  "success": true,
  "data": ["marketing", "marketplace", "markings", "market analysis", "markup tools"]
}
```

### 4. Recent Searches

**GET** `/api/search/recent`

Get recent searches for the current user.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "query": "vehicle wrap tutorials",
      "timestamp": "2024-01-20T10:30:00Z",
      "resultsCount": 8
    }
  ]
}
```

### 5. Popular Searches

**GET** `/api/search/popular`

Get trending searches across all users.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "query": "marketing templates",
      "count": 145
    },
    {
      "query": "vehicle wrap pricing",
      "count": 89
    }
  ]
}
```

## Natural Language Query Examples

The AI understands various natural language patterns:

- **Date-based queries:**
  - "Show me files from last month"
  - "Events happening next week"
  - "Forum posts from Q1 2024"

- **Location-based queries:**
  - "Find owners in Texas"
  - "Events near Austin"
  - "Suppliers in Canada"

- **Category/Type queries:**
  - "Marketing materials and templates"
  - "Training videos about installation"
  - "Success stories about sales growth"

- **Combined queries:**
  - "Show me all vehicle wrap suppliers in Texas with special offers"
  - "Find forum discussions about pricing strategies from this year"

## Data Types

The search can query across these data types:
- `files` - Library files and documents
- `owners` - Company owner profiles
- `events` - Calendar events and meetings
- `forum` - Forum threads and discussions
- `brags` - Success stories and achievements
- `suppliers` - Partner/supplier listings

## Sorting Options

- `newest` - Most recent first
- `oldest` - Oldest first
- `popular` - Most viewed/downloaded
- `relevance` - AI-determined relevance (default)

## Rate Limiting

- Main search: 30 requests per minute
- Suggestions: 100 requests per minute
- Limits are per authenticated user

## Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "field": "query",
      "message": "Query must be between 2 and 500 characters"
    }
  ]
}
```

## Performance Considerations

1. Results are cached for 15 minutes
2. Text indexes on all searchable fields
3. Pagination recommended for large result sets
4. Redis caching for optimal performance

## Security

1. All searches require authentication
2. Rate limiting prevents abuse
3. OpenRouter API key stored securely in environment variables
4. Input validation and sanitization
5. Results filtered based on user permissions