import React from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';
import FocusTimerWidget from './FocusTimerWidget';

export function CalendarView() {
  const { tasks } = useStudyFlow();
  return (
    <div className="bg-[#fff9f2] border-2 border-[#5c4358] p-5 rounded-xl shadow-[4px_4px_0px_0px_#5c4358] max-w-4xl space-y-4">
      <h2 className="text-base font-bold text-[#5c4358] border-b-2 border-dashed border-[#5c4358]/20 pb-2">📅 MONTHLY STUDY CALENDAR</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
          <div key={d} className="p-2 bg-[#f4bdcd] border-2 border-[#5c4358] rounded">{d}</div>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <div key={day} className="h-16 p-1 bg-white border-2 border-[#5c4358]/40 rounded text-left text-[10px] flex flex-col justify-between">
            <span className="font-bold">{day}</span>
            {day === 12 && <span className="bg-[#fcebb6] px-1 rounded border border-[#5c4358]/30 font-bold">4 Quests</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TasksView() {
  const { tasks, setTasks } = useStudyFlow();
  return (
    <div className="bg-[#fff9f2] border-2 border-[#5c4358] p-5 rounded-xl shadow-[4px_4px_0px_0px_#5c4358] max-w-4xl space-y-4">
      <h2 className="text-base font-bold text-[#5c4358] border-b-2 border-dashed border-[#5c4358]/20 pb-2">📋 ALL STUDY QUESTS</h2>
      <div className="space-y-2">
        {tasks.map((t) => (
          <div key={t.id} className="p-3 bg-white border-2 border-[#5c4358] rounded-lg flex items-center justify-between text-xs">
            <span className={t.completed ? 'line-through opacity-60' : ''}>{t.title}</span>
            <span className="bg-[#fcebb6] border border-[#5c4358] px-2 py-0.5 rounded text-[10px] font-bold">{t.subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SessionsView() {
  const { sessionsCount, studyMinutes } = useStudyFlow();
  return (
    <div className="bg-[#fff9f2] border-2 border-[#5c4358] p-5 rounded-xl shadow-[4px_4px_0px_0px_#5c4358] max-w-4xl space-y-4">
      <h2 className="text-base font-bold text-[#5c4358] border-b-2 border-dashed border-[#5c4358]/20 pb-2">📖 STUDY SESSIONS LOG</h2>
      <div className="text-xs space-y-2">
        <div className="p-3 bg-white border-2 border-[#5c4358] rounded-lg flex justify-between">
          <span>Total Sessions Completed:</span>
          <span className="font-bold">{sessionsCount}</span>
        </div>
        <div className="p-3 bg-white border-2 border-[#5c4358] rounded-lg flex justify-between">
          <span>Total Minutes Logged:</span>
          <span className="font-bold">{studyMinutes} mins</span>
        </div>
      </div>
    </div>
  );
}

export function FocusView() {
  return (
    <div className="max-w-md mx-auto">
      <FocusTimerWidget />
    </div>
  );
}

export function StatsView() {
  const { xp, level, studyMinutes } = useStudyFlow();
  return (
    <div className="bg-[#fff9f2] border-2 border-[#5c4358] p-5 rounded-xl shadow-[4px_4px_0px_0px_#5c4358] max-w-4xl space-y-4">
      <h2 className="text-base font-bold text-[#5c4358] border-b-2 border-dashed border-[#5c4358]/20 pb-2">📊 STUDY ANALYTICS</h2>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-[#fcd3e1] border-2 border-[#5c4358] rounded-xl font-bold">Total XP: {xp}</div>
        <div className="p-4 bg-[#e2d5f1] border-2 border-[#5c4358] rounded-xl font-bold">Current Level: {level}</div>
        <div className="p-4 bg-[#fcebb6] border-2 border-[#5c4358] rounded-xl font-bold">Study Time: {studyMinutes} mins</div>
        <div className="p-4 bg-[#d4e7d5] border-2 border-[#5c4358] rounded-xl font-bold">Streak: 7 Days</div>
      </div>
    </div>
  );
}

export function NotesView() {
  const { dailyNote, setDailyNote } = useStudyFlow();
  return (
    <div className="bg-[#fff9f2] border-2 border-[#5c4358] p-5 rounded-xl shadow-[4px_4px_0px_0px_#5c4358] max-w-4xl space-y-4">
      <h2 className="text-base font-bold text-[#5c4358] border-b-2 border-dashed border-[#5c4358]/20 pb-2">📝 SCRAPBOOK NOTES</h2>
      <textarea
        value={dailyNote}
        onChange={(e) => setDailyNote(e.target.value)}
        className="w-full h-48 p-3 bg-white border-2 border-[#5c4358] rounded-xl text-xs outline-none"
      />
    </div>
  );
}