/**
 * splitforms Integration for Trainee Form
 * 
 * Features:
 * - 500-1,000 free submissions/month
 * - No email credentials needed
 * - Submission dashboard
 * - AI spam protection
 * - Webhook support
 * 
 * Setup:
 * 1. Sign up at https://splitforms.com
 * 2. Get your Access Key
 * 3. Replace 'YOUR_ACCESS_KEY_HERE' below
 */

const SPLITFORMS_CONFIG = {
    accessKey: 'YOUR_ACCESS_KEY_HERE',  // ← REPLACE WITH YOUR KEY
    endpoint: 'https://splitforms.com/api/submit'
};

/**
 * Submit form data to splitforms
 * @param {Object} formData - Form data collected from trainee form
 * @returns {Promise<Object>} - Result with success status
 */
async function submitToSplitForms(formData) {
    console.log('Submitting to splitforms...');
    
    try {
        // Prepare form data for splitforms
        // Map your form fields to splitforms format
        const payload = {
            // Required: Access key
            access_key: SPLITFORMS_CONFIG.accessKey,
            
            // Time-trap for spam protection (required)
            form_loaded_at: Date.now(),
            
            // Bot check (required)
            botcheck: false,
            
            // Subject line for email notification
            subject: `New Trainee Registration: ${formData['full-name-en'] || formData['full-name-bn']}`,
            
            // Trainee personal information
            'Full Name (English)': formData['full-name-en'] || '—',
            'Full Name (Bangla)': formData['full-name-bn'] || '—',
            'Date of Birth': formData['dob'] || '—',
            'Gender': formData['gender'] || '—',
            'Nationality': formData['nationality'] || '—',
            'Religion': formData['religion'] || '—',
            'ID Type': formData['id-type'] || '—',
            'ID Number': formData['id-number'] || '—',
            
            // Contact information
            'Email': formData['email'] || '—',
            'Phone': formData['contact'] || '—',
            'WeChat/QQ': formData['wechat-qq'] || '—',
            
            // Address information
            'Permanent District': formData['perm-district'] || '—',
            'Permanent Division': formData['perm-division'] || '—',
            'Permanent Upazila': formData['perm-upazila'] || '—',
            'Present District': formData['pres-district'] || '—',
            'Present Division': formData['pres-division'] || '—',
            
            // Family information
            'Father Name (English)': formData['father-name-en'] || '—',
            'Mother Name (English)': formData['mother-name-en'] || '—',
            'Monthly Income': formData['monthly-income'] || '—',
            'Household Members': formData['household-members'] || '—',
            
            // Education information
            'Education Level': formData['education-level'] || '—',
            'Institution Name': formData['institution-name'] || '—',
            'Passing Year': formData['passing-year'] || '—',
            'Grade/CGPA': formData['grade-cgpa'] || '—',
            
            // Employment information
            'Employment Status': formData['employment-status'] || '—',
            'Organization Name': formData['org-name'] || '—',
            'Designation': formData['designation'] || '—',
            'Monthly Salary': formData['salary'] || '—',
            
            // Training information
            'Training Program': formData['training-program'] || '—',
            'Training Start Date': formData['training-start-date'] || '—',
            'Training Source': formData['training-source'] || '—',
            
            // Additional notes
            'PWD Status': formData['pwd'] || 'No',
            'Marital Status': formData['marital-status'] || '—',
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
        console.error('❌ splitforms submission error:', error);
        return {
            success: false,
            message: `Error: ${error.message}`,
            error: error
        };
    }
}

/**
 * Alternative: Form-based submission (no JavaScript required)
 * Use this in HTML instead of JavaScript fetch
 * 
 * <form action="https://splitforms.com/api/submit" method="POST">
 *   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
 *   <input type="hidden" name="form_loaded_at" id="form-loaded-at">
 *   <input type="checkbox" name="botcheck" style="display:none" tabindex="-1">
 *   <input type="text" name="Full Name (English)" required>
 *   <input type="email" name="Email" required>
 *   <textarea name="Notes"></textarea>
 *   <button type="submit">Submit</button>
 * </form>
 * 
 * <script>
 *   document.getElementById('form-loaded-at').value = Date.now();
 * </script>
 */

/**
 * Updated submitForm function for trainee portal
 */
async function submitForm(splitformsEnabled = true) {
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
            throw new Error('Email is required!');
        }
        
        if (!formData['full-name-en'] && !formData['full-name-bn']) {
            throw new Error('Name is required!');
        }
        
        // Submit to splitforms
        let splitResult = null;
        
        if (splitformsEnabled && SPLITFORMS_CONFIG.accessKey !== 'YOUR_ACCESS_KEY_HERE') {
            console.log('📤 Submitting to splitforms...');
            splitResult = await submitToSplitForms(formData);
            
            if (!splitResult.success) {
                throw new Error(splitResult.message);
            }
            
            console.log('✅ splitforms submission successful');
        } else {
            console.warn('⚠️ splitforms not configured, using simulation');
            // Fallback: simulate success
            await new Promise(resolve => setTimeout(resolve, 1000));
            splitResult = {
                success: true,
                message: 'Form submitted (demo mode - configure splitforms for production)'
            };
        }
        
        // Generate PDF (existing functionality)
        await generatePDF(formData);
        
        // Show success message
        if (statusEl) {
            statusEl.innerHTML = `✅ <strong>Success!</strong> ${splitResult.message}`;
            statusEl.className = 'email-status success';
        }
        
        // Optional: Redirect to thank you page
        // window.location.href = '/thank-you.html';
        
        return splitResult;
        
    } catch (error) {
        console.error('❌ Submission failed:', error);
        
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
 * This uses your existing PDF generation code
 */
async function generatePDF(formData) {
    // Your existing PDF generation code here
    // See: exportPDF() function in index.html
    console.log('📄 Generating PDF...', formData);
    
    // Call your existing PDF generation
    if (typeof exportPDF === 'function') {
        exportPDF();
    }
}

// Export for global use
window.submitToSplitForms = submitToSplitForms;
window.submitForm = submitForm;
