import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const TasksView = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useStudyFlow();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'COMPLETED'
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Add Form
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, category, priority, dueDate });
    setTitle('');
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'ACTIVE' && t.completed) return false;
    if (filter === 'COMPLETED' && !t.completed) return false;
    if (categoryFilter !== 'ALL' && t.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Controls Header */}
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h1 className="font-press-start text-sm text-[#34263f]">QUEST MANAGER</h1>

        <div className="flex flex-wrap items-center gap-2 font-vt323">
          {/* Status Filters */}
          <div className="flex border border-[#34263f] bg-white">
            {['ALL', 'ACTIVE', 'COMPLETED'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-0.5 text-xs ${filter === f ? 'bg-[#34263f] text-white' : 'text-[#34263f]'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border border-[#34263f] p-1 text-xs bg-white"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="DSA">DSA</option>
            <option value="DEV">DEV</option>
            <option value="C++">C++</option>
            <option value="AI/ML">AI/ML</option>
            <option value="OTHER">OTHER</option>
          </select>

          <button
            onClick={() => setShowForm(!showForm)}
            className="font-vt323 text-xs bg-[#34263f] text-white px-3 py-1"
          >
            {showForm ? 'CANCEL' : '+ CREATE QUEST'}
          </button>
        </div>
      </div>

      {/* Inline Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] space-y-2">
          <input
            type="text"
            placeholder="Quest Title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-[#34263f] p-1.5 text-base font-vt323 focus:outline-none bg-white"
            autoFocus
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-vt323">
            <div>
              <label className="stat-label block mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-[#34263f] p-1 bg-white text-sm"
              >
                <option value="DSA">DSA</option>
                <option value="DEV">DEV</option>
                <option value="C++">C++</option>
                <option value="AI/ML">AI/ML</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
            <div>
              <label className="stat-label block mb-1">PRIORITY / REWARD</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full border border-[#34263f] p-1 bg-white text-sm"
              >
                <option value="LOW">LOW (+10 XP)</option>
                <option value="MEDIUM">MEDIUM (+20 XP)</option>
                <option value="HIGH">HIGH (+30 XP)</option>
              </select>
            </div>
            <div>
              <label className="stat-label block mb-1">DUE DATE</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full border border-[#34263f] p-1 bg-white text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="font-vt323 text-sm bg-[#34263f] text-white px-4 py-1">
              SAVE QUEST
            </button>
          </div>
        </form>
      )}

      {/* Task List Workspace */}
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-press-start text-xs text-[#34263f] mb-2">NO QUESTS FOUND</p>
            <p className="font-vt323 text-base text-[#645273]">
              Create your first study quest to begin gaining XP.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map(t => (
              <div
                key={t.id}
                className={`p-2.5 border border-[#34263f] flex items-center justify-between ${
                  t.completed ? 'bg-[#dfd3e6] opacity-80' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="w-4 h-4 accent-[#34263f] cursor-pointer"
                  />
                  <div>
                    <span className={`font-vt323 text-lg text-[#34263f] block ${t.completed ? 'line-through text-[#645273]' : ''}`}>
                      {t.title}
                    </span>
                    <span className="font-vt323 text-xs text-[#645273]">
                      Due: {t.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-vt323 text-xs px-2 py-0.5 bg-[#ecdcf2] border border-[#34263f]">
                    [{t.category}]
                  </span>
                  <span className="font-vt323 text-xs px-2 py-0.5 bg-[#34263f] text-white">
                    +{t.xpReward} XP
                  </span>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="font-vt323 text-xs text-[#645273] hover:text-red-600 px-2"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};