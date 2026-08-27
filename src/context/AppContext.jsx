import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DEFAULT_PROFILE = null;

const DEFAULT_QUESTS = [
  { id: '1', title: 'Practice Two Pointer problems', category: 'DSA', xp: 20, completed: false },
  { id: '2', title: 'Revise React hooks', category: 'DEV', xp: 15, completed: false },
  { id: '3', title: 'Complete C++ assignment', category: 'CORE', xp: 25, completed: true },
  { id: '4', title: 'Read AI article', category: 'READING', xp: 10, completed: false }
];

const DEFAULT_UPCOMING = [
  { id: 'u1', title: 'Math Quiz', date: '14 Aug' },
  { id: 'u2', title: 'DSA Contest', date: '16 Aug' },
  { id: 'u3', title: 'Web Project', date: '20 Aug' }
];

export function AppProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('HOME');

  // User Profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studyflow_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // Level & XP State
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('studyflow_xp');
    return saved ? parseInt(saved, 10) : 780;
  });

  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('studyflow_level');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Quests / Tasks
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('studyflow_quests');
    return saved ? JSON.parse(saved) : DEFAULT_QUESTS;
  });

  // Stats
  const [studyMinutes, setStudyMinutes] = useState(() => {
    const saved = localStorage.getItem('studyflow_minutes');
    return saved ? parseInt(saved, 10) : 165; // 2h 45m
  });

  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem('studyflow_sessions');
    return saved ? parseInt(saved, 10) : 6;
  });

  const [streakDays, setStreakDays] = useState(() => {
    const saved = localStorage.getItem('studyflow_streak');
    return saved ? parseInt(saved, 10) : 7;
  });

  // Upcoming Events
  const [upcoming, setUpcoming] = useState(() => {
    const saved = localStorage.getItem('studyflow_upcoming');
    return saved ? JSON.parse(saved) : DEFAULT_UPCOMING;
  });

  // Daily Note
  const [dailyNote, setDailyNote] = useState(() => {
    return localStorage.getItem('studyflow_daily_note') || 
      "Be patient with yourself.\nProgress is progress,\nno matter how small.";
  });

  // Mood Selection (Pixel Art IDs: 'happy', 'focused', 'cozy', 'tired')
  const [mood, setMood] = useState(() => {
    return localStorage.getItem('studyflow_mood') || 'focused';
  });

  // Save changes to LocalStorage
  useEffect(() => {
    if (profile) localStorage.setItem('studyflow_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('studyflow_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('studyflow_level', level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem('studyflow_quests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem('studyflow_minutes', studyMinutes.toString());
  }, [studyMinutes]);

  useEffect(() => {
    localStorage.setItem('studyflow_sessions', completedSessions.toString());
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem('studyflow_daily_note', dailyNote);
  }, [dailyNote]);

  useEffect(() => {
    localStorage.setItem('studyflow_mood', mood);
  }, [mood]);

  // Actions
  const addXP = (amount) => {
    let newXp = xp + amount;
    let newLevel = level;
    if (newXp >= 1000) {
      newLevel += 1;
      newXp = newXp - 1000;
    }
    setXp(newXp);
    setLevel(newLevel);
  };

  const toggleQuest = (id) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === id) {
        const nextState = !quest.completed;
        if (nextState) {
          addXP(quest.xp);
        } else {
          setXp(curr => Math.max(0, curr - quest.xp));
        }
        return { ...quest, completed: nextState };
      }
      return quest;
    }));
  };

  const addQuest = (title, category, xpValue = 20) => {
    if (!title.trim()) return;
    const newQuest = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category.toUpperCase() || 'GENERAL',
      xp: parseInt(xpValue, 10) || 15,
      completed: false
    };
    setQuests(prev => [newQuest, ...prev]);
  };

  const deleteQuest = (id) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  };

  const completeFocusSession = (minutes = 25) => {
    setStudyMinutes(prev => prev + minutes);
    setCompletedSessions(prev => prev + 1);
    addXP(50); // Award 50 XP per pomodoro completion
  };

  const logout = () => {
    localStorage.clear();
    setProfile(null);
  };

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      profile, setProfile, logout,
      xp, level, addXP,
      quests, toggleQuest, addQuest, deleteQuest,
      studyMinutes, completedSessions, streakDays, completeFocusSession,
      upcoming, setUpcoming,
      dailyNote, setDailyNote,
      mood, setMood
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);