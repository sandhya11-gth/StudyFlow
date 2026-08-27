import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function FocusTimerWidget() {
  const { completeFocusSession } = useApp();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      completeFocusSession(25);
      alert('★ FOCUS SESSION COMPLETE! +50 XP AWARDED ★');
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, completeFocusSession]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="utility-widget-box">
      <div className="widget-header">
        <span>FOCUS TIMER</span>
        <span className="widget-tag">POMODORO</span>
      </div>

      <div className="timer-display-screen">
        <span className="timer-digits">{timeDisplay}</span>
      </div>

      <div className="timer-controls">
        <button className="pixel-widget-btn primary" onClick={toggleTimer}>
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button className="pixel-widget-btn" onClick={resetTimer}>
          RESET
        </button>
      </div>
    </div>
  );
}