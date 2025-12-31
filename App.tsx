
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Heart, Sparkles, Loader2, Moon, Stars } from 'lucide-react';
import FireworkCanvas from './components/FireworkCanvas.tsx';
import { generateNewYearWish } from './services/geminiService.ts';
import { AppState } from './types.ts';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const StarsBackground = useMemo(() => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      {[...Array(120)].map((_, i) => (
        <div 
          key={i} 
          className="star" 
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            '--duration': `${Math.random() * 4 + 2}s`
          } as any}
        />
      ))}
    </div>
  ), []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    // 目标时间设定为 2026年1月1日
    const target = new Date(2026, 0, 1, 0, 0, 0); 
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
    const generatedWish = await generateNewYearWish("Yue");
    setWish(generatedWish);
    setLoading(false);
    setState(AppState.CELEBRATION);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden selection:bg-pink-500/30">
      {StarsBackground}
      
      {state === AppState.CELEBRATION && <FireworkCanvas />}

      <div className="z-10 text-center px-6 max-w-lg">
        {state === AppState.INTRO && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h1 className="text-7xl md:text-9xl font-romantic glow-text mb-2 text-pink-50">
              For Yue
            </h1>
            <p className="text-[10px] md:text-xs font-elegant tracking-[0.6em] text-pink-200/40 uppercase mb-16">
              A 2026 Starlit Beginning
            </p>
            <button 
              onClick={() => setState(AppState.COUNTDOWN)}
              className="group relative px-12 py-3 rounded-full glass hover:bg-white/5 transition-all duration-700 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4 text-[10px] tracking-[0.3em] text-pink-100 font-elegant">
                OPEN THE NIGHT <Heart className="w-3 h-3 text-pink-400 group-hover:scale-125 transition-transform" />
              </span>
            </button>
          </div>
        )}

        {state === AppState.COUNTDOWN && (
          <div className="animate-in fade-in zoom-in-95 duration-1000 space-y-16">
            <div className="space-y-4">
               <p className="text-[9px] font-elegant tracking-[0.4em] text-pink-200/40 uppercase">Counting down to our 2026</p>
               <div className="flex gap-8 md:gap-14 justify-center items-center">
                {[
                  { label: 'days', value: timeLeft.d },
                  { label: 'hours', value: timeLeft.h },
                  { label: 'mins', value: timeLeft.m },
                  { label: 'secs', value: timeLeft.s }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-light font-elegant text-pink-50/80 tabular-nums">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-pink-300/30 mt-2">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleCelebrate}
              disabled={loading}
              className="group relative px-14 py-4 bg-white/90 text-black rounded-full font-elegant text-[10px] tracking-[0.3em] transition-all hover:bg-white hover:tracking-[0.4em] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "WELCOME 2026"
              )}
            </button>
          </div>
        )}

        {state === AppState.CELEBRATION && (
          <div className="animate-in zoom-in-95 fade-in duration-1000 space-y-12">
            <div className="glass p-12 md:p-16 rounded-[3rem] relative border-white/5">
              <Sparkles className="absolute top-8 right-8 w-4 h-4 text-pink-400/20" />
              
              <h2 className="text-4xl md:text-6xl font-romantic mb-10 text-pink-50 glow-text">
                Happy 2026
              </h2>
              
              <div className="text-base md:text-lg leading-relaxed text-pink-100/80 font-light italic max-w-xs mx-auto">
                "{wish}"
              </div>

              <div className="mt-12 opacity-30 flex justify-center items-center gap-4">
                <div className="h-[1px] w-8 bg-pink-200"></div>
                <Stars className="w-3 h-3" />
                <div className="h-[1px] w-8 bg-pink-200"></div>
              </div>
            </div>

            <button 
              onClick={() => setState(AppState.INTRO)}
              className="text-white/10 hover:text-white/30 text-[8px] tracking-[0.5em] transition-colors uppercase"
            >
              Relive the magic
            </button>
          </div>
        )}
      </div>

      <footer className="absolute bottom-10 text-[8px] tracking-[0.8em] text-white/5 uppercase font-elegant pointer-events-none">
        Yue • Forever • 2026
      </footer>
    </div>
  );
};

export default App;
