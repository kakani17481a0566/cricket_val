
import React, { useState } from 'react';
import { generateCouplePortrait } from '../services/geminiService';

const MagicPortraitStudio: React.FC = () => {
  const [setting, setSetting] = useState('Standing together in a beautiful Taj Mahal garden at sunset');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    "Dancing under a starry sky in Paris",
    "Walking on a serene Maldivian beach",
    "Drinking chai in a cozy mountain cottage",
    "In a royal palace ballroom in India"
  ];

  const handleGenerate = async () => {
    setLoading(true);
    const url = await generateCouplePortrait(setting);
    setImageUrl(url);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-32 bg-white/40 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 blur-3xl -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/30 blur-3xl -z-10 rounded-full animate-pulse delay-700"></div>

      <div className="text-center mb-16">
        <h2 className="text-6xl font-romantic font-bold text-rose-600 mb-6">Our Imagined Memories</h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Since this is our first Valentine's, let AI imagine us together in the most romantic places on Earth.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 w-full space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest">Describe Our Moment</label>
            <textarea
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              className="w-full p-8 rounded-[2.5rem] border-2 border-rose-50 focus:border-emerald-300 outline-none transition-all shadow-inner h-32 bg-white/50 text-gray-700 font-medium"
              placeholder="Where should we be?"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest">Or Pick a Dream</label>
            <div className="flex flex-wrap gap-3">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setSetting(p)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all border-2 ${setting === p ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-white text-emerald-600 border-emerald-100 hover:border-emerald-300'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 via-rose-500 to-purple-500 text-white font-black py-5 rounded-[2rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-[0.3em] text-xs relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Casting Love Spell...' : 'Generate Our Photo'}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 shimmer-btn"></div>
          </button>
        </div>

        <div className="flex-1 w-full flex justify-center order-1 lg:order-2">
          {loading ? (
            <div className="aspect-[3/4] w-full max-w-sm bg-white rounded-[3rem] border-4 border-dashed border-rose-100 flex flex-col items-center justify-center animate-pulse p-12 text-center">
              <div className="text-8xl mb-6">🔮</div>
              <div className="text-rose-400 font-black text-xs uppercase tracking-widest leading-relaxed">
                Finding the timeline where we're standing together...
              </div>
            </div>
          ) : imageUrl ? (
            <div className="relative group animate-fade-in">
              <div className="bg-white p-6 shadow-[0_50px_100px_rgba(0,0,0,0.1)] rounded-[0.5rem] transform rotate-2 hover:rotate-0 transition-all duration-700 border-b-[80px] border-white max-w-md">
                <img 
                  src={imageUrl} 
                  alt="Our Imagined Memory" 
                  className="w-full object-cover rounded-[0.2rem] shadow-inner h-[450px]"
                />
                <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 font-romantic text-4xl text-rose-500/90 whitespace-nowrap">
                  Mohith & Likhita
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-emerald-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl border-4 border-white animate-bounce">
                ✨
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] w-full max-w-sm bg-gradient-to-br from-rose-50 to-purple-50 rounded-[3rem] border-2 border-dashed border-rose-200 flex flex-col items-center justify-center p-16 text-center group cursor-pointer hover:border-rose-400 transition-colors" onClick={handleGenerate}>
              <div className="text-8xl mb-8 opacity-40 group-hover:scale-110 transition-transform">🖼️</div>
              <p className="text-rose-400 font-bold italic text-lg leading-relaxed">
                "Click to see our first 'photo' together, imagined by magic."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagicPortraitStudio;
