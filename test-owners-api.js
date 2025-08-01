const axios = require('axios');

// Test the owners API endpoint
async function testOwnersAPI() {
  const PROD_URL = 'https://sign-company.onrender.com';
  
  console.log('Testing Owners API...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${PROD_URL}/health`);
    console.log('Health check:', healthResponse.data);
    console.log('✓ Server is running\n');
    
    // Test 2: Test API endpoint
    console.log('2. Testing general API...');
    const testResponse = await axios.get(`${PROD_URL}/api/test`);
    console.log('API test:', testResponse.data);
    console.log('✓ API is accessible\n');
    
    // Test 3: Get owners
    console.log('3. Testing owners endpoint...');
    const ownersResponse = await axios.get(`${PROD_URL}/api/owners`, {
      params: { page: 1, limit: 10 }
    });
    console.log('Owners response:', {
      success: ownersResponse.data.success,
      count: ownersResponse.data.count,
      total: ownersResponse.data.total,
      dataLength: ownersResponse.data.data?.length || 0
    });
    
    if (ownersResponse.data.data && ownersResponse.data.data.length > 0) {
      console.log('✓ Owners data found');
      console.log('First owner:', {
        name: ownersResponse.data.data[0].name,
        company: ownersResponse.data.data[0].company,
        role: ownersResponse.data.data[0].role
      });
    } else {
      console.log('✗ No owners found in database');
    }
    
  } catch (error) {
    console.error('Error testing API:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testOwnersAPI();