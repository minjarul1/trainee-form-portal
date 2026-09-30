/**
 * splitforms Integration for Trainee Form Portal
 * 
 * splitforms features:
 * ✅ 500-1,000 free submissions/month (vs EmailJS: 200)
 * ✅ No email credentials needed (vs EmailJS: requires Gmail App Password)
 * ✅ Submission dashboard with search & export
 * ✅ AI spam protection built-in
 * ✅ Webhook support
 * ✅ $5/mo for 5,000 subs (vs EmailJS: $11/mo for 1,000)
 */

// ===== splitforms CONFIGURATION =====
const SPLITFORMS_CONFIG = {
    accessKey: 'YOUR_ACCESS_KEY_HERE',  // ← REPLACE WITH YOUR KEY from splitforms.com
    endpoint: 'https://splitforms.com/api/submit'
};

// ===== EMAILJS CONFIGURATION (Fallback) =====
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',  // ← Optional fallback
    serviceId: 'service_trainee_form',
    templateId: 'template_confirmation'
};

/**
 * Submit form to splitforms
 * @param {Object} formData - Collected form data
 * @returns {Promise<Object>} - Submission result
 */
async function submitToSplitForms(formData) {
    console.log('📤 Submitting to splitforms...');
    
    try {
        const payload = {
            // Required fields for spam protection
            access_key: SPLITFORMS_CONFIG.accessKey,
            form_loaded_at: Date.now(),
            botcheck: false,
            
            // Email subject
            subject: `New Trainee Registration: ${formData['full-name-en'] || formData['full-name-bn']}`,
            
            // Personal Information
            'Full Name (English)': formData['full-name-en'] || '—',
            'Full Name (Bangla)': formData['full-name-bn'] || '—',
            'Date of Birth': formData['dob'] || '—',
            'Gender': formData['gender'] || '—',
            'Nationality': formData['nationality'] || 'Bangladeshi',
            'Religion': formData['religion'] || '—',
            'ID Type': formData['id-type'] || '—',
            'ID Number': formData['id-number'] || '—',
            'PWD Status': formData['pwd'] || 'No',
            'Marital Status': formData['marital-status'] || '—',
            
            // Contact Information
            'Email': formData['email'] || '—',
            'Phone': formData['contact'] || '—',
            'WeChat/QQ': formData['wechat-qq'] || '—',
            
            // Permanent Address
            'Permanent District': formData['perm-district'] || '—',
            'Permanent Division': formData['perm-division'] || '—',
            'Permanent Upazila': formData['perm-upazila'] || '—',
            'Permanent Post Office': formData['perm-post-office'] || '—',
            'Permanent Post Code': formData['perm-post-code'] || '—',
            'Permanent Address': formData['perm-address'] || '—',
            
            // Present Address
            'Present Same as Permanent': formData['same-address'] || 'Yes',
            'Present District': formData['pres-district'] || '—',
            'Present Division': formData['pres-division'] || '—',
            'Present Upazila': formData['pres-upazila'] || '—',
            'Present Post Office': formData['pres-post-office'] || '—',
            'Present Post Code': formData['pres-post-code'] || '—',
            'Present Address': formData['pres-address'] || '—',
            
            // Family Information
            'Father Name (English)': formData['father-name-en'] || '—',
            'Father Name (Bangla)': formData['father-name-bn'] || '—',
            'Father Occupation': formData['father-occupation'] || '—',
            'Father Monthly Income': formData['father-income'] || '—',
            'Mother Name (English)': formData['mother-name-en'] || '—',
            'Mother Name (Bangla)': formData['mother-name-bn'] || '—',
            'Mother Occupation': formData['mother-occupation'] || '—',
            'Household Members': formData['household-members'] || '—',
            'Monthly Household Income': formData['monthly-income'] || '—',
            'Daily Income per Member': formData['daily-income'] || '—',
            
            // Education
            'Education Level': formData['education-level'] || '—',
            'Institution Name': formData['institution-name'] || '—',
            'Passing Year': formData['passing-year'] || '—',
            'Grade/CGPA': formData['grade-cgpa'] || '—',
            'Subjects': formData['subjects'] || '—',
            
            // Employment
            'Employment Status': formData['employment-status'] || '—',
            'Organization Name': formData['org-name'] || '—',
            'Designation': formData['designation'] || '—',
            'Years of Experience': formData['years-exp'] || '—',
            'Monthly Salary': formData['salary'] || '—',
            
            // Training Information
            'Training Program': formData['training-program'] || '—',
            'Training Start Date': formData['training-start-date'] || '—',
            'Training End Date': formData['training-end-date'] || '—',
            'Training Source': formData['training-source'] || '—',
            'Financial Support': formData['financial-support'] || '—',
            
            // Bank Information
            'Has Bank Account': formData['has-bank-account'] || 'No',
            'Bank Name': formData['bank-name'] || '—',
            'Account Number': formData['account-number'] || '—',
            'Account Holder': formData['account-holder'] || '—',
            
            // Additional Notes
            'Additional Notes': formData['notes'] || '—'
        };
        
        // Send to splitforms
        const response = await fetch(SPLITFORMS_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ splitforms submission successful:', result);
            return {
                success: true,
                message: result.message || 'Form submitted successfully!',
                submissionId: result.id || null,
                data: result
            };
        } else {
            console.error('❌ splitforms submission failed:', result);
            return {
                success: false,
                message: result.message || 'Failed to submit form',
                error: result
            };
        }
        
    } catch (error) {
        console.error('❌ splitforms error:', error);
        return {
            success: false,
            message: `Error: ${error.message}`,
            error: error
        };
    }
}

