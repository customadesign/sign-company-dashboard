import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AISearchBox.css';

const AISearchBox = ({ onSearch, onResultSelect }) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceTimer = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.length > 2) {
      debounceTimer.current = setTimeout(() => {
        performAISearch(query);
      }, 300);
    } else if (query.length === 0) {
      setSuggestions(getDefaultSuggestions());
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const performAISearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      // Simulate AI search - replace with actual OpenRouter API call
      const results = await mockAISearch(searchQuery);
      setSuggestions(results);
    } catch (error) {
      console.error('AI search error:', error);
      setSuggestions({
        error: 'Unable to process your search. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mockAISearch = async (searchQuery) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock AI-powered search results
    const lowerQuery = searchQuery.toLowerCase();
    const results = {
      queries: [],
      files: [],
      owners: [],
      insights: []
    };

    // Smart query suggestions based on input
    if (lowerQuery.includes('pending')) {
      results.queries.push({
        id: 'q1',
        title: 'Signs pending approval',
        description: '12 signs awaiting manager review',
        action: 'filter:status=pending'
      });
      results.insights.push({
        id: 'i1',
        title: '3 signs have been pending for over 7 days',
        description: 'Click to view and take action',
        priority: 'high'
      });
    }

    if (lowerQuery.includes('revenue')) {
      results.queries.push({
        id: 'q2',
        title: 'Revenue trends last 30 days',
        description: 'Total: $45,320 (+12% from previous period)',
        action: 'view:revenue-dashboard'
      });
      results.insights.push({
        id: 'i2',
        title: 'Best performing sign type: LED Displays',
        description: 'Contributed 45% of total revenue',
        priority: 'medium'
      });
    }

    // Add some mock files
    results.files.push({
      id: 'f1',
      title: 'Downtown Plaza Sign - Pending',
      meta: 'Last modified 2 hours ago',
      type: 'sign'
    });

    return results;
  };

  const getDefaultSuggestions = () => {
    return {
      queries: [
        {
          id: 'dq1',
          title: 'Show all pending approvals',
          description: 'View signs awaiting review'
        },
        {
          id: 'dq2',
          title: 'Revenue this month',
          description: 'Financial performance overview'
        },
        {
          id: 'dq3',
          title: 'Recent installations',
          description: 'Completed sign installations'
        }
      ],
      recentSearches: [
        'LED signs in progress',
        'Client: ABC Corporation',
        'Overdue invoices'
      ]
    };
  };

  const handleKeyDown = (e) => {
    if (!suggestions) return;

    const allItems = [
      ...(suggestions.queries || []),
      ...(suggestions.files || []),
      ...(suggestions.owners || []),
      ...(suggestions.insights || [])
    ];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : allItems.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < allItems.length) {
          handleResultClick(allItems[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsActive(false);
        searchRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result) => {
    setQuery(result.title);
    setIsActive(false);
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query);
      setIsActive(false);
    }
  };

  const renderSuggestionItem = (item, index, type) => {
    const isSelected = selectedIndex === index;
    const icons = {
      file: '📄',
      owner: '👤',
      event: '📅',
      insight: '💡',
      query: '🔍'
    };

    return (
      <motion.div
        key={item.id}
        className={`suggestion-item ${isSelected ? 'selected' : ''}`}
        onClick={() => handleResultClick(item)}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div className={`suggestion-icon icon-${type}`}>
          {icons[type] || '📌'}
        </div>
        <div className="suggestion-content">
          <div className="suggestion-title">{item.title}</div>
          {item.description && (
            <div className="suggestion-description">{item.description}</div>
          )}
          {item.meta && (
            <div className="suggestion-meta">{item.meta}</div>
          )}
        </div>
        {item.priority === 'high' && (
          <div className="priority-badge">Important</div>
        )}
      </motion.div>
    );
  };

  let itemIndex = 0;

  return (
    <div className="ai-search-container" ref={searchRef}>
      <div className="search-icon-wrapper">
        <motion.div 
          className="ai-icon"
          animate={{ 
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            duration: 2, 
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <span className="ai-text">AI</span>
          <div className="ai-shimmer"></div>
        </motion.div>
      </div>
      
      <input
        type="text"
        className={`ai-search-box ${isActive ? 'active' : ''}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setIsActive(true);
          if (!suggestions) {
            setSuggestions(getDefaultSuggestions());
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask AI anything: 'Show signs pending approval' or 'Revenue last month'..."
        aria-label="AI-powered search"
        aria-expanded={isActive}
        aria-controls="search-suggestions"
      />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="loading-indicator active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isActive && suggestions && !suggestions.error && (
          <motion.div 
            ref={dropdownRef}
            id="search-suggestions"
            className="suggestions-dropdown active"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.queries?.length > 0 && (
              <>
                <div className="suggestion-category">Suggested Searches</div>
                {suggestions.queries.map((item) => 
                  renderSuggestionItem(item, itemIndex++, 'query')
                )}
              </>
            )}
            
            {suggestions.files?.length > 0 && (
              <>
                <div className="suggestion-category">Recent Files</div>
                {suggestions.files.map((item) => 
                  renderSuggestionItem(item, itemIndex++, 'file')
                )}
              </>
            )}
            
            {suggestions.insights?.length > 0 && (
              <>
                <div className="suggestion-category">AI Insights</div>
                {suggestions.insights.map((item) => 
                  renderSuggestionItem(item, itemIndex++, 'insight')
                )}
              </>
            )}
            
            {suggestions.recentSearches?.length > 0 && (
              <>
                <div className="suggestion-category">Recent Searches</div>
                {suggestions.recentSearches.map((search, idx) => (
                  <motion.div
                    key={`recent-${idx}`}
                    className="suggestion-item recent-search"
                    onClick={() => setQuery(search)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (itemIndex + idx) * 0.05 }}
                  >
                    <div className="suggestion-icon icon-recent">🕐</div>
                    <div className="suggestion-content">
                      <div className="suggestion-title">{search}</div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
            
            <div className="search-footer">
              <span className="search-hint">
                Press <kbd>Enter</kbd> to search • <kbd>↑↓</kbd> to navigate • <kbd>Esc</kbd> to close
              </span>
            </div>
          </motion.div>
        )}
        
        {isActive && suggestions?.error && (
          <motion.div 
            className="suggestions-dropdown error active"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="error-message">
              {suggestions.error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBox;