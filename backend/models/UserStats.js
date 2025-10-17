// backend/models/UserStats.js
const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  level: { 
    type: Number, 
    default: 1 
  },
  xp: { 
    type: Number, 
    default: 0 
  },
  xpToNextLevel: { 
    type: Number, 
    default: 100 
  },
  streak: { 
    type: Number, 
    default: 0 
  },
  totalCompleted: { 
    type: Number, 
    default: 0 
  },
  lastActive: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('UserStats', userStatsSchema);