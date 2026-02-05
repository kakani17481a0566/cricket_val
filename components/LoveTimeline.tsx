
import React from 'react';

interface LoveTimelineProps {
  mohithAvatar: string | null;
  likhitaAvatar: string | null;
}

const LoveTimeline: React.FC<LoveTimelineProps> = ({ mohithAvatar, likhitaAvatar }) => {
  const journey = [
    { 
      title: "The Campus Path", 
      date: "Intermediate Years", 
      icon: "🎒", 
      subIcon: "🚶‍♂️",
      desc: "We were in the same college for our Intermediate years, crossing paths every single day. Yet, the only word we ever exchanged was a quick 'Bye'. A two-year silence that destiny was waiting to break.",
      color: "from-slate-400 to-slate-500"
    },
    { 
      title: "The Parents' Match", 
      date: "The Arranged Meeting", 
      icon: "☝️", 
      subIcon: "🤝",
      desc: "Our parents stepped in as the ultimate umpires! They 'arranged' what we were too shy to start ourselves, turning those silent student years into a lifetime partnership.",
      color: "from-yellow-400 to-amber-600"
    },
    { 
      title: "Dhoni, Dogs & Coffee", 
      date: "Breaking the Silence", 
      icon: "🏏", 
      subIcon: "🐕",
      desc: "Finally talking! Bonding over my love for MS Dhoni (Thala!), your obsession with every dog in the village, and our 'intense' debate over my coffee addiction.",
      color: "from-rose-400 to-rose-600"
    },
    { 
      title: "Our Village Sunset", 
      date: "2026 & Forever", 
      icon: "🌾", 
      subIcon: "🏡",
      desc: "Building our dream life in the village. No more just saying 'Bye'—now it's 'Good Morning' every day for the rest of our lives. Finishing it in style!",
      color: "from-emerald-400 to-emerald-600"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 relative" id="timeline">
      <div className="text-center mb-24">
        <div className="inline-block px-4 py-1 rounded-full bg-rose-50 text-rose-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 border border-rose-100">
          Our Full Match History
        </div>
        <h2 className="text-6xl font-romantic font-bold text-gray-800 mb-4">From Silence to Soulmates</h2>
        <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">A Story Written by Parents & Polished by Love</p>
      </div>

      <div className="relative">
        {/* Timeline Central Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-100 via-rose-200 to-emerald-100 -translate-x-1/2"></div>

        {journey.map((item, index) => (
          <div 
            key={index} 
            className={`relative mb-32 md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* The Icon Bubble */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
              <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-[2rem] p-1 shadow-2xl transform transition-transform hover:scale-110 hover:rotate-6`}>
                <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl z-10">{item.icon}</span>
                  <span className="absolute bottom-1 right-1 text-sm opacity-40">{item.subIcon}</span>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5`}></div>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className={`md:w-[42%] mt-32 md:mt-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-rose-50 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-2 h-full bg-gradient-to-b ${item.color}`}></div>
                
                <div className="text-[10px] font-black text-rose-300 mb-3 uppercase tracking-[0.3em] flex items-center gap-2 group-hover:text-rose-500 transition-colors">
                  {index % 2 !== 0 && <span className="w-8 h-px bg-rose-100 hidden md:block"></span>}
                  {item.date}
                  {index % 2 === 0 && <span className="w-8 h-px bg-rose-100 hidden md:block"></span>}
                </div>
                
                <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium italic text-sm">
                  "{item.desc}"
                </p>
              </div>
            </div>
            
            {/* Empty space for the other side on desktop */}
            <div className="hidden md:block md:w-[42%]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveTimeline;
