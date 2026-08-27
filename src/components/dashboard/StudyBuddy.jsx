// src/components/dashboard/StudyWorld.jsx
import React from 'react';
import { useStudyFlow } from '../../context/StudyFlowContext';
import { getCharacterSprite } from '../../utils/characterAssets';
import './StudyWorld.css';

export const StudyWorld = () => {
  const { profile, isTimerRunning, xp, currentStreak } = useStudyFlow();

  const characterName = profile?.character || 'PIXEL';
  const currentState = isTimerRunning ? 'studying' : 'idle';
  const characterImage = getCharacterSprite(characterName, currentState);

  return (
    <div className="study-world-panel">
      {/* Top Title Banner */}
      <div className="study-world-header">
        <span className="world-title-text">MY STUDY WORLD</span>
        <span className="world-status-tag">
          {isTimerRunning ? '● SESSION ACTIVE' : '○ IDLE'}
        </span>
      </div>

      {/* Main Pixel Canvas Area */}
      <div className="study-world-stage">
        {/* Decor Items */}
        <div className="pixel-decor decor-window" />
        <div className="pixel-decor decor-bookshelf" />

        {/* Large Character Sprite Container */}
        <div className={`character-wrapper ${currentState}`}>
          <img
            src={characterImage}
            alt={characterName}
            className="large-character-sprite"
            onError={(e) => {
              // Guarantee no broken image symbol renders in browser
              e.target.src = getCharacterSprite('PIXEL', 'idle');
            }}
          />
        </div>

        {/* Desk Workspace */}
        <div className="pixel-decor decor-desk" />
      </div>

      {/* Compact Bottom Game Stats HUD */}
      <div className="study-world-hud">
        <div className="hud-item">
          <span className="hud-label">PLAYER</span>
          <span className="hud-val">{profile?.name || 'STUDENT'}</span>
        </div>
        <div className="hud-sep" />
        <div className="hud-item">
          <span className="hud-label">LV</span>
          <span className="hud-val">{profile?.level || 1}</span>
        </div>
        <div className="hud-sep" />
        <div className="hud-item">
          <span className="hud-label">XP</span>
          <span className="hud-val">{xp || 0}</span>
        </div>
        <div className="hud-sep" />
        <div className="hud-item">
          <span className="hud-label">STREAK</span>
          <span className="hud-val">{currentStreak || 0} DAYS</span>
        </div>
      </div>
    </div>
  );
};

export default StudyWorld;