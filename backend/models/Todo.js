// backend/models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true,
    trim: true
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  date: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String,
    default: 'general'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index for faster queries
todoSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Todo', todoSchema);