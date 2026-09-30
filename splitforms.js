/**
 * splitforms Integration for Trainee Form Portal
 * Access Key: 33b74c40648c42308bd9f449d629f031
 */

// ===== CONFIGURATION =====
const SPLITFORMS_CONFIG = {
    accessKey: '33b74c40648c42308bd9f449d629f031',
    endpoint: 'https://splitforms.com/api/submit'
};

/**
 * Submit form data to splitforms
 */
async function submitToSplitForms(formData) {
    console.log('📤 Submitting to splitforms...');
    
    try {
        const payload = {
            access_key: SPLITFORMS_CONFIG.accessKey,
            form_loaded_at: Date.now(),
            botcheck: false,
            subject: `New Trainee Registration: ${formData['full-name-en'] || formData['full-name-bn']}`,
            
            // Personal Info
            'Full Name (EN)': formData['full-name-en'] || '—',
            'Full Name (BN)': formData['full-name-bn'] || '—',
            'Date of Birth': formData['dob'] || '—',
            'Gender': formData['gender'] || '—',
            'Nationality': formData['nationality'] || 'Bangladeshi',
            'Religion': formData['religion'] || '—',
            'ID Type': formData['id-type'] || '—',
            'ID Number': formData['id-number'] || '—',
            'PWD': formData['pwd'] || 'No',
            'Marital Status': formData['marital-status'] || '—',
            
            // Contact
            'Email': formData['email'] || '—',
            'Phone': formData['contact'] || '—',
            'WeChat/QQ': formData['wechat-qq'] || '—',
            
            // Address
            'Perm District': formData['perm-district'] || '—',
            'Perm Division': formData['perm-division'] || '—',
            'Perm Upazila': formData['perm-upazila'] || '—',
            'Perm Address': formData['perm-address'] || '—',
            'Pres District': formData['pres-district'] || '—',
            'Pres Division': formData['pres-division'] || '—',
            'Pres Address': formData['pres-address'] || '—',
            
            // Family
            'Father Name': formData['father-name-en'] || '—',
            'Mother Name': formData['mother-name-en'] || '—',
            'Monthly Income': formData['monthly-income'] || '—',
            'Household Members': formData['household-members'] || '—',
            
            // Education
            'Education Level': formData['education-level'] || '—',
            'Institution': formData['institution-name'] || '—',
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
            
            // Bank
            'Has Bank Account': formData['has-bank-account'] || 'No',
            'Bank Name': formData['bank-name'] || '—',
            'Account Number': formData['account-number'] || '—',
            
            // Notes
            'Notes': formData['notes'] || '—'
        };
        
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
            console.log('✅ splitforms success:', result);
            return {
                success: true,
                message: 'Form submitted! Check your email for confirmation.',
                data: result
            };
        } else {
            console.error('❌ splitforms error:', result);
            return {
                success: false,
                message: result.message || 'Submission failed',
                error: result
            };
        }
        
    } catch (error) {
        console.error('❌ splitforms exception:', error);
        return {
            success: false,
            message: `Error: ${error.message}`,
            error: error
        };
    }
}

// Make globally available
window.submitToSplitForms = submitToSplitForms;
window.SPLITFORMS_CONFIG = SPLITFORMS_CONFIG;
