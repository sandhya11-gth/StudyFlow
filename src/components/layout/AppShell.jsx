import React from 'react';
import TopBar from './TopBar.jsx';
import MenuBar from './MenuBar.jsx';
import DesktopWorkspace from './DesktopWorkspace.jsx';
import Taskbar from './Taskbar.jsx';
import './AppShell.css';

export default function AppShell({ children }) {
  return (
    <div className="retro-desktop-wrapper">
      <div className="retro-app-frame">
        <TopBar />
        <MenuBar />
        <DesktopWorkspace>
          {children}
        </DesktopWorkspace>
        <Taskbar />
      </div>
    </div>
  );
}