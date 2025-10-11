# Deployment Guide for Questify

## Prerequisites
- GitHub account
- Render account (free tier)
- Vercel account (free tier)

---

## Step 1: Push Code to GitHub

1. **Initialize Git (if not done)**:
   ```bash
   cd /c/Users/hp/Desktop/Questify/frostpro
   git init
   git add .
   git commit -m "Initial commit - Questify app ready for deployment"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name: `questify` or `frostpro`
   - Don't initialize with README (you already have code)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/questify.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Render

1. **Go to Render**: https://render.com
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `questify-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   .env keys there
   ```

6. **Click "Create Web Service"**
7. **Wait for deployment** (5-10 minutes)
8. **Copy your backend URL**: Something like `https://questify-backend.onrender.com`

---

## Step 3: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Click "Add New" → "Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variable**:
   ```
   VITE_API_BASE_URL=https://questify-backend.onrender.com/api
   ```
   (Replace with your actual Render backend URL from Step 2)

6. **Click "Deploy"**
7. **Wait for deployment** (2-3 minutes)
8. **Copy your frontend URL**: Something like `https://questify-abc123.vercel.app`

---

## Step 4: Update CORS Settings

1. **Update your backend's `CLIENT_URL` on Render**:
   - Go to your Render dashboard
   - Open your backend service
   - Go to "Environment"
   - Update `CLIENT_URL` to your Vercel frontend URL
   - Save and redeploy

2. **Update server.js CORS allowed origins**:
   - In `backend/server.js` line 35, replace:
     ```javascript
     'https://your-app.vercel.app' // Update this after deploying to Vercel
     ```
     with your actual Vercel URL, commit and push:
     ```bash
     git add .
     git commit -m "Update CORS for production"
     git push
     ```

---

## Step 5: Test Your Deployment

1. **Visit your Vercel frontend URL**
2. **Test the following**:
   - User registration
   - Login
   - Generate a roadmap
   - Check if all API calls work

---

## Troubleshooting

### Backend Issues
- Check Render logs: Dashboard → Your Service → "Logs"
- Verify all environment variables are set correctly
- Make sure MongoDB and Redis are accessible

### Frontend Issues
- Check Vercel logs: Dashboard → Your Project → "Deployments" → Click deployment → "Logs"
- Verify `VITE_API_BASE_URL` points to correct backend
- Check browser console for CORS errors

### CORS Errors
- Make sure `CLIENT_URL` in Render matches your Vercel URL exactly
- Ensure `allowedOrigins` in server.js includes your Vercel URL
- Redeploy backend after changes

---

## Free Tier Limitations

### Render (Backend)
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free

### Vercel (Frontend)
- 100GB bandwidth/month
- Unlimited deployments
- Serverless function execution: 100GB-hours

---

## Production URLs
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://questify-backend.onrender.com
- **API**: https://questify-backend.onrender.com/api

---

## Notes
- MongoDB Atlas and Upstash Redis remain the same (already cloud-hosted)
- Keep your `.env` files secure and never commit them
- Both platforms auto-deploy when you push to GitHub
