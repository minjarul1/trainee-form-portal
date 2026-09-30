/**
 * splitforms Integration - Fixed Version
 * Access Key: 33b74c40648c42308bd9f449d629f031
 */

// ===== CONFIGURATION =====
const SPLITFORMS_CONFIG = {
    accessKey: '33b74c40648c42308bd9f449d629f031',
    endpoint: 'https://splitforms.com/api/submit'
};

/**
 * Submit form data to splitforms
 * @param {Object} formData - Collected form data
 * @returns {Promise<Object>} - Result object with success status
 */
async function submitToSplitForms(formData) {
    console.log('📤 Splitforms: Starting submission...');
    
    try {
        // Build payload with all form fields
        const payload = {
            // Required for spam protection
            access_key: SPLITFORMS_CONFIG.accessKey,
            form_loaded_at: Date.now(),
            botcheck: false,
            
            // Email subject
            subject: `New Trainee Registration: ${formData['full-name-en'] || formData['full-name-bn']}`,
            
            // Personal Information
            'Full Name (English)': formData['full-name-en'] || '',
            'Full Name (Bangla)': formData['full-name-bn'] || '',
            'Date of Birth': formData['dob'] || '',
            'Gender': formData['gender'] || '',
            'Nationality': formData['nationality'] || 'Bangladeshi',
            'Religion': formData['religion'] || '',
            'ID Type': formData['id-type'] || '',
            'ID Number': formData['id-number'] || '',
            'PWD Status': formData['pwd'] || 'No',
            'Marital Status': formData['marital-status'] || '',
            
            // Contact Information
            'Email': formData['email'] || '',
            'Phone': formData['contact'] || '',
            'WeChat/QQ': formData['wechat-qq'] || '',
            
            // Permanent Address
            'Permanent District': formData['perm-district'] || '',
            'Permanent Division': formData['perm-division'] || '',
            'Permanent Upazila': formData['perm-upazila'] || '',
            'Permanent Post Office': formData['perm-post-office'] || '',
            'Permanent Post Code': formData['perm-post-code'] || '',
            'Permanent Address': formData['perm-address'] || '',
            
            // Present Address
            'Present Same as Permanent': formData['same-address'] === 'on' ? 'Yes' : 'No',
            'Present District': formData['pres-district'] || '',
            'Present Division': formData['pres-division'] || '',
            'Present Upazila': formData['pres-upazila'] || '',
            'Present Post Office': formData['pres-post-office'] || '',
            'Present Post Code': formData['pres-post-code'] || '',
            'Present Address': formData['pres-address'] || '',
            
            // Family Information
            'Father Name (English)': formData['father-name-en'] || '',
            'Father Name (Bangla)': formData['father-name-bn'] || '',
            'Father Occupation': formData['father-occupation'] || '',
            'Mother Name (English)': formData['mother-name-en'] || '',
            'Mother Name (Bangla)': formData['mother-name-bn'] || '',
            'Mother Occupation': formData['mother-occupation'] || '',
            'Household Members': formData['household-members'] || '',
            'Monthly Household Income': formData['monthly-income'] || '',
            'Daily Income per Member': formData['daily-income'] || '',
            
            // Education
            'Education Level': formData['education-level'] || '',
            'Institution Name': formData['institution-name'] || '',
            'Passing Year': formData['passing-year'] || '',
            'Grade/CGPA': formData['grade-cgpa'] || '',
            
            // Employment
            'Employment Status': formData['employment-status'] || '',
            'Organization Name': formData['org-name'] || '',
            'Designation': formData['designation'] || '',
            'Years of Experience': formData['years-exp'] || '',
            'Monthly Salary': formData['salary'] || '',
            
            // Training Information
            'Training Program': formData['training-program'] || '',
            'Training Start Date': formData['training-start-date'] || '',
            'Training End Date': formData['training-end-date'] || '',
            'Training Source': formData['training-source'] || '',
            
            // Bank Information
            'Has Bank Account': formData['has-bank-account'] || 'No',
            'Bank Name': formData['bank-name'] || '',
            'Account Number': formData['account-number'] || '',
            'Account Holder': formData['account-holder'] || '',
            
            // Additional Notes
            'Notes': formData['notes'] || ''
        };
        
        console.log('📤 Splitforms: Sending payload...', payload);
        
        // Submit to splitforms API
        const response = await fetch(SPLITFORMS_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        console.log('📥 Splitforms: Response status:', response.status);
        
        const result = await response.json();
        console.log('📥 Splitforms: Response data:', result);
        
        if (result.success) {
            console.log('✅ Splitforms: Submission successful!');
            return {
                success: true,
                message: 'Form submitted successfully! You will receive a confirmation email shortly.',
                data: result
            };
        } else {
            console.error('❌ Splitforms: Submission failed:', result);
            return {
                success: false,
                message: result.message || 'Failed to submit form. Please try again.',
                error: result
            };
        }
        
    } catch (error) {
        console.error('❌ Splitforms: Exception occurred:', error);
        return {
            success: false,
            message: `Error: ${error.message}`,
            error: error
        };
    }
}

/**
 * Main submit function - handles the entire submission flow
 */
async function submitForm() {
    console.log('🚀 Form submission started...');
    
    // Show loading state
    const loadingEl = document.getElementById('loading');
    const statusEl = document.getElementById('email-status');
    
    if (loadingEl) {
        loadingEl.style.display = 'flex';
        loadingEl.classList.add('active');
    }
    
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.innerHTML = '⏳ Submitting your registration...';
        statusEl.className = 'email-status';
    }
    
    try {
        // Collect form data
        console.log('📋 Collecting form data...');
        const formData = collectFormData();
        console.log('✅ Form data collected:', formData);
        
        // Validate required fields
        if (!formData['email']) {
            throw new Error('Email is required!');
        }
        
        if (!formData['full-name-en'] && !formData['full-name-bn']) {
            throw new Error('Name is required!');
        }
        
        console.log('✅ Validation passed');
        
        // Submit to splitforms
        console.log('📤 Calling splitforms API...');
        const result = await submitToSplitForms(formData);
        console.log('📥 Splitforms result:', result);
        
        // Generate PDF
        console.log('📄 Generating PDF...');
        if (typeof exportPDF === 'function') {
            exportPDF();
        }
        
        // Show result
        if (statusEl) {
            if (result.success) {
                statusEl.innerHTML = `✅ <strong>Success!</strong> ${result.message}`;
                statusEl.className = 'email-status success';
                console.log('🎉 Form submitted successfully!');
            } else {
                statusEl.innerHTML = `❌ <strong>Error:</strong> ${result.message}`;
                statusEl.className = 'email-status error';
                console.error('❌ Submission failed:', result);
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
        // Hide loading
        if (loadingEl) {
            loadingEl.style.display = 'none';
            loadingEl.classList.remove('active');
        }
    }
}

// Make functions globally available
window.submitToSplitForms = submitToSplitForms;
window.submitForm = submitForm;

console.log('✅ splitforms integration loaded');
console.log('🔑 Access key:', SPLITFORMS_CONFIG.accessKey);
console.log('🌐 Endpoint:', SPLITFORMS_CONFIG.endpoint);
