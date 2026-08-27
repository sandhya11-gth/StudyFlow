// src/components/dashboard/StudyWorld.tsx
import React from 'react';
import { useStudyFlow } from '../../context/StudyFlowContext';
import { CHARACTER_SPRITES } from '../../utils/characterAssets';

export const StudyWorld: React.FC = () => {
  const { profile, isTimerRunning, xp, currentStreak } = useStudyFlow();

  const rawKey = (profile?.character || 'PIXEL').toUpperCase().replace(/[^A-Z0-9_]/g, '');
  const spriteSet =
    CHARACTER_SPRITES[rawKey] ||
    CHARACTER_SPRITES.PIXEL ||
    CHARACTER_SPRITES.PIXEL_CAT ||
    Object.values(CHARACTER_SPRITES)[0];

  const activeSprite = isTimerRunning ? spriteSet.studying : spriteSet.idle;

  return (
    <div className="study-world-panel">
      <div className="study-world-header">
        <span className="world-title-text">MY STUDY WORLD</span>
        <span className="world-status-tag">
          {isTimerRunning ? '● SESSION ACTIVE' : '○ IDLE'}
        </span>
      </div>

      <div className="study-world-stage">
        <div className="pixel-decor decor-window" />
        <div className="pixel-decor decor-bookshelf" />

        <div className={`character-wrapper ${isTimerRunning ? 'studying' : 'idle'}`}>
          {activeSprite ? (
            <img
              src={activeSprite}
              alt={profile?.character || 'CHARACTER'}
              className="large-character-sprite"
              onError={(e) => {
                const fallback = CHARACTER_SPRITES.PIXEL?.idle || Object.values(CHARACTER_SPRITES)[0]?.idle;
                if (fallback && (e.target as HTMLImageElement).src !== fallback) {
                  (e.target as HTMLImageElement).src = fallback;
                }
              }}
            />
          ) : (
            <div className="character-placeholder-box">PIXEL</div>
          )}
        </div>

        <div className="pixel-decor decor-desk" />
      </div>

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