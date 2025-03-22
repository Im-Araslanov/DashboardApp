import React, { useState, useEffect } from "react";
import { ReactComponent as DragIcon } from "../../assets/svgs/drag-icon.svg";
import { ReactComponent as AddIcaon } from "../../assets/svgs/add-icon.svg";
import styles from "./TodoList.module.scss";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  // Загружаем задачи из localStorage при загрузке страницы
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetTaskId) => {
    e.preventDefault();
    const draggedTaskId = Number(e.dataTransfer.getData("text/plain"));
    if (draggedTaskId === targetTaskId) return;

    const draggedIndex = tasks.findIndex((t) => t.id === draggedTaskId);
    const targetIndex = tasks.findIndex((t) => t.id === targetTaskId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTasks = [...tasks];
    const [removed] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, removed);
    setTasks(newTasks);
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.addTaskContainer}>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          placeholder="Добавить новую задачу"
          className={styles.addTaskInput}
        />
        <button onClick={addTask} className={styles.addTaskButton}>
          <AddIcaon className={styles.todoItemAddIcaon} />
        </button>
      </div>
      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.todoItem} ${task.completed ? styles.completed : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, task.id)}
          >
            <div
              className={styles.todoItemCheckbox}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed && <span>✔</span>}
            </div>
            {/* Теперь кликая на текст, можно завершить задачу */}
            <p 
              className={styles.todoItemText} 
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </p>
            <DragIcon className={styles.todoItemDragIcon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
