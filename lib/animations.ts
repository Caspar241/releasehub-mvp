/**
 * Framer Motion Animation System
 * Comprehensive motion design system with cinematic Apple-style animations
 */

import { Variants, Transition, useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

// ====== EASING CURVES ======

// Apple-like easing curve (primary)
export const easing = [0.22, 1, 0.36, 1] as const;

// Alternative easing curves
export const easingSmooth = [0.25, 0.46, 0.45, 0.94] as const;
export const easingSnappy = [0.34, 1.56, 0.64, 1] as const;
export const easingCinematic = [0.16, 1, 0.3, 1] as const;

// ====== FADE ANIMATIONS ======

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

// Cinematic fade with blur
export const fadeInBlur: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: easingCinematic,
    },
  },
};

// ====== SCALE ANIMATIONS ======

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easingCinematic,
    },
  },
};

export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ====== STAGGER ANIMATIONS ======

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

// ====== NAVIGATION ANIMATIONS ======

export const slideInFromRight: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};

export const slideInFromLeft: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
  exit: {
    y: '100%',
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const navItemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

// ====== SPECIAL EFFECTS ======

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const gentleRotate: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: easing },
  },
};

// Glow on hover
export const glowHover: Variants = {
  rest: { filter: 'brightness(1)' },
  hover: {
    filter: 'brightness(1.1)',
    transition: { duration: 0.2 },
  },
};

// ====== PARALLAX ANIMATIONS ======

export const parallaxLayerSlow: Variants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom * 0.5,
    transition: {
      duration: 0,
    },
  }),
};

export const parallaxLayerMedium: Variants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom * 0.3,
    transition: {
      duration: 0,
    },
  }),
};

export const parallaxLayerFast: Variants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom * 0.15,
    transition: {
      duration: 0,
    },
  }),
};

// ====== PAGE TRANSITIONS ======

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: easing },
  },
};

// ====== SCROLL-TRIGGERED ANIMATIONS ======

// Viewport settings for scroll animations
export const scrollViewport = {
  once: true,
  margin: '-100px',
  amount: 0.3,
};

export const scrollViewportLazy = {
  once: true,
  margin: '-50px',
  amount: 0.1,
};

// ====== MARQUEE ANIMATION ======

export const marqueeVariant: Variants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 20,
        ease: 'linear',
      },
    },
  },
};

// ====== CUSTOM HOOKS ======

/**
 * Hook for parallax scroll effect
 * Usage:
 * const y = useParallaxScroll(ref, [0, 300], [0, -100]);
 */
export function useParallaxScroll(
  ref: RefObject<HTMLElement>,
  inputRange: number[],
  outputRange: number[]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], outputRange);
}

// ====== TRANSITION PRESETS ======

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: easingCinematic,
};

export const snappyTransition: Transition = {
  duration: 0.3,
  ease: easingSnappy,
};
