// src/components/ToDoList.js
import React, { useState } from 'react';
import '../styles/ToDoList.scss';

const ToDoList = ({ data }) => {
  const [tasks, setTasks] = useState(data || []);
  const [input, setInput] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false); // Скрывать выполненные

  // Добавление новой задачи
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = {
      id: new Date().getTime(),
      text: input,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput('');
  };

  // Переключение состояния задачи
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Переключение скрытия выполненных задач
  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  return (
    <div className="todo-list">
      <form className="todo-list__form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="todo-list__input"
          placeholder="Добавить задачу..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="todo-list__add-button">
          Добавить
        </button>
      </form>

      <button className="todo-list__toggle-button" onClick={toggleHideCompleted}>
        {hideCompleted ? 'Показать выполненные' : 'Скрыть выполненные'}
      </button>

      <ul className="todo-list__items">
        {tasks
          .filter((item) => !hideCompleted || !item.completed) // Фильтрация задач
          .map((item) => (
            <li
              key={item.id}
              className={`todo-list__item ${item.completed ? 'todo-list__item--completed' : ''}`}
              onClick={() => toggleTask(item.id)}
            >
              {item.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ToDoList;
