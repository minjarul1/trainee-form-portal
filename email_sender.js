/**
 * Gmail SMTP Email Sender
 * Uses EmailJS or direct SMTP via backend
 */

// ===== EMAIL CONFIGURATION =====
// ⚠️ For production, use a backend service. This is a frontend demo.
// For actual email sending, you need one of these options:
// 
// Option 1: Use EmailJS (easiest, free tier)
// Option 2: Use a backend server with Python/Node.js SMTP
// Option 3: Use Google Apps Script (free, serverless)

const EMAIL_SERVICE = {
    // For frontend-only: use EmailJS (recommended for this form)
    type: 'emailjs',  // or 'smtp' for backend
    
    // EmailJS Configuration (get these from https://www.emailjs.com/)
    emailjs: {
        serviceId: 'service_trainee_form',  // Replace with your EmailJS service ID
        templateId: 'template_confirmation', // Replace with your EmailJS template ID
        publicKey: 'YOUR_PUBLIC_KEY',         // Replace with your EmailJS public key
    },
    
    // Backend SMTP Configuration (if using a backend)
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'minjaruli36@gmail.com',  // Your Gmail
            pass: 'YOUR_APP_PASSWORD',       // Your 16-char App Password
        }
    }
};

// ===== EMAIL SENDING FUNCTIONS =====

// Method 1: Using EmailJS (Recommended for GitHub Pages)
async function sendEmailViaEmailJS(formData) {
    try {
        // This requires EmailJS SDK to be loaded in HTML
        // <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
        
        const templateParams = {
            to_email: formData['email'],
            to_name: formData['full-name-en'],
            subject: 'Trainee Registration Confirmation',
            message: `Thank you ${formData['full-name-en']} for registering!`,
            training_program: formData['training-program'] || 'N/A',
            contact: formData['contact'] || 'N/A',
        };
        
        // Send via EmailJS
        await emailjs.send(
            EMAIL_SERVICE.emailjs.serviceId,
            EMAIL_SERVICE.emailjs.templateId,
            templateParams,
            EMAIL_SERVICE.emailjs.publicKey
        );
        
        return { success: true, message: 'Email sent successfully!' };
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        return { success: false, message: error.text || 'Failed to send email' };
    }
}

// Method 2: Using Backend API (Python/Node.js)
async function sendEmailViaBackend(formData, pdfBlob) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                toEmail: formData['email'],
                toName: formData['full-name-en'],
                formData: formData,
                pdf: pdfBlob  // Send PDF as base64 or blob
            })
        });
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('Backend Error:', error);
        return { success: false, message: error.message };
    }
}

// Method 3: Using Google Apps Script (Free, no backend needed!)
async function sendEmailViaAppsScript(formData) {
    try {
        const scriptUrl = 'YOUR_APPS_SCRIPT_URL'; // Replace with your Google Apps Script URL
        
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires this
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                toEmail: formData['email'],
                toName: formData['full-name-en'],
                data: formData
            })
        });
        
        return { success: true, message: 'Email sent via Google Apps Script!' };
        
    } catch (error) {
        console.error('Apps Script Error:', error);
        return { success: false, message: error.message };
    }
}
