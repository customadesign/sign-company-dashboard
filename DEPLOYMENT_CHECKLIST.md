# Deployment Checklist

## Pre-Deployment

- [ ] MongoDB Atlas account created
- [ ] MongoDB Atlas cluster created (free tier M0 is fine)
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for Render)
- [ ] MongoDB connection string obtained
- [ ] Google Maps API key obtained (if using maps)
- [ ] AWS S3 bucket created (if using file uploads)
- [ ] AWS IAM user created with S3 permissions

## Environment Setup

- [ ] Copy `.env.production` to `.env`
- [ ] Fill in all required values in `.env`:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET (generate secure random string)
  - [ ] CLIENT_URL (will be Render URL)
  - [ ] AWS credentials (if applicable)
  - [ ] Google Maps API key
- [ ] Copy `client/.env.production` to `client/.env`
- [ ] Update `client/.env` values:
  - [ ] VITE_API_URL (will be Render URL + /api)
  - [ ] VITE_GOOGLE_MAPS_API_KEY

## Code Preparation

- [ ] Test build locally: `npm run install-all && npm run build`
- [ ] Ensure no build errors
- [ ] Commit all changes to Git
- [ ] Push to main branch

## Render Deployment

- [ ] Connect Git repository to Render
- [ ] Create new Web Service or use Blueprint
- [ ] Set all environment variables in Render dashboard
- [ ] Deploy application
- [ ] Wait for build to complete
- [ ] Check build logs for errors

## Post-Deployment

- [ ] Visit deployed URL
- [ ] Test health endpoint: `https://your-app.onrender.com/health`
- [ ] Update `CLIENT_URL` in Render if needed
- [ ] Update `client/.env` with actual Render URL
- [ ] Redeploy if frontend URL was updated
- [ ] Create admin user (SSH or Shell: `node server/seedAdmin.js`)
- [ ] Test login functionality
- [ ] Test all major features
- [ ] Set up monitoring/alerts in Render

## Verification

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Authentication works
- [ ] Database operations work
- [ ] File uploads work (if applicable)
- [ ] Maps display correctly (if applicable)

## Troubleshooting Resources

- Check `/DEPLOYMENT_GUIDE.md` for detailed instructions
- Render logs: Dashboard → Service → Logs
- MongoDB Atlas logs: Atlas Dashboard → Metrics
- Test API directly: `curl https://your-app.onrender.com/health`