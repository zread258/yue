
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Heart, Sparkles, Loader2, Stars, Navigation } from 'lucide-react';
import FireworkCanvas from './components/FireworkCanvas.tsx';
import { generateNewYearWish } from './services/geminiService.ts';
import { AppState } from './types.ts';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const CosmicBackground = useMemo(() => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      
      {/* Background Stars */}
      {[...Array(150)].map((_, i) => (
        <div 
          key={`star-${i}`} 
          className="absolute bg-white rounded-full opacity-30 animate-pulse" 
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2}px`,
            height: `${Math.random() * 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={`shooting-${i}`}
          className="shooting-star"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100 + 50}%`,
            animation: `shoot ${Math.random() * 3 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 15}s`
          }}
        />
      ))}
    </div>
  ), []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const target = new Date(2026, 0, 1, 0, 0, 0); 
    const difference = target.getTime() - now.getTime();
    return difference > 0 ? {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    } : { d: 0, h: 0, m: 0, s: 0 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const handleCelebrate = async () => {
    setLoading(true);
    const generatedWish = await generateNewYearWish("Yue");
    setWish(generatedWish);
    setLoading(false);
    setState(AppState.CELEBRATION);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {CosmicBackground}
      
      {state === AppState.CELEBRATION && <FireworkCanvas />}

      <div className="z-10 text-center px-8 w-full max-w-5xl">
        {state === AppState.INTRO && (
          <div className="animate-in fade-in zoom-in-90 duration-1000">
            <h1 className="text-8xl md:text-[12rem] font-romantic glow-title mb-6 text-white leading-none">
              Yue
            </h1>
            <p className="text-xs md:text-sm font-elegant tracking-[1em] text-indigo-200/50 uppercase mb-20">
              The Horizon of Eternity 2026
            </p>
            <button 
              onClick={() => setState(AppState.COUNTDOWN)}
              className="group relative px-16 py-4 glass-morphism rounded-full hover:bg-white/10 transition-all duration-700"
            >
              <span className="relative z-10 flex items-center gap-6 text-[10px] tracking-[0.5em] text-white font-elegant uppercase">
                Voyage into the night <Navigation className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        )}

        {state === AppState.COUNTDOWN && (
          <div className="animate-in fade-in slide-in-from-top-12 duration-1000 space-y-24">
            <div className="space-y-8">
               <p className="text-[10px] font-elegant tracking-[0.6em] text-white/30 uppercase flex items-center justify-center gap-4">
                 <div className="h-[1px] w-12 bg-white/10"></div>
                 Approaching 2026
                 <div className="h-[1px] w-12 bg-white/10"></div>
               </p>
               <div className="flex gap-10 md:gap-20 justify-center items-center">
                {[
                  { label: 'days', value: timeLeft.d },
                  { label: 'hours', value: timeLeft.h },
                  { label: 'mins', value: timeLeft.m },
                  { label: 'secs', value: timeLeft.s }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <span className="text-5xl md:text-8xl font-thin font-elegant text-white/90 tabular-nums">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 mt-4">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleCelebrate}
              disabled={loading}
              className="group relative px-20 py-5 bg-white text-black rounded-full font-elegant text-[11px] tracking-[0.5em] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "EMBRACE THE INFINITE"
              )}
            </button>
          </div>
        )}

        {state === AppState.CELEBRATION && (
          <div className="animate-in scale-95 fade-in duration-1000 space-y-16 w-full max-w-4xl mx-auto">
            <div className="glass-morphism p-12 md:p-20 rounded-[3rem] relative border-white/10">
              <Sparkles className="absolute top-10 right-10 w-5 h-5 text-indigo-400/30" />
              
              <h2 className="text-5xl md:text-7xl font-romantic mb-12 text-white glow-title">
                Happy 2026
              </h2>
              
              <div className="text-lg md:text-2xl leading-relaxed text-white/95 font-light italic whitespace-pre-line tracking-wide font-romantic">
                {wish}
              </div>

              <div className="mt-16 flex justify-center items-center gap-6 text-white/20">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white/20"></div>
                <Stars className="w-4 h-4" />
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-white/20"></div>
              </div>
            </div>

            <button 
              onClick={() => setState(AppState.INTRO)}
              className="text-white/20 hover:text-white/50 text-[10px] tracking-[0.8em] transition-all uppercase font-elegant"
            >
              Relive the Magic
            </button>
          </div>
        )}
      </div>

      <footer className="absolute bottom-12 text-[10px] tracking-[1.2em] text-white/5 uppercase font-elegant pointer-events-none select-none">
        Yue • Infinite • 2026
      </footer>
    </div>
  );
};

export default App;
