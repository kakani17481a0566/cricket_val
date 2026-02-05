
import React, { useState } from 'react';
import { generateVeoVideo } from '../services/geminiService';

const MovingMemories: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('A cinematic romantic slow motion shot with glowing embers floating in the air');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSourceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnimate = async () => {
    if (!sourceImage) return;
    
    // Veo Key check
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }

    setLoading(true);
    setStatus('Whispering to the stars...');
    
    // Status updates simulation
    const intervals = [
      'Sketching the timeline...',
      'Breathing life into the frames...',
      'Applying cinematic soul...',
      'Almost there, my love...'
    ];
    let i = 0;
    const timer = setInterval(() => {
      setStatus(intervals[i % intervals.length]);
      i++;
    }, 15000);

    const url = await generateVeoVideo(sourceImage, prompt, '9:16');
    clearInterval(timer);
    
    if (url) {
      setVideoUrl(url);
      setStatus('Magic complete!');
    } else {
      setStatus('The universe was shy. Try again?');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 bg-rose-900/90 backdrop-blur-3xl rounded-[4rem] border border-rose-500/30 shadow-[0_0_100px_rgba(244,114,182,0.2)] overflow-hidden relative mb-20 text-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 blur-[120px] -z-10 rounded-full"></div>
      
      <div className="text-center mb-16">
        <h2 className="text-6xl font-romantic font-bold text-rose-300 mb-6">Moving Memories</h2>
        <p className="text-rose-100/60 max-w-xl mx-auto font-medium">Breathe life into our photos. Upload a still memory and watch it move with Veo magic.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 w-full space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest">Animation Vibe</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-8 rounded-[2.5rem] border-2 border-rose-800 focus:border-rose-400 outline-none transition-all shadow-inner h-32 bg-black/20 text-white font-medium"
              placeholder="Describe the movement..."
            />
          </div>

          <button
            onClick={handleAnimate}
            disabled={loading || !sourceImage}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-black py-6 rounded-[2rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-[0.4em] text-[10px] relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Creating Magic...' : 'Animate Our Photo'}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 shimmer-btn"></div>
          </button>
          
          {loading && (
             <div className="text-center animate-pulse">
                <p className="text-rose-300 font-bold uppercase tracking-widest text-xs">{status}</p>
                <p className="text-rose-100/40 text-[10px] mt-2 italic">This takes about a minute. Good things take time.</p>
             </div>
          )}
        </div>

        <div className="flex-1 w-full flex justify-center order-1 lg:order-2">
          <div className="relative aspect-[9/16] w-full max-w-xs bg-black/40 rounded-[3rem] border-4 border-dashed border-rose-900 overflow-hidden flex flex-col items-center justify-center p-4">
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover rounded-[2.5rem]" />
            ) : sourceImage ? (
              <img src={sourceImage} className="w-full h-full object-cover rounded-[2.5rem] opacity-50 grayscale" />
            ) : (
              <label className="cursor-pointer text-center group w-full h-full flex flex-col items-center justify-center">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🎬</div>
                <div className="text-rose-300 font-black uppercase tracking-widest text-xs">Drop Still Image Here</div>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-md flex flex-col items-center justify-center p-10 text-center">
                <div className="w-20 h-20 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-8"></div>
                <p className="text-rose-200 font-bold text-lg animate-pulse">Rendering our magic...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingMemories;
