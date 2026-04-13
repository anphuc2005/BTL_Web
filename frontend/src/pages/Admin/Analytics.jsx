import { useState, useEffect } from 'react'
import StatCard from '../../components/admin/StatCard'
import ChartCard from '../../components/admin/ChartCard'
import StatsTable from '../../components/admin/StatsTable'
import Pagination from '../../components/admin/Pagination'
import AdminLayout from '../../layouts/AdminLayout'
import { analyticsAPI } from '../../services/api'
import '../../styles/adminStyles/Analytics.css'

// Component biểu đồ đường doanh thu
function RevenueChart({ data = [], period }) {
  if (data.length === 0) {
    return (
      <div className="chartBg">
        <div className="chartEmpty">Chưa có dữ liệu</div>
      </div>
    )
  }

  const revenues = data.map(d => d.revenue)
  const max = Math.max(...revenues, 1)
  const min = Math.min(...revenues, 0)
  const range = max - min || 1

  const toXY = (revenue, index) => {
    const x = 20 + (index * (300 / (data.length - 1 || 1)))
    const y = 120 - ((revenue - min) / range) * 90
    return { x, y }
  }

  const pathD = data
    .map((d, i) => {
      const { x, y } = toXY(d.revenue, i)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  // Tạo area fill
  const areaD = pathD + ` L ${20 + (data.length - 1) * (300 / (data.length - 1 || 1))} 120 L 20 120 Z`

  return (
    <div className="chartBg">
      <svg className="chartSvg" viewBox="0 0 340 150" role="img" aria-label="Revenue chart">
        {/* Grid lines */}
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="15" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 5" />
        ))}

        {/* Area fill */}
        <path d={areaD} fill="url(#gradient)" opacity="0.3" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#fff" strokeWidth="2.5" />

        {/* Points */}
        {data.map((d, i) => {
          const { x, y } = toXY(d.revenue, i)
          return <circle key={i} cx={x} cy={y} r="4" fill="#fff" />
        })}

        {/* Labels - show only some dates to avoid cluttering */}
        {data.map((d, i) => {
          if (data.length <= 10 || i % Math.ceil(data.length / 7) === 0) {
            let label = ''
            if (period === '1y') {
              const monthStr = d.date.split('-')[1]
              label = `Tháng ${parseInt(monthStr, 10)}`
            } else if (period === '90d') {
              const qStr = d.date.split('-Q')[1]
              label = `Quý ${qStr}`
            } else {
              const date = new Date(d.date)
              label = `${date.getDate()}/${date.getMonth() + 1}`
            }
            return (
              <text key={i} x={15 + i * (300 / (data.length - 1 || 1))} y="142" fontSize="10" fill="rgba(255,255,255,0.7)" textAnchor="middle">
                {label}
              </text>
            )
          }
          return null
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Component biểu đồ cột đơn hàng
function OrdersChart({ data = [], period }) {
  if (data.length === 0) {
    return (
      <div className="chartBg">
        <div className="chartEmpty">Chưa có dữ liệu</div>
      </div>
    )
  }

  const orders = data.map(d => d.orders)
  const max = Math.max(...orders, 1)
  
  const barWidth = Math.min(12, 280 / data.length)
  const spacing = 300 / data.length

  return (
    <div className="chartBg">
      <svg className="chartSvg" viewBox="0 0 340 150" role="img" aria-label="Orders chart">
        {/* Grid */}
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="15" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 5" />
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const height = (d.orders / max) * 90
          const x = 20 + i * spacing - barWidth / 2
          const y = 120 - height
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              rx="3"
              fill="#fff"
              opacity="0.9"
            />
          )
        })}

        {/* Labels */}
        {data.map((d, i) => {
          if (data.length <= 10 || i % Math.ceil(data.length / 7) === 0) {
            let label = ''
            if (period === '1y') {
              const monthStr = d.date.split('-')[1]
              label = `Tháng ${parseInt(monthStr, 10)}`
            } else if (period === '90d') {
              const qStr = d.date.split('-Q')[1]
              label = `Quý ${qStr}`
            } else {
              const date = new Date(d.date)
              label = `${date.getDate()}/${date.getMonth() + 1}`
            }
            return (
              <text key={i} x={20 + i * spacing} y="142" fontSize="10" fill="rgba(255,255,255,0.7)" textAnchor="middle">
                {label}
              </text>
            )
          }
          return null
        })}
      </svg>
    </div>
  )
}

