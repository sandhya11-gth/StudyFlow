import React from 'react';
import { PixelIcon } from './PixelIcon';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'Home', label: 'HOME', icon: 'home' },
    { id: 'Calendar', label: 'CALENDAR', icon: 'calendar' },
    { id: 'Tasks', label: 'TASKS', icon: 'tasks' },
    { id: 'Sessions', label: 'SESSIONS', icon: 'sessions' },
    { id: 'Focus', label: 'FOCUS', icon: 'timer' },
    { id: 'Stats', label: 'STATS', icon: 'stats' },
    { id: 'Notes', label: 'NOTES', icon: 'notes' },
  ];

  return (
    <aside className="h-full bg-[#fbf2d0] border-2 border-[#5c4358] p-2 pl-4 rounded-lg shadow-[3px_3px_0px_0px_#5c4358] notebook-rings flex flex-col gap-2">
      <div className="border-b border-dashed border-[#5c4358]/20 pb-1 text-center">
        <span className="font-heading text-[#5c4358] block text-[13px]">NAVIGATION</span>
      </div>

      <nav className="space-y-1 flex-1 overflow-y-auto pr-0.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2 px-2 py-1 rounded border-2 border-[#5c4358] font-nav transition-all cursor-pointer text-left h-[34px] ${
                isActive
                  ? 'bg-[#f4bdcd] text-[#5c4358] shadow-[1.5px_1.5px_0px_0px_#5c4358] translate-x-0.5 font-bold'
                  : 'bg-[#fffdf5] text-[#5c4358]/80 hover:bg-[#fff0f4]'
              }`}
            >
              <PixelIcon name={item.icon} className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}