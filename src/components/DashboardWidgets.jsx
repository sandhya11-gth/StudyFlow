import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import { AddQuestModal } from './AddQuestModal';

export const TodayQuestsWidget = () => {
  const { tasks, toggleTask } = useStudyFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.dueDate === todayStr);

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#34263f]">
        <h2 className="section-heading">TODAY'S STUDY QUESTS</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs bg-[#34263f] text-white px-2 py-0.5 font-vt323 font-bold hover:bg-[#5c436f]"
        >
          + CREATE QUEST
        </button>
      </div>

      {todayTasks.length === 0 ? (
        <div className="py-6 text-center">
          <p className="body-text text-[#645273]">No quests scheduled for today.</p>
          <p className="text-xs font-vt323 text-[#645273] mt-1">Your study board is waiting for its first mission.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todayTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2 border border-[#34263f] ${
                task.completed ? 'bg-[#d2c2dc] opacity-75' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 accent-[#34263f] cursor-pointer"
                />
                <span className={`body-text ${task.completed ? 'line-through text-[#645273]' : ''}`}>
                  {task.title}
                </span>
              </div>
              <span className="text-xs font-vt323 px-1.5 py-0.5 bg-[#ecdcf2] border border-[#34263f]">
                +{task.xpReward} XP
              </span>
            </div>
          ))}
        </div>
      )}

      <AddQuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export const FocusTimerWidget = () => {
  const { timerState, startTimer, pauseTimer, resetTimer } = useStudyFlow();

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] text-center">
      <h2 className="section-heading mb-2">FOCUS TIMER</h2>
      
      <div className="timer-display my-2 bg-white border border-[#34263f] py-2">
        {formatTime(timerState.timeLeft)}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {!timerState.isRunning ? (
          <button
            onClick={startTimer}
            className="px-3 py-1 bg-[#34263f] text-white text-xs font-vt323 font-bold hover:bg-[#5c436f]"
          >
            START
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-3 py-1 bg-[#5c436f] text-white text-xs font-vt323 font-bold hover:bg-[#34263f]"
          >
            PAUSE
          </button>
        )}
        <button
          onClick={() => resetTimer()}
          className="px-3 py-1 bg-[#cbb4d8] border border-[#34263f] text-xs font-vt323 font-bold hover:bg-white"
        >
          RESET
        </button>
      </div>
    </div>
  );
};