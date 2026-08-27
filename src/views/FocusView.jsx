import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const FocusView = () => {
  const {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimerSubject,
    timerSettings,
    updateTimerSettings
  } = useStudyFlow();

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleModeChange = (mode) => {
    resetTimer(mode);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-4 shadow-[4px_4px_0px_#22162b]">
        <h1 className="font-press-start text-base text-[#34263f] text-center mb-4">
          FOCUS WORKSPACE
        </h1>

        {/* Mode Selector */}
        <div className="flex justify-center gap-2 mb-4 font-press-start text-[11px]">
          {['POMODORO', 'SHORT', 'LONG'].map(m => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-3 py-1.5 border border-[#34263f] ${
                timerState.mode === m ? 'bg-[#34263f] text-white' : 'bg-white text-[#34263f]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Big Display */}
        <div className="bg-white border-2 border-[#34263f] py-8 text-center my-2 shadow-inner">
          <span className="font-vt323 text-7xl font-bold text-[#34263f] tracking-widest block">
            {formatTime(timerState.timeLeft)}
          </span>
          <span className="font-press-start text-xs text-[#645273] mt-2 block">
            MODE: {timerState.mode}
          </span>
        </div>

        {/* Subject Picker */}
        <div className="my-4 font-vt323">
          <label className="stat-label block mb-1">CURRENT STUDY SUBJECT</label>
          <input
            type="text"
            value={timerState.subject}
            onChange={e => updateTimerSubject(e.target.value)}
            placeholder="e.g. Data Structures & Algorithms"
            className="w-full border border-[#34263f] p-2 bg-white text-base focus:outline-none"
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 font-vt323 text-lg">
          {!timerState.isRunning ? (
            <button
              onClick={startTimer}
              className="bg-[#34263f] text-white px-6 py-2 border border-[#22162b] shadow-[2px_2px_0px_#22162b]"
            >
              START TIMER
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="bg-[#5c436f] text-white px-6 py-2 border border-[#22162b] shadow-[2px_2px_0px_#22162b]"
            >
              PAUSE
            </button>
          )}
          <button
            onClick={() => resetTimer()}
            className="bg-[#dfd3e6] text-[#34263f] px-6 py-2 border border-[#34263f] shadow-[2px_2px_0px_#22162b]"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Timer Settings Panel */}
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
        <h2 className="font-press-start text-xs text-[#34263f] mb-2">TIMER SETTINGS (MINUTES)</h2>
        <div className="grid grid-cols-3 gap-2 font-vt323">
          <div>
            <label className="stat-label block mb-1">FOCUS</label>
            <input
              type="number"
              value={timerSettings.focusDuration}
              onChange={e => updateTimerSettings({ focusDuration: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full border border-[#34263f] p-1 bg-white text-base"
            />
          </div>
          <div>
            <label className="stat-label block mb-1">SHORT BREAK</label>
            <input
              type="number"
              value={timerSettings.shortBreakDuration}
              onChange={e => updateTimerSettings({ shortBreakDuration: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full border border-[#34263f] p-1 bg-white text-base"
            />
          </div>
          <div>
            <label className="stat-label block mb-1">LONG BREAK</label>
            <input
              type="number"
              value={timerSettings.longBreakDuration}
              onChange={e => updateTimerSettings({ longBreakDuration: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full border border-[#34263f] p-1 bg-white text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};