"use client";

import { useState, useEffect, useRef, useMemo } from 'react';

// A list of colors to cycle through on each bounce
const colors = [
  '#FF143C', // Red
  '#39FF14', // Green
  '#1E90FF', // DodgerBlue
  '#FFD700', // Gold
  '#FF69B4', // HotPink
  '#9400D3', // DarkViolet
];

interface BouncingElement {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  className: string;
  ref: React.RefObject<HTMLHeadingElement>;
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Using useMemo to create the initial elements only once, preventing re-creation on re-renders
  const elements = useMemo<BouncingElement[]>(() => {
    const initialElements: BouncingElement[] = [];
    
    // Main 404
    initialElements.push({
      id: 0,
      text: '404',
      x: Math.random() * 150 + 50,
      y: Math.random() * 150 + 50,
      vx: (Math.random() > 0.5 ? 1 : -1) * 1.5,
      vy: (Math.random() > 0.5 ? 1 : -1) * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      className: 'absolute text-8xl font-extrabold tracking-tight',
      ref: React.createRef<HTMLHeadingElement>(),
    });

    // 10 small 404s
    for (let i = 1; i <= 10; i++) {
      initialElements.push({
        id: i,
        text: '404',
        x: Math.random() * 200 + 50,
        y: Math.random() * 200 + 50,
        vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5),
        vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        className: 'absolute text-2xl font-bold tracking-tight',
        ref: React.createRef<HTMLHeadingElement>(),
      });
    }
    return initialElements;
  }, []);
  
  // A single ref to hold the state of all elements to avoid re-rendering inside the animation loop
  const elementsRef = useRef<BouncingElement[]>(elements);
  
  const [, setTick] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component only renders its content on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;

    const move = () => {
      if (!containerRef.current) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }
      const container = containerRef.current.getBoundingClientRect();
      
      elementsRef.current.forEach(el => {
        // Get the dimensions of the text element for accurate collision detection
        const text = el.ref.current?.getBoundingClientRect();
        if (!text || text.width === 0) return; // Skip if not rendered yet

        let wallHit = false;

        // Update position
        el.x += el.vx;
        el.y += el.vy;

        // Check for wall collisions
        if (el.x <= 0 || el.x + text.width >= container.width) {
          el.vx = -el.vx;
          wallHit = true;
        }
        if (el.y <= 0 || el.y + text.height >= container.height) {
          el.vy = -el.vy;
          wallHit = true;
        }

        // Change color on bounce
        if (wallHit) {
          const currentIndex = colors.indexOf(el.color);
          const nextIndex = (currentIndex + 1) % colors.length;
          el.color = colors[nextIndex];
        }
      });

      // Trigger a re-render to show the updated positions and colors
      setTick(tick => tick + 1);
      animationFrameId = requestAnimationFrame(move);
    };

    animationFrameId = requestAnimationFrame(move);

    // Clean up animation on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]);

  // Return null on server and initial client render to avoid hydration errors
  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {elementsRef.current.map(el => (
        <h1
          key={el.id}
          ref={el.ref}
          className={el.className}
          style={{
            transform: `translate(${el.x}px, ${el.y}px)`,
            color: el.color,
            textShadow: `0 0 10px ${el.color}, 0 0 20px ${el.color}`,
            willChange: 'transform',
          }}
        >
          {el.text}
        </h1>
      ))}
    </div>
  );
}
