
import React, { useEffect, useRef } from 'react';
import { Particle } from '../types';

const FireworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const createFirework = (x: number, y: number) => {
    // Cinematic Galaxy Palette: Indigo, Deep Pink, Starlight Blue, Golden Dust, Pure White
    const colors = ['#6366f1', '#ec4899', '#bae6fd', '#facc15', '#ffffff', '#c084fc'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 150 + Math.random() * 100;
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 0.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 2 + 0.2
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(1, 1, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        
        p.vx *= 0.99;
        p.vy += 0.03;
        p.alpha -= 0.005;

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      if (Math.random() < 0.04) {
        createFirework(Math.random() * canvas.width, Math.random() * (canvas.height * 0.5));
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (e: MouseEvent) => createFirework(e.clientX, e.clientY);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-auto z-0" 
      style={{ cursor: 'crosshair' }}
    />
  );
};

export default FireworkCanvas;
