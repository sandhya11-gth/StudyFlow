import React from 'react';

export default function DesktopWorkspace({ children }) {
  return (
    <main className="retro-workspace">
      <div className="workspace-tape-note">
        <div className="workspace-tape" />
        <span>SYSTEM :: READY</span>
      </div>
      {children}
    </main>
  );
}