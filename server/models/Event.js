const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date'],
  },
  category: {
    type: String,
    enum: ['training', 'webinar', 'convention', 'meeting', 'social', 'other'],
    default: 'other',
  },
  color: {
    type: String,
    default: '#00A6FB',
  },
  location: {
    type: String,
    trim: true,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  onlineLink: String,
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  attendees: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'declined'],
      default: 'pending',
    },
    rsvpDate: {
      type: Date,
      default: Date.now,
    },
  }],
  maxAttendees: Number,
  isPublished: {
    type: Boolean,
    default: true,
  },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);