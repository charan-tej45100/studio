
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';

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
  isBlinking: boolean;
  blinkOffset: number;
  ref: React.RefObject<HTMLHeadingElement>;
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use useMemo with static values to prevent SSR issues.
  const elements = useMemo<BouncingElement[]>(() => {
    const initialElements: BouncingElement[] = [];
    
    // Main 404
    initialElements.push({
      id: 0,
      text: '404',
      x: 150,
      y: 150,
      vx: 1.5,
      vy: 1.5,
      color: '#FF143C', // Red
      className: 'absolute text-8xl font-extrabold tracking-tight flex flex-col items-center',
      isBlinking: false,
      blinkOffset: 0,
      ref: React.createRef<HTMLHeadingElement>(),
    });

    // 16 small 404s
    for (let i = 1; i <= 16; i++) {
      initialElements.push({
        id: i,
        text: '404',
        x: 50 + i * 20,
        y: 50 + i * 20,
        vx: 1,
        vy: 1,
        color: colors[i % colors.length],
        className: 'absolute text-2xl font-bold tracking-tight',
        isBlinking: true,
        blinkOffset: 0,
        ref: React.createRef<HTMLHeadingElement>(),
      });
    }
    return initialElements;
  }, []);
  
  const elementsRef = useRef<BouncingElement[]>(elements);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Run only on client
    setIsClient(true);
    
    // Randomize properties on the client to avoid hydration mismatch
    elementsRef.current.forEach(el => {
      const container = containerRef.current;
      if (container) {
          el.x = Math.random() * (container.clientWidth - 250);
          el.y = Math.random() * (container.clientHeight - 250);
      }
      el.vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5);
      el.vy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5);
      el.blinkOffset = Math.random() * 1000; // Add random blink offset
    });
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
        const textEl = el.ref.current;
        if (!textEl) return;
        
        const textRect = textEl.getBoundingClientRect();
        if (textRect.width === 0) return;

        let wallHit = false;

        el.x += el.vx;
        el.y += el.vy;

        if (el.x <= 0) {
          el.x = 0;
          el.vx = -el.vx;
          wallHit = true;
        } else if (el.x + textRect.width >= container.width) {
          el.x = container.width - textRect.width;
          el.vx = -el.vx;
          wallHit = true;
        }

        if (el.y <= 0) {
          el.y = 0;
          el.vy = -el.vy;
          wallHit = true;
        } else if (el.y + textRect.height >= container.height) {
          el.y = container.height - textRect.height;
          el.vy = -el.vy;
          wallHit = true;
        }

        if (wallHit && el.id !== 0) {
          const currentIndex = colors.indexOf(el.color);
          const nextIndex = (currentIndex + 1) % colors.length;
          el.color = colors[nextIndex];
        }

        let displayColor = el.color;
        if (el.isBlinking) {
          // Use the offset to make blinking appear at random intervals
          const shouldBeWhite = Math.floor((Date.now() + el.blinkOffset) / 300) % 2 === 0;
          if (shouldBeWhite) {
            displayColor = '#FFFFFF';
          }
        }

        // Directly manipulate the DOM for performance
        textEl.style.transform = `translate(${el.x}px, ${el.y}px)`;
        textEl.style.color = displayColor;
        textEl.style.textShadow = `0 0 10px ${displayColor}, 0 0 20px ${displayColor}`;
      });

      animationFrameId = requestAnimationFrame(move);
    };

    animationFrameId = requestAnimationFrame(move);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]);

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
            willChange: 'transform, color, text-shadow',
            zIndex: el.id === 0 ? 1 : 'auto',
          }}
        >
          {el.text}
          {el.id === 0 && (
            <p
              className="glitch text-4xl font-bold mt-[-10px]"
              data-text="Page not Found"
              style={{
                textShadow: '0 0 5px white, 0 0 10px white'
              }}
            >
              Page not Found
            </p>
          )}
        </h1>
      ))}
    </div>
  );
}
