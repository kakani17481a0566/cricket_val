
import React, { useState } from 'react';

const FUNNY_NOTES = [
  "I love you even when the dog steals my spot on the couch.",
  "You're the only person I'd share my last cup of coffee with (if you didn't think it tastes like dirt).",
  "I love you almost as much as a World Cup win in the final over.",
  "You're the 'Third Umpire' of our relationship—you always have the final say.",
  "I'm so glad you're as 'paws-itive' as I am caffeine-addicted.",
  "I love you more than my lucky cricket jersey.",
  "If we were on a sinking ship, I'd give you the life jacket (and the dog can use my bat as a paddle).",
  "You're the best 'catch' I ever made.",
  "I love you more than a clean bowled middle stump on a Sunday morning."
];

const LoveJar: React.FC<{ name: string }> = ({ name }) => {
  const [note, setNote] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleOpenJar = () => {
    setIsShaking(true);
    setTimeout(() => {
      const randomNote = FUNNY_NOTES[Math.floor(Math.random() * FUNNY_NOTES.length)];
      setNote(randomNote);
      setIsShaking(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto my-10 text-center p-10 bg-white rounded-[3rem] border border-pink-50 shadow-xl relative z-10">
      <div 
        className={`text-7xl mb-6 cursor-pointer select-none transition-transform duration-300 ${isShaking ? 'animate-shake' : 'hover:scale-110'}`} 
        onClick={handleOpenJar}
      >
        🍯
      </div>
      <h3 className="text-2xl font-romantic font-bold text-pink-500 mb-2">The 'Caffeine & Canine' Jar</h3>
      <p className="text-xs text-gray-400 mb-8 italic">Click for a reason why you're better than a puppy!</p>
      
      {note ? (
        <div className="p-6 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-100 animate-fade-in">
          <p className="text-lg font-romantic text-gray-700 italic">"{note}"</p>
          <button 
            onClick={handleOpenJar}
            className="mt-6 text-[9px] font-black tracking-widest text-pink-400 hover:text-rose-500 uppercase"
          >
            One more pun?
          </button>
        </div>
      ) : (
        <button
          onClick={handleOpenJar}
          className="bg-rose-500 text-white px-8 py-3 rounded-full font-black shadow-lg hover:scale-105 transition-all uppercase tracking-widest text-[10px]"
        >
          Open Jar
        </button>
      )}
    </div>
  );
};

export default LoveJar;
