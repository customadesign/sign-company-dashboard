// Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (US format)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

// Name validation
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

// Company name validation
export const validateCompanyName = (company: string): boolean => {
  return company.trim().length >= 2 && company.trim().length <= 100;
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' });
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' });
  }
  
  if (!/\d/.test(password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one number' });
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one special character' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// User settings validation
export const validateUserSettings = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];
  
  // Validate name
  if (!validateName(formData.name)) {
    errors.push({ 
      field: 'name', 
      message: 'Name must be between 2 and 50 characters' 
    });
  }
  
  // Validate email
  if (!validateEmail(formData.email)) {
    errors.push({ 
      field: 'email', 
      message: 'Please enter a valid email address' 
    });
  }
  
  // Validate phone (if provided)
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.push({ 
      field: 'phone', 
      message: 'Please enter a valid phone number' 
    });
  }
  
  // Validate company (if provided)
  if (formData.company && !validateCompanyName(formData.company)) {
    errors.push({ 
      field: 'company', 
      message: 'Company name must be between 2 and 100 characters' 
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Credit card validation
export const validateCreditCard = (cardNumber: string): boolean => {
  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  
  // Check if all digits
  if (!/^\d+$/.test(cleanNumber)) {
    return false;
  }
  
  // Check length (13-19 digits for most cards)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// CVV validation
export const validateCVV = (cvv: string, cardType?: string): boolean => {
  // American Express has 4-digit CVV, others have 3
  const expectedLength = cardType === 'amex' ? 4 : 3;
  return /^\d+$/.test(cvv) && cvv.length === expectedLength;
};

// Expiry date validation
export const validateExpiryDate = (month: number, year: number): boolean => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
  const currentYear = now.getFullYear();
  
  // Basic range checks
  if (month < 1 || month > 12 || year < currentYear) {
    return false;
  }
  
  // If it's the current year, month must be current or future
  if (year === currentYear && month < currentMonth) {
    return false;
  }
  
  // Don't allow expiry dates too far in the future (15 years)
  if (year > currentYear + 15) {
    return false;
  }
  
  return true;
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  return phone;
};

// Format credit card number for display
export const formatCreditCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Get credit card type from number
export const getCreditCardType = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(cleanNumber)) {
    return 'visa';
  } else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return 'mastercard';
  } else if (/^3[47]/.test(cleanNumber)) {
    return 'amex';
  } else if (/^6(?:011|5)/.test(cleanNumber)) {
    return 'discover';
  }
  
  return 'unknown';
};