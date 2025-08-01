#!/bin/bash

# Test production build locally
echo "Testing production build locally..."

# Build the frontend
cd client
npm run build

# Go back to root
cd ..

# Set production environment
export NODE_ENV=production
export PORT=5000

# Start the server
echo ""
echo "Starting production server on http://localhost:5000"
echo "The frontend will be served from the backend"
echo "Press Ctrl+C to stop"
echo ""

node server/index.js