// Owner Service for API calls
import api from '../config/axios';

export interface Owner {
  _id: string;
  id: string; // We'll map _id to id in the component
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
  stats?: {
    averageRating: number;
    totalRatings: number;
    projectsCompleted: number;
    yearsWithSignWorld: number;
  };
  rating?: {
    averageRating: number;
    totalRatings: number;
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

// Get all owners
export const getOwners = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  specialty?: string;
  city?: string;
  state?: string;
}): Promise<{
  data: Owner[];
  count: number;
  total: number;
  pagination: {
    page: number;
    limit: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}> => {
  try {
    const response = await api.get('/owners', { params });
    // Map _id to id for each owner
    if (response.data.data && Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map((owner: any) => ({
        ...owner,
        id: owner._id || owner.id
      }));
    }
    return response.data;
  } catch (error: any) {
    console.error('Error fetching owners:', error);
    // Provide a more descriptive error message
    if (error.response?.status === 404) {
      throw new Error('Owners endpoint not found. Please check the server configuration.');
    } else if (error.response?.status === 500) {
      throw new Error('Server error while fetching owners. Please try again later.');
    } else if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error(error.response?.data?.error || 'Failed to fetch owners. Please try again.');
    }
  }
};

// Get owner profile by ID
export const getOwnerProfile = async (ownerId: string): Promise<Owner> => {
  try {
    const response = await api.get(`/owners/${ownerId}`);
    const owner = response.data.data || response.data;
    // Ensure id field exists
    if (owner && owner._id && !owner.id) {
      owner.id = owner._id;
    }
    return owner;
  } catch (error) {
    console.error('Error fetching owner profile:', error);
    throw error;
  }
};

// Get owner reviews
export const getOwnerReviews = async (ownerId: string): Promise<Review[]> => {
  try {
    const response = await api.get(`/owners/${ownerId}/reviews`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error fetching owner reviews:', error);
    // Return empty array on error to prevent crashes
    return [];
  }
};

// Submit a review for an owner
export const submitOwnerReview = async (
  ownerId: string,
  rating: number,
  comment: string
): Promise<Review> => {
  try {
    const response = await api.post(`/owners/${ownerId}/reviews`, {
      rating,
      comment,
    });
    return response.data.data || response.data;
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