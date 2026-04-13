import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để tự động gắn token cho các API cần xác thực
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor để xử lý errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bỏ qua lỗi khi request bị cancel (chuyển trang, unmount component)
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      return Promise.reject(error);
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Products API
export const productAPI = {
  getAll: (params, config) => api.get('/products', { params, ...config }),
  getById: (id, config) => api.get(`/products/${id}`, config),
  create: (data, config) => api.post('/products', data, config),
  update: (id, data, config) => api.put(`/products/${id}`, data, config),
  delete: (id, config) => api.delete(`/products/${id}`, config),
};

// Orders API
export const orderAPI = {
  getAll: (params, config) => api.get('/orders', { params, ...config }),
  getById: (id, config) => api.get(`/orders/${id}`, config),
  create: (data, config) => api.post('/orders', data, config),
  update: (id, data, config) => api.put(`/orders/${id}`, data, config),
  updateStatus: (id, status, config) => api.put(`/orders/${id}/status`, { status }, config),
  delete: (id, config) => api.delete(`/orders/${id}`, config),
};

// Feedback API
export const feedbackAPI = {
  send: (data, config) => api.post('/feedback', data, config),
  getAll: (params, config) => api.get('/feedback', { params, ...config }),
  getById: (id, config) => api.get(`/feedback/${id}`, config),
  update: (id, data, config) => api.put(`/feedback/${id}`, data, config),
  delete: (id, config) => api.delete(`/feedback/${id}`, config),
};

// Analytics API
export const analyticsAPI = {
  getOverview: (params, config) => api.get('/analytics/overview', { params, ...config }),
  getRevenueChart: (params, config) => api.get('/analytics/revenue-chart', { params, ...config }),
  getTopProducts: (params, config) => api.get('/analytics/top-products', { params, ...config }),
  getRecentOrders: (params, config) => api.get('/analytics/recent-orders', { params, ...config }),
  getStatusDistribution: (config) => api.get('/analytics/status-distribution', config),
};

export default api;
