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
  isWelcome?: boolean;
}

export const ConfettiEffect = ({
  isActive,
  duration = 3000,
  isWelcome = false,
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
    "#ff69b4",
    "#da70d6",
    "#ff1493",
    "#ffb6c1",
    "#ffc0cb",
  ];

  useEffect(() => {
    if (!isActive) return;

    const createParticles = () => {
      const newParticles: ConfettiParticle[] = [];
      const particleCount = isWelcome ? 150 : 50; // More particles for welcome effect

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: isWelcome
            ? Math.random() * window.innerWidth
            : Math.random() * window.innerWidth,
          y: isWelcome ? -20 : -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: isWelcome ? Math.random() * 12 + 6 : Math.random() * 8 + 4, // Larger particles for welcome
          velocityX: isWelcome
            ? (Math.random() - 0.5) * 6
            : (Math.random() - 0.5) * 4,
          velocityY: isWelcome ? Math.random() * 4 + 3 : Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: isWelcome
            ? (Math.random() - 0.5) * 15
            : (Math.random() - 0.5) * 10,
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
            velocityY: particle.velocityY + (isWelcome ? 0.08 : 0.1), // Slightly slower gravity for welcome
          }))
          .filter((particle) => particle.y < window.innerHeight + 100)
      );
    }, 16);

    const timeout = setTimeout(
      () => {
        setParticles([]);
      },
      isWelcome ? duration * 1.5 : duration
    ); // Longer duration for welcome effect

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, duration, isWelcome]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${
            isWelcome ? "animate-bounce" : "animate-bounce"
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            animation: isWelcome ? "bounce 2s infinite" : "bounce 1s infinite",
          }}
        />
      ))}
    </div>
  );
};
