/**
 * Quick Debug Script
 */
console.log('🔍 Debugging trainee form...');

// Check if functions exist
console.log('submitForm:', typeof window.submitForm);
console.log('submitToSplitForms:', typeof window.submitToSplitForms);
console.log('showTab:', typeof window.showTab);
console.log('collectFormData:', typeof window.collectFormData);

// Check config
if (window.SPLITFORMS_CONFIG) {
    console.log('✅ SPLITFORMS_CONFIG loaded');
    console.log('   Access Key:', window.SPLITFORMS_CONFIG.accessKey);
    console.log('   Endpoint:', window.SPLITFORMS_CONFIG.endpoint);
} else {
    console.log('❌ SPLITFORMS_CONFIG NOT FOUND');
}

// Check if loading element exists
const loadingEl = document.getElementById('loading');
const statusEl = document.getElementById('email-status');
console.log('Loading element:', loadingEl ? '✅ Found' : '❌ Not found');
console.log('Status element:', statusEl ? '✅ Found' : '❌ Not found');
