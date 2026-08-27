const PROFILES_KEY = 'studyflow_retro_profiles';
const ACTIVE_PROFILE_KEY = 'studyflow_retro_active_id';

export const getProfiles = () => {
  const data = localStorage.getItem(PROFILES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProfiles = (profiles) => {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
};

export const getActiveProfileId = () => {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || null;
};

export const setActiveProfileId = (id) => {
  if (id) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
  }
};

export const getProfileData = (profileId) => {
  const data = localStorage.getItem(`studyflow_game_data_${profileId}`);
  return data ? JSON.parse(data) : null;
};

export const saveProfileData = (profileId, data) => {
  localStorage.setItem(`studyflow_game_data_${profileId}`, JSON.stringify(data));
};

export const createInitialProfileData = (profile) => ({
  studyTimeSeconds: 152280, // 42h 18m
  sessions: 27,
  streak: 7,
  xp: 780,
  level: 4,
  notes: [
    { id: '1', title: 'README.TXT', content: 'Welcome to StudyFlow.EXE!\nComplete quests to gain XP and level up your player avatar.', date: '2026-08-12' },
    { id: '2', title: 'DSA_PATTERNS.TXT', content: '1. Two Pointers\n2. Sliding Window\n3. Fast & Slow Pointers\n4. Monotonic Stack', date: '2026-08-12' }
  ],
  tasks: [
    { id: '101', text: 'Complete Two Pointer Practice', category: 'DSA', difficulty: 'HARD', completed: false, xpReward: 50, dueDate: '2026-08-12' },
    { id: '102', text: 'Finish React Dashboard', category: 'WEB DEV', difficulty: 'MEDIUM', completed: false, xpReward: 75, dueDate: '2026-08-12' },
    { id: '103', text: 'Revise C++ Templates', category: 'C++', difficulty: 'EASY', completed: true, xpReward: 40, dueDate: '2026-08-11' },
    { id: '104', text: 'Read AI Research Article', category: 'AI / ML', difficulty: 'MEDIUM', completed: false, xpReward: 60, dueDate: '2026-08-13' }
  ],
  events: [
    { id: 'e1', title: 'Math Quiz', date: '2026-08-14', type: 'EXAM' },
    { id: 'e2', title: 'DSA Contest', date: '2026-08-16', type: 'QUEST' },
    { id: 'e3', title: 'Web Project Due', date: '2026-08-20', type: 'DEADLINE' }
  ]
});