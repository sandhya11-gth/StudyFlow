import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const FocusTimerCard = () => {
  const { timerState, startTimer, pauseTimer, resetTimer } = useStudyFlow();

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
      <h2 className="section-heading mb-2 text-center">FOCUS TIMER</h2>
      <div className="timer-display bg-white border border-[#34263f] py-1 text-center my-1">
        {formatTime(timerState.timeLeft)}
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {!timerState.isRunning ? (
          <button onClick={startTimer} className="font-vt323 text-sm px-3 py-1 bg-[#34263f] text-white">
            START
          </button>
        ) : (
          <button onClick={pauseTimer} className="font-vt323 text-sm px-3 py-1 bg-[#5c436f] text-white">
            PAUSE
          </button>
        )}
        <button onClick={() => resetTimer()} className="font-vt323 text-sm px-3 py-1 bg-[#dfd3e6] border border-[#34263f]">
          RESET
        </button>
      </div>
    </div>
  );
};

export const StudyBuddyCard = () => {
  const { timerState, tasks } = useStudyFlow();

  const getBuddyMessage = () => {
    if (timerState.isRunning) return '"Stay focused! You got this!"';
    const pending = tasks.filter(t => !t.completed).length;
    if (pending === 0) return '"All quests cleared! Nice job!"';
    return '"Ready when you are. Take it one task at a time."';
  };

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] flex items-center gap-3">
      <div className="w-10 h-10 bg-[#34263f] border border-[#22162b] flex items-center justify-center text-white font-press-start text-xs">
        =^.^=
      </div>
      <div className="flex-1">
        <span className="stat-label block">STUDY BUDDY</span>
        <p className="font-vt323 text-sm text-[#34263f] italic">{getBuddyMessage()}</p>
      </div>
    </div>
  );
};

export const DailyNoteCard = () => {
  const { dailyNotes, saveDailyNote } = useStudyFlow();
  const todayStr = new Date().toISOString().split('T')[0];
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(dailyNotes[todayStr] || 'Be patient with yourself...');

  const handleSave = () => {
    saveDailyNote(text);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="section-heading">DAILY NOTE</h2>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="font-vt323 text-xs bg-[#34263f] text-white px-2 py-0.5"
        >
          {isEditing ? 'SAVE' : 'EDIT'}
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-16 bg-white border border-[#34263f] p-1 font-vt323 text-sm focus:outline-none"
        />
      ) : (
        <p className="font-vt323 text-sm text-[#34263f] bg-white border border-[#34263f] p-2 min-h-[4rem]">
          {dailyNotes[todayStr] || 'No note added for today.'}
        </p>
      )}
    </div>
  );
};

export const DailyMoodCard = () => {
  const { moods, setMood } = useStudyFlow();
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMood = moods[todayStr];

  const moodOptions = ['HAPPY', 'FOCUSED', 'COZY', 'TIRED'];

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
      <h2 className="section-heading mb-2">TODAY'S MOOD</h2>
      <div className="grid grid-cols-2 gap-1.5">
        {moodOptions.map(m => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`font-vt323 text-xs py-1 border border-[#34263f] ${
              currentMood === m ? 'bg-[#34263f] text-white' : 'bg-white text-[#34263f]'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};