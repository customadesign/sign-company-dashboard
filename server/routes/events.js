const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const ical = require('ical-generator');
const { protect } = require('../middleware/auth');

// Get all events (protected route)
router.get('/', protect, async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true })
      .populate('organizer', 'name email')
      .sort({ startDate: 1 });
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events'
    });
  }
});

// Get single event (protected route)
router.get('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees.user', 'name email');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event'
    });
  }
});

// Create new event (protected route)
router.post('/', protect, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user.id
    };
    
    const event = await Event.create(eventData);
    await event.populate('organizer', 'name email');
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating event'
    });
  }
});

// Update event (protected route)
router.put('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('organizer', 'name email');
    
    res.json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating event'
    });
  }
});

// Delete event (protected route)
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event'
    });
  }
});

// RSVP to event (protected route)
router.post('/:id/rsvp', protect, async (req, res) => {
  try {
    const { status } = req.body; // 'confirmed', 'declined', 'pending'
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user already RSVP'd
    const existingRsvp = event.attendees.find(
      attendee => attendee.user.toString() === req.user.id
    );
    
    if (existingRsvp) {
      existingRsvp.status = status;
      existingRsvp.rsvpDate = new Date();
    } else {
      event.attendees.push({
        user: req.user.id,
        status: status,
        rsvpDate: new Date()
      });
    }
    
    await event.save();
    await event.populate('attendees.user', 'name email');
    
    res.json({
      success: true,
      message: `RSVP updated to ${status}`,
      data: event
    });
  } catch (error) {
    console.error('Error updating RSVP:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating RSVP'
    });
  }
});

// Generate iCal calendar feed (public route)
router.get('/calendar.ics', async (req, res) => {
  try {
    // Fetch all published events
    const events = await Event.find({ 
      isPublished: true,
      startDate: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Include events from last 7 days
    }).populate('organizer', 'name email');
    
    // Create calendar
    const calendar = ical({
      domain: req.get('host') || 'localhost',
      name: process.env.CALENDAR_NAME || 'Sign Company Calendar',
      description: 'Sign Company Dashboard Events and Schedule',
      timezone: process.env.CALENDAR_TIMEZONE || 'America/New_York',
      ttl: 60 * 60 * 24, // 24 hours cache
      prodId: {
        company: 'Sign Company Dashboard',
        product: 'Calendar Feed',
        language: 'EN'
      }
    });
    
    // Add events to calendar
    events.forEach(event => {
      const icalEvent = calendar.createEvent({
        uid: event._id.toString(),
        start: event.startDate,
        end: event.endDate,
        summary: event.title,
        description: event.description,
        location: event.location || '',
        organizer: {
          name: event.organizer?.name || 'Sign Company',
          email: event.organizer?.email || process.env.DEFAULT_ORGANIZER_EMAIL || 'events@signcompany.com'
        },
        url: event.onlineLink || '',
        categories: [event.category],
        created: event.createdAt,
        lastModified: event.updatedAt || event.createdAt
      });
      
      // Add attendees if available
      if (event.attendees && event.attendees.length > 0) {
        event.attendees
          .filter(attendee => attendee.status === 'confirmed')
          .forEach(attendee => {
            if (attendee.user && attendee.user.email) {
              icalEvent.createAttendee({
                email: attendee.user.email,
                name: attendee.user.name || attendee.user.email,
                status: 'ACCEPTED'
              });
            }
          });
      }
      
      // Add alarms/reminders
      icalEvent.createAlarm({
        type: 'display',
        trigger: 24 * 60 * 60, // 24 hours before
        description: `Reminder: ${event.title}`
      });
      
      icalEvent.createAlarm({
        type: 'display',
        trigger: 60 * 60, // 1 hour before
        description: `Starting soon: ${event.title}`
      });
    });
    
    // Set appropriate headers
    res.set({
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="sign-company-calendar.ics"',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    
    // Send calendar
    res.send(calendar.toString());
    
  } catch (error) {
    console.error('Error generating iCal feed:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating calendar feed'
    });
  }
});

// Get calendar feed info (public route)
router.get('/calendar/info', async (req, res) => {
  try {
    const eventsCount = await Event.countDocuments({ 
      isPublished: true,
      startDate: { $gte: new Date() }
    });
    
    const upcomingEvents = await Event.find({ 
      isPublished: true,
      startDate: { $gte: new Date() }
    })
    .select('title startDate category')
    .sort({ startDate: 1 })
    .limit(5);
    
    res.json({
      success: true,
      data: {
        calendarName: process.env.CALENDAR_NAME || 'Sign Company Calendar',
        description: 'Sign Company Dashboard Events and Schedule',
        eventsCount: eventsCount,
        upcomingEvents: upcomingEvents,
        feedUrl: `${req.protocol}://${req.get('host')}/api/events/calendar.ics`,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching calendar info:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching calendar information'
    });
  }
});

module.exports = router;