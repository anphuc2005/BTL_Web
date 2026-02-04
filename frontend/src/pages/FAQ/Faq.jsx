import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import '../../styles/mainStyles/Faq.css'
import { IoAdd, IoRemove } from 'react-icons/io5'

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const faqData = [
    {
      question: 'Giá sửa khoảng bao nhiêu?',
      answer: 'Giá sẽ phụ thuộc vào dòng máy và mức độ hư hỏng. Bên em bảo giá trước khách động ý môi sửa, không phát sinh chi phí.'
    },
    {
      question: 'Có bị mất dữ liệu không?',
      answer: 'Không, chúng tôi cam kết bảo vệ dữ liệu của bạn trong quá trình sửa chữa.'
    },
    {
      question: 'Kiểm tra có mất phí không?',
      answer: 'Kiểm tra ban đầu hoàn toàn miễn phí, bạn sẽ biết rõ chi phí trước khi quyết định sửa.'
    },
    {
      question: 'Linh kiện thay có phải chính hãng không?',
      answer: 'Tất cả linh kiện thay thế của chúng tôi đều là chính hãng và có bảo hành.'
    },
    {
      question: 'Có được xem trực tiếp lúc sửa không?',
      answer: 'Có, khách hàng được phép quan sát quá trình sửa chữa để yên tâm.'
    },
    {
      question: 'Sửa xong có bảo hành không?',
      answer: 'Có, chúng tôi cung cấp bảo hành cho tất cả các dịch vụ sửa chữa.'
    }
  ]

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  return (
    <MainLayout>
    <div className="faq-page">    
      <main className="faq-main">
        <div className="faq-container">
          {/* Tiêu đề */}
          <h1 className="faq-title">Các câu hỏi phổ biến</h1>

          {/* FAQ Items */}
          <div className="faq-items">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedIndex === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleExpand(index)}
                >
                  <span className="faq-icon">
                    {expandedIndex === index ? <IoRemove /> : <IoAdd />}
                  </span>
                  <span className="faq-question-text">{item.question}</span>
                </button>
                
                {expandedIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="faq-cta-section">
            <h2 className="cta-title">Bạn vẫn còn thắc mắc hoặc muốn biết thêm thông tin</h2>
            <p className="cta-description">
              Chúng tôi chỉ sử dụng các linh kiện chất lượng cao nhất và cung cấp nhiều dịch vụ sửa chữa. Từ thay thế màn hình độn giấn đến sửa chữa bo mạch chủ phức tạp. Chúng tôi cung cấp dịch vụ sửa chữa trong ngày trong hầu hết các trường hợp!
            </p>
            <button className="cta-button">Liên hệ</button>
          </div>
        </div>
      </main>
    </div>
    </MainLayout>
  )
}

export default Faq