import React from 'react';

export default function TopBar() {
  return (
    <div className="retro-top-bar">
      <div className="retro-top-brand">
        <div className="retro-pixel-icon" />
        <span className="retro-top-title">StudyFlow.exe</span>
      </div>
      <div className="retro-window-controls">
        <button className="retro-control-btn" aria-label="Minimize">_</button>
        <button className="retro-control-btn" aria-label="Maximize">□</button>
        <button className="retro-control-btn close" aria-label="Close">×</button>
      </div>
    </div>
  );
}