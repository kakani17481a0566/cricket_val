
import React, { useState } from 'react';
import { editImage } from '../services/geminiService';

const MagicFilter: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSourceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt) return;
    setLoading(true);
    const result = await editImage(sourceImage, prompt);
    if (result) setEditedImage(result);
    setLoading(false);
  };

  const presets = ["Add a retro 90s polaroid filter", "Add a cinematic sunset glow", "Turn this into a watercolor painting", "Add floating heart bubbles around us", "Remove the background and replace it with a starry night"];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 bg-white/40 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-2xl overflow-hidden relative mb-20">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-romantic font-bold text-emerald-600 mb-6">Magic Filter Studio</h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">Use the power of Gemini to transform your photos with simple words.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 w-full space-y-8">
          <div className="relative aspect-square w-full bg-rose-50/30 rounded-[3rem] border-2 border-dashed border-rose-200 overflow-hidden flex items-center justify-center">
            {editedImage || sourceImage ? (
              <img src={editedImage || sourceImage!} className="w-full h-full object-cover animate-fade-in" />
            ) : (
              <label className="cursor-pointer text-center group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                <div className="text-rose-400 font-bold">Upload a Photo</div>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            )}
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-emerald-600 font-black text-xs uppercase tracking-widest">Applying Magic...</div>
              </div>
            )}
          </div>
          
          {(editedImage || sourceImage) && (
            <div className="flex gap-4">
              <button onClick={() => { setSourceImage(null); setEditedImage(null); }} className="flex-1 bg-white text-gray-400 font-bold py-3 rounded-2xl border border-gray-100">Reset</button>
              {editedImage && (
                <a href={editedImage} download="magic-photo.png" className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-2xl text-center">Download</a>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-8">
          <div className="space-y-4">
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-widest">Your Command</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-8 rounded-[2.5rem] border-2 border-emerald-50 focus:border-emerald-300 outline-none transition-all shadow-inner h-32 bg-white/50 text-gray-700 font-medium"
              placeholder="e.g. Add a retro vintage vibe..."
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-widest">Try a Preset</label>
            <div className="flex flex-wrap gap-3">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold transition-all border-2 ${prompt === p ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-white text-emerald-600 border-emerald-100 hover:border-emerald-300'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleEdit}
            disabled={loading || !sourceImage || !prompt}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-black py-5 rounded-[2rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-[0.3em] text-xs relative overflow-hidden group"
          >
            <span className="relative z-10">Cast Spell</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 shimmer-btn"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagicFilter;
