// Express.js API routes for calendar iCal feeds
// This should be integrated into your existing Express server

const express = require('express');
const ical = require('ical-generator');
const Calendar = require('../models/Calendar'); // Your Calendar model
const Event = require('../models/Event'); // Your Event model

const router = express.Router();

// GET /api/calendars - List all calendars
router.get('/calendars', async (req, res) => {
  try {
    const calendars = await Calendar.find({ active: true })
      .populate('upcomingEvents')
      .sort({ name: 1 });
    
    res.json(calendars);
  } catch (error) {
    console.error('Error fetching calendars:', error);
    res.status(500).json({ error: 'Failed to fetch calendars' });
  }
});

// GET /api/calendars/:id/ical - Generate iCal feed for specific calendar
router.get('/calendars/:id/ical', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch calendar and its events
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res.status(404).json({ error: 'Calendar not found' });
    }

    const events = await Event.find({ 
      calendarId: id,
      // Only include future events and recent past events (last 30 days)
      date: { 
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
      }
    }).sort({ date: 1 });

    // Create iCal calendar
    const cal = ical({
      domain: req.get('host'),
      name: calendar.name,
      description: calendar.description,
      timezone: calendar.timezone || 'America/New_York',
      url: `${req.protocol}://${req.get('host')}/calendar`,
      ttl: 60 * 60 * 24, // 24 hours cache
    });

    // Add events to calendar
    events.forEach(event => {
      cal.createEvent({
        uid: event._id.toString(),
        start: new Date(event.startDate || event.date),
        end: new Date(event.endDate || new Date(event.date).getTime() + (event.duration || 60) * 60 * 1000),
        summary: event.title,
        description: event.description,
        location: event.location,
        url: event.url,
        created: new Date(event.createdAt),
        lastModified: new Date(event.updatedAt),
        // Add organizer information
        organizer: {
          name: calendar.organizerName || 'Sign Company',
          email: calendar.organizerEmail || 'calendar@sign-company.com'
        },
        // Add categories/tags if available
        categories: event.categories || [calendar.name],
        // Set event status
        status: event.status || 'CONFIRMED',
        // Add recurrence if event repeats
        ...(event.recurrence && {
          repeating: {
            freq: event.recurrence.frequency, // 'WEEKLY', 'MONTHLY', etc.
            count: event.recurrence.count,
            interval: event.recurrence.interval,
            until: event.recurrence.until ? new Date(event.recurrence.until) : undefined,
            byDay: event.recurrence.byDay // ['MO', 'WE', 'FR']
          }
        })
      });
    });

    // Set response headers for iCal
    res.set({
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${calendar.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics"`,
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    });

    // Send the iCal data
    res.send(cal.toString());

  } catch (error) {
    console.error('Error generating iCal feed:', error);
    res.status(500).json({ error: 'Failed to generate calendar feed' });
  }
});

// GET /api/calendars/:id/outlook - Redirect to Outlook subscription
router.get('/calendars/:id/outlook', async (req, res) => {
  try {
    const { id } = req.params;
    
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res.status(404).json({ error: 'Calendar not found' });
    }

    const icalUrl = `${req.protocol}://${req.get('host')}/api/calendars/${id}/ical`;
    const outlookUrl = `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(icalUrl)}&name=${encodeURIComponent(calendar.name)}`;
    
    res.redirect(outlookUrl);
  } catch (error) {
    console.error('Error creating Outlook subscription:', error);
    res.status(500).json({ error: 'Failed to create Outlook subscription' });
  }
});

// GET /api/calendars/:id/google - Redirect to Google Calendar subscription
router.get('/calendars/:id/google', async (req, res) => {
  try {
    const { id } = req.params;
    
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res.status(404).json({ error: 'Calendar not found' });
    }

    const icalUrl = `${req.protocol}://${req.get('host')}/api/calendars/${id}/ical`;
    const googleUrl = `https://calendar.google.com/calendar/u/0/r/settings/addbyurl?cid=${encodeURIComponent(icalUrl)}`;
    
    res.redirect(googleUrl);
  } catch (error) {
    console.error('Error creating Google Calendar subscription:', error);
    res.status(500).json({ error: 'Failed to create Google Calendar subscription' });
  }
});

// POST /api/calendars/:id/refresh - Manually refresh calendar cache
router.post('/calendars/:id/refresh', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update calendar's lastUpdated timestamp to force cache refresh
    await Calendar.findByIdAndUpdate(id, { 
      lastUpdated: new Date() 
    });
    
    res.json({ message: 'Calendar refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing calendar:', error);
    res.status(500).json({ error: 'Failed to refresh calendar' });
  }
});

// Middleware to handle CORS for calendar feeds
router.use('/calendars/:id/ical', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

module.exports = router;

/* 
Integration instructions:

1. Install required dependencies:
   npm install ical-generator

2. Add to your main Express app:
   const calendarRoutes = require('./routes/calendarAPI');
   app.use('/api', calendarRoutes);

3. Example Calendar model schema (MongoDB/Mongoose):
   const calendarSchema = new mongoose.Schema({
     name: { type: String, required: true },
     description: String,
     active: { type: Boolean, default: true },
     timezone: { type: String, default: 'America/New_York' },
     organizerName: String,
     organizerEmail: String,
     color: String,
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now },
     lastUpdated: { type: Date, default: Date.now }
   });

4. Example Event model schema:
   const eventSchema = new mongoose.Schema({
     calendarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
     title: { type: String, required: true },
     description: String,
     date: { type: Date, required: true },
     startDate: Date,
     endDate: Date,
     duration: Number, // minutes
     location: String,
     url: String,
     categories: [String],
     status: { type: String, enum: ['TENTATIVE', 'CONFIRMED', 'CANCELLED'], default: 'CONFIRMED' },
     recurrence: {
       frequency: String, // 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'
       interval: Number,
       count: Number,
       until: Date,
       byDay: [String] // ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
     },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
   });

5. Calendar URLs will be:
   - iCal: https://your-domain.com/api/calendars/CALENDAR_ID/ical
   - Outlook: https://your-domain.com/api/calendars/CALENDAR_ID/outlook
   - Google: https://your-domain.com/api/calendars/CALENDAR_ID/google
*/