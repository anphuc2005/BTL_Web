import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/adminStyles/AdminSidebar.css'

const Brand = () => (
  <div className="adminSidebar__brand">
    <div className="adminSidebar__dots">
      <span className="dot dot--pink" />
      <span className="dot dot--purple" />
      <span className="dot dot--blue" />
    </div>
    <div className="adminSidebar__brandText">SiteLogo</div>
  </div>
)

export default function AdminSidebar() {
  const menu = useMemo(
    () => [
      { to: '/admin/dashboard', label: 'Bảng điều khiển', icon: '▦' },
      { to: '/admin/inventory', label: 'Kho hàng', icon: 'I' },
      { to: '/admin/analytics', label: 'Thống kê', icon: 'A' },
      { to: '/admin/feedbackManagement', label: 'Quản lý phản hồi', icon: 'F' },
    ],
    [],
  )

  const account = useMemo(
    () => [
      { to: '/admin/account', label: 'Tài khoản', icon: '👤' },
      { to: '/logout', label: 'Đăng xuất', icon: '⎋' },
    ],
    [],
  )

  return (
    <aside className="adminSidebar">
      <Brand />

      <div className="adminSidebar__profile">
        <div className="adminSidebar__avatar" aria-hidden />
        <div className="adminSidebar__profileMeta">
          <div className="adminSidebar__name">Super Admin</div>
          <div className="adminSidebar__role">Admin</div>
        </div>
      </div>

      <div className="adminSidebar__sectionTitle">Menu</div>
      <nav className="adminSidebar__nav">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'adminNavItem adminNavItem--active' : 'adminNavItem'
            }
          >
            <span className="adminNavItem__icon">{item.icon}</span>
            <span className="adminNavItem__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}