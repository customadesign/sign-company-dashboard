import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, FileText, User, Calendar, MessageSquare, TrendingUp, Mic, Command, Zap } from 'lucide-react';
import useOpenRouter from '../hooks/useOpenRouter';
import './AISearchBox.css';

const AISearchBox = ({ compact = false, onSearchFocus }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
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
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      inputRef.current?.focus();
      setIsOpen(true);
    }
  };

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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
    setIsOpen(false);
    setQuery('');
  };

  const handleVoiceSearch = () => {
    setIsVoiceActive(!isVoiceActive);
    // Voice search implementation would go here
    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  const quickActions = [
    { label: 'Search Files', icon: FileText, query: 'files:' },
    { label: 'Find People', icon: User, query: 'people:' },
    { label: 'Events', icon: Calendar, query: 'events:' },
    { label: 'Forum Posts', icon: MessageSquare, query: 'forum:' }
  ];

  const handleQuickAction = (action) => {
    setQuery(action.query);
    inputRef.current?.focus();
    setShowQuickActions(false);
    setIsOpen(true);
  };

  return (
    <div className={`ai-search-container ${compact ? 'compact' : ''}`} ref={searchRef}>
      <div className={`ai-search-box ${isFocused ? 'focused' : ''} ${compact ? 'compact' : ''}`}>
        <div className="search-icon-wrapper">
          <Search className="search-icon" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder={compact ? "Search with AI..." : "Ask anything... (e.g., 'Find marketing files from last month')"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            onSearchFocus?.();
            if (query || !query) {
              setIsOpen(true);
              setShowQuickActions(!query);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowQuickActions(false), 200);
          }}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        
        <div className="search-actions">
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
          
          <button
            className={`voice-button ${isVoiceActive ? 'active' : ''}`}
            onClick={handleVoiceSearch}
            title="Voice search"
          >
            <Mic size={16} />
            {isVoiceActive && <div className="voice-pulse" />}
          </button>
          
          {!compact && (
            <div className="keyboard-shortcut">
              <Command size={12} />
              <span>K</span>
            </div>
          )}
        </div>
        
        <button 
          className="ai-badge"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              setQuery('');
              setShowQuickActions(false);
              inputRef.current?.blur();
            } else {
              inputRef.current?.focus();
              setIsOpen(true);
              setShowQuickActions(!query);
            }
          }}
          title="Toggle AI Search"
        >
          <motion.div
            animate={{ rotate: isFocused ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} />
          </motion.div>
          <span>AI</span>
          <motion.div 
            className="ai-pulse"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (query || searchResults.length > 0 || showQuickActions) && (
          <motion.div
            className={`search-dropdown ${compact ? 'compact' : ''}`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Quick Actions - shown when input is empty */}
            {showQuickActions && !query && (
              <div className="quick-actions">
                <div className="quick-actions-header">
                  <Zap size={14} />
                  <span>Quick Actions</span>
                </div>
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      className="quick-action-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleQuickAction(action)}
                    >
                      <action.icon size={16} />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
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

            {(query || showQuickActions) && (
              <div className="search-footer">
                <div className="ai-hint">
                  <Sparkles size={12} />
                  <span>Powered by AI - Try natural language queries</span>
                </div>
                {!compact && (
                  <div className="search-tips">
                    <span className="tip">Try: "Show me files from John" or "Events next week"</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBox;