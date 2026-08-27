// src/components/FocusTimer.jsx
import React, { useState, useEffect } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const FocusTimer = () => {
  const { isTimerRunning, setIsTimerRunning } = useStudyFlow();
  const [seconds, setSeconds] = useState(25 * 60);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, seconds, setIsTimerRunning]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(25 * 60);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>FOCUS TIMER</h3>
      <div style={styles.timerDisplay}>{formatTime(seconds)}</div>
      <div style={styles.btnRow}>
        <button onClick={toggleTimer} style={styles.mainBtn}>
          {isTimerRunning ? 'PAUSE' : 'START'}
        </button>
        <button onClick={resetTimer} style={styles.subBtn}>RESET</button>
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
    marginBottom: '16px',
    boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
    letterSpacing: '1px',
  },
  timerDisplay: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    margin: '12px 0',
  },
  btnRow: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  mainBtn: {
    padding: '8px 16px',
    backgroundColor: '#2b2b2b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  subBtn: {
    padding: '8px 12px',
    backgroundColor: '#fff',
    color: '#2b2b2b',
    border: '2px solid #2b2b2b',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default FocusTimer;