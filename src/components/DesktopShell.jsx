import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import Home from '../pages/Home';

export default function DesktopShell() {
  const { activeProfile, data, activeTab, setActiveTab, switchProfile, profiles } = useStudyFlow();

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#10152B] bg-[radial-gradient(#2463D4_1px,transparent_1px)] [background-size:20px_20px] p-2 sm:p-4 text-[#F5F7FF]">
      
      {/* RETRO DESKTOP CONTAINER */}
      <div className="max-w-[1400px] mx-auto bg-[#17265A] border-4 border-[#2463D4] shadow-[8px_8px_0px_0px_#10152B] flex flex-col min-h-[92vh]">
        
        {/* TOP STATUS BAR */}
        <div className="bg-[#2463D4] border-b-4 border-[#10152B] p-2 flex flex-wrap justify-between items-center font-['Press_Start_2P'] text-[9px]">
          <div className="flex items-center gap-3">
            <span className="text-[#FFE66D]">STUDYFLOW.EXE</span>
            <span className="text-[#4DE7FF]">PLAYER: {activeProfile?.name}</span>
            <span className="text-[#FF5C9A]">LV.0{data?.level}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Profile Switcher */}
            <select
              onChange={(e) => switchProfile(e.target.value)}
              value={activeProfile?.id || ''}
              className="bg-[#10152B] border border-[#4DE7FF] text-[#4DE7FF] px-1 py-0.5 text-[8px]"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <span>12 AUG 2026</span>
          </div>
        </div>

        {/* APPLICATION NAVIGATION TABS */}
        <div className="bg-[#10152B] border-b-2 border-[#2463D4] px-3 py-1 flex gap-2 font-['Press_Start_2P'] text-[9px] overflow-x-auto">
          {[
            { id: 'HOME', label: 'HUB' },
            { id: 'QUESTS', label: 'QUESTS' },
            { id: 'CALENDAR', label: 'MAP' },
            { id: 'FOCUS', label: 'FOCUS' },
            { id: 'STATS', label: 'STATS' },
            { id: 'NOTES', label: 'FILES' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 border-t-2 border-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#17265A] border-[#4DE7FF] text-[#4DE7FF]'
                  : 'bg-[#10152B] border-[#2463D4] text-[#8B6CFF] hover:text-[#F5F7FF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* WORKSPACE CONTENT AREA */}
        <div className="p-4 flex-1">
          {renderContent()}
        </div>

        {/* RETRO OS TASKBAR */}
        <div className="bg-[#10152B] border-t-4 border-[#2463D4] p-2 flex justify-between items-center font-['Press_Start_2P'] text-[8px] text-[#4DE7FF]">
          <div className="flex items-center gap-2">
            <button className="bg-[#2463D4] border border-[#4DE7FF] px-2 py-1 text-[#F5F7FF]">
              🕹️ START
            </button>
            <span className="text-[#8B6CFF]">SYSTEM: ONLINE</span>
          </div>
          <div>READY TO STUDY</div>
        </div>

      </div>

    </div>
  );
}