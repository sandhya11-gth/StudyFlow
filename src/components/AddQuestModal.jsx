import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const AddQuestModal = ({ isOpen, onClose }) => {
  const { createTask } = useStudyFlow();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('DSA');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTask({ title, description, category, priority, dueDate });
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[380px] bg-[#dfd3e6] border-2 border-[#22162b] shadow-[4px_4px_0px_#22162b] p-3">
        <div className="bg-[#34263f] px-2 py-1 flex justify-between items-center mb-3">
          <span className="window-title">+ CREATE QUEST</span>
          <button onClick={onClose} className="text-white font-vt323 px-1 text-sm bg-[#5c436f]">X</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-vt323 text-[#34263f]">
          <div>
            <label className="block text-xs font-bold mb-1">QUEST NAME</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#34263f] p-1 text-sm focus:outline-none"
              placeholder="e.g. Solve 2 Array Problems"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">CATEGORY</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-[#34263f] p-1 text-sm focus:outline-none"
            >
              {['DSA', 'WEB DEV', 'C++', 'COLLEGE', 'PROJECT', 'PERSONAL', 'OTHER'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-bold mb-1">PRIORITY</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-white border border-[#34263f] p-1 text-sm focus:outline-none"
              >
                <option value="LOW">LOW (+10 XP)</option>
                <option value="MEDIUM">MEDIUM (+20 XP)</option>
                <option value="HIGH">HIGH (+30 XP)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold mb-1">DUE DATE</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white border border-[#34263f] p-1 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-[#cbb4d8] border border-[#34263f] text-xs font-bold hover:bg-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#34263f] text-white border border-[#22162b] text-xs font-bold hover:bg-[#5c436f]"
            >
              CREATE QUEST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};