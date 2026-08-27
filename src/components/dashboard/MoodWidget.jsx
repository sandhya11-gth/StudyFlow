import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

const MOODS = [
  { id: 'happy', label: 'HAPPY', icon: '★' },
  { id: 'focused', label: 'FOCUS', icon: '◆' },
  { id: 'cozy', label: 'COZY', icon: '☕' },
  { id: 'tired', label: 'TIRED', icon: '☁' }
];

export default function MoodWidget() {
  const { mood, setMood } = useApp();

  return (
    <div className="utility-widget-box">
      <div className="widget-header">
        <span>TODAY'S MOOD</span>
      </div>
      <div className="mood-options-grid">
        {MOODS.map((m) => (
          <button
            key={m.id}
            className={`mood-btn ${mood === m.id ? 'active' : ''}`}
            onClick={() => setMood(m.id)}
          >
            <span className="mood-icon">{m.icon}</span>
            <span className="mood-label">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}