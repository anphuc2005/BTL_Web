const nodemailer = require('nodemailer');

// Tạo transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const orderConfirmationTemplate = (order, deviceName, issueName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #eee; }
        .info-label { font-weight: bold; width: 150px; color: #666; }
        .info-value { flex: 1; color: #333; }
        .status-badge { background: #ffc107; color: #000; padding: 5px 15px; border-radius: 20px; display: inline-block; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
        .btn { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Xác nhận đặt lịch sửa chữa</h1>
          <p>Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi</p>
        </div>
        
        <div class="content">
          <p>Xin chào <strong>${order.customerInfo.name}</strong>,</p>
          
          <p>Chúng tôi đã nhận được yêu cầu sửa chữa thiết bị của bạn. Đơn hàng của bạn đang được xử lý và chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
          
          <div class="order-info">
            <h3 style="margin-top: 0; color: #667eea;">📋 Thông tin đơn hàng</h3>
            
            <div class="info-row">
              <span class="info-label">Mã đơn hàng:</span>
              <span class="info-value"><strong>${order.orderNumber}</strong></span>
            </div>
            
            <div class="info-row">
              <span class="info-label">Thiết bị:</span>
              <span class="info-value">${deviceName}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">Vấn đề:</span>
              <span class="info-value">${issueName}</span>
            </div>
            
            ${order.repairInfo.issueDescription ? `
            <div class="info-row">
              <span class="info-label">Mô tả:</span>
              <span class="info-value">${order.repairInfo.issueDescription}</span>
            </div>
            ` : ''}
            
            <div class="info-row">
              <span class="info-label">Số điện thoại:</span>
              <span class="info-value">${order.customerInfo.phone}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">Trạng thái:</span>
              <span class="info-value"><span class="status-badge">⏳ ${order.status === 'pending' ? 'Chờ xác nhận' : order.status}</span></span>
            </div>
            
            <div class="info-row" style="border-bottom: none;">
              <span class="info-label">Ngày tạo:</span>
              <span class="info-value">${new Date(order.createdAt).toLocaleString('vi-VN')}</span>
            </div>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196f3;">
            <strong>📞 Bước tiếp theo:</strong><br/>
            Chuyên viên của chúng tôi sẽ liên hệ với bạn trong vòng <strong>30 phút</strong> để xác nhận thời gian và chi phí sửa chữa cụ thể.
          </div>
          
          <p style="margin-top: 20px;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
          <ul>
            <li>Hotline: <strong>1900 xxxx</strong></li>
            <li>Email: <strong>support@repairshop.com</strong></li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Email này được gửi tự động, vui lòng không trả lời email này.</p>
          <p>&copy; 2026 Repair Shop. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendOrderConfirmation = async (order, deviceName, issueName) => {
  try {
    if (!order.customerInfo.email || order.customerInfo.email === 'no-email@service.com') {
      console.log('No valid email provided for order:', order.orderNumber);
      return { success: false, message: 'No email provided' };
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Repair Shop" <${process.env.EMAIL_USER}>`,
      to: order.customerInfo.email,
      subject: `Xác nhận đơn hàng #${order.orderNumber} - Repair Shop`,
      html: orderConfirmationTemplate(order, deviceName, issueName)
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Gửi email cập nhật trạng thái
const sendStatusUpdate = async (order, newStatus) => {
  try {
    if (!order.customerInfo.email || order.customerInfo.email === 'no-email@service.com') {
      return { success: false, message: 'No email provided' };
    }

    // Map status tiếng Việt sang tiếng Anh để lấy emoji và màu
    const statusConfig = {
      'Chờ xác nhận': {
        message: 'Đơn hàng đang chờ xác nhận',
        emoji: '⏳',
        color: '#ffc107',
        description: 'Chúng tôi đang xem xét đơn hàng của bạn và sẽ liên hệ sớm nhất.'
      },
      'Đang xử lý': {
        message: 'Đơn hàng đang được xử lý',
        emoji: '🔧',
        color: '#2196f3',
        description: 'Thiết bị của bạn đang được sửa chữa bởi kỹ thuật viên chuyên nghiệp.'
      },
      'Hoàn thành': {
        message: 'Đơn hàng đã hoàn thành',
        emoji: '✅',
        color: '#4caf50',
        description: 'Thiết bị của bạn đã được sửa chữa thành công! Vui lòng đến nhận máy.'
      },
      'Hủy': {
        message: 'Đơn hàng đã bị hủy',
        emoji: '❌',
        color: '#f44336',
        description: 'Đơn hàng của bạn đã bị hủy. Nếu có thắc mắc, vui lòng liên hệ với chúng tôi.'
      }
    };

    const config = statusConfig[newStatus] || {
      message: newStatus,
      emoji: '📋',
      color: '#757575',
      description: 'Trạng thái đơn hàng đã được cập nhật.'
    };

    // Lấy thông tin thiết bị
    let deviceInfo = 'Đơn hàng của bạn';
    if (order.orderType === 'repair-service' && order.repairInfo) {
      deviceInfo = `${order.repairInfo.deviceType || 'Thiết bị'} - ${order.repairInfo.issue || 'Sửa chữa'}`;
    } else if (order.orderItems && order.orderItems.length > 0) {
      deviceInfo = order.orderItems.map(item => item.name).join(', ');
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Repair Shop" <${process.env.EMAIL_USER}>`,
      to: order.customerInfo.email,
      subject: `${config.emoji} Cập nhật đơn hàng #${order.orderNumber} - ${config.message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .status-badge { background: ${config.color}; color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px; margin: 20px 0; }
            .info-box { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${config.color}; }
            .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; }
            .btn { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 Cập nhật đơn hàng</h1>
              <p style="margin: 0; opacity: 0.9;">Đơn hàng #${order.orderNumber}</p>
            </div>
            
            <div class="content">
              <p>Xin chào <strong>${order.customerInfo.name}</strong>,</p>
              
              <p>Đơn hàng của bạn đã có cập nhật mới:</p>
              
              <div class="status-badge">
                ${config.emoji} ${config.message}
              </div>
              
              <div class="info-box">
                <p style="margin: 0 0 10px 0;"><strong>📦 Thông tin đơn hàng:</strong></p>
                <p style="margin: 5px 0;">• Mã đơn: <strong>${order.orderNumber}</strong></p>
                <p style="margin: 5px 0;">• Thiết bị: <strong>${deviceInfo}</strong></p>
                <p style="margin: 5px 0;">• Trạng thái: <strong>${newStatus}</strong></p>
                <p style="margin: 5px 0 0 0;">• Thời gian: <strong>${new Date().toLocaleString('vi-VN')}</strong></p>
              </div>
              
              <p>${config.description}</p>
              
              <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0;"><strong>📞 Liên hệ:</strong></p>
                <p style="margin: 5px 0 0 0;">Hotline: <strong>1900 xxxx</strong> | Email: <strong>support@repairshop.com</strong></p>
              </div>
            </div>
            
            <div class="footer">
              <p>Email này được gửi tự động, vui lòng không trả lời.</p>
              <p>&copy; 2026 Repair Shop. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending status update email:', error);
    return { success: false, error: error.message };
  }
};



module.exports = {
  sendOrderConfirmation,
  sendStatusUpdate,
};
