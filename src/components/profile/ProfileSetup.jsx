import React, { useState } from 'react';
import CharacterSelector, { CHARACTER_OPTIONS } from './CharacterSelector.jsx';
import ProfilePreview from './ProfilePreview.jsx';
import './ProfileSetup.css';

export default function ProfileSetup({ onComplete }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTER_OPTIONS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('> ENTER YOUR NAME FIRST.');
      return;
    }

    if (!selectedCharacter) {
      setErrorMsg('> SELECT A CHARACTER FIRST.');
      return;
    }

    setErrorMsg('');

    const profileData = {
      name: name.trim(),
      username: username.trim() || name.trim().toLowerCase().replace(/\s+/g, ''),
      character: {
        id: selectedCharacter.id,
        name: selectedCharacter.name,
        role: selectedCharacter.role,
        color: selectedCharacter.color
      }
    };

    localStorage.setItem('studyflow_profile', JSON.stringify(profileData));
    onComplete(profileData);
  };

  return (
    <div className="profile-game-window">
      <div className="game-window-top">
        <span className="top-decor">◆ CHARACTER CREATION ◆</span>
        <h2 className="game-title">CREATE YOUR PLAYER PROFILE</h2>
        <p className="game-subtitle">Select your character and enter your player details.</p>
      </div>

      <form className="game-window-body" onSubmit={handleSubmit}>
        <CharacterSelector
          selectedCharacter={selectedCharacter}
          onSelect={setSelectedCharacter}
        />

        <div className="game-middle-split">
          <div className="game-inputs-container">
            <div className="section-title-wrapper align-left">
              <label className="game-section-heading">PLAYER DETAILS</label>
            </div>

            <div className="game-form-group">
              <label htmlFor="player-name">PLAYER NAME *</label>
              <input
                id="player-name"
                type="text"
                className="retro-game-input"
                placeholder="Enter name..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                maxLength={20}
              />
            </div>

            <div className="game-form-group">
              <label htmlFor="player-username">USERNAME (OPTIONAL)</label>
              <input
                id="player-username"
                type="text"
                className="retro-game-input"
                placeholder="Enter handle..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
              />
            </div>
          </div>

          <ProfilePreview
            name={name}
            username={username}
            character={selectedCharacter}
          />
        </div>

        {errorMsg && <div className="retro-game-error">{errorMsg}</div>}

        <button type="submit" className="start-game-btn">
          ★ START STUDYFLOW ★
        </button>
      </form>
    </div>
  );
}