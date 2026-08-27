import React from 'react';

export default function Taskbar() {
  return (
    <footer className="retro-taskbar">
      <div className="taskbar-left">
        <button className="taskbar-start-btn">
          <span>★</span> START
        </button>
        <div className="taskbar-item active">StudyFlow</div>
        <div className="taskbar-item">Notes.txt</div>
        <div className="taskbar-item">Focus Mode</div>
      </div>
      <div className="taskbar-right">
        <div className="taskbar-clock">12:00 PM</div>
      </div>
    </footer>
  );
}