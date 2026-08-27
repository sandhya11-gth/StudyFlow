import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const StatsView = () => {
  const {
    xp,
    level,
    tasks,
    sessions,
    getTotalStudyTimeFormatted,
    getStreak
  } = useStudyFlow();

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const safeXP = isNaN(xp) ? 0 : xp;
  const safeLevel = isNaN(level) || !level ? 1 : level;

  // Simple SVG/CSS Visualizer for Sessions per Category
  const categoryCounts = tasks.reduce((acc, t) => {
    if (t.completed) {
      acc[t.category] = (acc[t.category] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
        <h1 className="font-press-start text-sm text-[#34263f]">ANALYTICS & STATS</h1>
      </div>

      {sessions.length === 0 && completedTasksCount === 0 ? (
        <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-8 text-center shadow-[3px_3px_0px_#22162b]">
          <p className="font-press-start text-xs text-[#34263f] mb-2">NO STUDY DATA YET</p>
          <p className="font-vt323 text-base text-[#645273]">
            Your performance stats and chart summaries will appear here after you complete focus sessions and tasks.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white border-2 border-[#34263f] p-3 shadow-[2px_2px_0px_#22162b] text-center">
              <span className="stat-label block">TOTAL TIME</span>
              <span className="stat-number">{getTotalStudyTimeFormatted()}</span>
            </div>
            <div className="bg-white border-2 border-[#34263f] p-3 shadow-[2px_2px_0px_#22162b] text-center">
              <span className="stat-label block">SESSIONS</span>
              <span className="stat-number">{sessions.length}</span>
            </div>
            <div className="bg-white border-2 border-[#34263f] p-3 shadow-[2px_2px_0px_#22162b] text-center">
              <span className="stat-label block">STREAK</span>
              <span className="stat-number">{getStreak()} days</span>
            </div>
            <div className="bg-white border-2 border-[#34263f] p-3 shadow-[2px_2px_0px_#22162b] text-center">
              <span className="stat-label block">QUESTS DONE</span>
              <span className="stat-number">{completedTasksCount}</span>
            </div>
          </div>

          {/* Graphical Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
              <h2 className="font-press-start text-xs text-[#34263f] mb-3">LEVEL PROGRESS</h2>
              <div className="bg-white border border-[#34263f] p-3">
                <span className="font-vt323 text-lg font-bold block mb-1">
                  CURRENT LEVEL: {safeLevel} ({safeXP} XP)
                </span>
                <div className="w-full bg-[#dfd3e6] border border-[#34263f] h-4">
                  <div
                    className="bg-[#34263f] h-full"
                    style={{ width: `${Math.min(100, (safeXP / (safeLevel * 150)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
              <h2 className="font-press-start text-xs text-[#34263f] mb-3">COMPLETED BY CATEGORY</h2>
              <div className="bg-white border border-[#34263f] p-3 space-y-2 font-vt323">
                {Object.keys(categoryCounts).length === 0 ? (
                  <p className="text-xs text-[#645273]">No completed tasks categorised yet.</p>
                ) : (
                  Object.entries(categoryCounts).map(([cat, count]) => (
                    <div key={cat} className="flex items-center justify-between">
                      <span className="font-bold">[{cat}]</span>
                      <div className="flex-1 mx-2 bg-[#dfd3e6] h-2">
                        <div
                          className="bg-[#34263f] h-full"
                          style={{ width: `${Math.min(100, count * 20)}%` }}
                        />
                      </div>
                      <span className="text-sm">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};