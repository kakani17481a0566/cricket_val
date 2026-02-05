
import React, { useState } from 'react';
import { generateDreamDateImage } from '../services/geminiService';

const DreamDateGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    const url = await generateDreamDateImage(description);
    setImageUrl(url);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-4">Dream Date Visualizer</h2>
        <p className="text-gray-500 max-w-lg mx-auto">Describe our perfect date, and I'll paint it for you with the magic of AI.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 w-full space-y-6">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. A candlelit dinner on a private beach in the Maldives under a full moon..."
            className="w-full p-6 rounded-[2rem] border-2 border-pink-50 focus:border-rose-300 outline-none transition-all shadow-inner h-40 bg-white/50 text-gray-700"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !description.trim()}
            className="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-rose-600 transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
          >
            {loading ? 'Sketching our dreams...' : 'Visualize our date'}
          </button>
        </div>

        <div className="flex-1 w-full flex justify-center">
          {loading ? (
            <div className="aspect-square w-full max-w-sm bg-white rounded-[2rem] border-4 border-dashed border-rose-100 flex items-center justify-center animate-pulse">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-rose-300 font-bold text-xs uppercase tracking-widest">Painting...</div>
              </div>
            </div>
          ) : imageUrl ? (
            <div className="relative group">
              <div className="bg-white p-4 shadow-2xl rounded-sm transform rotate-2 hover:rotate-0 transition-transform duration-500 border-b-[40px] border-white">
                <img 
                  src={imageUrl} 
                  alt="Dream Date" 
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 font-romantic text-2xl text-rose-500/80">
                  Our Dream
                </div>
              </div>
              <button 
                onClick={() => setImageUrl(null)}
                className="absolute -top-4 -right-4 bg-white text-rose-400 w-8 h-8 rounded-full shadow-lg flex items-center justify-center hover:text-rose-600 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="aspect-square w-full max-w-sm bg-white/30 rounded-[2.5rem] border-2 border-dashed border-rose-200 flex flex-col items-center justify-center p-10 text-center">
              <div className="text-6xl mb-4 opacity-20">📸</div>
              <p className="text-rose-300 text-sm italic">"Memories we haven't made yet."</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DreamDateGenerator;
