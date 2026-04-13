import '../../styles/adminStyles/InventoryCard.css'

export default function InventoryCard({ item, onEditClick, onDeleteClick }) {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="status-badge status-badge--available">CÒN HÀNG</span>
      case 'out-of-stock':
        return <span className="status-badge status-badge--out">HẾT HÀNG</span>
      default:
        return null
    }
  }

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    }
    return price
  }

  return (
    <div className="inventoryCard">
      <div className="inventoryCard__header">
        <div className="inventoryCard__title">
          <h3>{item.name}</h3>
          {getStatusBadge(item.status)}
        </div>
        <div className="inventoryCard__actions">
          <button 
            className="action-btn action-btn--delete" 
            onClick={() => onDeleteClick?.(item)}
          >
            <img src="/admin_icon/delete.svg" alt="delete" /> XÓA
          </button>
          <button 
            className="action-btn action-btn--edit" 
            onClick={() => onEditClick?.(item)}
          >
            <img src="/admin_icon/pencil.svg" alt="edit" /> SỬA
          </button>
        </div>
      </div>

      <div className="inventoryCard__body">
        <div className="inventoryCard__info">
          <div className="info-row">
            <span className="info-label">Thương hiệu</span>
            <span className="info-value">{item.brand}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Số lượng</span>
            <span className="info-value">{item.quantity || item.stock}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Đơn giá</span>
            <span className="info-value">{formatPrice(item.price)}</span>
          </div>
          {item.category && (
            <div className="info-row">
              <span className="info-label">Danh mục</span>
              <span className="info-value">{item.category}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}