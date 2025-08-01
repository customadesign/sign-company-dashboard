# User Profile Components

This folder contains the user profile components for the Sign World dashboard, including Settings and Billing tabs with comprehensive functionality.

## Components Overview

### UserProfile (`/src/pages/UserProfile.tsx`)
Main profile page component that provides a tabbed interface for user settings and billing management.

**Features:**
- Clean, responsive design matching the existing dashboard aesthetic
- Tabbed navigation between Settings and Billing sections
- User information header with profile avatar and details
- Integrated with authentication context for user data

### UserSettings (`/src/components/profile/UserSettings.tsx`)
Comprehensive settings management component with multiple sections:

**Sections:**
1. **Personal Information**
   - Name, email, phone, company
   - Form validation with real-time error display
   - Edit mode with save/cancel functionality

2. **Account Preferences**
   - Notification settings (email, push, SMS, marketing)
   - Language selection
   - Timezone configuration

3. **Privacy Settings**
   - Profile visibility controls
   - Data sharing preferences
   - Analytics tracking options

4. **Security Settings**
   - Password management
   - Two-factor authentication toggle
   - Security status indicators

5. **Display & Theme**
   - Theme selection (light, dark, auto)
   - Visual theme previews

**Features:**
- Form validation using custom validation utilities
- Loading states and error handling
- Toast notifications for user feedback
- Responsive design for mobile and desktop

### UserBilling (`/src/components/profile/UserBilling.tsx`)
Complete billing and subscription management component:

**Sections:**
1. **Subscription Management**
   - Current plan display with features
   - Plan comparison and upgrade options
   - Billing cycle and next payment date
   - Subscription status indicators

2. **Payment Methods**
   - Credit card management
   - Default payment method selection
   - Add/remove payment methods
   - Card type recognition and formatting

3. **Billing History**
   - Invoice history table
   - Payment status indicators
   - Invoice download functionality
   - Sortable and filterable data

4. **Usage & Limits**
   - Resource usage visualization
   - Progress bars for quota tracking
   - Usage trend analytics
   - Near-limit warnings

## Utilities

### Validation (`/src/utils/validation.ts`)
Comprehensive form validation utilities:
- Email, phone, name validation
- Password strength validation
- Credit card validation with Luhn algorithm
- Form data validation helpers

### Toast Notifications (`/src/utils/toast.ts`)
User feedback system:
- Success, error, warning, info toasts
- Loading states with dismissal
- Consistent styling and positioning

## Integration

### Routing
The profile page is integrated into the main application routing:
```typescript
// In App.tsx
<Route path="profile" element={<UserProfile />} />
```

### Navigation
Added to both sidebar and header user dropdowns:
```typescript
// In Layout.tsx
<Link to="/profile">
  <UserIcon />
  Profile Settings
</Link>
```

### Authentication
Components are fully integrated with the existing AuthContext:
- User data access via `useAuth()` hook
- Automatic population of user information
- Role-based feature access

## Design System

### Colors
- Primary: Blue gradient (#1890ff to #0050b3)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Orange (#f59e0b)
- Info: Blue (#3b82f6)

### Typography
- Font family: Inter
- Consistent sizing and weights
- Proper contrast ratios for accessibility

### Spacing
- Tailwind CSS spacing system
- Consistent margins and padding
- Responsive breakpoints

### Icons
- Heroicons for consistent iconography
- 16px and 20px sizes for UI elements
- Proper semantic usage

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Features
- Stacked layouts on mobile
- Grid systems for larger screens
- Touch-friendly interactions
- Optimized form layouts

## Error Handling

### Validation
- Real-time form validation
- Field-level error display
- Form submission prevention on errors
- Clear error messaging

### API Integration
- Loading states during operations
- Error toast notifications
- Graceful failure handling
- Retry mechanisms

## Accessibility

### WCAG Compliance
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatibility

### Features
- Skip links for keyboard users
- Focus indicators
- Semantic HTML structure
- Alt text for images

## Future Enhancements

### Potential Features
1. Profile picture upload
2. Account deletion workflow
3. Data export functionality
4. Advanced security options (WebAuthn)
5. Subscription pause/resume
6. Team member management
7. Advanced notification preferences
8. Custom theme creation

### API Integration
The components are designed with API integration in mind:
- Async form submission handlers
- Loading states
- Error handling
- Data persistence patterns

## Usage Examples

### Basic Usage
```tsx
import UserProfile from '../pages/UserProfile';

// In your routing
<Route path="/profile" element={<UserProfile />} />
```

### Custom Validation
```tsx
import { validateUserSettings } from '../utils/validation';

const validation = validateUserSettings(formData);
if (!validation.isValid) {
  setErrors(validation.errors);
}
```

### Toast Notifications
```tsx
import { showSuccess, showError } from '../utils/toast';

// Success notification
showSuccess('Settings saved successfully!');

// Error notification
showError('Failed to save settings. Please try again.');
```

This implementation provides a comprehensive, professional user profile system that integrates seamlessly with the existing Sign World dashboard while maintaining high standards for UX, accessibility, and code quality.