
import React, { useEffect, useRef } from 'react';

const LoveConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: any[] = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          originalX: Math.random() * canvas.width,
          originalY: Math.random() * canvas.height,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ec4899';
      
      stars.forEach(star => {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          star.x -= dx * 0.02;
          star.y -= dy * 0.02;
        } else {
          star.x += (star.originalX - star.x) * 0.01;
          star.y += (star.originalY - star.y) * 0.01;
        }

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
        if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect stars
        stars.forEach(otherStar => {
          const ddx = star.x - otherStar.x;
          const ddy = star.y - otherStar.y;
          const distance = Math.sqrt(ddx * ddx + ddy * ddy);
          if (distance < 50) {
            ctx.strokeStyle = `rgba(244, 114, 182, ${1 - distance / 50})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(otherStar.x, otherStar.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="relative h-[400px] w-full bg-rose-50/20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-romantic font-bold text-rose-300 opacity-40">
          Our Love is Written in the Stars
        </h2>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair" />
    </div>
  );
};

export default LoveConstellation;
