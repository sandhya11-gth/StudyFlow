import React from 'react';

export default function RetroWindow({
  title,
  children,
  icon = '🎮',
  borderColor = '#2463D4',
  headerBg = '#17265A',
  className = ''
}) {
  return (
    <div
      className={`relative bg-[#10152B] border-2 rounded-none p-1 flex flex-col ${className}`}
      style={{
        borderColor: borderColor,
        boxShadow: `4px 4px 0px 0px ${borderColor}88`
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-2 py-1 select-none font-['Press_Start_2P'] text-[10px] tracking-wider mb-1"
        style={{ backgroundColor: headerBg }}
      >
        <div className="flex items-center gap-2 text-[#F5F7FF]">
          <span>{icon}</span>
          <span className="uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-3.5 h-3.5 bg-[#2463D4] border border-[#4DE7FF] text-[#F5F7FF] text-[8px] flex items-center justify-center font-bold">
            _
          </button>
          <button className="w-3.5 h-3.5 bg-[#8B6CFF] border border-[#4DE7FF] text-[#F5F7FF] text-[8px] flex items-center justify-center font-bold">
            ▢
          </button>
          <button className="w-3.5 h-3.5 bg-[#FF5C9A] border border-[#FFE66D] text-[#10152B] text-[8px] flex items-center justify-center font-bold">
            ✕
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="p-2 flex-1 bg-[#17265A]/40 border border-[#2463D4]/30 overflow-auto">
        {children}
      </div>
    </div>
  );
}