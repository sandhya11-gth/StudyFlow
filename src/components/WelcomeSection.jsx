import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export default function WelcomeSection() {
  const { stats, todayStr } = useStudyFlow();

  const todayTasksCount = stats?.todayTasksCount || 0;
  const completedTasks = stats?.completedTasks || 0;
  const remainingTasks = stats?.remainingTasks || 0;

  return (
    <section className="w-full max-w-3xl mt-2 px-2">
      <div className="relative bg-white/90 border-2 border-pastel-purple p-5 sm:p-7 shadow-[5px_5px_0px_0px_#70536d] rotate-[-0.3deg]">
        <div className="absolute -top-3 left-10 w-24 h-5 bg-pastel-pink/70 border border-pastel-purple/30 rotate-[-2deg] pointer-events-none" />
        <span className="absolute top-4 right-5 text-2xl select-none">🎀</span>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-pastel-pink text-lg select-none">✿</span>
          <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-pastel-purple tracking-wide">
            WELCOME BACK, USER!
          </h1>
          <span className="text-pastel-pink text-lg select-none">✿</span>
        </div>

        <p className="font-pixel text-xs sm:text-sm text-pastel-subtext mb-5">
          ready for another cute & productive study session? {todayStr} ✨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t-2 border-dashed border-pastel-purple/20 pt-4">
          <div className="bg-pastel-pink/30 border border-pastel-purple/40 p-3 rounded text-center">
            <span className="font-pixel text-[10px] text-pastel-purple block font-bold">TODAY'S QUESTS</span>
            <span className="font-pixel text-xl font-bold text-pastel-purple">{todayTasksCount}</span>
          </div>

          <div className="bg-pastel-sage/30 border border-pastel-purple/40 p-3 rounded text-center">
            <span className="font-pixel text-[10px] text-pastel-purple block font-bold">COMPLETED</span>
            <span className="font-pixel text-xl font-bold text-pastel-purple">{completedTasks}</span>
          </div>

          <div className="bg-pastel-peach/30 border border-pastel-purple/40 p-3 rounded text-center">
            <span className="font-pixel text-[10px] text-pastel-purple block font-bold">REMAINING</span>
            <span className="font-pixel text-xl font-bold text-pastel-purple">{remainingTasks}</span>
          </div>
        </div>
      </div>
    </section>
  );
}