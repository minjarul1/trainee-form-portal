# EmailJS Setup Guide - Trainee Form Portal

## Step 1: Create Account (1 minute)

1. Go to https://www.emailjs.com/
2. Click **"Sign Up Free"**
3. Enter your email and create password
4. Verify your email address

---

## Step 2: Add Email Service (2 minutes)

1. After login, click **"Add New Service"**
2. Select **"Gmail"** from the list
3. Sign in with your Google account (`minjaruli36@gmail.com`)
4. Grant permissions when prompted
5. Note your **Service ID** (looks like: `service_xxxxxxxx`)

---

## Step 3: Create Email Templates (5 minutes)

### Template 1: Admin Notification (For You)

1. Go to **"Email Templates"** → **"Create New Template"**
2. Set:
   - **Template Name**: `Admin Notification`
   - **From Email**: Your Gmail address
   - **To Email**: `minjaruli36@gmail.com` (your email)
   - **Subject**: `New Trainee Registration: {{to_name}}`

3. **Email Body** (HTML):
```html
<h2>📝 New Trainee Registration</h2>
<p><strong>Name:</strong> {{to_name}}</p>
<p><strong>Email:</strong> {{to_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>ID Number:</strong> {{id_number}}</p>
<br>
<p><em>View full submission in splitforms dashboard.</em></p>
```

4. Click **"Advanced"** tab
5. Under **"Attachments"**, select **"Variable Attachment"**
6. Set variable name: `pdf_attachment`
7. Click **"Save Template"**
8. Note your **Template ID** (looks like: `template_xxxxxxxx`)

---

### Template 2: Trainee Confirmation (For User)

1. Go to **"Email Templates"** → **"Create New Template"**
2. Set:
   - **Template Name**: `Trainee Confirmation`
   - **From Email**: Your Gmail address
   - **To Email**: `{{to_email}}` (from form)
   - **Subject**: `Registration Confirmation - Trainee Portal`

3. **Email Body** (HTML):
```html
<h2>✅ Registration Confirmed</h2>
<p>Hello <strong>{{to_name}}</strong>,</p>
<p>Thank you for registering! We have received your application.</p>
<br>
<p><strong>Your Details:</strong></p>
<ul>
  <li>Email: {{to_email}}</li>
  <li>Phone: {{phone}}</li>
</ul>
<br>
<p>Please find your registration receipt attached as PDF.</p>
<br>
<p><em>Best regards,<br>Trainee Registration Team</em></p>
```

4. Click **"Advanced"** tab
5. Under **"Attachments"**, select **"Variable Attachment"**
6. Set variable name: `pdf_attachment`
7. Click **"Save Template"**
8. Note your **Template ID**

---

## Step 4: Get Public Key (1 minute)

1. Go to **"Account"** → **"General"** tab
2. Scroll to **"Public Key"**
3. Copy it (looks like: `xxxxxxxxxxxxxxxxx`)

---

## Step 5: Summary - What You Need

| Item | Value |
|------|-------|
| **Service ID** | `service_xxxxxxxx` |
| **Admin Template ID** | `template_xxxxxxxx` |
| **Trainee Template ID** | `template_xxxxxxxx` |
| **Public Key** | `xxxxxxxxxxxxxxxxx` |

---

## Step 6: Add to Your Form

Once you have the IDs, I'll add this code to your `index.html`:

```html
<!-- Add this in <head> -->
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script>
  (function() {
    emailjs.init("YOUR_PUBLIC_KEY");
  })();
</script>
```

And modify the submit function to send emails with PDF attachment.

---

## Free Plan Limits

- ✅ **200 emails/month** (enough for 200 trainees)
- ✅ **2 templates** (perfect for admin + trainee)
- ✅ **File attachments** (PDF up to ~2MB)
- ✅ **No credit card required**
- ✅ **Works forever** (free tier never expires)

---

## Next Steps

1. Complete steps 1-4 above
2. Share your Service ID, Template IDs, and Public Key
3. I'll add the EmailJS code to your form
4. Test and deploy! 🚀
