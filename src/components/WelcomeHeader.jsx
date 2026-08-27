import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const WelcomeHeader = () => {
  const { profile, level, xp, sessions, getTotalStudyTime, getStreak } = useStudyFlow();

  const safeXP = isNaN(xp) ? 0 : xp;
  const safeLevel = isNaN(level) || !level ? 1 : level;
  const playerName = profile?.playerName || 'STUDENT';

  // XP progress calculation
  const nextLevelXP = safeLevel * 150;
  const currentLevelBaseXP = (safeLevel - 1) * 150;
  const progressPercent = Math.min(
    100,
    Math.max(0, ((safeXP - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100)
  );

  return (
    <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] mb-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
        <div>
          <h1 className="font-press-start text-base text-[#34263f]">
            GOOD EVENING, {playerName.toUpperCase()}
          </h1>
          <p className="font-vt323 text-sm text-[#645273] mt-0.5">
            Ready to log some study time today?
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#dfd3e6] border border-[#34263f] px-3 py-1.5">
          <div>
            <span className="stat-label block">LEVEL {safeLevel}</span>
            <div className="w-28 bg-[#34263f]/20 h-2 border border-[#34263f] mt-1">
              <div
                className="bg-[#34263f] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="font-vt323 text-base text-[#34263f] font-bold">
            {safeXP} XP
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#34263f] pt-2">
        <div className="bg-white border border-[#34263f] p-1.5 text-center">
          <span className="stat-label block">STUDY TIME</span>
          <span className="stat-number">{getTotalStudyTime()}</span>
        </div>
        <div className="bg-white border border-[#34263f] p-1.5 text-center">
          <span className="stat-label block">SESSIONS</span>
          <span className="stat-number">{sessions ? sessions.length : 0}</span>
        </div>
        <div className="bg-white border border-[#34263f] p-1.5 text-center">
          <span className="stat-label block">STREAK</span>
          <span className="stat-number">{getStreak()} days</span>
        </div>
      </div>
    </div>
  );
};