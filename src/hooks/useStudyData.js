import { useEffect, useMemo, useState } from 'react';

const blank = { subjects: [], quests: [], events: [], sessions: [], activity: [], theme: 'light' };
const safeLoad = () => { try { return { ...blank, ...JSON.parse(localStorage.getItem('studyflow-product-v2')) }; } catch { return blank; } };
const day = (date = new Date()) => new Date(date).toISOString().slice(0, 10);

export function useStudyData() {
  const [data, setData] = useState(safeLoad);
  useEffect(() => localStorage.setItem('studyflow-product-v2', JSON.stringify(data)), [data]);
  const update = (key, value) => setData(current => ({ ...current, [key]: typeof value === 'function' ? value(current[key]) : value }));
  const log = (text) => update('activity', items => [{ id: crypto.randomUUID(), text, date: new Date().toISOString() }, ...items].slice(0, 12));
  const addSubject = (subject) => { const item = { id: crypto.randomUUID(), ...subject, createdAt: new Date().toISOString() }; update('subjects', list => [...list, item]); log('NEW SUBJECT: ' + subject.name.toUpperCase()); return item; };
  const addQuest = (quest) => { const item = { id: crypto.randomUUID(), status: 'todo', createdAt: new Date().toISOString(), ...quest }; update('quests', list => [...list, item]); log('NEW QUEST: ' + quest.title); return item; };
  const saveQuest = (quest) => update('quests', list => list.map(item => item.id === quest.id ? quest : item));
  const completeQuest = (id) => { let wasComplete = false; update('quests', list => list.map(item => { if (item.id !== id) return item; wasComplete = item.status === 'complete'; return { ...item, status: wasComplete ? 'todo' : 'complete', completedAt: wasComplete ? null : new Date().toISOString() }; })); if (!wasComplete) log('QUEST COMPLETED +10 XP'); return !wasComplete; };
  const addEvent = (event) => { const item = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...event }; update('events', list => [...list, item]); log('EVENT PLANNED: ' + event.title); return item; };
  const saveEvent = (event) => update('events', list => list.map(item => item.id === event.id ? event : item));
  const recordSession = (session) => { const item = { id: crypto.randomUUID(), completedAt: new Date().toISOString(), ...session }; update('sessions', list => [...list, item]); log('FOCUS SESSION COMPLETE +25 XP'); return item; };
  const stats = useMemo(() => {
    const today = day(), completed = data.quests.filter(q => q.status === 'complete'), todaySessions = data.sessions.filter(s => day(s.completedAt) === today);
    const xp = completed.length * 10 + data.sessions.length * 25;
    const activeDays = [...new Set([...completed.map(q => q.completedAt), ...data.sessions.map(s => s.completedAt)].filter(Boolean).map(day))].sort().reverse();
    let streak = 0, cursor = new Date(); while (activeDays.includes(day(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
    const currentWeek = new Date(); currentWeek.setDate(currentWeek.getDate() - 6);
    return { completed: completed.length, remaining: data.quests.filter(q => q.status !== 'complete').length, todayMinutes: todaySessions.reduce((n, s) => n + s.minutes, 0), weekMinutes: data.sessions.filter(s => new Date(s.completedAt) >= currentWeek).reduce((n, s) => n + s.minutes, 0), xp, level: Math.floor(xp / 500) + 1, streak, sessions: data.sessions.length, rate: data.quests.length ? Math.round(completed.length / data.quests.length * 100) : 0 };
  }, [data.quests, data.sessions]);
  return { data, update, addSubject, addQuest, saveQuest, completeQuest, addEvent, saveEvent, recordSession, stats };
}
