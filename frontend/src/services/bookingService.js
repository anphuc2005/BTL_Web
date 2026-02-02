import apiClient from './api';

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  // Get all bookings
  getAllBookings: async () => {
    const response = await apiClient.get('/bookings');
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    const response = await apiClient.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await apiClient.delete(`/bookings/${id}`);
    return response.data;
  },

  // Get bookings by status
  getBookingsByStatus: async (status) => {
    const response = await apiClient.get(`/bookings/status/${status}`);
    return response.data;
  },
};

export default bookingService;
