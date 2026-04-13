const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Admin user mẫu
const adminUser = {
  username: 'admin',
  password: 'admin123', // Sẽ được hash tự động
  role: 'superadmin',
  fullName: 'System Admin',
  email: 'admin@btlweb.com',
  isActive: true
};

const seedAdmin = async () => {
  try {
    // Kiểm tra xem admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ username: adminUser.username });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Role:', existingAdmin.role);
      process.exit(0);
    }

    // Tạo admin user mới
    const admin = await User.create(adminUser);
    
    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Login credentials:');
    console.log('   Username:', admin.username);
    console.log('   Password: admin123');
    console.log('   Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

// Chạy seed
seedAdmin();
