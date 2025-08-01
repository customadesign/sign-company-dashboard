#!/bin/bash

# Build script for GitHub Pages deployment
echo "Building Sign World Dashboard for GitHub Pages..."

# Set environment variable for GitHub Pages
export GITHUB_PAGES=true
export VITE_API_URL=https://sign-company.onrender.com

# Navigate to client directory
cd client

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building application..."
npm run build

# Create a 404.html that redirects to index.html for client-side routing
cp dist/index.html dist/404.html

# Add CNAME file if you have a custom domain
# echo "yourdomain.com" > dist/CNAME

echo "Build complete! The dist folder is ready for GitHub Pages deployment."