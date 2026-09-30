// ===== EMAIL CONFIGURATION - REPLACE WITH YOUR CREDENTIALS =====
const EMAIL_CONFIG = {
    // EmailJS Settings (get from https://www.emailjs.com/)
    publicKey: 'YOUR_PUBLIC_KEY_HERE',          // ← REPLACE THIS
    serviceId: 'service_trainee_form',          // ← REPLACE THIS
    templateId: 'template_confirmation',        // ← REPLACE THIS
    
    // Fallback: Direct SMTP (requires backend)
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'minjaruli36@gmail.com',
            pass: 'YOUR_16_CHAR_APP_PASSWORD'   // ← REPLACE THIS with your app password
        }
    }
};

// ===== EMAIL SENDING FUNCTIONS =====

/**
 * Send email via EmailJS (Recommended for GitHub Pages)
 */
async function sendEmailViaEmailJS(formData) {
    try {
        // Check if EmailJS SDK is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS SDK not loaded! Add this to your HTML:');
            console.log('<script src="https://cdn.emailjs.com/dist/email.min.js"><\/script>');
            return { success: false, message: 'EmailJS SDK not found' };
        }
        
        // Initialize EmailJS
        emailjs.init(EMAIL_CONFIG.publicKey);
        
        // Prepare template parameters
        const templateParams = {
            to_email: formData['email'],
            to_name: formData['full-name-en'] || formData['full-name-bn'],
            from_name: 'Trainee Registration System',
            subject: 'Trainee Registration Confirmation - ' + (formData['full-name-en'] || 'New Registration'),
            message: buildConfirmationMessage(formData),
            training_program: formData['training-program'] || 'N/A',
            contact: formData['contact'] || 'N/A',
            email: formData['email'] || 'N/A',
            date: new Date().toLocaleDateString('zh-CN')
        };
        
        // Send email
        const result = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams
        );
        
        console.log('Email sent successfully:', result);
        return { 
            success: true, 
            message: `✅ Confirmation email sent to ${formData['email']}`,
            messageId: result.text || result.messageId
        };
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        return { 
            success: false, 
            message: `❌ Email failed: ${error.text || error.message}` 
        };
    }
}

/**
 * Build email confirmation message
 */
function buildConfirmationMessage(formData) {
    return `
Hello ${formData['full-name-en'] || formData['full-name-bn']},

Thank you for registering for the Trainee Program!

Your registration details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Personal Information:
   • Name (English): ${formData['full-name-en'] || '—'}
   • Name (Bangla): ${formData['full-name-bn'] || '—'}
   • Date of Birth: ${formData['dob'] || '—'}
   • Gender: ${formData['gender'] || '—'}
   • ID Type: ${formData['id-type'] || '—'}
   • ID Number: ${formData['id-number'] || '—'}

📞 Contact Information:
   • Email: ${formData['email'] || '—'}
   • Phone: ${formData['contact'] || '—'}
   • WeChat/QQ: ${formData['wechat-qq'] || '—'}

🏠 Address:
   • District: ${formData['perm-district'] || '—'}
   • Division: ${formData['perm-division'] || '—'}

📚 Training Information:
   • Training Program: ${formData['training-program'] || '—'}
   • Training Start Date: ${formData['training-start-date'] || '—'}
   • Training Source: ${formData['training-source'] || '—'}

👨‍👩‍👧 Family Information:
   • Father Name: ${formData['father-name-en'] || '—'}
   • Mother Name: ${formData['mother-name-en'] || '—'}
   • Monthly Income: ${formData['monthly-income'] || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Your registration has been received successfully!

We will review your application and contact you within 3-5 business days.

Best regards,
Trainee Registration Team
ISISIC-ASSET Project
    `.trim();
}

/**
 * Send email via direct SMTP (requires backend or CORS proxy)
 */
async function sendEmailViaSMTP(formData, pdfBlob = null) {
    try {
        // This requires a backend server with Python/Node.js
        // For now, we'll use EmailJS as the primary method
        
        // Example: Send to backend API
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                toEmail: formData['email'],
                toName: formData['full-name-en'],
                formData: formData,
                pdf: pdfBlob ? await blobToBase64(pdfBlob) : null
            })
        });
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('SMTP Error:', error);
        return { success: false, message: error.message };
    }
}

/**
 * Convert Blob to Base64 (for PDF attachment)
 */
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Main email sending function
 */
async function sendConfirmationEmail(formData, pdfBlob = null) {
    console.log('Sending confirmation email...');
    
    // Try EmailJS first (recommended for GitHub Pages)
    const result = await sendEmailViaEmailJS(formData);
    
    if (result.success) {
        console.log('✅ Email sent via EmailJS:', result.message);
        return result;
    }
    
    // Fallback: Try SMTP (if configured)
    console.warn('EmailJS failed, trying SMTP fallback...');
    const smtpResult = await sendEmailViaSMTP(formData, pdfBlob);
    
    return smtpResult;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sendConfirmationEmail, buildConfirmationMessage };
}
