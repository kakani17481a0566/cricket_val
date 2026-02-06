
import React, { useState, useEffect, useRef } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ValentineWeek from './components/ValentineWeek';
import LoveJar from './components/LoveJar';
import RoseShower from './components/RoseShower';
import VirtualHug from './components/VirtualHug';
import LoveCoupons from './components/LoveCoupons';
import LoveStats from './components/LoveStats';
import FinalSurprise from './components/FinalSurprise';
import LoveTimeline from './components/LoveTimeline';
import DualHeartFrame from './components/DualHeartFrame';
// Removed generateAvatar import
// import { generateAvatar } from './services/geminiService';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const startDate = new Date("December 26, 2025 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - startDate;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'Days', value: timeLeft.days, icon: '🌾' },
    { label: 'Hrs', value: timeLeft.hours, icon: '☕' },
    { label: 'Min', value: timeLeft.minutes, icon: '🐕' },
    { label: 'Sec', value: timeLeft.seconds, icon: '7️⃣' },
  ];



  return (
    <div className="flex gap-2 sm:gap-4 justify-center mt-12 mb-8 flex-wrap">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative group bg-white/70 backdrop-blur-md px-4 sm:px-6 py-4 rounded-3xl border border-white shadow-xl text-center min-w-[70px] sm:min-w-[90px] transition-all hover:-translate-y-2 cursor-default"
        >
          <div className="text-xl mb-1">{item.icon}</div>
          <div className="text-3xl font-black text-rose-500 tabular-nums">{item.value}</div>
          <div className="text-[9px] uppercase tracking-widest text-rose-300 font-black mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const SimpleFunnyApp: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [herName, setHerName] = useState(localStorage.getItem('herName') || 'Likhita');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Disabled opening modal
  const [isRoseShowerActive, setIsRoseShowerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [mohithAvatar, setMohithAvatar] = useState<string | null>(localStorage.getItem('mohithAvatar') || '/assets/likhita.jpg');
  const [likhitaAvatar, setLikhitaAvatar] = useState<string | null>(localStorage.getItem('likhitaAvatar') || '/assets/mohith.jpg');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) audioRef.current.play().catch(() => setIsMusicPlaying(false));
      else audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    // Loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);

    // Back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const saveSettings = () => {
    if (herName.trim()) {
      localStorage.setItem('herName', herName);
      setIsSettingsOpen(false);
      triggerRoses();
    }
  };

  const triggerRoses = () => setIsRoseShowerActive(true);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Our Love Story - Mohith & Likhita',
          text: 'From Silence to Soulmates - Our Valentine\'s Journey',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF4F7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-heartbeat">❤️</div>
          <div className="text-2xl font-romantic text-rose-500 animate-pulse">Loading our love story...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4F7] selection:bg-rose-100">
      <FloatingHearts />
      <RoseShower active={isRoseShowerActive} onComplete={() => setIsRoseShowerActive(false)} />

      <audio ref={audioRef} src="https://www.bensound.com/bensound-music/bensound-love.mp3" loop />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-rose-950/20 backdrop-blur-xl p-4">
          <div className="bg-white p-6 md:p-12 rounded-[4rem] shadow-2xl max-w-sm w-full text-center border-8 border-pink-50 animate-fade-in">
            <div className="text-8xl mb-8">🌾🐕🏏</div>
            <h2 className="text-4xl font-romantic font-bold text-rose-500 mb-6">Hey Likhita!</h2>
            <p className="text-gray-400 text-[10px] mb-8 font-black uppercase tracking-widest leading-relaxed px-4">From silent Intermediate students to soulmates. Ready for Mohith's surprise?</p>
            <input
              type="text"
              placeholder="Confirm your name..."
              value={herName}
              onChange={(e) => setHerName(e.target.value)}
              className="w-full px-8 py-5 rounded-[2rem] border-2 border-pink-50 mb-10 focus:border-rose-400 outline-none transition-all text-center text-xl font-bold text-rose-700 shadow-inner"
              onKeyPress={(e) => e.key === 'Enter' && saveSettings()}
            />
            <button
              onClick={saveSettings}
              className="w-full bg-rose-500 text-white font-black py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-[11px]"
            >
              Enter Our Village
            </button>
          </div>
        </div>
      )}

      {/* Sticky Simple Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-2xl border border-white px-4 md:px-8 py-3 rounded-full flex gap-2 md:gap-8 items-center shadow-lg">
        <span className="font-romantic text-lg sm:text-xl md:text-2xl font-bold text-rose-600">Our Arranged Destiny</span>
        <div className="h-4 w-px bg-rose-100"></div>
        <div className="flex gap-3 md:gap-6 items-center">
          <button onClick={triggerRoses} className="text-xl hover:scale-125 transition-transform">🌹</button>
          <button onClick={() => setIsMusicPlaying(!isMusicPlaying)} className="text-xl hover:scale-125 transition-transform">
            {isMusicPlaying ? '🔊' : '🔇'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-6 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase mb-8 border border-emerald-100">
            Intermediate Campus &bull; Arranged Marriage &bull; Village Dream
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-romantic font-bold text-gray-800 leading-none mb-10">
            Finished <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-rose-500 bg-clip-text text-transparent italic">
              In Style.
            </span>
          </h1>

          <DualHeartFrame mohithAvatar={mohithAvatar} likhitaAvatar={likhitaAvatar} />

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-medium italic mt-12 max-w-2xl mx-auto leading-relaxed px-4">
            "In Intermediate, we only said 'Bye'. Now, after those two years of silence and our parents' perfect match, I never want to say it again. I love you more than Thala's winning six and our peaceful village sunsets."
          </p>

          <Countdown />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto space-y-32 pb-40">
        <LoveStats />

        <section id="timeline">
          <LoveTimeline mohithAvatar={mohithAvatar} likhitaAvatar={likhitaAvatar} />
        </section>

        <section id="valentine-week">
          <ValentineWeek />
        </section>

        <section id="fun-stuff" className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6">
          <LoveJar name={herName} />
          <VirtualHug />
        </section>

        <section id="vouchers">
          <LoveCoupons />
        </section>

        <FinalSurprise name={herName} onSurprise={triggerRoses} />
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] bg-rose-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-fade-in"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <footer className="text-center py-20 bg-white border-t border-rose-50">
        <div className="text-4xl mb-4">🏏☕🐕🌾</div>
        <p className="text-rose-300 font-black uppercase tracking-[0.5em] text-[10px]">
          From "Daily Bye" to "Always Mine" &bull; Mohith ❤️ Likhita &bull; 2026
        </p>
      </footer>
    </div>
  );
};

export default SimpleFunnyApp;
