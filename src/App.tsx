import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';
import './App.css';

// Define the Todo type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Add a new todo
  const addTodo = (): void => {
    if (inputText.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  // Toggle todo completion
  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>Todo List</h1>
          <p>Stay organized and productive</p>
        </div>

        {/* Add Todo Input */}
        <div className="input-section">
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new todo..."
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Active: {activeCount}</span>
          <span>Completed: {completedCount}</span>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {(['all', 'active', 'completed'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-button ${filter === filterType ? 'active' : ''}`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>
                {filter === 'all' 
                  ? 'No todos yet. Add one above!' 
                  : `No ${filter} todos.`
                }
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`complete-button ${todo.completed ? 'checked' : ''}`}
                >
                  {todo.completed && <Check size={14} />}
                </button>
                
                <span className="todo-text">
                  {todo.text}
                </span>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="clear-completed">
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="clear-button"
            >
              Clear {completedCount} completed todo{completedCount !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;