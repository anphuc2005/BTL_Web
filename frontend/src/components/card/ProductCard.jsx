import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/componentStyles/ProductCard.css'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useFavorites } from '../../contexts/FavoritesContext'

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleProductDetailClick = () => {
    navigate(`/productDetail/${product.id}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(product.id)
  }

  return (
    <div className="product-card">
      {product.discount && (
        <div className="product-badge">{product.discount}%</div>
      )}
      
      <button 
        className="favorite-btn"
        onClick={handleFavoriteClick}
      >
        {!isFavorite(product.id) ? 
          <img src="/icon/heart.svg" alt="Remove from favorites" /> : 
          <img src="/icon/heart-filled.svg" alt="Add to favorites" />
        }
      </button>

      <div className="product-image">
        <img src={product.image} alt={product.name} referrerPolicy="no-referrer" />
      </div>

      <div className="product-info">
        <div className="product-rating">
          <span className="stars">
            {'⭐'.repeat(product.rating)} ({product.reviews})
          </span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-status">
          {product.status === 'Có hàng' && (
            <span className="status-in-stock">✓ Có hàng</span>
          )}
          {product.status === 'Hết hàng' && (
            <span className="status-out-of-stock">✗ Hết hàng</span>
          )}
        </div>

        <div className="product-pricing">
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice}k</span>
          )}
          <span className="current-price">{product.price}k</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleProductDetailClick}>
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default ProductCard