import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  level: number;
  character: string;
}

export interface StudyFlowContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isTimerRunning: boolean;
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  currentStreak: number;
  setCurrentStreak: React.Dispatch<React.SetStateAction<number>>;
}

const defaultState: StudyFlowContextType = {
  profile: { name: 'STUDENT', level: 1, character: 'PIXEL' },
  setProfile: () => {},
  isTimerRunning: false,
  setIsTimerRunning: () => {},
  xp: 0,
  setXp: () => {},
  currentStreak: 0,
  setCurrentStreak: () => {},
};

const StudyFlowContext = createContext<StudyFlowContextType | null>(null);

export const StudyFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'STUDENT',
    level: 1,
    character: 'PIXEL',
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [xp, setXp] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  return (
    <StudyFlowContext.Provider
      value={{
        profile,
        setProfile,
        isTimerRunning,
        setIsTimerRunning,
        xp,
        setXp,
        currentStreak,
        setCurrentStreak,
      }}
    >
      {children}
    </StudyFlowContext.Provider>
  );
};

export const useStudyFlow = (): StudyFlowContextType => {
  const context = useContext(StudyFlowContext);
  if (!context) {
    // Return safe fallback defaults if hook is used outside provider
    return defaultState;
  }
  return context;
};