// Updated submitForm function with splitforms integration
async function submitForm() {
    console.log('📋 Starting form submission...');
    
    // Show loading state
    const loadingEl = document.getElementById('loading');
    const statusEl = document.getElementById('email-status');
    
    if (loadingEl) loadingEl.classList.add('active');
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.innerHTML = '⏳ Submitting to splitforms...';
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
        
        console.log('✅ Form data validated');
        
        // Submit to splitforms
        const result = await submitToSplitForms(formData);
        
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
        if (loadingEl) loadingEl.classList.remove('active');
    }
}