export default function Analytics() {
  const [period, setPeriod] = useState('30d')
  const [loading, setLoading] = useState(true)
  const [overview, setOverview] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [recentOrderPage, setRecentOrderPage] = useState(1)
  const [productPage, setProductPage] = useState(1)

  useEffect(() => {
    // Tạo AbortController để cancel requests khi component unmount hoặc period thay đổi
    const abortController = new AbortController()
    fetchAnalyticsData(abortController)

    // Cleanup function: cancel tất cả requests đang chạy
    return () => {
      abortController.abort()
    }
  }, [period])

  useEffect(() => {
    setRecentOrderPage(1)
    setProductPage(1)
  }, [period])

  const fetchAnalyticsData = async (abortController) => {
    try {
      setLoading(true)
      
      const [overviewRes, revenueRes, productsRes, ordersRes] = await Promise.all([
        analyticsAPI.getOverview({ period }, { signal: abortController.signal }),
        analyticsAPI.getRevenueChart({ period }, { signal: abortController.signal }),
        analyticsAPI.getTopProducts({ limit: 50 }, { signal: abortController.signal }),
        analyticsAPI.getRecentOrders({ limit: 50 }, { signal: abortController.signal })
      ])

      // Chỉ update state nếu request chưa bị cancel
      if (!abortController.signal.aborted) {
        setOverview(overviewRes.data.overview)
        setRevenueData(revenueRes.data.chartData)
        setTopProducts(productsRes.data.topProducts)
        setRecentOrders(ordersRes.data.recentOrders)
        setLoading(false)
      }
    } catch (error) {
      // Bỏ qua lỗi AbortError khi cancel request
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        return
      }
      console.error('Error fetching analytics:', error)
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value)
  }

  const periodOptions = [
    { value: '7d', label: '7 ngày' },
    { value: '30d', label: '30 ngày' },
    { value: '90d', label: '90 ngày' },
    { value: '1y', label: '1 năm' }
  ]

  const statItems = overview ? [
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(overview.totalRevenue),
      hint: `${overview.revenueChange > 0 ? '+' : ''}${overview.revenueChange}% so với kỳ trước`,
      hintColor: overview.revenueChange >= 0 ? 'green' : 'red',
      iconBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
      icon: '/admin_icon/Revenue.svg',
    },
    {
      title: 'Tổng đơn hàng',
      value: formatNumber(overview.totalOrders),
      hint: `${overview.ordersChange > 0 ? '+' : ''}${overview.ordersChange}% so với kỳ trước`,
      hintColor: overview.ordersChange >= 0 ? 'green' : 'red',
      iconBg: 'linear-gradient(135deg,#3b82f6,#2563eb)',
      icon: '/admin_icon/chart-bar.svg',
    },
    {
      title: 'Sản phẩm đã bán',
      value: formatNumber(overview.totalProducts),
      hint: `Từ ${overview.totalOrders} đơn hàng`,
      hintColor: 'gray',
      iconBg: 'linear-gradient(135deg,#ec4899,#db2777)',
      icon: '/admin_icon/account-plus.svg',
    },
    {
      title: 'Khách hàng',
      value: formatNumber(overview.uniqueCustomers),
      hint: `${overview.completedOrders} đơn đã giao`,
      hintColor: 'green',
      iconBg: 'linear-gradient(135deg,#111827,#374151)',
      icon: '/admin_icon/account-circle.svg',
    },
  ] : []

  const productColumns = [
    {
      key: 'product',
      label: 'SẢN PHẨM',
      width: '40%',
      render: (r) => (
        <div className="productMini">
          <img className="productMini__img" src={r.image} alt={r.name} />
          <div>
            <div className="productMini__name">{r.name}</div>
            <div className="productMini__sub">{r.orderCount} đơn hàng</div>
          </div>
        </div>
      ),
    },
    { 
      key: 'totalQuantity', 
      label: 'SỐ LƯỢNG', 
      align: 'center', 
      width: '20%',
      render: (r) => formatNumber(r.totalQuantity)
    },
    { 
      key: 'totalRevenue', 
      label: 'DOANH THU', 
      align: 'center', 
      width: '40%',
      render: (r) => (
        <span className="revenueValue">{formatCurrency(r.totalRevenue)}</span>
      )
    },
  ]

  const orderColumns = [
    {
      key: 'orderNumber',
      label: 'MÃ ĐƠN',
      width: '15%',
      render: (r) => <span className="orderCode">#{r.orderNumber}</span>
    },
    {
      key: 'customer',
      label: 'KHÁCH HÀNG',
      width: '25%',
      render: (r) => (
        <div>
          <div className="customerName">
            {r.shippingAddress?.fullName || r.customerInfo?.name || 'N/A'}
          </div>
          <div className="customerPhone">
            {r.shippingAddress?.phoneNumber || r.customerInfo?.phone || 'N/A'}
          </div>
        </div>
      )
    },
    {
      key: 'items',
      label: 'LOẠI',
      width: '15%',
      align: 'center',
      render: (r) => {
        if (r.orderType === 'repair-service') {
          return <span className="orderType">Sửa chữa</span>
        }
        return <span className="orderType">Mua hàng ({r.items?.length || 0})</span>
      }
    },
    {
      key: 'totalAmount',
      label: 'TỔNG TIỀN',
      width: '15%',
      align: 'right',
      render: (r) => {
        if (r.totalAmount > 0) {
          return formatCurrency(r.totalAmount)
        }
        return <span className="noPriceText">Chưa có giá</span>
      }
    },
    {
      key: 'status',
      label: 'TRẠNG THÁI',
      width: '15%',
      align: 'center',
      render: (r) => {
        const statusMap = {
          'Chờ xác nhận': { text: 'Chờ xác nhận', class: 'statusBadge--pending' },
          'Đang xử lý': { text: 'Đang xử lý', class: 'statusBadge--shipping' },
          'Hoàn thành': { text: 'Hoàn thành', class: 'statusBadge--delivered' },
          'Hủy': { text: 'Đã hủy', class: 'statusBadge--cancelled' }
        }
        const status = statusMap[r.status] || { text: r.status, class: '' }
        return <span className={`statusBadge ${status.class}`}>{status.text}</span>
      }
    },
    {
      key: 'createdAt',
      label: 'NGÀY ĐẶT',
      width: '15%',
      align: 'right',
      render: (r) => new Date(r.createdAt).toLocaleDateString('vi-VN')
    }
  ]

  const topProductRows = topProducts.map((p, index) => ({
    ...p,
    id: index + 1
  }))

  const productsPerPage = 5
  const productsTotalPages = Math.max(1, Math.ceil(topProductRows.length / productsPerPage))
  const productsStartIndex = (productPage - 1) * productsPerPage
  const productsPagedRows = topProductRows.slice(
    productsStartIndex,
    productsStartIndex + productsPerPage
  )

  const recentOrderRows = recentOrders.map((o, index) => ({
    ...o,
    id: index + 1
  }))

  const recentOrdersPerPage = 5
  const recentOrdersTotalPages = Math.max(1, Math.ceil(recentOrderRows.length / recentOrdersPerPage))
  const recentOrdersStartIndex = (recentOrderPage - 1) * recentOrdersPerPage
  const recentOrdersPagedRows = recentOrderRows.slice(
    recentOrdersStartIndex,
    recentOrdersStartIndex + recentOrdersPerPage
  )

  if (loading) {
    return (
      <AdminLayout>
        <div className="analyticsPage">
          <div className="loadingState">Đang tải dữ liệu...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="analyticsPage">
        <div className="analyticsHeader">
          <h1 className="analyticsTitle">Thống kê doanh thu</h1>
          <div className="periodSelector">
            {periodOptions.map(option => (
              <button
                key={option.value}
                className={`periodBtn ${period === option.value ? 'periodBtn--active' : ''}`}
                onClick={() => setPeriod(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="statsGrid">
          {statItems.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        <div className="chartsGrid">
          <ChartCard
            variant="green"
            title="Doanh thu theo thời gian"
            subtitle={`Tổng: ${formatCurrency(overview?.totalRevenue || 0)}`}
            footer={`Cập nhật: ${new Date().toLocaleString('vi-VN')}`}
          >
            <RevenueChart data={revenueData} period={period} />
          </ChartCard>

          <ChartCard
            variant="pink"
            title="Đơn hàng theo thời gian"
            subtitle={`Tổng: ${overview?.totalOrders || 0} đơn`}
            footer={`Hoàn thành: ${overview?.completedOrders || 0} đơn`}
          >
            <OrdersChart data={revenueData} period={period} />
          </ChartCard>

        </div>

        <StatsTable 
          title="Top sản phẩm bán chạy" 
          columns={productColumns} 
          rows={productsPagedRows} 
        />
        {productsTotalPages > 1 && (
          <Pagination
            currentPage={productPage}
            totalPages={productsTotalPages}
            onPageChange={setProductPage}
          />
        )}

        <StatsTable 
          title="Đơn hàng gần đây" 
          columns={orderColumns} 
          rows={recentOrdersPagedRows} 
        />
        {recentOrdersTotalPages > 1 && (
          <Pagination
            currentPage={recentOrderPage}
            totalPages={recentOrdersTotalPages}
            onPageChange={setRecentOrderPage}
          />
        )}
      </div>
    </AdminLayout>
  )
}