import apiClient from './api';

export const partService = {
  // Get all parts
  getAllParts: async () => {
    const response = await apiClient.get('/parts');
    return response.data;
  },

  // Get part by ID
  getPartById: async (id) => {
    const response = await apiClient.get(`/parts/${id}`);
    return response.data;
  },

  // Search parts
  searchParts: async (query) => {
    const response = await apiClient.get(`/parts/search?q=${query}`);
    return response.data;
  },

  // Create new part
  createPart: async (partData) => {
    const response = await apiClient.post('/parts', partData);
    return response.data;
  },

  // Update part
  updatePart: async (id, partData) => {
    const response = await apiClient.put(`/parts/${id}`, partData);
    return response.data;
  },

  // Delete part
  deletePart: async (id) => {
    const response = await apiClient.delete(`/parts/${id}`);
    return response.data;
  },

  // Get available parts
  getAvailableParts: async () => {
    const response = await apiClient.get('/parts/available');
    return response.data;
  },
};

export default partService;
