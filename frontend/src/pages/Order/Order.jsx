import { useEffect, useState } from 'react'
import '../../styles/mainStyles/Order.css'
import MainLayout from '../../layouts/MainLayout'
import { orderAPI } from '../../services/api'

const VIETNAM_LOCATION_API = 'https://provinces.open-api.vn/api/v2'

const Order = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    deviceType: '',
    deviceModel: '',
    issue: '',
    issueDescription: '',
    customerInfo: {
      name: '',
      phone: '',
      email: '',
      cityCode: '',
      city: '',
      wardCode: '',
      ward: '',
      addressDetail: ''
    }
  })
  const [orderResult, setOrderResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [provinces, setProvinces] = useState([])
  const [wards, setWards] = useState([])
  const [locationLoading, setLocationLoading] = useState({
    provinces: false,
    wards: false,
  })
  const [locationError, setLocationError] = useState('')

  useEffect(() => {
    const loadProvinces = async () => {
      setLocationLoading((prev) => ({ ...prev, provinces: true }))
      setLocationError('')

      try {
        const response = await fetch(`${VIETNAM_LOCATION_API}/p/`)
        if (!response.ok) {
          throw new Error('Không thể tải danh sách tỉnh/thành phố')
        }

        const data = await response.json()
        setProvinces(data)
      } catch (err) {
        setLocationError(err.message || 'Lỗi tải dữ liệu địa chỉ')
      } finally {
        setLocationLoading((prev) => ({ ...prev, provinces: false }))
      }
    }

    loadProvinces()
  }, [])

  const devices = [
    { 
      id: 'iphone', 
      name: 'iPhone', 
      image: '/img/ip_logo.jpg',
      alt: 'iPhone device'
    },
    { 
      id: 'ipad', 
      name: 'iPad', 
      image: '/img/ipad_logo.jpg',
      alt: 'iPad device'
    },
    { 
      id: 'android', 
      name: 'Android', 
      image: '/img/android_logo.jpg',
      alt: 'Android device'
    },
    { 
      id: 'tablet', 
      name: 'Tablet', 
      image: '/img/tablet_logo.jpg',
      alt: 'Tablet device'
    }
  ]

  const issues = [
    { 
      id: 'screen', 
      name: 'Vỡ màn hình', 
      image: '/img/smash.png' 
    },
    { 
      id: 'battery', 
      name: 'Pin', 
      image: '/img/no-charge.png' 
    },
    { 
      id: 'charging', 
      name: 'Cổng sạc',
      image: '/img/usb.png'
    },
    { 
      id: 'camera', 
      name: 'Camera',
      image: '/img/camera.png'
    },
    { 
      id: 'diagnosis', 
      name: 'Chẩn đoán',
      image: '/img/telemedicine.png'
    }
  ]

  const handleDeviceSelect = (device) => {
    setFormData({ ...formData, deviceType: device })
    setTimeout(() => setCurrentStep(2), 300)
  }

  const handleIssueSelect = (issue) => {
    setFormData({ ...formData, issue: issue })
  }

  const handleIssueNext = () => {
    if (formData.issue) {
      setTimeout(() => setCurrentStep(3), 300)
    }
  }

  const handleCustomerInfoSubmit = async (e) => {
    e.preventDefault()
    setCurrentStep(4)
    setLoading(true)
    setError(null)

    try {
      const fullAddress = [
        formData.customerInfo.addressDetail,
        formData.customerInfo.ward,
        formData.customerInfo.city,
      ].filter(Boolean).join(', ')

      const orderData = {
        orderType: 'repair-service',
        repairInfo: {
          deviceType: formData.deviceType,
          issue: formData.issue,
          issueDescription: formData.issueDescription || 'Không có mô tả',
        },
        orderItems: [],
        customerInfo: {
          name: formData.customerInfo.name,
          email: formData.customerInfo.email || 'no-email@service.com',
          phone: formData.customerInfo.phone
        },
        shippingAddress: {
          fullName: formData.customerInfo.name,
          address: fullAddress,
          city: formData.customerInfo.city,
          ward: formData.customerInfo.ward,
          phoneNumber: formData.customerInfo.phone
        },
      }

      // Gọi API tạo order
      const response = await orderAPI.create(orderData)
      
      if (response.data && response.data.success) {
        setOrderResult(response.data.data)
        setTimeout(() => setCurrentStep(5), 1000)
      } else {
        throw new Error('Tạo đơn hàng thất bại')
      }
    } catch (err) {
      console.error('Error creating order:', err)
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi tạo đơn hàng')
      setTimeout(() => {
        setCurrentStep(3) // Quay về form
        setLoading(false)
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    if (field === 'issueDescription') {
      setFormData({ ...formData, issueDescription: value })
    } else {
      setFormData({
        ...formData,
        customerInfo: {
          ...formData.customerInfo,
          [field]: value
        }
      })
    }
  }

  const handleCityChange = async (cityCode) => {
    const selectedCity = provinces.find((city) => String(city.code) === cityCode)

    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        cityCode,
        city: selectedCity?.name || '',
        wardCode: '',
        ward: '',
      },
    }))

    setWards([])

    if (!cityCode) return

    setLocationLoading((prev) => ({ ...prev, wards: true }))
    setLocationError('')

    try {
      const response = await fetch(`${VIETNAM_LOCATION_API}/p/${cityCode}?depth=2`)
      if (!response.ok) {
        throw new Error('Không thể tải danh sách quận/huyện/xã')
      }

      const data = await response.json()
      setWards(data.wards || [])
    } catch (err) {
      setLocationError(err.message || 'Lỗi tải dữ liệu quận/huyện/xã')
    } finally {
      setLocationLoading((prev) => ({ ...prev, wards: false }))
    }
  }

  const handleWardChange = (wardCode) => {
    const selectedWard = wards.find((ward) => String(ward.code) === wardCode)

    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        wardCode,
        ward: selectedWard?.name || '',
      },
    }))
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setFormData({
      deviceType: '',
      deviceModel: '',
      issue: '',
      issueDescription: '',
      customerInfo: {
        name: '',
        phone: '',
        email: '',
        cityCode: '',
        city: '',
        wardCode: '',
        ward: '',
        addressDetail: '',
      }
    })
    setOrderResult(null)
    setError(null)
    setLoading(false)
    setWards([])
  }

  return (
    <MainLayout>
      <div className="order-main">
        <div className="order-container">
          {/* Step 1: Device Selection */}
          {currentStep === 1 && (
            <div className="device-selection-section">
              <div className="section-header">
                <h1 className="main-title">Bạn đang gặp vấn đề về thiết bị nào?</h1>
                <p className="subtitle">Chuyên gia của chúng tôi sẽ giúp giải pháp cho bạn!</p>
              </div>
              
              <div className="devices-container">
                <div className="devices-grid">
                  {devices.slice(0, 3).map((device) => (
                    <div
                      key={device.id}
                      onClick={() => handleDeviceSelect(device.id)}
                      className="device-item"
                    >
                      <div className="device-image-container w-24 h-24">
                        <img 
                          src={device.image} 
                          alt={device.alt}
                          className="device-image-real"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="device-image-fallback" style={{display: 'none'}}>
                          {device.id === 'iphone' && '📱'}
                          {device.id === 'ipad' && '📟'}
                          {device.id === 'android' && '📱'}
                          {device.id === 'tablet' && '📟'}
                        </div>
                      </div>
                      <div className="device-label">{device.name}</div>
                    </div>
                  ))}
                </div>
                
                <div className="devices-grid-bottom">
                  <div
                    onClick={() => handleDeviceSelect('tablet')}
                    className="device-item tablet-item"
                  >
                    <div className="device-image-container w-24 h-24">
                      <img 
                        src="/img/tablet_logo.jpg" 
                        alt="Tablet device"
                        className="device-image-real"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="device-image-fallback" style={{display: 'none'}}>
                        📟
                      </div>
                    </div>
                    <div className="device-label">Tablet</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Issue Selection */}
          {currentStep === 2 && (
            <div className="issue-selection-section">
              <div className="section-header">
                <h2 className="page-title">Vấn đề thiết bị của bạn là gì ?</h2>
                <p className="page-subtitle">Chọn lý do mà bạn cần sửa chữa để chúng tôi có thể giúp bạn tốt nhất</p>
              </div>
              
              <div className="issue-options">
                <div className="issue-grid-new">
                  {issues.map((issue) => (
                    <div
                      key={issue.id}
                      onClick={() => handleIssueSelect(issue.id)}
                      className={`issue-option ${formData.issue === issue.id ? 'selected' : ''}`}
                    >
                      <div className="issue-icon-container">
                        <img 
                          src={issue.image} 
                          alt={issue.name}
                          className="issue-image-real"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <span className="issue-text-fallback" style={{display: 'none'}}>
                          {issue.name}
                        </span>
                      </div>
                      <div className="issue-label">{issue.name}</div>
                    </div>
                  ))}
                </div>

                <div className="issue-description">
                  <label className="description-label">Mô tả vấn đề cần sửa:</label>
                  <textarea
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                    className="description-textarea"
                    placeholder="Mô tả chi tiết vấn đề của thiết bị..."
                    rows="4"
                  />
                </div>

                <div className="step-actions">
                  <button onClick={goBack} className="btn-back">
                    Quay lại
                  </button>
                  <button 
                    onClick={handleIssueNext}
                    className="btn-next"
                    disabled={!formData.issue}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <div className="customer-info-section">
              <div className="section-header">
                <h2 className="page-title">Nhập thông tin cá nhân của bạn</h2>
                <p className="page-subtitle">Chúng tôi cần thông tin của bạn để có thể liên lạc và gửi báo giá cho bạn</p>
              </div>
              
              <form onSubmit={handleCustomerInfoSubmit} className="customer-form-new">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label-new">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={formData.customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="form-input-new"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label-new">Số điện thoại</label>
                    <input
                      type="tel"
                      required
                      value={formData.customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input-new"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label-new">Email</label>
                    <input
                      type="email"
                      value={formData.customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input-new"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label-new">Tỉnh / Thành phố</label>
                    <select
                      required
                      value={formData.customerInfo.cityCode}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="form-input-new"
                      disabled={locationLoading.provinces}
                    >
                      <option value="">Chọn tỉnh / thành phố</option>
                      {provinces.map((city) => (
                        <option key={city.code} value={String(city.code)}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label-new">Quận / Huyện / Phường / Xã</label>
                    <select
                      required
                      value={formData.customerInfo.wardCode}
                      onChange={(e) => handleWardChange(e.target.value)}
                      className="form-input-new"
                      disabled={!formData.customerInfo.cityCode || locationLoading.wards}
                    >
                      <option value="">Chọn Quận/Huyện/Phường/Xã</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={String(ward.code)}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label-new">Địa chỉ chi tiết</label>
                    <input
                      type="text"
                      required
                      value={formData.customerInfo.addressDetail}
                      onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                      className="form-input-new"
                      placeholder="Số nhà, tên đường..."
                    />
                  </div>
                </div>

                {locationError && (
                  <p className="page-subtitle" style={{ color: '#dc2626' }}>
                    {locationError}
                  </p>
                )}

                <div className="step-actions">
                  <button
                    type="button"
                    onClick={goBack}
                    className="btn-back"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    className="btn-next"
                  >
                    Tiếp tục
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Processing */}
          {currentStep === 4 && (
            <div className="processing-section">
              <div className="processing-card">
                <div className="processing-icon">
                  <div className="spinner"></div>
                </div>
                <h3 className="processing-title">
                  {loading ? 'Đợi một chút' : error ? 'Có lỗi xảy ra' : 'Hoàn tất!'}
                </h3>
                <p className="processing-desc">
                  {loading ? 'Chúng tôi đang xử lý đơn hàng của bạn trong khi này' : 
                   error ? error : 'Đơn hàng đã được tạo thành công!'}
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {currentStep === 5 && (
            <div className="success-section">
              <div className="success-card">
                <div className="success-animation">
                  <div className="success-circle">
                    <div className="success-checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="success-title">Xong</h3>
                <p className="success-desc">Chúng tôi sẽ liên lạc với bạn trong vòng vài phút nữa để xác nhận đặt lịch</p>
                
                {/* Order Summary Card */}
                <div className="order-summary-card">
                  <h4 className="summary-card-title">Thông tin đơn hàng:</h4>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span className="summary-label">Mã đơn hàng:</span>
                      <span className="summary-value">#{orderResult?.orderNumber || 'ORD000001'}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Thiết bị:</span>
                      <span className="summary-value">{devices.find(d => d.id === formData.deviceType)?.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Vấn đề:</span>
                      <span className="summary-value">{issues.find(i => i.id === formData.issue)?.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Khách hàng:</span>
                      <span className="summary-value">{formData.customerInfo.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">SĐT:</span>
                      <span className="summary-value">{formData.customerInfo.phone}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Trạng thái:</span>
                      <span className="summary-value">{orderResult?.status || 'pending'}</span>
                    </div>
                    {formData.customerInfo.email && (
                      <div className="summary-row">
                        <span className="summary-label">Email:</span>
                        <span className="summary-value">{formData.customerInfo.email}</span>
                      </div>
                    )}
                    {formData.customerInfo.city && (
                      <div className="summary-row">
                        <span className="summary-label">Tỉnh/Thành:</span>
                        <span className="summary-value">{formData.customerInfo.city}</span>
                      </div>
                    )}
                    {formData.customerInfo.ward && (
                      <div className="summary-row">
                        <span className="summary-label">Quận/Phường:</span>
                        <span className="summary-value">{formData.customerInfo.ward}</span>
                      </div>
                    )}
                    {formData.customerInfo.addressDetail && (
                      <div className="summary-row">
                        <span className="summary-label">Chi tiết:</span>
                        <span className="summary-value">{formData.customerInfo.addressDetail}</span>
                      </div>
                    )}
                    {formData.issueDescription && (
                      <div className="summary-row">
                        <span className="summary-label">Mô tả:</span>
                        <span className="summary-value">{formData.issueDescription}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="success-actions">
                  <button className="btn-done" onClick={resetForm}>
                    Xong
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default Order