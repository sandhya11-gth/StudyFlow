import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function QuestBoard() {
  const { quests, toggleQuest, addQuest, deleteQuest } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [xpVal, setXpVal] = useState('20');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addQuest(title, category, xpVal);
    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="quest-board-window">
      <div className="window-header-bar">
        <span className="window-header-title">TODAY'S STUDY QUESTS</span>
        <button className="pixel-add-btn" onClick={() => setShowAddModal(true)}>
          + ADD QUEST
        </button>
      </div>

      {showAddModal && (
        <form className="add-quest-inline-form" onSubmit={handleCreate}>
          <input
            type="text"
            className="pixel-input"
            placeholder="Quest title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            className="pixel-input short"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            className="pixel-input short"
            placeholder="XP"
            value={xpVal}
            onChange={(e) => setXpVal(e.target.value)}
          />
          <button type="submit" className="pixel-sm-btn confirm">SAVE</button>
          <button type="button" className="pixel-sm-btn cancel" onClick={() => setShowAddModal(false)}>X</button>
        </form>
      )}

      <div className="quest-list-container">
        {quests.map((q) => (
          <div key={q.id} className={`quest-item-row ${q.completed ? 'completed' : ''}`}>
            <label className="quest-checkbox-wrapper">
              <input
                type="checkbox"
                checked={q.completed}
                onChange={() => toggleQuest(q.id)}
              />
              <span className="pixel-checkmark"></span>
            </label>

            <span className="quest-title-text">{q.title}</span>
            <span className="quest-category-badge">{q.category}</span>
            <span className="quest-xp-badge">+{q.xp} XP</span>

            <button
              className="quest-delete-btn"
              onClick={() => deleteQuest(q.id)}
              title="Delete Quest"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}