const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../.env' });

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sign-company-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User');

const testLogin = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ email: 'admin@signcompany.com' }).select('+password');
    
    if (!admin) {
      console.log('Admin user not found!');
      process.exit(1);
    }

    console.log('Admin found:', admin.email);
    console.log('Stored password hash:', admin.password);
    
    // Test password
    const isMatch = await bcrypt.compare('admin123', admin.password);
    console.log('Password match:', isMatch);
    
    // Also test using the model method
    const isMatchMethod = await admin.matchPassword('admin123');
    console.log('Password match (method):', isMatchMethod);
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing login:', error);
    process.exit(1);
  }
};

testLogin();