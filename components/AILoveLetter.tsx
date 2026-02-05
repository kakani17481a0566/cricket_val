
import React, { useState, useEffect } from 'react';
import { generateLoveLetter } from '../services/geminiService';

const AILoveLetter: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [traits, setTraits] = useState('');
  const [tone, setTone] = useState<'poetic' | 'funny' | 'deep' | 'casual'>('poetic');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);
  const [archive, setArchive] = useState<{id: number, text: string, date: string}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('loveLetterArchive');
    if (saved) setArchive(JSON.parse(saved));
  }, []);

  const handleGenerate = async () => {
    if (!recipient) return;
    setLoading(true);
    const content = await generateLoveLetter(recipient, traits, tone);
    setGenerated(content);
    setLoading(false);
  };

  const saveToArchive = () => {
    if (!generated) return;
    const newEntry = {
      id: Date.now(),
      text: generated,
      date: new Date().toLocaleDateString()
    };
    const newArchive = [newEntry, ...archive];
    setArchive(newArchive);
    localStorage.setItem('loveLetterArchive', JSON.stringify(newArchive));
    alert("Saved to your Love Archive! 💖");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 mb-20">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border border-pink-100 relative z-10">
        <h2 className="text-4xl font-romantic font-bold text-pink-600 mb-8 flex items-center gap-3">
          <span>✒️</span> The Magic Pen
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest mb-2">Recipient</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. My Princess, Sarah"
              className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 focus:border-pink-300 outline-none transition-all text-gray-700 font-medium"
            />
          </div>
          
          <div>
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest mb-2">Personal Touches</label>
            <textarea
              value={traits}
              onChange={(e) => setTraits(e.target.value)}
              placeholder="She has the best laugh, loves sunflowers..."
              className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 focus:border-pink-300 outline-none transition-all h-32 text-gray-700 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest mb-3">Vibe</label>
            <div className="flex gap-2 flex-wrap">
              {(['poetic', 'funny', 'deep', 'casual'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    tone === t ? 'bg-pink-500 text-white shadow-lg' : 'bg-pink-50 text-pink-400 hover:bg-pink-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !recipient}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
          >
            {loading ? 'Conjuring Magic...' : 'Generate Letter'}
          </button>
        </div>

        {generated && (
          <div className="mt-12 p-8 bg-pink-50/50 rounded-3xl border border-pink-100 animate-fade-in relative">
            <div className="font-romantic text-3xl text-gray-800 whitespace-pre-line leading-relaxed mb-8">
              {generated}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={saveToArchive}
                className="flex-1 bg-white text-pink-500 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-pink-200 hover:bg-pink-500 hover:text-white transition-all shadow-sm"
              >
                Save to Archive
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generated);
                  alert("Copied to clipboard! 💖");
                }}
                className="px-6 bg-pink-100 text-pink-600 py-3 rounded-xl text-xs font-black hover:bg-pink-200 transition-all"
              >
                COPY
              </button>
            </div>
          </div>
        )}
      </div>

      {archive.length > 0 && (
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-romantic font-bold text-gray-400 mb-8 text-center uppercase tracking-[0.3em]">Our Love Archive</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {archive.map((entry) => (
              <div key={entry.id} className="bg-white p-8 rounded-[2rem] shadow-lg border border-pink-50 transition-transform hover:-rotate-1">
                <div className="text-[10px] text-pink-300 font-black mb-4 uppercase tracking-widest">{entry.date}</div>
                <div className="font-romantic text-xl text-gray-600 line-clamp-4 italic">"{entry.text}"</div>
                <button 
                  onClick={() => setGenerated(entry.text)}
                  className="mt-6 text-[10px] font-black text-rose-500 hover:underline uppercase tracking-widest"
                >
                  View Full Letter
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AILoveLetter;
