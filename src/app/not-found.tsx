"use client"

import { useState, useEffect } from 'react';

const NUM_ELEMENTS = 7;

export default function NotFound() {
  const [elements, setElements] = useState<{
    top: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
    isColorChanging: boolean;
  }[]>([]);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids hydration mismatch errors.
    const newElements = Array.from({ length: NUM_ELEMENTS }).map(() => ({
      top: `${Math.random() * 80 + 10}%`, // Start somewhere in the middle
      left: `${Math.random() * 80 + 10}%`,
      animationDuration: `${Math.random() * 15 + 15}s`, // Random duration between 15s and 30s
      animationDelay: `-${Math.random() * 10}s`, // Negative delay to start at a random point in the animation
      isColorChanging: Math.random() > 0.5, // Randomly decide if it color-changes
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {elements.map((element, i) => (
        <h1
          key={i}
          className={`animate-move-around absolute text-8xl font-extrabold tracking-tight opacity-70 ${
            element.isColorChanging ? 'animate-color-change' : ''
          }`}
          style={{
            color: !element.isColorChanging ? '#FF143C' : undefined,
            top: element.top,
            left: element.left,
            animationDuration: element.animationDuration,
            animationDelay: element.animationDelay,
          }}
        >
          404
        </h1>
      ))}
    </div>
  );
}
