# Sign Company Dashboard - Deployment Guide for Render

This guide will walk you through deploying the Sign Company Dashboard to production using Render, MongoDB Atlas, and optionally AWS S3 for file storage.

## Prerequisites

1. A [Render](https://render.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or existing MongoDB instance)
3. (Optional) AWS account for S3 file storage
4. (Optional) Google Maps API key for map functionality
5. Git repository with your code

## Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account if you don't have one

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set permissions to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For Render deployment, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add your database name after the `/` (e.g., `/sign-company-dashboard`)

## Step 2: Prepare Your Code for Deployment

1. **Update Environment Files**
   - Copy `.env.production` to `.env` in the root directory
   - Copy `client/.env.production` to `client/.env`
   - Fill in all the required values

2. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

## Step 3: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. **Push to GitHub/GitLab**
   - Ensure your code is pushed to a Git repository

2. **Create New Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +"
   - Select "Blueprint"
   - Connect your Git repository
   - Render will detect the `render.yaml` file
   - Click "Apply"

### Option B: Manual Setup

1. **Create a New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository containing your code

2. **Configure the Service**
   - **Name**: sign-company-dashboard
   - **Region**: Choose closest to your users
   - **Branch**: main (or your default branch)
   - **Root Directory**: Leave blank
   - **Runtime**: Node
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`

3. **Select Instance Type**
   - Choose "Free" for testing or appropriate paid tier for production

## Step 4: Configure Environment Variables

In Render dashboard, go to your service and click "Environment":

### Required Environment Variables:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sign-company-dashboard?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
CLIENT_URL=https://your-app-name.onrender.com
```

### Optional Environment Variables:

```bash
# Google Maps (for map features)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# Email (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Step 5: Deploy

1. Click "Manual Deploy" → "Deploy latest commit"
2. Watch the build logs for any errors
3. Once deployed, visit your app at `https://your-app-name.onrender.com`

## Step 6: Update Frontend Environment

After your backend is deployed:

1. Update `client/.env.production`:
   ```
   VITE_API_URL=https://your-app-name.onrender.com/api
   ```

2. Commit and push:
   ```bash
   git add client/.env.production
   git commit -m "Update API URL for production"
   git push origin main
   ```

3. Render will automatically redeploy

## Step 7: Set Up Admin User

1. Create an admin user by running the seed script:
   - SSH into your Render service or use the Shell tab
   - Run: `node server/seedAdmin.js`
   - Or create a new admin: `node server/createFreshAdmin.js`

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check your connection string format
   - Ensure IP whitelist includes 0.0.0.0/0
   - Verify username and password

2. **Build Failed**
   - Check build logs for missing dependencies
   - Ensure all required environment variables are set
   - Verify Node.js version compatibility

3. **CORS Errors**
   - Update CLIENT_URL environment variable to match your frontend URL
   - Check server/index.js CORS configuration

4. **File Uploads Not Working**
   - Ensure AWS credentials are correct
   - Verify S3 bucket exists and has proper permissions
   - Check bucket CORS configuration

### Monitoring and Logs

- View logs in Render dashboard under "Logs"
- Set up alerts for service health
- Monitor MongoDB Atlas dashboard for database performance

## Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Use strong passwords for database users
- [ ] Enable MongoDB Atlas encryption at rest
- [ ] Set up proper CORS origins
- [ ] Use HTTPS (automatic with Render)
- [ ] Regularly update dependencies
- [ ] Monitor for security vulnerabilities

## Performance Optimization

1. **Enable Caching**
   - Render automatically caches static assets
   - Consider implementing Redis for API caching

2. **Database Indexing**
   - Add indexes to frequently queried fields in MongoDB

3. **Image Optimization**
   - Use image compression
   - Consider CDN for static assets

## Backup Strategy

1. **Database Backups**
   - Enable automated backups in MongoDB Atlas
   - Set retention policy

2. **Code Backups**
   - Use Git tags for releases
   - Maintain staging branch

## Scaling

When ready to scale:
1. Upgrade Render instance type
2. Enable auto-scaling if available
3. Consider MongoDB Atlas dedicated clusters
4. Implement load balancing

## Support

- Render Documentation: https://render.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Check application logs for specific errors