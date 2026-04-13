import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePasswordModal from './ChangePasswordModal'
import '../../styles/adminStyles/AdminTopbar.css'

export default function AdminTopbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
    orders: [],
    feedback: [],
    counts: { total: 0, newOrders: 0, newFeedback: 0 }
  });
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Fetch notifications khi component mount
    fetchNotifications();
    
    // Refresh notifications mỗi 2 phút
    const interval = setInterval(fetchNotifications, 120000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL}/auth/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data);
      }
    } catch (error) {
      console.error('Fetch notifications error:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/login');
    }
  };

  const formatTimeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'Vừa xong';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
  };
  
  const { breadcrumb, title } = useMemo(() => {
    const path = location.pathname

    if (path.includes('analytics')) {
      return {
        breadcrumb: ['Pages', 'Analytics'],
        title: 'Analytics'
      }
    }
    
    if (path.includes('inventory')) {
      return {
        breadcrumb: ['Pages', 'Inventory'],
        title: 'Inventory'
      }
    }

    if (path.includes('feedback')) {
      return {
        breadcrumb: ['Pages', 'Feedback Management'],
        title: 'Feedback Management'
      }
    }
    
    if (path.includes('dashboard')) {
      return {
        breadcrumb: ['Pages', 'Dashboards'],
        title: 'Dashboards'
      }
    }
    
    return {
      breadcrumb: ['Pages'],
      title: 'Admin'
    }
  }, [location.pathname])

  return (
    <>
      <header className="adminTopbar">
        <div className="adminTopbar__left">
          <div className="adminTopbar__crumbs">
            <div className="adminTopbar__crumbLine">
              <img src="/admin_icon/home.svg" alt="home" className="adminTopbar__home" />
              {breadcrumb.map((c, idx) => (
                <span key={c} className="adminTopbar__crumb">
                  <span className="adminTopbar__sep">/</span> {c}
                </span>
              ))}
            </div>
            <div className="adminTopbar__title">{title}</div>
          </div>
        </div>

        <div className="adminTopbar__right">
          {/* Notifications */}
          <div 
            className="adminTopbar__notif" 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
          >
            <img src="/admin_icon/notification.svg" alt="notifications" className="adminTopbar__icon" />
            {notifications.counts.total > 0 && (
              <span className="adminTopbar__badge">{notifications.counts.total}</span>
            )}
            
            {showNotifications && (
              <div className="notif-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="notif-header">
                  <h3>Thông báo</h3>
                  <span className="notif-count">{notifications.counts.total} mới</span>
                </div>

                {loadingNotifications ? (
                  <div className="notif-loading">Đang tải...</div>
                ) : (
                  <div className="notif-content">
                    {/* Orders */}
                    {notifications.orders.length > 0 && (
                      <div className="notif-section">
                        <div className="notif-section-title">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                          Đơn hàng mới ({notifications.counts.newOrders})
                        </div>
                        {notifications.orders.map((order) => (
                          <div key={order._id} className="notif-item">
                            <div className="notif-item-content">
                              <div className="notif-item-title">
                                {order.shippingAddress?.fullName || 'Khách hàng'}
                              </div>
                              <div className="notif-item-desc">
                                Đơn hàng: {order.totalAmount?.toLocaleString('vi-VN')}₫ • {order.status}
                              </div>
                            </div>
                            <span className="notif-item-time">{formatTimeSince(order.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Feedback */}
                    {notifications.feedback.length > 0 && (
                      <div className="notif-section">
                        <div className="notif-section-title">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          Feedback mới ({notifications.counts.newFeedback})
                        </div>
                        {notifications.feedback.map((fb) => (
                          <div key={fb._id} className="notif-item">
                            <div className="notif-item-content">
                              <div className="notif-item-title">{fb.name}</div>
                              <div className="notif-item-desc">{fb.subject}</div>
                            </div>
                            <span className="notif-item-time">{formatTimeSince(fb.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {notifications.counts.total === 0 && (
                      <div className="notif-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <p>Không có thông báo mới</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div 
            className="adminTopbar__user" 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
          >
            <img src="/admin_icon/account.svg" alt="user" className="adminTopbar__icon" />
            {user && (
              <div className="adminTopbar__userInfo">
                <span className="adminTopbar__userName">{user.fullName || user.username}</span>
                <span className="adminTopbar__userRole">{user.role}</span>
              </div>
            )}
            
            {showUserMenu && (
              <div className="adminTopbar__userMenu" onClick={(e) => e.stopPropagation()}>
                <div className="adminTopbar__menuItem" onClick={() => {
                  setShowChangePassword(true);
                  setShowUserMenu(false);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Đổi mật khẩu</span>
                </div>
                <div className="adminTopbar__menuItem" onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Đăng xuất</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showChangePassword} 
        onClose={() => setShowChangePassword(false)} 
      />
    </>
  )
}