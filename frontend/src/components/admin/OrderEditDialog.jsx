import { useState, useEffect } from 'react'
import { productAPI } from '../../services/api'
import '../../styles/adminStyles/OrderEditDialog.css'

export default function OrderEditDialog({ order, onClose, onSave }) {
  const [status, setStatus] = useState(order.status || 'Chờ xác nhận')
  const [selectedItems, setSelectedItems] = useState(order.orderItems || [])
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showItemSelector, setShowItemSelector] = useState(false)

  // Fetch products khi component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Hiển thị item selector khi chuyển sang "Đang xử lý"
  useEffect(() => {
    if (status === 'Đang xử lý' && order.orderType === 'repair-service') {
      setShowItemSelector(true)
    } else if (status !== 'Đang xử lý') {
      setShowItemSelector(false)
    }
  }, [status, order.orderType])

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 100 })
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleAddItem = () => {
    if (!selectedProduct) {
      alert('Vui lòng chọn linh kiện')
      return
    }

    const product = products.find(p => p._id === selectedProduct)
    if (!product) return

    // Kiểm tra xem sản phẩm đã được thêm chưa
    const existingItemIndex = selectedItems.findIndex(
      item => item.product === selectedProduct
    )

    const qtyToAdd = parseInt(quantity, 10) || 1;
    const currentQty = existingItemIndex >= 0 ? selectedItems[existingItemIndex].quantity : 0;
    const newQty = currentQty + qtyToAdd;

    const originalItem = order.orderItems?.find(i => i.product === selectedProduct);
    const originalQty = originalItem ? originalItem.quantity : 0;
    const additionalQtyNeeded = newQty - originalQty;

    if (additionalQtyNeeded > product.stock) {
      alert(`Thêm linh kiện thất bại! Kho hàng chỉ còn ${product.stock} sản phẩm (bạn đang cần thêm ${additionalQtyNeeded}).`)
      return
    }

    if (existingItemIndex >= 0) {
      // Cập nhật quantity nếu đã có
      const updatedItems = [...selectedItems]
      updatedItems[existingItemIndex].quantity += qtyToAdd
      setSelectedItems(updatedItems)
    } else {
      // Thêm mới
      setSelectedItems([
        ...selectedItems,
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: qtyToAdd
        }
      ])
    }

    alert('Thêm linh kiện thành công!')

    // Reset form
    setSelectedProduct('')
    setQuantity(1)
  }

  const handleRemoveItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index)
    setSelectedItems(updatedItems)
  }

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return
    const item = selectedItems[index]
    const product = products.find(p => p._id === item.product)
    
    const originalItem = order.orderItems?.find(i => i.product === item.product);
    const originalQty = originalItem ? originalItem.quantity : 0;
    const additionalQtyNeeded = newQuantity - originalQty;

    if (product && additionalQtyNeeded > product.stock) {
      alert(`Cập nhật thất bại! Kho hàng chỉ còn ${product.stock} sản phẩm (bạn đang cần thêm ${additionalQtyNeeded}).`)
      return
    }

    const updatedItems = [...selectedItems]
    updatedItems[index].quantity = newQuantity
    setSelectedItems(updatedItems)
  }

  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value)
  }

  const handleSave = () => {
    const updateData = {
      _id: order._id,
      status,
      orderItems: selectedItems
    }
    onSave(updateData)
    onClose()
  }

  // Helper để lấy tên thiết bị
  const getDeviceName = () => {
    if (order.orderType === 'repair-service') {
      return order.repairInfo?.deviceType || 'N/A'
    }
    return order.orderItems?.map(item => item.name).join(', ') || 'N/A'
  }

  // Helper để lấy vấn đề
  const getIssue = () => {
    if (order.orderType === 'repair-service') {
      return order.repairInfo?.issue || 'N/A'
    }
    return 'Mua linh kiện'
  }

  // Helper để lấy mô tả chi tiết
  const getIssueDescription = () => {
    return order.repairInfo?.issueDescription || 'Không có mô tả'
  }

  return (
    <div className="dialogOverlay" onClick={onClose}>
      <div className="dialogContent" onClick={(e) => e.stopPropagation()}>
        <div className="dialogHeader">
          <h2>Chi tiết đơn hàng</h2>
          <button className="closeButton" onClick={onClose}>×</button>
        </div>
        
        <div className="dialogBody">
          <div className="orderImage">
            <img src={order.image || order.orderItems?.[0]?.image || (order.orderType === 'repair-service' ? '/admin_icon/service.png' : '/admin_icon/component.png')} alt={getDeviceName()} />
          </div>

          <div className="formGroup">
            <label>Mã đơn hàng</label>
            <input 
              type="text" 
              value={order.orderNumber || 'N/A'} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          <div className="formGroup">
            <label>Tên khách hàng</label>
            <input 
              type="text" 
              value={order.customerInfo?.name || order.customerName || 'N/A'} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          <div className="formGroup">
            <label>Email</label>
            <input 
              type="text" 
              value={order.customerInfo?.email || 'N/A'} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          <div className="formGroup">
            <label>Số điện thoại</label>
            <input 
              type="text" 
              value={order.customerInfo?.phone || 'N/A'} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          <div className="formGroup">
            <label>Loại đơn hàng</label>
            <input 
              type="text" 
              value={order.orderType === 'repair-service' ? 'Dịch vụ sửa chữa' : 'Mua linh kiện'} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          <div className="formGroup">
            <label>Thiết bị / Sản phẩm</label>
            <input 
              type="text" 
              value={getDeviceName()} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          <div className="formGroup">
            <label>Vấn đề / Loại</label>
            <input 
              type="text" 
              value={getIssue()} 
              disabled 
              className="readOnlyInput"
            />
          </div>

          {order.orderType === 'repair-service' && (
            <div className="formGroup">
              <label>Mô tả chi tiết</label>
              <textarea 
                value={getIssueDescription()} 
                disabled 
                className="readOnlyInput"
                rows="3"
              />
            </div>
          )}

          <div className="formGroup">
            <label>Trạng thái</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="editableInput"
            >
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Hủy">Hủy</option>
            </select>
          </div>

          {/* Phần chọn linh kiện khi đang sửa chữa */}
          {showItemSelector && (
            <div className="itemSelectorSection">
              <h3 className="sectionTitle">Linh kiện sử dụng</h3>
              
              <div className="itemSelector">
                <div className="formGroup" style={{ flex: 2 }}>
                  <label>Chọn linh kiện</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="editableInput"
                  >
                    <option value="">-- Chọn linh kiện --</option>
                    {products.map(product => (
                      <option key={product._id} value={product._id}>
                        {product.name} - {formatCurrency(product.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="formGroup" style={{ flex: 1 }}>
                  <label>Số lượng</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setQuantity('');
                      } else if (/^\d+$/.test(val)) {
                        setQuantity(parseInt(val, 10));
                      }
                    }}
                    onBlur={() => {
                      if (!quantity || quantity < 1) {
                        setQuantity(1);
                      }
                    }}
                    className="editableInput"
                  />
                </div>

                <button 
                  type="button"
                  className="addItemButton" 
                  onClick={handleAddItem}
                >
                  Thêm
                </button>
              </div>

              {selectedItems.length > 0 && (
                <div className="selectedItemsList">
                  <h4>Linh kiện đã chọn:</h4>
                  {selectedItems.map((item, index) => (
                    <div key={index} className="selectedItemRow">
                      <img src={item.image} alt={item.name} className="itemImage" />
                      <div className="itemInfo">
                        <div className="itemName">{item.name}</div>
                        <div className="itemPrice">{formatCurrency(item.price)}</div>
                      </div>
                      <div className="itemQuantity">
                        <button 
                          onClick={() => handleQuantityChange(index, item.quantity - 1)}
                          className="qtyButton"
                        >
                          -
                        </button>
                        <span className="qtyValue">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(index, item.quantity + 1)}
                          className="qtyButton"
                        >
                          +
                        </button>
                      </div>
                      <div className="itemTotal">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(index)}
                        className="removeItemButton"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="totalRow">
                    <strong>Tổng cộng:</strong>
                    <strong className="totalAmount">{formatCurrency(calculateTotal())}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="formGroup">
            <label>Ngày tạo</label>
            <input 
              type="text" 
              value={new Date(order.createdAt).toLocaleString('vi-VN')} 
              disabled 
              className="readOnlyInput"
            />
          </div>
        </div>

        <div className="dialogFooter">
          <button className="cancelButton" onClick={onClose}>
            Hủy
          </button>
          <button className="saveButton" onClick={handleSave}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}
