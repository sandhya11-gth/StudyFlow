import React, { useState } from 'react';

export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const monthName = date.toLocaleString('default', { month: 'short' }).toUpperCase();

  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, date.getMonth(), 1).getDay();

  const prevMonth = () => setDate(new Date(year, date.getMonth() - 1, 1));
  const nextMonth = () => setDate(new Date(year, date.getMonth() + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === date.getMonth();

  return (
    <div className="utility-widget-box">
      <div className="widget-header">
        <button className="cal-nav-btn" onClick={prevMonth}>◄</button>
        <span>{monthName} {year}</span>
        <button className="cal-nav-btn" onClick={nextMonth}>►</button>
      </div>

      <div className="mini-calendar-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
          <span key={idx} className="cal-day-header">{d}</span>
        ))}
        {days.map((d, idx) => (
          <span
            key={idx}
            className={`cal-day-cell ${d === today && isCurrentMonth ? 'today' : ''} ${!d ? 'empty' : ''}`}
          >
            {d || ''}
          </span>
        ))}
      </div>
    </div>
  );
}