import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

const NAV_ITEMS = [
  { id: 'HOME', label: 'HOME', icon: '◆' },
  { id: 'CALENDAR', label: 'CALENDAR', icon: '📅' },
  { id: 'TASKS', label: 'TASKS', icon: '✔' },
  { id: 'SESSIONS', label: 'SESSIONS', icon: '⏱' },
  { id: 'FOCUS', label: 'FOCUS', icon: '⚡' },
  { id: 'STATS', label: 'STATS', icon: '📊' },
  { id: 'NOTES', label: 'NOTES', icon: '📝' }
];

export default function LeftNav() {
  const { activeTab, setActiveTab, logout } = useApp();

  return (
    <div className="left-nav-panel">
      <div className="nav-header">
        <span className="nav-title-icon">👾</span>
        <span className="nav-title-text">MENU</span>
      </div>

      <div className="nav-items-list">
        {NAV_ITEMS.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`pixel-nav-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-item-symbol">{item.icon}</span>
              <span className="nav-item-label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-footer">
        <button className="pixel-logout-btn" onClick={logout}>
          [ EXIT ]
        </button>
      </div>
    </div>
  );
}