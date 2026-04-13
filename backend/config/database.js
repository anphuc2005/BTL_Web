const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Connection pool settings để tránh lỗi khi có nhiều requests đồng thời
      maxPoolSize: 50,         // Số connection tối đa trong pool (mặc định 100)
      minPoolSize: 10,         // Số connection tối thiểu duy trì
      socketTimeoutMS: 45000,  // Timeout cho socket operations
      serverSelectionTimeoutMS: 10000, // Timeout khi chọn server
      family: 4                // Sử dụng IPv4, tránh issues với IPv6
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Connection Pool Size: min ${10} - max ${50}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Handle connection errors sau khi đã kết nối
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

module.exports = connectDB;