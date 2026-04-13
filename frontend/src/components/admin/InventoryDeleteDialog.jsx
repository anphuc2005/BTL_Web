import '../../styles/adminStyles/InventoryDialog.css'

export default function InventoryDeleteDialog({ item, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(item.id)
    onClose()
  }

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <h3>Xác nhận xóa</h3>
        <div className="dialog-body">
          <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>{item?.name}</strong>?</p>
        </div>
        <div className="dialog-actions">
          <button onClick={onClose} className="btn-cancel">
            Hủy
          </button>
          <button onClick={handleConfirm} className="btn-delete">
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}
