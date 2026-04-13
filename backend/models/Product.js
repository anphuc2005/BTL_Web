const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add product name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  detailedDescription: [{
    type: String
  }],
  price: {
    type: Number,
    required: [true, 'Please add price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Please add category'],
    enum: ['screen', 'battery', 'camera', 'charging-port', 'speaker', 'button', 'motherboard', 'case', 'other']
  },
  image: {
    type: String,
    required: [true, 'Please add product image']
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    default: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  compatibility: [{
    type: String // Compatible phone models: 'iPhone 12', 'iPhone 13', etc
  }],
  brand: {
    type: String, // Brand of the part: 'Original', 'OEM', 'Third-party'
    enum: ['Original', 'OEM', 'Third-party', 'Refurbished']
  },
  warranty: {
    type: Number, // Warranty in months
    default: 0
  },
  specifications: {
    type: String,
    maxlength: [500, 'Specifications cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Index cho search
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

module.exports = mongoose.model('Product', productSchema);