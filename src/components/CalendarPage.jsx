// src/components/CalendarPage.jsx
import React, { useState } from 'react';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(26);
  
  // Sample calendar days setup for August 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 6; // Starts on Saturday (August 1, 2026)

  return (
    <div className="w-full min-h-full p-6 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start font-['Pixelify_Sans',sans-serif]">
      
      {/* LEFT COLUMN: Main Calendar & Day Planner */}
      <div className="flex flex-col gap-6 min-w-0">
        
        {/* Calendar Window */}
        <div className="bg-[#fff7ea] border-2 border-[#4b304b] shadow-[4px_4px_0px_#4b304b] rounded-sm p-4">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b-2 border-[#4b304b]/20 pb-3 mb-4">
            <h2 className="text-xl font-bold text-[#4b304b] tracking-wider">
              ✽ AUGUST 2026 ✽
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-2 py-0.5 bg-[#f8e7ad] border border-[#4b304b] text-xs font-bold text-[#4b304b] hover:bg-[#f7c98b] shadow-[1px_1px_0px_#4b304b]">
                TODAY
              </button>
              <button className="px-2 py-0.5 bg-[#f7c8d6] border border-[#4b304b] text-xs font-bold text-[#4b304b] hover:bg-[#f3afc4] shadow-[1px_1px_0px_#4b304b]">
                ◄
              </button>
              <button className="px-2 py-0.5 bg-[#f7c8d6] border border-[#4b304b] text-xs font-bold text-[#4b304b] hover:bg-[#f3afc4] shadow-[1px_1px_0px_#4b304b]">
                ►
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center font-bold text-[11px] text-[#4b304b]/70 mb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 bg-[#4b304b]/10 p-1 border border-[#4b304b]">
            {/* Blank leading slots */}
            {Array.from({ length: startOffset }).map((_, idx) => (
              <div key={`empty-${idx}`} className="bg-[#fff7ea]/40 h-14" />
            ))}

            {/* Date slots */}
            {daysInMonth.map((day) => {
              const isSelected = selectedDate === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`h-14 p-1.5 flex flex-col justify-between items-start border transition-all ${
                    isSelected
                      ? 'bg-[#f3afc4] border-[#4b304b] font-bold shadow-[2px_2px_0px_#4b304b]'
                      : 'bg-[#fff7ea] border-[#4b304b]/20 hover:bg-[#f8e7ad]'
                  }`}
                >
                  <span className={`text-xs ${isSelected ? 'text-[#4b304b]' : 'text-[#4b304b]/80'}`}>
                    {day}
                  </span>
                  {/* Event indicator dot */}
                  {(day === 14 || day === 16 || day === 20) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4b304b] self-end" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details / Planner */}
        <div className="bg-[#fff7ea] border-2 border-[#4b304b] shadow-[4px_4px_0px_#4b304b] rounded-sm p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b-2 border-[#4b304b]/20 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">📌</span>
              <h3 className="text-sm font-bold text-[#4b304b] uppercase">
                Wednesday, August {selectedDate}
              </h3>
            </div>
            <button className="px-3 py-1 bg-[#f3afc4] border border-[#4b304b] text-xs font-bold text-[#4b304b] hover:bg-[#f7c8d6] shadow-[1px_1px_0px_#4b304b]">
              + ADD TO PLAN
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Quests / Tasks */}
            <div className="bg-[#f7c8d6]/20 border border-[#4b304b] p-3 rounded-xs flex flex-col gap-2">
              <span className="text-xs font-bold text-[#4b304b] flex items-center gap-1">
                🌸 TASKS FOR THIS DAY (0)
              </span>
              <p className="text-[11px] text-[#4b304b]/60 italic py-2">
                No tasks scheduled for this date.
              </p>
            </div>

            {/* Daily Events */}
            <div className="bg-[#cfe2d0]/30 border border-[#4b304b] p-3 rounded-xs flex flex-col gap-2">
              <span className="text-xs font-bold text-[#4b304b] flex items-center gap-1">
                📌 STUDY PLANS & EVENTS (0)
              </span>
              <p className="text-[11px] text-[#4b304b]/60 italic py-2">
                No study plans added for this date yet.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Sidebar Widgets Stack */}
      <div className="flex flex-col gap-6 min-w-0">
        
        {/* Focus Timer Widget */}
        <div className="bg-[#f8e7ad] border-2 border-[#4b304b] shadow-[4px_4px_0px_#4b304b] rounded-sm p-4 flex flex-col items-center gap-3">
          <div className="w-full flex justify-between items-center border-b border-[#4b304b]/20 pb-1.5">
            <span className="text-xs font-bold text-[#4b304b]">⏱ FOCUS TIMER</span>
            <span className="text-[10px] bg-[#fff7ea] border border-[#4b304b] px-1.5 py-0.5">25M</span>
          </div>
          <div className="text-3xl font-bold text-[#4b304b] bg-[#fff7ea] border-2 border-[#4b304b] px-6 py-2 shadow-[2px_2px_0px_#4b304b]">
            25:00
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1 bg-[#f3afc4] border border-[#4b304b] text-xs font-bold text-[#4b304b] shadow-[1px_1px_0px_#4b304b] hover:bg-[#f7c8d6]">
              START
            </button>
            <button className="px-4 py-1 bg-[#fff7ea] border border-[#4b304b] text-xs font-bold text-[#4b304b] shadow-[1px_1px_0px_#4b304b]">
              RESET
            </button>
          </div>
        </div>

        {/* Upcoming List */}
        <div className="bg-[#fff7ea] border-2 border-[#4b304b] shadow-[4px_4px_0px_#4b304b] rounded-sm p-3.5 flex flex-col gap-2.5">
          <span className="text-xs font-bold text-[#4b304b] border-b border-[#4b304b]/20 pb-1.5 flex items-center gap-1.5">
            📅 UPCOMING
          </span>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-[#4b304b]/30 pb-1 text-[#4b304b]">
              <span>Math Quiz</span>
              <span className="text-[10px] text-[#4b304b]/70">14 Aug</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-[#4b304b]/30 pb-1 text-[#4b304b]">
              <span>DSA Contest</span>
              <span className="text-[10px] text-[#4b304b]/70">16 Aug</span>
            </div>
            <div className="flex justify-between text-[#4b304b]">
              <span>Web Project</span>
              <span className="text-[10px] text-[#4b304b]/70">20 Aug</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}