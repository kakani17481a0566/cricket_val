
import React, { useState } from 'react';
import { generateFutureFortune } from '../services/geminiService';

const FutureFortune: React.FC = () => {
  const [fortune, setFortune] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getFortune = async () => {
    setLoading(true);
    const text = await generateFutureFortune();
    setFortune(text);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-20 px-6">
      <div className="bg-gradient-to-br from-indigo-900 via-rose-900 to-purple-900 rounded-[3rem] p-10 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-white animate-pulse">✨</div>
          <div className="absolute bottom-10 right-10 text-white animate-pulse delay-75">✨</div>
          <div className="absolute top-1/2 left-1/4 text-white animate-pulse delay-150">✨</div>
        </div>
        
        <div className="text-6xl mb-6">🔮</div>
        <h2 className="text-3xl font-romantic font-bold text-white mb-4">Our Future in the Stars</h2>
        <p className="text-rose-200 text-sm mb-8 italic">Consult the universe about our journey...</p>
        
        {fortune ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-fade-in">
            <p className="text-white text-lg leading-relaxed font-medium italic">"{fortune}"</p>
            <button 
              onClick={() => setFortune(null)}
              className="mt-6 text-xs font-bold text-rose-300 hover:text-white transition-colors"
            >
              ASK AGAIN
            </button>
          </div>
        ) : (
          <button
            onClick={getFortune}
            disabled={loading}
            className="bg-white text-indigo-900 px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto uppercase tracking-widest text-xs"
          >
            {loading ? 'Consulting...' : 'Reveal Fortune'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FutureFortune;
