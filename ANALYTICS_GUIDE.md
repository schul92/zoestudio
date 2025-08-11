# Google Analytics Tracking Guide for ZOE STUDIO

## Overview
Comprehensive Google Analytics tracking has been implemented to monitor all user interactions with the contact form and service selections.

## Events Being Tracked

### 1. **Form Submission Events** (Most Important)
- **`form_submit_success`** - Tracks successful form submissions
  - Data captured:
    - Services selected (comma-separated list)
    - Number of services selected
    - Whether phone number was provided
    - Whether business name was provided
    - Message length
    - Time spent filling the form (in seconds)
    - Page source (which page the form was submitted from)

- **`form_submit_attempt`** - Tracks when user clicks submit button
- **`form_submit_error`** - Tracks failed submissions with error details

### 2. **Engagement Events**
- **`form_field_interaction`** - Tracks when user starts filling the form
- **`service_select`** - When a service is selected
- **`service_deselect`** - When a service is deselected
- **`validation_error`** - When form validation fails

### 3. **Conversion Tracking**
All successful form submissions are also tracked as conversions with:
- Transaction ID (timestamp)
- Value (number of services selected)
- Services selected

## How to View Reports in Google Analytics

### Quick Reports:

1. **Total Form Submissions:**
   - Go to: Reports → Engagement → Events
   - Look for `form_submit_success` event
   - This shows total successful submissions

2. **Form Conversion Rate:**
   - Compare `form_submit_attempt` vs `form_submit_success`
   - Formula: (Success / Attempts) × 100

3. **Most Popular Services:**
   - Go to: Reports → Engagement → Events
   - Click on `form_submit_success`
   - Look at the `event_label` dimension to see services

4. **Form Errors:**
   - Filter events by `form_submit_error`
   - Check `event_label` for error types

### Custom Reports Setup:

#### Report 1: Contact Form Performance
1. Go to Explore → Create new exploration
2. Add dimensions:
   - Event name
   - Event label
   - Event category
3. Add metrics:
   - Event count
   - Users
4. Filter: Event name contains "form"

#### Report 2: Service Interest Analysis
1. Create exploration
2. Dimensions: Event label
3. Metrics: Event count, Users
4. Filter: Event name = "form_submit_success"

#### Report 3: Form Completion Time
1. Look for custom parameter `submission_time`
2. This shows average time users spend on form

### Setting Up Goals/Conversions:

1. Go to Admin → Events
2. Find `form_submit_success`
3. Toggle "Mark as conversion"
4. This will appear in Conversions reports

### Real-time Monitoring:

1. Go to Reports → Realtime
2. Look for:
   - `form_submit_attempt` - Someone trying to submit
   - `form_submit_success` - Successful submission
   - `form_field_interaction` - Someone filling form

## Custom Dimensions Available:

- **services_selected**: Comma-separated list of selected services
- **services_count**: Number of services selected
- **has_phone**: Whether phone was provided (true/false)
- **message_length**: Length of message in characters
- **submission_time**: Seconds spent on form
- **error_type**: Type of error if submission failed

## Dashboard Creation:

Create a custom dashboard with:
1. Scorecard: Total form submissions (last 30 days)
2. Line chart: Daily submissions trend
3. Pie chart: Services distribution
4. Table: Top error types
5. Scorecard: Average conversion rate

## Alerts Setup:

Set up custom alerts for:
1. No form submissions in 24 hours
2. Error rate above 20%
3. Sudden drop in conversion rate

## Testing the Tracking:

1. Open Google Analytics Realtime view
2. Submit a test form on the website
3. You should see:
   - `form_field_interaction` when you start typing
   - `form_submit_attempt` when you click submit
   - `form_submit_success` when submission completes

## Troubleshooting:

If events aren't showing:
1. Check browser console for errors
2. Verify GA Measurement ID is set in `.env.local`
3. Use GA Debugger Chrome extension
4. Check Network tab for requests to google-analytics.com

## Key Metrics to Monitor:

1. **Daily/Weekly Submissions**: Track growth
2. **Service Popularity**: Which services get most interest
3. **Form Abandonment Rate**: Started vs Completed
4. **Error Rate**: Failed submissions
5. **Average Time to Complete**: User experience indicator
6. **Conversion by Source**: Which pages convert best

## Email Notifications:

The system also sends emails for each submission, providing:
- Immediate notification
- Backup data collection
- Customer contact information

---

Last Updated: 2025-01-08
Implementation: Comprehensive GA4 tracking with custom events and parameters