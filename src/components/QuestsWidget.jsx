import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const QuestsWidget = () => {
  const { tasks, toggleTask, deleteTask, createTask } = useStudyFlow();
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [priority, setPriority] = useState('MEDIUM');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.dueDate === todayStr);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTask({ title, category, priority, dueDate: todayStr });
    setTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3 pb-1 border-b border-[#34263f]">
          <h2 className="section-heading">TODAY'S STUDY QUESTS</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="font-vt323 text-xs bg-[#34263f] text-white px-2 py-0.5 hover:bg-[#5c436f]"
          >
            {showAddForm ? 'CANCEL' : '+ ADD QUEST'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAdd} className="bg-white border border-[#34263f] p-2 mb-3 space-y-2 font-vt323">
            <input
              type="text"
              placeholder="Quest description..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-[#34263f] p-1 text-sm focus:outline-none"
              autoFocus
            />
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#ecdcf2] border border-[#34263f] text-xs p-1"
              >
                {['DSA', 'DEV', 'C++', 'MATH', 'PROJECT', 'OTHER'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-[#ecdcf2] border border-[#34263f] text-xs p-1"
              >
                <option value="LOW">LOW (+10 XP)</option>
                <option value="MEDIUM">MEDIUM (+20 XP)</option>
                <option value="HIGH">HIGH (+30 XP)</option>
              </select>
              <button type="submit" className="bg-[#34263f] text-white text-xs px-2 py-1 ml-auto">
                SAVE
              </button>
            </div>
          </form>
        )}

        {todayTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-vt323 text-base text-[#645273]">No quests scheduled for today.</p>
            <p className="font-vt323 text-xs text-[#645273] mt-1">Click + ADD QUEST to begin.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayTasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-2 border border-[#34263f] ${
                  task.completed ? 'bg-[#dfd3e6] opacity-75' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 accent-[#34263f] cursor-pointer"
                  />
                  <span className={`font-vt323 text-base text-[#34263f] ${task.completed ? 'line-through text-[#645273]' : ''}`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-vt323 text-xs px-1.5 py-0.5 bg-[#ecdcf2] border border-[#34263f]">
                    [{task.category}]
                  </span>
                  <span className="font-vt323 text-xs px-1.5 py-0.5 bg-[#34263f] text-white">
                    +{task.xpReward} XP
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="font-vt323 text-xs text-[#645273] hover:text-red-600 px-1"
                  >
                    X
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