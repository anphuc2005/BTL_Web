import { useState, useEffect, useMemo } from 'react'
import InventoryCard from '../../components/admin/InventoryCard'
import InventoryEditDialog from '../../components/admin/InventoryEditDialog'
import InventoryDeleteDialog from '../../components/admin/InventoryDeleteDialog'
import Pagination from '../../components/admin/Pagination'
import '../../styles/adminStyles/Inventory.css'
import AdminLayout from '../../layouts/AdminLayout'
import { productAPI } from '../../services/api'

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isAddMode, setIsAddMode] = useState(false)
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  })

  useEffect(() => {
    // Debounce search and reset to page 1 when search term changes
    const timeoutId = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1)
      } else {
        const abortController = new AbortController()
        fetchProducts(abortController)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  useEffect(() => {
    // Tạo AbortController để cancel request khi component unmount hoặc page thay đổi
    const abortController = new AbortController()
    fetchProducts(abortController)

    // Đặt interval để tự động cập nhật dữ liệu kho hàng liên tục (ví dụ mỗi 5 giây)
    const intervalId = setInterval(() => {
      const intervalController = new AbortController()
      fetchProducts(intervalController, false) // false để không set loading quá mức
    }, 5000)

    // Cleanup function: cancel request đang chạy và clear interval
    return () => {
      abortController.abort()
      clearInterval(intervalId)
    }
  }, [currentPage])

  const fetchProducts = async (abortController = new AbortController(), showLoading = true) => {
    try {
      if (showLoading) setLoading(true)
      const params = {
        page: currentPage,
        limit: 10,
        showAll: true 
      }
      
      if (searchTerm) {
        params.search = searchTerm
      }
      
      const response = await productAPI.getAll(params, { signal: abortController.signal })
      
      // Chỉ update state nếu request chưa bị cancel
      if (!abortController.signal.aborted) {
        setProducts(response.data.data)
        setPagination(response.data.pagination)
        setError(null)
      }
    } catch (err) {
      // Bỏ qua lỗi AbortError khi cancel request
      if (err.name === 'CanceledError' || err.name === 'AbortError') {
        return
      }
      console.error('Error fetching products:', err)
      if (!abortController.signal.aborted) {
        setError('Không thể tải danh sách sản phẩm')
      }
    } finally {
      if (!abortController.signal.aborted && showLoading) {
        setLoading(false)
      }
    }
  }

  // Map products to inventory items format
  const inventoryItems = useMemo(() => {
    return products.map(product => ({
      id: product._id,
      _id: product._id,
      name: product.name,
      brand: product.brand || 'N/A',
      quantity: product.stock,
      price: product.price,
      status: product.stock > 0 ? 'available' : 'out-of-stock',
      // Include all product data for editing
      ...product
    }))
  }, [products])

  const handleEditClick = (item) => {
    setSelectedItem(item)
    setIsAddMode(false)
    setShowEditDialog(true)
  }

  const handleEditSave = async (id, formData) => {
    try {
      if (isAddMode) {
        // Create new product
        await productAPI.create(formData)
        alert('Đã thêm sản phẩm mới thành công!')
      } else {
        // Update existing product
        await productAPI.update(id, formData)
        alert('Đã cập nhật sản phẩm thành công!')
      }
      
      // Refresh product list
      fetchProducts()
    } catch (err) {
      console.error('Error saving product:', err)
      alert('Lỗi: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleDeleteClick = (item) => {
    setSelectedItem(item)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async (id) => {
    try {
      await productAPI.delete(id)
      alert('Đã xóa sản phẩm thành công!')
      fetchProducts()
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Không thể xóa sản phẩm: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleAddNew = () => {
    setSelectedItem(null)
    setIsAddMode(true)
    setShowEditDialog(true)
  }

  if (loading && products.length === 0) {
    return (
      <AdminLayout>
        <div className="inventory">
          <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
    <div className="inventory">
      <div className="inventory__header">
        <h1>Inventory ({pagination.total} sản phẩm)</h1>
        <div className="inventory__actions">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <button className="add-btn" onClick={handleAddNew}>
            + THÊM SẢN PHẨM MỚI
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <div className="inventory__content">
        {inventoryItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
            Không có sản phẩm nào
          </div>
        ) : (
          inventoryItems.map((item) => (
            <InventoryCard 
              key={item.id}
              item={item}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </div>

      {pagination.pages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Dialogs */}
      <InventoryEditDialog 
        item={selectedItem}
        isOpen={showEditDialog}
        isAddMode={isAddMode}
        onClose={() => {
          setShowEditDialog(false)
          setIsAddMode(false)
        }}
        onSave={handleEditSave}
      />

      <InventoryDeleteDialog 
        item={selectedItem}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
    </AdminLayout>
  )
}