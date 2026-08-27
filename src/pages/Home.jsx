import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import RetroWindow from '../components/RetroWindow';

export default function Home() {
  const {
    activeProfile,
    avatarObj,
    data,
    toggleTask,
    addTask,
    deleteTask,
    buddyMessage,
    setActiveTab
  } = useStudyFlow();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questText, setQuestText] = useState('');
  const [category, setCategory] = useState('DSA');
  const [difficulty, setDifficulty] = useState('MEDIUM');

  if (!data) return null;

  const hours = Math.floor(data.studyTimeSeconds / 3600);
  const minutes = Math.floor((data.studyTimeSeconds % 3600) / 60);

  const handleCreateQuest = (e) => {
    e.preventDefault();
    if (!questText.trim()) return;
    const xpMap = { EASY: 40, MEDIUM: 60, HARD: 80 };
    addTask({
      text: questText.trim(),
      category,
      difficulty,
      xpReward: xpMap[difficulty] || 50
    });
    setQuestText('');
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-4 font-['Silkscreen'] text-[#F5F7FF]">
      
      {/* ================= LEFT COLUMN: PLAYER HUD ================= */}
      <div className="flex flex-col gap-4">
        <RetroWindow title="PLAYER HUD" icon="⚔️" borderColor="#4DE7FF">
          <div className="flex flex-col items-center text-center gap-3">
            
            {/* Selected Sprite */}
            <div
              className="w-24 h-24 border-4 bg-[#10152B] p-1 shadow-[0_0_10px_#2463D4]"
              style={{ borderColor: avatarObj.border }}
              dangerouslySetInnerHTML={{ __html: avatarObj.svg }}
            />

            <div>
              <div className="font-['Press_Start_2P'] text-xs text-[#FFE66D]">
                {activeProfile?.name}
              </div>
              <div className="text-[10px] text-[#68D391] mt-1">{avatarObj.class}</div>
            </div>

            {/* Level & XP Gauge */}
            <div className="w-full bg-[#10152B] border-2 border-[#2463D4] p-2 flex flex-col gap-1.5">
              <div className="flex justify-between font-['Press_Start_2P'] text-[9px] text-[#4DE7FF]">
                <span>LVL 0{data.level}</span>
                <span>{data.xp % 200} / 200 XP</span>
              </div>
              <div className="w-full bg-[#17265A] border border-[#2463D4] h-3 p-0.5">
                <div
                  className="bg-[#FF5C9A] h-full transition-all"
                  style={{ width: `${(data.xp % 200) / 2}%` }}
                />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="w-full grid grid-cols-2 gap-2 text-left font-['Press_Start_2P'] text-[8px]">
              <div className="bg-[#10152B] border border-[#2463D4] p-2">
                <div className="text-[#8B6CFF]">STREAK</div>
                <div className="text-xs text-[#FFE66D] mt-1">{data.streak} DAYS</div>
              </div>
              <div className="bg-[#10152B] border border-[#2463D4] p-2">
                <div className="text-[#8B6CFF]">TIME</div>
                <div className="text-xs text-[#4DE7FF] mt-1">{hours}h {minutes}m</div>
              </div>
            </div>

          </div>
        </RetroWindow>

        {/* Navigation Panel */}
        <RetroWindow title="GAME MENU" icon="📜" borderColor="#8B6CFF">
          <div className="flex flex-col gap-2 font-['Press_Start_2P'] text-[9px]">
            {[
              { id: 'HOME', label: 'HUB', icon: '🏠' },
              { id: 'QUESTS', label: 'QUEST LOG', icon: '⚔️' },
              { id: 'CALENDAR', label: 'STUDY MAP', icon: '🗺️' },
              { id: 'FOCUS', label: 'FOCUS MODE', icon: '⏱️' },
              { id: 'STATS', label: 'STATUS', icon: '📊' },
              { id: 'NOTES', label: 'FILES', icon: '💾' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`flex items-center gap-2 p-2 border border-[#2463D4] text-left transition-all ${
                  activeTab === nav.id
                    ? 'bg-[#2463D4] text-[#FFE66D] border-[#FFE66D]'
                    : 'bg-[#10152B] hover:bg-[#17265A]'
                }`}
              >
                <span>{nav.icon}</span>
                <span>{nav.label}</span>
              </button>
            ))}
          </div>
        </RetroWindow>
      </div>

      {/* ================= CENTER COLUMN: QUEST LOG ================= */}
      <div className="flex flex-col gap-4">
        <RetroWindow title="MAIN QUEST LOG" icon="🗡️" borderColor="#FF5C9A">
          <div className="flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-[#2463D4]/40 pb-2">
              <span className="font-['Press_Start_2P'] text-[10px] text-[#FFE66D]">
                ACTIVE QUESTS ({data.tasks.filter((t) => !t.completed).length})
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#FF5C9A] border-2 border-[#FFE66D] font-['Press_Start_2P'] text-[8px] px-2 py-1 text-[#10152B] hover:bg-[#4DE7FF]"
              >
                + NEW QUEST
              </button>
            </div>

            {/* Quests List */}
            <div className="flex flex-col gap-2">
              {data.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-[#10152B] border-2 p-3 flex items-center justify-between gap-2 transition-all ${
                    task.completed
                      ? 'border-[#68D391]/40 opacity-60'
                      : 'border-[#2463D4] hover:border-[#4DE7FF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 border-2 flex items-center justify-center font-['Press_Start_2P'] text-xs ${
                        task.completed
                          ? 'bg-[#68D391] border-[#68D391] text-[#10152B]'
                          : 'border-[#4DE7FF] bg-[#10152B]'
                      }`}
                    >
                      {task.completed ? '✓' : ''}
                    </button>

                    <div>
                      <div
                        className={`text-xs ${
                          task.completed ? 'line-through text-[#68D391]' : 'text-[#F5F7FF]'
                        }`}
                      >
                        {task.text}
                      </div>
                      <div className="flex gap-2 text-[9px] text-[#8B6CFF] mt-1">
                        <span>[{task.category}]</span>
                        <span className="text-[#FFE66D]">{task.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-['Press_Start_2P'] text-[9px] text-[#68D391]">
                      +{task.xpReward} XP
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-[#FF5C9A] hover:text-[#4DE7FF] font-bold text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </RetroWindow>

        {/* Study Companion Dialog Box */}
        <RetroWindow title="COMPANION FEED" icon="🐱" borderColor="#68D391">
          <div className="flex items-center gap-3 bg-[#10152B] p-2 border border-[#68D391]">
            <div className="text-2xl">🐱</div>
            <div className="font-['Press_Start_2P'] text-[9px] text-[#68D391] leading-relaxed">
              &gt; {buddyMessage}
            </div>
          </div>
        </RetroWindow>
      </div>

      {/* ================= RIGHT COLUMN: STUDY MAP & FOCUS ================= */}
      <div className="flex flex-col gap-4">
        
        {/* Mission Map Preview */}
        <RetroWindow title="STUDY MAP" icon="🗺️" borderColor="#FFE66D">
          <div className="flex flex-col gap-2">
            <div className="font-['Press_Start_2P'] text-[9px] text-[#FFE66D] border-b border-[#2463D4]/40 pb-1">
              AUGUST 2026
            </div>
            <div className="grid grid-cols-7 text-center font-['Press_Start_2P'] text-[8px] text-[#8B6CFF] my-1">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 text-center font-['Press_Start_2P'] text-[8px] gap-1">
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-1 border ${
                    i + 1 === 12
                      ? 'bg-[#FF5C9A] text-[#10152B] border-[#FFE66D] font-bold'
                      : 'border-[#2463D4]/30 bg-[#10152B]'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </RetroWindow>

        {/* Quick Focus Widget */}
        <RetroWindow title="FOCUS MODE" icon="⏱️" borderColor="#2463D4">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="font-['Press_Start_2P'] text-2xl text-[#4DE7FF] my-2">25:00</div>
            <button
              onClick={() => setActiveTab('FOCUS')}
              className="w-full bg-[#2463D4] border-2 border-[#4DE7FF] font-['Press_Start_2P'] text-[9px] py-2 text-[#F5F7FF] hover:bg-[#FF5C9A]"
            >
              LAUNCH HUD
            </button>
          </div>
        </RetroWindow>

      </div>

      {/* ================= MODAL: QUEST CREATOR ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#10152B]/80 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-[#17265A] border-4 border-[#FF5C9A] p-4 shadow-[8px_8px_0px_0px_#10152B]">
            <div className="flex justify-between items-center border-b-2 border-[#FF5C9A] pb-2 mb-4 font-['Press_Start_2P'] text-xs text-[#FFE66D]">
              <span>QUEST CREATOR</span>
              <button onClick={() => setIsModalOpen(false)} className="text-[#FF5C9A]">✕</button>
            </div>

            <form onSubmit={handleCreateQuest} className="flex flex-col gap-3 font-['Silkscreen'] text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-['Press_Start_2P'] text-[9px] text-[#4DE7FF]">QUEST NAME</label>
                <input
                  type="text"
                  required
                  value={questText}
                  onChange={(e) => setQuestText(e.target.value)}
                  placeholder="e.g. Master Graph Traversal"
                  className="bg-[#10152B] border-2 border-[#2463D4] p-2 text-[#4DE7FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-['Press_Start_2P'] text-[9px] text-[#4DE7FF]">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#10152B] border-2 border-[#2463D4] p-2 text-[#4DE7FF]"
                  >
                    <option value="DSA">DSA</option>
                    <option value="WEB DEV">WEB DEV</option>
                    <option value="C++">C++</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="MATH">MATH</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-['Press_Start_2P'] text-[9px] text-[#4DE7FF]">DIFFICULTY</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="bg-[#10152B] border-2 border-[#2463D4] p-2 text-[#FFE66D]"
                  >
                    <option value="EASY">EASY (+40 XP)</option>
                    <option value="MEDIUM">MEDIUM (+60 XP)</option>
                    <option value="HARD">HARD (+80 XP)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 bg-[#FF5C9A] border-2 border-[#FFE66D] font-['Press_Start_2P'] text-xs py-3 text-[#10152B] hover:bg-[#4DE7FF]"
              >
                [ CREATE QUEST ]
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}