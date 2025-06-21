
"use client"

import { useState, useEffect } from 'react';

const NUM_ELEMENTS = 7;

export default function NotFound() {
  const [elements, setElements] = useState<{
    top: string;
    left: string;
    animationDelay: string;
    isColorChanging: boolean;
  }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids hydration mismatch errors by ensuring the random values
    // are only generated and rendered on the client.
    setIsClient(true);
    const newElements = Array.from({ length: NUM_ELEMENTS }).map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      animationDelay: `-${Math.random() * 25}s`,
      isColorChanging: Math.random() > 0.5,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {isClient && elements.map((element, i) => {
        const animationClass = element.isColorChanging
          ? 'animate-move-around-colorful'
          : 'animate-move-around-static';
          
        const style: React.CSSProperties = {
          top: element.top,
          left: element.left,
          animationDelay: element.animationDelay,
          color: !element.isColorChanging ? '#FF143C' : undefined,
        };

        return (
          <h1
            key={i}
            className={`absolute text-8xl font-extrabold tracking-tight opacity-70 ${animationClass}`}
            style={style}
          >
            404
          </h1>
        );
      })}
    </div>
  );
}
