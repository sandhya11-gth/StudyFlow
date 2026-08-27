import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export default function Tasks({ activeFilter = 'All' }) {
  const { tasks = [], setTasks, setXp } = useStudyFlow();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('DSA');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [floatingXp, setFloatingXp] = useState(null);

  const handleToggleTask = (id, currentCompleted) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !currentCompleted } : t))
    );

    if (!currentCompleted) {
      setXp((prev) => prev + 10);
      setFloatingXp({ id, text: '✦ +10 XP' });
      setTimeout(() => setFloatingXp(null), 900);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      priority: newTaskPriority,
      completed: false,
      dueDate: 'Today',
    };

    setTasks((prev) => [task, ...prev]);
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'Due Today') return t.dueDate === 'Today';
    if (activeFilter === 'High Priority') return t.priority === 'High';
    return true;
  });

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="bg-white border-2 border-pastel-purple p-4 rounded-lg shadow-[4px_4px_0px_0px_#70536d] paper-hover-lift flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-lg font-bold text-pastel-purple flex items-center gap-2">
            <span>📋</span> QUEST LOG & TASKS
          </h2>
          <p className="font-body text-xs text-pastel-text mt-0.5">
            Complete quests to earn XP and level up your study streak!
          </p>
        </div>
        <span className="font-pixel text-xs bg-pastel-pink border border-pastel-purple px-2.5 py-1 rounded shadow-[2px_2px_0px_0px_#70536d]">
          FILTER: {activeFilter.toUpperCase()}
        </span>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="bg-white border-2 border-pastel-purple p-4 rounded-lg shadow-[4px_4px_0px_0px_#70536d] flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New study task title..."
          className="flex-1 bg-pastel-cream/50 border-2 border-pastel-purple px-3 py-1.5 font-body text-xs text-pastel-text rounded focus:outline-none focus:bg-white"
        />
        <select
          value={newTaskSubject}
          onChange={(e) => setNewTaskSubject(e.target.value)}
          className="bg-pastel-cream border-2 border-pastel-purple px-2 py-1.5 font-pixel text-xs text-pastel-purple rounded focus:outline-none cursor-pointer"
        >
          <option value="DSA">DSA</option>
          <option value="React">React</option>
          <option value="Math">Math</option>
          <option value="General">General</option>
        </select>
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="bg-pastel-cream border-2 border-pastel-purple px-2 py-1.5 font-pixel text-xs text-pastel-purple rounded focus:outline-none cursor-pointer"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High Priority</option>
        </select>
        <button
          type="submit"
          className="px-4 py-1.5 bg-pastel-pink border-2 border-pastel-purple font-pixel text-xs font-bold text-pastel-purple rounded btn-tactile cursor-pointer"
        >
          + ADD
        </button>
      </form>

      {/* Quest List */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white border-2 border-pastel-purple p-3.5 rounded-lg shadow-[3px_3px_0px_0px_#70536d] paper-hover-lift relative flex items-center justify-between transition-all ${
              task.completed ? 'bg-pastel-cream/60 opacity-80' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Checkbox with Tactile Animation */}
              <button
                onClick={() => handleToggleTask(task.id, task.completed)}
                className={`w-5 h-5 border-2 border-pastel-purple rounded flex items-center justify-center transition-all cursor-pointer ${
                  task.completed ? 'bg-pastel-pink text-pastel-purple scale-105' : 'bg-white hover:bg-pastel-cream'
                }`}
              >
                {task.completed && <span className="font-pixel text-xs font-bold">✓</span>}
              </button>

              <div className="relative">
                <p
                  className={`font-body text-xs font-medium text-pastel-purple transition-all ${
                    task.completed ? 'line-through text-pastel-subtext' : ''
                  }`}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-pixel text-[9px] bg-pastel-yellow/70 border border-pastel-purple/30 px-1.5 py-0.5 rounded">
                    {task.subject}
                  </span>
                  <span className="font-pixel text-[9px] text-pastel-subtext">
                    Priority: {task.priority}
                  </span>
                </div>

                {/* Floating XP Toast */}
                {floatingXp && floatingXp.id === task.id && (
                  <span className="absolute -top-4 left-0 font-pixel text-xs text-pastel-purple font-bold animate-xp-float pointer-events-none">
                    {floatingXp.text}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
              className="text-pastel-subtext hover:text-pastel-peach font-pixel text-xs px-2 py-1 rounded hover:bg-pastel-cream transition-colors cursor-pointer"
              title="Delete task"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Charming Empty State */}
        {filteredTasks.length === 0 && (
          <div className="bg-white/80 border-2 border-dashed border-pastel-purple/40 p-8 rounded-lg text-center space-y-2">
            <span className="text-3xl block animate-float">🌱</span>
            <p className="font-pixel text-xs text-pastel-purple font-bold">No quests yet.</p>
            <p className="font-body text-xs text-pastel-subtext">Add something small to get started ♡</p>
          </div>
        )}
      </div>
    </div>
  );
}