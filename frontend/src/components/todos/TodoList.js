// components/todos/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, selectedDate }) => {
  const todayTodos = todos.filter(t => t.date === selectedDate);
  
  return (
    <div className="space-y-2">
      {todayTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No quests for this day. Start your adventure!
        </p>
      ) : (
        todayTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;