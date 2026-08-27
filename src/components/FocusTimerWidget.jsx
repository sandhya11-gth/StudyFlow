import React, { useState, useEffect } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import { PixelIcon } from './PixelIcon';

export default function FocusTimerWidget() {
  const { completeFocusSession } = useStudyFlow();
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((sec) => sec - 1), 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      completeFocusSession(25);
      alert('Pomodoro session completed! +50 XP');
      setSecondsLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, completeFocusSession]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(25 * 60);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="bg-[#fff3f6] border-2 border-[#5c4358] p-2.5 rounded-lg shadow-[3px_3px_0px_0px_#5c4358] space-y-1.5">
      <div className="flex items-center justify-between border-b border-[#5c4358]/20 pb-1 font-heading text-[#5c4358]">
        <span className="flex items-center gap-1">
          <PixelIcon name="timer" className="w-3.5 h-3.5" />
          <span>FOCUS TIMER</span>
        </span>
        <span className="font-small-label bg-[#fcebb6] px-1 rounded border border-[#5c4358]/30">25m</span>
      </div>

      <div className="text-center py-1">
        <div className="font-timer text-[#5c4358] my-0.5">{timeStr}</div>
        <div className="flex justify-center gap-1.5 mt-1.5">
          <button
            onClick={toggleTimer}
            className={`px-2.5 py-0.5 rounded border-2 border-[#5c4358] font-nav text-xs btn-pixel cursor-pointer ${
              isActive ? 'bg-[#fcebb6]' : 'bg-[#f4bdcd]'
            }`}
          >
            {isActive ? 'PAUSE' : 'START'}
          </button>
          <button
            onClick={resetTimer}
            className="px-2 py-0.5 rounded border-2 border-[#5c4358] bg-white font-nav text-xs btn-pixel cursor-pointer"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}