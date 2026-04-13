import { useState, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Pagination from '../../components/admin/Pagination'
import { feedbackAPI } from '../../services/api'
import '../../styles/adminStyles/FeedbackManagement.css'

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // Tạo AbortController để cancel request khi component unmount hoặc filter/page thay đổi
    const abortController = new AbortController()
    fetchFeedbacks(abortController)

    // Cleanup function: cancel request đang chạy
    return () => {
      abortController.abort()
    }
  }, [page, filter])

  const fetchFeedbacks = async (abortController = new AbortController()) => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 5
      }
      
      if (filter !== 'all') {
        params.status = filter
      }

      const response = await feedbackAPI.getAll(params, { signal: abortController.signal })
      
      // Chỉ update state nếu request chưa bị cancel
      if (!abortController.signal.aborted) {
        setFeedbacks(response.data.data)
        setTotalPages(response.data.pagination.pages)
        setError(null)
      }
    } catch (err) {
      // Bỏ qua lỗi AbortError khi cancel request
      if (err.name === 'CanceledError' || err.name === 'AbortError') {
        return
      }
      console.error('Error fetching feedbacks:', err)
      if (!abortController.signal.aborted) {
        setError('Không thể tải danh sách phản hồi')
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }

  const handleFilterChange = (nextFilter) => {
    if (nextFilter === filter) return
    setFilter(nextFilter)
    setPage(1)
    setSelectedFeedback(null)
  }

  const handlePageChange = (nextPage) => {
    if (nextPage === page) return
    setPage(nextPage)
    setSelectedFeedback(null)
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await feedbackAPI.update(id, { status: newStatus })
      fetchFeedbacks()
      if (selectedFeedback?._id === id) {
        setSelectedFeedback({ ...selectedFeedback, status: newStatus })
      }
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Không thể cập nhật trạng thái')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa phản hồi này?')) return

    try {
      await feedbackAPI.delete(id)
      fetchFeedbacks()
      if (selectedFeedback?._id === id) {
        setSelectedFeedback(null)
      }
    } catch (err) {
      console.error('Error deleting feedback:', err)
      alert('Không thể xóa phản hồi')
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'new': { label: 'Mới', color: '#3498db' },
      'read': { label: 'Đã đọc', color: '#f39c12' },
      'replied': { label: 'Đã trả lời', color: '#9b59b6' },
      'resolved': { label: 'Đã giải quyết', color: '#27ae60' }
    }
    const statusInfo = statusMap[status] || { label: status, color: '#95a5a6' }
    
    return (
      <span className="status-badge" style={{ backgroundColor: statusInfo.color }}>
        {statusInfo.label}
      </span>
    )
  }

  const getServiceTypeIcon = (type) => {
    const icons = {
      'Dịch vụ': '/admin_icon/service.png',
      'Linh kiện': '/admin_icon/component.png',
      'Bảo hành': '/admin_icon/gurantee.png',
      'Khác': '/admin_icon/other.png',
    }
    return icons[type] || '/admin_icon/other.png'
  }

  return (
    <AdminLayout>
      <div className="feedback-management">
        <div className="feedback-header">
          <div>
            <h1>Quản lý phản hồi</h1>
            <p>Xem và quản lý phản hồi từ khách hàng</p>
          </div>

          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => handleFilterChange('all')}
            >
              Tất cả
            </button>
            <button 
              className={filter === 'new' ? 'active' : ''}
              onClick={() => handleFilterChange('new')}
            >
              Mới
            </button>
            <button 
              className={filter === 'read' ? 'active' : ''}
              onClick={() => handleFilterChange('read')}
            >
              Đã đọc
            </button>
            <button 
              className={filter === 'replied' ? 'active' : ''}
              onClick={() => handleFilterChange('replied')}
            >
              Đã trả lời
            </button>
            <button 
              className={filter === 'resolved' ? 'active' : ''}
              onClick={() => handleFilterChange('resolved')}
            >
              Đã giải quyết
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="feedback-content">
            <div className="feedback-list">
              <div className="feedback-list-scroll">
                {feedbacks.length === 0 ? (
                  <div className="no-feedback">Không có phản hồi nào</div>
                ) : (
                  feedbacks.map((feedback) => (
                    <div 
                      key={feedback._id} 
                      className={`feedback-item ${selectedFeedback?._id === feedback._id ? 'selected' : ''}`}
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      <div className="feedback-item-header">
                        <div className="feedback-info">
                          <img 
                            src={getServiceTypeIcon(feedback.serviceType)} 
                            alt={feedback.serviceType}
                            className="service-icon"
                          />
                          <div>
                            <h3>{feedback.fullName}</h3>
                            <p className="email">{feedback.email}</p>
                          </div>
                        </div>
                        {getStatusBadge(feedback.status)}
                      </div>
                      <div className="feedback-item-body">
                        <p className="message-preview">{feedback.message.substring(0, 100)}...</p>
                        <span className="feedback-type">{feedback.serviceType}</span>
                        <span className="feedback-date">
                          {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {totalPages > 1 && (
                <div className="feedback-list-pagination">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            <div className="feedback-detail">
              {selectedFeedback ? (
                <div className="detail-content">
                  <div className="detail-header">
                    <h2>Chi tiết phản hồi</h2>
                    <div className="detail-actions">
                      <select 
                        value={selectedFeedback.status}
                        onChange={(e) => handleStatusChange(selectedFeedback._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="new">Mới</option>
                        <option value="read">Đã đọc</option>
                        <option value="replied">Đã trả lời</option>
                        <option value="resolved">Đã giải quyết</option>
                      </select>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(selectedFeedback._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  <div className="detail-body">
                    <div className="info-section">
                      <h3>Thông tin khách hàng</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Họ tên:</label>
                          <span>{selectedFeedback.fullName}</span>
                        </div>
                        <div className="info-item">
                          <label>Email:</label>
                          <a href={`mailto:${selectedFeedback.email}`}>{selectedFeedback.email}</a>
                        </div>
                        {selectedFeedback.phone && (
                          <div className="info-item">
                            <label>Số điện thoại:</label>
                            <a href={`tel:${selectedFeedback.phone}`}>{selectedFeedback.phone}</a>
                          </div>
                        )}
                        <div className="info-item">
                          <label>Loại thắc mắc:</label>
                          <span>{selectedFeedback.serviceType}</span>
                        </div>
                        <div className="info-item">
                          <label>Ngày gửi:</label>
                          <span>{new Date(selectedFeedback.createdAt).toLocaleString('vi-VN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="message-section">
                      <h3>Nội dung phản hồi</h3>
                      <div className="message-box">
                        {selectedFeedback.message}
                      </div>
                    </div>

                    {selectedFeedback.adminNotes && (
                      <div className="notes-section">
                        <h3>Ghi chú của admin</h3>
                        <div className="notes-box">
                          {selectedFeedback.adminNotes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  <p>Chọn một phản hồi để xem chi tiết</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  )
}
