import React from 'react'
import AboutCard from './AboutCard'
import '../styles/componentStyles/AboutSection.css'

const AboutSection = () => {
  const leftColumnCards = [
    {
      title: 'Phương châm',
      description: 'Chúng tôi luôn sẵn sàng phục vụ khách hàng với phương châm',
      backgroundColor: 'bg-gray-60',
      textColor: '#1a1a1a',
      iconColor: '#ffffff',
      delay: 0.1
    },
    {
      iconSrc: '/icon/ic_about_1.svg',
      title: 'Tin cậy',
      content: [
        'Chúng tôi luôn coi mỗi vị khách hàng',
        'Việc sửa chữa luôn được công khai',
        'Đội ngũ nhân viên luôn được update tay nghề',
        'Chúng tôi luôn sẵn sàng lắng nghe ý kiến của khách hàng'
      ],
      backgroundColor: '#E6E6E6',
      textColor: '#1a1a1a',
      iconColor: '#3b82f6',
      delay: 0.2
    },
    {
      iconSrc: '/icon/ic_about_2.svg',
      title: 'Truy cập trực tuyến',
      content: [
        'Trang web được truy cập 24/7 bởi các admin',
        'Luôn được hỗ trợ bởi các chuyên gia trực tuyến',
        'Mọi phản hồi của khách hàng sẽ được gửi qua email',
        'Chúng tôi luôn sẵn sàng tư vấn online'
      ],
      backgroundColor: '#F1F3FE',
      textColor: '#1a1a1a',
      iconColor: '#6366f1',
      delay: 0.3
    }
  ]

  const rightColumnCards = [
    {
      iconSrc: '/icon/ic_about_3.svg',
      title: 'Đội tác chuyên nghiệp',
      content: [
        'Chúng tôi luôn muốn được trở thành bạn với các khách hàng',
        'Chúng tôi đào tạo nhân viên mỗi tối định kỳ',
        'Sẵn sàng mở cửa chào đón với các đối tác mong muốn hợp tác với chúng tôi'
      ],
      backgroundColor: '#F9FAFB',
      textColor: '#1a1a1a',
      iconColor: '#64748b',
      delay: 0.2
    },
    {
      iconSrc: '/icon/ic_about_4.svg',
      title: 'Dịch vụ nhanh chóng',
      content: [
        'Khách hàng luôn được phục vụ nhanh chóng',
        'Sửa chữa luôn được tiến hành đúng giờ',
        'Nếu sửa chữa nặng thì sẽ hẹn khách hàng đến sau để lấy thiết bị'
      ],
      backgroundColor: '#F2FFF9',
      textColor: '#1a1a1a',
      iconColor: '#10b981',
      delay: 0.3
    },
    {
      iconSrc: '/icon/ic_about_5.svg',
      title: 'Tin tưởng',
      content: [
        'Chúng tôi luôn tin tưởng đội ngũ nhân viên',
        'Mang niềm tin trên từng sản phẩm của mình',
        'Linh kiện luôn là chính hãng',
        'Linh kiện sẽ luôn được kí tên của khách hàng để đảm bảo uy tín chất lượng'
      ],
      backgroundColor: '#E7FAEF',
      textColor: '#1a1a1a',
      iconColor: '#fbbf24',
      delay: 0.4
    }
  ]

  return (
    <section className="about-section">
      <div className="about-section-container">
        <div className="about-section-grid">
          <div className="left-column">
            {leftColumnCards.map((card, index) => (
              <div key={index} style={{ animationDelay: `${card.delay}s` }}>
                <AboutCard {...card} />
              </div>
            ))}
          </div>
          
          <div className="right-column">
            {rightColumnCards.map((card, index) => (
              <div key={index} style={{ animationDelay: `${card.delay}s` }}>
                <AboutCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection