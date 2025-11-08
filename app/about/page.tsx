'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import CTAButton from '@/components/CTAButton';
import Testimonial from '@/components/Testimonial';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleUp,
  staggerContainer,
  scrollViewport,
} from '@/lib/animations';

export default function AboutPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const timeline = [
    {
      year: '2023',
      quarter: 'Q4',
      title: 'The Problem',
      description: 'After years of watching independent artists struggle with spreadsheets, scattered tools, and predatory label deals, we decided to build the system artists deserve.',
    },
    {
      year: '2024',
      quarter: 'Q1',
      title: 'Foundation',
      description: 'ReleaseHub was founded in Europe with a simple mission: give artists the infrastructure labels monopolized, without taking their rights.',
    },
    {
      year: '2024',
      quarter: 'Q2–Q3',
      title: 'Beta Launch',
      description: 'Launched beta with 50+ artists. Built core platform: release planner, cashboard, split manager. 0% rights taken. 0% revenue cuts.',
    },
    {
      year: '2024',
      quarter: 'Q4',
      title: 'Public Launch',
      description: 'Opened platform to all independent artists. Integrated with major distributors, streaming platforms, and payment systems.',
    },
    {
      year: '2025',
      quarter: 'Q1',
      title: 'AI Coach',
      description: 'Launching AI Release Coach: ML-based strategy recommendations, streaming forecasts, and personalized campaign planning.',
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Artist-First',
      description: 'Every decision starts with the question: Does this help artists own their careers? If not, we don\'t build it.',
    },
    {
      icon: '🔓',
      title: 'Zero Rights Taken',
      description: 'We will never take a percentage of your masters, publishing, or revenue. Our business model is transparent: monthly subscription.',
    },
    {
      icon: '🇪🇺',
      title: 'European Values',
      description: 'Built in Europe. GDPR compliant. Fair business practices. No Silicon Valley growth-at-all-costs mentality.',
    },
    {
      icon: '📊',
      title: 'Transparency',
      description: 'Clear pricing. No hidden fees. Open about what works and what doesn\'t. Artists deserve honesty.',
    },
    {
      icon: '🛠️',
      title: 'Focus Over Features',
      description: 'We\'re not building a feature zoo. We\'re building a focused system that solves real problems artists face every day.',
    },
    {
      icon: '💪',
      title: 'Serious Work',
      description: 'No gimmicks. No "creator economy" fluff. For artists who are serious about building sustainable careers.',
    },
  ];

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

      <main className="min-h-screen bg-bg-primary">
        {/* Hero Section */}
        <section className="section-spacing bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] gradient-orb-cyan pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] gradient-orb-accent pointer-events-none" />

          <div className="container-custom text-center relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="badge bg-surface-raised text-accent border border-accent">
                  ABOUT RELEASEHUB
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="mb-6">
                Built for the new generation <br className="hidden md:block" />
                of independent artists
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-3xl mx-auto">
                ReleaseHub exists because the old model is broken. Labels took your rights,
                gatekeepers controlled access, and artists had to choose between freedom and infrastructure.
                <br /><br />
                We're building the third way: Full creative control. Zero rights taken. Professional infrastructure.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Vision */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeInLeft}
                className="glass-card rounded-2xl p-10"
              >
                <div className="text-5xl mb-6">🎯</div>
                <h2 className="text-section-md mb-4">Our Vision</h2>
                <p className="text-body text-text-secondary mb-4">
                  A music industry where independent artists have the same infrastructure,
                  tools, and leverage as major labels—without giving up their rights.
                </p>
                <p className="text-body text-text-secondary">
                  Where success isn't determined by who you know or which gatekeeper approves you,
                  but by the quality of your work and the strength of your strategy.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeInRight}
                className="glass-card rounded-2xl p-10"
              >
                <div className="text-5xl mb-6">🚀</div>
                <h2 className="text-section-md mb-4">Our Mission</h2>
                <p className="text-body text-text-secondary mb-4">
                  Build the operating system for independent artists. Release planning, business
                  management, revenue tracking, rights protection—all in one place.
                </p>
                <p className="text-body text-text-secondary">
                  Transparent pricing. No hidden cuts. European values. Built by people who
                  respect artists and understand the work it takes to build a career.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
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
                <span className="badge bg-accent text-text-inverse">CORE VALUES</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-6">
                What we stand for
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                These principles guide every decision we make.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="glass-card rounded-xl p-8 h-full hover:border-accent transition-all duration-300 glow-hover">
                    <div className="text-5xl mb-4">{value.icon}</div>
                    <h3 className="text-title mb-3">{value.title}</h3>
                    <p className="text-body text-text-secondary">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-spacing bg-bg-secondary">
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
                  OUR JOURNEY
                </span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-6">
                Building in public
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                From idea to platform—here's how we got here.
              </motion.p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

                {/* Timeline Items */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="relative md:pl-20"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-accent border-4 border-bg-secondary hidden md:block" />

                      <div className="glass-card rounded-xl p-8 hover:border-accent transition-all duration-300">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="badge bg-accent text-text-inverse">{item.year} {item.quarter}</span>
                          <h3 className="text-title">{item.title}</h3>
                        </div>
                        <p className="text-body text-text-secondary">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Europe? */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-8">
                <div className="text-6xl mb-6">🇪🇺</div>
                <h2 className="mb-6">Why European?</h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-10">
                <div className="space-y-6 text-body text-text-secondary">
                  <p>
                    We're based in Europe because we believe in European values: Fair business practices,
                    strong data protection (GDPR), and respect for artists' rights.
                  </p>
                  <p>
                    The US music-tech ecosystem is saturated with growth-at-all-costs mentality,
                    venture capital pressures, and platforms that treat artists as data sources.
                  </p>
                  <p>
                    We're building something different: Sustainable, profitable, and aligned with
                    artists' long-term interests. No exit strategy. No pivot to ads. Just a solid business
                    that serves its customers.
                  </p>
                  <p className="text-accent font-semibold">
                    ReleaseHub is built for the long run—not for a quick exit.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Placeholder */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="badge bg-accent text-text-inverse">TEAM</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-6">
                Small team. Big mission.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary mb-8">
                We're a lean team of product builders, developers, and former artists who
                understand the struggle because we've lived it.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <p className="text-body text-text-secondary italic">
                  Team profiles coming soon.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-spacing bg-gradient-to-b from-bg-dark via-bg-secondary to-bg-dark text-text-inverse relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-orb-cyan" />
          </div>

          <div className="container-custom text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="mb-6">
                Join the movement
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg mb-8 max-w-2xl mx-auto">
                The era of gatekeepers is over. The era of artist ownership is here.
                <br />
                Build your career on your terms.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
                  variant="ghost"
                  size="lg"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="text-text-secondary space-y-2">
                <p>🔒 Secure payments via Stripe</p>
                <p>🇪🇺 European company, GDPR compliant</p>
                <p>📧 Questions? support@releasehub.com</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
