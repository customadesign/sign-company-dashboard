# GitHub Deployment Guide for Sign World Dashboard

This guide explains how to deploy the Sign World Dashboard using GitHub for version control and CI/CD.

## Architecture Overview

- **Frontend**: Deployed to GitHub Pages (static hosting)
- **Backend**: Remains on Render (or other Node.js hosting service)
- **Database**: MongoDB Atlas or self-hosted MongoDB
- **CI/CD**: GitHub Actions for automated testing and deployment

## Prerequisites

1. GitHub repository created
2. Render account (for backend hosting)
3. MongoDB database (Atlas or self-hosted)
4. AWS S3 account (for file uploads)

## Setup Instructions

### 1. Initialize Git Repository

```bash
cd /Users/harrymurphy/Library/Mobile\ Documents/com~apple~CloudDocs/Coding\ Projects/Sign\ World/signworld-dashboard
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `signworld-dashboard`
3. Don't initialize with README (we already have one)

### 3. Connect Local to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/signworld-dashboard.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Build and deployment":
   - Source: GitHub Actions
   - The workflow will handle deployment automatically

### 5. Configure GitHub Secrets

Go to Settings → Secrets and variables → Actions, and add:

- `RENDER_API_KEY`: Your Render API key (optional, for backend auto-deploy)
- `RENDER_SERVICE_ID`: Your Render service ID (optional)

### 6. Environment Variables

#### Frontend (.env in client/)
```env
VITE_API_URL=https://sign-company.onrender.com
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

#### Backend (.env in root)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket
CLIENT_URL=https://YOUR_USERNAME.github.io/signworld-dashboard
```

## Deployment Process

### Automatic Deployment (Recommended)

1. Push to main branch:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Run tests
   - Build frontend
   - Deploy to GitHub Pages
   - Trigger Render deployment (if configured)

### Manual Frontend Deployment

1. Build for GitHub Pages:
   ```bash
   ./scripts/build-gh-pages.sh
   ```

2. The GitHub Actions workflow will handle the rest

### Manual Backend Deployment (Render)

The backend remains on Render. To update:

1. Push changes to GitHub
2. Render will auto-deploy if connected to your GitHub repo
3. Or manually trigger deployment in Render dashboard

## Post-Deployment Configuration

### Update CORS Settings

Ensure your backend allows requests from GitHub Pages:

```javascript
// In server/index.js
const allowedOrigins = [
  'https://YOUR_USERNAME.github.io',
  'http://localhost:5173',
  'https://sign-company.onrender.com'
];
```

### Custom Domain (Optional)

1. Add a CNAME file to client/public/ with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

## Accessing Your Application

- **Frontend**: https://YOUR_USERNAME.github.io/signworld-dashboard
- **Backend API**: https://sign-company.onrender.com
- **Health Check**: https://sign-company.onrender.com/health

## Alternative Backend Hosting Options

If you want to move away from Render:

### 1. Railway
- Easy deployment from GitHub
- Built-in MongoDB support
- Environment variable management

### 2. Fly.io
- Global edge deployment
- WebSocket support
- Generous free tier

### 3. DigitalOcean App Platform
- Integrated with GitHub
- Managed databases available
- Predictable pricing

### 4. AWS EC2 / Elastic Beanstalk
- Full control
- Scalable
- More complex setup

### 5. Heroku
- Simple deployment
- Add-ons marketplace
- Recently updated free tier

## Monitoring and Maintenance

1. **GitHub Actions**: Monitor workflow runs in Actions tab
2. **Application Logs**: Check Render logs for backend issues
3. **Error Tracking**: Consider adding Sentry or similar
4. **Uptime Monitoring**: Use UptimeRobot or similar service

## Troubleshooting

### Frontend Not Loading
- Check GitHub Pages deployment status
- Verify API URL in environment variables
- Check browser console for errors

### API Connection Issues
- Verify CORS configuration
- Check backend health endpoint
- Ensure environment variables are set correctly

### Build Failures
- Check GitHub Actions logs
- Verify all dependencies are installed
- Ensure Node.js version compatibility

## Security Considerations

1. Never commit `.env` files
2. Use GitHub Secrets for sensitive data
3. Regularly update dependencies
4. Enable 2FA on GitHub
5. Review and rotate API keys periodically