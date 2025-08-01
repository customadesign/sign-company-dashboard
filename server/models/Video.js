const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  youtubeId: {
    type: String,
    required: [true, 'Please add a YouTube video ID'],
  },
  youtubeUrl: {
    type: String,
    required: [true, 'Please add a YouTube URL'],
  },
  thumbnail: String,
  duration: String,
  presenter: {
    name: String,
    title: String,
    company: String,
  },
  category: {
    type: String,
    enum: ['training', 'marketing', 'technical', 'business', 'product-demo', 'webinar', 'other'],
    default: 'other',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  topic: {
    type: String,
    trim: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Extract YouTube ID from URL if needed
videoSchema.pre('save', function(next) {
  if (this.youtubeUrl && !this.youtubeId) {
    const match = this.youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match) {
      this.youtubeId = match[1];
    }
  }
  
  // Set thumbnail if not provided
  if (this.youtubeId && !this.thumbnail) {
    this.thumbnail = `https://img.youtube.com/vi/${this.youtubeId}/maxresdefault.jpg`;
  }
  
  next();
});

module.exports = mongoose.model('Video', videoSchema);