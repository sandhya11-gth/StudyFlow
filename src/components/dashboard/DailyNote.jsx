import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function DailyNote() {
  const { dailyNote, setDailyNote } = useApp();

  return (
    <div className="utility-widget-box sticky-note-box">
      <div className="widget-header sticky-header">
        <span>DAILY NOTE</span>
        <span className="tape-sticker">📌</span>
      </div>
      <textarea
        className="sticky-note-input"
        value={dailyNote}
        onChange={(e) => setDailyNote(e.target.value)}
        rows={3}
      />
    </div>
  );
}