import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    deviceType: '',
    serviceType: '',
    priceRange: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call will be implemented here
    console.log('Booking submitted:', formData);
    alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Đặt Lịch Sửa Chữa</h1>
          
          <form onSubmit={handleSubmit} className="card">
            {/* Customer Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Thông Tin Cá Nhân</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Họ và Tên *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Số Điện Thoại *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Device Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Thông Tin Thiết Bị</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Loại Thiết Bị *</label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">-- Chọn loại thiết bị --</option>
                  <option value="phone">Phone</option>
                  <option value="ipad">iPad</option>
                  <option value="android">Android</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Dịch Vụ Cần Sửa *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  <option value="battery">Pin</option>
                  <option value="screen">Màn hình</option>
                  <option value="charging_port">Cổng sạc</option>
                  <option value="camera">Camera</option>
                  <option value="antenna">Chân sóng</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Khung Giá</label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">-- Chọn khung giá --</option>
                  <option value="under_500k">Dưới 500k</option>
                  <option value="500k_1m">500k - 1 triệu</option>
                  <option value="1m_2m">1 - 2 triệu</option>
                  <option value="above_2m">Trên 2 triệu</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mô Tả Vấn Đề *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Mô tả chi tiết vấn đề của thiết bị..."
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary flex-1">
                Đặt Lịch
              </button>
              <button type="button" className="btn-secondary flex-1" onClick={() => window.history.back()}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingForm;
