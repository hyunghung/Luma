// components/todos/AddTodo.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const AddTodo = ({ onAdd, selectedDate }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo, selectedDate);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new quest..."
        className="flex-1"
      />
      <Button type="submit" icon={<Plus className="w-5 h-5" />}>
        Add Quest
      </Button>
    </form>
  );
};

export default AddTodo;