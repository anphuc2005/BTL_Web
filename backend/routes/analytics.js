const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect, adminOnly);

// Helper function để parse và validate số
const parsePositiveInt = (value, defaultValue) => {
  const parsed = parseInt(value);
  return parsed > 0 ? parsed : defaultValue;
};

// @route   GET /api/analytics/overview
// @desc    Lấy thống kê tổng quan
// @access  Public (nên thêm auth sau)
router.get('/overview', async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // Tính ngày bắt đầu dựa trên period
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Lấy tất cả đơn hàng trong khoảng thời gian
    const orders = await Order.find({
      createdAt: { $gte: startDate }
    })
    .lean() // Sử dụng lean() để trả về plain JS objects, giảm memory usage
    .maxTimeMS(10000); // Timeout sau 10 giây

    // Lấy đơn hàng của kỳ trước để so sánh
    const prevStartDate = new Date(startDate);
    prevStartDate.setTime(startDate.getTime() - (now.getTime() - startDate.getTime()));
    const prevOrders = await Order.find({
      createdAt: { $gte: prevStartDate, $lt: startDate }
    })
    .lean()
    .maxTimeMS(10000);

    // Helper function để tính tổng tiền đơn hàng
    const calculateOrderTotal = (order) => {
      if (order.orderItems && order.orderItems.length > 0) {
        // Đơn mua linh kiện
        return order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      } else if (order.repairInfo && order.repairInfo.estimatedCost) {
        // Đơn sửa chữa
        return order.repairInfo.estimatedCost;
      }
      return 0;
    };

    // Tính toán các chỉ số
    const totalRevenue = orders.reduce((sum, order) => sum + calculateOrderTotal(order), 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'Hoàn thành').length;
    const pendingOrders = orders.filter(o => o.status === 'Chờ xác nhận').length;
    
    // Tính số lượng sản phẩm đã bán
    const totalProducts = orders.reduce((sum, order) => {
      if (order.orderItems && order.orderItems.length > 0) {
        return sum + order.orderItems.reduce((s, item) => s + item.quantity, 0);
      }
      return sum + 1; // Đơn sửa chữa tính là 1 dịch vụ
    }, 0);

    // Tính số khách hàng unique
    const uniqueCustomers = new Set(
      orders
        .map(o => o.shippingAddress?.phoneNumber || o.customerInfo?.phone)
        .filter(p => p)
    ).size;

    // Tính % thay đổi so với kỳ trước
    const prevRevenue = prevOrders.reduce((sum, order) => sum + calculateOrderTotal(order), 0);
    const prevOrdersCount = prevOrders.length;
    
    const revenueChange = prevRevenue > 0 
      ? ((totalRevenue - prevRevenue) / prevRevenue * 100).toFixed(1)
      : totalRevenue > 0 ? 100 : 0;
    const ordersChange = prevOrdersCount > 0
      ? ((totalOrders - prevOrdersCount) / prevOrdersCount * 100).toFixed(1)
      : totalOrders > 0 ? 100 : 0;

    res.json({
      overview: {
        totalRevenue,
        totalOrders,
        completedOrders,
        pendingOrders,
        totalProducts,
        uniqueCustomers,
        revenueChange,
        ordersChange
      }
    });
  } catch (error) {
    console.error('Error in analytics overview:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/analytics/revenue-chart
// @desc    Lấy dữ liệu biểu đồ doanh thu theo thời gian
// @access  Public
router.get('/revenue-chart', async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const now = new Date();
    let startDate = new Date();
    let groupBy = '$day';
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        groupBy = '$day';
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        groupBy = '$day';
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        groupBy = '$quarter';
        break;
      case '1y':
        startDate = new Date(now.getFullYear(), 0, 1);
        groupBy = '$month';
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    const orders = await Order.find({
      createdAt: { $gte: startDate }
    })
    .sort({ createdAt: 1 })
    .lean()
    .maxTimeMS(10000);

    // Helper function để tính tổng tiền đơn hàng
    const calculateOrderTotal = (order) => {
      if (order.orderItems && order.orderItems.length > 0) {
        return order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      } else if (order.repairInfo && order.repairInfo.estimatedCost) {
        return order.repairInfo.estimatedCost;
      }
      return 0;
    };

    // Generate empty buckets to resolve missing dates issue
    const revenueByDate = {};
    const ordersByDate = {};
    
    const iter = new Date(startDate);
    const end = new Date(now);
    
    if (groupBy === '$month') {
      iter.setDate(1);
    } else if (groupBy === '$quarter') {
      const q = Math.floor(iter.getMonth() / 3);
      iter.setMonth(q * 3, 1);
    }

    iter.setHours(0,0,0,0);
    end.setHours(23,59,59,999);

    const formatDateKey = (d, gb) => {
      const year = d.getFullYear();
      if (gb === '$quarter') {
        const q = Math.floor(d.getMonth() / 3) + 1;
        return `${year}-Q${q}`;
      }
      const month = String(d.getMonth() + 1).padStart(2, '0');
      if (gb === '$month') {
        return `${year}-${month}`;
      }
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (groupBy !== '$day') {
      while (iter <= end) {
        const dateKey = formatDateKey(iter, groupBy);
        revenueByDate[dateKey] = 0;
        ordersByDate[dateKey] = 0;
        
        if (groupBy === '$quarter') {
          iter.setMonth(iter.getMonth() + 3);
        } else if (groupBy === '$month') {
          iter.setMonth(iter.getMonth() + 1);
        }
      }
    }

    orders.forEach(order => {
      const d = new Date(order.createdAt);
      const dateKey = formatDateKey(d, groupBy);
      
      if (revenueByDate[dateKey] === undefined) {
        revenueByDate[dateKey] = 0;
        ordersByDate[dateKey] = 0;
      }

      revenueByDate[dateKey] += calculateOrderTotal(order);
      ordersByDate[dateKey] += 1;
    });

    // Tạo mảng dữ liệu cho chart
    const chartData = Object.keys(revenueByDate).map(date => ({
      date,
      revenue: revenueByDate[date],
      orders: ordersByDate[date]
    }));

    res.json({ chartData });
  } catch (error) {
    console.error('Error in revenue chart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/analytics/top-products
// @desc    Lấy danh sách sản phẩm bán chạy
// @access  Public
router.get('/top-products', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const safeLimit = parsePositiveInt(limit, 5);
    
    // Aggregate để tính số lượng bán và doanh thu của từng sản phẩm
    // Chỉ lấy đơn có orderItems (đơn mua linh kiện)
    const topProducts = await Order.aggregate([
      { $match: { orderItems: { $exists: true, $ne: [] } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          name: { $first: '$orderItems.name' },
          image: { $first: '$orderItems.image' },
          totalQuantity: { $sum: '$orderItems.quantity' },
          totalRevenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: safeLimit }
    ], { maxTimeMS: 10000 });

    res.json({ topProducts });
  } catch (error) {
    console.error('Error in top products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/analytics/recent-orders
// @desc    Lấy đơn hàng gần đây
// @access  Public
router.get('/recent-orders', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const safeLimit = parsePositiveInt(limit, 10);
    
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .select('orderNumber shippingAddress customerInfo orderItems repairInfo status createdAt orderType')
      .lean()
      .maxTimeMS(10000);

    // Tính totalAmount cho mỗi đơn
    const ordersWithTotal = recentOrders.map(order => {
      let totalAmount = 0;
      if (order.orderItems && order.orderItems.length > 0) {
        totalAmount = order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      } else if (order.repairInfo && order.repairInfo.estimatedCost) {
        totalAmount = order.repairInfo.estimatedCost;
      }
      
      return {
        ...order,
        totalAmount,
        items: order.orderItems || [] // Map orderItems to items for frontend compatibility
      };
    });

    res.json({ recentOrders: ordersWithTotal });
  } catch (error) {
    console.error('Error in recent orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/analytics/status-distribution
// @desc    Lấy phân bố trạng thái đơn hàng
// @access  Public
router.get('/status-distribution', async (req, res) => {
  try {
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ], { maxTimeMS: 10000 });

    const distribution = statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({ distribution });
  } catch (error) {
    console.error('Error in status distribution:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
