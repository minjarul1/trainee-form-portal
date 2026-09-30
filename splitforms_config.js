/**
 * splitforms Integration - Trainee Form Portal
 * Access Key: 33b74c40648c42308bd9f449d629f031
 */

// ===== CONFIGURATION =====
const SPLITFORMS_CONFIG = {
    accessKey: '33b74c40648c42308bd9f449d629f031',  // Your access key
    endpoint: 'https://splitforms.com/api/submit'
};

/**
 * Submit trainee form data to splitforms
 */
async function submitToSplitForms(formData) {
    console.log('📤 Submitting to splitforms...');
    
    try {
        const payload = {
            // Required for spam protection
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
            'Mother Name (English)': formData['mother-name-en'] || '—',
            'Mother Name (Bangla)': formData['mother-name-bn'] || '—',
            'Mother Occupation': formData['mother-occupation'] || '—',
            'Household Members': formData['household-members'] || '—',
            'Monthly Income': formData['monthly-income'] || '—',
            'Daily Income': formData['daily-income'] || '—',
            
            // Education
            'Education Level': formData['education-level'] || '—',
            'Institution Name': formData['institution-name'] || '—',
            'Passing Year': formData['passing-year'] || '—',
            'Grade/CGPA': formData['grade-cgpa'] || '—',
            
            // Employment
            'Employment Status': formData['employment-status'] || '—',
            'Organization': formData['org-name'] || '—',
            'Designation': formData['designation'] || '—',
            'Salary': formData['salary'] || '—',
            
            // Training
            'Training Program': formData['training-program'] || '—',
            'Start Date': formData['training-start-date'] || '—',
            'Training Source': formData['training-source'] || '—',
            
            // Bank Info
            'Has Bank Account': formData['has-bank-account'] || 'No',
            'Bank Name': formData['bank-name'] || '—',
            
            // Notes
            'Notes': formData['notes'] || '—'
        };
        
        // Submit to splitforms
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
                message: 'Form submitted successfully! Check your email for confirmation.',
                data: result
            };
        } else {
            console.error('❌ splitforms error:', result);
            return {
                success: false,
                message: result.message || 'Failed to submit form',
                error: result
            };
        }
        
    } catch (error) {
        console.error('❌ splitforms submission error:', error);
        return {
            success: false,
            message: `Error: ${error.message}`,
            error: error
        };
    }
}

// Make available globally
window.submitToSplitForms = submitToSplitForms;
