# Vercel Deployment Guide for ZOE LUMOS

Following Vercel's official environment setup documentation.

## Prerequisites
- Vercel account (sign up at vercel.com)
- GitHub repository connected to Vercel

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Link Your Project
Navigate to your project directory and run:
```bash
vercel link
```
Follow the prompts to:
1. Set up and deploy "~/zoestudio"? **Y**
2. Which scope? Select your Vercel account
3. Link to existing project? **Y** (if already created) or **N** (to create new)
4. What's the name? **zoestudio**

## Step 3: Add Environment Variables

### Option A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **zoestudio** project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable with these exact values:

#### EMAIL_USER
- Key: `EMAIL_USER`
- Value: `info@zoelumos.com`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### EMAIL_PASS
- Key: `EMAIL_PASS`
- Value: `dlhedddapdsojxxc`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Sensitive: ✅ (check this box)
- Click **Save**

#### NEXT_PUBLIC_GA_MEASUREMENT_ID
- Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Value: `G-DDZ3SJ8XM2`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

### Option B: Via Vercel CLI
```bash
# Add EMAIL_USER
vercel env add EMAIL_USER
? What's the value of EMAIL_USER? info@zoelumos.com
? Add EMAIL_USER to which Environments? Production, Preview, Development

# Add EMAIL_PASS (mark as sensitive)
vercel env add EMAIL_PASS
? What's the value of EMAIL_PASS? dlhedddapdsojxxc
? Add EMAIL_PASS to which Environments? Production, Preview, Development

# Add GA Measurement ID
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
? What's the value of NEXT_PUBLIC_GA_MEASUREMENT_ID? G-DDZ3SJ8XM2
? Add NEXT_PUBLIC_GA_MEASUREMENT_ID to which Environments? Production, Preview, Development
```

## Step 4: Pull Environment Variables Locally (Optional)
To sync your local environment with Vercel:
```bash
vercel env pull .env.local
```

## Step 5: Deploy to Production

### First Deployment
```bash
vercel --prod
```

### Automatic Deployments
After initial setup, Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: When you push to any other branch or create a PR

## Step 6: Verify Deployment

1. Check deployment status:
```bash
vercel ls
```

2. Open your production site:
```bash
vercel --prod
# Then click the URL provided
```

3. Verify functionality:
- ✅ Contact form sends emails
- ✅ Google Analytics tracks visits (check GA dashboard)
- ✅ All pages load correctly

## Environment-Specific Configurations

### Production Environment
- Domain: zoestudio.com (or your-project.vercel.app)
- Branch: main
- Environment Variables: All 3 variables active

### Preview Environment
- Domain: zoestudio-[branch]-[username].vercel.app
- Branch: Any non-main branch
- Environment Variables: All 3 variables active

### Local Development
- Domain: localhost:3000
- Environment Variables: From .env.local file

## Troubleshooting

### Email Not Sending
1. Verify EMAIL_USER and EMAIL_PASS are set in Vercel
2. Check Vercel Function logs: Dashboard → Functions → Logs
3. Ensure Gmail App Password is still valid

### Google Analytics Not Tracking
1. Verify NEXT_PUBLIC_GA_MEASUREMENT_ID is set
2. Check browser console for gtag errors
3. Disable ad blockers for testing
4. Wait 24-48 hours for full GA data

### Environment Variables Not Loading
1. Redeploy after adding variables:
```bash
vercel --prod --force
```
2. Clear Vercel cache: Dashboard → Settings → Advanced → Clear Cache

## Security Notes

✅ **Secure Variables:**
- EMAIL_PASS is server-side only (no NEXT_PUBLIC prefix)
- Vercel encrypts all environment variables
- Sensitive variables are masked in logs

✅ **Public Variables:**
- NEXT_PUBLIC_GA_MEASUREMENT_ID is browser-exposed (this is fine)
- EMAIL_USER is used server-side but not sensitive

## Quick Reference

| Variable | Value | Type | Environment |
|----------|-------|------|-------------|
| EMAIL_USER | info@zoelumos.com | Server-side | All |
| EMAIL_PASS | dlhedddapdsojxxc | Server-side (Sensitive) | All |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | G-DDZ3SJ8XM2 | Client-side | All |

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Issues: https://github.com/schul92/zoestudio/issues