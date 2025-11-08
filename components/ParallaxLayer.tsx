'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Speed multipliers
  const speedMultipliers = {
    slow: 50,
    medium: 100,
    fast: 150,
  };

  const multiplier = speedMultipliers[speed];
  const directionMultiplier = direction === 'up' ? -1 : 1;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, multiplier * directionMultiplier]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`parallax-slow ${className}`}
    >
      {children}
    </motion.div>
  );
}
