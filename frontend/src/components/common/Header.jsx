import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAdmin = false }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            PhoneRepair
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {!isAdmin ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Trang Chủ
                </Link>
                <Link to="/booking" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Đặt Lịch
                </Link>
                <Link to="/tracking" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Theo Dõi
                </Link>
                <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Quản Trị
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Về Trang Chủ
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
