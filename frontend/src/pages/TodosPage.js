// pages/TodosPage.jsx
import React, { useState, useEffect } from 'react';
import StatsBar from '../components/gamification/StatsBar';
import ProgressBar from '../components/todos/ProgressBar';
import AddTodo from '../components/todos/AddTodo';
import TodoList from '../components/todos/TodoList';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { todoService } from '../services/todoService';
import { statsService } from '../services/statsService';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    streak: 0,
    totalCompleted: 0
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await statsService.getUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddTodo = async (text, date) => {
    try {
      const newTodo = await todoService.createTodo(text, date);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const updatedTodo = await todoService.toggleTodo(id, !todo.completed);
      setTodos(todos.map(t => (t._id === id ? updatedTodo : t)));
      
      // Refresh stats if todo was completed
      if (!todo.completed) {
        fetchStats();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const todayTodos = todos.filter(t => t.date === selectedDate);
  const completedToday = todayTodos.filter(t => t.completed).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-cyan-400 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsBar stats={stats} />
      <ProgressBar completed={completedToday} total={todayTodos.length} />
      
      <Card title="Select Quest Date">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Card>

      <Card title="Add New Quest">
        <AddTodo onAdd={handleAddTodo} selectedDate={selectedDate} />
      </Card>

      <Card 
        title={
          selectedDate === new Date().toISOString().split('T')[0]
            ? "Today's Quests"
            : `Quests for ${selectedDate}`
        }
      >
        <TodoList
          todos={todos}
          selectedDate={selectedDate}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </Card>
    </div>
  );
};

export default TodosPage;