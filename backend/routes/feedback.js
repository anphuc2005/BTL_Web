const express = require('express');
const Feedback = require('../models/Feedback');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, lastName, email, phone, serviceType, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin: Họ, Email và Lời nhắn'
      });
    }

    // Create feedback
    const feedback = await Feedback.create({
      name,
      lastName,
      email,
      phone,
      serviceType: serviceType || 'Dịch vụ',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ liên hệ lại sớm nhất.',
      data: feedback
    });

  } catch (error) {
    console.error('Error creating feedback:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.',
      error: error.message
    });
  }
});

// @desc    Get all feedbacks
// @route   GET /api/feedback
// @access  Public (should be protected in production)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = '-createdAt'
    } = req.query;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }

    const feedbacks = await Feedback.find(query)
      .sort(sortBy)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments(query);

    res.json({
      success: true,
      data: feedbacks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi tải danh sách phản hồi',
      error: error.message
    });
  }
});

// @desc    Get single feedback by ID
// @route   GET /api/feedback/:id
// @access  Public (should be protected in production)
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phản hồi'
      });
    }

    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra',
      error: error.message
    });
  }
});

// @desc    Update feedback status
// @route   PUT /api/feedback/:id
// @access  Public (should be protected in production)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phản hồi'
      });
    }

    // Update fields
    if (status) feedback.status = status;
    if (adminNotes !== undefined) feedback.adminNotes = adminNotes;

    await feedback.save();

    res.json({
      success: true,
      message: 'Cập nhật phản hồi thành công',
      data: feedback
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi cập nhật',
      error: error.message
    });
  }
});

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Public (should be protected in production)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phản hồi'
      });
    }

    await feedback.deleteOne();

    res.json({
      success: true,
      message: 'Đã xóa phản hồi'
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi xóa',
      error: error.message
    });
  }
});

module.exports = router;
