
import React, { useState } from 'react';
import { generateCompliment } from '../services/geminiService';

const SoulmateScanner: React.FC<{ name: string }> = ({ name }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const startScan = async () => {
    setScanning(true);
    setResult(null);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        finishScan();
      }
    }, 40);
  };

  const finishScan = async () => {
    const reading = await generateCompliment(name);
    setResult(`Heart Match: 100% | Soul Affinity: Infinite | Message: ${reading}`);
    setScanning(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-32 p-12 bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-rose-500/30 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-shimmer"></div>
      
      <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-10">Likhita's Heart-Rate Sync</h3>
      
      {!result ? (
        <div className="flex flex-col items-center">
          <div 
            onMouseDown={startScan}
            onMouseUp={() => !result && setProgress(0)}
            onTouchStart={startScan}
            onTouchEnd={() => !result && setProgress(0)}
            className={`relative w-40 h-40 rounded-full border-4 ${scanning ? 'border-rose-500 shadow-[0_0_50px_rgba(244,114,182,0.5)]' : 'border-rose-900'} flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-90`}
          >
            <span className={`text-6xl transition-transform ${scanning ? 'scale-125 animate-heartbeat' : ''}`}>☝️</span>
            {scanning && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80" cy="80" r="76"
                  fill="transparent"
                  stroke="#f472b6"
                  strokeWidth="8"
                  strokeDasharray={`${(progress / 100) * 477} 477`}
                  strokeLinecap="round"
                  className="transition-all"
                />
              </svg>
            )}
          </div>
          <p className="mt-8 text-rose-300 font-bold uppercase tracking-[0.3em] text-[10px]">
            {scanning ? 'Analyzing Destiny...' : 'Hold to Authenticate Soulmate'}
          </p>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="text-6xl mb-6">💖</div>
          <p className="text-rose-100 font-romantic text-3xl leading-relaxed mb-10 italic">"{result}"</p>
          <button 
            onClick={() => {setResult(null); setProgress(0);}}
            className="text-xs font-black text-rose-400 hover:text-white uppercase tracking-[0.4em] transition-colors"
          >
            Reset Scanner
          </button>
        </div>
      )}
    </div>
  );
};

export default SoulmateScanner;
