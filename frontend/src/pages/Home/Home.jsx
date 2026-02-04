import '../../styles/mainStyles/Home.css'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

function Home() {
  const navigate = useNavigate()

  const handleOrderClick = () => {
    navigate('/order')
  }
  return (
    <MainLayout>
      <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-13">
              <div className="flex flex-col lg:flex-row items-center">
                  <div className="lg:w-1/2 lg:pr-10">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      Hợp lí - Nhanh chóng - Đáng tin
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                      Dành cho thiết bị điện tử của bạn
                  </p>
                  <button
                  onClick ={handleOrderClick} 
                  className="bg-custom-green hover:bg-custom-green-hover text-white px-20 py-3 rounded-lg text-lg font-medium transition duration-300">
                      Đặt ngay
                  </button>
                  </div>
                  
                  <div className="lg:w-1/2 mt-12 lg:mt-0">
                  <img
                      src="/img/ani_0.gif"
                      alt="Hero Image"
                      className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  </div>
              </div>
              </div>
          </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <img
                  src= "/icon/ic_0.svg"
                  alt = "Chuyên gia đáng tin"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chuyên gia đáng tin</h3>
              <p className="text-gray-600">
                Đội ngũ chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <img
                  src= "/icon/ic_1.svg"
                  alt = "Sửa chữa nhanh chóng"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sửa chữa nhanh chóng</h3>
              <p className="text-gray-600">
                Chúng tôi luôn có găng sửa chữa thiết bị của bạn nhanh chóng thay thế liền
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <img
                  src= "/icon/ic_2.svg"
                  alt = "Chẩn đoán miễn phí"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chẩn đoán miễn phí</h3>
              <p className="text-gray-600">
                Không chắc chắn vấn đề là gì? Đang lo, chúng tôi sẽ chẩn đoán miễn phí cho bạn
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Các vấn đề hay gặp phải
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center">
                <img
                    src="/img/ip_logo.jpg"
                    alt="iPhone"
                    className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">iPhone</h3>
              <p className="text-sm text-gray-600">
                Với màn hình, chai pin, phần mềm gáp trục và nhiều các vấn đề khác
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center">
                <img
                    src="/img/ipad_logo.jpg"
                    alt="iPad"
                    className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">iPad</h3>
              <p className="text-sm text-gray-600">
                Với màn hình, chai pin, phần mềm gáp trục thay thế mainboard hoặc thay thế
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center">
                <img
                    src="/img/android_logo.jpg"
                    alt="Android"
                    className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Android</h3>
              <p className="text-sm text-gray-600">
                Chúng tôi có thể khắc phục các vấn đề về mainboard hoặc thay thế
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center">
                <img
                    src="/img/tablet_logo.jpg"
                    alt="Tablet"
                    className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Tablet</h3>
              <p className="text-sm text-gray-600">
                Nhanh chóng và các giải pháp tiết kiệm cho hầu hết các vấn đề
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sửa chữa thiết bị di động của bạn ngay hôm nay!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Chúng tôi chỉ sử dụng các linh kiện chất lượng cao nhất và cung cấp nhiều dịch vụ sửa chữa, từ 
              thay thế màn hình, chai pin, giải quyết sự cố phần mềm khác. Chúng tôi cũng cung cấp các dịch 
              vụ sửa chữa trong ngày cho hầu hết các trường hợp!
            </p>
            <button 
            onClick ={handleOrderClick}
            className="bg-custom-green hover:bg-custom-green-hover text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-300">
              Đặt ngay
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home

