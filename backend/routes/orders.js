const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendOrderConfirmation, sendStatusUpdate } = require('../services/emailService');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin) / Public (own orders)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sort = '-createdAt',
      startDate,
      endDate,
      search
    } = req.query;

    // Build query
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Search by order number or customer info
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customerInfo.name': { $regex: search, $options: 'i' } },
        { 'customerInfo.email': { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await Order.find(query)
      .populate('orderItems.product', 'name image category')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get order statistics
// @route   GET /api/orders/stats/dashboard
// @access  Private (Admin)
router.get('/stats/dashboard', protect, adminOnly, async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Today's orders
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfDay }
    });

    // Today's revenue
    const todayRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay }, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Month's revenue
    const monthRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Order status distribution
    const statusStats = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        todayOrders,
        todayRevenue: todayRevenue[0]?.total || 0,
        monthRevenue: monthRevenue[0]?.total || 0,
        statusStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product', 'name image category');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      orderType = 'repair-service',
      repairInfo,
      orderItems = [],
      shippingAddress,
      paymentMethod,
      customerInfo,
      notes
    } = req.body;

    let itemsPrice = 0;
    let processedItems = [];

    // Handle repair service orders
    if (orderType === 'repair-service') {
      // Validate repair info
      if (!repairInfo || !repairInfo.deviceType || !repairInfo.issue) {
        return res.status(400).json({
          success: false,
          message: 'Please provide device type and issue for repair service'
        });
      }

      // Use estimated cost from repairInfo or default
      itemsPrice = repairInfo.estimatedCost || 100000;

    } else if (orderType === 'parts-purchase') {
      // Handle parts purchase orders
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No order items provided for parts purchase'
        });
      }

      // Process order items with product validation
      for (let item of orderItems) {
        const product = await Product.findById(item.product);
        
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.product}`
          });
        }

        if (!product.isAvailable) {
          return res.status(400).json({
            success: false,
            message: `Product is not available: ${product.name}`
          });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product: ${product.name}`
          });
        }

        const orderItem = {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity
        };

        itemsPrice += product.price * item.quantity;
        processedItems.push(orderItem);
      }

      // Update product stock
      for (let item of orderItems) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } }
        );
      }
    }

    // Calculate shipping and tax
    const shippingPrice = orderType === 'repair-service' ? 0 : (itemsPrice > 500000 ? 0 : 30000);
    const taxPrice = Math.round(itemsPrice * 0.1); // 10% tax
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await Order.create({
      orderType,
      repairInfo: orderType === 'repair-service' ? repairInfo : undefined,
      orderItems: processedItems,
      shippingAddress,
      paymentMethod,
      customerInfo,
      notes,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('orderItems.product', 'name image category');

    // Gửi email xác nhận (async, không chặn response)
    if (orderType === 'repair-service' && repairInfo) {
      const deviceNames = {
        'iphone': 'iPhone',
        'ipad': 'iPad',
        'android': 'Android',
        'tablet': 'Tablet',
        'other': 'Thiết bị khác'
      };
      
      const issueNames = {
        'screen': 'Vỡ màn hình',
        'battery': 'Pin',
        'charging': 'Cổng sạc',
        'camera': 'Camera',
        'speaker': 'Loa',
        'button': 'Nút bấm',
        'water-damage': 'Hỏng do nước',
        'diagnosis': 'Chẩn đoán',
        'other': 'Vấn đề khác'
      };

      const deviceName = deviceNames[repairInfo.deviceType] || repairInfo.deviceType;
      const issueName = issueNames[repairInfo.issue] || repairInfo.issue;

      // Gửi email không đồng bộ
      sendOrderConfirmation(populatedOrder, deviceName, issueName)
        .then(result => {
          if (result.success) {
            console.log(`Email sent to ${populatedOrder.customerInfo.email}`);
          } else {
            console.log(`Email not sent: ${result.message || result.error}`);
          }
        })
        .catch(err => console.error('Email error:', err));
    }

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['Chờ xác nhận', 'Đang xử lý', 'Hoàn thành', 'Hủy'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(status === 'delivered' && { isDelivered: true, deliveredAt: new Date() }),
        ...(status === 'completed' && { isDelivered: true, deliveredAt: new Date() })
      },
      { new: true }
    ).populate('orderItems.product', 'name image category');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Gửi email thông báo cập nhật trạng thái
    sendStatusUpdate(order, status)
      .then(result => {
        if (result.success) {
          console.log(`✅ Status update email sent to ${order.customerInfo.email}`);
        }
      })
      .catch(err => console.error('Status email error:', err));

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update order payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
router.put('/:id/payment', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: req.body
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update order with items and calculate total
// @route   PUT /api/orders/:id
// @access  Private (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, orderItems } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Determine old items that were holding stock
    const oldStatus = order.status;
    const oldOrderItems = order.orderItems || [];
    const heldStockOld = oldStatus === 'Hủy' ? [] : oldOrderItems;

    let processedItems = oldOrderItems;

    // Validate and process new orderItems if provided
    if (orderItems && Array.isArray(orderItems)) {
      processedItems = [];
      for (let item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
        }
        processedItems.push({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity || 1
        });
      }
    }

    // Determine new status
    const newStatus = status || oldStatus;
    const heldStockNew = newStatus === 'Hủy' ? [] : processedItems;

    // Calculate stock deltas for all products involved
    const stockDeltas = {};

    // 1. Add back all old stock
    for (const old of heldStockOld) {
      const pid = old.product.toString();
      stockDeltas[pid] = (stockDeltas[pid] || 0) + old.quantity;
    }

    // 2. Subtract all new stock
    for (const newItem of heldStockNew) {
      const pid = newItem.product.toString();
      stockDeltas[pid] = (stockDeltas[pid] || 0) - newItem.quantity;
    }

    // 3. Prevent negative stock
    for (const [pid, delta] of Object.entries(stockDeltas)) {
      if (delta < 0) { // needs more stock than we returned
        const product = await Product.findById(pid);
        if (!product || product.stock < Math.abs(delta)) {
          return res.status(400).json({
            success: false,
            message: `Không đủ số lượng trong kho cho linh kiện: ${product ? product.name : pid}`
          });
        }
      }
    }

    // 4. Update stock in DB
    for (const [pid, delta] of Object.entries(stockDeltas)) {
      if (delta !== 0) {
        await Product.findByIdAndUpdate(pid, { $inc: { stock: delta } });
      }
    }

    // Apply updates to order
    if (status) {
      order.status = status;
    }
    if (orderItems && Array.isArray(orderItems)) {
      order.orderItems = processedItems;
    }

    // Tính tổng tiền khi chuyển sang "Hoàn thành"
    if (status === 'Hoàn thành' && order.orderItems.length > 0) {
      const totalAmount = order.orderItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      // Lưu vào repairInfo.estimatedCost
      if (!order.repairInfo) {
        order.repairInfo = {};
      }
      order.repairInfo.estimatedCost = totalAmount;
    }

    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate('orderItems.product', 'name image category price');

    // Gửi email nếu status thay đổi
    if (status) {
      sendStatusUpdate(updatedOrder, status)
        .then(result => {
          if (result.success) {
            console.log(`✅ Status update email sent to ${updatedOrder.customerInfo.email}`);
          }
        })
        .catch(err => console.error('Status email error:', err));
    }

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;