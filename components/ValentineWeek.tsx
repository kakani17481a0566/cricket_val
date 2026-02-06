
import React from 'react';
import { VALENTINE_WEEK } from '../constants';

const ValentineWeek: React.FC<{ userRole: 'developer' | 'likitha' | null }> = ({ userRole }) => {
  const today = new Date();
  const isFebruary = today.getMonth() === 1; // 0-indexed, Jan=0, Feb=1
  const currentDate = today.getDate();

  const getDayValue = (dayDateStr: string) => {
    const parts = dayDateStr.split(' ');
    return parseInt(parts[parts.length - 1]);
  };

  const isToday = (dayDateStr: string) => {
    if (!isFebruary) return false;
    return getDayValue(dayDateStr) === currentDate;
  };

  const isUnlocked = (dayDateStr: string) => {
    if (userRole === 'developer') return true;
    if (!isFebruary) return today.getMonth() > 1; // Unfolded if past Feb
    return currentDate >= getDayValue(dayDateStr);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-4">8 Days of Our Love</h2>
        <div className="h-1 w-24 bg-pink-300 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-10">
        {VALENTINE_WEEK.map((day, index) => {
          const active = isToday(day.date);
          const unlocked = isUnlocked(day.date);

          return (
            <div
              key={day.id}
              className={`relative flex flex-col md:flex-row items-center gap-6 p-8 rounded-[2rem] border-2 transition-all duration-500 shadow-sm group
                ${unlocked ? 'hover:scale-[1.02]' : 'opacity-80 grayscale-[0.5]'}
                ${active && unlocked ? 'border-pink-400 bg-white ring-4 ring-pink-100/50 shadow-xl scale-[1.03]' : `${day.color} border-transparent ${unlocked ? 'hover:bg-white' : ''}`}
              `}
            >
              {active && unlocked && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-lg z-20 animate-pulse">
                  Today's Celebration
                </div>
              )}

              {!unlocked && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg border border-pink-100">
                    <span className="text-4xl">🔒</span>
                  </div>
                </div>
              )}

              <div className={`text-6xl md:text-7xl transform transition-transform duration-300 ${unlocked ? 'group-hover:rotate-12' : ''} ${active && unlocked ? 'animate-heartbeat' : ''}`}>
                {unlocked ? day.icon : '💌'}
              </div>

              <div className={`flex-1 text-center md:text-left ${!unlocked ? 'blur-[8px] select-none pointer-events-none' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-3">
                  <h3 className={`text-2xl font-bold ${active ? 'text-pink-600' : ''}`}>{day.name}</h3>
                  <span className={`text-sm font-bold tracking-wider ${active ? 'text-pink-400' : 'opacity-60'}`}>— {day.date}</span>
                </div>
                <p className="text-lg leading-relaxed mb-4 text-gray-700 font-medium">{day.message}</p>
                <div className={`text-sm italic font-romantic text-xl border-t pt-3 mt-3 ${active ? 'text-rose-500 border-pink-100' : 'opacity-70 border-current/10'}`}>
                  "{day.quote}"
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-center">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30 rotate-90 whitespace-nowrap">Day 0{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ValentineWeek;
