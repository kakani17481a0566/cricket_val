
import React, { useEffect, useState } from 'react';

const RoseShower: React.FC<{ active: boolean; onComplete: () => void }> = ({ active, onComplete }) => {
  const [petals, setPetals] = useState<{ id: number; left: number; duration: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (active) {
      const newPetals = Array.from({ length: 40 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 2
      }));
      setPetals(newPetals);
      
      const timer = setTimeout(() => {
        setPetals([]);
        onComplete();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <>
      {petals.map(petal => (
        <div
          key={petal.id}
          className="rose-petal flex items-center justify-center"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            fontSize: `${petal.size}px`
          }}
        >
          🌹
        </div>
      ))}
    </>
  );
};

export default RoseShower;
