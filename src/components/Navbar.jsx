import React from 'react';

export default function Navbar({ level = 4, xp = 780 }) {
  return (
    <div className="w-full bg-[#f7c8d6] border-b-2 border-[#4b304b] px-4 py-2 font-['Pixelify_Sans',sans-serif] text-[#4b304b] flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-4 text-xs font-bold">
        <span className="text-sm font-extrabold tracking-wider">🌸 STUDYFLOW</span>
        <span className="hidden sm:inline text-[#4b304b]/70">YOUR COZY STUDY CORNER ♡</span>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1 border border-[#4b304b] bg-[#fff7ea] px-2 py-0.5 shadow-[1px_1px_0px_#4b304b]">
          <span>⭐</span>
          <span>LVL {level}</span>
        </div>
        <div className="flex items-center gap-1 border border-[#4b304b] bg-[#f8e7ad] px-2 py-0.5 shadow-[1px_1px_0px_#4b304b]">
          <span>🏆</span>
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
}