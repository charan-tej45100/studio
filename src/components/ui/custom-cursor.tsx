
'use client';

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-2"
      style={{
        borderColor: '#FFD700',
        boxShadow: '0 0 15px #FFD700, 0 0 25px #FFD700',
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        transition: 'transform 120ms ease-out',
      }}
    />
  );
};

export default CustomCursor;
