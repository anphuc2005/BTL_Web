-- Sample data for Phone Repair Management System

-- Insert sample parts
INSERT INTO parts (name, description, stock, price, status, category, compatible_devices, created_at, updated_at) VALUES
('Màn hình iPhone 13', 'Màn hình OLED chính hãng cho iPhone 13', 15, 2500000.00, 'AVAILABLE', 'Screen', 'iPhone 13', NOW(), NOW()),
('Pin iPhone 13', 'Pin chính hãng cho iPhone 13, dung lượng 3240mAh', 20, 800000.00, 'AVAILABLE', 'Battery', 'iPhone 13', NOW(), NOW()),
('Màn hình Samsung S21', 'Màn hình AMOLED chính hãng cho Samsung S21', 10, 2200000.00, 'AVAILABLE', 'Screen', 'Samsung S21', NOW(), NOW()),
('Pin Samsung S21', 'Pin chính hãng cho Samsung S21, dung lượng 4000mAh', 3, 750000.00, 'LOW_STOCK', 'Battery', 'Samsung S21', NOW(), NOW()),
('Camera iPad Pro', 'Camera sau chính hãng cho iPad Pro', 0, 1200000.00, 'OUT_OF_STOCK', 'Camera', 'iPad Pro', NOW(), NOW()),
('Cổng sạc iPhone 13', 'Cổng sạc Lightning chính hãng', 25, 350000.00, 'AVAILABLE', 'Charging Port', 'iPhone 13', NOW(), NOW()),
('Chân sóng iPhone 12', 'Chân sóng chính hãng cho iPhone 12', 8, 450000.00, 'AVAILABLE', 'Antenna', 'iPhone 12', NOW(), NOW());

-- Insert sample customers
INSERT INTO customers (name, email, phone, address, created_at) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', '123 Đường ABC, Hà Nội', NOW()),
('Trần Thị B', 'tranthib@example.com', '0912345678', '456 Đường DEF, TP.HCM', NOW()),
('Lê Văn C', 'levanc@example.com', '0923456789', '789 Đường GHI, Đà Nẵng', NOW());

-- Insert sample bookings
INSERT INTO bookings (customer_name, email, phone, device_type, service_type, price_range, description, status, estimated_completion, notes, created_at, updated_at) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', 'phone', 'screen', '500k_1m', 'Màn hình bị vỡ góc phải, cần thay mới', 'PENDING', DATE_ADD(NOW(), INTERVAL 3 DAY), NULL, NOW(), NOW()),
('Trần Thị B', 'tranthib@example.com', '0912345678', 'android', 'battery', 'under_500k', 'Pin chai, cần thay pin mới', 'IN_PROGRESS', DATE_ADD(NOW(), INTERVAL 2 DAY), 'Đang thay pin', NOW(), NOW()),
('Lê Văn C', 'levanc@example.com', '0923456789', 'ipad', 'camera', '1m_2m', 'Camera sau không hoạt động', 'COMPLETED', NOW(), 'Đã hoàn thành', DATE_ADD(NOW(), INTERVAL -2 DAY), NOW());
