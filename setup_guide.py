"""
Complete Setup Guide - Trainee Form Email Integration
======================================================
Follow these steps to enable email sending in your trainee registration form.
"""

print("""
╔════════════════════════════════════════════════════════════════╗
║         Trainee Form Email Setup Guide                         ║
╚════════════════════════════════════════════════════════════════╝

📧 Your form now supports email sending! Choose one method:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 1: EmailJS (Recommended for GitHub Pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Pros: Easy setup, works on static sites, 200 emails/month free
❌ Cons: Limited to 200 emails/month, no PDF attachment

Steps:
1. Sign up at https://www.emailjs.com/
2. Add Gmail service → Connect your account
3. Create email template → Note the Template ID
4. Get your Public Key from Account settings
5. Update index.html with your credentials:

   const EMAIL_CONFIG = {
       publicKey: 'YOUR_PUBLIC_KEY',
       serviceId: 'service_xxxxxxx',
       templateId: 'template_xxxxxxx'
   };

6. Add SDK to HTML <head>:
   <script src="https://cdn.emailjs.com/dist/email.min.js"><\/script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 2: Google Apps Script (Free, Unlimited)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Pros: Free, unlimited emails, serverless
❌ Cons: Requires Google account, slightly complex setup

Steps:
1. Go to https://script.google.com/
2. Create new project, paste this code:

   function doPost(e) {
     var data = JSON.parse(e.postData.contents);
     var mail = MailApp.sendEmail({
       to: data.toEmail,
       subject: 'Trainee Registration Confirmation',
       htmlBody: '<h1>Thank you ' + data.toName + '!</h1><p>Your registration has been received.</p>'
     });
     return ContentService.createTextOutput(JSON.stringify({success: true}));
   }

3. Deploy as Web App → Execute as "Me" → Access "Anyone"
4. Copy the Web App URL
5. Update JavaScript to call this URL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 3: Python Backend + Gmail SMTP (Full Control)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Pros: Send PDF attachments, unlimited emails, full control
❌ Cons: Requires backend server, more complex

Steps:
1. Get Gmail App Password:
   https://myaccount.google.com/apppasswords
   → Create app password for "Mail" → Name: "Trainee Form"
   → Copy the 16-character password

2. Create .env file:
   GMAIL_EMAIL=minjaruli36@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_password_here

3. Run the Python backend:
   python email_sender.py

4. Update form to call backend API

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUICK START (Using EmailJS - Recommended):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  Go to: https://www.emailjs.com/
2️⃣  Sign up (free)
3️⃣  Add Gmail Service
4️⃣  Create Email Template
5️⃣  Get Public Key
6️⃣  Update index.html with your credentials
7️⃣  Test by submitting the form!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILES IN THIS REPOSITORY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 index.html           - Main registration form (update EMAIL_CONFIG)
📄 email_sender.js      - EmailJS integration code
📄 email_sender.py      - Python backend (optional)
📄 SETUP.html           - Visual setup guide
📄 EMAIL_SETUP_GUIDE.md - Detailed documentation
📄 README.md            - Project overview

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TROUBLESHOOTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ "Invalid credentials" → Use App Password, NOT regular password
❌ "Email not received" → Check spam folder, wait 5 minutes
❌ "Rate limit exceeded" → Free tier limits apply
❌ "CORS error" → Use no-cors mode or backend proxy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 NEXT STEPS:
1. Choose your preferred method above
2. Follow the setup steps
3. Update the configuration in index.html
4. Test by submitting the form
5. Check your email for the confirmation!

Need help? Open SETUP.html in your browser for a visual guide.

""")

# Save to file
with open('setup_guide.txt', 'w', encoding='utf-8') as f:
    f.write("""
TRAINNEE FORM EMAIL SETUP
=========================

STEP 1: GET GMAIL APP PASSWORD
--------------------------------
1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication if not already
3. Click "Create app password"
4. Select: Mail → Other (Custom)
5. Name: "Trainee Form"
6. Copy the 16-character password

STEP 2: CHOOSE EMAIL METHOD
----------------------------
Option A: EmailJS (Recommended for GitHub Pages)
- Sign up: https://www.emailjs.com/
- Free: 200 emails/month
- No backend needed

Option B: Google Apps Script (Free, Unlimited)
- Go to: https://script.google.com/
- Create web app
- Unlimited emails
- Serverless

Option C: Python Backend (Full Control)
- Send PDF attachments
- 500 emails/day (Gmail free limit)
- Requires hosting (PythonAnywhere free tier)

STEP 3: UPDATE CONFIGURATION
------------------------------
Edit index.html and update:

const EMAIL_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',      // For EmailJS
    serviceId: 'service_xxxxxxx',      // For EmailJS
    templateId: 'template_xxxxxxx',    // For EmailJS
    // OR for Python backend:
    // smtpHost: 'smtp.gmail.com',
    // smtpPort: 587,
    // smtpUser: 'minjaruli36@gmail.com',
    // smtpPassword: 'YOUR_16_CHAR_PASSWORD'
};

STEP 4: TEST
-------------
1. Open index.html in browser
2. Fill out the form
3. Click "Submit & Send Email"
4. Check your email inbox!

GOOD LUCK! 🚀
""")

print("✅ Setup guide saved to setup_guide.txt")
print("📧 Now follow the steps above to configure email sending!")
