import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PhoneRepair</h3>
            <p className="text-gray-400">
              Dịch vụ sửa chữa điện thoại chuyên nghiệp, uy tín hàng đầu.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
            <ul className="text-gray-400 space-y-2">
              <li>📞 Hotline: 1900-xxxx</li>
              <li>📧 Email: support@phonerepair.com</li>
              <li>📍 Địa chỉ: 123 Đường ABC, Hà Nội</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Giờ Làm Việc</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Thứ 2 - Thứ 6: 8:00 - 20:00</li>
              <li>Thứ 7 - CN: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 PhoneRepair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
