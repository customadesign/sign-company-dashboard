#!/bin/bash

# Quick deployment script for GitHub
echo "Sign World Dashboard - GitHub Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo ""
    echo "Please enter your GitHub username:"
    read GITHUB_USERNAME
    
    echo "Setting up GitHub remote..."
    git remote add origin https://github.com/$GITHUB_USERNAME/signworld-dashboard.git
fi

# Ensure we're on main branch
git branch -M main

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/$GITHUB_USERNAME/signworld-dashboard/settings/pages"
echo "2. Under 'Build and deployment', Source should be 'GitHub Actions'"
echo "3. Add secrets in Settings → Secrets and variables → Actions:"
echo "   - RENDER_API_KEY (optional)"
echo "   - RENDER_SERVICE_ID (optional)"
echo ""
echo "4. The application will be available at:"
echo "   https://$GITHUB_USERNAME.github.io/signworld-dashboard"
echo ""
echo "5. Update your backend CORS settings to include the GitHub Pages URL"