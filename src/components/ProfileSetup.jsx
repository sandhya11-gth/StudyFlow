import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import { AVATARS } from '../utils/avatars';

export default function ProfileSetup() {
  const { createProfile } = useStudyFlow();
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('Ace all semester quests!');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createProfile({ name: name.trim(), avatar: selectedAvatar, studyGoal: goal });
  };

  return (
    <div className="min-h-screen bg-[#10152B] bg-[radial-gradient(#2463D4_1px,transparent_1px)] [background-size:16px_16px] text-[#F5F7FF] font-['Silkscreen'] p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-[#17265A] border-4 border-[#2463D4] p-6 shadow-[8px_8px_0px_0px_#8B6CFF] flex flex-col gap-6">
        
        {/* Header Title */}
        <div className="text-center border-b-2 border-[#2463D4] pb-4">
          <h1 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-[#4DE7FF] tracking-wider mb-2">
            STUDYFLOW PLAYER CREATION
          </h1>
          <p className="text-xs text-[#FF5C9A]">CREATE YOUR PROFILE &amp; SELECT YOUR AVATAR</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* User inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-['Press_Start_2P'] text-[10px] text-[#FFE66D]">PLAYER USERNAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. CYBER_ALEX"
                className="bg-[#10152B] border-2 border-[#4DE7FF] px-3 py-2 text-xs text-[#4DE7FF] focus:outline-none focus:border-[#FF5C9A]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-['Press_Start_2P'] text-[10px] text-[#FFE66D]">PRIMARY STUDY GOAL</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="bg-[#10152B] border-2 border-[#4DE7FF] px-3 py-2 text-xs text-[#4DE7FF] focus:outline-none focus:border-[#FF5C9A]"
              />
            </div>
          </div>

          {/* Character selection grid */}
          <div>
            <div className="font-['Press_Start_2P'] text-[10px] text-[#FFE66D] mb-3 uppercase">
              CHOOSE YOUR CHARACTER
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.id;
                return (
                  <div
                    key={av.id}
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`cursor-pointer bg-[#10152B] border-2 p-3 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] ${
                      isSelected
                        ? 'border-[#FF5C9A] shadow-[0_0_12px_#FF5C9A]'
                        : 'border-[#2463D4] hover:border-[#4DE7FF]'
                    }`}
                  >
                    <div
                      className="w-16 h-16 border-2"
                      style={{ borderColor: av.border }}
                      dangerouslySetInnerHTML={{ __html: av.svg }}
                    />
                    <div className="text-center">
                      <div className="font-['Press_Start_2P'] text-[9px] text-[#4DE7FF] mb-1">
                        {av.name}
                      </div>
                      <div className="text-[9px] text-[#68D391]">{av.class}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Start button */}
          <button
            type="submit"
            className="w-full bg-[#FF5C9A] border-4 border-[#FFE66D] font-['Press_Start_2P'] text-xs py-4 text-[#10152B] hover:bg-[#4DE7FF] transition-all shadow-[4px_4px_0px_0px_#10152B]"
          >
            [ START GAME ]
          </button>
        </form>

      </div>
    </div>
  );
}