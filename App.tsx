
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Heart, Sparkles, Loader2, Moon, Stars } from 'lucide-react';
import FireworkCanvas from './components/FireworkCanvas';
import { generateYaranWish } from './services/geminiService';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Parallax Starfield Background
  const StarsBackground = useMemo(() => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="nebula top-[-10%] left-[-10%]"></div>
      <div className="nebula bottom-[-20%] right-[-10%]" style={{ animationDelay: '-10s', background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(0, 0, 0, 0) 70%)' }}></div>
      {[...Array(100)].map((_, i) => (
        <div 
          key={i} 
          className="star" 
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            '--duration': `${Math.random() * 3 + 2}s`
          } as any}
        />
      ))}
    </div>
  ), []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    const difference = target.getTime() - now.getTime();
    
    if (difference > 0) {
      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return { d: 0, h: 0, m: 0, s: 0 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const handleCelebrate = async () => {
    setLoading(true);
    const generatedWish = await generateYaranWish("Yaran");
    setWish(generatedWish);
    setLoading(false);
    setState(AppState.CELEBRATION);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {StarsBackground}
      
      {state === AppState.CELEBRATION && <FireworkCanvas />}

      <div className="z-10 text-center px-8 max-w-xl">
        {state === AppState.INTRO && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-6xl md:text-8xl font-romantic glow-gold mb-6 text-pink-100">
              For Yaran
            </h1>
            <p className="text-sm md:text-base font-elegant tracking-[0.4em] text-pink-200/60 uppercase mb-12">
              A Midnight Serenade
            </p>
            <button 
              onClick={() => setState(AppState.COUNTDOWN)}
              className="group relative px-10 py-3 rounded-full glass hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest text-pink-50">
                ENTER THE NIGHT <Moon className="w-4 h-4 text-pink-300 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>
        )}

        {state === AppState.COUNTDOWN && (
          <div className="animate-in fade-in scale-95 duration-1000 space-y-12">
            <div className="space-y-2">
              <h2 className="text-xs font-elegant tracking-[0.5em] text-pink-300/50 uppercase">Approaching 2025</h2>
              <div className="h-px w-12 bg-pink-500/30 mx-auto"></div>
            </div>
            
            <div className="flex gap-6 md:gap-12 justify-center items-baseline">
              {[
                { label: 'days', value: timeLeft.d },
                { label: 'hrs', value: timeLeft.h },
                { label: 'mins', value: timeLeft.m },
                { label: 'secs', value: timeLeft.s }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-4xl md:text-6xl font-light font-elegant text-pink-50 tabular-nums">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-pink-300/40 mt-2">{item.label}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleCelebrate}
              disabled={loading}
              className="mt-12 group relative px-12 py-4 bg-white text-black rounded-full font-elegant text-xs tracking-[0.2em] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "IGNITE THE STARS"
              )}
            </button>
          </div>
        )}

        {state === AppState.CELEBRATION && (
          <div className="animate-in zoom-in-95 fade-in duration-1000 space-y-10">
            <div className="glass p-10 md:p-14 rounded-[2rem] relative border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <Sparkles className="absolute top-6 left-6 w-5 h-5 text-pink-400/30" />
              
              <h2 className="text-4xl md:text-5xl font-romantic mb-8 text-pink-100 glow-gold">
                Happy New Year, Yaran
              </h2>
              
              <div className="text-lg md:text-xl leading-relaxed text-pink-50/90 font-light italic">
                "{wish}"
              </div>

              <div className="mt-12 flex justify-center gap-2">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
                <div className="w-8 h-px bg-white/10 self-center"></div>
                <Stars className="w-4 h-4 text-blue-400/50" />
              </div>
            </div>

            <p className="text-pink-200/30 text-[10px] tracking-[0.3em] uppercase">Touch the sky to light her fireworks</p>
            
            <button 
              onClick={() => setState(AppState.INTRO)}
              className="text-white/20 hover:text-white/40 text-[9px] tracking-[0.5em] transition-colors uppercase pt-8"
            >
              Rewatch Magic
            </button>
          </div>
        )}
      </div>

      <footer className="absolute bottom-10 text-[9px] tracking-[0.6em] text-white/10 uppercase font-elegant">
        Midnight Serenade • 2025
      </footer>
    </div>
  );
};

export default App;
