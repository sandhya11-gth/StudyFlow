import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const TYPE_COLORS = {
  Study: 'bg-pastel-pink/70 text-pastel-purple border-pastel-purple/40',
  Assignment: 'bg-pastel-yellow/70 text-pastel-purple border-pastel-purple/40',
  Exam: 'bg-pastel-peach/70 text-pastel-purple border-pastel-purple/40',
  Personal: 'bg-pastel-lavender/70 text-pastel-purple border-pastel-purple/40',
  Other: 'bg-pastel-sage/70 text-pastel-purple border-pastel-purple/40',
};

const TYPE_ICONS = {
  Study: '🌸',
  Assignment: '📝',
  Exam: '⚡',
  Personal: '☕',
  Other: '✦',
};

export default function Calendar() {
  const {
    tasks = [],
    calendarEvents = [],
    toggleTask,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
  } = useStudyFlow();

  const realToday = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [eventType, setEventType] = useState('Study');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const formatIsoDate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const selectedIsoDate = formatIsoDate(selectedDate);
  const realTodayIsoDate = formatIsoDate(realToday);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const handleOpenAddForm = () => {
    setEditingEventId(null);
    setEventTitle('');
    setEventDate(selectedIsoDate);
    setStartTime('10:00');
    setEndTime('11:00');
    setEventType('Study');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (evt) => {
    setEditingEventId(evt.id);
    setEventTitle(evt.title);
    setEventDate(evt.date);
    setStartTime(evt.startTime || '10:00');
    setEndTime(evt.endTime || '11:00');
    setEventType(evt.type || 'Study');
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    if (editingEventId) {
      updateCalendarEvent(editingEventId, {
        title: eventTitle.trim(),
        date: eventDate,
        startTime,
        endTime,
        type: eventType,
      });
    } else {
      addCalendarEvent({
        title: eventTitle.trim(),
        date: eventDate,
        startTime,
        endTime,
        type: eventType,
      });
    }

    setIsFormOpen(false);
  };

  const dayTasks = tasks.filter((t) => t.dueDate === selectedIsoDate);
  const dayEvents = calendarEvents.filter((e) => e.date === selectedIsoDate);

  const formattedDayTitle = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Side: Monthly Calendar Grid View */}
        <div className="lg:col-span-7 bg-white/90 border-2 border-pastel-purple p-4 sm:p-6 shadow-[5px_5px_0px_0px_#70536d] rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-dashed border-pastel-purple/20 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-pastel-pink text-base select-none">✿</span>
              <h2 className="font-pixel text-lg sm:text-2xl font-bold text-pastel-purple tracking-wider">
                {monthNames[month]} {year}
              </h2>
              <span className="text-pastel-pink text-base select-none">✿</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToday}
                className="px-2.5 py-1 bg-pastel-yellow border border-pastel-purple text-xs font-pixel text-pastel-purple shadow-[1px_1px_0px_0px_#70536d] hover:bg-pastel-cream cursor-pointer"
              >
                TODAY
              </button>
              <div className="flex gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="px-2 py-1 bg-white border border-pastel-purple text-pastel-purple font-pixel text-xs font-bold shadow-[1px_1px_0px_0px_#70536d] hover:bg-pastel-cream cursor-pointer"
                >
                  ◀
                </button>
                <button
                  onClick={handleNextMonth}
                  className="px-2 py-1 bg-white border border-pastel-purple text-pastel-purple font-pixel text-xs font-bold shadow-[1px_1px_0px_0px_#70536d] hover:bg-pastel-cream cursor-pointer"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="font-pixel text-[10px] sm:text-xs text-pastel-purple font-bold">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-11 sm:h-14 bg-transparent" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateObj = new Date(year, month, dayNum);
              const isoKey = formatIsoDate(dateObj);

              const isSelected = selectedIsoDate === isoKey;
              const isToday = realTodayIsoDate === isoKey;

              const hasTasks = tasks.some((t) => t.dueDate === isoKey);
              const hasEvents = calendarEvents.some((e) => e.date === isoKey);

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDate(dateObj)}
                  className={`
                    relative h-11 sm:h-14 border text-xs sm:text-sm font-pixel flex flex-col items-center justify-between p-1 transition-all cursor-pointer select-none rounded
                    ${
                      isSelected
                        ? 'bg-pastel-pink border-2 border-pastel-purple text-pastel-purple font-bold shadow-[2px_2px_0px_0px_#70536d] z-10 scale-[1.02]'
                        : isToday
                        ? 'bg-pastel-yellow border-2 border-pastel-purple text-pastel-purple font-bold'
                        : 'bg-white border-pastel-purple/20 text-pastel-text hover:bg-pastel-cream'
                    }
                  `}
                >
                  <span className="self-start text-[11px] font-bold">{dayNum}</span>
                  
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {hasTasks && <span className="text-[10px] leading-none text-pastel-purple">🌸</span>}
                    {hasEvents && <span className="text-[10px] leading-none text-pastel-purple">📌</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-pixel text-pastel-subtext mt-4 pt-3 border-t border-pastel-purple/20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">🌸 Quests</span>
              <span className="flex items-center gap-1">📌 Study Plans</span>
            </div>
            <span>{selectedIsoDate}</span>
          </div>
        </div>

        {/* Right Side: Selected Day Planner */}
        <div className="lg:col-span-5 bg-pastel-cream/90 border-2 border-pastel-purple p-4 sm:p-6 shadow-[5px_5px_0px_0px_#70536d] rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-dashed border-pastel-purple/20 pb-3 mb-4">
              <div>
                <span className="font-pixel text-[10px] text-pastel-subtext uppercase tracking-wider block">DAY PLAN</span>
                <h3 className="font-pixel text-sm sm:text-base font-bold text-pastel-purple">
                  📌 {formattedDayTitle}
                </h3>
              </div>

              <button
                onClick={handleOpenAddForm}
                className="px-2.5 py-1 bg-pastel-pink border border-pastel-purple text-xs font-pixel font-bold text-pastel-purple shadow-[1px_1px_0px_0px_#70536d] hover:bg-white cursor-pointer"
              >
                + ADD TO PLAN
              </button>
            </div>

            {isFormOpen && (
              <form onSubmit={handleFormSubmit} className="bg-white border-2 border-pastel-purple p-3.5 rounded mb-4 shadow-[2px_2px_0px_0px_#70536d] space-y-2.5">
                <div className="flex justify-between items-center border-b border-pastel-purple/20 pb-1.5">
                  <span className="font-pixel text-xs font-bold text-pastel-purple">
                    {editingEventId ? '✏️ EDIT PLAN' : '🌸 NEW STUDY PLAN'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-xs font-pixel text-pastel-subtext hover:text-pastel-purple cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block font-pixel text-[9px] text-pastel-purple mb-0.5">TITLE</label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Plan title or session goal..."
                    required
                    className="w-full bg-pastel-cream/40 border border-pastel-purple px-2 py-1 text-xs font-body text-pastel-text focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-pixel text-[9px] text-pastel-purple mb-0.5">DATE</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-pastel-cream/40 border border-pastel-purple px-1.5 py-1 text-xs font-body text-pastel-text focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-pixel text-[9px] text-pastel-purple mb-0.5">TYPE</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-pastel-cream/40 border border-pastel-purple px-1 py-1 text-xs font-pixel text-pastel-purple focus:outline-none cursor-pointer"
                    >
                      <option value="Study">Study</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Exam">Exam</option>
                      <option value="Personal">Personal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-pixel text-[9px] text-pastel-purple mb-0.5">START TIME</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-pastel-cream/40 border border-pastel-purple px-1.5 py-1 text-xs font-body text-pastel-text focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-pixel text-[9px] text-pastel-purple mb-0.5">END TIME</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-pastel-cream/40 border border-pastel-purple px-1.5 py-1 text-xs font-body text-pastel-text focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-2.5 py-1 bg-white border border-pastel-purple/50 text-[11px] font-pixel text-pastel-subtext cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-pastel-pink border border-pastel-purple text-[11px] font-pixel font-bold text-pastel-purple shadow-[1px_1px_0px_0px_#70536d] cursor-pointer"
                  >
                    SAVE TO PLAN
                  </button>
                </div>
              </form>
            )}

            <div className="mb-4">
              <h4 className="font-pixel text-xs font-bold text-pastel-purple mb-2 flex items-center gap-1">
                <span>🌸</span> TASKS FOR THIS DAY ({dayTasks.length})
              </h4>
              <div className="space-y-1.5">
                {dayTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={`flex items-center gap-2 p-2 bg-white border border-pastel-purple/30 rounded cursor-pointer transition-colors ${
                      t.completed ? 'opacity-60 bg-white/50' : 'hover:border-pastel-purple'
                    }`}
                  >
                    <button className="w-4 h-4 border border-pastel-purple flex items-center justify-center text-xs font-pixel text-pastel-purple bg-pastel-pink/20">
                      {t.completed ? '✓' : ''}
                    </button>
                    <span className={`font-body text-xs text-pastel-text flex-1 ${t.completed ? 'line-through text-pastel-subtext' : ''}`}>
                      [{t.subject}] {t.title}
                    </span>
                  </div>
                ))}
                {dayTasks.length === 0 && (
                  <p className="font-pixel text-[11px] text-pastel-subtext italic">
                    no tasks scheduled for this date.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-pixel text-xs font-bold text-pastel-purple mb-2 flex items-center gap-1">
                <span>📌</span> STUDY PLANS & EVENTS ({dayEvents.length})
              </h4>
              <div className="space-y-2">
                {dayEvents.map((evt) => {
                  const typeStyle = TYPE_COLORS[evt.type] || TYPE_COLORS.Other;
                  const typeIcon = TYPE_ICONS[evt.type] || '✦';

                  return (
                    <div
                      key={evt.id}
                      className="flex items-center justify-between p-2 bg-white border border-pastel-purple/40 rounded"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{typeIcon}</span>
                          <span className="font-body text-xs font-medium text-pastel-text truncate">
                            {evt.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[9px] font-pixel px-1.5 py-0.5 border rounded ${typeStyle}`}>
                            {evt.type}
                          </span>
                          <span className="font-pixel text-[10px] text-pastel-subtext">
                            ⏰ {evt.startTime} - {evt.endTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => handleOpenEditForm(evt)}
                          title="Edit Event"
                          className="px-1.5 py-0.5 bg-white border border-pastel-purple/40 text-[10px] font-pixel text-pastel-purple hover:bg-pastel-cream cursor-pointer"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteCalendarEvent(evt.id)}
                          title="Delete Event"
                          className="px-1.5 py-0.5 text-pastel-subtext hover:text-pastel-peach text-xs font-pixel cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
                {dayEvents.length === 0 && (
                  <p className="font-pixel text-[11px] text-pastel-subtext italic">
                    no study plans added for this date yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-pastel-purple/20 text-center">
            <span className="font-pixel text-[10px] text-pastel-subtext">
              ✨ click any date to view or add daily study plans
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}