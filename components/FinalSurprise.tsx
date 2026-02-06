
import React, { useState } from 'react';
import { generateSpecialSurprise } from '../services/geminiService';

const FinalSurprise: React.FC<{ name: string; onSurprise: () => void; userRole: 'developer' | 'likitha' | null }> = ({ name, onSurprise, userRole }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const today = new Date();
  const isUnlockedDate = userRole === 'developer' || (today.getMonth() === 1 && today.getDate() >= 14) || today.getMonth() > 1;

  const handleUnlock = async () => {
    if (!isUnlockedDate) return;
    setLoading(true);
    const text = await generateSpecialSurprise(name);
    setMessage(text);
    setUnlocked(true);
    setLoading(false);
    onSurprise(); // Trigger rose shower
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      {!unlocked ? (
        <div className={`bg-white p-8 md:p-12 lg:p-20 rounded-[4rem] shadow-2xl border-b-[12px] border-rose-100 animate-fade-in group transition-all duration-500 ${isUnlockedDate ? 'hover:-translate-y-2' : 'opacity-80'}`}>
          <div className={`text-8xl mb-8 ${isUnlockedDate ? 'animate-heartbeat group-hover:scale-110' : 'grayscale'} transition-transform`}>
            {isUnlockedDate ? '🎁' : '🔒'}
          </div>
          <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-6">Likhita, A Final Gift</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto font-medium">
            {isUnlockedDate
              ? "You've reached the heart of this digital journey Mohith made for you. Open this to hear the universe whisper our future."
              : "This special gift will reveal itself on February 14th. The best things are worth waiting for! ❤️"
            }
          </p>
          {isUnlockedDate && (
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="relative px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Unveiling...' : 'Unwrap Mohith\'s Heart'}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 shimmer-btn"></div>
            </button>
          )}
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="text-9xl mb-10 drop-shadow-2xl">✨💖✨</div>
          <div className="font-romantic text-4xl sm:text-5xl md:text-7xl text-rose-600 leading-tight mb-12 italic drop-shadow-sm px-4">
            "{message}"
          </div>
          <div className="text-rose-300 font-black tracking-[0.5em] uppercase text-[10px]">Likhita & Mohith &bull; Forever</div>
        </div>
      )}
    </div>
  );
};

export default FinalSurprise;
