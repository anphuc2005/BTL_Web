import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const ServiceTracking = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [bookingInfo, setBookingInfo] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    // API call will be implemented here
    // Mock data for demonstration
    setBookingInfo({
      id: trackingCode,
      customerName: 'Nguyễn Văn A',
      deviceType: 'iPhone 13',
      serviceType: 'Thay màn hình',
      status: 'in_progress',
      createdAt: '2024-01-15',
      estimatedCompletion: '2024-01-17',
      notes: 'Đang thay màn hình mới',
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Chờ xác nhận', class: 'badge-warning' },
      confirmed: { text: 'Đã xác nhận', class: 'badge-info' },
      in_progress: { text: 'Đang sửa', class: 'badge-info' },
      completed: { text: 'Hoàn tất', class: 'badge-success' },
      cancelled: { text: 'Đã hủy', class: 'badge-danger' },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Theo Dõi Đơn Hàng</h1>
          
          <form onSubmit={handleSearch} className="card mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mã Đơn Hàng</label>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="input-field"
                placeholder="Nhập mã đơn hàng của bạn"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Tra Cứu
            </button>
          </form>

          {bookingInfo && (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Chi Tiết Đơn Hàng</h2>
                {getStatusBadge(bookingInfo.status)}
              </div>

              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="text-gray-600 text-sm">Mã đơn hàng</p>
                  <p className="font-semibold">{bookingInfo.id}</p>
                </div>

                <div className="border-b pb-3">
                  <p className="text-gray-600 text-sm">Khách hàng</p>
                  <p className="font-semibold">{bookingInfo.customerName}</p>
                </div>

                <div className="border-b pb-3">
                  <p className="text-gray-600 text-sm">Thiết bị</p>
                  <p className="font-semibold">{bookingInfo.deviceType}</p>
                </div>

                <div className="border-b pb-3">
                  <p className="text-gray-600 text-sm">Dịch vụ</p>
                  <p className="font-semibold">{bookingInfo.serviceType}</p>
                </div>

                <div className="border-b pb-3">
                  <p className="text-gray-600 text-sm">Ngày tạo</p>
                  <p className="font-semibold">{bookingInfo.createdAt}</p>
                </div>

                <div className="border-b pb-3">
                  <p className="text-gray-600 text-sm">Dự kiến hoàn thành</p>
                  <p className="font-semibold">{bookingInfo.estimatedCompletion}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm">Ghi chú</p>
                  <p className="font-semibold">{bookingInfo.notes}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Bạn sẽ nhận được thông báo qua email/SMS khi có cập nhật về đơn hàng.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceTracking;
