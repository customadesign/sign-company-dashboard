# AI-Powered Search Box Design Guide

## Overview
This document outlines the design and implementation of an intelligent AI-powered search box for the Sign Company Dashboard. The search leverages OpenRouter API to provide natural language understanding and contextual results.

## Design Philosophy

### Core Principles
1. **Intelligence First**: Visual cues that immediately communicate AI capabilities
2. **Contextual Awareness**: Results adapt based on user's current module and activity
3. **Progressive Disclosure**: Show relevant information without overwhelming
4. **Delightful Interactions**: Smooth animations that provide feedback and enhance UX

## Visual Design

### Color Palette
- **Primary Gradient**: `#667eea` to `#764ba2` (AI indicator)
- **Interactive Blue**: `#667eea` (focus states)
- **Background**: `#ffffff` (light) / `#1a202c` (dark)
- **Border Default**: `#e2e8f0`
- **Text Primary**: `#2d3748`
- **Text Secondary**: `#718096`

### Typography
- **Search Input**: 0.95rem, system font stack
- **Category Headers**: 0.75rem, uppercase, 600 weight
- **Result Titles**: Default size, 500 weight
- **Descriptions**: 0.85rem, secondary color

### Spacing System
- **Border Radius**: 12px (modern, friendly)
- **Padding**: 0.875rem standard, 1rem comfortable
- **Gap**: 0.875rem between elements
- **Dropdown Offset**: 8px from search box

## Component Architecture

### AISearchBox Component
```jsx
<AISearchBox
  onSearch={handleSearch}
  onResultSelect={handleResultSelect}
  apiKey={OPENROUTER_API_KEY}
  context={{
    module: 'dashboard',
    userRole: 'manager',
    recentActivity: [...]
  }}
/>
```

### State Management
- `query`: Current search input
- `isActive`: Focus/interaction state
- `isLoading`: AI processing state
- `suggestions`: Categorized search results
- `selectedIndex`: Keyboard navigation index

## AI Integration

### Search Flow
1. User types query (debounced 300ms)
2. Send to OpenRouter with context
3. AI categorizes and prioritizes results
4. Display with visual hierarchy

### Result Categories
- **Suggested Searches**: AI-generated query refinements
- **Files**: Relevant sign documents
- **Owners**: Related clients
- **Insights**: AI-discovered patterns or alerts

### Context Enhancement
```javascript
const context = {
  module: getCurrentModule(),
  userRole: getUserRole(),
  recentActivity: getRecentActivity(),
  timeOfDay: new Date().getHours(),
  searchHistory: getRecentSearches()
};
```

## Micro-interactions

### AI Icon Animation
- **Shimmer Effect**: Continuous 3s loop indicating AI presence
- **Pulse on Active**: Scale animation when processing
- **Gradient Shift**: Hover state enhancement

### Search Box States
1. **Default**: Clean border, subtle shadow
2. **Focus**: Blue border, expanded shadow, AI pulse
3. **Loading**: Animated dots on right
4. **Error**: Red border, error message

### Dropdown Animations
- **Entry**: Fade in + slide down (200ms)
- **Exit**: Fade out + slide up
- **Item Stagger**: 50ms delay per item
- **Hover**: Left border accent slide

## Responsive Behavior

### Desktop (>768px)
- Fixed 600px max width
- Dropdown below search
- Full keyboard navigation
- Hover states enabled

### Mobile (<768px)
- Full width search
- Bottom sheet dropdown
- Touch-optimized targets (44px)
- Swipe to dismiss
- Simplified animations

## Accessibility

### ARIA Attributes
```jsx
aria-label="AI-powered search"
aria-expanded={isActive}
aria-controls="search-suggestions"
role="combobox"
aria-autocomplete="list"
```

### Keyboard Navigation
- `Tab`: Focus search box
- `↑↓`: Navigate suggestions
- `Enter`: Select result
- `Esc`: Close dropdown
- `Cmd+K`: Global search shortcut

### Screen Reader Support
- Announce result counts
- Describe AI insights
- Category headers as landmarks
- Loading state announcements

## Performance Optimizations

### Debouncing
```javascript
const debouncedSearch = useDebounce(query, 300);
```

### Memoization
```javascript
const categorizedResults = useMemo(() => 
  categorizeResults(searchResults), 
  [searchResults]
);
```

### Lazy Loading
- Load Framer Motion animations conditionally
- Virtualize long result lists
- Progressive image loading for file previews

## Error Handling

### Graceful Degradation
1. OpenRouter API fails → Use local search
2. Network timeout → Show cached results
3. Invalid response → Display error state
4. Rate limited → Queue requests

### User Feedback
- Clear error messages
- Retry mechanisms
- Fallback suggestions
- Offline indicators

## Integration Guide

### Installation
```bash
npm install framer-motion
```

### Header Integration
```jsx
import AISearchBox from './components/AISearchBox';

const Header = () => (
  <header className="dashboard-header">
    <Logo />
    <AISearchBox 
      onSearch={handleGlobalSearch}
      onResultSelect={navigateToResult}
    />
    <UserMenu />
  </header>
);
```

### API Configuration
```javascript
// .env
REACT_APP_OPENROUTER_API_KEY=your_key_here

// config.js
export const AI_CONFIG = {
  apiKey: process.env.REACT_APP_OPENROUTER_API_KEY,
  model: 'openai/gpt-3.5-turbo',
  maxTokens: 500,
  temperature: 0.7
};
```

## Future Enhancements

### Phase 2
- Voice search integration
- Search history persistence
- Advanced filters UI
- Batch operations from search

### Phase 3
- Predictive search
- Custom AI training on company data
- Multi-language support
- Search analytics dashboard

## Testing Checklist

### Functionality
- [ ] Search debouncing works correctly
- [ ] AI results are relevant
- [ ] Keyboard navigation functions
- [ ] Mobile gestures work
- [ ] Error states display properly

### Performance
- [ ] Initial render < 100ms
- [ ] Search response < 500ms
- [ ] Smooth 60fps animations
- [ ] Memory usage stable

### Accessibility
- [ ] Screen reader compatible
- [ ] Keyboard fully navigable
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

## Metrics to Track

1. **Search Usage**: Queries per day
2. **Result Relevance**: Click-through rate
3. **AI Accuracy**: Successful task completions
4. **Performance**: Average response time
5. **User Satisfaction**: Search abandonment rate