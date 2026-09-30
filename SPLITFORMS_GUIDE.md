# Trainee Form - splitforms Integration Guide

## 🎯 What is splitforms?

**splitforms** is a modern form backend service that:
- ✅ Stores all form submissions in a dashboard
- ✅ Sends email notifications automatically
- ✅ Provides AI spam protection
- ✅ Supports webhooks and integrations
- ✅ **No email credentials needed** (unlike EmailJS)
- ✅ **500-1,000 free submissions/month** (vs EmailJS's 200)

---

## 📊 Comparison: splitforms vs EmailJS

| Feature | splitforms | EmailJS |
|---------|-----------|---------|
| **Free Tier** | 500-1,000 submissions | 200 emails |
| **Paid Plan** | $5/mo (5,000 subs) | $11/mo (1,000 emails) |
| **Email Setup** | ✅ None needed | ❌ Gmail App Password required |
| **Submission Storage** | ✅ Dashboard + CSV export | ❌ None |
| **Spam Protection** | ✅ AI classifier | ❌ Basic only |
| **Webhooks** | ✅ Available | ❌ Not available |
| **File Uploads** | ✅ 10MB per file | ❌ Limited |
| **Setup Time** | ✅ 2 minutes | ⭐⭐ 10 minutes |

---

## 🚀 Quick Start (3 Steps)

### Step 1: Sign Up at splitforms.com

1. Go to: https://splitforms.com/login
2. Create free account (no credit card)
3. Dashboard → Copy your **Access Key**

### Step 2: Configure Your Form

Update `splitforms_integration.js`:

```javascript
const SPLITFORMS_CONFIG = {
    accessKey: 'your_access_key_here',  // ← PASTE YOUR KEY
    endpoint: 'https://splitforms.com/api/submit'
};
```

### Step 3: Test It

1. Open `index.html` in browser
2. Fill out the trainee form
3. Click "Submit & Send Email"
4. Check your splitforms dashboard for the submission
5. Check your email for the notification

---

## 🔧 Integration Options

### Option A: JavaScript Fetch (Recommended)

Uses the `submitForm()` function in `splitforms_integration.js`:

```javascript
// In your submit button click handler:
document.getElementById('submit-btn').addEventListener('click', async () => {
    const result = await submitForm(true); // true = enable splitforms
    
    if (result.success) {
        alert('✅ Form submitted! Check your email.');
    } else {
        alert('❌ Failed: ' + result.message);
    }
});
```

### Option B: Pure HTML Form (No JavaScript)

For maximum compatibility, use a standard HTML form:

```html
<form action="https://splitforms.com/api/submit" method="POST">
    <!-- Required fields -->
    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
    <input type="hidden" name="form_loaded_at" id="form-loaded-at">
    <input type="checkbox" name="botcheck" style="display:none" tabindex="-1">
    
    <!-- Subject line -->
    <input type="hidden" name="subject" value="New Trainee Registration">
    
    <!-- Form fields -->
    <input type="text" name="Full Name (English)" required placeholder="John Doe">
    <input type="text" name="Full Name (Bangla)" placeholder="জন ডো">
    <input type="email" name="Email" required placeholder="john@example.com">
    <input type="tel" name="Phone" placeholder="+880 1711-104318">
    
    <textarea name="Notes" placeholder="Additional notes..."></textarea>
    
    <button type="submit">Submit Registration</button>
</form>

<script>
    // Time-trap for spam protection
    document.getElementById('form-loaded-at').value = Date.now();
</script>
```

---

## 📧 Email Configuration (Optional)

By default, splitforms sends emails using their own infrastructure. If you want to use your own SMTP:

1. **Upgrade to Pro plan** ($5/mo)
2. Go to splitforms dashboard → Settings → SMTP
3. Configure your Gmail/Outlook/SendGrid credentials
4. splitforms will send emails using your SMTP

**This gives you:**
- Full control over sender identity
- Better deliverability
- Same dashboard and storage features

---

## 🌐 Webhook Integration

Forward submissions to other services:

### Slack Webhook
```bash
# In splitforms dashboard: Settings → Webhooks
# URL: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
# Event: On submission
```

### Google Sheets
```bash
# Use Zapier or Make.com to connect splitforms → Google Sheets
# Or use Google Apps Script webhook endpoint
```

### Notion Database
```bash
# Create a Notion database
# Use splitforms webhook to add pages automatically
```

---

## 📊 Dashboard Features

Once configured, you'll get:

- ✅ **Submission list** with search and filters
- ✅ **CSV export** for all submissions
- ✅ **Spam score** for each submission
- ✅ **Timestamps** and IP addresses
- ✅ **User agent** tracking
- ✅ **File attachments** (if enabled)

---

## 🔒 Security Features

### 1. Time-Trap Protection
```javascript
// Prevents instant bot submissions
document.getElementById('form-loaded-at').value = Date.now();
```

### 2. Honeypot Field
```html
<!-- Hidden field that bots fill but humans don't -->
<input type="checkbox" name="botcheck" style="display:none" tabindex="-1">
```

### 3. AI Spam Classifier
- Automatically detects spam submissions
- Blocks suspicious patterns
- No manual configuration needed

### 4. Rate Limiting
- Free tier: 100 requests/hour
- Pro tier: 1,000 requests/hour
- Prevents abuse

---

## 💰 Pricing Comparison

### splitforms
- **Free**: 500-1,000 submissions/month
- **Pro**: $5/month (5,000 submissions)
- **3-Year**: $59 every 3 years (15,000/month)

### EmailJS
- **Free**: 200 emails/month
- **Personal**: $11/month (1,000 emails)
- **Professional**: $30/month (10,000 emails)

**splitforms is 2-5x cheaper and 2.5-5x more generous!**

---

## ❓ FAQ

### Q: Do I need a backend server?
**A:** No! splitforms handles everything server-side. Your form can be static HTML on GitHub Pages.

### Q: Can I use my own email domain?
**A:** Yes! Upgrade to Pro plan and configure custom SMTP.

### Q: What happens if I exceed the free limit?
**A:** Your form will stop working until you upgrade or wait for next month.

### Q: Can I export my data?
**A:** Yes! CSV export available on all plans.

### Q: Is there a mobile app?
**A:** No, but the dashboard is mobile-friendly.

### Q: Can I use splitforms with React/Vue/Angular?
**A:** Yes! Works with any framework that can make HTTP requests.

---

## 🎯 Migration from EmailJS

If you're currently using EmailJS, migration is easy:

### Step 1: Remove EmailJS
```javascript
// Remove this from your code:
import emailjs from '@emailjs/browser';
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams, 'PUBLIC_KEY');
```

### Step 2: Add splitforms
```javascript
// Add this instead:
fetch('https://splitforms.com/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        access_key: 'YOUR_SPLITFORMS_KEY',
        form_loaded_at: Date.now(),
        botcheck: false,
        // ... your form fields
    })
});
```

### Step 3: Test
Submit a test form and verify it appears in your splitforms dashboard.

---

## 📞 Support

- **Documentation**: https://splitforms.com/docs
- **Email**: support@splitforms.com
- **Twitter**: @splitforms

---

**Ready to switch?** Get your free access key at https://splitforms.com/login 🚀
