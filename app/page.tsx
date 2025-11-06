'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ThreePillars from '@/components/ThreePillars';
import FeatureCard from '@/components/FeatureCard';
import FAQAccordion from '@/components/FAQAccordion';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function HomeContent() {
  const searchParams = useSearchParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useScrollReveal();

  // Check if we should open the login modal (from protected route redirect)
  useEffect(() => {
    if (searchParams?.get('login') === 'true') {
      setIsLoginOpen(true);
    }
  }, [searchParams]);

  const vsComparison = [
    {
      criterion: 'Rights Taken',
      releasehub: '0%',
      indieflow: '0%',
      label: '10–50% Master + Publishing',
    },
    {
      criterion: 'Distribution Fee',
      releasehub: '0%',
      indieflow: '5% (Free) / 0% (Paid)',
      label: 'Versteckt in Deal',
    },
    {
      criterion: 'Monatspreis',
      releasehub: '29–129 €/Monat',
      indieflow: 'Free–Premium ($10–30/mo)',
      label: '❌ (aber % auf alles)',
    },
    {
      criterion: 'Release-System',
      releasehub: '✓ Strukturiert, Templates',
      indieflow: '⚠️ Feature-Zoo',
      label: '❌ Chaos',
    },
    {
      criterion: 'Team-Collaboration',
      releasehub: '✓ Zentral',
      indieflow: '✓ Teilweise',
      label: '⚠️ Email/Meetings',
    },
    {
      criterion: 'Europäisch/DACH',
      releasehub: '✓ EU-Steuern, DE-Support',
      indieflow: '❌ US-zentrisch',
      label: '⚠️ Abhängig',
    },
    {
      criterion: 'Kein Gatekeeper',
      releasehub: '✓ Fair, transparent',
      indieflow: '✓ Fair',
      label: '❌ A&R entscheidet',
    },
  ];

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

        {/* Warum ReleaseHub? */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom scroll-reveal">
            <h2 className="text-center mb-4">Warum ReleaseHub?</h2>
            <p className="text-body-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Transparenter Vergleich mit Alternativen.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border-light">
                    <th className="p-4 text-left font-semibold w-1/4">Kriterium</th>
                    <th className="p-4 text-center font-semibold w-1/4 bg-accent/10">ReleaseHub</th>
                    <th className="p-4 text-center font-semibold w-1/4">IndieFlow</th>
                    <th className="p-4 text-center font-semibold w-1/4">Label-Deal</th>
                  </tr>
                </thead>
                <tbody>
                  {vsComparison.map((row, index) => (
                    <tr key={index} className="border-b border-border-light">
                      <td className="p-4 font-medium">{row.criterion}</td>
                      <td className="p-4 text-center bg-accent/5 font-semibold">{row.releasehub}</td>
                      <td className="p-4 text-center">{row.indieflow}</td>
                      <td className="p-4 text-center">{row.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Wann macht ReleaseHub Sinn? */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom scroll-reveal">
            <h2 className="text-center mb-4">Wann macht ReleaseHub Sinn?</h2>
            <p className="text-body-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Fünf klare Gründe für ReleaseHub.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="p-4 text-center w-16">
                      <span className="text-accent text-2xl">✓</span>
                    </td>
                    <td className="p-4">
                      Du willst <strong>0% Rights abgeben</strong> (weder Master noch Publishing)
                    </td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="p-4 text-center">
                      <span className="text-accent text-2xl">✓</span>
                    </td>
                    <td className="p-4">
                      Du brauchst <strong>Struktur</strong>, nicht noch mehr Tools
                    </td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="p-4 text-center">
                      <span className="text-accent text-2xl">✓</span>
                    </td>
                    <td className="p-4">
                      Du bist <strong>bereit, für Professionalität zu zahlen</strong> (kein Free-Plan-Chaos)
                    </td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="p-4 text-center">
                      <span className="text-accent text-2xl">✓</span>
                    </td>
                    <td className="p-4">
                      Du willst eine <strong>europäische Lösung</strong> (DACH-Support, EU-Steuern)
                    </td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="p-4 text-center">
                      <span className="text-accent text-2xl">✓</span>
                    </td>
                    <td className="p-4">
                      Du bist <strong>serious</strong> über deine Karriere (keine Hobby-Artists)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3-Säulen Story */}
        <ThreePillars />

        {/* Feature Breakdown */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom scroll-reveal">
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

        {/* FAQ */}
        <section className="section-spacing bg-bg-secondary" id="faq">
          <div className="container-custom scroll-reveal">
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
          <div className="container-custom text-center scroll-reveal">
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary"></div>}>
      <HomeContent />
    </Suspense>
  );
}
