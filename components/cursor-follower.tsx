'use client';

import { useEffect, useState } from 'react';

export function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      aria-hidden
    >
      <div
        className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/20 bg-foreground/5 transition-opacity duration-150"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
