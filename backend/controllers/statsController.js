// backend/controllers/statsController.js
const UserStats = require('../models/UserStats');

// Get user stats
exports.getUserStats = async (req, res) => {
  try {
    let stats = await UserStats.findOne({ userId: req.userId });
    
    // Create stats if they don't exist
    if (!stats) {
      stats = new UserStats({ userId: req.userId });
      await stats.save();
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user stats (for manual adjustments)
exports.updateUserStats = async (req, res) => {
  try {
    const stats = await UserStats.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};