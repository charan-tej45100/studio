"use client"

import { useState, useEffect } from 'react';

const NUM_ELEMENTS = 7;

export default function NotFound() {
  const [elements, setElements] = useState<{ top: string; left: string; animationDuration: string; animationDelay: string; }[]>([]);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids hydration mismatch errors.
    const newElements = Array.from({ length: NUM_ELEMENTS }).map(() => ({
      top: `${Math.random() * 80 + 10}%`, // Start somewhere in the middle
      left: `${Math.random() * 80 + 10}%`,
      animationDuration: `${Math.random() * 15 + 15}s`, // Random duration between 15s and 30s
      animationDelay: `-${Math.random() * 10}s`, // Negative delay to start at a random point in the animation
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {elements.map((style, i) => (
        <h1
          key={i}
          className={`animate-move-around absolute text-8xl font-extrabold tracking-tight opacity-70 ${
            i % 2 === 0 ? 'animate-color-change' : ''
          }`}
          style={{
            color: i % 2 !== 0 ? '#FF143C' : undefined,
            ...style,
          }}
        >
          404
        </h1>
      ))}
    </div>
  );
}
