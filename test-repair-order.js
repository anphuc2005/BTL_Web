const mongoose = require('mongoose');
const Order = require('./backend/models/Order');
const Product = require('./backend/models/Product');
require('dotenv').config({ path: 'backend/.env' });

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  const p = await Product.findOne();
  console.log(`Product ${p.name} stock: ${p.stock}`);
  
  const o = await Order.findOne({ orderType: 'repair-service' }).sort({createdAt: -1});
  console.log(`Found repair order: ${o._id}, status: ${o.status}, items: ${o.orderItems.length}`);
  
  process.exit(0);
}
run();
