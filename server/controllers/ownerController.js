const User = require('../models/User');
const Rating = require('../models/Rating');
const mongoose = require('mongoose');

// @desc    Get all owners
// @route   GET /api/owners
// @access  Public
exports.getOwners = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const query = { role: 'owner', isActive: true };
    
    // Add search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { name: searchRegex },
        { company: searchRegex },
        { specialties: { $in: [searchRegex] } },
        { 'address.city': searchRegex },
        { 'address.state': searchRegex }
      ];
    }
    
    // Add specialty filter
    if (req.query.specialty) {
      query.specialties = { $in: [new RegExp(req.query.specialty, 'i')] };
    }
    
    // Add location filter
    if (req.query.city) {
      query['address.city'] = new RegExp(req.query.city, 'i');
    }
    
    if (req.query.state) {
      query['address.state'] = new RegExp(req.query.state, 'i');
    }

    const owners = await User.find(query)
      .select('-password -email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    // Get rating statistics for each owner
    const ownersWithRatings = await Promise.all(
      owners.map(async (owner) => {
        const ratingStats = await Rating.getAverageRating(owner._id);
        return {
          ...owner.toObject(),
          rating: ratingStats
        };
      })
    );

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: ownersWithRatings.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      data: ownersWithRatings,
    });
  } catch (error) {
    console.error('Get owners error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Unable to fetch owners',
    });
  }
};

// @desc    Get single owner
// @route   GET /api/owners/:id
// @access  Public
exports.getOwner = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID format',
      });
    }

    const owner = await User.findOne({ 
      _id: id, 
      role: 'owner', 
      isActive: true 
    }).select('-password');

    if (!owner) {
      return res.status(404).json({
        success: false,
        error: 'Owner not found',
      });
    }

    // Get rating statistics
    const ratingStats = await Rating.getAverageRating(owner._id);
    
    // Get recent reviews (published and approved)
    const recentReviews = await Rating.find({
      owner: owner._id,
      status: 'approved',
      isPublished: true
    })
    .populate('reviewer', 'name')
    .sort({ createdAt: -1 })
    .limit(5)
    .select('rating comment createdAt reviewer');

    const ownerData = {
      ...owner.toObject(),
      rating: ratingStats,
      recentReviews
    };

    res.status(200).json({
      success: true,
      data: ownerData,
    });
  } catch (error) {
    console.error('Get owner error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Unable to fetch owner',
    });
  }
};

// @desc    Get owner reviews
// @route   GET /api/owners/:id/reviews
// @access  Public
exports.getOwnerReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID format',
      });
    }

    // Check if owner exists
    const owner = await User.findOne({ 
      _id: id, 
      role: 'owner', 
      isActive: true 
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        error: 'Owner not found',
      });
    }

    const query = {
      owner: id,
      status: 'approved',
      isPublished: true
    };

    const reviews = await Rating.find(query)
      .populate('reviewer', 'name profileImage')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex)
      .select('rating comment createdAt reviewer');

    const total = await Rating.countDocuments(query);
    
    // Get rating distribution
    const ratingDistribution = await Rating.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      ratingDistribution,
      data: reviews,
    });
  } catch (error) {
    console.error('Get owner reviews error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Unable to fetch reviews',
    });
  }
};

// @desc    Create review for owner
// @route   POST /api/owners/:id/reviews
// @access  Private
exports.createOwnerReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID format',
      });
    }

    // Check if owner exists
    const owner = await User.findOne({ 
      _id: id, 
      role: 'owner', 
      isActive: true 
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        error: 'Owner not found',
      });
    }

    // Check if user is trying to review themselves
    if (req.user.id === id) {
      return res.status(400).json({
        success: false,
        error: 'You cannot review yourself',
      });
    }

    // Validate required fields
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid rating between 1 and 5',
      });
    }

    // Check if user has already reviewed this owner
    const existingReview = await Rating.findOne({
      owner: id,
      reviewer: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this owner',
      });
    }

    const review = await Rating.create({
      owner: id,
      reviewer: req.user.id,
      rating: parseInt(rating),
      comment: comment?.trim() || '',
      status: 'pending', // Reviews need approval
      isPublished: false
    });

    const populatedReview = await Rating.findById(review._id)
      .populate('reviewer', 'name profileImage')
      .populate('owner', 'name company');

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully and is pending approval',
      data: populatedReview,
    });
  } catch (error) {
    console.error('Create owner review error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this owner',
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Unable to create review',
    });
  }
};

// @desc    Update owner profile (owner can update their own profile)
// @route   PUT /api/owners/:id
// @access  Private (Owner or Admin)
exports.updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID format',
      });
    }

    // Check if user is updating their own profile or is admin
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this profile',
      });
    }

    const owner = await User.findOne({ 
      _id: id, 
      role: 'owner' 
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        error: 'Owner not found',
      });
    }

    // Fields that can be updated
    const allowedFields = [
      'name', 'phone', 'company', 'address', 'specialties', 
      'equipment', 'yearsInBusiness', 'profileImage', 'socialLinks',
      'mentoring'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Only admin can update isActive status
    if (req.user.role === 'admin' && req.body.isActive !== undefined) {
      updateData.isActive = req.body.isActive;
    }

    const updatedOwner = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: updatedOwner,
    });
  } catch (error) {
    console.error('Update owner error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Unable to update owner',
    });
  }
};

// @desc    Get owner statistics
// @route   GET /api/owners/:id/stats
// @access  Public
exports.getOwnerStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID format',
      });
    }

    const owner = await User.findOne({ 
      _id: id, 
      role: 'owner', 
      isActive: true 
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        error: 'Owner not found',
      });
    }

    // Get comprehensive statistics
    const [ratingStats, totalReviews, ratingDistribution] = await Promise.all([
      Rating.getAverageRating(id),
      Rating.countDocuments({ owner: id, status: 'approved', isPublished: true }),
      Rating.aggregate([
        { 
          $match: { 
            owner: new mongoose.Types.ObjectId(id), 
            status: 'approved', 
            isPublished: true 
          } 
        },
        {
          $group: {
            _id: '$rating',
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: -1 } }
      ])
    ]);

    const stats = {
      profile: {
        joinedDate: owner.createdAt,
        yearsInBusiness: owner.yearsInBusiness || 0,
        specialtiesCount: owner.specialties?.length || 0,
        equipmentCount: owner.equipment?.length || 0,
        isMentorAvailable: owner.mentoring?.available || false
      },
      ratings: {
        ...ratingStats,
        totalReviews,
        distribution: ratingDistribution.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get owner stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Unable to fetch owner statistics',
    });
  }
};