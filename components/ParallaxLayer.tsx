'use client';

import { ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  direction?: 'up' | 'down';
}

export default function ParallaxLayer({
  children,
  speed = 'medium',
  className = '',
  direction = 'up',
}: ParallaxLayerProps) {
  // Parallax effect removed - now static
  // Speed and direction props kept for API compatibility but have no effect

  return (
    <div className={className}>
      {children}
    </div>
  );
}
