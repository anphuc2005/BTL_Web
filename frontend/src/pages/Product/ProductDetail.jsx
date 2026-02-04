import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import ProductCard from '../../components/ProductCard'
import '../../styles/mainStyles/ProductDetail.css'
import { 
  IoHeart, 
  IoHeartOutline, 
  IoChevronBack, 
  IoChevronForward,
  IoShareSocialOutline,
  IoSearchOutline
} from 'react-icons/io5'

const ProductDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock product detail
  const product = {
    id: 1,
    name: 'Camera iPad',
    rating: 4,
    reviews: 18,
    price: '$499.00',
    images: [
      'https://via.placeholder.com/400x400?text=Camera+iPad+1',
      'https://via.placeholder.com/400x400?text=Camera+iPad+2',
      'https://via.placeholder.com/400x400?text=Camera+iPad+3'
    ],
    description: [
      'Loại Cổng Hỗ Trợ Truyền hóa, 5n Hỗng',
      'Thời gian bảo hành: 12 tháng (1 năm)',
      'Chính sách bảo hành có tính năng nâng cấp miễn phí. Xem chi tiết →',
      'Thời gian xuất xứ: 30-90 ngày',
      'Sắr động công nghệ, lý thuyết trên đất',
      'Mã sản phẩm hồi môi lên: 0968.304.308',
      'KhmerYth@shopingxtrm-t.com',
      'Chào lạc camera chân - một các lựa chọn tuyệt vời'
    ],
    relatedProducts: [
      {
        id: 2,
        name: 'Product 1',
        price: '499.00',
        rating: 4,
        reviews: 14,
        image: 'https://via.placeholder.com/180x180?text=Product+1',
        status: 'Có hàng'
      },
      {
        id: 3,
        name: 'Product 2',
        price: '599.00',
        rating: 4,
        reviews: 16,
        image: 'https://via.placeholder.com/180x180?text=Product+2',
        status: 'Có hàng'
      },
      {
        id: 4,
        name: 'iPhone 14 Pro',
        price: '499.00',
        rating: 5,
        reviews: 18,
        image: 'https://via.placeholder.com/180x180?text=iPhone+14',
        status: 'Có hàng'
      },
      {
        id: 5,
        name: 'iPhone 14 Pro',
        price: '499.00',
        rating: 5,
        reviews: 18,
        image: 'https://via.placeholder.com/180x180?text=iPhone+14+Max',
        status: 'Có hàng'
      }
    ]
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="product-detail-page">
      <Header />

      <main className="product-detail-main">
        <div className="product-detail-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="image-zoom">
              <button className="zoom-btn">
                <IoSearchOutline />
              </button>
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
              />
            </div>

            <div className="image-carousel">
              <button className="carousel-btn prev-btn" onClick={prevImage}>
                <IoChevronBack />
              </button>
              <p className="carousel-title">{product.name}</p>
              <button className="carousel-btn next-btn" onClick={nextImage}>
                <IoChevronForward />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details">
            <div className="detail-header">
              <h1 className="detail-title">{product.name}</h1>
              <button 
                className="favorite-btn-detail"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <IoHeart /> : <IoHeartOutline />}
              </button>
            </div>

            <div className="detail-rating">
              <span className="stars">{'⭐'.repeat(product.rating)}</span>
              <span className="reviews">({product.reviews})</span>
            </div>

            <ul className="detail-list">
              {product.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="detail-actions">
              <div className="social-share">
                <button><IoShareSocialOutline /></button>
                <button><i className="fab fa-facebook"></i></button>
                <button><i className="fab fa-twitter"></i></button>
                <button><i className="fab fa-linkedin"></i></button>
                <button><i className="fab fa-pinterest"></i></button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="related-products">
          <h2 className="related-title">Sản phẩm liên quan</h2>
          <div className="related-grid">
            {product.relatedProducts.map(item => (
              <ProductCard 
                key={item.id} 
                product={{...item, discount: 0, status: 'Có hàng'}}
                onAddToCart={() => console.log(item)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetail