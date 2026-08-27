import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function UpcomingWidget() {
  const { upcoming } = useApp();

  return (
    <div className="utility-widget-box">
      <div className="widget-header">
        <span>UPCOMING</span>
      </div>
      <div className="upcoming-list">
        {upcoming.map((evt) => (
          <div key={evt.id} className="upcoming-item-row">
            <span className="evt-title">{evt.title}</span>
            <span className="evt-date-badge">{evt.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}