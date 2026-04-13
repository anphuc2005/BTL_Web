import React, { useState, useEffect } from 'react'
import ProductLayout from '../../layouts/ProductLayout'
import ProductCard from '../../components/card/ProductCard'
import '../../styles/mainStyles/Product.css'
import { IoGridOutline, IoListOutline } from 'react-icons/io5'
import { productAPI } from '../../services/api'

const Products = () => {
  const [viewType, setViewType] = useState('grid')
  const [selectedBrand, setSelectedBrand] = useState('Tất cả')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productAPI.getAll({
          limit: 100 
        }, { signal: abortController.signal })
        if (!abortController.signal.aborted) {
          setProducts(response.data.data)
          setError(null)
        }
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return
        console.error('Error fetching products:', err)
        if (!abortController.signal.aborted) {
          setError('Không thể tải sản phẩm. Vui lòng thử lại sau.')
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      abortController.abort()
    }
  }, [])

  const mockProducts = [
    {
      id: 1,
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '1,259.00',
      originalPrice: '1,859.00',
      discount: 32,
      rating: 4,
      reviews: 16,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+1',
      brand: 'Apple'
    },
    {
      id: 2,
      name: 'Galaxy Tab S9 Ultra 14.6" 256GB WiFi',
      price: '1,159.00',
      originalPrice: '1,499.00',
      discount: 23,
      rating: 5,
      reviews: 24,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=Galaxy+Tab+1',
      brand: 'Samsung'
    },
    {
      id: 3,
      name: 'Xiaomi Pad 6 11" 128GB WiFi',
      price: '459.00',
      originalPrice: '599.00',
      discount: 23,
      rating: 4,
      reviews: 18,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=Xiaomi+Pad+1',
      brand: 'Xiaomi'
    },
    {
      id: 4,
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '832.00',
      originalPrice: '1,259.00',
      discount: 34,
      rating: 4,
      reviews: 14,
      status: 'Hết hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+4',
      brand: 'Apple'
    },
    {
      id: 5,
      name: 'Galaxy Tab A9+ 11" 128GB WiFi',
      price: '299.00',
      originalPrice: '399.00',
      discount: 25,
      rating: 4,
      reviews: 31,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=Galaxy+Tab+2',
      brand: 'Samsung'
    },
    {
      id: 6,
      name: 'iPad Air 10.9" 256GB WiFi',
      price: '749.00',
      originalPrice: '899.00',
      discount: 17,
      rating: 5,
      reviews: 42,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Air+1',
      brand: 'Apple'
    },
    {
      id: 7,
      name: 'OPPO Pad Air 10.36" 128GB WiFi',
      price: '249.00',
      originalPrice: '329.00',
      discount: 24,
      rating: 4,
      reviews: 15,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=OPPO+Pad+1',
      brand: 'Oppo'
    },
    {
      id: 8,
      name: 'Galaxy Tab S8 11" 128GB WiFi',
      price: '649.00',
      originalPrice: '849.00',
      discount: 24,
      rating: 4,
      reviews: 28,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=Galaxy+Tab+3',
      brand: 'Samsung'
    }
  ]

  const formattedProducts = products.map(product => ({
    _id: product._id,
    id: product._id,
    name: product.name,
    price: (product.price / 1000).toLocaleString('vi-VN'), 
    originalPrice: product.originalPrice ? (product.originalPrice / 1000).toLocaleString('vi-VN') : null,
    discount: product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0,
    rating: product.rating || 5,
    reviews: product.numReviews || 0,
    status: product.isAvailable && product.stock > 0 ? 'Có hàng' : 'Hết hàng',
    image: product.image,
    brand: product.brand,
    category: product.category,
    stock: product.stock,
    rawPrice: product.price 
  }))

  const filteredProducts = formattedProducts.filter(product => {
    const matchBrand = selectedBrand === 'Tất cả' || product.brand === selectedBrand
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchPrice = product.rawPrice >= priceRange[0] && product.rawPrice <= priceRange[1]
    return matchBrand && matchCategory && matchPrice
  })

  const handleAddToCart = (product) => {
    console.log('Thêm vào giỏ hàng:', product)
  }

  return (
    <ProductLayout
      onBrandChange={setSelectedBrand}
      onCategoryChange={setSelectedCategory}
      onPriceChange={setPriceRange}
      selectedBrand={selectedBrand}
      selectedCategory={selectedCategory}
      priceRange={priceRange}
    >
      <div className="products-section">
        <div className="products-header">
          <div className="products-info">
            <h1 className="products-title">LINH KIỆN SỬA CHỮA</h1>
            <p className="products-count">
              {loading ? 'Đang tải...' : `Hiển thị ${filteredProducts.length} sản phẩm`}
            </p>
          </div>
          
          <div className="products-controls">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                onClick={() => setViewType('grid')}
                title="Xem dạng lưới"
              >
                <IoGridOutline />
              </button>
              <button 
                className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                onClick={() => setViewType('list')}
                title="Xem dạng danh sách"
              >
                <IoListOutline />
              </button>
            </div>
            
            {/* <select className="sort-select">
              <option value="">Sắp xếp theo</option>
              <option value="price-low">Giá thấp nhất</option>
              <option value="price-high">Giá cao nhất</option>
              <option value="newest">Mới nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select> */}
          </div>
        </div>

        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="spinner" style={{ 
              border: '4px solid #f3f3f3', 
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '20px', color: '#666' }}>Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="error-container" style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: '#e74c3c'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>⚠️ {error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div className={`products-grid ${viewType}`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  viewType={viewType}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <div className="no-products">
                <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ProductLayout>
  )
}

export default Products