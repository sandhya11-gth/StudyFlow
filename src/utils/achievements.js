export const ACHIEVEMENTS = [
  { title: 'FIRST QUEST', desc: 'Complete your first quest.', test: (s) => s.completed >= 1 },
  { title: 'QUEST RUSH', desc: 'Complete five quests.', test: (s) => s.completed >= 5 },
  { title: 'FIRST FOCUS', desc: 'Finish a focus session.', test: (s) => s.sessions >= 1 },
  { title: 'FOCUS MASTER', desc: 'Complete ten focus sessions.', test: (s) => s.sessions >= 10 },
  { title: 'ON A ROLL', desc: 'Study three days in a row.', test: (s) => s.streak >= 3 },
  { title: 'LEVEL 5', desc: 'Reach level five.', test: (s) => s.level >= 5 },
  { title: 'LEVEL 10', desc: 'Reach level ten.', test: (s) => s.level >= 10 },
  { title: 'DEEP WORK', desc: 'Complete 25 focus sessions.', test: (s) => s.sessions >= 25 },
];

export const unlockState = (stats) => ACHIEVEMENTS.map((a) => ({ title: a.title, desc: a.desc, unlocked: a.test(stats) }));