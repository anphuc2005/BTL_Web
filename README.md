# Phone Repair Management System

Ứng dụng web quản lý sửa chữa điện thoại với React và Spring Boot.

## 🚀 Công nghệ sử dụng

### Frontend
- **ReactJS** 18.2 - Thư viện UI
- **TailwindCSS** 3.3 - CSS Framework
- **React Router** v6 - Routing
- **Axios** - HTTP Client

### Backend
- **Spring Boot** 3.2.0 - Java Framework
- **Spring Data JPA** - ORM
- **MySQL** 8.0 - Database
- **Spring Mail** - Email Service
- **Swagger/OpenAPI** - API Documentation

## 📋 Yêu cầu hệ thống

- **Node.js** 14+ và npm/yarn
- **JDK** 17+
- **Maven** 3.6+
- **MySQL** 8.0+
- **Docker** (tùy chọn)

## 🏗️ Cấu trúc dự án

```
BTL_Web/
├── frontend/                 # ReactJS Application
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API calls
│   │   └── styles/          # CSS files
│   ├── package.json
│   └── README.md
│
├── backend/                 # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/phonerepair/
│   │       ├── controller/  # REST Controllers
│   │       ├── service/     # Business Logic
│   │       ├── repository/  # Data Access
│   │       ├── model/       # Entities
│   │       ├── dto/         # DTOs
│   │       ├── config/      # Configuration
│   │       └── exception/   # Exception Handling
│   ├── src/main/resources/
│   ├── pom.xml
│   └── README.md
│
├── docs/                    # Documentation
├── docker-compose.yml       # Docker configuration
└── README.md               # This file
```

## 🚦 Hướng dẫn cài đặt

### Sử dụng Docker (Khuyến nghị)

1. **Clone repository**
```bash
git clone <repository-url>
cd BTL_Web
```

2. **Khởi động database với Docker**
```bash
docker-compose up -d mysql
```

3. **Chạy Backend**
```bash
cd backend
mvn spring-boot:run
```

4. **Chạy Frontend**
```bash
cd frontend
npm install
npm start
```

### Cài đặt thủ công

#### Backend Setup

1. **Cài đặt MySQL**
```sql
CREATE DATABASE phone_repair_db;
```

2. **Cấu hình database** (backend/src/main/resources/application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/phone_repair_db
spring.datasource.username=root
spring.datasource.password=your_password
```

3. **Chạy Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend sẽ chạy tại: http://localhost:8080

#### Frontend Setup

1. **Cài đặt dependencies**
```bash
cd frontend
npm install
```

2. **Cấu hình API URL** (tạo file .env)
```
REACT_APP_API_URL=http://localhost:8080/api
```

3. **Chạy Frontend**
```bash
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## 📚 API Documentation

Sau khi chạy backend, truy cập Swagger UI tại:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

## 🎯 Chức năng chính

### Dành cho Khách hàng
- ✅ Xem danh sách linh kiện có sẵn
- ✅ Đặt lịch sửa chữa
- ✅ Theo dõi trạng thái sửa chữa
- ✅ Viết feedback và đánh giá
- ✅ Nhận thông báo qua Email/SMS
- ✅ Chọn loại thiết bị (Phone/iPad/Android/Tablet)
- ✅ Chọn dịch vụ (Pin/Màn hình/Cổng sạc/Camera/Chân sóng)
- ✅ Chọn khung giá phù hợp

### Dành cho Admin
- ✅ Quản lý lịch hẹn (xác nhận, cập nhật trạng thái, hủy)
- ✅ Quản lý linh kiện (thêm, sửa, xóa, tìm kiếm)
- ✅ Xem báo cáo và doanh thu
- ✅ Quản lý kho hàng
- ✅ Xem số lượng đơn theo trạng thái
- ✅ Tự động cập nhật trạng thái kho

### Tự động hóa hệ thống
- ✅ Gửi thông báo tự động (Email/SMS)
- ✅ Xác nhận lịch hẹn tự động
- ✅ Cập nhật trạng thái tự động
- ✅ Quản lý kho tự động

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Build Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/phone-repair-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
```

Các file build sẽ nằm trong thư mục `build/`

## 🌐 Deployment

### Backend Deployment Options
- AWS (EC2, Elastic Beanstalk)
- Heroku
- Google Cloud Platform
- Azure

### Frontend Deployment Options
- Netlify
- Vercel
- AWS S3 + CloudFront
- Firebase Hosting

## 🔒 Security

- Implement authentication và authorization
- Sử dụng HTTPS trong production
- Bảo mật thông tin database
- Validate input data
- Handle errors properly
- Use environment variables for secrets

## 📝 Database Schema

### Main Tables
- **bookings** - Quản lý lịch hẹn
- **parts** - Quản lý linh kiện
- **customers** - Quản lý khách hàng

Xem chi tiết schema trong `backend/src/main/resources/data.sql`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- Backend Development: Spring Boot Team
- Frontend Development: React Team
- Database Design: Database Team

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng:
- Tạo issue trên GitHub
- Email: support@phonerepair.com
- Hotline: 1900-xxxx

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Happy Coding! 🚀**