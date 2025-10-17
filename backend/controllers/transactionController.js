// backend/controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Get all transactions for user
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const { description, amount, type, date, category } = req.body;
    
    if (!description || !amount || !type || !date || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const transaction = new Transaction({
      userId: req.userId,
      description,
      amount,
      type,
      date,
      category
    });
    
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.userId 
    });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};