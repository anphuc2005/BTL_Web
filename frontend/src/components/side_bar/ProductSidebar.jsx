import React, { useState } from 'react'
import '../../styles/componentStyles/ProductSidebar.css'
import { IoChevronDown } from 'react-icons/io5'

const ProductSidebar = ({ 
  onBrandChange, 
  onPriceChange,
  onCategoryChange,
  selectedBrand = 'Tất cả',
  selectedCategory = 'all',
  priceRange = [0, 10000000]
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    advanced: true,
    accessories: false,
    sort: false
  })

  const brands = [
    { name: 'Tất cả', value: 'Tất cả', count: 0 },
    { name: 'Original', value: 'Original', count: 0 },
    { name: 'OEM', value: 'OEM', count: 0 },
    { name: 'Third-party', value: 'Third-party', count: 0 },
    { name: 'Refurbished', value: 'Refurbished', count: 0 }
  ]

  const categories = [
    { name: 'Tất cả', value: 'all' },
    { name: 'Màn hình', value: 'screen' },
    { name: 'Pin', value: 'battery' },
    { name: 'Camera', value: 'camera' },
    { name: 'Cổng sạc', value: 'charging-port' },
    { name: 'Loa', value: 'speaker' },
    { name: 'Nút bấm', value: 'button' },
    { name: 'Bo mạch', value: 'motherboard' },
    { name: 'Vỏ máy', value: 'case' },
    { name: 'Khác', value: 'other' }
  ]

  const priceFilters = [
    { name: 'Dưới 500k', range: [0, 500000] },
    { name: '500k - 1 triệu', range: [500000, 1000000] },
    { name: '1 - 3 triệu', range: [1000000, 3000000] },
    { name: '3 - 5 triệu', range: [3000000, 5000000] },
    { name: 'Trên 5 triệu', range: [5000000, 10000000] }
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleBrandChange = (brand, isChecked) => {
    if (isChecked) {
      onBrandChange(brand)
    }
  }

  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      onCategoryChange(category)
    }
  }

  const handlePriceFilterClick = (range) => {
    // Nếu đang chọn filter này, bỏ tick để hiển thị tất cả
    if (isPriceRangeActive(range)) {
      onPriceChange([0, 10000000])
    } else {
      onPriceChange(range)
    }
  }

  const isPriceRangeActive = (filterRange) => {
    return priceRange[0] === filterRange[0] && priceRange[1] === filterRange[1]
  }

  return (
    <aside className="products-sidebar">
      {/* Danh mục */}
      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">Danh mục</h3>
          <button className="filter-reset" onClick={() => onCategoryChange('all')}>Xóa</button>
        </div>
        
        <div className="filter-list">
          {categories.map((category, index) => (
            <label key={index} className="filter-item">
              <input 
                type="checkbox"
                checked={selectedCategory === category.value}
                onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="brand-name">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Thương hiệu */}
      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">Thương hiệu</h3>
          <button className="filter-reset" onClick={() => onBrandChange('Tất cả')}>Xóa</button>
        </div>
        
        <div className="filter-list">
          {brands.map((brand, index) => (
            <label key={index} className="filter-item">
              <input 
                type="checkbox"
                checked={selectedBrand === brand.value}
                onChange={(e) => handleBrandChange(brand.value, e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="brand-name">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Linh lạc - Giá */}
      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">Linh kiện</h3>
          <button className="filter-reset" onClick={() => onPriceChange([0, 10000000])}>Xóa</button>
        </div>
        
        <div className="price-section">
          {/* Price Range Input */}
          <div className="range-container">
            <div className="range-inputs">
              <input 
                type="text" 
                placeholder="Min" 
                value={priceRange[0] || ''}
                onChange={(e) => onPriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input 
                type="text" 
                placeholder="Max" 
                value={priceRange[1] || ''}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value) || 10000000])}
                className="price-input"
              />
            </div>

            <div className="range-slider-wrapper">
              {/* Background track */}
              <div className="slider-track"></div>
              {/* Active range track */}
              <div 
                className="slider-range"
                style={{
                  left: `${(priceRange[0] / 10000000) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / 10000000) * 100}%`
                }}
              ></div>
              {/* Min thumb */}
              <input 
                type="range" 
                min="0" 
                max="10000000"
                step="100000"
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = Math.min(parseInt(e.target.value), priceRange[1])
                  onPriceChange([newMin, priceRange[1]])
                }}
                className="range-slider range-min"
              />
              {/* Max thumb */}
              <input 
                type="range" 
                min="0" 
                max="10000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = Math.max(parseInt(e.target.value), priceRange[0])
                  onPriceChange([priceRange[0], newMax])
                }}
                className="range-slider range-max"
              />
            </div>
          </div>

          {/* Price Filters */}
          <div className="filter-list">
            {priceFilters.map((filter, index) => (
              <label key={index} className="filter-item">
                <input 
                  type="checkbox"
                  checked={isPriceRangeActive(filter.range)}
                  onChange={() => handlePriceFilterClick(filter.range)}
                />
                <span className="checkbox-custom"></span>
                <span>{filter.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ProductSidebar