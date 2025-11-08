'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import AuthModals from '@/components/AuthModals';

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
        <section className="section-spacing bg-bg-primary border-b border-border-light">
          <div className="container-custom text-center">
            <h1 className="mb-6">Alles, was Artists brauchen. Nichts, was sie nicht brauchen.</h1>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto mb-8">
              ReleaseHub ist kein weiteres Tool mit 100 Features, die keiner nutzt.
              Stattdessen: Ein fokussiertes System, das die wichtigsten Workflows automatisiert
              und Artists die Kontrolle über ihre Karriere gibt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsSignupOpen(true)} className="btn-primary">
                Kostenlos testen →
              </button>
              <a href="/pricing" className="btn-secondary">
                Pricing ansehen
              </a>
            </div>
          </div>
        </section>

        {/* Core Platform */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Core Platform</h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Das Fundament: Release-Management, Aufgaben, Splits und Royalty-Tracking.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-text-secondary mb-3">{feature.description}</p>
                  <p className="text-sm text-accent font-medium">{feature.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business & Financials */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Business & Financials</h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Einnahmen, Auszahlungen, Budgets und GEMA – alles transparent und automatisiert.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
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
        <section className="section-spacing bg-bg-dark text-text-inverse">
          <div className="container-custom text-center">
            <h2 className="mb-6">Bereit für strukturiertes Release-Management?</h2>
            <p className="text-body-lg mb-8 max-w-2xl mx-auto">
              Keine Labels. Keine % Cuts. Keine Ausreden. <br />
              Wähle dein Abo und starte professionell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsSignupOpen(true)} className="btn-accent">
                Abo wählen (29–129 €/Monat) →
              </button>
              <a href="/pricing" className="btn-secondary">
                Alle Features im Vergleich
              </a>
            </div>
            <div className="mt-12 text-text-secondary space-y-2">
              <p>🔒 Sicher bezahlen mit Stripe</p>
              <p>🇪🇺 Europäisches Unternehmen, EU-Steuern</p>
              <p>📧 Support: support@releasehub.com</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
