// backend/routes/stats.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

router.get('/', statsController.getUserStats);
router.put('/', statsController.updateUserStats);

module.exports = router;