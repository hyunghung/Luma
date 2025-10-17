// frontend/src/services/transactionService.js
import api from './api';

export const transactionService = {
  // Get all transactions
  getAllTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },

  // Create transaction
  createTransaction: async (description, amount, type, date, category) => {
    const response = await api.post('/transactions', {
      description,
      amount,
      type,
      date,
      category
    });
    return response.data;
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
};