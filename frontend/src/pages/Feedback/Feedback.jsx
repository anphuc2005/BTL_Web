import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import '../../styles/mainStyles/Feedback.css'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'
import { feedbackAPI } from '../../services/api'

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: 'Dịch vụ',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset status
    setSubmitStatus(null)
    setSubmitMessage('')
    setIsSubmitting(true)
    
    try {
      const response = await feedbackAPI.send(formData)
      
      if (response.data.success) {
        setSubmitStatus('success')
        setSubmitMessage(response.data.message || 'Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ liên hệ lại sớm nhất.')
        
        // Reset form sau 3 giây
        setTimeout(() => {
          setFormData({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            serviceType: 'Dịch vụ',
            message: ''
          })
          setSubmitStatus(null)
        }, 3000)
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setSubmitStatus('error')
      setSubmitMessage(
        error.response?.data?.message || 
        'Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
    <div className="feedback-page">
      
      <main className="feedback-main">
        {/* Hero Section */}
        <section className="feedback-hero">
          <div className="container">
            <h1 className="hero-title">Liên lạc với chúng tôi</h1>
            <p className="hero-subtitle">
              Bạn có câu hỏi hoặc nhận xét gì? Hãy gửi tin nhắn cho chúng tôi!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Info */}
              <div className="contact-info">
                <h2 className="contact-title">Thông tin liên lạc</h2>
                <p className="contact-subtitle">
                  Bạn hãy để lại nhận xét hay thắc mắc gì. Chúng 
                  tôi luôn sẵn sàng giúp đỡ sớm nhất
                </p>

                <div className="contact-details">
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>+84 383 679 215</span>
                  </div>

                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>phananphuc2005@gmail.com</span>
                  </div>

                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>
                      132 Dartmouth Street Boston,<br />
                      Massachusetts 02156 United States
                    </span>
                  </div>
                </div>

                <div className="social-links">
                  <a href="#" className="social-link">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-link">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-link">
                    <FaDiscord />
                  </a>
                </div>

                <div className="contact-decoration"></div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-wrapper">
                {submitStatus && (
                  <div className={`alert alert-${submitStatus}`} style={{
                    padding: '15px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    backgroundColor: submitStatus === 'success' ? '#d4edda' : '#f8d7da',
                    color: submitStatus === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${submitStatus === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                    fontWeight: '500'
                  }}>
                    {submitMessage}
                  </div>
                )}
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Họ</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Tên</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 012 3456 789"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Loại thắc mắc của bạn</label>
                    <div className="radio-group">
                      <label className="radio-item">
                        <input
                          type="radio"
                          name="serviceType"
                          value="Dịch vụ"
                          checked={formData.serviceType === 'Dịch vụ'}
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        Dịch vụ
                      </label>
                      <label className="radio-item">
                        <input
                          type="radio"
                          name="serviceType"
                          value="Thất giới"
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        Linh kiện
                      </label>
                      <label className="radio-item">
                        <input
                          type="radio"
                          name="serviceType"
                          value="Bảo hành"
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        Bảo hành
                      </label>
                      <label className="radio-item">
                        <input
                          type="radio"
                          name="serviceType"
                          value="Khác"
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        Khác
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Lời nhắn</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Viết lời nhắn của bạn ở đây"
                      rows="4"
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="location-section">
          <div className="container">
            <h2 className="section-title">Vị trí của chúng tôi</h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.3359699264287!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e2e7a2d%3A0x62e0a5e1b3e79a7a!2s415%20Mission%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
    </MainLayout>
  )
}

export default Feedback