
import React, { useState } from 'react';

const VirtualHug: React.FC = () => {
  const [hugging, setHugging] = useState(false);
  const [count, setCount] = useState(0);

  const handleHug = async () => {
    if (hugging) return;

    setHugging(true);
    setCount(c => c + 1);

    // Send email via API
    try {
      // Only try to send email if we're not in development (or if API is running)
      // For dev, we just simulate success
      await fetch('/api/sendHug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: count + 1 }),
      }).catch(err => console.log('API call failed (expected in local dev without SWA CLI):', err));

    } catch (error) {
      console.error('Error sending hug:', error);
    }

    // Multiple tiny vibration pulses would be nice but CSS will do
    setTimeout(() => setHugging(false), 2000);
  };

  return (
    <div className="max-w-sm mx-auto text-center p-10 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-2xl relative z-10 mt-20 transition-all hover:bg-white/60">
      <div
        className={`text-8xl mb-8 transition-all duration-500 cursor-pointer select-none relative ${hugging ? 'scale-125 rotate-12 animate-pop' : 'hover:scale-110 hover:-rotate-3'}`}
        onClick={handleHug}
      >
        🫂
        {hugging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-4xl animate-ping text-rose-400">💖</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-romantic font-bold text-rose-500 mb-2">Virtual Hugs</h3>
      <p className="text-sm text-gray-600 mb-8 font-medium italic">Sent across the miles, straight to your heart.</p>

      <div className="relative inline-block">
        <button
          onClick={handleHug}
          disabled={hugging}
          className="group relative bg-white text-rose-500 border-2 border-rose-100 px-10 py-4 rounded-2xl font-black shadow-lg hover:shadow-rose-100 hover:border-rose-400 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em] text-[10px]"
        >
          <span className="relative z-10">{hugging ? 'Hugging Tight...' : 'Send a Hug'}</span>
          <div className="absolute inset-0 bg-rose-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
        </button>
        {count > 0 && (
          <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full shadow-xl border-2 border-white animate-pop">
            {count}
          </div>
        )}
      </div>

      {hugging && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[200]">
          <div className="text-[20rem] animate-ping opacity-10 text-rose-500">❤️</div>
        </div>
      )}
    </div>
  );
};

export default VirtualHug;