/**
 * Fallback: Submit via EmailJS (if splitforms fails)
 */
async function submitViaEmailJS(formData) {
    console.log('📧 Trying EmailJS fallback...');
    
    try {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS SDK not loaded');
        }
        
        emailjs.init(EMAILJS_CONFIG.publicKey);
        
        const templateParams = {
            to_email: formData['email'],
            to_name: formData['full-name-en'] || formData['full-name-bn'],
            from_name: 'Trainee Registration System',
            subject: 'Trainee Registration Confirmation',
            message: `Thank you ${formData['full-name-en']} for registering!`
        };
        
        const result = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        return { success: true, message: 'Email sent via EmailJS' };
        
    } catch (error) {
        console.error('❌ EmailJS error:', error);
        return { success: false, message: error.text || 'EmailJS failed' };
    }
}

/**
 * Main submit function - tries splitforms first, falls back to EmailJS
 */
async function submitForm() {
    // Show loading state
    const loadingEl = document.getElementById('loading');
    const statusEl = document.getElementById('email-status');
    
    if (loadingEl) loadingEl.classList.add('active');
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.innerHTML = '⏳ Submitting...';
        statusEl.className = 'email-status';
    }
    
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Validate required fields
        if (!formData['email']) {
            throw new Error('❌ Email is required!');
        }
        
        if (!formData['full-name-en'] && !formData['full-name-bn']) {
            throw new Error('❌ Name is required!');
        }
        
        console.log('📋 Form data validated');
        
        // Try splitforms first
        let result = null;
        
        if (SPLITFORMS_CONFIG.accessKey !== 'YOUR_ACCESS_KEY_HERE') {
            console.log('🚀 Attempting splitforms submission...');
            result = await submitToSplitForms(formData);
            
            if (result.success) {
                console.log('✅ splitforms succeeded');
            } else {
                console.warn('⚠️ splitforms failed, trying fallback...');
            }
        } else {
            console.warn('⚠️ splitforms not configured, using simulation');
            await new Promise(resolve => setTimeout(resolve, 1000));
            result = {
                success: true,
                message: 'Form submitted (demo mode - configure splitforms for production)'
            };
        }
        
        // Fallback to EmailJS if splitforms failed
        if (!result.success && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
            console.log('📧 Falling back to EmailJS...');
            result = await submitViaEmailJS(formData);
        }
        
        // Generate PDF
        await generatePDF(formData);
        
        // Show result
        if (statusEl) {
            if (result.success) {
                statusEl.innerHTML = `✅ <strong>Success!</strong> ${result.message}`;
                statusEl.className = 'email-status success';
            } else {
                statusEl.innerHTML = `❌ <strong>Error:</strong> ${result.message}`;
                statusEl.className = 'email-status error';
            }
        }
        
        return result;
        
    } catch (error) {
        console.error('❌ Submission error:', error);
        
        if (statusEl) {
            statusEl.innerHTML = `❌ <strong>Error:</strong> ${error.message}`;
            statusEl.className = 'email-status error';
        }
        
        throw error;
        
    } finally {
        if (loadingEl) loadingEl.classList.remove('active');
    }
}

/**
 * Helper: Generate PDF from form data
 */
async function generatePDF(formData) {
    console.log('📄 Generating PDF...');
    
    // Call existing PDF generation function
    if (typeof exportPDF === 'function') {
        exportPDF();
    }
}

// Export functions for global use
window.submitToSplitForms = submitToSplitForms;
window.submitViaEmailJS = submitViaEmailJS;

// Update the existing submitForm to use our new function
// The HTML button should call: onclick="submitForm()"
