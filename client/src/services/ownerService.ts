// Owner Service for API calls
import api from '../config/api';

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  openDate: string;
  yearsInBusiness: number;
  specialties: string[];
  equipment: string[];
  mentoring: {
    available: boolean;
    areas: string[];
  };
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  stats: {
    averageRating: number;
    totalRatings: number;
    projectsCompleted: number;
    yearsWithSignWorld: number;
  };
}

export interface Review {
  id: string;
  reviewer: {
    id: string;
    name: string;
    company: string;
    profileImage: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Get owner profile by ID
export const getOwnerProfile = async (ownerId: string): Promise<Owner> => {
  try {
    const response = await api.get(`/owners/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching owner profile:', error);
    throw error;
  }
};

// Get owner reviews
export const getOwnerReviews = async (ownerId: string): Promise<Review[]> => {
  try {
    const response = await api.get(`/ratings/owner/${ownerId}`);
    return response.data.filter((review: Review) => review.status === 'approved');
  } catch (error) {
    console.error('Error fetching owner reviews:', error);
    throw error;
  }
};

// Submit a review for an owner
export const submitOwnerReview = async (
  ownerId: string,
  rating: number,
  comment: string
): Promise<Review> => {
  try {
    const response = await api.post('/ratings', {
      owner: ownerId,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Update owner profile (for owner's own profile)
export const updateOwnerProfile = async (
  ownerId: string,
  updates: Partial<Owner>
): Promise<Owner> => {
  try {
    const response = await api.put(`/owners/${ownerId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating owner profile:', error);
    throw error;
  }
};

// Search owners by location, specialty, or equipment
export const searchOwners = async (params: {
  query?: string;
  location?: string;
  specialty?: string;
  equipment?: string;
  page?: number;
  limit?: number;
}): Promise<{ owners: Owner[]; total: number }> => {
  try {
    const response = await api.get('/owners/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching owners:', error);
    throw error;
  }
};

// Get recommended owners based on user's profile
export const getRecommendedOwners = async (
  userId: string,
  limit: number = 5
): Promise<Owner[]> => {
  try {
    const response = await api.get(`/owners/recommended/${userId}`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended owners:', error);
    throw error;
  }
};