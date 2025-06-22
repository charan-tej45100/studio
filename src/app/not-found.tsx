"use client";

import { useState, useEffect, useRef } from 'react';

// A list of colors to cycle through on each bounce
const colors = [
  '#FF143C', // Red
  '#39FF14', // Green
  '#1E90FF', // DodgerBlue
  '#FFD700', // Gold
  '#FF69B4', // HotPink
  '#9400D3', // DarkViolet
];

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Use refs for animation values to avoid re-triggering the animation loop effect
  const positionRef = useRef({ x: 50, y: 50 });
  const velocityRef = useRef({ vx: 2, vy: 2 });
  const colorRef = useRef(colors[0]);

  // A dummy state to trigger re-renders on each animation frame
  const [, setTick] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true and randomize starting values only on the client
  useEffect(() => {
    setIsClient(true);
    positionRef.current = { x: Math.random() * 150 + 50, y: Math.random() * 150 + 50 };
    velocityRef.current = { vx: (Math.random() > 0.5 ? 1 : -1) * 2, vy: (Math.random() > 0.5 ? 1 : -1) * 2 };
    colorRef.current = colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;

    const move = () => {
      if (!containerRef.current || !textRef.current) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }

      const container = containerRef.current.getBoundingClientRect();
      const text = textRef.current.getBoundingClientRect();

      let { x, y } = positionRef.current;
      let { vx, vy } = velocityRef.current;
      let wallHit = false;

      x += vx;
      y += vy;

      // Check for wall collisions and reverse velocity
      if (x <= 0 || x + text.width >= container.width) {
        vx = -vx;
        wallHit = true;
      }
      if (y <= 0 || y + text.height >= container.height) {
        vy = -vy;
        wallHit = true;
      }

      // Change color on bounce
      if (wallHit) {
        const currentIndex = colors.indexOf(colorRef.current);
        const nextIndex = (currentIndex + 1) % colors.length;
        colorRef.current = colors[nextIndex];
      }

      positionRef.current = { x, y };
      velocityRef.current = { vx, vy };

      // Trigger a re-render to show the updated position and color
      setTick(tick => tick + 1);

      animationFrameId = requestAnimationFrame(move);
    };

    animationFrameId = requestAnimationFrame(move);

    // Clean up the animation frame on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]);

  // Return null on the server and initial client render to avoid hydration errors
  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <h1
        ref={textRef}
        className="absolute text-8xl font-extrabold tracking-tight"
        style={{
          transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
          color: colorRef.current,
          textShadow: `0 0 10px ${colorRef.current}, 0 0 20px ${colorRef.current}`,
          willChange: 'transform',
        }}
      >
        404
      </h1>
    </div>
  );
}
