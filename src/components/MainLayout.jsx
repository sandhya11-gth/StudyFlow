import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import { HomeView } from '../views/HomeView';
import { CalendarView } from '../views/CalendarView';
import { TasksView } from '../views/TasksView';
import { SessionsView } from '../views/SessionsView';
import { FocusView } from '../views/FocusView';
import { StatsView } from '../views/StatsView';
import { NotesView } from '../views/NotesView';

export const MainLayout = () => {
  const { activeTab, setActiveTab } = useStudyFlow();

  const menuItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'CALENDAR', label: 'CALENDAR' },
    { id: 'TASKS', label: 'TASKS' },
    { id: 'SESSIONS', label: 'SESSIONS' },
    { id: 'FOCUS', label: 'FOCUS' },
    { id: 'STATS', label: 'STATS' },
    { id: 'NOTES', label: 'NOTES' }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'HOME': return <HomeView />;
      case 'CALENDAR': return <CalendarView />;
      case 'TASKS': return <TasksView />;
      case 'SESSIONS': return <SessionsView />;
      case 'FOCUS': return <FocusView />;
      case 'STATS': return <StatsView />;
      case 'NOTES': return <NotesView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#cbb4d8] text-[#22162b] p-2 md:p-4 font-vt323 select-none">
      <div className="max-w-[1440px] mx-auto border-2 border-[#22162b] bg-[#dfd3e6] shadow-[6px_6px_0px_#22162b]">
        {/* Retro Window Chrome Titlebar */}
        <div className="bg-[#34263f] text-white px-3 py-1.5 flex justify-between items-center border-b-2 border-[#22162b]">
          <span className="font-press-start text-xs tracking-wider">STUDYFLOW v2.0 OS</span>
          <div className="flex gap-1">
            <span className="inline-block w-3 h-3 bg-[#ecdcf2] border border-[#22162b]" />
            <span className="inline-block w-3 h-3 bg-[#ecdcf2] border border-[#22162b]" />
            <span className="inline-block w-3 h-3 bg-[#22162b] border border-white" />
          </div>
        </div>

        {/* Desktop Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-80px)]">
          {/* Left Navigation Sidebar */}
          <div className="md:col-span-2 bg-[#ecdcf2] border-r-2 border-[#22162b] p-3 flex flex-col justify-between">
            <div>
              <div className="font-press-start text-xs text-[#34263f] mb-3 pb-2 border-b border-[#34263f]">
                MENU
              </div>
              <nav className="space-y-1">
                {menuItems.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left font-press-start text-[11px] px-2 py-2 border border-[#34263f] transition-all ${
                        isActive
                          ? 'bg-[#34263f] text-white shadow-[2px_2px_0px_#22162b]'
                          : 'bg-white text-[#34263f] hover:bg-[#dfd3e6]'
                      }`}
                    >
                      {isActive ? `> ${item.label}` : `  ${item.label}`}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-6 pt-3 border-t border-[#34263f] text-center font-vt323 text-xs text-[#645273]">
              STUDYFLOW OS<br />SYS_OK 2026
            </div>
          </div>

          {/* Dynamic Content Main Screen */}
          <div className="md:col-span-10 p-3 overflow-y-auto">
            {renderActiveView()}
          </div>
        </div>
      </div>
    </div>
  );
};