const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add equipment name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['printers', 'cutters', 'laminators', 'routers', 'software', 'materials', 'tools', 'other'],
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  documents: [{
    title: String,
    fileUrl: String,
    fileType: String,
  }],
  price: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD',
    },
    note: String,
  },
  availability: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'pre-order', 'discontinued'],
    default: 'in-stock',
  },
  inquiries: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    company: String,
    message: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed', 'cancelled'],
      default: 'new',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  features: [{
    type: String,
    trim: true,
  }],
  relatedProducts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Equipment',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp
equipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);