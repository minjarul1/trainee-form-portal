# 🧪 QUICK TEST GUIDE - Trainee Form with splitforms

## ✅ Your Form is Ready!

Access Key: `33b74c40648c42308bd9f449d629f031`

---

## 📱 Test on Your Phone/Computer

### Step 1: Open the Form
```
http://localhost:8080/index.html
```
OR if deployed to GitHub Pages:
```
https://minjarul1.github.io/trainee-form-portal/index.html
```

### Step 2: Fill Out Basic Fields
- Full Name (English): **Test User**
- Email: **your-email@example.com**
- Phone: **+880 1711-104318**
- Training Program: **Python Development**

### Step 3: Click "Submit & Send Email"

### Step 4: Watch for:
- ✅ Loading spinner appears
- ✅ Success message: "Form submitted successfully!"
- ✅ PDF downloads automatically
- 📧 Email notification sent (check inbox)

---

## 🔍 Check Your splitforms Dashboard

1. Go to: https://splitforms.com/login
2. Sign in with your account
3. View submissions - you should see your test entry!

---

## 🐛 Troubleshooting

### If you see errors in browser console (F12):

**Error: "submitToSplitForms is not defined"**
- Solution: Make sure `splitforms.js` is loaded (check line 11 of index.html)

**Error: "401 Unauthorized" or "Invalid access key"**
- Solution: Check your access key matches: `33b74c40648c42308bd9f449d629f031`

**Error: "NetworkError" or "CORS"**
- Solution: Use a local server or deploy to GitHub Pages
- Run: `python3 -m http.server 8080`

### If PDF doesn't generate:
- Check if html2pdf.js is loaded (line 10 of index.html)
- Allow popups in your browser

### If email not received:
- Check spam folder
- splitforms sends emails within 1-2 minutes
- Verify your email in splitforms dashboard

---

## 📊 What Gets Saved

When you submit, splitforms stores:
- ✅ All form fields (name, email, address, etc.)
- ✅ Timestamp
- ✅ IP address
- ✅ User agent
- ✅ Spam score
- ✅ Email notifications sent

---

## 🎯 Success Indicators

You'll know it's working when you see:

1. **Console logs:**
   ```
   📤 Splitforms: Starting submission...
   ✅ Splitforms: Submission successful!
   🎉 Form submitted successfully!
   ```

2. **On-screen message:**
   ```
   ✅ Success! Form submitted successfully!
   You will receive a confirmation email shortly.
   ```

3. **In splitforms dashboard:**
   - New submission appears
   - All form data visible
   - Email notification sent

---

## 🚀 Deploy to GitHub Pages (Optional)

Want others to use this form?

1. Go to: https://github.com/minjarul1/trainee-form-portal/settings/pages
2. Source: **Deploy from a branch**
3. Branch: **master** → **/(root)**
4. Click **Save**
5. Wait 2 minutes
6. Your form is live at: https://minjarul1.github.io/trainee-form-portal/

---

## 📞 Need Help?

Check these files:
- `TEST_GUIDE.html` - Detailed test instructions
- `WORKING_STATUS.md` - Complete documentation
- Browser console (F12) - For debug logs

**Test it now and tell me if it works!** 🎉
