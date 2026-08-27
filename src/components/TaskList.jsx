// src/components/TaskList.jsx
import React, { useState } from 'react';

export const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Chapter 4 Review', completed: false, xp: 50 },
    { id: 2, title: 'Practice 5 Coding Exercises', completed: true, xp: 30 },
    { id: 3, title: 'Read Research Paper Notes', completed: false, xp: 40 },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTaskTitle, completed: false, xp: 25 }]);
    setNewTaskTitle('');
  };

  return (
    <div className="task-list-card" style={styles.card}>
      <form onSubmit={addTask} style={styles.form}>
        <input
          type="text"
          placeholder="+ Add a new study quest..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>ADD</button>
      </form>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.item} onClick={() => toggleTask(task.id)}>
            <span style={task.completed ? styles.checkboxDone : styles.checkbox}>
              {task.completed ? '✓' : ''}
            </span>
            <span style={task.completed ? styles.textDone : styles.text}>
              {task.title}
            </span>
            <span style={styles.xpBadge}>+{task.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--card-bg, #f7f3eb)',
    border: '2px solid var(--border-color, #2b2b2b)',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    border: '2px solid var(--border-color, #2b2b2b)',
    borderRadius: '6px',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    outline: 'none',
  },
  addBtn: {
    padding: '8px 16px',
    backgroundColor: '#2b2b2b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: '#fff',
    border: '2px solid var(--border-color, #2b2b2b)',
    borderRadius: '6px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    border: '2px solid #2b2b2b',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    width: '18px',
    height: '18px',
    backgroundColor: '#2b2b2b',
    color: '#fff',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
  },
  text: {
    flex: 1,
    fontSize: '0.9rem',
    color: '#2b2b2b',
  },
  textDone: {
    flex: 1,
    fontSize: '0.9rem',
    color: '#888',
    textDecoration: 'line-through',
  },
  xpBadge: {
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    backgroundColor: '#eee7d7',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid #2b2b2b',
  },
};

export default TaskList;