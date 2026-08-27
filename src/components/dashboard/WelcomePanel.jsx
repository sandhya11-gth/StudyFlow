import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { CHARACTER_OPTIONS } from '../profile/CharacterSelector.jsx';

export default function WelcomePanel() {
  const { profile } = useApp();

  const charData = CHARACTER_OPTIONS.find(c => c.id === profile?.character?.id) || CHARACTER_OPTIONS[0];

  return (
    <div className="welcome-banner-pixel">
      <div className="welcome-avatar-mini" style={{ backgroundColor: charData.color }}>
        {charData.svg}
      </div>
      <div className="welcome-text-box">
        <h1 className="welcome-heading">
          GOOD EVENING, {profile?.name ? profile.name.toUpperCase() : 'STUDENT'}!
        </h1>
        <p className="welcome-subtext">
          One small step each day becomes a long journey.
        </p>
      </div>
    </div>
  );
}