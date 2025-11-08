'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import AuthModals from '@/components/AuthModals';
import { motion } from 'framer-motion';
import { fadeInUp, scaleUp, staggerContainer, scrollViewport } from '@/lib/animations';
import MockupFrame from '@/components/MockupFrame';
import ParallaxLayer from '@/components/ParallaxLayer';
import SectionHeader from '@/components/SectionHeader';
import CTAButton from '@/components/CTAButton';

export default function FeaturesPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const coreFeatures = [
    {
      icon: '📊',
      name: 'Artist Dashboard',
      description: 'Alle Releases, Streams, Einnahmen und To-dos auf einen Blick.',
      benefit: 'Kein Spreadsheet-Chaos mehr'
    },
    {
      icon: '📅',
      name: 'Release Planner',
      description: 'Step-by-Step Workflow von Produktion bis Launch mit automatischen Deadlines.',
      benefit: 'Keine verpassten Fristen'
    },
    {
      icon: '🎛️',
      name: 'Split Manager',
      description: 'Songwriter-Splits, Collaboration-Anteile und Credits zentral verwalten.',
      benefit: 'Keine Excel-Listen'
    },
    {
      icon: '💰',
      name: 'Royalty Tracking',
      description: 'Einnahmen aus Stores, GEMA, GVL automatisch aggregiert und visualisiert.',
      benefit: 'Echtzeit-Übersicht'
    },
    {
      icon: '✅',
      name: 'Smart Tasks & Reminders',
      description: 'Automatische Erinnerungen für Uploads, Promo-Deadlines und Submissions.',
      benefit: 'Nichts vergessen'
    },
  ];

  const businessFeatures = [
    {
      icon: '📈',
      name: 'Cashboard',
      description: 'Streams, Einnahmen, Prognosen und Performance-Metriken in einem Dashboard.',
      benefit: 'Volle Transparenz'
    },
    {
      icon: '💸',
      name: 'Automated Payouts',
      description: 'Einnahmen automatisch auszahlen lassen – PayPal, Bank, Wise.',
      benefit: 'Keine manuellen Überweisungen'
    },
    {
      icon: '📊',
      name: 'Cost & Budget Tracking',
      description: 'Studio, Marketing, Features – alle Release-Kosten erfassen und tracken.',
      benefit: 'Break-Even im Blick'
    },
    {
      icon: '🇪🇺',
      name: 'GEMA & GVL Assistant',
      description: 'Automatische Meldung, korrekte Credits, keine verlorenen Tantiemen.',
      benefit: 'Keine verlorenen Einnahmen'
    },
  ];

  const marketingFeatures = [
    {
      icon: '🔗',
      name: 'Promo Toolkit',
      description: 'Smartlinks, Pre-Save-Kampagnen, EPK und Press Kit Export für Medien.',
      benefit: 'Professionell in Sekunden'
    },
    {
      icon: '📱',
      name: 'TikTok & IG Content Planner',
      description: 'Content-Kalender mit Templates für Release-Promo auf Social Media.',
      benefit: 'Keine Panik vor Launch'
    },
    {
      icon: '✅',
      name: 'Release Marketing Checklist',
      description: 'Bewährte Pre-Release und Post-Release Marketing-Tasks – nichts vergessen.',
      benefit: 'Systematisch statt improvisiert'
    },
    {
      icon: '🤖',
      name: 'Ads Autopilot',
      description: 'Automatisierte TikTok/Meta-Ads-Kampagnen für Releases.',
      badge: 'Coming Soon',
      benefit: 'Performance Marketing ohne Agentur'
    },
  ];

  const aiFeatures = [
    {
      icon: '🧠',
      name: 'AI Release Coach',
      description: 'Personalisierte Release-Strategie basierend auf Genre, Zielgruppe und Budget.',
      badge: 'Coming Soon',
      benefit: 'Datenbasierte Entscheidungen'
    },
    {
      icon: '🔮',
      name: 'Predictive Streaming Forecast',
      description: 'Machine Learning-basierte Prognosen für erwartete Streams und Einnahmen.',
      badge: 'Coming Soon',
      benefit: 'Realistisch planen'
    },
  ];

  const integrationFeatures = [
    {
      icon: '🎵',
      name: 'DSP Integrations',
      description: 'Direkte Anbindung an Spotify, Apple Music, YouTube, Deezer, TikTok.',
      benefit: 'Ein Dashboard für alles'
    },
    {
      icon: '🚀',
      name: 'Distributor Sync',
      description: 'Automatischer Sync mit iGroove, RecordJet, DistroKid und anderen.',
      benefit: 'Keine doppelte Datenpflege'
    },
    {
      icon: '📄',
      name: 'GEMA / GVL Export',
      description: 'Automatischer Export von Werken und Aufführungen für Verwertungsgesellschaften.',
      badge: 'Coming Soon',
      benefit: 'GEMA-Ready in 1 Klick'
    },
    {
      icon: '💼',
      name: 'Accounting Export',
      description: 'DATEV, CSV, Lexoffice – alle Einnahmen und Kosten steuerkonform exportieren.',
      badge: 'Coming Soon',
      benefit: 'Steuerberater-freundlich'
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
          {/* Background Gradient Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-orb-cyan pointer-events-none" />

          <div className="container-custom text-center relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="badge bg-surface-raised text-accent border border-accent">
                  FULL FEATURE SET
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="mb-6">
                Everything you need to release professionally
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-3xl mx-auto mb-8">
                ReleaseHub isn't another tool with 100 features nobody uses.
                Instead: A focused system that automates the most important workflows
                and gives artists control over their careers.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  text="View Pricing"
                  href="/pricing"
                  variant="secondary"
                  size="lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Platform */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="badge bg-accent text-text-inverse">CORE PLATFORM</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-4">Core Platform</motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                The foundation: Release management, tasks, splits, and royalty tracking.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {coreFeatures.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="glass-card rounded-xl p-8 h-full hover:border-accent transition-all duration-300 glow-hover">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                    <p className="text-text-secondary mb-3">{feature.description}</p>
                    <p className="text-sm text-accent font-medium">{feature.benefit}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Business & Financials */}
        <section className="section-spacing bg-bg-primary relative overflow-hidden">
          {/* Mockup with Parallax */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
            <ParallaxLayer speed="slow">
              <MockupFrame variant="phone" className="max-w-[200px]">
                <div className="p-4 space-y-3">
                  <div className="h-8 w-3/4 bg-accent rounded mx-auto" />
                  <div className="h-20 glass-card rounded-lg" />
                  <div className="h-20 glass-card rounded-lg" />
                </div>
              </MockupFrame>
            </ParallaxLayer>
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="badge bg-surface-raised text-accent border border-accent">BUSINESS TOOLS</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-4">Business & Financials</motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Revenue, payouts, budgets, and rights management – all transparent and automated.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {businessFeatures.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="glass-card rounded-xl p-8 h-full hover:border-accent transition-all duration-300 glow-hover">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                        <p className="text-text-secondary mb-3">{feature.description}</p>
                        <p className="text-sm text-accent font-medium">{feature.benefit}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Marketing & Growth */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Marketing & Growth</h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Promo-Tools, Content-Planung und Performance-Marketing – ohne Agentur.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketingFeatures.map((feature, index) => (
                <div key={index} className="feature-card relative">
                  {feature.badge && (
                    <span className="absolute top-4 right-4 badge bg-bg-secondary text-accent border border-accent">
                      {feature.badge}
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                      <p className="text-text-secondary mb-3">{feature.description}</p>
                      <p className="text-sm text-accent font-medium">{feature.benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI & Automation */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">AI & Automation</h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Machine Learning für bessere Entscheidungen und präzisere Forecasts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="feature-card relative">
                  <span className="absolute top-4 right-4 badge bg-bg-secondary text-accent border border-accent">
                    {feature.badge}
                  </span>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                      <p className="text-text-secondary mb-3">{feature.description}</p>
                      <p className="text-sm text-accent font-medium">{feature.benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem & Integrations */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Ecosystem & Integrations</h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Nahtlose Anbindung an Stores, Distributoren, GEMA und Buchhaltung.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrationFeatures.map((feature, index) => (
                <div key={index} className="feature-card relative">
                  {feature.badge && (
                    <span className="absolute top-4 right-4 badge bg-bg-secondary text-accent border border-accent">
                      {feature.badge}
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                      <p className="text-text-secondary mb-3">{feature.description}</p>
                      <p className="text-sm text-accent font-medium">{feature.benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                Ready for structured release management?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg mb-8 max-w-2xl mx-auto">
                No labels. No revenue cuts. No excuses. <br />
                Choose your plan and start professionally.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  text="View Pricing"
                  href="/pricing"
                  variant="ghost"
                  size="lg"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-12 text-text-secondary space-y-2">
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
