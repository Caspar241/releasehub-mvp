'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import CTAButton from '@/components/CTAButton';
import ParallaxLayer from '@/components/ParallaxLayer';
import Marquee from '@/components/Marquee';
import MockupFrame from '@/components/MockupFrame';
import {
  fadeInUp,
  fadeIn,
  scaleUp,
  staggerContainer,
  scrollViewport,
} from '@/lib/animations';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    if (searchParams?.get('login') === 'true') {
      setIsLoginOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      <Navigation
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />
      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onCloseSignup={() => setIsSignupOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <main className="min-h-screen overflow-hidden">
        {/* ====== HERO SECTION (FULLSCREEN) ====== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary">
          {/* Background Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] gradient-orb-cyan pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] gradient-orb-accent pointer-events-none" />

          {/* Cyan Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-center lg:text-left"
              >
                {/* Badge */}
                <motion.div variants={fadeInUp} className="mb-6">
                  <span className="inline-block badge bg-accent text-text-inverse">
                    0% RIGHTS TAKEN
                  </span>
                </motion.div>

                {/* Hero Headline - EXACT */}
                <motion.h1
                  variants={fadeInUp}
                  className="text-hero-mobile md:text-hero-xl mb-6 leading-tight"
                >
                  We scale the new gen of artists
                </motion.h1>

                {/* Subhead */}
                <motion.p
                  variants={fadeInUp}
                  className="text-lead text-text-secondary mb-8 max-w-xl lg:mx-0 mx-auto"
                >
                  The first release management system built for independent artists.
                  Structure without gatekeepers. Transparency without revenue cuts.
                  European. Fair. Made for real work.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                >
                  <CTAButton
                    text="Start Free Trial"
                    onClick={() => setIsSignupOpen(true)}
                    variant="primary"
                    size="lg"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    }
                  />
                  <CTAButton
                    text="Explore Features"
                    href="/features"
                    variant="secondary"
                    size="lg"
                  />
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-6 justify-center lg:justify-start text-text-muted text-body-sm"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cancel monthly</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Mockups with Parallax */}
              <motion.div
                variants={scaleUp}
                initial="hidden"
                animate="visible"
                className="relative hidden lg:block"
              >
                <ParallaxLayer speed="slow">
                  <div className="relative">
                    <MockupFrame variant="desktop" floatAnimation={true}>
                      <div className="space-y-4 p-6">
                        <div className="h-8 w-3/4 bg-accent rounded-lg" />
                        <div className="h-6 w-1/2 bg-surface-raised rounded-lg" />
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-20 glass-card rounded-lg p-3">
                              <div className="h-3 w-full bg-accent-subtle rounded mb-2" />
                              <div className="h-2 w-2/3 bg-surface-raised rounded" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </MockupFrame>

                    <div className="absolute -bottom-12 -left-12 z-20">
                      <ParallaxLayer speed="fast">
                        <MockupFrame variant="phone" className="max-w-[180px]">
                          <div className="space-y-3 p-4">
                            <div className="h-6 w-2/3 bg-accent rounded mx-auto" />
                            <div className="h-4 w-1/2 bg-surface-raised rounded mx-auto" />
                            <div className="space-y-2 mt-4">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-12 glass-card rounded-lg" />
                              ))}
                            </div>
                          </div>
                        </MockupFrame>
                      </ParallaxLayer>
                    </div>
                  </div>
                </ParallaxLayer>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2 text-text-muted">
              <span className="text-body-sm">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ====== VALUE STRIP (MARQUEE) ====== */}
        <section className="section-spacing bg-bg-dark">
          <Marquee speed={30} pauseOnHover>
            {[
              { text: 'Own your masters.', icon: '🎵' },
              { text: 'Control your revenue.', icon: '💰' },
              { text: 'Scale your audience.', icon: '📈' },
              { text: 'Keep 100% of your rights.', icon: '✓' },
              { text: 'No gatekeepers.', icon: '🚀' },
              { text: 'European platform.', icon: '🇪🇺' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-text-inverse text-title font-bold whitespace-nowrap"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* ====== FEATURE OVERVIEW ====== */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="badge bg-surface-raised text-accent border border-accent">
                  CORE PLATFORM
                </span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-6">
                Everything you need to release professionally
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Built for independent artists who are serious about their careers.
                No fluff, no feature-zoo—just the essentials done right.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: '📋',
                  title: 'Release Planner',
                  description: 'Step-by-step workflow from production to launch. Automated deadlines, task management, and team collaboration.',
                  badge: 'Core',
                },
                {
                  icon: '🤖',
                  title: 'AI Release Coach',
                  description: 'Machine learning-based strategy recommendations, streaming forecasts, and performance insights.',
                  badge: 'Coming Soon',
                },
                {
                  icon: '📊',
                  title: 'Cashboard Dashboard',
                  description: 'Real-time revenue tracking, payout automation, and transparent analytics. No hidden cuts.',
                  badge: 'Core',
                },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="glass-card rounded-xl p-8 h-full hover:border-accent transition-all duration-300 glow-hover">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-feature-md">{feature.title}</h3>
                      <span className={`badge text-caption ${feature.badge === 'Core' ? 'bg-accent text-text-inverse' : 'bg-surface-raised text-accent border border-accent'}`}>
                        {feature.badge}
                      </span>
                    </div>
                    <p className="text-body text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <CTAButton
                text="View all features"
                href="/features"
                variant="secondary"
                size="md"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              />
            </motion.div>
          </div>
        </section>

        {/* ====== PHILOSOPHY STATEMENT ====== */}
        <section className="section-spacing bg-gradient-to-b from-bg-dark via-bg-secondary to-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-orb-cyan" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h2 variants={fadeInUp} className="text-hero-md mb-8 text-text-inverse">
                Labels used to own the system. <br />
                <span className="text-gradient">Now artists own the system.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary mb-8">
                For decades, the music industry ran on gatekeepers. Labels controlled distribution,
                took percentages, and owned your masters. That era is over. ReleaseHub gives you
                the infrastructure labels used to monopolize—without taking a single percent of your rights.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <CTAButton
                  text="Start building your career"
                  onClick={() => setIsSignupOpen(true)}
                  variant="primary"
                  size="lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ====== PRICING TEASER ====== */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInUp} className="mb-6">
                Simple, transparent pricing
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                No revenue cuts. No hidden fees. Choose your plan and scale your career.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
              className="max-w-4xl mx-auto glass-card rounded-2xl p-12 text-center"
            >
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  { plan: 'Starter', price: '€29', features: '1 artist, core features' },
                  { plan: 'Pro', price: '€79', features: '3 team members, priority support', featured: true },
                  { plan: 'Label', price: '€129', features: '10 artists, white-label' },
                ].map((tier, i) => (
                  <div key={i} className={`${tier.featured ? 'border-2 border-accent rounded-xl p-6 -m-2' : 'p-4'}`}>
                    <h3 className="text-title mb-2">{tier.plan}</h3>
                    <div className="text-hero-md text-accent mb-2">{tier.price}</div>
                    <p className="text-body-sm text-text-secondary">{tier.features}</p>
                  </div>
                ))}
              </div>
              <CTAButton
                text="View full pricing"
                href="/pricing"
                variant="primary"
                size="lg"
              />
            </motion.div>
          </div>
        </section>

        {/* ====== FINAL CTA ====== */}
        <section className="section-spacing bg-bg-dark text-text-inverse">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.h2 variants={fadeInUp} className="mb-6">
                Start building your artist business today
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg mb-8">
                No labels. No revenue cuts. No excuses. <br />
                Join the new generation of independent artists.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <CTAButton
                  text="Start Free Trial"
                  onClick={() => setIsSignupOpen(true)}
                  variant="primary"
                  size="lg"
                />
                <CTAButton
                  text="Download Release Checklist"
                  href="/resources"
                  variant="ghost"
                  size="lg"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="text-text-secondary space-y-2 text-body-sm">
                <p>🔒 Secure payments via Stripe</p>
                <p>🇪🇺 European company, GDPR compliant</p>
                <p>📧 Support: support@releasehub.com</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      <HomeContent />
    </Suspense>
  );
}
