import React from 'react'
import '../styles/componentStyles/ProductCard.css'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <div className="product-card">
      {product.discount && (
        <div className="product-badge">{product.discount}%</div>
      )}
      
      <button 
        className="favorite-btn"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? <IoHeart /> : <IoHeartOutline />}
      </button>

      <div className="product-image">
        <img src={product.image} alt={product.name} />
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
            <span className="original-price">${product.originalPrice}</span>
          )}
          <span className="current-price">${product.price}</span>
        </div>

        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default ProductCard