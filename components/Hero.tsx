'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '@/lib/animations';
import MockupFrame from './MockupFrame';
import AnimatedBadge from './AnimatedBadge';

interface HeroProps {
  variant?: 'A' | 'B' | 'C';
}

export default function Hero({ variant = 'A' }: HeroProps) {
  return (
    <section className="relative section-spacing bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <AnimatedBadge text="0% Rights Taken" variant="primary" animate={false} />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-hero-mobile md:text-hero-desktop text-text-primary font-bold mb-6 leading-tight"
            >
              We scale the new gen of artists
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lead text-text-secondary mb-8 max-w-xl lg:mx-0 mx-auto"
            >
              Das erste Release-System, das Artists strukturiert, ohne einen einzigen Prozent ihrer Rechte zu nehmen. Europäisch. Fair. Gemacht für echte Arbeit.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/pricing" className="btn-primary">
                Dein Abo wählen →
              </Link>
              <Link href="/features" className="btn-secondary">
                Features entdecken
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-text-muted text-body-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Keine Verträge</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Monatlich kündbar</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Mockups */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Desktop Mockup */}
              <div className="relative z-10">
                <MockupFrame
                  variant="desktop"
                  className="mx-auto"
                  floatAnimation={true}
                >
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-surface-raised rounded-lg" />
                    <div className="h-6 w-1/2 bg-accent-subtle rounded-lg" />
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-16 bg-surface-raised rounded-lg" />
                      ))}
                    </div>
                  </div>
                </MockupFrame>
              </div>

              {/* Floating Phone Mockup */}
              <div className="absolute -bottom-12 -left-12 z-20">
                <MockupFrame
                  variant="phone"
                  className="max-w-[180px]"
                  floatAnimation={false}
                >
                  <div className="space-y-3">
                    <div className="h-6 w-2/3 bg-surface-raised rounded-lg mx-auto" />
                    <div className="h-4 w-1/2 bg-accent-subtle rounded-lg mx-auto" />
                  </div>
                </MockupFrame>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
