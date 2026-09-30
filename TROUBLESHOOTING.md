# 🔧 Troubleshooting Guide - Form Not Working

## ✅ splitforms API is Working

I tested the API directly and it's working:
```
📤 Status: 200
📥 Result: {"success": true, "message": "Submission received"}
✅ TEST PASSED!
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Functions Not Defined

**Problem:** `submitForm is not defined` or `submitToSplitForms is not defined`

**Solution:** Make sure splitforms.js is loaded BEFORE the form:
```html
<!-- CORRECT ORDER -->
<script src="splitforms.js"></script>
<!-- Then your form -->
```

**Check:** Line 11 in index.html has `<script src="splitforms.js"></script>` ✅

---

### Issue 2: CORS Error

**Problem:** `Failed to fetch` or CORS error in console

**Solution:** splitforms.com supports CORS, but if you see errors:
1. Clear browser cache
2. Try incognito/private mode
3. Check browser console (F12) for exact error

---

### Issue 3: Access Key Invalid

**Problem:** `Invalid access key` error

**Solution:** 
1. Go to https://splitforms.com/login
2. Verify your access key: `33b74c40648c42308bd9f449d629f031`
3. Check if your account is active

---

### Issue 4: Navigation Buttons Not Working

**Problem:** "Next: Address →" button doesn't work

**Solution:** Already fixed! Added `let currentTab = 'personal';` initialization ✅

---

## 🧪 Test Steps

### Step 1: Open Browser Console
1. Open https://minjarul1.github.io/trainee-form-portal/
2. Press F12 to open Developer Tools
3. Go to **Console** tab

### Step 2: Check If Scripts Loaded
Look for these messages:
```
✅ splitforms integration loaded
🔑 Access key: 33b74c40648c42308bd9f449d629f031
🌐 Endpoint: https://splitforms.com/api/submit
```

If you DON'T see these, the script isn't loading.

### Step 3: Test Functions Manually
In the console, type:
```javascript
typeof submitForm
```
Should return: `"function"`

If it returns `"undefined"`, there's a loading issue.

### Step 4: Test Navigation
1. Click "Next: Address →" button
2. Check console for:
   ```
   🔄 Showing tab: address
   ✅ Section shown: address
   ```

### Step 5: Test Form Submission
1. Fill out required fields (marked with *)
2. Click "Submit & Send Email"
3. Watch console for logs

---

## 📋 Expected Console Output

When everything works:
```
🚀 Form submission started...
📋 Collecting form data...
✅ Form data collected: {...}
✅ Validation passed
📤 Calling splitforms API...
📤 Splitforms: Starting submission...
📤 Splitforms: Sending payload...
📥 Splitforms: Response status: 200
✅ Splitforms: Submission successful!
📄 Generating PDF...
🎉 Form submitted successfully!
```

---

## 🔍 Debug Checklist

- [ ] Browser console shows splitforms loaded messages
- [ ] `typeof submitForm` returns `"function"`
- [ ] `typeof submitToSplitForms` returns `"function"`
- [ ] Navigation buttons show console logs when clicked
- [ ] No CORS errors in console
- [ ] No JavaScript errors in console

---

## 🚀 Quick Fix: Clear Cache

1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Or clear browser cache completely
3. Try again

---

## 📞 Still Not Working?

### Option 1: Check GitHub Pages
1. Go to: https://github.com/minjarul1/trainee-form-portal/settings/pages
2. Check if deployment is successful
3. Look for any errors in the "Pages" section

### Option 2: Use Local Server
```bash
cd /tmp/trainee-form-portal
python3 -m http.server 8080
# Open http://localhost:8080/index.html
```

### Option 3: Check Network Tab
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Click "Submit & Send Email"
4. Look for the POST request to `splitforms.com`
5. Check the response

---

## ✅ What Should Happen

1. User fills form
2. Clicks "Submit & Send Email"
3. Loading spinner appears
4. Console shows submission progress
5. splitforms API returns success
6. Success message appears
7. PDF generates automatically
8. Email notification sent
9. Submission appears in splitforms dashboard

---

## 📧 Email Notifications

Who gets emails:
- **Admin (you):** New submission notification
- **Trainee:** Confirmation email

Check your splitforms dashboard to configure email recipients.

---

**Test now and report what you see in the console!** 🚀
