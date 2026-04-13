require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Dữ liệu sản phẩm linh kiện sửa chữa điện thoại
const products = [
  // Màn hình
  {
    name: 'Màn hình iPhone 13 Pro Max Zin',
    description: 'Màn hình OLED nguyên bản chính hãng Apple cho iPhone 13 Pro Max. Độ sáng cao, hiển thị sắc nét, hỗ trợ 120Hz ProMotion.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 4500000,
    originalPrice: 5500000,
    category: 'screen',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S19ed5a635a6843c4afd4294a5faa0bfeq.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    images: [
      'https://ae-pic-a1.aliexpress-media.com/kf/S19ed5a635a6843c4afd4294a5faa0bfeq.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S16422b7bd3ec46669f131a3a7eed584fa.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S4254b1c56c3b41b9a3e35e2b243b504bg.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S47eed99cd69840ea8f801b10297b45bam.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sa535cc45b82c4e86a4d738e340040ff6n.jpg?has_lang=1&ver=1_220x220q75.jpg_.avif'
    ],
    stock: 15,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 42,
    tags: ['iPhone', 'OLED', 'Chính hãng'],
    compatibility: ['iPhone 13 Pro Max'],
    brand: 'Original',
    warranty: 12,
    specifications: 'OLED Super Retina XDR, 6.7 inch, 2778 x 1284 pixels, 120Hz ProMotion'
  },
  {
    name: 'Màn hình iPhone 12 OEM',
    description: 'Màn hình OEM chất lượng cao cho iPhone 12. Hiển thị tốt, giá cả phải chăng, bảo hành 6 tháng.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 1800000,
    originalPrice: 2200000,
    category: 'screen',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sb9bd537c51df4ec3bab21b35d95b8b86B.jpg_220x220q75.jpg_.avif',
    images: [
      'https://ae-pic-a1.aliexpress-media.com/kf/Sb9bd537c51df4ec3bab21b35d95b8b86B.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sef6194e18cb44c12b92f916e319bb266C.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sa3075432b5bb47868dc49a8aee0c3aedY.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S7f551b49f03a49e6ab2c2194a94846eaC.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sdfdfd9cfec6a4d00b974fd52126d9009M.jpg_220x220q75.jpg_.avif'
    ],
    stock: 30,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 28,
    tags: ['iPhone', 'OLED', 'OEM'],
    compatibility: ['iPhone 12', 'iPhone 12 Pro'],
    brand: 'OEM',
    warranty: 6,
    specifications: 'OLED, 6.1 inch, 2532 x 1170 pixels'
  },
  {
    name: 'Màn hình Samsung Galaxy S23 Ultra Zin',
    description: 'Màn hình Dynamic AMOLED 2X chính hãng Samsung. Độ sáng 1750 nits, màu sắc tự nhiên.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 3800000,
    originalPrice: 4500000,
    category: 'screen',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S2cf4f847b93c466e9c0e5348af301057Q.jpg_220x220q75.jpg_.avif',
    images: [
      'https://ae-pic-a1.aliexpress-media.com/kf/S2cf4f847b93c466e9c0e5348af301057Q.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S9a7ea655e68c4d6fa31a8c915a63a059z.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S3caffcc5d8ed43a7a0c409ecff05a8c21.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Se360ff572c934907ae114655a27fc574g.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sbc9b4d0ca1dc42be8cb72f1bf1bec7beH.jpg_220x220q75.jpg_.avif'
    ],
    stock: 20,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 35,
    tags: ['Samsung', 'AMOLED', 'Chính hãng'],
    compatibility: ['Galaxy S23 Ultra'],
    brand: 'Original',
    warranty: 12,
    specifications: 'Dynamic AMOLED 2X, 6.8 inch, 3088 x 1440 pixels, 120Hz'
  },
  {
    name: 'Màn hình Xiaomi Redmi Note 12 Pro',
    description: 'Màn hình AMOLED cho Xiaomi Redmi Note 12 Pro. Độ phân giải Full HD+, tần số quét 120Hz.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 1200000,
    originalPrice: 1500000,
    category: 'screen',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sa1059cddc1124c638755e332e5d217d9K.jpg_220x220q75.jpg_.avif',
    images: [
      'https://ae-pic-a1.aliexpress-media.com/kf/Sa1059cddc1124c638755e332e5d217d9K.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sb72fabc082bc45aa8e4de420d0312170s.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Sc3c0ab94bbd3490a8d3c86880d60aab6t.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/S057f8888ea7c448e8803b509b1fc1e3d0.jpg_220x220q75.jpg_.avif'
    ],
    stock: 25,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 19,
    tags: ['Xiaomi', 'AMOLED'],
    compatibility: ['Redmi Note 12 Pro', 'Redmi Note 12 Pro+'],
    brand: 'OEM',
    warranty: 6,
    specifications: 'AMOLED, 6.67 inch, 2400 x 1080 pixels, 120Hz'
  },

  // Pin
  {
    name: 'Pin iPhone 13 Pro Max Dung lượng cao',
    description: 'Pin lithium-ion dung lượng 4352mAh. Tương thích hoàn hảo, tuổi thọ cao, an toàn tuyệt đối.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 850000,
    originalPrice: 1200000,
    category: 'battery',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S29db9310cf53462e80e1512ec7694a555.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    images: 
    [
    'https://ae-pic-a1.aliexpress-media.com/kf/S29db9310cf53462e80e1512ec7694a555.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S36229e6d80f8470cb08062c01ecba19ew.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S9e67149d56d84655971077eb2b0fde82w.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Sef80d1068a3a40528f50f8106535b0b91.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif'
    ],
    stock: 50,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 67,
    tags: ['Pin', 'Dung lượng cao', 'iPhone'],
    compatibility: ['iPhone 13 Pro Max'],
    brand: 'OEM',
    warranty: 6,
    specifications: '4352mAh, 3.83V, 16.75Wh'
  },
  {
    name: 'Pin Samsung Galaxy S22 Ultra Original',
    description: 'Pin chính hãng Samsung 5000mAh. Chính hãng 100%, dung lượng thực, sạc nhanh 45W.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 950000,
    originalPrice: 1300000,
    category: 'battery',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sdfe1a4b26a864ce58ac73c91ae14f1d2n.jpg_220x220q75.jpg_.avif',
    images: [
    'https://ae-pic-a1.aliexpress-media.com/kf/Sdfe1a4b26a864ce58ac73c91ae14f1d2n.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Sf288fb3953e040dba60ba0e9046653dai.png_220x220.png_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S357d8555ae0a468dbaf95b1b4c6e9bbdL.png_220x220.png_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S79f119ca864b4208b894092cd6d49e299.png_220x220.png_.avif'
],
    stock: 35,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 52,
    tags: ['Pin', 'Samsung', 'Chính hãng'],
    compatibility: ['Galaxy S22 Ultra'],
    brand: 'Original',
    warranty: 12,
    specifications: '5000mAh, 3.85V, 19.25Wh, Fast Charging 45W'
  },
  {
    name: 'Pin iPhone 11 Pro',
    description: 'Pin thay thế cho iPhone 11 Pro, dung lượng 3046mAh. Chất lượng tốt, giá hợp lý.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 650000,
    originalPrice: 850000,
    category: 'battery',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Af09eb1c3b09d4704ba208afb34fea7b8h.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    images: [
    'https://ae-pic-a1.aliexpress-media.com/kf/Af09eb1c3b09d4704ba208afb34fea7b8h.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Scedf8c86fadd49728cc57219541bbe45g.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Scf188f132edd4db7a03bfd4e0124cc47y.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif'],
    stock: 40,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 31,
    tags: ['Pin', 'iPhone'],
    compatibility: ['iPhone 11 Pro'],
    brand: 'OEM',
    warranty: 6,
    specifications: '3046mAh, 3.79V, 11.54Wh'
  },

  // Camera
  {
    name: 'Camera Sau iPhone 13 Pro Max (3 Camera)',
    description: 'Bộ 3 camera sau chính hãng: Wide 12MP, Ultra Wide 12MP, Telephoto 12MP. LiDAR Scanner đầy đủ.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 3200000,
    originalPrice: 4000000,
    category: 'camera',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sdcb198c5ce3e424687b433d910d74cb39.jpg_220x220q75.jpg_.avif',
    images: ['https://ae-pic-a1.aliexpress-media.com/kf/Sdcb198c5ce3e424687b433d910d74cb39.jpg_220x220q75.jpg_.avif'],
    stock: 12,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 24,
    tags: ['Camera', 'iPhone', '3 Camera', 'Chính hãng'],
    compatibility: ['iPhone 13 Pro Max', 'iPhone 13 Pro'],
    brand: 'Original',
    warranty: 12,
    specifications: 'Wide 12MP f/1.5, Ultra Wide 12MP f/1.8, Telephoto 12MP f/2.8, LiDAR'
  },
  {
    name: 'Camera Trước iPhone 12',
    description: 'Camera selfie 12MP TrueDepth cho iPhone 12. Face ID hoạt động tốt, chụp ảnh sắc nét.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 1200000,
    originalPrice: 1500000,
    category: 'camera',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S1cc8b52b1d9d45198490004b22378724u.jpg_220x220q75.jpg_.avif',
    images: ['https://ae-pic-a1.aliexpress-media.com/kf/S1cc8b52b1d9d45198490004b22378724u.jpg_220x220q75.jpg_.avif'],
    stock: 20,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 18,
    tags: ['Camera', 'iPhone', 'TrueDepth'],
    compatibility: ['iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Mini'],
    brand: 'OEM',
    warranty: 6,
    specifications: '12MP f/2.2, TrueDepth, Face ID'
  },
  {
    name: 'Camera Sau Samsung S23 Ultra (4 Camera)',
    description: 'Cụm 4 camera sau Samsung: 200MP Wide, 12MP Ultra Wide, 10MP Tele 3x, 10MP Tele 10x.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 4500000,
    originalPrice: 5500000,
    category: 'camera',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S1c76a0fa9161489c9d83dd893896a4bbO.jpg_220x220q75.jpg_.avif',
    images: ['https://ae-pic-a1.aliexpress-media.com/kf/S1c76a0fa9161489c9d83dd893896a4bbO.jpg_220x220q75.jpg_.avif'],
    stock: 8,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 16,
    tags: ['Camera', 'Samsung', '200MP', 'Chính hãng'],
    compatibility: ['Galaxy S23 Ultra'],
    brand: 'Original',
    warranty: 12,
    specifications: '200MP Wide, 12MP Ultra Wide, 10MP Tele 3x, 10MP Tele 10x'
  },

  // Cổng sạc
  {
    name: 'Cổng sạc Lightning iPhone 11/12/13',
    description: 'Cổng sạc Lightning thay thế cho iPhone. Tương thích đa dòng máy, sạc nhanh ổn định.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 350000,
    originalPrice: 500000,
    category: 'charging-port',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S2b685e769f41411ca1d5b0dd73c12125o.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    images: 
    [
    'https://ae-pic-a1.aliexpress-media.com/kf/S2b685e769f41411ca1d5b0dd73c12125o.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S40a2a1bbdc34401db88096432744c8c7n.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Sde6354b8d712400b85034a7db4da436c8.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S23e21ca4b6b741c3a1cb46cabe9ec8cfP.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Sb8a5c566c63d46b1944dd2d54dd4423bd.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif'],
    stock: 60,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 45,
    tags: ['Cổng sạc', 'Lightning', 'iPhone'],
    compatibility: ['iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 11 Pro', 'iPhone 12 Pro', 'iPhone 13 Pro'],
    brand: 'OEM',
    warranty: 3,
    specifications: 'Lightning connector, Fast charging support'
  },
  {
    name: 'Cổng sạc USB-C Samsung Galaxy S21/S22/S23',
    description: 'Cổng sạc USB Type-C cho Samsung Galaxy. Hỗ trợ sạc nhanh 45W, truyền dữ liệu tốc độ cao.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 280000,
    originalPrice: 400000,
    category: 'charging-port',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sf2e9fcd29e2d432abe4562ffd7ee0822N.jpg_220x220q75.jpg_.avif',
    images: 
    [
    'https://ae-pic-a1.aliexpress-media.com/kf/Sf2e9fcd29e2d432abe4562ffd7ee0822N.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S9f7a9339a3974252b6c28209b96db42bH.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S289028dbbc934f00bff3e4a0d86454bfF.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Sb846f39d02214e27a47187b239378b71q.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/Se36185f59b0a4254a7ea5d01cc990d93p.jpg_220x220q75.jpg_.avif'],
    stock: 70,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 38,
    tags: ['Cổng sạc', 'USB-C', 'Samsung'],
    compatibility: ['Galaxy S21', 'Galaxy S22', 'Galaxy S23', 'Galaxy S21+', 'Galaxy S22+', 'Galaxy S23+'],
    brand: 'OEM',
    warranty: 3,
    specifications: 'USB Type-C, 45W Fast Charging, USB 3.2'
  },

  // Loa
  {
    name: 'Loa ngoài iPhone 13 Pro Max',
    description: 'Loa ngoài stereo chất lượng cao. Âm thanh to rõ, bass tốt, không bị rè hoặc méo.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 450000,
    originalPrice: 650000,
    category: 'speaker',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S200cf876d33d4efd83ff715cc3a4945bj.jpg_220x220q75.jpg_.avif',
    images: ['https://ae-pic-a1.aliexpress-media.com/kf/S200cf876d33d4efd83ff715cc3a4945bj.jpg_220x220q75.jpg_.avif'],
    stock: 45,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 22,
    tags: ['Loa', 'Stereo', 'iPhone'],
    compatibility: ['iPhone 13 Pro Max', 'iPhone 13 Pro'],
    brand: 'OEM',
    warranty: 6,
    specifications: 'Stereo speakers, Dolby Atmos support'
  },
  {
    name: 'Loa trong (Tai nghe) iPhone 12',
    description: 'Loa tai nghe/phone speaker cho iPhone 12. Nghe gọi rõ ràng, không bị nhỏ tiếng.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 280000,
    originalPrice: 400000,
    category: 'speaker',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sbeac793241c648a7a7d49fe3881f74710.jpg_220x220q75.jpg_.avif',
    images: ['https://ae-pic-a1.aliexpress-media.com/kf/Sbeac793241c648a7a7d49fe3881f74710.jpg_220x220q75.jpg_.avif'],
    stock: 50,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 15,
    tags: ['Loa', 'Tai nghe', 'iPhone'],
    compatibility: ['iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Mini'],
    brand: 'OEM',
    warranty: 6,
    specifications: 'Earpiece speaker'
  },

  // Nút bấm
  {
    name: 'Cụm nút nguồn + Volume iPhone 13',
    description: 'Bộ nút nguồn và nút âm lượng thay thế. Bấm êm, phản hồi tốt, lắp đặt dễ dàng.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 180000,
    originalPrice: 250000,
    category: 'button',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S873a49e29e4b4a5598d33f3c76af33dfC.jpg_220x220q75.jpg_.avif',
    images: 
    [
    'https://ae-pic-a1.aliexpress-media.com/kf/S873a49e29e4b4a5598d33f3c76af33dfC.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S876f8d78c08140e5aea01aef777718f51.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S4a563243201a48bb951f4ff525e2783dS.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S876f8d78c08140e5aea01aef777718f51.jpg_220x220q75.jpg_.avif'],
    stock: 80,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 12,
    tags: ['Nút bấm', 'iPhone'],
    compatibility: ['iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 13 Mini'],
    brand: 'OEM',
    warranty: 3,
    specifications: 'Power button + Volume buttons'
  },
  {
    name: 'Nút Home Touch ID iPhone 8/8 Plus',
    description: 'Nút Home tích hợp Touch ID. Vân tay nhạy, bấm tốt. Lưu ý: Touch ID chỉ hoạt động với main zin.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 350000,
    originalPrice: 500000,
    category: 'button',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sf94e3c63e9724bdaaf731d5eabb9b0d3v.jpg_220x220q75.jpg_.avif',
    images: 
    [
    'https://ae-pic-a1.aliexpress-media.com/kf/Sf94e3c63e9724bdaaf731d5eabb9b0d3v.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S4346c264e8fc4c21add63943fcb069b6a.jpg_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S699a7b6a9de847a9944915b29a593e6eu.jpg_220x220q75.jpg_.avif',
    ],
    stock: 25,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 19,
    tags: ['Nút Home', 'Touch ID', 'iPhone'],
    compatibility: ['iPhone 8', 'iPhone 8 Plus'],
    brand: 'OEM',
    warranty: 6,
    specifications: 'Home button with Touch ID sensor'
  },

  // Bo mạch
  {
    name: 'Main iPhone 11 64GB Quốc Tế Zin',
    description: 'Bo mạch chính iPhone 11 64GB bản Quốc Tế. Zin 100%, Full chức năng, bảo hành 6 tháng.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 4800000,
    originalPrice: 5500000,
    category: 'motherboard',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S913b9e2bf17a4f5388dad541f69da31fH.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    images: 
    [
    'https://ae-pic-a1.aliexpress-media.com/kf/S913b9e2bf17a4f5388dad541f69da31fH.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S0385750d951440619dc0e5a0dc5b477cQ.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S4f560fb26e6e436da7df343c0e23dc615.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    'https://ae-pic-a1.aliexpress-media.com/kf/S9175e7473c78497896f660356cb36227X.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif'],
    stock: 5,
    isAvailable: true,
    featured: true,
    rating: 5,
    numReviews: 8,
    tags: ['Main', 'Bo mạch', 'iPhone', 'Zin'],
    compatibility: ['iPhone 11'],
    brand: 'Original',
    warranty: 6,
    specifications: '64GB Storage, A13 Bionic chip, Full iCloud unlocked'
  },
  {
    name: 'Main Samsung Galaxy A52 128GB',
    description: 'Main Samsung A52 128GB. Chip Snapdragon 720G, RAM 8GB, hoạt động ổn định.',
    detailedDescription: [
      'Loại linh kiện: Màn hình điện thoại (zin / linh kiện – tùy phiên bản)',
      'Tình trạng: Mới 100%, chưa qua sử dụng',
      'Chính sách bảo hành có tăng và miễn phí: Xem chi tiết »',
      'Thời gian bảo hành: 12 tháng (1 đổi 1 nếu lỗi do nhà sản xuất)',
      'Công nghệ hiển thị: Độ phân giải cao, màu sắc chuẩn, cảm ứng nhạy',
      'Chất lượng: Sản xuất theo tiêu chuẩn kỹ thuật, tương thích hoàn toàn với máy',
      'Mã sản phẩm / mã item / barcode: 0964.304.308',
      'Lưu ý: Vui lòng chọn đúng dòng máy / loại màn hình trước khi đặt hàng'
    ],
    price: 2800000,
    originalPrice: 3500000,
    category: 'motherboard',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S068424d6f30f49bbb05d1023a9b037fe8.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif',
    images: [
      'https://ae-pic-a1.aliexpress-media.com/kf/S068424d6f30f49bbb05d1023a9b037fe8.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif'
    ],
    stock: 3,
    isAvailable: true,
    featured: false,
    rating: 4,
    numReviews: 5,
    tags: ['Main', 'Bo mạch', 'Samsung'],
    compatibility: ['Galaxy A52', 'Galaxy A52s'],
    brand: 'Original',
    warranty: 6,
    specifications: '128GB Storage, Snapdragon 720G, 8GB RAM'
  }
];

// Seed function
const seedProducts = async () => {
  try {
    console.log('Seeding products...');
    
    // Xóa tất cả sản phẩm cũ
    await Product.deleteMany({});
    console.log('Cleared old products');
    
    // Thêm sản phẩm mới
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully created ${createdProducts.length} products`);
    
    // Hiển thị thống kê
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\nProduct Statistics:');
    stats.forEach(stat => {
      console.log(`   - ${stat._id}: ${stat.count} products`);
    });
    
    console.log('\nSeeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
