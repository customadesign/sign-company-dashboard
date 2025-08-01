import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, FileText, User, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import useOpenRouter from '../hooks/useOpenRouter';
import './AISearchBox.css';

const AISearchBox = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  const { searchResults, isLoading, error, performSearch, getSuggestions } = useOpenRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, performSearch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const getCategoryIcon = (type) => {
    const icons = {
      files: FileText,
      owners: User,
      events: Calendar,
      forum: MessageSquare,
      insights: TrendingUp
    };
    return icons[type] || FileText;
  };

  const handleResultClick = (result) => {
    // Navigate to the result
    window.location.href = result.link;
  };

  return (
    <div className="ai-search-container" ref={searchRef}>
      <div className={`ai-search-box ${isFocused ? 'focused' : ''}`}>
        <Search className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask anything... (e.g., 'Find marketing files from last month')"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        {query && (
          <button
            className="clear-button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        )}
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (query || searchResults.length > 0) && (
          <motion.div
            className="search-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading && (
              <div className="loading-state">
                <div className="loading-spinner" />
                <span>AI is thinking...</span>
              </div>
            )}

            {error && (
              <div className="error-state">
                <span>Something went wrong. Try again?</span>
              </div>
            )}

            {!isLoading && !error && searchResults.length === 0 && query && (
              <div className="empty-state">
                <span>No results found for "{query}"</span>
              </div>
            )}

            {!isLoading && searchResults.length > 0 && (
              <div className="search-results">
                {Object.entries(
                  searchResults.reduce((acc, result) => {
                    if (!acc[result.category]) acc[result.category] = [];
                    acc[result.category].push(result);
                    return acc;
                  }, {})
                ).map(([category, items]) => (
                  <div key={category} className="result-category">
                    <h4 className="category-title">
                      {React.createElement(getCategoryIcon(category), { size: 16 })}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h4>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="result-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleResultClick(item)}
                      >
                        <div className="result-content">
                          <h5>{item.title}</h5>
                          <p>{item.description}</p>
                          {item.metadata && (
                            <div className="result-metadata">
                              {item.metadata.date && <span>{item.metadata.date}</span>}
                              {item.metadata.author && <span>by {item.metadata.author}</span>}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {query && (
              <div className="search-footer">
                <span className="ai-hint">
                  <Sparkles size={12} />
                  Powered by AI - Try natural language queries
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBox;