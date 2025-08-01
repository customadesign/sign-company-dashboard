# Production Owner Seeding Instructions

## Issue Fixed
The owners page was showing errors because the production database had no owner data. This has been fixed by:
1. Creating a production-safe seeding script
2. Improving error handling in the frontend
3. Adding an empty state UI

## Steps to Seed Production Database on Render

### Option 1: Using Render Shell (Recommended)
1. Go to your Render dashboard: https://dashboard.render.com
2. Navigate to your web service (sign-company)
3. Click on the "Shell" tab
4. Run the following command:
   ```bash
   npm run seed:production-owners
   ```
   or
   ```bash
   node server/seedProductionOwners.js
   ```

### Option 2: Using Render Jobs
1. Create a one-time job in Render
2. Set the command to: `npm run seed:production-owners`
3. Run the job

### Option 3: Manual Database Connection
If you have direct database access:
1. Connect to your MongoDB database
2. Run the seed script locally with the production DATABASE_URL:
   ```bash
   DATABASE_URL="your-production-mongodb-url" node server/seedProductionOwners.js
   ```

## What the Script Does
- Creates 8 sample owners with Texas locations
- Each owner has:
  - Complete profile information
  - Professional images from Unsplash
  - Specialties and equipment lists
  - Contact information
  - Social media links
  - Mentoring availability

## Verification Steps
1. After running the script, visit: https://sign-company.onrender.com/owners
2. You should see 8 owner profiles displayed
3. Click on any owner to view their detailed profile
4. Search and filter functionality should work properly

## Important Notes
- The script checks for existing owners to avoid duplicates
- If owners already exist, it will skip seeding
- All passwords are hashed securely
- The script only creates owner accounts, not admin accounts

## Troubleshooting
If the page still shows errors after seeding:
1. Check the browser console for specific errors
2. Verify the API endpoint: https://sign-company.onrender.com/api/owners
3. Check Render logs for any server errors
4. Ensure the database connection is working

## API Test
You can test the API directly:
```bash
curl https://sign-company.onrender.com/api/owners
```

This should return a JSON response with the owner data.