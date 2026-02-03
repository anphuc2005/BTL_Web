import { useState } from 'react'
import Facebook from './FacebookLogo'
import Instagram from './InstagramLogo'
import Twitter from './TwitterLogo'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    alert(`✅ Đã đăng ký nhận thông báo với email: ${email}`)
    setEmail('')
  }

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Popular Brands</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Apple</li>
              <li>Samsung</li>
              <li>Asus</li>
              <li>Google</li>
              <li>Sony</li>
              <li>Huawei</li>
              <li>Nokia</li>
              <li>LG</li>
              <li>OnePlus</li>
              <li>Google</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Popular Models</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>iPhone 13 Pro</li>
              <li>Samsung Galaxy S23</li>
              <li>OnePlus Nord</li>
              <li>Realme GT</li>
              <li>Oppo A16</li>
              <li>Xiaomi Redmi Note 10</li>
              <li>Samsung Galaxy A52</li>
              <li>Infinix Hot 10 Play</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Muốn hợp tác với chúng tôi</h3>
            <p className="text-sm text-gray-300 mb-4">Contact Us</p>
            
            <h4 className="text-sm font-bold mb-2">Đăng ký nhận thông tin</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-lg text-sm"
                required
              />
              <button
                type="submit"
                className="bg-custom-green hover:bg-custom-green-hover px-4 py-2 rounded-r-lg text-sm transition duration-300"
              >
                Đăng ký
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition duration-300">
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>
      
      </div>
    </footer>
  )
}
