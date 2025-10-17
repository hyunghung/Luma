// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
  type: { 
    type: String, 
    enum: ['income', 'expense'], 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['food', 'transport', 'entertainment', 'utilities', 'salary', 'other']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index for faster queries
transactionSchema.index({ userId: 1, date: 1 });
transactionSchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);