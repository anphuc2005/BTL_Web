import { useState, useMemo, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import StatCard from '../../components/admin/StatCard'
import OrdersTable from '../../components/admin/OrderTable'
import '../../styles/adminStyles/Dashboard.css'
import { orderAPI } from '../../services/api'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Tạo AbortController để cancel request khi component unmount
    const abortController = new AbortController()
    fetchOrders(abortController)

    // Cleanup function: cancel request đang chạy
    return () => {
      abortController.abort()
    }
  }, [])

  const fetchOrders = async (abortController) => {
    try {
      setLoading(true)
      const response = await orderAPI.getAll({ limit: 1000 }, { signal: abortController.signal })

      // Chỉ update state nếu request chưa bị cancel
      if (!abortController.signal.aborted) {
        setOrders(response.data.data)
        setError(null)
      }
    } catch (err) {
      // Bỏ qua lỗi AbortError khi cancel request
      if (err.name === 'CanceledError' || err.name === 'AbortError') {
        return
      }
      console.error('Error fetching orders:', err)
      if (!abortController.signal.aborted) {
        setError('Không thể tải danh sách đơn hàng')
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }

  // Tính toán stats động từ orders
  const stats = useMemo(() => {
    const statusCounts = {
      'Chờ xác nhận': 0,
      'Đang xử lý': 0,
      'Hoàn thành': 0,
      'Hủy': 0
    }

    orders.forEach(order => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++
      }
    })

    return [
      {
        title: 'Chờ xác nhận',
        value: statusCounts['Chờ xác nhận'].toString(),
        hint: 'Đơn hàng chờ xử lý',
        hintColor: 'gray',
        iconBg: 'linear-gradient(135deg,#a855f7,#ec4899)',
        icon: '/admin_icon/Call.svg',
      },
      {
        title: 'Đang xử lý',
        value: statusCounts['Đang xử lý'].toString(),
        hint: 'Đơn đang được xử lý',
        hintColor: 'blue',
        iconBg: 'linear-gradient(135deg,#6366f1,#ec4899)',
        icon: '/admin_icon/Time Circle.svg',
      },
      {
        title: 'Hoàn thành',
        value: statusCounts['Hoàn thành'].toString(),
        hint: 'Đơn đã hoàn thành',
        hintColor: 'green',
        iconBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
        icon: '/admin_icon/Shield Done.svg',
      },
      {
        title: 'Đã hủy',
        value: statusCounts['Hủy'].toString(),
        hint: 'Đơn đã bị hủy',
        hintColor: 'red',
        iconBg: 'linear-gradient(135deg,#3b82f6,#2563eb)',
        icon: '/admin_icon/Shield Fail.svg',
      },
    ]
  }, [orders])

  const handleUpdateOrder = async (updateData) => {
    try {
      // Cập nhật order qua API (bao gồm status và orderItems)
      const response = await orderAPI.update(updateData._id, {
        status: updateData.status,
        ...(updateData.orderItems && { orderItems: updateData.orderItems })
      })

      // Cập nhật local state với data từ server
      setOrders(orders.map(order =>
        order._id === updateData._id ? response.data.data : order
      ))

      alert('✅ Đã cập nhật đơn hàng và gửi email thông báo cho khách hàng')
    } catch (err) {
      console.error('Error updating order:', err)
      alert('❌ Không thể cập nhật đơn hàng: ' + (err.response?.data?.message || err.message))
    }
  }

  // Map orders từ DB sang format cho table
  const mappedOrders = useMemo(() => {
    return orders.map(order => ({
      ...order,
      id: order._id,
      product: order.orderType === 'repair-service'
        ? `${order.repairInfo?.deviceType || 'Thiết bị'} - ${order.repairInfo?.issue || 'Lỗi'}`
        : order.orderItems?.map(item => item.name).join(', ') || 'Sản phẩm',
      issue: order.repairInfo?.issueDescription || order.repairInfo?.issue || 'N/A',
      deviceType: order.repairInfo?.deviceType || 'N/A',
      image: order.orderItems?.[0]?.image || (order.orderType === 'repair-service' ? '/admin_icon/order.png' : '/admin_icon/component.png'),
      customerName: order.customerInfo?.name || 'N/A',
      orderNumber: order.orderNumber
    }))
  }, [orders])

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboard">
          <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải...</div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="dashboard">
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="statsGrid">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        <OrdersTable rows={mappedOrders} onUpdateOrder={handleUpdateOrder} />
      </div>
    </AdminLayout>
  )
}