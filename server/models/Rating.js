const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot be more than 500 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  moderatorNotes: String,
  moderatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  moderatedAt: Date,
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure one rating per reviewer per owner
ratingSchema.index({ owner: 1, reviewer: 1 }, { unique: true });

// Static method to calculate average rating for an owner
ratingSchema.statics.getAverageRating = async function(ownerId) {
  // Convert string ID to ObjectId
  const ownerObjectId = mongoose.Types.ObjectId.isValid(ownerId) 
    ? new mongoose.Types.ObjectId(ownerId) 
    : ownerId;
    
  const obj = await this.aggregate([
    {
      $match: { 
        owner: ownerObjectId,
        status: 'approved',
        isPublished: true
      }
    },
    {
      $group: {
        _id: '$owner',
        averageRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 }
      }
    }
  ]);

  return obj.length > 0 ? {
    averageRating: Math.round(obj[0].averageRating * 10) / 10,
    totalRatings: obj[0].totalRatings
  } : {
    averageRating: 0,
    totalRatings: 0
  };
};

module.exports = mongoose.model('Rating', ratingSchema);