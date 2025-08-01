#!/usr/bin/env node

/**
 * Setup Database Indexes Script
 * 
 * Run this script to create all necessary database indexes for optimal search performance
 * Usage: node server/scripts/setupIndexes.js
 */

require('dotenv').config();
const createIndexes = require('../config/indexes');

console.log('Starting database index setup...\n');

createIndexes()
  .then(() => {
    console.log('\n✅ Database indexes setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database index setup failed:', error);
    process.exit(1);
  });