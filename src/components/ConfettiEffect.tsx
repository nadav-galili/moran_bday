import { useEffect, useState } from "react";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
}

interface ConfettiEffectProps {
  isActive: boolean;
  duration?: number;
}

export const ConfettiEffect = ({
  isActive,
  duration = 3000,
}: ConfettiEffectProps) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
    "#00d2d3",
    "#ff9f43",
    "#ff6348",
    "#2ed573",
    "#1e90ff",
    "#ff4757",
    "#ffa502",
  ];

  useEffect(() => {
    if (!isActive) return;

    const createParticles = () => {
      const newParticles: ConfettiParticle[] = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          velocityX: (Math.random() - 0.5) * 4,
          velocityY: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        });
      }

      setParticles(newParticles);
    };

    createParticles();

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            rotation: particle.rotation + particle.rotationSpeed,
            velocityY: particle.velocityY + 0.1, // gravity
          }))
          .filter((particle) => particle.y < window.innerHeight + 100)
      );
    }, 16);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, duration]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-bounce"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};
