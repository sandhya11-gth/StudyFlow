import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

const SUBJECT_TAGS = {
  'DSA': 'bg-pastel-lavender/60 text-pastel-purple border-pastel-purple/40',
  'Frontend': 'bg-pastel-pink/60 text-pastel-purple border-pastel-purple/40',
  'C++': 'bg-pastel-peach/60 text-pastel-purple border-pastel-purple/40',
  'AI / ML': 'bg-pastel-sage/60 text-pastel-purple border-pastel-purple/40',
  'Other': 'bg-pastel-yellow/60 text-pastel-purple border-pastel-purple/40',
};

function formatDuration(totalMins) {
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

export default function StudySessions() {
  const { sessions, addStudySession, deleteStudySession, totalStudyTimeMinutes, totalSessionCount } = useStudyFlow();
  const [isAdding, setIsAdding] = useState(false);

  const [subject, setSubject] = useState('DSA');
  const [topic, setTopic] = useState('');
  const [dateStr, setDateStr] = useState('12 AUG');
  const [durationInput, setDurationInput] = useState('60');

  const formattedTotalTime = formatDuration(totalStudyTimeMinutes);

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addStudySession({
      date: dateStr.toUpperCase(),
      subject,
      topic: topic.trim(),
      minutes: durationInput,
    });

    setTopic('');
    setDurationInput('60');
    setIsAdding(false);
  };

  return (
    <section className="w-full max-w-3xl px-2">
      <div className="relative bg-white/90 border-2 border-pastel-purple p-5 sm:p-7 shadow-[5px_5px_0px_0px_#70536d] rotate-[-0.2deg] mb-6">
        <div className="absolute -top-3 left-8 w-20 h-5 bg-pastel-pink/80 border border-pastel-purple/30 rotate-[-2deg] pointer-events-none" />
        <span className="absolute top-4 right-5 text-xl select-none">🌸</span>

        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-pastel-purple">
            STUDY SESSIONS
          </h1>
          <span className="text-sm">✨</span>
        </div>
        <p className="font-pixel text-xs text-pastel-subtext">
          little logs of everything you've learned ♡
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-pastel-pink/50 border-2 border-pastel-purple p-3.5 shadow-[3px_3px_0px_0px_#70536d] rotate-[-0.5deg]">
          <span className="font-pixel text-[10px] text-pastel-purple font-bold tracking-wider block mb-1">
            TOTAL STUDY TIME
          </span>
          <span className="font-pixel text-xl sm:text-2xl font-bold text-pastel-text">
            {formattedTotalTime}
          </span>
        </div>

        <div className="bg-pastel-sage/50 border-2 border-pastel-purple p-3.5 shadow-[3px_3px_0px_0px_#70536d] rotate-[0.5deg]">
          <span className="font-pixel text-[10px] text-pastel-purple font-bold tracking-wider block mb-1">
            THIS WEEK
          </span>
          <span className="font-pixel text-xl sm:text-2xl font-bold text-pastel-text">
            {formattedTotalTime}
          </span>
        </div>

        <div className="bg-pastel-peach/50 border-2 border-pastel-purple p-3.5 shadow-[3px_3px_0px_0px_#70536d] rotate-[-0.5deg]">
          <span className="font-pixel text-[10px] text-pastel-purple font-bold tracking-wider block mb-1">
            SESSIONS
          </span>
          <span className="font-pixel text-xl sm:text-2xl font-bold text-pastel-text">
            {totalSessionCount}
          </span>
        </div>
      </div>

      <div className="relative bg-white/90 border-2 border-pastel-purple p-5 sm:p-7 shadow-[5px_5px_0px_0px_#70536d]">
        <div className="flex items-center justify-between border-b-2 border-dashed border-pastel-purple/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-pastel-purple text-base">📖</span>
            <h2 className="font-pixel text-lg font-bold text-pastel-purple">
              STUDY LOG
            </h2>
          </div>

          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-3 py-1.5 bg-pastel-pink border border-pastel-purple font-pixel text-xs font-bold text-pastel-purple shadow-[2px_2px_0px_0px_#70536d] hover:bg-pastel-cream transition-colors cursor-pointer"
            >
              + LOG STUDY SESSION
            </button>
          )}
        </div>

        {isAdding && (
          <form onSubmit={handleAddSession} className="bg-pastel-cream border-2 border-pastel-purple p-4 mb-5 space-y-3">
            <div className="flex items-center justify-between border-b border-pastel-purple/20 pb-2">
              <span className="font-pixel text-xs font-bold text-pastel-purple">
                NEW STUDY LOG ENTRY
              </span>
              <span className="text-xs">✏️</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-pixel text-[10px] text-pastel-purple mb-1">SUBJECT</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-pastel-purple px-2 py-1.5 text-xs font-pixel text-pastel-purple focus:outline-none"
                >
                  <option value="DSA">DSA</option>
                  <option value="Frontend">Frontend</option>
                  <option value="C++">C++</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-pastel-purple mb-1">DATE</label>
                <input
                  type="text"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  placeholder="e.g. 12 AUG"
                  className="w-full bg-white border border-pastel-purple px-2 py-1.5 text-xs font-body text-pastel-text focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-pixel text-[10px] text-pastel-purple mb-1">TOPIC / NOTES</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What did you study?"
                autoFocus
                className="w-full bg-white border border-pastel-purple px-2 py-1.5 text-xs font-body text-pastel-text focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-pixel text-[10px] text-pastel-purple mb-1">DURATION (MINUTES)</label>
              <input
                type="number"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                min="1"
                className="w-full bg-white border border-pastel-purple px-2 py-1.5 text-xs font-body text-pastel-text focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 bg-white border border-pastel-purple/60 text-xs font-pixel text-pastel-subtext cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-pastel-pink border border-pastel-purple text-xs font-pixel font-bold text-pastel-purple shadow-[1px_1px_0px_0px_#70536d] cursor-pointer"
              >
                SAVE SESSION
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {sessions.map((sess) => {
            const badgeClass = SUBJECT_TAGS[sess.subject] || 'bg-pastel-yellow/60 text-pastel-purple border-pastel-purple/40';

            return (
              <div
                key={sess.id}
                className="flex items-center justify-between gap-3 p-3 bg-white border border-pastel-purple/30 hover:border-pastel-purple/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-lg select-none">{sess.icon}</span>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-pixel text-xs font-bold text-pastel-purple">
                        {sess.date}
                      </span>
                      <span className={`px-1.5 py-0.2 border text-[9px] font-pixel font-semibold tracking-wider rounded ${badgeClass}`}>
                        {sess.subject}
                      </span>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-pastel-text truncate mt-0.5">
                      {sess.topic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-pixel text-xs text-pastel-purple font-bold bg-pastel-cream px-2 py-1 border border-pastel-purple/30">
                    {formatDuration(sess.minutes)}
                  </span>

                  <button
                    onClick={() => deleteStudySession(sess.id)}
                    title="Delete session log"
                    className="w-5 h-5 flex items-center justify-center text-pastel-subtext hover:text-pastel-peach text-xs font-pixel cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          {sessions.length === 0 && (
            <p className="text-center font-pixel text-xs text-pastel-subtext py-6">
              no study sessions recorded yet! ♡
            </p>
          )}
        </div>
      </div>
    </section>
  );
}