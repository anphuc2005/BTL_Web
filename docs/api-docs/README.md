# API Documentation - Phone Repair Management System

## Base URL

```
http://localhost:8080/api
```

## Authentication

Currently, the API does not require authentication. In production, implement proper authentication using JWT tokens or OAuth2.

## Response Format

### Success Response
```json
{
  "id": 1,
  "customerName": "Nguyễn Văn A",
  "status": "PENDING",
  ...
}
```

### Error Response
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Booking not found with id: 999",
  "path": "/api/bookings/999"
}
```

## Endpoints

### Booking Management

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "customerName": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0901234567",
  "deviceType": "phone",
  "serviceType": "screen",
  "priceRange": "500k_1m",
  "description": "Màn hình bị vỡ góc phải"
}
```

**Response (201 Created)**:
```json
{
  "id": 1,
  "customerName": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0901234567",
  "deviceType": "phone",
  "serviceType": "screen",
  "priceRange": "500k_1m",
  "description": "Màn hình bị vỡ góc phải",
  "status": "PENDING",
  "estimatedCompletion": "2024-01-18T10:30:00",
  "notes": null,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

#### Get All Bookings
```http
GET /api/bookings
```

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "customerName": "Nguyễn Văn A",
    ...
  },
  {
    "id": 2,
    "customerName": "Trần Thị B",
    ...
  }
]
```

#### Get Booking by ID
```http
GET /api/bookings/{id}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "customerName": "Nguyễn Văn A",
  ...
}
```

#### Get Bookings by Status
```http
GET /api/bookings/status/{status}
```

Status values: `PENDING`, `CONFIRMED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "status": "PENDING",
    ...
  }
]
```

#### Update Booking Status
```http
PUT /api/bookings/{id}/status
Content-Type: application/json

{
  "status": "CONFIRMED"
}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "status": "CONFIRMED",
  ...
}
```

#### Cancel Booking
```http
DELETE /api/bookings/{id}
```

**Response (204 No Content)**

#### Count Bookings by Status
```http
GET /api/bookings/count/{status}
```

**Response (200 OK)**:
```json
12
```

---

### Part Management

#### Create Part
```http
POST /api/parts
Content-Type: application/json

{
  "name": "Màn hình iPhone 13",
  "description": "Màn hình OLED chính hãng",
  "stock": 15,
  "price": 2500000,
  "category": "Screen",
  "compatibleDevices": "iPhone 13"
}
```

**Response (201 Created)**:
```json
{
  "id": 1,
  "name": "Màn hình iPhone 13",
  "description": "Màn hình OLED chính hãng",
  "stock": 15,
  "price": 2500000.00,
  "status": "AVAILABLE",
  "category": "Screen",
  "compatibleDevices": "iPhone 13",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

#### Get All Parts
```http
GET /api/parts
```

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "Màn hình iPhone 13",
    "stock": 15,
    "status": "AVAILABLE",
    ...
  }
]
```

#### Get Part by ID
```http
GET /api/parts/{id}
```

#### Get Available Parts
```http
GET /api/parts/available
```

Returns only parts with status `AVAILABLE`

#### Search Parts
```http
GET /api/parts/search?q=iPhone
```

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "Màn hình iPhone 13",
    ...
  },
  {
    "id": 2,
    "name": "Pin iPhone 13",
    ...
  }
]
```

#### Update Part
```http
PUT /api/parts/{id}
Content-Type: application/json

{
  "name": "Màn hình iPhone 13 Pro",
  "description": "Updated description",
  "stock": 20,
  "price": 2800000,
  "category": "Screen",
  "compatibleDevices": "iPhone 13 Pro"
}
```

#### Delete Part
```http
DELETE /api/parts/{id}
```

**Response (204 No Content)**

---

### Admin Dashboard

#### Get Dashboard Statistics
```http
GET /api/admin/dashboard/stats
```

**Response (200 OK)**:
```json
{
  "pendingBookings": 12,
  "confirmedBookings": 5,
  "inProgressBookings": 8,
  "completedBookings": 45,
  "cancelledBookings": 3,
  "lowStockItems": 2,
  "outOfStockItems": 1
}
```

#### Get Low Stock Items
```http
GET /api/admin/inventory/low-stock
```

**Response (200 OK)**:
```json
[
  {
    "id": 4,
    "name": "Pin Samsung S21",
    "stock": 3,
    "status": "LOW_STOCK",
    ...
  }
]
```

#### Get Out of Stock Items
```http
GET /api/admin/inventory/out-of-stock
```

#### Update Part Stock
```http
POST /api/admin/inventory/{partId}/update-stock?quantity=10
```

**Response (200 OK)**

---

### Customer Management

#### Get All Customers
```http
GET /api/customers
```

#### Get Customer by ID
```http
GET /api/customers/{id}
```

#### Get Customer by Email
```http
GET /api/customers/email/{email}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

## Data Models

### Booking Status Flow
```
PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
         ↓
    CANCELLED
```

### Part Status
- `AVAILABLE`: Stock > 5
- `LOW_STOCK`: Stock 1-5
- `OUT_OF_STOCK`: Stock = 0

### Device Types
- `phone`: Smartphone
- `ipad`: iPad
- `android`: Android devices
- `tablet`: Tablets

### Service Types
- `battery`: Pin
- `screen`: Màn hình
- `charging_port`: Cổng sạc
- `camera`: Camera
- `antenna`: Chân sóng
- `other`: Khác

### Price Ranges
- `under_500k`: Dưới 500k
- `500k_1m`: 500k - 1 triệu
- `1m_2m`: 1 - 2 triệu
- `above_2m`: Trên 2 triệu

## Validation Rules

### Booking
- `customerName`: Required, not blank
- `email`: Required, valid email format
- `phone`: Required, not blank
- `deviceType`: Required
- `serviceType`: Required
- `description`: Required

### Part
- `name`: Required, not blank
- `stock`: Required, >= 0
- `price`: Required, > 0

## Rate Limiting

Currently not implemented. For production, consider implementing rate limiting to prevent abuse.

## Swagger UI

For interactive API documentation, visit:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI Spec**: http://localhost:8080/api-docs

## Examples

### Create a Booking with cURL
```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Nguyễn Văn A",
    "email": "test@example.com",
    "phone": "0901234567",
    "deviceType": "phone",
    "serviceType": "screen",
    "priceRange": "500k_1m",
    "description": "Màn hình bị vỡ"
  }'
```

### Get All Bookings with cURL
```bash
curl http://localhost:8080/api/bookings
```

### JavaScript Example (Axios)
```javascript
import axios from 'axios';

// Create booking
const createBooking = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/api/bookings', data);
    console.log('Booking created:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

// Get all bookings
const getBookings = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/bookings');
    console.log('Bookings:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

**For more details, refer to the Swagger UI documentation when the backend is running.**
