'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // Duration in seconds for one loop
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 20,
  direction = 'left',
  className = '',
  pauseOnHover = false,
}: MarqueeProps) {
  const directionValue = direction === 'left' ? -1 : 1;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8"
        animate={{
          x: directionValue === -1 ? [0, '-50%'] : ['-50%', 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {/* First set */}
        <div className="flex gap-8 shrink-0">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-8 shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
