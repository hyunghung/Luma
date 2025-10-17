// frontend/src/services/todoService.js
import api from './api';

export const todoService = {
  // Get all todos
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Create todo
  createTodo: async (text, date, category = 'general') => {
    const response = await api.post('/todos', {
      text,
      date,
      category
    });
    return response.data;
  },

  // Update todo
  updateTodo: async (id, updates) => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Toggle todo completion
  toggleTodo: async (id, completed) => {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data;
  }
};