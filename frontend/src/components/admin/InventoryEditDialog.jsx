import { useState, useEffect } from 'react'
import '../../styles/adminStyles/InventoryDialog.css'

export default function InventoryEditDialog({ item, isOpen, isAddMode, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'screen',
    image: '',
    stock: 0,
    brand: 'OEM',
    warranty: 0,
    specifications: '',
    isAvailable: true,
    featured: false
  })

  useEffect(() => {
    if (isAddMode) {
      // Reset form for adding new product
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'screen',
        image: '',
        stock: 0,
        brand: 'OEM',
        warranty: 0,
        specifications: '',
        isAvailable: true,
        featured: false
      })
    } else if (item) {
      // Populate form for editing
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        originalPrice: item.originalPrice || '',
        category: item.category || 'screen',
        image: item.image || '',
        stock: item.stock || 0,
        brand: item.brand || 'OEM',
        warranty: item.warranty || 0,
        specifications: item.specifications || '',
        isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
        featured: item.featured || false
      })
    }
  }, [item, isAddMode, isOpen])

  if (!isOpen) return null

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc: Tên, Mô tả, Giá, Hình ảnh')
      return
    }

    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock) || 0,
      warranty: parseInt(formData.warranty) || 0
    }

    onSave(item?._id || item?.id, dataToSave)
    onClose()
  }

  const categories = [
    { value: 'screen', label: 'Màn hình' },
    { value: 'battery', label: 'Pin' },
    { value: 'camera', label: 'Camera' },
    { value: 'charging-port', label: 'Cổng sạc' },
    { value: 'speaker', label: 'Loa' },
    { value: 'button', label: 'Nút bấm' },
    { value: 'motherboard', label: 'Main' },
    { value: 'case', label: 'Vỏ máy' },
    { value: 'other', label: 'Khác' }
  ]

  const brands = [
    { value: 'Original', label: 'Chính hãng' },
    { value: 'OEM', label: 'OEM' },
    { value: 'Third-party', label: 'Hãng thứ 3' },
    { value: 'Refurbished', label: 'Tân trang' }
  ]

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content dialog-content--large" onClick={(e) => e.stopPropagation()}>
        <h3>{isAddMode ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}</h3>
        <div className="dialog-body dialog-body--scrollable">
          
          <div className="form-group">
            <label htmlFor="name-input">Tên sản phẩm: <span className="required">*</span></label>
            <input
              id="name-input"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="form-input"
              placeholder="VD: Màn hình iPhone 12 Pro"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description-input">Mô tả: <span className="required">*</span></label>
            <textarea
              id="description-input"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="form-input"
              rows="3"
              placeholder="Mô tả chi tiết sản phẩm..."
              maxLength="500"
            />
            <small>{formData.description.length}/500 ký tự</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category-input">Danh mục: <span className="required">*</span></label>
              <select
                id="category-input"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="form-input"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand-input">Thương hiệu:</label>
              <select
                id="brand-input"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                className="form-input"
              >
                {brands.map(brand => (
                  <option key={brand.value} value={brand.value}>{brand.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price-input">Giá bán: <span className="required">*</span></label>
              <input
                id="price-input"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="form-input"
                min="0"
                placeholder="VD: 500000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="original-price-input">Giá gốc:</label>
              <input
                id="original-price-input"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange('originalPrice', e.target.value)}
                className="form-input"
                min="0"
                placeholder="VD: 700000"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock-input">Số lượng trong kho:</label>
              <input
                id="stock-input"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="form-input"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="warranty-input">Bảo hành (tháng):</label>
              <input
                id="warranty-input"
                type="number"
                value={formData.warranty}
                onChange={(e) => handleChange('warranty', e.target.value)}
                className="form-input"
                min="0"
                placeholder="VD: 6"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image-input">URL hình ảnh: <span className="required">*</span></label>
            <input
              id="image-input"
              type="text"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="form-input"
              placeholder="/img/product.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="specifications-input">Thông số kỹ thuật:</label>
            <textarea
              id="specifications-input"
              value={formData.specifications}
              onChange={(e) => handleChange('specifications', e.target.value)}
              className="form-input"
              rows="3"
              placeholder="Các thông số kỹ thuật..."
              maxLength="500"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => handleChange('isAvailable', e.target.checked)}
              />
              <span>Còn hàng / Hiển thị</span>
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
              />
              <span>Sản phẩm nổi bật</span>
            </label>
          </div>

        </div>
        <div className="dialog-actions">
          <button onClick={onClose} className="btn-cancel">
            Hủy
          </button>
          <button onClick={handleSave} className="btn-save">
            {isAddMode ? 'Thêm' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  )
}
