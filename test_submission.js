/**
 * Test Script for Trainee Form
 * Simulates form fill and submission
 */

// Test data
const testData = {
    'full-name-en': 'Test User',
    'full-name-bn': 'টেস্ট ইউজার',
    'dob': '1990-01-01',
    'gender': 'Male',
    'nationality': 'Bangladeshi',
    'religion': 'Islam',
    'id-type': 'NID',
    'id-number': '1234567890',
    'contact': '+880 1711-104318',
    'email': 'test@example.com',
    'pwd': 'No',
    'marital-status': 'Single',
    'perm-address': 'Test Address, Dhaka',
    'perm-division': 'Dhaka',
    'perm-district': 'Dhaka',
    'perm-upazila': 'Tejgaon',
    'perm-post-office': 'Dhaka',
    'perm-post-code': '1205',
    'pres-address': 'Test Address, Dhaka',
    'pres-division': 'Dhaka',
    'pres-district': 'Dhaka',
    'pres-upazila': 'Tejgaon',
    'pres-post-code': '1205',
    'father-name-en': 'Father Name',
    'mother-name-en': 'Mother Name',
    'household-members': '5',
    'monthly-income': '50000',
    'education-level': 'Bachelor',
    'institution-name': 'University Name',
    'passing-year': '2020',
    'grade-cgpa': '3.5',
    'employment-status': 'Student',
    'training-program': 'Python Development',
    'training-start-date': '2024-01-01',
    'training-source': 'Online',
    'has-bank-account': 'Yes',
    'bank-name': 'Bank Name',
    'account-number': '1234567890',
    'notes': 'Test submission'
};

console.log('🧪 Testing splitforms integration...');
console.log('📋 Test data:', testData);

// Test submitToSplitForms function
async function testSubmission() {
    try {
        console.log('🚀 Starting submission test...');
        
        // Call the function
        const result = await submitToSplitForms(testData);
        
        console.log('📥 Result:', result);
        
        if (result.success) {
            console.log('✅ TEST PASSED!');
            console.log('📧 Check your splitforms dashboard for the submission');
        } else {
            console.error('❌ TEST FAILED:', result.message);
        }
        
        return result;
        
    } catch (error) {
        console.error('❌ Exception:', error);
        return { success: false, error: error };
    }
}

// Run test
testSubmission();
