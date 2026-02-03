import { useNavigate } from 'react-router-dom'
export default function Header() {
  const navigate = useNavigate()

  const handleOrderClick = () => {
    navigate('/order')
  }

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
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-green-600 hover:text-green-700 px-3 py-2 text-sm font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Contact us</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">FAQs</a>
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
