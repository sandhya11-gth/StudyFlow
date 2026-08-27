import React, { useState, useEffect } from 'react';

export default function Taskbar({ activeTab, setActiveTab }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#fce6ed] border-t-2 border-[#5c4358] px-2 py-1 flex items-center justify-between text-[#5c4358] select-none flex-shrink-0 font-taskbar">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setActiveTab('Home')}
          className="bg-[#f4bdcd] border-1.5 border-[#5c4358] px-2 py-0.5 rounded flex items-center gap-1 btn-pixel cursor-pointer text-[11px]"
        >
          <span>🌸 START</span>
        </button>

        <div className="h-4 w-[1px] bg-[#5c4358]/30 mx-0.5" />

        <div className="flex items-center gap-1 text-[10px]">
          <button
            onClick={() => setActiveTab('Home')}
            className={`px-2 py-0.5 border border-[#5c4358] rounded ${
              activeTab === 'Home' ? 'bg-[#fff0f4] font-bold' : 'bg-[#fcefe9]'
            }`}
          >
            StudyFlow
          </button>
          <button
            onClick={() => setActiveTab('Notes')}
            className={`px-2 py-0.5 border border-[#5c4358] rounded ${
              activeTab === 'Notes' ? 'bg-[#fff0f4] font-bold' : 'bg-[#fcefe9]'
            }`}
          >
            Notes.txt
          </button>
          <button
            onClick={() => setActiveTab('Focus')}
            className={`px-2 py-0.5 border border-[#5c4358] rounded ${
              activeTab === 'Focus' ? 'bg-[#fff0f4] font-bold' : 'bg-[#fcefe9]'
            }`}
          >
            Focus Mode
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px]">
        <div className="bg-[#fcefe9] border border-[#5c4358] px-1.5 py-0.5 rounded flex items-center gap-1">
          <span>🌙 2:56 AM</span>
        </div>
        <div className="bg-[#fcefe9] border border-[#5c4358] px-1.5 py-0.5 rounded">
          <span>AUG 12</span>
        </div>
      </div>
    </footer>
  );
}