const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../.env' });

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/signworld-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User');

const fixAdmin = async () => {
  try {
    // Delete existing admin
    await User.deleteOne({ email: 'admin@signworld.com' });
    
    // Create new admin with direct save
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@signworld.com',
      password: hashedPassword,
      role: 'admin',
      phone: '555-555-0100',
      company: 'Sign World HQ',
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
    });
    
    // Save without triggering the pre-save hook again
    await admin.save({ validateBeforeSave: false });

    console.log('Admin user created successfully!');
    console.log('Email: admin@signworld.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing admin:', error);
    process.exit(1);
  }
};

fixAdmin();