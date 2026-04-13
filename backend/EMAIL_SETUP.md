# Email Configuration Guide

## 🔧 Cấu hình Email cho dự án

### 1. Sử dụng Gmail (Khuyến nghị)

**Bước 1: Enable 2-Step Verification**
1. Vào https://myaccount.google.com/security
2. Tìm "2-Step Verification" và bật nó

**Bước 2: Tạo App Password**
1. Vào https://myaccount.google.com/apppasswords
2. Chọn "Mail" và "Other (Custom name)"
3. Nhập tên: "BTL Web Backend"
4. Click "Generate"
5. Copy mật khẩu 16 ký tự được tạo

**Bước 3: Cập nhật .env**
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App password vừa tạo
```

### 2. Sử dụng dịch vụ email khác

#### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

Trong `emailService.js`, đổi:
```javascript
service: 'hotmail'  // thay vì 'gmail'
```

#### Custom SMTP
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### 3. Test Email

```bash
# Restart server
npm run dev

# Test tạo order với email thật
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderType": "repair-service",
    "repairInfo": {
      "deviceType": "iphone",
      "issue": "screen",
      "issueDescription": "Test email"
    },
    "customerInfo": {
      "name": "Test User",
      "email": "your-real-email@gmail.com",
      "phone": "0123456789"
    },
    "shippingAddress": {
      "fullName": "Test",
      "address": "Test",
      "city": "HN",
      "district": "Test",
      "ward": "Test",
      "phoneNumber": "0123456789"
    },
    "paymentMethod": "cash"
  }'
```

### 4. Email Template

Email gửi đi sẽ bao gồm:
- ✅ Mã đơn hàng
- 📱 Thông tin thiết bị
- 🔧 Vấn đề cần sửa
- 👤 Thông tin khách hàng
- ⏰ Thời gian tạo đơn
- 📞 Thông tin liên hệ

### 5. Troubleshooting

**Lỗi: "Invalid login"**
- Kiểm tra lại EMAIL_USER và EMAIL_PASSWORD
- Đảm bảo đã bật 2-Step Verification và tạo App Password

**Lỗi: "Connection timeout"**
- Kiểm tra kết nối internet
- Thử đổi sang SMTP khác

**Email không được gửi**
- Kiểm tra log server: `✅ Email sent` hoặc `⚠️ Email not sent`
- Kiểm tra email có hợp lệ không
- Xem console.log để debug

### 6. Tính năng

✅ **Tự động gửi email khi:**
- Tạo đơn hàng mới
- Cập nhật trạng thái đơn hàng

✅ **Email template đẹp:**
- Responsive design
- Hiển thị đầy đủ thông tin
- Branding chuyên nghiệp

✅ **Không chặn API:**
- Email gửi async
- Response trả về ngay
- Không ảnh hưởng UX
