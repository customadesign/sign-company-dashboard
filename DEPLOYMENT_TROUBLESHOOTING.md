# Deployment Troubleshooting Guide

## Common Issues and Solutions

### Issue: Dashboard shows "Loading..." but never loads

**Symptoms:**
- Site shows loading message
- No dashboard content appears
- Browser console shows errors

**Solutions:**

1. **Check API Health**
   - Visit: `https://sign-company.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Verify Environment Variables in Render**
   Required variables:
   - `NODE_ENV=production`
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Secure random string
   - `VITE_API_URL=https://sign-company.onrender.com/api`
   - `CLIENT_URL=https://sign-company.onrender.com`

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for 404 errors on JS files
   - Check for API connection errors

4. **Verify Build Output**
   In Render logs, confirm:
   - `npm run build` completes successfully
   - No build errors
   - Client files built to `client/dist`

### Issue: API returns 404

**Solutions:**
1. Check server is running on correct port
2. Verify `/api` routes are configured
3. Check CORS settings allow your domain

### Issue: MongoDB Connection Failed

**Solutions:**
1. Verify MongoDB URI is correct
2. Check IP whitelist includes `0.0.0.0/0`
3. Ensure database user has correct permissions

### Issue: Environment Variables Not Working

**Solutions:**
1. In Render, ensure all variables are set
2. Redeploy after setting variables
3. For Vite variables, they must start with `VITE_`

## Debugging Steps

1. **Check Render Logs**
   - Go to Render Dashboard
   - Click on your service
   - View "Logs" tab

2. **Test API Directly**
   ```bash
   curl https://sign-company.onrender.com/health
   ```

3. **Verify Static Files**
   - Visit: `https://sign-company.onrender.com/`
   - View page source
   - Check if JS/CSS files load

## Quick Fixes

### Force Rebuild
```bash
git commit --allow-empty -m "Force rebuild"
git push origin main
```

### Clear Build Cache
In Render Dashboard:
1. Go to your service
2. Settings → Build & Deploy
3. Clear build cache
4. Trigger manual deploy