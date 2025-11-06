'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PricingCards from '@/components/PricingCards';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function PricingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useScrollReveal();
  const comparisonData = {
    headers: ['Feature', 'Basic', 'Premium', 'Label'],
    rows: [
      { feature: 'Preis', basic: '29,99 €/Monat', premium: '79,99 €/Monat', label: '129,99 €/Monat' },
      { feature: 'Releases pro Jahr', basic: '4 Singles', premium: 'Unlimited Singles/EPs/Alben', label: 'Unlimited (Multi-Artist)' },
      { feature: 'Team-Mitglieder', basic: '1 (nur du)', premium: '3 (Artist + Producer + Manager)', label: '10 (Label-Team)' },
      { feature: 'Distribution', basic: '✓ 0% Fee', premium: '✓ 0% Fee', label: '✓ 0% Fee' },
      { feature: 'Asset-Storage', basic: '5 GB', premium: '50 GB', label: '200 GB' },
      { feature: 'Smart Links', basic: '1 aktiver Link', premium: 'Unlimited', label: 'Unlimited' },
      { feature: 'EPK-Builder', basic: '✗', premium: '✓', label: '✓' },
      { feature: 'Analytics-Dashboard', basic: 'Basis (Spotify + Apple)', premium: 'Full (alle Plattformen)', label: 'Full + Label-Reporting' },
      { feature: 'Templates & Checklisten', basic: '✓ Standard', premium: '✓ Premium + Custom', label: '✓ Premium + Custom' },
      { feature: 'Support', basic: 'Email (48h)', premium: 'Priority Email + Chat', label: '1:1 Onboarding Call' },
    ],
  };

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
        <section className="pt-24 pb-12 bg-bg-primary">
          <div className="container-custom text-center">
            <h1 className="mb-4">Pricing</h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Fair, transparent, ohne versteckte Cuts. Alle Pläne: 0% Rights Taken.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <PricingCards />

        {/* Feature-Matrix */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom scroll-reveal">
            <h2 className="text-center mb-12">Komplette Feature-Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border-light">
                    {comparisonData.headers.map((header, index) => (
                      <th
                        key={index}
                        className={`p-4 text-left font-semibold ${
                          index === 0 ? 'w-1/3' : 'w-1/6 text-center'
                        } ${index === 2 ? 'bg-accent/10' : ''}`}
                      >
                        {header}
                        {index === 2 && <span className="badge ml-2">Beliebt</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.rows.map((row, index) => (
                    <tr key={index} className="border-b border-border-light">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">{row.basic}</td>
                      <td className="p-4 text-center bg-accent/5">{row.premium}</td>
                      <td className="p-4 text-center">{row.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Vergleich ReleaseHub vs IndieFlow vs Label */}
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

        {/* Final CTA */}
        <section className="section-spacing bg-bg-dark text-text-inverse">
          <div className="container-custom text-center scroll-reveal">
            <h2 className="mb-6">Bereit anzufangen?</h2>
            <p className="text-body-lg mb-8 max-w-2xl mx-auto">
              Wähle deinen Plan und starte strukturiert. <br />
              Kein Kleingedrucktes. Keine versteckten Fees. Keine Rechte-Abgabe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#pricing" className="btn-accent">
                Plan wählen →
              </Link>
              <Link href="/resources" className="btn-secondary">
                Erst Checkliste downloaden
              </Link>
            </div>
            <div className="mt-12 text-text-secondary space-y-2">
              <p>🔒 Sicher bezahlen mit Stripe</p>
              <p>🇪🇺 Europäisches Unternehmen, EU-Steuern</p>
              <p>📧 Fragen? support@releasehub.com</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
