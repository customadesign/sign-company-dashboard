/**
 * Database Index Configuration
 * 
 * This file defines all the MongoDB indexes needed for optimal search performance
 * Run this script after deployment to ensure all indexes are created
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config({ path: require('path').join(__dirname, '../../.env') });

// Import all models
const User = require('../models/User');
const LibraryFile = require('../models/LibraryFile');
const Event = require('../models/Event');
const ForumThread = require('../models/ForumThread');
const Brag = require('../models/Brag');
const Partner = require('../models/Partner');
const Rating = require('../models/Rating');

async function createIndexes() {
  try {
    await connectDB();
    console.log('Creating database indexes...');

    // User indexes
    await User.collection.createIndex({ name: 'text', company: 'text', specialties: 'text' });
    await User.collection.createIndex({ 'address.state': 1, 'address.city': 1 });
    await User.collection.createIndex({ specialties: 1 });
    await User.collection.createIndex({ role: 1, isActive: 1 });
    await User.collection.createIndex({ company: 1 });
    console.log('✓ User indexes created');

    // LibraryFile indexes
    await LibraryFile.collection.createIndexes([
      // Text search index
      { title: 'text', description: 'text', tags: 'text' },
      // Category and date
      { category: 1, createdAt: -1 },
      // Tags search
      { tags: 1 },
      // Active files by date
      { isActive: 1, createdAt: -1 },
      // Download count for popular sorting
      { downloadCount: -1 }
    ]);
    console.log('✓ LibraryFile indexes created');

    // Event indexes
    await Event.collection.createIndexes([
      // Text search index
      { title: 'text', description: 'text', location: 'text' },
      // Date range queries
      { startDate: 1, endDate: 1 },
      // Category and date
      { category: 1, startDate: 1 },
      // Published events
      { isPublished: 1, startDate: 1 }
    ]);
    console.log('✓ Event indexes created');

    // ForumThread indexes
    await ForumThread.collection.createIndexes([
      // Text search index
      { title: 'text', content: 'text', tags: 'text' },
      // Category and activity
      { category: 1, lastReplyAt: -1 },
      // Tags search
      { tags: 1 },
      // Active threads
      { status: 1, lastReplyAt: -1 },
      // Views for popular sorting
      { views: -1 },
      // Pinned threads
      { isPinned: -1, lastReplyAt: -1 }
    ]);
    console.log('✓ ForumThread indexes created');

    // Brag indexes
    await Brag.collection.createIndexes([
      // Text search index
      { title: 'text', content: 'text' },
      // Status and publishing
      { status: 1, isPublished: 1, publishedAt: -1 },
      // Tags search
      { tags: 1 },
      // Views for popular sorting
      { views: -1 },
      // Published brags by date
      { isPublished: 1, publishedAt: -1 }
    ]);
    console.log('✓ Brag indexes created');

    // Partner indexes
    await Partner.collection.createIndexes([
      // Text search index
      { name: 'text', description: 'text', services: 'text' },
      // Category and country
      { category: 1, country: 1 },
      // Active partners
      { isActive: 1, sortOrder: 1 },
      // Featured partners
      { isFeatured: -1, sortOrder: 1 }
    ]);
    console.log('✓ Partner indexes created');

    // Rating indexes
    await Rating.collection.createIndex({ owner: 1, status: 1, isPublished: 1, createdAt: -1 });
    await Rating.collection.createIndex({ reviewer: 1, createdAt: -1 });
    await Rating.collection.createIndex({ status: 1, createdAt: -1 });
    await Rating.collection.createIndex({ isPublished: 1, status: 1, createdAt: -1 });
    await Rating.collection.createIndex({ rating: 1, owner: 1 });
    console.log('✓ Rating indexes created');

    console.log('\n✅ All indexes created successfully!');
    
    // List all indexes for verification
    console.log('\nCreated indexes summary:');
    const collections = [
      { name: 'users', model: User },
      { name: 'libraryfiles', model: LibraryFile },
      { name: 'events', model: Event },
      { name: 'forumthreads', model: ForumThread },
      { name: 'brags', model: Brag },
      { name: 'partners', model: Partner },
      { name: 'ratings', model: Rating }
    ];

    for (const { name, model } of collections) {
      const indexes = await model.collection.getIndexes();
      console.log(`\n${name}:`, Object.keys(indexes).join(', '));
    }

  } catch (error) {
    console.error('Error creating indexes:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  createIndexes();
}

module.exports = createIndexes;