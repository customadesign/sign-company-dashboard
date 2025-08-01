import { useState, useCallback } from 'react';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const useOpenRouter = (apiKey) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const searchWithAI = useCallback(async (query, context = {}) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Prepare the AI prompt with context
      const systemPrompt = `You are an AI assistant for a sign company management dashboard. 
        Analyze the user's search query and provide relevant results categorized as:
        - queries: Suggested search queries or filters
        - files: Relevant sign files or documents
        - owners: Related clients or owners
        - insights: AI-generated insights or recommendations
        
        Context:
        - Current module: ${context.module || 'dashboard'}
        - User role: ${context.userRole || 'manager'}
        - Recent activity: ${JSON.stringify(context.recentActivity || [])}
        
        Respond in JSON format with these categories.`;

      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Sign Company Dashboard',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Search query: "${query}"`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Parse AI response
      try {
        const parsedResults = JSON.parse(aiResponse);
        return processAIResponse(parsedResults, query);
      } catch (parseError) {
        // Fallback to text-based parsing if JSON fails
        return processTextResponse(aiResponse, query);
      }
    } catch (err) {
      console.error('OpenRouter search error:', err);
      setError(err.message);
      return getFallbackResults(query);
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey]);

  const processAIResponse = (aiResponse, originalQuery) => {
    // Enhance AI response with additional metadata
    const results = {
      queries: (aiResponse.queries || []).map((q, idx) => ({
        id: `q${idx}`,
        ...q,
        relevanceScore: calculateRelevance(q.title, originalQuery)
      })),
      files: (aiResponse.files || []).map((f, idx) => ({
        id: `f${idx}`,
        ...f,
        type: f.type || 'sign'
      })),
      owners: (aiResponse.owners || []).map((o, idx) => ({
        id: `o${idx}`,
        ...o
      })),
      insights: (aiResponse.insights || []).map((i, idx) => ({
        id: `i${idx}`,
        ...i,
        priority: i.priority || 'medium'
      }))
    };

    // Sort by relevance
    Object.keys(results).forEach(key => {
      if (results[key].length > 0 && results[key][0].relevanceScore !== undefined) {
        results[key].sort((a, b) => b.relevanceScore - a.relevanceScore);
      }
    });

    return results;
  };

  const processTextResponse = (textResponse, query) => {
    // Basic text parsing fallback
    const results = {
      queries: [],
      files: [],
      owners: [],
      insights: []
    };

    // Extract potential queries
    const queryMatches = textResponse.match(/(?:search for|find|show|display)\s+([^.]+)/gi);
    if (queryMatches) {
      results.queries = queryMatches.slice(0, 3).map((match, idx) => ({
        id: `q${idx}`,
        title: match.replace(/^(search for|find|show|display)\s+/i, ''),
        description: 'AI suggested search'
      }));
    }

    return results;
  };

  const calculateRelevance = (text, query) => {
    // Simple relevance scoring
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/);
    
    let score = 0;
    queryWords.forEach(word => {
      if (textLower.includes(word)) {
        score += 1;
      }
    });
    
    // Exact match bonus
    if (textLower.includes(queryLower)) {
      score += 5;
    }
    
    return score;
  };

  const getFallbackResults = (query) => {
    // Fallback results when AI is unavailable
    const lowerQuery = query.toLowerCase();
    const results = {
      queries: [],
      files: [],
      insights: []
    };

    // Basic keyword matching
    if (lowerQuery.includes('pending')) {
      results.queries.push({
        id: 'fb1',
        title: 'View all pending signs',
        description: 'Filter by status: pending'
      });
    }

    if (lowerQuery.includes('revenue') || lowerQuery.includes('sales')) {
      results.queries.push({
        id: 'fb2',
        title: 'Revenue dashboard',
        description: 'View financial metrics'
      });
    }

    if (lowerQuery.includes('client') || lowerQuery.includes('owner')) {
      results.queries.push({
        id: 'fb3',
        title: 'Client directory',
        description: 'Browse all clients'
      });
    }

    return results;
  };

  // Natural language command processing
  const processCommand = useCallback(async (command) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Sign Company Dashboard',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Convert natural language commands into structured actions for a sign company dashboard.
                Return JSON with: { action: string, parameters: object }`
            },
            {
              role: 'user',
              content: command
            }
          ],
          temperature: 0.3,
          max_tokens: 200
        })
      });

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      
      return {
        success: true,
        ...result
      };
    } catch (err) {
      console.error('Command processing error:', err);
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey]);

  // Generate contextual suggestions
  const getSuggestions = useCallback(async (context) => {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Sign Company Dashboard',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Generate relevant search suggestions for a sign company dashboard based on context.'
            },
            {
              role: 'user',
              content: `Context: ${JSON.stringify(context)}. Suggest 5 relevant searches.`
            }
          ],
          temperature: 0.8,
          max_tokens: 200
        })
      });

      const data = await response.json();
      return {
        success: true,
        suggestions: parseSuggestions(data.choices[0].message.content)
      };
    } catch (err) {
      return {
        success: false,
        suggestions: getDefaultSuggestions(context)
      };
    }
  }, [apiKey]);

  const parseSuggestions = (text) => {
    // Parse suggestions from AI response
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 5).map((line, idx) => ({
      id: `sug${idx}`,
      text: line.replace(/^\d+\.\s*/, '').trim()
    }));
  };

  const getDefaultSuggestions = (context) => {
    const suggestions = [
      'Show pending approvals',
      'Revenue this month',
      'Recent installations',
      'Overdue invoices',
      'Client activity report'
    ];

    // Customize based on context
    if (context.module === 'files') {
      suggestions.unshift('Recently modified signs');
    } else if (context.module === 'owners') {
      suggestions.unshift('New clients this month');
    }

    return suggestions.slice(0, 5).map((text, idx) => ({
      id: `def${idx}`,
      text
    }));
  };

  return {
    searchWithAI,
    processCommand,
    getSuggestions,
    isProcessing,
    error
  };
};