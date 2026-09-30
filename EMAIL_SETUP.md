# Trainee Form Portal - Email Setup Guide

## Quick Start

Your form now has email capability! Here's how to activate it:

### 1. Get Your Gmail App Password

**Step-by-step:**

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already)
3. Go to https://myaccount.google.com/apppasswords
4. Click **Create app password**
5. App: **Mail** | Device: **Other (Custom)** | Name: **Trainee Form**
6. Click **Create**
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### 2. Add to Your Form

In `index.html`, find this section (around line 1782):

```javascript
// Email configuration - REPLACE WITH YOUR CREDENTIALS
const EMAIL_CONFIG = {
    senderEmail: 'your_email@gmail.com',
    senderPassword: 'your_16_char_app_password_here'
};
```

**Replace with your actual credentials:**

```javascript
const EMAIL_CONFIG = {
    senderEmail: 'minjaruli36@gmail.com',
    senderPassword: 'abcd efgh ijkl mnop'  // Your 16-char password
};
```

### 3. Test It

Open `index.html` and submit the form. You should receive an email!

## How It Works

1. **User fills form** → clicks "Submit & Generate PDF"
2. **PDF is generated** → displayed in browser
3. **Email is sent** → confirmation + PDF attachment to user's email
4. **Success message** → shown to user

## Features

- ✅ Gmail SMTP with App Password (500 emails/day free)
- ✅ PDF attachment in email
- ✅ Bengali (Bangla) text support
- ✅ Responsive design
- ✅ Works on mobile devices

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Use App Password, NOT your regular Gmail password |
| "Authentication failed" | Make sure 2FA is enabled on your Google account |
| Email not received | Check spam folder, or wait up to 5 minutes |
| Rate limit exceeded | Gmail free limit: 500 recipients/day |

## Alternative: EmailJS

If you don't want to use your Gmail directly:
- Sign up at https://mailtrap.io (free tier)
- Or use https://emailjs.com (200 emails/month free)

## GitHub Repo

https://github.com/minjarul1/trainee-form-portal

---

**Need help?** Check `SETUP.html` for visual guide.
