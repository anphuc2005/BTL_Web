import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import ProductCard from '../../components/ProductCard'
import '../../styles/mainStyles/Product.css'
import { IoGridOutline, IoListOutline } from 'react-icons/io5'

const Product = () => {
  const [viewType, setViewType] = useState('grid')
  const [selectedBrand, setSelectedBrand] = useState('Tất cả')
  const [priceRange, setPriceRange] = useState([0, 2000])

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
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '1,259.00',
      originalPrice: '1,859.00',
      discount: 32,
      rating: 4,
      reviews: 16,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+2',
      brand: 'Apple'
    },
    {
      id: 3,
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '1,259.00',
      originalPrice: '1,859.00',
      discount: 32,
      rating: 4,
      reviews: 18,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+3',
      brand: 'Apple'
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
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '1,259.00',
      originalPrice: '1,859.00',
      discount: 32,
      rating: 4,
      reviews: 14,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+5',
      brand: 'Apple'
    },
    {
      id: 6,
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '1,259.00',
      originalPrice: '1,859.00',
      discount: 32,
      rating: 5,
      reviews: 18,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+6',
      brand: 'Apple'
    },
    {
      id: 7,
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '783.00',
      originalPrice: '1,259.00',
      discount: 38,
      rating: 4,
      reviews: 18,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+7',
      brand: 'Apple'
    },
    {
      id: 8,
      name: 'iPad Pro Tablet 2023 LTE + Wifi 5G Cellular 128 8-inch 512GB',
      price: '1,259.00',
      originalPrice: '1,859.00',
      discount: 32,
      rating: 5,
      reviews: 18,
      status: 'Có hàng',
      image: 'https://via.placeholder.com/200x200?text=iPad+Pro+8',
      brand: 'Apple'
    }
  ]

  const brands = ['Tất cả', 'Apple', 'Samsung', 'Xiaomi', 'Vivo', 'Huawei', 'Nokia']

  const filteredProducts = mockProducts.filter(product => {
    const price = parseFloat(product.price.replace(',', ''))
    const matchBrand = selectedBrand === 'Tất cả' || product.brand === selectedBrand
    const matchPrice = price >= priceRange[0] && price <= priceRange[1]
    return matchBrand && matchPrice
  })

  const handleAddToCart = (product) => {
    console.log('Thêm vào giỏ hàng:', product)
    // TODO: Implement add to cart logic
  }

  return (
    <MainLayout>
    <div className="products-page">

      <main className="products-main">
        <div className="products-container">
          {/* Sidebar */}
          <aside className="products-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Danh mục</h3>
              <div className="filter-list">
                <label className="filter-item">
                  <input type="checkbox" defaultChecked />
                  <span>Apple</span>
                  <span className="count">126</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Samsung</span>
                  <span className="count">145</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Xiaomi</span>
                  <span className="count">118</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Vivo</span>
                  <span className="count">110</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Huawei</span>
                  <span className="count">38</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Nokia</span>
                  <span className="count">8</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Linh kiện</h3>
              <div className="range-slider">
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>
              <div className="price-inputs">
                <input type="number" placeholder="Giá tối thiểu" value={priceRange[0]} />
                <span>-</span>
                <input type="number" placeholder="Giá tối đa" value={priceRange[1]} />
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Bộ lọc nâng cao</h3>
              <div className="filter-list">
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Mới nhất</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Đang bán</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Liên tục</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Giảm giá</span>
                </label>
                <label className="filter-item">
                  <input type="checkbox" />
                  <span>Khác</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Phụ kiện</h3>
              <select className="filter-select">
                <option>Manhôn</option>
                <option>Màn hình</option>
                <option>Pin</option>
                <option>Cáp</option>
              </select>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Sắp</h3>
              <select className="filter-select">
                <option>Mặc định</option>
                <option>Giá thấp</option>
                <option>Giá cao</option>
                <option>Mới nhất</option>
              </select>
            </div>
          </aside>

          {/* Main Content */}
          <section className="products-content">
            <div className="products-header">
              <h2 className="products-title">SẢN PHẨM</h2>
              <div className="products-controls">
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewType('grid')}
                    title="Grid view"
                  >
                    <IoGridOutline />
                  </button>
                  <button 
                    className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                    onClick={() => setViewType('list')}
                    title="List view"
                  >
                    <IoListOutline />
                  </button>
                </div>
                <select className="sort-select">
                  <option>Hãy chọn sắp xếp</option>
                  <option>Giá thấp nhất</option>
                  <option>Giá cao nhất</option>
                  <option>Mới nhất</option>
                </select>
              </div>
            </div>

            <div className={`products-grid ${viewType === 'list' ? 'list-view' : ''}`}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

    </div>
    </MainLayout>
  )
}


export default Product