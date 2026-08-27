import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const CalendarView = () => {
  const { events, tasks, addEvent, deleteEvent } = useStudyFlow();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // New Event Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [type, setType] = useState('Study');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addEvent({ title, date: selectedDate, time, type });
    setTitle('');
    setShowAddModal(false);
  };

  const selectedDateEvents = events.filter(e => e.date === selectedDate);
  const selectedDateTasks = tasks.filter(t => t.dueDate === selectedDate);

  return (
    <div className="space-y-4">
      {/* Calendar Bar */}
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={handlePrevMonth} className="font-press-start text-xs bg-white border border-[#34263f] px-2 py-1">
            &lt;
          </button>
          <span className="font-press-start text-sm text-[#34263f]">
            {monthNames[month]} {year}
          </span>
          <button onClick={handleNextMonth} className="font-press-start text-xs bg-white border border-[#34263f] px-2 py-1">
            &gt;
          </button>
        </div>
        <button onClick={handleToday} className="font-vt323 text-sm bg-[#34263f] text-white px-3 py-1">
          TODAY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Month Grid */}
        <div className="lg:col-span-8 bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
          <div className="grid grid-cols-7 gap-1 text-center font-press-start text-[10px] mb-2 text-[#34263f]">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[60px] bg-[#dfd3e6]/50 border border-transparent" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;
              const dayEvents = events.filter(e => e.date === dateStr);

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`min-h-[60px] p-1 border cursor-pointer flex flex-col justify-between transition-all ${
                    isSelected ? 'border-2 border-[#22162b] bg-white font-bold' : 'border-[#34263f] bg-white/70'
                  } ${isToday ? 'bg-yellow-100' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-press-start text-[10px]">{dayNum}</span>
                    {isToday && <span className="text-[9px] bg-[#34263f] text-white px-1">TODAY</span>}
                  </div>

                  {dayEvents.length > 0 && (
                    <div className="space-y-0.5 mt-1">
                      {dayEvents.slice(0, 2).map(ev => (
                        <div key={ev.id} className="text-[10px] bg-[#34263f] text-white px-1 truncate">
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] text-[#645273] font-bold">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda Side Panel */}
        <div className="lg:col-span-4 bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3 pb-1 border-b border-[#34263f]">
              <h2 className="font-press-start text-xs text-[#34263f]">AGENDA: {selectedDate}</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="font-vt323 text-xs bg-[#34263f] text-white px-2 py-0.5"
              >
                + EVENT
              </button>
            </div>

            {/* Modal for Event Creation */}
            {showAddModal && (
              <form onSubmit={handleAddSubmit} className="bg-white border border-[#34263f] p-2 mb-3 space-y-2">
                <input
                  type="text"
                  placeholder="Event Title..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full border border-[#34263f] p-1 text-sm focus:outline-none font-vt323"
                  autoFocus
                />
                <div className="flex gap-2 font-vt323">
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="border border-[#34263f] p-1 text-xs"
                  />
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="border border-[#34263f] p-1 text-xs bg-[#ecdcf2]"
                  >
                    <option value="Study">Study</option>
                    <option value="Exam">Exam</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 font-vt323">
                  <button type="button" onClick={() => setShowAddModal(false)} className="text-xs px-2 py-1 bg-[#dfd3e6]">
                    CANCEL
                  </button>
                  <button type="submit" className="text-xs px-2 py-1 bg-[#34263f] text-white">
                    SAVE
                  </button>
                </div>
              </form>
            )}

            {/* Scheduled Items List */}
            <div className="space-y-3">
              <div>
                <span className="font-press-start text-[10px] text-[#34263f] block mb-1">EVENTS</span>
                {selectedDateEvents.length === 0 ? (
                  <p className="font-vt323 text-xs text-[#645273] italic">No events for this date.</p>
                ) : (
                  <div className="space-y-1">
                    {selectedDateEvents.map(ev => (
                      <div key={ev.id} className="bg-white border border-[#34263f] p-1.5 flex justify-between items-center">
                        <div>
                          <div className="font-vt323 text-sm text-[#34263f] font-bold">{ev.title}</div>
                          <div className="font-vt323 text-xs text-[#645273]">{ev.time} • [{ev.type}]</div>
                        </div>
                        <button onClick={() => deleteEvent(ev.id)} className="text-xs text-red-600 px-1 font-bold">
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <span className="font-press-start text-[10px] text-[#34263f] block mb-1">DUE QUESTS</span>
                {selectedDateTasks.length === 0 ? (
                  <p className="font-vt323 text-xs text-[#645273] italic">No tasks due on this date.</p>
                ) : (
                  <div className="space-y-1">
                    {selectedDateTasks.map(t => (
                      <div key={t.id} className="bg-white border border-[#34263f] p-1.5 font-vt323 text-sm text-[#34263f]">
                        {t.completed ? '[X]' : '[ ]'} {t.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};