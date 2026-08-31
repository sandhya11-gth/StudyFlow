export const QUEST_XP = 10;
export const SESSION_XP = 25;
export const TASK_REWARDS = { High: 80, Medium: 50, Low: 30 };

const LEVEL_XP = 500;

export const getLevelFromXP = (xp) => Math.floor(Math.max(0, xp || 0) / LEVEL_XP) + 1;
export const getXPForNextLevel = (level) => Math.max(1, level) * LEVEL_XP;
export const getLevelProgress = (xp) => (Math.max(0, xp || 0) % LEVEL_XP) / LEVEL_XP * 100;
export const taskRewardFor = (priority) => TASK_REWARDS[priority] || TASK_REWARDS.Medium;