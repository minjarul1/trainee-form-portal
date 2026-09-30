// Quick test to verify functions are loaded
console.log('=== Form Debug ===');
console.log('submitForm type:', typeof window.submitForm);
console.log('submitToSplitForms type:', typeof window.submitToSplitForms);
console.log('showTab type:', typeof window.showTab);
console.log('collectFormData type:', typeof window.collectFormData);

if (window.SPLITFORMS_CONFIG) {
    console.log('✅ Config loaded:', window.SPLITFORMS_CONFIG.accessKey);
} else {
    console.log('❌ Config NOT loaded');
}

if (window.submitForm && typeof window.submitForm === 'function') {
    console.log('✅ submitForm is ready');
} else {
    console.log('❌ submitForm is NOT ready');
}
