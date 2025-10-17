// components/todos/TodoItem.jsx
import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
        todo.completed 
          ? 'bg-green-900 bg-opacity-30 border-green-500' 
          : 'bg-gray-800 bg-opacity-50 border-gray-700'
      }`}
    >
      <button onClick={() => onToggle(todo.id)} className="flex-shrink-0">
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-400" />
        ) : (
          <Circle className="w-6 h-6 text-gray-500" />
        )}
      </button>
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 text-red-400 hover:text-red-300"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TodoItem;