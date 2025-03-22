import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import styles from "./TasksTable.module.scss";

const statusIcons = {
  Approved: <FaCheckCircle color="#05CD99" />,
  Disable: <FaTimesCircle color="#EE5D50" />,
  Error: <FaExclamationTriangle color="#FFCE20" />,
};

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/fakeData.json");
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data = await response.json();
        setTasks(data.tasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleComplete = (taskId) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.tasksTable}>
      {/* 🖥️ Десктопная таблица */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Название</th>
              <th>Прогресс</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <tr key={task.id} className={isCompleted ? styles.completedRow : styles.incompleteRow}>
                  <td>
                    <div
                      className={`${styles.checkbox} ${isCompleted ? styles.checked : ""}`}
                      onClick={() => toggleComplete(task.id)}
                    >
                      {isCompleted && <span className={styles.checkmark}>✔</span>}
                    </div>
                  </td>
                  <td className={styles.taskName}>{task.name}</td>
                  <td>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: `${task.progress}%`, backgroundColor: isCompleted ? "#4318FF" : "#A3AED0" }}
                      />
                    </div>
                  </td>
                  <td>{task.date}</td>
                  <td>{statusIcons[task.status]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 📱 Мобильные карточки */}
      <div className={styles.mobileView}>
        {tasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          return (
            <div key={task.id} className={`${styles.taskCard} ${isCompleted ? styles.completedCard : ""}`}>
              <div className={styles.cardHeader}>
                <div
                  className={`${styles.checkbox} ${isCompleted ? styles.checked : ""}`}
                  onClick={() => toggleComplete(task.id)}
                >
                  {isCompleted && <span className={styles.checkmark}>✔</span>}
                </div>
                <span className={styles.value}>{task.name}</span>
              </div>
              <div className={styles.taskRow}>
                <span className={styles.label}>Дата:</span>
                <span className={styles.value}>{task.date}</span>
              </div>
              <div className={styles.taskRow}>
                <span className={styles.label}>Прогресс:</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${task.progress}%`, backgroundColor: isCompleted ? "#4318FF" : "#A3AED0" }}
                  />
                </div>
              </div>
              <div className={styles.taskRow}>
                <span className={styles.label}>Статус:</span>
                <span className={styles.value}>{statusIcons[task.status]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksTable;
