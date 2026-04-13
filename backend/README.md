# BTL Web Backend - MongoDB Setup

Backend API cho dự án BTL Web sử dụng Node.js + Express + MongoDB

## 📋 Yêu cầu hệ thống

- Node.js >= 18.0.0
- MongoDB Community Server hoặc MongoDB Atlas
- npm hoặc yarn

## 🚀 Cài đặt MongoDB trên macOS

### Cách 1: Sử dụng Homebrew (Khuyến nghị)

```bash
# Cài đặt Homebrew formula cho MongoDB
brew tap mongodb/brew

# Cài đặt MongoDB Community Edition
brew install mongodb-community

# Khởi động MongoDB service
brew services start mongodb/brew/mongodb-community

# Kiểm tra trạng thái
brew services list | grep mongodb
```

### Cách 2: Download trực tiếp

1. Vào https://www.mongodb.com/try/download/community
2. Chọn macOS platform
3. Download và cài đặt file .tgz
4. Thêm MongoDB vào PATH

### Cách 3: Sử dụng MongoDB Atlas (Cloud)

1. Vào https://cloud.mongodb.com
2. Tạo account miễn phí
3. Tạo cluster mới (chọn gói miễn phí M0)
4. Tạo database user và lấy connection string

## 📦 Cài đặt dependencies

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt packages
npm install

# Hoặc nếu dùng yarn
yarn install
```

## ⚙️ Cấu hình

1. **Tạo file .env** (đã có template sẵn trong dự án):

```bash
# Server Configuration  
PORT=5000
NODE_ENV=development

# MongoDB Configuration (chọn 1 trong 2)
# Local MongoDB:
MONGO_URI=mongodb://localhost:27017/btl_web_db

# MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/btl_web_db

# JWT Secret (thay bằng string phức tạp)
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

2. **Cấu hình MongoDB connection**:

- **Local**: Đảm bảo MongoDB service đang chạy
- **Atlas**: Thay thế `username`, `password`, và `cluster` trong MONGO_URI

## 🏃‍♂️ Chạy project

### Development mode (auto-reload)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

## 📊 Kiểm tra kết nối

1. **Health check endpoint**: http://localhost:5000/api/health
2. **Test MongoDB connection**: Server sẽ log connection status khi khởi động

## 🔧 Các lệnh MongoDB hữu ích

```bash
# Kết nối MongoDB shell
mongosh

# Kiểm tra các database
show dbs

# Chọn database
use btl_web_db

# Kiểm tra collections
show collections

# Kiểm tra documents trong collection
db.products.find().pretty()
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng  
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id/status` - Cập nhật trạng thái
- `GET /api/orders/stats/dashboard` - Thống kê đơn hàng

## 🌱 Seed data (Tùy chọn)

```bash
# Tạo file seed data
npm run seed

# Xóa tất cả data
npm run seed:destroy
```

## 🏗️ Cấu trúc project

```
backend/
├── config/
│   └── database.js          # Cấu hình MongoDB
├── middleware/
│   └── errorHandler.js      # Xử lý lỗi
├── models/
│   ├── Product.js           # Schema sản phẩm
│   └── Order.js             # Schema đơn hàng  
├── routes/
│   ├── products.js          # Routes cho products
│   └── orders.js            # Routes cho orders
├── .env                     # Biến môi trường
├── package.json             # Dependencies
└── server.js                # Entry point
```

## 🔍 Troubleshooting

### MongoDB connection failed
- Kiểm tra MongoDB service: `brew services list | grep mongodb`
- Restart service: `brew services restart mongodb-community`
- Kiểm tra port 27017: `lsof -i :27017`

### Port 5000 already in use  
- Kiểm tra process: `lsof -i :5000`
- Kill process: `kill -9 <PID>`
- Hoặc đổi PORT trong .env

### Frontend không kết nối được backend
- Kiểm tra CORS configuration
- Đảm bảo FRONTEND_URL trong .env đúng
- Kiểm tra API_URL trong frontend .env

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. MongoDB service đang chạy
2. .env file có đúng định dạng  
3. Dependencies đã cài đặt đầy đủ
4. Port không bị conflict