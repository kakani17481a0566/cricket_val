
import React, { useState } from 'react';
import { generateDatePlan } from '../services/geminiService';

const DatePlanner: React.FC = () => {
  const [mood, setMood] = useState('Cosy & Relaxed');
  const [setting, setSetting] = useState('Home Sweet Home');
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const moods = ['Adventurous', 'Cosy & Relaxed', 'Fancy & Elegant', 'Spontaneous', 'Poetic'];
  const settings = ['Outdoor Nature', 'City Lights', 'Home Sweet Home', 'Hidden Gems', 'Under the Stars'];

  const getPlan = async () => {
    setLoading(true);
    const result = await generateDatePlan(mood, setting);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 bg-rose-50/30 rounded-[4rem] my-20">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-4">Date Night Architect</h2>
        <p className="text-gray-500">Let Gemini plan a day as special as she is.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest mb-4">Select the Mood</label>
            <div className="flex flex-wrap gap-2">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${mood === m ? 'bg-rose-500 text-white shadow-lg' : 'bg-white text-rose-400 hover:bg-rose-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-rose-300 uppercase tracking-widest mb-4">Select the Setting</label>
            <div className="flex flex-wrap gap-2">
              {settings.map(s => (
                <button
                  key={s}
                  onClick={() => setSetting(s)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${setting === s ? 'bg-rose-500 text-white shadow-lg' : 'bg-white text-rose-400 hover:bg-rose-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={getPlan}
            disabled={loading}
            className="w-full bg-white border-2 border-rose-200 text-rose-600 py-4 rounded-3xl font-black shadow-xl hover:border-rose-500 transition-all uppercase tracking-widest text-xs"
          >
            {loading ? 'Consulting the Oracle...' : 'Generate Itinerary'}
          </button>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-2xl min-h-[400px] relative overflow-hidden flex flex-col">
          {plan ? (
            <div className="animate-fade-in flex-1">
              <div className="text-3xl font-romantic text-rose-600 mb-6">Our Perfect Day</div>
              <div className="prose prose-rose max-w-none text-gray-700 font-medium whitespace-pre-line leading-relaxed">
                {plan}
              </div>
              <div className="mt-10 pt-6 border-t border-rose-50 text-[10px] text-rose-300 font-black tracking-widest">
                TAILORED WITH LOVE BY GEMINI
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="italic font-medium">Choose a mood and setting to reveal our next adventure.</p>
            </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePlanner;
