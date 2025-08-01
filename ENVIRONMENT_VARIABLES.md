# Required Environment Variables for Render

Set these in your Render Dashboard → Environment tab:

## Critical Variables (Must Set)

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/sign-company?retryWrites=true&w=majority
JWT_SECRET=generate-a-secure-random-string-here
VITE_API_URL=https://sign-company.onrender.com/api
CLIENT_URL=https://sign-company.onrender.com
```

## AI Search Configuration (Required for Search Feature)

```
# OpenRouter API for AI-powered search
OPENROUTER_API_KEY=your-openrouter-api-key

# Redis URL for caching (optional - falls back to in-memory cache)
REDIS_URL=redis://localhost:6379
```

## Calendar Configuration (Optional)

```
# Calendar sharing and iCal feed configuration
CALENDAR_NAME=Sign Company Calendar
CALENDAR_TIMEZONE=America/New_York
DEFAULT_ORGANIZER_EMAIL=events@signcompany.com
```

## Optional Variables

```
# Google Maps (if using map features)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
VITE_GOOGLE_MAPS_API_KEY=same-google-maps-api-key

# AWS S3 (if using file uploads)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

## How to Generate JWT_SECRET

Option 1: Use this command in terminal:
```bash
openssl rand -base64 32
```

Option 2: Use online generator:
https://generate-secret.vercel.app/32

## MongoDB URI Format

Your MongoDB URI should look like:
```
mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

Replace:
- `username` - Your database user
- `password` - Your database password
- `cluster-name` - Your cluster name
- `database-name` - Use `sign-company` or your preferred name