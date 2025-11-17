'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import Testimonial from '@/components/Testimonial';
import Marquee from '@/components/Marquee';
import ParallaxLayer from '@/components/ParallaxLayer';
import MockupFrame from '@/components/MockupFrame';
import CTAButton from '@/components/CTAButton';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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

      <main className="relative overflow-hidden pt-20">
        {/* ===== HERO SECTION (FULLSCREEN) ===== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
          {/* Background Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] gradient-orb-cyan opacity-70" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] gradient-orb-accent opacity-60" />
          <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] gradient-orb-blue opacity-35" />
          <div className="absolute bottom-1/3 left-1/2 w-[450px] h-[450px] gradient-orb-purple opacity-25" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] gradient-orb-pink opacity-20" />

          {/* Cyan Accent Bar at Top */}
          <div className="absolute top-0 left-0 right-0 accent-bar opacity-50" />

          <div className="container-wide relative z-10 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="mb-8">
                  <span className="badge-accent">
                    0% RIGHTS TAKEN
                  </span>
                </div>

                {/* EXACT HERO HEADLINE */}
                <h1 className="text-hero-mobile md:text-hero-xl mb-8 leading-tight text-balance heading-default">
                  We scale the new gen of <span className="text-gradient-blue">artists</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lead text-text-secondary mb-10 max-w-xl lg:mx-0 mx-auto text-balance">
                  Wir ersetzen das klassische Label-Modell durch Software: eine Plattform, auf der Artists ihren gesamten Workflow steuern – Plan · Release · Scale · Analyze – mit klaren Prozessen, echten Daten und voller Kontrolle über Rechte, Einnahmen und Wachstum.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
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
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-text-muted text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                    <span>European Company</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure Payments</span>
                  </div>
                </div>
              </div>

              {/* Right: Floating Dashboard Mockup with Parallax */}
              <div className="relative hidden lg:block">
                <ParallaxLayer speed="slow">
                  <div className="relative z-10">
                    <MockupFrame variant="desktop" className="glow-hover">
                      <div className="bg-gradient-to-br from-surface-primary to-surface-raised p-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="h-8 w-32 bg-accent rounded" />
                          <div className="flex gap-2">
                            <div className="h-8 w-8 rounded-full bg-surface-elevated" />
                            <div className="h-8 w-8 rounded-full bg-surface-elevated" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="glass-card p-4 h-24 rounded-xl" />
                          <div className="glass-card p-4 h-24 rounded-xl" />
                          <div className="glass-card p-4 h-24 rounded-xl" />
                        </div>
                        <div className="glass-card p-6 rounded-xl h-40" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="glass-card p-4 h-32 rounded-xl" />
                          <div className="glass-card p-4 h-32 rounded-xl" />
                        </div>
                      </div>
                    </MockupFrame>
                  </div>
                </ParallaxLayer>

                {/* Floating Phone Mockup */}
                <ParallaxLayer speed="fast">
                  <div className="absolute -bottom-12 -left-20 z-20">
                    <MockupFrame variant="phone" className="max-w-[180px] shadow-e4">
                      <div className="bg-surface-primary p-4 space-y-3">
                        <div className="h-6 w-20 bg-accent rounded mx-auto" />
                        <div className="glass-card p-3 rounded-lg h-16" />
                        <div className="glass-card p-3 rounded-lg h-16" />
                        <div className="glass-card p-3 rounded-lg h-16" />
                      </div>
                    </MockupFrame>
                  </div>
                </ParallaxLayer>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* ===== VALUE STRIP ===== */}
        <section className="section-spacing-sm bg-surface-primary border-y border-border relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[200px] gradient-orb-cyan opacity-10" />

          <Marquee speed={30}>
            <div className="flex items-center gap-16 px-8">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-semibold">Own your masters.</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-semibold">Control your revenue.</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-lg font-semibold">Scale your audience.</span>
              </div>
            </div>
          </Marquee>
        </section>

        {/* ===== FEATURE OVERVIEW ===== */}
        <section className="section-spacing bg-bg-secondary relative overflow-hidden">
          {/* Background Lighting */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] gradient-orb-purple opacity-60" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] gradient-orb-blue opacity-40" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] gradient-orb-cyan opacity-30" />

          <div className="container-custom relative z-10">
            <SectionHeader
              eyebrow="CORE FEATURES"
              title="Everything you need to release professionally"
              description="Built for artists who are serious about their career. Structured workflows, transparent analytics, and complete control over your music business."
            />

            <div className="feature-grid">
              <FeatureCard
                icon={
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                }
                title="Contract Vault"
                description="Centralized contract management with AI-powered analysis. Never lose track of publishing deals, splits, or rights again."
              />
              <FeatureCard
                icon={
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                }
                title="Release Coach (AI)"
                description="AI-driven release planning that suggests optimal timing, platforms, and marketing strategies based on your audience data."
              />
              <FeatureCard
                icon={
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                }
                title="Streaming Forecast & Dashboard"
                description="Real-time analytics and revenue forecasting across all platforms. Make data-driven decisions about your releases."
              />
              <FeatureCard
                icon={
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                }
                title="Royalty Tracking"
                description="Automated royalty collection and split payments. Track every cent from every platform in real-time."
              />
              <FeatureCard
                icon={
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                }
                title="Rights & Metadata"
                description="Complete metadata management with ISRC, UPC, and rights holder information. Stay compliant and get paid correctly."
              />
              <FeatureCard
                icon={
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                }
                title="Release Timeline"
                description="Structured release planning with automated task management. Never miss a deadline or promotional opportunity."
              />
            </div>

            <div className="text-center mt-12">
              <Link href="/features" className="btn-secondary btn-lg">
                Explore All Features
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== PLATFORM DEMO ===== */}
        <section className="section-spacing bg-bg-primary relative overflow-hidden">
          {/* Background Lighting */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] gradient-orb-cyan opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] gradient-orb-accent opacity-35" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] gradient-orb-purple opacity-25" />

          <div className="container-custom relative z-10">
            <SectionHeader
              eyebrow="THE PLATFORM"
              title="One system. Your entire music business."
              description="Every release managed in one place. From contract signing to final payout. No spreadsheets. No chaos. Just structure."
            />

            <div className="relative max-w-5xl mx-auto">
              <ParallaxLayer speed="medium">
                <MockupFrame variant="desktop" className="shadow-e4 glow">
                  <div className="bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-raised p-10 space-y-8">
                    {/* Platform Header */}
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-40 bg-gradient-to-r from-accent to-accent-hover rounded-lg" />
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full glass-card" />
                        <div className="h-10 w-10 rounded-full glass-card" />
                        <div className="h-10 w-24 rounded-full glass-card" />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="glass-card p-6 rounded-2xl">
                          <div className="h-4 w-20 bg-accent/30 rounded mb-3" />
                          <div className="h-8 w-full bg-text-primary/10 rounded" />
                        </div>
                      ))}
                    </div>

                    {/* Main Content */}
                    <div className="glass-card p-8 rounded-2xl">
                      <div className="h-6 w-48 bg-text-primary/20 rounded mb-6" />
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-accent/20" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-3/4 bg-text-primary/10 rounded" />
                              <div className="h-3 w-1/2 bg-text-primary/5 rounded" />
                            </div>
                            <div className="h-8 w-24 bg-accent/30 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="glass-card p-6 rounded-2xl h-40" />
                      <div className="glass-card p-6 rounded-2xl h-40" />
                    </div>
                  </div>
                </MockupFrame>
              </ParallaxLayer>
            </div>
          </div>
        </section>

        {/* ===== PHILOSOPHY ===== */}
        <section className="section-spacing bg-surface-primary border-y border-border relative overflow-hidden">
          {/* Background Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] gradient-orb-cyan opacity-20" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] gradient-orb-pink opacity-15" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] gradient-orb-blue opacity-15" />

          <div className="container-narrow relative z-10">
            <div className="text-center">
              <h2 className="text-display mb-8 text-balance">
                Labels used to own the system.<br />
                <span className="text-gradient">Now artists own the system.</span>
              </h2>
              <p className="text-lead text-text-secondary max-w-2xl mx-auto mb-8">
                For decades, artists needed labels for infrastructure. Distribution. Marketing. Analytics.
                That era is over. ReleaseHub gives you the same tools—without giving up your rights.
              </p>
              <div>
                <Link href="/about" className="btn-ghost btn-lg">
                  Our Mission
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SOCIAL PROOF ===== */}
        <section className="section-spacing bg-bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] gradient-orb-accent" />

          <div className="container-custom relative z-10">
            <SectionHeader
              eyebrow="TESTIMONIALS"
              title="Trusted by independent artists"
              description="Join thousands of artists who took back control of their music business."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Testimonial
                quote="ReleaseHub gave me the structure I needed to manage 6 releases a year. Game changer."
                author="Alex Rivera"
                role="Producer & Artist"
              />
              <Testimonial
                quote="Finally, a platform that doesn't take a cut. Just pay the subscription and keep 100% of your rights."
                author="Maya Chen"
                role="Independent Singer-Songwriter"
              />
              <Testimonial
                quote="The contract vault alone is worth the subscription. I have 15 years of deals now organized and searchable."
                author="Jordan Smith"
                role="Beat Maker & Label Owner"
              />
            </div>
          </div>
        </section>

        {/* ===== PRICING TEASER ===== */}
        <section className="section-spacing bg-bg-primary relative overflow-hidden">
          {/* Background Lighting */}
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] gradient-orb-blue opacity-30" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gradient-orb-cyan opacity-25" />
          <div className="absolute top-0 right-1/3 w-[400px] h-[400px] gradient-orb-purple opacity-20" />

          <div className="container-custom relative z-10">
            <SectionHeader
              eyebrow="TRANSPARENT PRICING"
              title="Simple pricing. No revenue cuts."
              description="Choose your plan. Cancel anytime. Keep 100% of your rights and revenue."
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {[
                { name: 'Basic', price: 29, desc: 'For emerging artists' },
                { name: 'Pro', price: 79, desc: 'For serious artists', highlighted: true },
                { name: 'Label', price: 129, desc: 'For teams & labels' },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`card text-center ${tier.highlighted ? 'border-accent glow' : ''}`}
                >
                  {tier.highlighted && (
                    <div className="mb-4">
                      <span className="badge-accent">MOST POPULAR</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-text-muted text-sm mb-6">{tier.desc}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">€{tier.price}</span>
                    <span className="text-text-muted">/month</span>
                  </div>
                  <Link
                    href="/pricing"
                    className={tier.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/pricing" className="btn-ghost btn-lg">
                Compare All Plans
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="section-spacing bg-gradient-to-b from-bg-dark via-surface-primary to-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-orb-cyan" />
          </div>

          <div className="container-custom text-center relative z-10">
            <div>
              <h2 className="text-display mb-8">
                Start building your artist business today
              </h2>
              <p className="text-lead text-text-secondary max-w-2xl mx-auto mb-10">
                No labels. No revenue cuts. No excuses.<br />
                Join the new generation of independent artists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
                  text="Download Release Checklist"
                  href="/resources"
                  variant="ghost"
                  size="lg"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure payments via Stripe
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  European company, GDPR compliant
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Support: support@releasehub.com
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
