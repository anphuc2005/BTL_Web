import { useNavigate, useLocation } from 'react-router-dom'
export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOrderClick = () => {
    navigate('/order')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-900">
              <span className="text-orange-500">||</span> SiteLogo
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-16">
              <span onClick={() => navigate('/')} className={isActive('/') ? "text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer" : "text-gray-700 hover:text-gray-900 text-sm font-medium cursor-pointer"}>Home</span>
              <span onClick={() => navigate('/about')} className={isActive('/about') ? "text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer" : "text-gray-700 hover:text-gray-900 text-sm font-medium cursor-pointer"}>About</span>
              <span onClick={() => navigate('/product')} className={isActive('/product') ? "text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer" : "text-gray-700 hover:text-gray-900 text-sm font-medium cursor-pointer"}>Product</span>
              <span onClick={() => navigate('/faq')} className={isActive('/faq') ? "text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer" : "text-gray-700 hover:text-gray-900 text-sm font-medium cursor-pointer"}>FAQs</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
            onClick ={handleOrderClick}
            className="bg-custom-green hover:bg-custom-green-hover text-white px-10 py-2 rounded-lg text-sm font-medium transition duration-300">
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
