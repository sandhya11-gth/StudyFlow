import React, { useState } from 'react';
import { useStudyFlow } from '../context/StudyFlowContext';

export const NotesView = () => {
  const { notes, addNote, updateNote, deleteNote } = useStudyFlow();
  const [activeNoteId, setActiveNoteId] = useState(notes.length > 0 ? notes[0].id : null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleCreateNew = () => {
    addNote({ title: 'Untitled Note', content: '' });
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] flex justify-between items-center">
        <h1 className="font-press-start text-sm text-[#34263f]">STUDY NOTES</h1>
        <button
          onClick={handleCreateNew}
          className="font-vt323 text-xs bg-[#34263f] text-white px-3 py-1"
        >
          + NEW NOTE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Notes Side Navigation */}
        <div className="md:col-span-4 bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b] space-y-2">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border border-[#34263f] p-1 text-sm font-vt323 bg-white focus:outline-none"
          />

          {filteredNotes.length === 0 ? (
            <div className="text-center py-6">
              <p className="font-vt323 text-sm text-[#645273]">No notes found.</p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
              {filteredNotes.map(n => (
                <div
                  key={n.id}
                  onClick={() => setActiveNoteId(n.id)}
                  className={`p-2 border cursor-pointer font-vt323 ${
                    activeNoteId === n.id
                      ? 'bg-[#34263f] text-white border-[#22162b]'
                      : 'bg-white text-[#34263f] border-[#34263f]'
                  }`}
                >
                  <div className="font-bold text-base truncate">{n.title || 'Untitled Note'}</div>
                  <div className="text-xs opacity-70">{n.updatedDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Note Content Editor Workspace */}
        <div className="md:col-span-8 bg-[#ecdcf2] border-2 border-[#22162b] p-3 shadow-[3px_3px_0px_#22162b]">
          {!activeNote ? (
            <div className="text-center py-16">
              <p className="font-press-start text-xs text-[#34263f] mb-2">NO NOTE SELECTED</p>
              <p className="font-vt323 text-base text-[#645273]">
                Create a note or select one from the sidebar to start writing.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-[#34263f] pb-2">
                <input
                  type="text"
                  value={activeNote.title}
                  onChange={e => updateNote(activeNote.id, { title: e.target.value })}
                  placeholder="Note Title..."
                  className="font-vt323 text-xl font-bold bg-transparent border-b border-transparent hover:border-[#34263f] focus:border-[#34263f] focus:outline-none w-full text-[#34263f]"
                />
                <button
                  onClick={() => {
                    deleteNote(activeNote.id);
                    setActiveNoteId(null);
                  }}
                  className="font-vt323 text-xs bg-red-700 text-white px-2 py-1 ml-2"
                >
                  DELETE
                </button>
              </div>

              <textarea
                value={activeNote.content}
                onChange={e => updateNote(activeNote.id, { content: e.target.value })}
                placeholder="Write your study notes here..."
                className="w-full h-[350px] bg-white border border-[#34263f] p-3 font-vt323 text-base text-[#34263f] focus:outline-none resize-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};