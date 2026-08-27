import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export default function Stats() {
  const { stats } = useStudyFlow();

  const totalStudyTimeMinutes = stats?.totalStudyTime || 0;
  const totalSessionCount = stats?.sessions || 0;
  const streakDays = stats?.streak || 0;
  const xp = stats?.xp || 0;

  const hours = Math.floor(totalStudyTimeMinutes / 60);
  const mins = totalStudyTimeMinutes % 60;
  const timeDisplay = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  const level = Math.floor(xp / 250) + 1;
  const levelProgress = xp % 250;

  const statsData = [
    {
      id: 'time',
      title: 'STUDY TIME',
      value: timeDisplay,
      subtext: 'total recorded',
      icon: '⏳',
      decor: '✨',
      bgColor: 'bg-pastel-pink/50',
      rotation: 'rotate-[-1deg]',
    },
    {
      id: 'sessions',
      title: 'SESSIONS',
      value: `${totalSessionCount}`,
      subtext: 'completed',
      icon: '🍵',
      decor: '🌸',
      bgColor: 'bg-pastel-sage/50',
      rotation: 'rotate-[1deg]',
    },
    {
      id: 'streak',
      title: 'STREAK',
      value: `${streakDays} days`,
      subtext: 'keep it up!',
      icon: '🔥',
      decor: '⭐',
      bgColor: 'bg-pastel-peach/50',
      rotation: 'rotate-[-0.5deg]',
    },
    {
      id: 'level',
      title: 'XP & LEVEL',
      value: `${xp} XP`,
      subtext: `Level ${level}`,
      icon: '🎀',
      decor: '♡',
      bgColor: 'bg-pastel-lavender/50',
      rotation: 'rotate-[0.5deg]',
      isLevel: true,
      progress: (levelProgress / 250) * 100,
    },
  ];

  return (
    <section className="w-full max-w-3xl mt-2 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className={`relative ${stat.bgColor} border-2 border-pastel-purple p-4 shadow-[3px_3px_0px_0px_#70536d] ${stat.rotation} transition-transform hover:scale-[1.01]`}
          >
            <span className="absolute top-2.5 right-3 text-xs select-none">
              {stat.decor}
            </span>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{stat.icon}</span>
              <h3 className="font-pixel text-xs tracking-wider text-pastel-purple font-bold">
                {stat.title}
              </h3>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="font-pixel text-2xl md:text-3xl font-bold text-pastel-text">
                {stat.value}
              </span>
              <span className="font-body text-xs font-semibold text-pastel-subtext">
                {stat.subtext}
              </span>
            </div>

            {stat.isLevel && (
              <div className="mt-3 pt-2 border-t border-pastel-purple/20">
                <div className="flex justify-between items-center text-[11px] font-pixel text-pastel-purple mb-1">
                  <span>PROGRESS</span>
                  <span>{xp} XP</span>
                </div>
                <div className="w-full h-2 bg-white border border-pastel-purple overflow-hidden p-[1px]">
                  <div
                    className="h-full bg-pastel-purple transition-all duration-300"
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}