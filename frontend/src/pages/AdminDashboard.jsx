import React, { useState } from 'react';
import Header from '../components/common/Header';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const stats = [
    { label: 'Đơn chờ', value: 12, color: 'bg-yellow-500' },
    { label: 'Đang sửa', value: 8, color: 'bg-blue-500' },
    { label: 'Hoàn tất', value: 45, color: 'bg-green-500' },
    { label: 'Đã hủy', value: 3, color: 'bg-red-500' },
  ];

  const mockBookings = [
    { id: 'BK001', customer: 'Nguyễn Văn A', device: 'iPhone 13', service: 'Màn hình', status: 'pending', date: '2024-01-15' },
    { id: 'BK002', customer: 'Trần Thị B', device: 'Samsung S21', service: 'Pin', status: 'in_progress', date: '2024-01-14' },
    { id: 'BK003', customer: 'Lê Văn C', device: 'iPad Pro', service: 'Camera', status: 'completed', date: '2024-01-13' },
  ];

  const mockParts = [
    { id: 1, name: 'Màn hình iPhone 13', stock: 15, price: '2,500,000', status: 'available' },
    { id: 2, name: 'Pin Samsung S21', stock: 3, price: '800,000', status: 'low_stock' },
    { id: 3, name: 'Camera iPad Pro', stock: 0, price: '1,200,000', status: 'out_of_stock' },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Chờ', class: 'badge-warning' },
      in_progress: { text: 'Đang sửa', class: 'badge-info' },
      completed: { text: 'Hoàn tất', class: 'badge-success' },
      cancelled: { text: 'Hủy', class: 'badge-danger' },
      available: { text: 'Có sẵn', class: 'badge-success' },
      low_stock: { text: 'Sắp hết', class: 'badge-warning' },
      out_of_stock: { text: 'Hết hàng', class: 'badge-danger' },
    };
    const statusInfo = statusMap[status];
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={true} />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Quản Trị Hệ Thống</h1>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="card">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-3`}>
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="card">
            <div className="border-b mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`pb-3 px-4 font-medium ${activeTab === 'bookings' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-600'}`}
                >
                  Quản Lý Lịch Hẹn
                </button>
                <button
                  onClick={() => setActiveTab('parts')}
                  className={`pb-3 px-4 font-medium ${activeTab === 'parts' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-600'}`}
                >
                  Quản Lý Linh Kiện
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`pb-3 px-4 font-medium ${activeTab === 'reports' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-600'}`}
                >
                  Báo Cáo & Doanh Thu
                </button>
              </div>
            </div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Danh Sách Lịch Hẹn</h2>
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="input-field max-w-xs"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thiết bị</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dịch vụ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{booking.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.device}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(booking.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">Xem</button>
                            <button className="text-green-600 hover:text-green-900">Cập nhật</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Parts Tab */}
            {activeTab === 'parts' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Quản Lý Linh Kiện</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tìm kiếm linh kiện..."
                      className="input-field max-w-xs"
                    />
                    <button className="btn-primary">Thêm Linh Kiện</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên linh kiện</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tồn kho</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockParts.map((part) => (
                        <tr key={part.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{part.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{part.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{part.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{part.price} VNĐ</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(part.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">Sửa</button>
                            <button className="text-red-600 hover:text-red-900">Xóa</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Báo Cáo & Doanh Thu</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Doanh thu tháng này</p>
                    <p className="text-3xl font-bold text-green-600">125,000,000 VNĐ</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Tổng đơn hàng</p>
                    <p className="text-3xl font-bold text-blue-600">68</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Khách hàng mới</p>
                    <p className="text-3xl font-bold text-purple-600">24</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Tỷ lệ hoàn thành</p>
                    <p className="text-3xl font-bold text-orange-600">94%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
