
import React from 'react';

interface DualHeartFrameProps {
  mohithAvatar: string | null;
  likhitaAvatar: string | null;
}

const DualHeartFrame: React.FC<DualHeartFrameProps> = ({ mohithAvatar, likhitaAvatar }) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 mt-12 mb-20 animate-fade-in py-10">
      {/* Mohith's Frame */}
      <div className="relative group z-20">
        <div className="bg-white p-6 shadow-[0_40px_80px_rgba(0,0,0,0.12)] rounded-sm transform -rotate-3 group-hover:rotate-0 transition-all duration-700 border-b-[80px] border-white w-64 md:w-80 overflow-visible">
          <div className="aspect-[3/4] overflow-hidden bg-emerald-50 rounded-sm shadow-inner border border-emerald-50">
            <img 
              src={mohithAvatar || "https://raw.githubusercontent.com/username/repo/main/mohith.jpg"} 
              alt="Mohith"
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
          <div className="absolute bottom-[-65px] left-1/2 -translate-x-1/2 font-romantic text-4xl text-emerald-800 whitespace-nowrap drop-shadow-sm">
            Mohith
          </div>
          <div className="absolute top-[-15px] left-[-15px] text-3xl animate-pulse">🌿</div>
        </div>
      </div>

      {/* Connection Heart */}
      <div className="relative md:absolute z-30 flex items-center justify-center">
        <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(244,114,182,0.4)] border-8 border-white animate-heartbeat">
          <span className="text-5xl text-white">❤️</span>
        </div>
        <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-20"></div>
      </div>

      {/* Likhita's Frame */}
      <div className="relative group z-20">
        <div className="bg-white p-6 shadow-[0_40px_80px_rgba(0,0,0,0.12)] rounded-sm transform rotate-3 group-hover:rotate-0 transition-all duration-700 border-b-[80px] border-white w-64 md:w-80 overflow-visible">
          <div className="aspect-[3/4] overflow-hidden bg-purple-50 rounded-sm shadow-inner border border-purple-50">
            <img 
              src={likhitaAvatar || "https://raw.githubusercontent.com/username/repo/main/likhita.jpg"} 
              alt="Likhita"
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
          <div className="absolute bottom-[-65px] left-1/2 -translate-x-1/2 font-romantic text-4xl text-purple-800 whitespace-nowrap drop-shadow-sm">
            Likhita
          </div>
          <div className="absolute top-[-15px] right-[-15px] text-3xl animate-pulse delay-300">🌸</div>
        </div>
      </div>
      
      {/* Decorative Text */}
      <div className="absolute -bottom-16 text-center w-full">
        <p className="text-rose-300 font-black uppercase tracking-[0.8em] text-[10px] animate-pulse">Two Lives &bull; One Heartbeat &bull; 2026</p>
      </div>
    </div>
  );
};

export default DualHeartFrame;
