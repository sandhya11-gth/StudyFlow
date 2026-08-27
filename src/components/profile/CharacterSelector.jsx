import React from 'react';

// Character lineup options with detailed pixel character artwork
export const CHARACTER_OPTIONS = [
  {
    id: 'pixel',
    name: 'PIXEL',
    role: 'Coder / Focus',
    color: '#f8c8dc',
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hair / Headband */}
        <rect x="7" y="1" width="10" height="3" fill="#2d2238" />
        <rect x="5" y="3" width="14" height="4" fill="#2d2238" />
        <rect x="4" y="5" width="2" height="6" fill="#2d2238" />
        <rect x="18" y="5" width="2" height="6" fill="#2d2238" />
        {/* Face / Skin */}
        <rect x="6" y="7" width="12" height="8" fill="#fceecb" />
        {/* Glasses & Eyes */}
        <rect x="6" y="8" width="5" height="4" fill="#2d2238" />
        <rect x="13" y="8" width="5" height="4" fill="#2d2238" />
        <rect x="7" y="9" width="3" height="2" fill="#71ebe1" />
        <rect x="14" y="9" width="3" height="2" fill="#71ebe1" />
        <rect x="11" y="9" width="2" height="1" fill="#2d2238" />
        {/* Blush & Mouth */}
        <rect x="6" y="12" width="2" height="1" fill="#f8c8dc" />
        <rect x="16" y="12" width="2" height="1" fill="#f8c8dc" />
        <rect x="11" y="13" width="2" height="1" fill="#d880a1" />
        {/* Body / Oversized Sweater */}
        <rect x="5" y="15" width="14" height="9" fill="#9d8abf" />
        <rect x="9" y="15" width="6" height="9" fill="#f8c8dc" />
        {/* Sleeves / Hands */}
        <rect x="3" y="16" width="2" height="8" fill="#9d8abf" />
        <rect x="19" y="16" width="2" height="8" fill="#9d8abf" />
        <rect x="3" y="24" width="2" height="2" fill="#fceecb" />
        <rect x="19" y="24" width="2" height="2" fill="#fceecb" />
        {/* Pants */}
        <rect x="7" y="24" width="4" height="4" fill="#2d2238" />
        <rect x="13" y="24" width="4" height="4" fill="#2d2238" />
      </svg>
    )
  },
  {
    id: 'nova',
    name: 'NOVA',
    role: 'Star Reader',
    color: '#dcd3f2',
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Purple Wavy Hair */}
        <rect x="6" y="1" width="12" height="4" fill="#583c70" />
        <rect x="4" y="3" width="16" height="6" fill="#583c70" />
        <rect x="3" y="7" width="3" height="12" fill="#583c70" />
        <rect x="18" y="7" width="3" height="12" fill="#583c70" />
        {/* Face */}
        <rect x="6" y="7" width="12" height="8" fill="#fff3d6" />
        {/* Sparkle Eyes */}
        <rect x="7" y="9" width="3" height="3" fill="#2d2238" />
        <rect x="14" y="9" width="3" height="3" fill="#2d2238" />
        <rect x="7" y="9" width="1" height="1" fill="#ffffff" />
        <rect x="14" y="9" width="1" height="1" fill="#ffffff" />
        {/* Cute Smile */}
        <rect x="11" y="12" width="2" height="1" fill="#583c70" />
        {/* Celestial Robe */}
        <rect x="5" y="15" width="14" height="10" fill="#dcd3f2" />
        <rect x="10" y="15" width="4" height="10" fill="#fceecb" />
        <rect x="11" y="18" width="2" height="2" fill="#2d2238" />
        {/* Shoes */}
        <rect x="7" y="25" width="4" height="3" fill="#583c70" />
        <rect x="13" y="25" width="4" height="3" fill="#583c70" />
      </svg>
    )
  },
  {
    id: 'milo',
    name: 'MILO',
    role: 'Cozy Gamer',
    color: '#cbe3db',
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Beanie Hat */}
        <rect x="7" y="1" width="10" height="2" fill="#d880a1" />
        <rect x="5" y="3" width="14" height="4" fill="#cbe3db" />
        {/* Headphones */}
        <rect x="3" y="6" width="3" height="7" fill="#2d2238" />
        <rect x="18" y="6" width="3" height="7" fill="#2d2238" />
        <rect x="6" y="4" width="12" height="2" fill="#2d2238" />
        {/* Face */}
        <rect x="6" y="7" width="12" height="8" fill="#fceecb" />
        {/* Eyes */}
        <rect x="8" y="9" width="2" height="2" fill="#2d2238" />
        <rect x="14" y="9" width="2" height="2" fill="#2d2238" />
        {/* Freckles & Smirk */}
        <rect x="7" y="11" width="2" height="1" fill="#d880a1" />
        <rect x="15" y="11" width="2" height="1" fill="#d880a1" />
        <rect x="11" y="12" width="3" height="1" fill="#2d2238" />
        {/* Hoodie */}
        <rect x="5" y="15" width="14" height="10" fill="#4a3b5c" />
        <rect x="9" y="15" width="6" height="6" fill="#fceecb" />
        {/* Pants */}
        <rect x="7" y="25" width="4" height="3" fill="#2d2238" />
        <rect x="13" y="25" width="4" height="3" fill="#2d2238" />
      </svg>
    )
  },
  {
    id: 'luna',
    name: 'LUNA',
    role: 'Night Owl',
    color: '#fceecb',
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Long Dark Hair */}
        <rect x="5" y="1" width="14" height="4" fill="#2d2238" />
        <rect x="3" y="3" width="18" height="6" fill="#2d2238" />
        <rect x="3" y="9" width="3" height="13" fill="#2d2238" />
        <rect x="18" y="9" width="3" height="13" fill="#2d2238" />
        {/* Face */}
        <rect x="6" y="7" width="12" height="8" fill="#fceecb" />
        {/* Eyes */}
        <rect x="7" y="9" width="3" height="2" fill="#2d2238" />
        <rect x="14" y="9" width="3" height="2" fill="#2d2238" />
        <rect x="8" y="9" width="1" height="1" fill="#ffffff" />
        <rect x="15" y="9" width="1" height="1" fill="#ffffff" />
        {/* Blush */}
        <rect x="6" y="11" width="2" height="1" fill="#e8a8c0" />
        <rect x="16" y="11" width="2" height="1" fill="#e8a8c0" />
        <rect x="11" y="12" width="2" height="1" fill="#2d2238" />
        {/* Sweater & Scarf */}
        <rect x="5" y="15" width="14" height="10" fill="#e8a8c0" />
        <rect x="7" y="15" width="10" height="3" fill="#2d2238" />
        {/* Boots */}
        <rect x="7" y="25" width="4" height="3" fill="#2d2238" />
        <rect x="13" y="25" width="4" height="3" fill="#2d2238" />
      </svg>
    )
  }
];

export default function CharacterSelector({ selectedCharacter, onSelect }) {
  return (
    <div className="character-selection-section">
      <div className="section-title-wrapper">
        <span className="star-deco">★</span>
        <label className="game-section-heading">CHOOSE YOUR CHARACTER</label>
        <span className="star-deco">★</span>
      </div>

      <div className="character-lineup">
        {CHARACTER_OPTIONS.map((char) => {
          const isSelected = selectedCharacter?.id === char.id;
          return (
            <div
              key={char.id}
              className={`character-card-game ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(char)}
            >
              {isSelected && <div className="selected-badge">SELECTED</div>}
              
              <div
                className="character-art-box"
                style={{ backgroundColor: char.color }}
              >
                {char.svg}
              </div>

              <div className="character-meta">
                <span className="character-game-name">{char.name}</span>
                <span className="character-game-tag">{char.role}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}