# Trainee Form Email Setup Guide

## Choose Your Email Method

### Option 1: EmailJS (Easiest - Recommended for GitHub Pages) ✅

**Best for:** Static sites on GitHub Pages, no backend needed

**Setup Steps:**

1. **Sign up at** https://www.emailjs.com/ (free: 200 emails/month)
2. **Add Email Service:**
   - Click "Add New Service"
   - Select "Gmail"
   - Connect your Google account
   - Note your **Service ID**
3. **Create Email Template:**
   - Go to "Email Templates" → "Create New Template"
   - Design your confirmation email
   - Use variables: `{{to_email}}`, `{{to_name}}`, `{{message}}`
   - Note your **Template ID**
4. **Get Public Key:**
   - Go to "Account" → "General" tab
   - Copy your **Public Key**
5. **Update Code:**
   ```javascript
   const EMAIL_SERVICE = {
       serviceId: 'service_xxxxxxx',  // Your EmailJS service ID
       templateId: 'template_xxxxxxx', // Your template ID
       publicKey: 'xxxxxxxxxxxxxxxxx', // Your public key
   };
   ```
6. **Add SDK to HTML:**
   ```html
   <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
   <script>
       emailjs.init("YOUR_PUBLIC_KEY");
   </script>
   ```

---

### Option 2: Google Apps Script (Free, No Backend)

**Best for:** Serverless email sending, integrates with Google Workspace

**Setup Steps:**

1. **Go to** https://script.google.com/
2. **Create New Project**
3. **Paste this code:**
   ```javascript
   function doPost(e) {
     var data = JSON.parse(e.postData.contents);
     
     var email = data.toEmail;
     var name = data.toName;
     
     var subject = "Trainee Registration Confirmation";
     var message = "Hello " + name + ",\n\n" +
                   "Thank you for registering! We have received your application.\n\n" +
                   "Best regards,\nTrainee Form Team";
     
     GmailApp.sendEmail(email, subject, message);
     
     return ContentService.createTextOutput(JSON.stringify({success: true}));
   }
   ```
4. **Deploy as Web App:**
   - Click "Deploy" → "New Deployment"
   - Select type: "Web App"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
5. **Copy the URL** and use in your form
6. **Add to JavaScript:**
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```

---

### Option 3: Python Backend with Gmail SMTP

**Best for:** Full control, sending PDF attachments

**Setup Steps:**

1. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Create app password for "Mail"
   - Copy the 16-character password

2. **Create Backend File (`backend.py`):**
   ```python
   from flask import Flask, request, jsonify
   import smtplib
   from email.mime.multipart import MIMEMultipart
   from email.mime.text import MIMEText
   from email.mime.base import MIMEBase
   from email import encoders
   
   app = Flask(__name__)
   
   GMAIL_EMAIL = 'minjaruli36@gmail.com'
   GMAIL_PASSWORD = 'your_16_char_app_password'
   
   @app.route('/api/send-email', methods=['POST'])
   def send_email():
       data = request.json
       
       msg = MIMEMultipart()
       msg['From'] = GMAIL_EMAIL
       msg['To'] = data['toEmail']
       msg['Subject'] = 'Trainee Registration Confirmation'
       
       body = f"Hello {data['toName']},\n\nThank you for registering!"
       msg.attach(MIMEText(body, 'plain'))
       
       # Attach PDF if provided
       if 'pdf' in data:
           # Add PDF attachment logic here
           pass
       
       server = smtplib.SMTP('smtp.gmail.com', 587)
       server.starttls()
       server.login(GMAIL_EMAIL, GMAIL_PASSWORD)
       server.send_message(msg)
       server.quit()
       
       return jsonify({'success': True, 'message': 'Email sent!'})
   
   if __name__ == '__main__':
       app.run(port=5000)
   ```

3. **Deploy to PythonAnywhere** (free) or **Render** (free)

---

## Quick Test

After setup, test your email:
1. Open `index.html` in browser
2. Fill out the form with your email
3. Click "Submit & Send Email"
4. Check your inbox (and spam folder)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Use App Password, not regular password |
| Email not received | Check spam folder, wait 5 minutes |
| Rate limit exceeded | Free tier limits apply (200/month for EmailJS) |
| CORS error | Use `no-cors` mode or backend proxy |

---

## Which Option Should You Use?

- **Beginner?** → Use **EmailJS** (Option 1)
- **Already using Google Workspace?** → Use **Apps Script** (Option 2)
- **Need PDF attachments?** → Use **Python Backend** (Option 3)

---

**Need help?** Reply with your chosen method and I'll guide you through! 🚀
