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

const resetAdminPassword = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ email: 'admin@signcompany.com' });
    
    if (!admin) {
      console.log('Admin user not found!');
      process.exit(1);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    console.log('Admin password reset successfully!');
    console.log('Email: admin@signcompany.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
};

resetAdminPassword();