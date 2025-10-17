// backend/controllers/todoController.js
const Todo = require('../models/Todo');
const UserStats = require('../models/UserStats');

// Get all todos for user
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create todo
exports.createTodo = async (req, res) => {
  try {
    const { text, date, category } = req.body;
    
    if (!text || !date) {
      return res.status(400).json({ error: 'Text and date are required' });
    }
    
    const todo = new Todo({
      userId: req.userId,
      text,
      date,
      category
    });
    
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const wasCompleted = todo.completed;
    
    // Update todo
    Object.assign(todo, req.body);
    await todo.save();
    
    // If todo was just completed, award XP
    if (todo.completed && !wasCompleted) {
      const stats = await UserStats.findOne({ userId: req.userId });
      if (stats) {
        stats.xp += 10;
        stats.totalCompleted += 1;
        
        // Level up logic
        while (stats.xp >= stats.xpToNextLevel) {
          stats.xp -= stats.xpToNextLevel;
          stats.level += 1;
          stats.xpToNextLevel = Math.floor(stats.xpToNextLevel * 1.5);
        }
        
        await stats.save();
      }
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.userId 
    });
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};