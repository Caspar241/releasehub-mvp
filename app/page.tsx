'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ThreePillars from '@/components/ThreePillars';
import FeatureCard from '@/components/FeatureCard';
import PricingCard from '@/components/PricingCard';
import FAQAccordion from '@/components/FAQAccordion';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const features = [
    {
      icon: '📅',
      title: 'Release-Kalender',
      description: 'Alle Deadlines, Meilensteine und To-dos auf einen Blick. Sync mit Google Calendar / iCal.',
    },
    {
      icon: '📦',
      title: 'Asset-Management',
      description: 'Cover, Pressefotos, Promo-Texte, Social-Posts – alles zentral. Keine verlorenen Canva-Links mehr.',
    },
    {
      icon: '🎯',
      title: 'Templates & Checklisten',
      description: 'Bewährte Release-Pläne für Singles, EPs, Alben. Nichts vergessen, nichts improvisieren müssen.',
    },
    {
      icon: '🤝',
      title: 'Team-Collaboration',
      description: 'Producer, Designer, Manager, Features – alle auf einer Seite. Kommentare, Feedback, File-Sharing.',
    },
    {
      icon: '🚀',
      title: 'Distribution (ohne % Cuts)',
      description: 'Upload zu Spotify, Apple Music, TikTok, Deezer etc. 0% Fee. 0% Rights Taken. Nur dein Abo.',
    },
    {
      icon: '📊',
      title: 'Analytics-Dashboard',
      description: 'Spotify for Artists, Apple Music, TikTok, Instagram – alles an einem Ort. (Integration über API, keine % auf Streams.)',
    },
    {
      icon: '🎤',
      title: 'EPK-Builder',
      description: 'Electronic Press Kit für Medien, Promoter, Playlist-Curator. Professionell, exportierbar, teilbar.',
    },
    {
      icon: '🔗',
      title: 'Smart Links',
      description: 'Bio-Links, Pre-Save-Kampagnen, Release-Links. Custom Domain (premium.releasehub.io/yourartistname).',
    },
  ];

  const faqItems = [
    {
      question: 'Nehmt ihr % auf meine Rechte (Master, Publishing, Streams)?',
      answer: `Nein. 0%. Nie.

Du zahlst dein Monats-Abo (29–129 €), und das war's. Keine versteckten Cuts auf Streams, keine Rechte-Abgabe, keine „Fair-Trade"-% auf Publishing. ReleaseHub ist ein Tool, kein Label.`,
    },
    {
      question: 'Wie funktioniert Distribution? Brauche ich noch einen Distro-Partner?',
      answer: `Ja, du brauchst noch einen Distributor (z. B. DistroKid, TuneCore, Believe, etc.).

ReleaseHub ist kein Distributor, sondern ein Release-Management-System. Wir helfen dir, alle Schritte zu strukturieren, Metadata zu managen und Deadlines einzuhalten – aber das Hochladen zu Spotify/Apple läuft über deinen Distro.

→ Roadmap: API-Integrationen zu Distributoren kommen später (Phase 2).`,
    },
    {
      question: 'Was passiert, wenn ich kündige?',
      answer: `Du behältst alle deine Rechte (logisch, wir haben nie welche genommen).

Deine Releases bleiben live (über deinen Distributor), aber dein Zugang zu ReleaseHub endet mit dem Abo. Du kannst vorher alle Daten exportieren (CSV, PDF).`,
    },
    {
      question: 'Ist ReleaseHub für Anfänger oder nur für Pros?',
      answer: `Für alle, die serious sind.

Du musst kein 50k-Listener-Artist sein – aber du solltest bereit sein, strukturiert zu arbeiten. Wenn du nur „mal gucken" willst, bleib bei Free-Tools. Wenn du deine Karriere ernst nimmst, bist du hier richtig.`,
    },
    {
      question: 'Warum kein Free-Plan?',
      answer: `Weil Free-Plans verwässern die Qualität und ziehen Leute an, die nicht wirklich committen.

ReleaseHub ist für Artists, die bereit sind, in ihr Business zu investieren. 29 €/Monat sind weniger als ein Spotify-Abo + Netflix – aber dafür bekommst du ein System, das deine Karriere strukturiert.`,
    },
    {
      question: 'Kann ich mein Team hinzufügen (Producer, Manager, Designer)?',
      answer: `Ja, ab Premium-Plan.

Basic = 1 Person (nur du).
Premium = 3 Team-Mitglieder.
Label = 10 Team-Mitglieder + Multi-Artist-Support.`,
    },
    {
      question: 'Unterstützt ihr TikTok, Instagram, YouTube?',
      answer: `Ja, über deinen Distributor.

ReleaseHub hilft dir, alle Plattformen im Release-Plan zu berücksichtigen (Deadlines, Assets, Links) – aber das Hochladen läuft über deinen Distro (z. B. DistroKid → TikTok/Instagram).

→ Analytics-Integration für TikTok/Instagram kommt in Phase 2 (API).`,
    },
    {
      question: 'Ist ReleaseHub GEMA/AKM/SUISA-kompatibel?',
      answer: `Ja.

ReleaseHub nimmt keine Rechte, also behältst du deine PRO-Mitgliedschaft (GEMA, AKM, SUISA etc.). Wir helfen dir, alle Metadaten korrekt zu erfassen (Songwriter-Splits, ISWC etc.), damit deine Tantiemen ankommen.`,
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
      <main className="min-h-screen">
        {/* Hero */}
        <Hero variant="A" />

        {/* Problem → Lösung */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="mb-6">Du weißt, wie es läuft:</h2>
                <ul className="space-y-4 text-body">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">✗</span>
                    <span>Release-Deadlines in Google Sheets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">✗</span>
                    <span>Marketing-Assets in 5 verschiedenen Canva-Tabs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">✗</span>
                    <span>Feedback per WhatsApp-Sprachnachricht</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">✗</span>
                    <span>Distributor-Portal + Spotify for Artists + TikTok Creator + ...</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">✗</span>
                    <span>ChatGPT für jeden Bio-Text neu aufmachen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">✗</span>
                    <span>Keine Ahnung, ob dein Plan realistisch ist</span>
                  </li>
                </ul>
                <p className="text-2xl font-bold mt-8 text-accent">Das ist kein System. Das ist Overwhelm.</p>
              </div>
              <div>
                <h2 className="mb-6">ReleaseHub macht Schluss damit.</h2>
                <ul className="space-y-4 text-body">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✓</span>
                    <span><strong>Ein Dashboard</strong> für alle Release-Schritte</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✓</span>
                    <span><strong>Strukturierte Workflows</strong> (Templates, Checklisten, Deadlines)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✓</span>
                    <span><strong>Zentrale Assets</strong> (Cover, Promo-Texte, Pressekit)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✓</span>
                    <span><strong>Release-Kalender</strong> mit Sync zu deinem Leben</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✓</span>
                    <span><strong>Guidance ohne Gatekeeper</strong> (Best Practices, keine Rechte-Abgabe)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✓</span>
                    <span><strong>Europäisch & Fair</strong> (keine versteckten % Cuts)</span>
                  </li>
                </ul>
                <Link href="/pricing" className="btn-primary inline-block mt-8">
                  Abo wählen und starten →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Säulen Story */}
        <ThreePillars />

        {/* Feature Breakdown */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <h2 className="text-center mb-4">Was du bekommst</h2>
            <p className="text-body-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Alles, was du brauchst, um professionell zu releasen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/pricing" className="btn-primary">
                Abo starten →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <h2 className="text-center mb-4">Pricing – Fair, transparent, ohne versteckte Cuts</h2>
            <p className="text-body-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Wähle den Plan, der zu dir passt.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                name="Basic"
                price="29,99 €"
                description="New Artists, 1-Person-Setup, 1–4 Releases/Jahr"
                features={[
                  '4 Singles pro Jahr',
                  '1 Team-Mitglied',
                  '5 GB Storage',
                  '1 aktiver Smart Link',
                  'Email Support (48h)',
                ]}
              />
              <PricingCard
                name="Premium"
                price="79,99 €"
                description="Serious Artists, DIY-Labels, kleine Managements"
                features={[
                  'Unlimited Singles/EPs/Alben',
                  '3 Team-Mitglieder',
                  '50 GB Storage',
                  'Unlimited Smart Links',
                  'EPK-Builder',
                  'Full Analytics',
                  'Priority Support',
                ]}
                featured={true}
              />
              <PricingCard
                name="Label"
                price="129,99 €"
                description="Kleine Labels, Studios, Multi-Artist-Rosters"
                features={[
                  'Unlimited (Multi-Artist)',
                  '10 Team-Mitglieder',
                  '200 GB Storage',
                  'Unlimited Smart Links',
                  'EPK-Builder',
                  'Full Analytics + Reporting',
                  '1:1 Onboarding Call',
                ]}
              />
            </div>
            <div className="text-center mt-12">
              <Link href="/pricing" className="btn-secondary">
                Kompletten Vergleich ansehen →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-spacing bg-bg-primary" id="faq">
          <div className="container-custom">
            <h2 className="text-center mb-4">Häufige Fragen</h2>
            <p className="text-body-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Alles, was du wissen musst.
            </p>
            <FAQAccordion items={faqItems} />
            <div className="text-center mt-12">
              <p className="text-text-secondary mb-4">Noch Fragen?</p>
              <a href="mailto:support@releasehub.com" className="link">
                support@releasehub.com
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-spacing bg-bg-dark text-text-inverse">
          <div className="container-custom text-center">
            <h2 className="mb-6">Bereit, professionell zu releasen?</h2>
            <p className="text-body-lg mb-8 max-w-2xl mx-auto">
              Keine Labels. Keine % Cuts. Keine Ausreden. <br />
              Wähle dein Abo und starte strukturiert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="btn-accent">
                Abo wählen (29–129 €/Monat) →
              </Link>
              <Link href="/resources" className="btn-secondary">
                Release-Checkliste gratis downloaden →
              </Link>
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
