# 🚀 Deploy to Vercel - Quick Setup

## Your GitHub Repository
`https://github.com/Jimmeey2323/p57-feedback-management.git`

---

## ✅ Option 1: Deploy via Vercel Website (EASIEST - 2 minutes)

### Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Paste your repo URL: `https://github.com/Jimmeey2323/p57-feedback-management`
4. Click **"Import"**

### Step 3: Configure Project
Vercel will auto-detect React. Settings should be:
- **Framework Preset**: `Create React App`
- **Root Directory**: `physique57-tickets` *(IMPORTANT!)*
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

*(Get these from your Supabase dashboard → Project Settings → API)*

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Done! 🎉

You'll get a live URL like: `https://p57-feedback-management.vercel.app`

---

## ✅ Option 2: Deploy via Vercel CLI (Terminal)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Navigate to Your Project
```bash
cd "/Users/jimmeeygondaa/Feedback Form/physique57-tickets"
```

### Step 4: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → `Y`
- **Which scope?** → (select your account)
- **Link to existing project?** → `N`
- **Project name?** → `p57-feedback-management`
- **In which directory is your code located?** → `./`
- **Want to override settings?** → `N`

### Step 5: Add Environment Variables
```bash
vercel env add REACT_APP_SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add REACT_APP_SUPABASE_ANON_KEY
# Paste your anon key when prompted
```

### Step 6: Deploy to Production
```bash
vercel --prod
```

---

## 🔧 Important: Configure Root Directory

Since your React app is in the `physique57-tickets` folder (not root), you need to:

### Via Vercel Dashboard:
1. Go to your project settings
2. Click **"General"**
3. Scroll to **"Root Directory"**
4. Set to: `physique57-tickets`
5. Click **"Save"**
6. Redeploy

### Via vercel.json File:
Create `vercel.json` in your repo root:

```json
{
  "buildCommand": "cd physique57-tickets && npm install && npm run build",
  "outputDirectory": "physique57-tickets/build",
  "installCommand": "cd physique57-tickets && npm install"
}
```

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- ✅ Your code is pushed to GitHub
- ✅ `package.json` exists in `physique57-tickets/`
- ✅ Environment variables are NOT hardcoded in code
- ✅ Supabase URL and keys are ready
- ✅ `.env` file is in `.gitignore` (don't commit secrets!)

---

## 🔐 Get Your Supabase Credentials

If you don't have them:

1. Go to [supabase.com](https://supabase.com)
2. Select your **Physique 57 project**
3. Click **Settings** (gear icon) → **API**
4. Copy:
   - **Project URL** → `REACT_APP_SUPABASE_URL`
   - **anon public** key → `REACT_APP_SUPABASE_ANON_KEY`

⚠️ **Use the "anon public" key, NOT the "service_role" key!**

---

## 🎯 After Deployment

### 1. Test Your Live App
Visit your Vercel URL and test:
- ✅ Login works
- ✅ Categories load
- ✅ Subcategories appear
- ✅ Dynamic forms render
- ✅ Tickets can be created

### 2. Enable Auto-Deploy
Vercel automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update ticket form"
git push origin main
```
→ Vercel deploys automatically! 🚀

### 3. Add Custom Domain (Optional)
1. Go to your project → **Settings** → **Domains**
2. Add your domain: `tickets.physique57.com`
3. Follow DNS setup instructions
4. Wait for SSL (automatic)

### 4. Monitor Deployment
- View logs: Vercel dashboard → **Deployments** → Click deployment
- Check errors: Dashboard shows build logs and runtime errors
- Analytics: Free on Vercel dashboard

---

## 🐛 Troubleshooting

### Build Fails
**Error: "Cannot find module"**
- Make sure Root Directory is set to `physique57-tickets`
- Check `package.json` exists in that folder

**Error: "Build script not found"**
- Verify `package.json` has: `"build": "react-scripts build"`

### Environment Variables Not Working
- Make sure they start with `REACT_APP_`
- Redeploy after adding env vars
- Don't use `.env.local` for production (use Vercel dashboard)

### App Loads But Data Missing
- Check Supabase URL is correct
- Verify anon key is correct
- Check browser console for CORS errors
- Ensure Supabase RLS policies allow access

### 404 on Refresh
Vercel should auto-configure this for React Router, but if not:
- Check that `public/_redirects` exists (create if needed):
  ```
  /*    /index.html   200
  ```

---

## 🎊 You're Done!

Your app is now:
- ✅ Live 24/7
- ✅ Accessible from any device
- ✅ Auto-deploys on Git push
- ✅ HTTPS enabled
- ✅ Global CDN (fast worldwide)
- ✅ Free forever (hobby plan)

**Share your live URL with the team!** 🚀

---

## 📞 Quick Commands Reference

```bash
# Deploy
vercel

# Deploy to production
vercel --prod

# View deployments
vercel list

# View logs
vercel logs

# Add environment variable
vercel env add VARIABLE_NAME

# Remove deployment
vercel remove PROJECT_NAME
```

---

## 🔗 Useful Links

- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Deployment Logs: Your project → Deployments
- Environment Variables: Your project → Settings → Environment Variables
- Custom Domains: Your project → Settings → Domains
- GitHub Integration: [vercel.com/docs/git](https://vercel.com/docs/git)
