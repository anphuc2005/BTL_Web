import React, { useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import ProductSidebar from '../components/side_bar/ProductSidebar'
import '../styles/layoutStyles/ProductLayout.css'
import { IoMenu, IoClose } from 'react-icons/io5'

const ProductLayout = ({ 
  children,
  onBrandChange,
  onCategoryChange,
  onPriceChange,
  selectedBrand = 'Samsung',
  selectedCategory = 'all',
  priceRange = [0, 2000]
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleOpenSidebar = () => {
    setSidebarOpen(true)
  }

  return (
    <div className="product-layout">
      <Header />

      <main className="product-layout-main">
        <div className="product-layout-container">
          {/* Mobile Sidebar Toggle Button */}
          <button 
            className="mobile-sidebar-btn"
            onClick={handleOpenSidebar}
          >
            <IoMenu />
            <span>Bộ lọc</span>
          </button>

          {/* Sidebar Overlay (Mobile) */}
          {sidebarOpen && (
            <div 
              className="sidebar-overlay"
              onClick={handleCloseSidebar}
            />
          )}

          {/* Sidebar */}
          <aside className={`product-layout-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h2>Bộ lọc</h2>
              <button 
                className="sidebar-close-btn"
                onClick={handleCloseSidebar}
              >
                <IoClose />
              </button>
            </div>

            <div className="sidebar-content">
              <ProductSidebar 
                onBrandChange={onBrandChange}
                onCategoryChange={onCategoryChange}
                onPriceChange={onPriceChange}
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
              />
            </div>
          </aside>

          {/* Main Content */}
          <section className="product-layout-content">
            {children}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductLayout