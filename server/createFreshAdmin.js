const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../.env' });

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/signworld-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User');

const createFreshAdmin = async () => {
  try {
    // Delete existing admin
    await User.deleteOne({ email: 'admin@signworld.com' });
    console.log('Deleted existing admin');
    
    // Create new admin - let the model handle password hashing
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@signworld.com',
      password: 'admin123',  // Plain password - will be hashed by model
      role: 'admin',
      phone: '555-555-0100',
      company: 'Sign World HQ',
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@signworld.com');
    console.log('Password: admin123');
    
    // Test the login immediately
    const testUser = await User.findOne({ email: 'admin@signworld.com' }).select('+password');
    const match = await testUser.matchPassword('admin123');
    console.log('Login test:', match ? 'SUCCESS' : 'FAILED');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createFreshAdmin();