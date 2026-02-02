import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dịch Vụ Sửa Chữa Điện Thoại Chuyên Nghiệp
            </h1>
            <p className="text-xl mb-8">
              Nhanh chóng - Uy tín - Giá cả hợp lý
            </p>
            <Link
              to="/booking"
              className="inline-block bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Đặt Lịch Ngay
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Dịch Vụ Của Chúng Tôi</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Pin', 'Màn hình', 'Cổng sạc', 'Camera', 'Chân sóng', 'Linh kiện khác'].map((service, index) => (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Thay {service}</h3>
                  <p className="text-gray-600">Dịch vụ thay thế {service.toLowerCase()} chính hãng, bảo hành dài hạn</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Device Types Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Các Thiết Bị Hỗ Trợ</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {['Phone', 'iPad', 'Android', 'Tablet'].map((device, index) => (
                <div key={index} className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold">{device}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Sửa Chữa Thiết Bị?</h2>
            <p className="text-gray-600 mb-8">Đặt lịch hẹn hoặc theo dõi trạng thái sửa chữa của bạn</p>
            <div className="flex gap-4 justify-center">
              <Link to="/booking" className="btn-primary">
                Đặt Lịch
              </Link>
              <Link to="/tracking" className="btn-secondary">
                Theo Dõi Đơn Hàng
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
