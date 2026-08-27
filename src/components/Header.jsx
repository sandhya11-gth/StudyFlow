import React from 'react';

export default function Header({ xp, level }) {
  return (
    <header className="bg-[#fce6ed] border-b-2 border-[#5c4358] px-2.5 py-1 flex flex-col gap-0.5 select-none flex-shrink-0 font-body">
      {/* Title & Window Chrome */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-logo text-[#5c4358]">
            <span className="text-pink-500 text-sm">🌸</span>
            <span>StudyFlow</span>
          </div>
          <span className="font-small-label text-[#5c4358]/70 text-[10px]">your cozy study corner ♡</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#fcefe9] border border-b-0 border-[#5c4358] rounded-t px-2 py-0.5 font-[#mydesk] text-[#5c4358] flex items-center gap-1.5">
            <span>🏠 My Desk</span>
            <span className="text-[9px] cursor-pointer hover:text-red-500">✕</span>
          </div>
          <button className="bg-[#fcefe9] border border-[#5c4358] rounded px-1.5 text-[10px] text-[#5c4358] hover:bg-white cursor-pointer font-small-label">+</button>

          <div className="flex items-center gap-1 ml-2">
            <button className="w-3.5 h-3.5 bg-[#fcefe9] border border-[#5c4358] rounded text-[8px] flex items-center justify-center font-bold">_</button>
            <button className="w-3.5 h-3.5 bg-[#fcefe9] border border-[#5c4358] rounded text-[8px] flex items-center justify-center font-bold">□</button>
            <button className="w-3.5 h-3.5 bg-[#f4a2b9] border border-[#5c4358] rounded text-[8px] flex items-center justify-center font-bold">✕</button>
          </div>
        </div>
      </div>

      {/* Menu Row */}
      <div className="flex items-center justify-between pt-0.5 border-t border-[#5c4358]/20 text-[#5c4358] font-menubar">
        <div className="flex gap-3 text-[11px]">
          <button className="hover:underline cursor-pointer">FILE</button>
          <button className="hover:underline cursor-pointer">EDIT</button>
          <button className="hover:underline cursor-pointer">VIEW</button>
          <button className="hover:underline cursor-pointer">TOOLS</button>
          <button className="hover:underline cursor-pointer">FOCUS</button>
          <button className="hover:underline cursor-pointer">HELP</button>
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          <div className="bg-[#fff4f7] border border-[#5c4358] px-1.5 py-0.2 rounded flex items-center gap-1 shadow-[1px_1px_0px_0px_#5c4358]">
            <span>⭐ Lvl {level}</span>
          </div>
          <div className="bg-[#fff4f7] border border-[#5c4358] px-1.5 py-0.2 rounded flex items-center gap-1 shadow-[1px_1px_0px_0px_#5c4358]">
            <span>🪙 {xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}