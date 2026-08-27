import React from 'react';

export default function MenuBar() {
  const menuItems = ['FILE', 'EDIT', 'VIEW', 'TOOLS', 'FOCUS', 'HELP'];

  return (
    <div className="retro-menu-bar">
      {menuItems.map((item) => (
        <span key={item} className="retro-menu-item">
          {item}
        </span>
      ))}
    </div>
  );
}