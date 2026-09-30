# EmailJS Integration - Setup Complete!

## ✅ What's Done

1. **EmailJS SDK added** to `index.html`
2. **Email configuration** set up with your credentials
3. **PDF generation** integrated before sending emails
4. **Dual email system**:
   - Admin notification → minjaruli36@gmail.com
   - Trainee confirmation → User's email

## 📧 Email Templates Needed

Create these 2 templates in EmailJS dashboard:

### Template 1: Admin Notification
- **Template ID:** `template_4m3zg8m`
- **To:** minjaruli36@gmail.com
- **Subject:** `New Trainee Registration: {{to_name}}`
- **Variables:** `to_name`, `to_email`, `phone`, `id_number`, `pdf_attachment`

### Template 2: Trainee Confirmation  
- **Template ID:** `template_nibmvdf`
- **To:** `{{to_email}}` (user's email)
- **Subject:** `Registration Confirmation - Trainee Portal`
- **Variables:** `to_name`, `to_email`, `phone`, `id_number`, `pdf_attachment`

## 🔧 How It Works

```
User fills form → Clicks Submit
    ↓
splitforms saves data
    ↓
PDF generated from preview
    ↓
Email sent to admin (with PDF)
    ↓
Email sent to trainee (with PDF)
    ↓
Success message shown
```

## 🧪 Test Steps

1. Open your form: https://minjarul1.github.io/trainee-form-portal/
2. Fill out all required fields
3. Go to Preview section
4. Click **"Submit & Send Email"**
5. Check console for logs
6. Check your email (minjaruli36@gmail.com)
7. Check trainee email (if provided)

## 📊 Free Plan Limits

- 200 emails/month
- 2MB max attachment per email
- 2 templates (you're using both)

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid template ID" | Check template IDs in EmailJS dashboard |
| "Service not found" | Verify Service ID is correct |
| PDF not attaching | Check "Variable Attachment" in template settings |
| Email not sent | Check browser console for errors |
| Gmail blocked | Use App Password, not regular password |

## 📁 Files Modified

- `index.html` - Added EmailJS integration

## Next Steps

1. Create the 2 email templates in EmailJS
2. Test with a real submission
3. Check if PDFs are attaching correctly
4. Adjust template designs if needed

---

**Questions?** Check browser console (F12) for detailed logs!
