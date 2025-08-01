#!/bin/bash

# Sign World Dashboard - Production Setup Script

echo "Sign World Dashboard - Production Setup Helper"
echo "============================================="
echo ""

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.production template..."
    cp .env.production .env
    echo "✓ Created .env file"
else
    echo "✓ .env file already exists"
fi

if [ ! -f "client/.env" ]; then
    echo "Creating client/.env file from client/.env.production template..."
    cp client/.env.production client/.env
    echo "✓ Created client/.env file"
else
    echo "✓ client/.env file already exists"
fi

echo ""
echo "Next Steps:"
echo "1. Edit .env file and add your production values:"
echo "   - MONGODB_URI (MongoDB Atlas connection string)"
echo "   - JWT_SECRET (generate a secure random string)"
echo "   - AWS credentials (if using file uploads)"
echo "   - Google Maps API key"
echo ""
echo "2. Edit client/.env file and add:"
echo "   - VITE_API_URL (will be your Render URL)"
echo "   - VITE_GOOGLE_MAPS_API_KEY"
echo ""
echo "3. Test the build locally:"
echo "   npm run install-all"
echo "   npm run build"
echo ""
echo "4. Commit your changes and push to Git"
echo "5. Deploy to Render using the deployment guide"

# Make the script executable
chmod +x scripts/setup-production.sh