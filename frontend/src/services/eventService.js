// frontend/src/services/eventService.js
import api from './api';

export const eventService = {
  // Get all events
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  // Create event
  createEvent: async (title, date, time, description) => {
    const response = await api.post('/events', {
      title,
      date,
      time,
      description
    });
    return response.data;
  },

  // Update event
  updateEvent: async (id, updates) => {
    const response = await api.put(`/events/${id}`, updates);
    return response.data;
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};