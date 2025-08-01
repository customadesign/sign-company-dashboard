#!/bin/bash

# Deployment Status Check Script
echo "🚀 Checking Sign Company Dashboard Deployment Status..."
echo "================================================"

# Function to check URL status
check_url() {
    local url=$1
    local description=$2
    
    echo -n "Checking $description... "
    
    # Use curl to check the URL
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" = "200" ]; then
        echo "✅ OK (HTTP $response)"
    else
        echo "❌ Issue detected (HTTP $response)"
    fi
}

# Check main application
check_url "https://sign-company.onrender.com" "Main Application"

# Check calendar page
check_url "https://sign-company.onrender.com/calendar" "Calendar Page"

# Check API endpoint
check_url "https://sign-company.onrender.com/api/events/calendar.ics" "Calendar API Endpoint"

echo ""
echo "📝 Deployment Details:"
echo "- Repository: https://github.com/customadesign/sign-company-dashboard"
echo "- Latest commit pushed: 443cec2"
echo "- Changes: Calendar share section moved below calendar with enhanced UX"

echo ""
echo "🔍 Next Steps:"
echo "1. If all checks show ✅, the deployment is complete"
echo "2. If any show ❌, wait 5-10 minutes for Render to complete deployment"
echo "3. Clear browser cache and test the new calendar share section"
echo "4. Check browser console for any JavaScript errors"

echo ""
echo "📱 Test URLs:"
echo "- Calendar: https://sign-company.onrender.com/calendar"
echo "- Login required to view calendar features"