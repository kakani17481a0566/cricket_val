
import React from 'react';

const LoveStats: React.FC = () => {
  // Calculate days since Pelli Choopulu
  const pelliChoopuluDate = new Date("December 26, 2025").getTime();
  const now = new Date().getTime();
  const daysSince = Math.floor((now - pelliChoopuluDate) / (1000 * 60 * 60 * 24));

  const stats = [
    { label: "Days Since Pelli Choopulu", value: daysSince.toString(), icon: '💍', color: 'text-purple-500' },
    { label: "Village Sunset Dates", value: 'Infinite', icon: '🌅', color: 'text-orange-500' },
    { label: "Dhoni-Level Calmness", value: '100%', icon: '7️⃣', color: 'text-yellow-600' },
    { label: "Coffee-to-Dog Ratio", value: '1:100', icon: '🐕', color: 'text-rose-500' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 md:p-8 rounded-[2.5rem] border border-rose-50 shadow-sm text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className={`text-2xl md:text-3xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 leading-tight px-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveStats;
