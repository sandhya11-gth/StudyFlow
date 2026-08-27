import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function StatsHUD() {
  const { studyMinutes, completedSessions, streakDays, xp, level } = useApp();

  const hours = Math.floor(studyMinutes / 60);
  const mins = studyMinutes % 60;
  const timeFormatted = `${hours}h ${mins}m`;

  return (
    <div className="stats-hud-container">
      {/* Study Time Panel */}
      <div className="hud-card hud-pink">
        <span className="hud-label">STUDY TIME</span>
        <span className="hud-value">{timeFormatted}</span>
        <span className="hud-sub">this week</span>
      </div>

      {/* Sessions Panel */}
      <div className="hud-card hud-lavender">
        <span className="hud-label">SESSIONS</span>
        <span className="hud-value">{completedSessions}</span>
        <span className="hud-sub">completed</span>
      </div>

      {/* Streak Panel */}
      <div className="hud-card hud-yellow">
        <span className="hud-label">STREAK</span>
        <span className="hud-value">{streakDays} days</span>
        <span className="hud-sub">keep it up!</span>
      </div>

      {/* Level & XP Progress Panel */}
      <div className="hud-card hud-green">
        <div className="hud-header-split">
          <span className="hud-label">LEVEL {level}</span>
          <span className="hud-sub-xp">{xp} / 1000 XP</span>
        </div>
        <div className="pixel-xp-bar-container">
          <div
            className="pixel-xp-bar-fill"
            style={{ width: `${Math.min(100, (xp / 1000) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}