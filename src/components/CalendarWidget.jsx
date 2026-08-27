// src/components/CalendarWidget.jsx
import React from 'react';

export const CalendarWidget = () => {
  const today = new Date();
  const monthName = today.toLocaleString('default', { month: 'long' }).toUpperCase();
  const dateNum = today.getDate();
  const dayName = today.toLocaleString('default', { weekday: 'long' }).toUpperCase();

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>CALENDAR</h3>
      <div style={styles.dateBox}>
        <div style={styles.month}>{monthName}</div>
        <div style={styles.date}>{dateNum}</div>
        <div style={styles.day}>{dayName}</div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--card-bg, #f7f3eb)',
    border: '2px solid var(--border-color, #2b2b2b)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
    letterSpacing: '1px',
  },
  dateBox: {
    padding: '12px',
    backgroundColor: '#fff',
    border: '2px solid #2b2b2b',
    borderRadius: '6px',
  },
  month: {
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  date: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },
  day: {
    fontSize: '0.75rem',
    color: '#666',
  },
};

export default CalendarWidget;