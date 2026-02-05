
import React, { useState, useEffect } from 'react';

interface Note {
  id: number;
  text: string;
  rotation: number;
  color: string;
}

const COLORS = [
  'bg-yellow-100', 'bg-blue-100', 'bg-pink-100', 'bg-green-100', 'bg-purple-100'
];

const LoveNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('loveNotes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('loveNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!inputValue.trim()) return;
    const newNote: Note = {
      id: Date.now(),
      text: inputValue,
      rotation: Math.random() * 10 - 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    setNotes([...notes, newNote]);
    setInputValue('');
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-romantic font-bold text-rose-600 mb-2">Our Secret Board</h2>
        <p className="text-gray-500">Leave a tiny note for us to remember...</p>
      </div>

      <div className="flex gap-4 mb-12 max-w-lg mx-auto">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Write a tiny love note..."
          className="flex-1 px-6 py-3 rounded-2xl border-2 border-pink-50 focus:border-pink-300 outline-none transition-all shadow-sm"
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
        />
        <button 
          onClick={addNote}
          className="bg-pink-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-pink-600 transition-all"
        >
          Post
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {notes.length === 0 && (
          <div className="text-gray-300 italic">No notes yet... be the first to write one!</div>
        )}
        {notes.map((note) => (
          <div 
            key={note.id}
            className={`${note.color} p-6 w-48 min-h-[150px] shadow-lg relative group transition-transform hover:scale-110`}
            style={{ transform: `rotate(${note.rotation}deg)` }}
          >
            <button 
              onClick={() => deleteNote(note.id)}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
            >
              ×
            </button>
            <p className="text-gray-700 font-medium font-romantic text-xl leading-snug">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveNotes;
