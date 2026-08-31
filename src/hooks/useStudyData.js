import { useEffect, useMemo, useState } from 'react';
import { getLevelFromXP, getLevelProgress, QUEST_XP, SESSION_XP, taskRewardFor } from '../utils/xp.js';

const blank = { profile: { name: 'SANDHYA' }, subjects: [], quests: [], tasks: [], events: [], sessions: [], activity: [], theme: 'dark' };
const safeLoad = () => { try { return { ...blank, profile: { ...blank.profile, ...(JSON.parse(localStorage.getItem('studyflow-product-v2')) || {}).profile }, ...JSON.parse(localStorage.getItem('studyflow-product-v2')) }; } catch { return blank; } };
const day = (date = new Date()) => new Date(date).toISOString().slice(0, 10);

export function useStudyData() {
  const [data, setData] = useState(safeLoad);
  useEffect(() => localStorage.setItem('studyflow-product-v2', JSON.stringify(data)), [data]);
  const update = (key, value) => setData(current => ({ ...current, [key]: typeof value === 'function' ? value(current[key]) : value }));
  const log = (text) => update('activity', items => [{ id: crypto.randomUUID(), text, date: new Date().toISOString() }, ...items].slice(0, 12));
  const addSubject = (subject) => { const item = { id: crypto.randomUUID(), ...subject, createdAt: new Date().toISOString() }; update('subjects', list => [...list, item]); log('NEW SUBJECT: ' + subject.name.toUpperCase()); return item; };
  const addQuest = (quest) => { const item = { id: crypto.randomUUID(), status: 'todo', track: 'checklist', target: 1, createdAt: new Date().toISOString(), ...quest }; update('quests', list => [...list, item]); log('NEW QUEST: ' + quest.title); return item; };
  const saveQuest = (quest) => update('quests', list => list.map(item => item.id === quest.id ? quest : item));
  const completeQuest = (id) => { let wasComplete = false; update('quests', list => list.map(item => { if (item.id !== id) return item; wasComplete = item.status === 'complete'; return { ...item, status: wasComplete ? 'todo' : 'complete', completedAt: wasComplete ? null : new Date().toISOString() }; })); if (!wasComplete) log('QUEST COMPLETED +' + QUEST_XP + ' XP'); return !wasComplete; };
  const addEvent = (event) => { const item = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...event }; update('events', list => [...list, item]); log('EVENT PLANNED: ' + event.title); return item; };
  const saveEvent = (event) => update('events', list => list.map(item => item.id === event.id ? event : item));
  const recordSession = (session) => { const item = { id: crypto.randomUUID(), completedAt: new Date().toISOString(), ...session }; update('sessions', list => [...list, item]); log('FOCUS SESSION COMPLETE +' + SESSION_XP + ' XP'); return item; };
  const addTask = (task) => { const item = { id: crypto.randomUUID(), title: task.title, description: task.description || '', subjectId: task.subjectId || task.subject || '', date: task.date || day(), time: task.time || '', priority: task.priority || 'Medium', completed: false, completedAt: null, xpReward: taskRewardFor(task.priority || 'Medium'), createdAt: new Date().toISOString() }; update('tasks', list => [...list, item]); log('NEW TASK: ' + item.title); return item; };
  const saveTask = (id, fields) => update('tasks', list => list.map(item => item.id === id ? { ...item, ...fields } : item));
  const toggleTask = (id) => { const task = data.tasks.find(t => t.id === id); if (!task) return false; const done = !task.completed; update('tasks', list => list.map(item => item.id === id ? { ...item, completed: done, completedAt: done ? new Date().toISOString() : null } : item)); log(done ? ('TASK COMPLETE +' + (task.xpReward || 0) + ' XP') : 'TASK REOPENED: ' + task.title); return done; };
  const deleteTask = (id) => { const task = data.tasks.find(t => t.id === id); update('tasks', list => list.filter(item => item.id !== id)); if (task) log('TASK DELETED: ' + task.title); };
  const setProfile = (patch) => update('profile', p => ({ ...p, ...patch }));
  const stats = useMemo(() => {
    const today = day(), completed = data.quests.filter(q => q.status === 'complete'), tasksDone = data.tasks.filter(t => t.completed), tasksToday = data.tasks.filter(t => t.date === today), todaySessions = data.sessions.filter(s => day(s.completedAt) === today);
    const xp = completed.length * QUEST_XP + tasksDone.reduce((n, t) => n + (t.xpReward || 0), 0) + data.sessions.length * SESSION_XP;
    const activeDates = [...new Set([...completed.map(q => q.completedAt), ...tasksDone.map(t => t.completedAt), ...data.sessions.map(s => s.completedAt)].filter(Boolean).map(day))].sort().reverse();
    let streak = 0, cursor = new Date(); while (activeDates.includes(day(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
    const currentWeek = new Date(); currentWeek.setDate(currentWeek.getDate() - 6);
    const week7 = [];
    { const base = new Date(); for (let i = 6; i >= 0; i -= 1) { const d = new Date(base); d.setDate(d.getDate() - i); const key = day(d); week7.push({ key, today: key === today, active: activeDates.includes(key) }); } }
    const level = getLevelFromXP(xp);
    return { completed: completed.length, remaining: data.quests.filter(q => q.status !== 'complete').length, tasksToday: tasksToday.length, tasksTodayDone: tasksToday.filter(t => t.completed).length, tasksTodayRemaining: tasksToday.filter(t => !t.completed).length, tasksDone: tasksDone.length, todayMinutes: todaySessions.reduce((n, s) => n + s.minutes, 0), weekMinutes: data.sessions.filter(s => new Date(s.completedAt) >= currentWeek).reduce((n, s) => n + s.minutes, 0), xp, level, levelProgress: getLevelProgress(xp), streak, week7, sessions: data.sessions.length, rate: data.quests.length ? Math.round(completed.length / data.quests.length * 100) : 0 };
  }, [data.quests, data.sessions, data.tasks]);
  const questProgress = useMemo(() => {
    const map = {};
    for (const q of data.quests) {
      const track = q.track || 'checklist';
      let done; let target = track === 'checklist' ? 1 : Math.max(1, q.target || 1);
      if (track === 'tasks') done = data.tasks.filter(t => t.completed && (!q.subjectId || t.subjectId === q.subjectId)).length;
      else if (track === 'sessions') done = data.sessions.filter(s => !q.subjectId || s.subjectId === q.subjectId).length;
      else if (track === 'streak') done = stats.streak;
      else done = q.status === 'complete' ? 1 : 0;
      map[q.id] = { track, done, target, pct: Math.min(100, Math.round(done / target * 100)) };
    }
    return map;
  }, [data.quests, data.tasks, data.sessions, stats.streak]);
  return { data, update, addSubject, addQuest, saveQuest, completeQuest, addEvent, saveEvent, recordSession, addTask, saveTask, toggleTask, deleteTask, setProfile, stats, questProgress };
}