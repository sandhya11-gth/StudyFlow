import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export default function Notes() {
  const { notes = [], setNotes } = useStudyFlow();
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const item = {
      id: Date.now(),
      text: newNote.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      color: ['bg-pastel-pink/60', 'bg-pastel-yellow/60', 'bg-pastel-lavender/60', 'bg-pastel-sage/60'][
        notes.length % 4
      ],
    };

    setNotes((prev) => [item, ...prev]);
    setNewNote('');
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Title Header Card */}
      <div className="bg-white border-2 border-pastel-purple p-4 rounded-lg shadow-[4px_4px_0px_0px_#70536d] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-pixel text-lg sm:text-xl font-bold text-pastel-purple flex items-center gap-2">
            <span>📝</span> STUDY MEMOS & QUICK NOTES
          </h2>
          <p className="font-body text-xs text-pastel-text">
            Jot down quick thoughts, formulas, or reminders for your study sessions.
          </p>
        </div>
      </div>

      {/* Note Input Box */}
      <form onSubmit={handleAddNote} className="bg-white border-2 border-pastel-purple p-4 rounded-lg shadow-[4px_4px_0px_0px_#70536d] flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Type a new sticky note memo..."
          className="flex-1 bg-pastel-cream/50 border border-pastel-purple px-3 py-2 font-body text-xs text-pastel-text focus:outline-none rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pastel-pink border-2 border-pastel-purple font-pixel text-xs font-bold text-pastel-purple shadow-[2px_2px_0px_0px_#70536d] hover:bg-white cursor-pointer"
        >
          + ADD NOTE
        </button>
      </form>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color || 'bg-pastel-yellow/60'} border-2 border-pastel-purple p-4 rounded-lg shadow-[3px_3px_0px_0px_#70536d] relative flex flex-col justify-between min-h-[120px]`}
          >
            <p className="font-body text-xs text-pastel-purple font-medium whitespace-pre-wrap">
              {note.text}
            </p>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-pastel-purple/20">
              <span className="font-pixel text-[9px] text-pastel-purple/70">{note.date}</span>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-xs font-pixel text-pastel-purple hover:text-pastel-peach cursor-pointer"
                title="Delete note"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="col-span-full bg-white/60 border-2 border-dashed border-pastel-purple/30 p-8 text-center rounded-lg">
            <p className="font-pixel text-xs text-pastel-subtext italic">
              no sticky notes added yet. create your first note above! 🌸
            </p>
          </div>
        )}
      </div>
    </div>
  );
}