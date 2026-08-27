import React from 'react';

export default function ProfilePreview({ name, username, character }) {
  const displayName = name.trim() ? name.trim() : '-- STUDENT --';
  const displayHandle = username.trim()
    ? `@${username.trim()}`
    : name.trim()
    ? `@${name.trim().toLowerCase().replace(/\s+/g, '')}`
    : '@student';

  return (
    <div className="game-status-panel">
      <div className="status-panel-header">
        <span className="pixel-label-tag">PLAYER 01</span>
        <span className="pixel-status-tag">STATUS: READY</span>
      </div>

      <div className="status-panel-body">
        <div
          className="preview-art-display"
          style={{ backgroundColor: character?.color || '#ffffff' }}
        >
          {character?.svg}
        </div>

        <div className="preview-stats">
          <div className="stat-line">
            <span className="stat-label">NAME:</span>
            <span className="stat-value">{displayName}</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">HANDLE:</span>
            <span className="stat-value">{displayHandle}</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">CLASS:</span>
            <span className="stat-value highlight">
              {character ? character.name : '---'}
            </span>
          </div>
          <div className="stat-line">
            <span className="stat-label">RANK:</span>
            <span className="stat-value">LV.1 NOVICE</span>
          </div>
        </div>
      </div>
    </div>
  );
}