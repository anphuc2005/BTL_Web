import { useEffect, useState } from 'react'
import OrderEditDialog from './OrderEditDialog'
import Pagination from './Pagination'
import '../../styles/adminStyles/OrderTable.css'

export default function OrdersTable({ rows, onUpdateOrder }) {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 7

  const handleEdit = (order) => {
    setSelectedOrder(order)
  }

  const handleCloseDialog = () => {
    setSelectedOrder(null)
  }

  const handleSaveOrder = (updatedOrder) => {
    if (onUpdateOrder) {
      onUpdateOrder(updatedOrder)
    }
  }

  const normalizeStatus = (status) => (status || '').toString().trim().toLowerCase()

  const getStatusConfig = (status) => {
    switch (normalizeStatus(status)) {
      case 'pending':
      case 'chờ xác nhận':
        return { value: 'pending', bg: '#f3f4f6', color: '#4b5563', label: 'Chờ xác nhận' } // Gray
      case 'processing':
      case 'repairing':
      case 'đang xử lý':
      case 'đang sửa':
        return { value: 'processing', bg: '#fef3c7', color: '#b45309', label: 'Đang sửa' } // Yellow
      case 'completed':
      case 'hoàn thành':
        return { value: 'completed', bg: '#d1fae5', color: '#059669', label: 'Hoàn thành' } // Green
      case 'cancelled':
      case 'canceled':
      case 'huỷ':
      case 'hủy':
        return { value: 'cancelled', bg: '#fee2e2', color: '#dc2626', label: 'Hủy' } // Red
      default:
        return { value: status || 'all', bg: '#f3f4f6', color: '#4b5563', label: status || 'N/A' }
    }
  }

  const statusPriority = {
    pending: 0,
    processing: 1,
    completed: 2,
    cancelled: 3,
  }

  const filteredRows = rows.filter(r => {
    const matchesSearch = (r.product?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (r.issue?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (r.deviceType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (r.id?.toString() || '').includes(searchTerm);
    
    const rConfig = getStatusConfig(r.status)
    const matchesStatus = filterStatus === 'all' || rConfig.value === filterStatus
    
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    const aStatus = getStatusConfig(a.status).value
    const bStatus = getStatusConfig(b.status).value
    const aPriority = statusPriority[aStatus] ?? Number.MAX_SAFE_INTEGER
    const bPriority = statusPriority[bStatus] ?? Number.MAX_SAFE_INTEGER

    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    return 0
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus, rows])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const pagedRows = filteredRows.slice(startIndex, startIndex + pageSize)

  return (
    <section className="ordersCard">
      <div className="ordersCard__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h3>Tất cả đơn hàng</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm đơn hàng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }}
          />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '20px', border: '1px solid #ccc', outline: 'none', backgroundColor: 'white' }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="processing">Đang sửa</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Hủy</option>
          </select>
        </div>
      </div>

      <div className="ordersTableWrap">
        <table className="ordersTable">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>SẢN PHẨM</th>
              <th style={{ width: '15%' }}>LỖI</th>
              <th style={{ width: '15%' }}>LOẠI MÁY</th>
              <th style={{ width: '15%' }}>TRẠNG THÁI</th>
              <th style={{ width: '15%' }}>THÔNG TIN</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="productCell">
                    <img className="productCell__img" src={r.image} alt={r.product} />
                    <div className="productCell__meta">
                      <div className="productCell__name">{r.product}</div>
                    </div>
                  </div>
                </td>
                <td className="muted">{r.issue}</td>
                <td className="muted">{r.deviceType}</td>
                <td className="muted">
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    backgroundColor: getStatusConfig(r.status).bg,
                    color: getStatusConfig(r.status).color,
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    display: 'inline-block'
                  }}>
                    {getStatusConfig(r.status).label}
                  </span>
                </td>
                <td>
                  <img 
                    src="/admin_icon/Edit.svg" 
                    alt="edit" 
                    className="rowActionIcon"
                    onClick={() => handleEdit(r)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {selectedOrder && (
        <OrderEditDialog 
          order={selectedOrder}
          onClose={handleCloseDialog}
          onSave={handleSaveOrder}
        />
      )}
    </section>
  )
}