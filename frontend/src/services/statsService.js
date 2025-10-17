// frontend/src/services/statsService.js
import api from './api';

export const statsService = {
  // Get user stats
  getUserStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },

  // Update user stats
  updateUserStats: async (updates) => {
    const response = await api.put('/stats', updates);
    return response.data;
  }
};