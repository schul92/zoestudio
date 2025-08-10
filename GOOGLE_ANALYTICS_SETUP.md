# Google Analytics Setup Guide

## Before Deployment Checklist

### 1. Create Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. Set up account name (e.g., "ZOE LUMOS")
4. Set up property name (e.g., "ZOE LUMOS Website")
5. Select your business details
6. Choose "Web" platform
7. Enter your website URL: `https://zoestudio.com`
8. Name your stream: "ZOE LUMOS Main Site"

### 2. Get Your Measurement ID
After creating the property, you'll receive a Measurement ID that looks like: `G-XXXXXXXXXX`

### 3. Add Measurement ID to Environment Variables
1. Open `.env.local` file
2. Uncomment and add your Measurement ID:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ID-HERE
```

### 4. Verify Installation
After deployment, verify Google Analytics is working:
1. Go to Google Analytics > Reports > Realtime
2. Visit your website in another tab
3. You should see yourself as an active user

## What Gets Tracked Automatically

### Page Views
- Every page visit is automatically tracked
- Includes page title, URL, and user location

### Custom Events Already Set Up
1. **Service Clicks** - When users click on service cards
2. **Contact Form Submissions** - When users submit the contact form
3. **Contact Form Started** - When users begin filling the form
4. **Email Validation** - Tracks valid/invalid email attempts

### Enhanced E-commerce Events
The following conversion events are set up:
- `service_click` - Interest in specific services
- `form_submit` - Contact form completions
- `begin_checkout` - Starting contact process

## Setting Up Conversion Goals

In Google Analytics:
1. Go to Admin > Events
2. Mark these events as conversions:
   - `form_submit` (Primary conversion)
   - `service_click` (Micro-conversion)

## Google Ads Integration (Optional)

To track Google Ads conversions:
1. Link Google Analytics to Google Ads
2. Import conversions from Analytics to Ads
3. Set up conversion values if needed

## Privacy Compliance

### Cookie Consent (Recommended)
Consider adding a cookie consent banner for GDPR/CCPA compliance:
- The Google Analytics script only loads after consent
- Store user preference in localStorage
- Provide opt-out mechanism

### Privacy Policy Updates
Update your privacy policy to mention:
- Use of Google Analytics
- Types of data collected
- Purpose of data collection
- User rights regarding data

## Testing Checklist

Before going live:
- [ ] Measurement ID is correctly added to `.env.local`
- [ ] Test form submission tracking
- [ ] Test service click tracking
- [ ] Verify real-time reporting works
- [ ] Check that no sensitive data is being sent
- [ ] Privacy policy is updated
- [ ] Cookie consent (if required by law)

## Troubleshooting

### Analytics Not Showing Data
1. Check browser console for errors
2. Verify Measurement ID is correct
3. Disable ad blockers for testing
4. Wait 24-48 hours for full data

### Events Not Tracking
1. Check browser DevTools Network tab
2. Look for requests to `google-analytics.com/g/collect`
3. Verify event names match exactly

## Additional Resources
- [Google Analytics 4 Documentation](https://support.google.com/analytics)
- [GA4 Event Builder](https://ga-dev-tools.google/ga4/event-builder/)
- [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)