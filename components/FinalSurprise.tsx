
import React, { useState } from 'react';
import { generateSpecialSurprise } from '../services/geminiService';

const FinalSurprise: React.FC<{ name: string; onSurprise: () => void }> = ({ name, onSurprise }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUnlock = async () => {
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
        <div className="bg-white p-8 md:p-12 lg:p-20 rounded-[4rem] shadow-2xl border-b-[12px] border-rose-100 animate-fade-in group hover:-translate-y-2 transition-transform duration-500">
          <div className="text-8xl mb-8 animate-heartbeat group-hover:scale-110 transition-transform">🎁</div>
          <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-6">Likhita, A Final Gift</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto font-medium">You've reached the heart of this digital journey Mohith made for you. Open this to hear the universe whisper our future.</p>
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="relative px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Unveiling...' : 'Unwrap Mohith\'s Heart'}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 shimmer-btn"></div>
          </button>
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
