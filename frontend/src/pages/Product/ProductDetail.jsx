import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import ProductCard from '../../components/card/ProductCard'
import '../../styles/mainStyles/ProductDetail.css'
import { useFavorites } from '../../contexts/FavoritesContext'
import { productAPI } from '../../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchProductData = async () => {
      try {
        setLoading(true)
        // Fetch main product
        const productResponse = await productAPI.getById(id, { signal: abortController.signal })
        const productData = productResponse.data.data
        
        if (abortController.signal.aborted) return
        setProduct(productData)
        
        // Fetch related products (same category)
        const relatedResponse = await productAPI.getAll({ 
          category: productData.category, 
          limit: 4 
        }, { signal: abortController.signal })
        
        if (abortController.signal.aborted) return
        // Filter out current product from related products
        const filtered = relatedResponse.data.data.filter(p => p._id !== id)
        setRelatedProducts(filtered.slice(0, 4))
        
        setLoading(false)
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return
        console.error('Error fetching product:', err)
        if (!abortController.signal.aborted) {
          setError('Không thể tải thông tin sản phẩm')
          setLoading(false)
        }
      }
    }

    fetchProductData()

    return () => {
      abortController.abort()
    }
  }, [id])

  if (loading) {
    return (
      <MainLayout>
        <div className="product-detail-page">
          <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải...</div>
        </div>
      </MainLayout>
    )
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="product-detail-page">
          <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
            {error || 'Không tìm thấy sản phẩm'}
          </div>
        </div>
      </MainLayout>
    )
  }

  // Use images array if available, otherwise use main image
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]
  
  // Use detailedDescription if available, otherwise fallback to description
  const productDescription = product.detailedDescription && product.detailedDescription.length > 0
    ? product.detailedDescription
    : [product.description]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <MainLayout>
      <div className="product-detail-page">
        <main className="product-detail-main">
          <div className="product-detail-container">
            {/* Product Images */}
            <div className="product-images">
              <div className="image-main">
                <button className="zoom-btn">
                  <img src="/icon/zoom-in.svg" alt="Zoom" />
                </button>
                <img 
                  src={productImages[currentImageIndex]} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="image-navigation">
                <button className="nav-btn prev-btn" onClick={prevImage}>
                  <img src="/icon/chevron-left.svg" alt="Previous" />
                </button>
                <h2 className="product-name-nav">{product.name}</h2>
                <button className="nav-btn next-btn" onClick={nextImage}>
                  <img src="/icon/chevron-right.svg" alt="Next" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="info-header">
                <h1 className="product-title">{product.name}</h1>
                <button 
                  className="favorite-btn"
                  onClick={() => toggleFavorite(product._id)}
                >
                  {!isFavorite(product._id) ? 
                    <img src="/icon/heart.svg" alt="Remove from favorites" /> : 
                    <img src="/icon/heart-filled.svg" alt="Add to favorites" />
                  }
                </button>
              </div>

              <div className="product-specs">
                {productDescription.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-dot">•</span>
                    <span className="spec-text">{spec}</span>
                  </div>
                ))}
              </div>

              <div className="product-category">
                <span className="category-label">Danh mục: </span>
                <span className="category-value">{product.category}</span>
              </div>

              <div className="social-share">
                <button className="social-btn facebook">
                  <img src="/icon/facebook.svg" alt="Share on Facebook" />
                </button>
                <button className="social-btn twitter">
                  <img src="/icon/twitter.svg" alt="Share on Twitter" />
                </button>
                <button className="social-btn email">
                  <img src="/icon/mail.svg" alt="Share via Email" />
                </button>
                <button className="social-btn linkedin">
                  <img src="/icon/linkedin.svg" alt="Share on LinkedIn" />
                </button>
                <button className="social-btn pinterest">
                  <img src="/icon/pinterest.svg" alt="Share on Pinterest" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {/* <section className="related-products">
            <h2 className="related-title">Sản phẩm liên quan</h2>
            <div className="related-grid">
              {relatedProducts.map((item, index) => (
                <div key={item._id} style={{ animationDelay: `${0.3 + index * 0.1}s`, opacity: 0 }}>
                  <ProductCard 
                    product={{
                      id: item._id,
                      name: item.name,
                      price: item.price.toLocaleString('vi-VN'),
                      originalPrice: item.originalPrice ? item.originalPrice.toLocaleString('vi-VN') : null,
                      rating: item.rating,
                      reviews: item.numReviews,
                      image: item.image,
                      status: item.isAvailable ? 'Đang bán' : 'Hết hàng',
                      discount: item.originalPrice 
                        ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                        : 0
                    }}
                    onAddToCart={() => console.log(item)}
                  />
                </div>
              ))}
            </div>
          </section> */}
        </main>
      </div>
    </MainLayout>
  )
}

export default ProductDetail