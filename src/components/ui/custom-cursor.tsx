
'use client';

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target) {
        setIsPointer(
          window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
        );
      }
    };

    const handleMouseDown = () => setIsDown(true);
    const handleMouseUp = () => setIsDown(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const scale = isDown ? 0.7 : isPointer ? 1.5 : 1;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full"
      style={{
        backgroundColor: '#FFD700',
        boxShadow: '0 0 15px #FFD700, 0 0 25px #FFD700',
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${scale})`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

export default CustomCursor;
