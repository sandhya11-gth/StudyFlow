import React, { useState, useEffect } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

const MODES = {
  FOCUS: { label: 'FOCUS', time: 25 * 60, icon: '⏱️', xp: 25 },
  SHORT_BREAK: { label: 'SHORT BREAK', time: 5 * 60, icon: '☕', xp: 0 },
  LONG_BREAK: { label: 'LONG BREAK', time: 15 * 60, icon: '🌸', xp: 0 },
};

export default function Timer() {
  const { setXp, setStudySessions } = useStudyFlow();
  const [modeKey, setModeKey] = useState('FOCUS');
  const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.time);
  const [isRunning, setIsRunning] = useState(false);
  const [topic, setTopic] = useState('DSA & React Practice');

  const currentMode = MODES[modeKey];

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);

      // Award XP & add session when a focus session finishes
      if (modeKey === 'FOCUS') {
        setXp((prev) => prev + currentMode.xp);
        
        const newSession = {
          id: Date.now(),
          date: 'TODAY',
          subject: 'FOCUS',
          topic: topic || 'General Study',
          minutes: 25,
          icon: '📚',
        };
        
        setStudySessions((prev) => [newSession, ...prev]);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, modeKey, topic, setXp, setStudySessions, currentMode.xp]);

  const handleModeChange = (key) => {
    setModeKey(key);
    setTimeLeft(MODES[key].time);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentMode.time - timeLeft) / currentMode.time) * 100)
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Mode Selectors */}
      <div className="flex items-center justify-center gap-2 bg-white border-2 border-pastel-purple p-2 rounded-lg shadow-[4px_4px_0px_0px_#70536d]">
        {Object.keys(MODES).map((key) => {
          const m = MODES[key];
          const isActive = modeKey === key;
          return (
            <button
              key={key}
              onClick={() => handleModeChange(key)}
              className={`px-3 py-1.5 font-pixel text-xs font-bold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-pastel-pink border-2 border-pastel-purple text-pastel-purple shadow-[2px_2px_0px_0px_#70536d]'
                  : 'bg-pastel-cream border border-pastel-purple/30 text-pastel-subtext hover:bg-white'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Clock Card */}
      <div className="bg-white border-3 border-pastel-purple p-6 sm:p-10 rounded-xl shadow-[6px_6px_0px_0px_#70536d] text-center relative overflow-hidden flex flex-col items-center">
        <span className="font-pixel text-xs text-pastel-purple mb-2 block tracking-widest uppercase">
          {currentMode.label} SESSION
        </span>

        {/* Big Pixel Digital Display */}
        <div className="font-pixel text-5xl sm:text-7xl font-bold text-pastel-purple my-4 tracking-wider select-none">
          {formatTime(timeLeft)}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-3 bg-pastel-cream border-2 border-pastel-purple rounded-full overflow-hidden my-4 relative">
          <div
            className="h-full bg-pastel-pink transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Focus Topic Input */}
        <div className="w-full max-w-md my-3">
          <label className="block font-pixel text-[10px] text-pastel-subtext mb-1 text-left">
            CURRENT STUDY TOPIC
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What are you working on?"
            className="w-full bg-pastel-cream/50 border-2 border-pastel-purple px-3 py-1.5 font-body text-xs text-pastel-text rounded focus:outline-none focus:bg-white"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className={`px-6 py-2.5 font-pixel text-sm font-bold border-2 border-pastel-purple rounded shadow-[3px_3px_0px_0px_#70536d] transition-all cursor-pointer ${
              isRunning
                ? 'bg-pastel-yellow text-pastel-purple hover:bg-white'
                : 'bg-pastel-pink text-pastel-purple hover:bg-white'
            }`}
          >
            {isRunning ? '⏸ PAUSE' : '▶ START FOCUS'}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-white border-2 border-pastel-purple font-pixel text-sm font-bold text-pastel-purple rounded shadow-[3px_3px_0px_0px_#70536d] hover:bg-pastel-cream transition-all cursor-pointer"
          >
            ↺ RESET
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-pastel-cream/90 border-2 border-pastel-purple p-4 rounded-lg shadow-[3px_3px_0px_0px_#70536d] text-center">
        <span className="font-pixel text-xs text-pastel-purple">
          ✨ Complete a 25-minute focus session to earn +25 XP and log a study session!
        </span>
      </div>
    </div>
  );
}