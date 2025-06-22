
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

// A list of colors to cycle through for the police light effect
const colors = [
  '#FF143C', // Red
  '#1E90FF', // DodgerBlue
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
  blinkOffset: number;
  ref: React.RefObject<HTMLHeadingElement>;
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  
  const elements = useMemo<BouncingElement[]>(() => {
    const initialElements: BouncingElement[] = [];
    
    for (let i = 1; i <= 11; i++) {
      initialElements.push({
        id: i,
        text: '404',
        x: 50 + i * 20,
        y: 50 + i * 20,
        vx: 1,
        vy: 1,
        color: colors[i % colors.length],
        className: 'absolute text-2xl font-bold tracking-tight',
        blinkOffset: 0,
        ref: React.createRef<HTMLHeadingElement>(),
      });
    }
    return initialElements;
  }, []);
  
  const elementsRef = useRef<BouncingElement[]>(elements);
  const [isClient, setIsClient] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isGlitchingIntensely, setIsGlitchingIntensely] = useState(false);
  const [lightningBolt, setLightningBolt] = useState<{
    key: number;
    top: string;
    left: string;
    transform: string;
  } | null>(null);


  useEffect(() => {
    // This effect runs once on the client to trigger re-rendering with client-side state
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This effect runs after the component is mounted on the client and isClient is true
    if (isClient) {
      // Randomize properties on the client to avoid hydration mismatch,
      // now that the container ref is guaranteed to be available.
      elementsRef.current.forEach(el => {
        const container = containerRef.current;
        if (container) {
          const elementApproxWidth = 80;
          el.x = Math.random() * (container.clientWidth - elementApproxWidth);
          el.y = Math.random() * (container.clientHeight - elementApproxWidth);
          el.vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5);
          el.vy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5);
          el.blinkOffset = Math.random() * 1000; // Add random blink offset
        }
      });
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const intervalId = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 1500); // Pulse every 1.5 seconds

    return () => clearInterval(intervalId);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    let flashTimeout: NodeJS.Timeout;

    const triggerFlash = () => {
      if (containerRef.current) {
        const top = `${Math.random() * 80}vh`;
        const left = `${Math.random() * 80}vw`;
        const transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})`;
        setLightningBolt({ key: Date.now(), top, left, transform });
      }

      setIsFlashing(true);
      setIsGlitchingIntensely(true);
      
      setTimeout(() => {
        setIsFlashing(false);
        setLightningBolt(null);
        setIsGlitchingIntensely(false);
      }, 120); // Flash duration

      const nextFlashIn = Math.random() * 5000 + 3000; // Next flash in 3-8 seconds
      flashTimeout = setTimeout(triggerFlash, nextFlashIn);
    };

    flashTimeout = setTimeout(triggerFlash, Math.random() * 5000 + 2000);

    return () => clearTimeout(flashTimeout);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;

    const move = () => {
      if (!containerRef.current || !centerContentRef.current) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }
      const container = containerRef.current.getBoundingClientRect();
      const centerRect = centerContentRef.current.getBoundingClientRect();
      
      elementsRef.current.forEach(el => {
        const textEl = el.ref.current;
        if (!textEl) return;
        
        const textRect = textEl.getBoundingClientRect();
        if (textRect.width === 0 || textRect.height === 0) return;

        // Update position for this frame
        el.x += el.vx;
        el.y += el.vy;
        
        // AABB collision detection with the central content box
        const elCenterX = el.x + textRect.width / 2;
        const elCenterY = el.y + textRect.height / 2;
        const boxCenterX = (centerRect.left - container.left) + centerRect.width / 2;
        const boxCenterY = (centerRect.top - container.top) + centerRect.height / 2;

        const dx = elCenterX - boxCenterX;
        const dy = elCenterY - boxCenterY;

        const combinedHalfWidths = textRect.width / 2 + centerRect.width / 2;
        const combinedHalfHeights = textRect.height / 2 + centerRect.height / 2;
        
        if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
          const overlapX = combinedHalfWidths - Math.abs(dx);
          const overlapY = combinedHalfHeights - Math.abs(dy);

          // Determine which axis has the smallest overlap
          if (overlapX >= overlapY) {
            // Collision is on the Y axis (top/bottom)
            el.vy *= -1;
            // Correct the position to be outside the box
            el.y += dy > 0 ? overlapY : -overlapY;
          } else {
            // Collision is on the X axis (left/right)
            el.vx *= -1;
            // Correct the position to be outside the box
            el.x += dx > 0 ? overlapX : -overlapX;
          }
        }

        // Check for collision with container walls
        if (el.x <= 0) {
          el.x = 0;
          el.vx *= -1;
        } else if (el.x + textRect.width >= container.width) {
          el.x = container.width - textRect.width;
          el.vx *= -1;
        }

        if (el.y <= 0) {
          el.y = 0;
          el.vy *= -1;
        } else if (el.y + textRect.height >= container.height) {
          el.y = container.height - textRect.height;
          el.vy *= -1;
        }

        // Police light blinking effect
        const cycle = Math.floor((Date.now() + el.blinkOffset) / 250) % colors.length;
        const displayColor = colors[cycle];

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
      {isFlashing && (
        <div className="absolute inset-0 z-[100] bg-white opacity-80 pointer-events-none"></div>
      )}
      {lightningBolt && (
        <svg
          key={lightningBolt.key}
          viewBox="0 0 32 32"
          className="absolute z-[101] pointer-events-none w-48 h-auto"
          style={{
            top: lightningBolt.top,
            left: lightningBolt.left,
            transform: lightningBolt.transform,
            filter: 'drop-shadow(0 0 15px white) drop-shadow(0 0 30px white)',
          }}
          fill="rgba(255, 255, 255, 0.9)"
        >
          <path d="M17.47,1.25l-9,15A1,1,0,0,0,9.3,18H14.8L13,29.75a1,1,0,0,0,1.74.82l9-18A1,1,0,0,0,22.7,11H17.2l1.8-8.22A1,1,0,0,0,17.47,1.25Z" />
        </svg>
      )}
      <div ref={centerContentRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ zIndex: 10 }}>
        <h1
          className="text-8xl font-extrabold tracking-tight flex flex-col items-center"
          style={{
            color: '#FF143C',
            textShadow: isGlowing
              ? '0 0 10px #FF143C, 0 0 20px #FF143C, 0 0 40px #FF143C, 0 0 60px #FFD700'
              : '0 0 10px #FF143C, 0 0 20px #FF143C',
            transition: 'text-shadow 0.5s ease-in-out',
          }}
        >
          404
          <p
            className={`glitch text-4xl font-bold mt-[-10px] ${isGlitchingIntensely ? 'glitch-intensifies' : ''}`}
            data-text="Page not Found"
            style={{
              textShadow: '0 0 5px white, 0 0 10px white'
            }}
          >
            Page not Found
          </p>
        </h1>
        <Button asChild variant="outline" className="mt-8 bg-transparent border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
        </Button>
      </div>
      
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
          }}
        >
          {el.text}
        </h1>
      ))}
    </div>
  );
}
