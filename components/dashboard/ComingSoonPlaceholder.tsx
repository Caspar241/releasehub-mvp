'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ComingSoonPlaceholderProps {
  featureName: string;
  status?: 'in-development' | 'in-beta' | 'launching-soon';
}

const statusLabels = {
  'in-development': 'COMING SOON',
  'in-beta': 'BETA',
  'launching-soon': 'BALD VERFÜGBAR',
};

// Elegant Flow Droplet Component - Apple-like Y-Axis Idle Motion
function FlowDroplet({
  delay = 0,
  size = 140,
  initialY = 0,
  range = 25,
  duration = 4.5
}: {
  delay?: number;
  size?: number;
  initialY?: number;
  range?: number;
  duration?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-auto"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(79, 209, 255, 0.35) 0%, rgba(79, 209, 255, 0.12) 40%, rgba(79, 209, 255, 0.02) 70%, transparent 100%)',
        filter: 'blur(24px)',
        width: `${size}px`,
        height: `${size}px`,
        left: '50%',
        top: '50%',
        marginLeft: `${-size / 2}px`,
        marginTop: `${initialY - size / 2}px`,
      }}
      initial={{ opacity: 0.2 }}
      animate={{
        opacity: isHovered ? 1 : [0.2, 0.4, 0.2],
        y: [0, -range, 0],
        scale: isHovered ? 1.15 : [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1], // Apple-like easing
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    />
  );
}

export default function ComingSoonPlaceholder({
  featureName,
  status = 'in-development',
}: ComingSoonPlaceholderProps) {
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  return (
    <div
      className="relative min-h-screen p-6 lg:p-10 flex items-center justify-center"
      style={{
        /* Same grid background as homepage */
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: 'center center',
        /* Vignette effect */
        boxShadow: 'inset 0 0 300px rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Animated grid overlay with subtle breathing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79, 209, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 209, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
          animation: 'gridPulse 8s ease-in-out infinite',
        }}
      />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          className="relative rounded-3xl p-16 md:p-24 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.6) 0%, rgba(15, 17, 21, 0.4) 100%)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(79, 209, 255, 0.08)',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.03),
              0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(0, 0, 0, 0.1)
            `,
          }}
          onHoverStart={() => setIsContainerHovered(true)}
          onHoverEnd={() => setIsContainerHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Minimal noise texture overlay - very subtle */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
            }}
          />

          {/* Status Badge - top right */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="inline-block px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent/90 bg-accent/8 border border-accent/15 rounded-full backdrop-blur-sm">
              {statusLabels[status]}
            </span>
          </motion.div>

          {/* Content Area */}
          <div className="text-center space-y-12 relative z-10">
            {/* Elegant Flow Animation - Y-Axis Idle Motion */}
            <div className="flex justify-center py-12">
              <div className="relative w-52 h-52 md:w-60 md:h-60 flex items-center justify-center">
                {/* Multiple async flow droplets with different timings */}
                <FlowDroplet delay={0} size={160} initialY={-10} range={30} duration={5.2} />
                <FlowDroplet delay={1.7} size={120} initialY={15} range={22} duration={4.8} />
                <FlowDroplet delay={3.4} size={90} initialY={-5} range={18} duration={5.5} />

                {/* Center glass sphere with subtle pulse */}
                <motion.div
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79, 209, 255, 0.08) 0%, rgba(79, 209, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(79, 209, 255, 0.12)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.08),
                      0 8px 32px rgba(0, 0, 0, 0.4),
                      0 0 60px rgba(79, 209, 255, 0.15)
                    `,
                  }}
                  initial={{ opacity: 0.7, scale: 0.96 }}
                  animate={{
                    opacity: isContainerHovered ? 1 : [0.7, 0.9, 0.7],
                    scale: isContainerHovered ? 1.02 : [0.96, 1, 0.96],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                  }}
                >
                  {/* Core glowing dot - minimal & elegant */}
                  <motion.div
                    className="w-2.5 h-2.5 md:w-3 md:h-3 bg-accent rounded-full"
                    style={{
                      boxShadow: '0 0 20px rgba(79, 209, 255, 0.8), 0 0 40px rgba(79, 209, 255, 0.4)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: [0.45, 0, 0.55, 1],
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Headline - Clean, no dividers */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-tight">
                {featureName} werden bald freigeschaltet
              </h1>
              <p className="text-lg md:text-xl text-text-secondary/70 font-light tracking-wide">
                Stay tuned
              </p>
            </motion.div>

            {/* CTA Buttons - Clean spacing */}
            <motion.div
              className="flex flex-col items-center gap-5 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {/* Primary CTA */}
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium bg-accent text-text-inverse hover:bg-accent-hover transition-all duration-200 shadow-sm hover:shadow-glow btn-micro-lift"
              >
                Zurück zum Dashboard
              </Link>

              {/* Secondary Link */}
              <Link
                href="/dashboard"
                className="inline-block text-sm text-text-secondary/60 hover:text-accent transition-colors duration-200"
              >
                Andere Funktionen anzeigen
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
