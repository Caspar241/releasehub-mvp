'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';

export default function HelpPage() {
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
      <main className="min-h-screen">
        {/* Hero */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom text-center">
            <h1 className="mb-6">Help Center</h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
              FAQ, Support-Artikel und Antworten auf alle deine Fragen rund um ReleaseHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@releasehub.com" className="btn-primary">
                📧 Support kontaktieren
              </a>
              <Link href="/#faq" className="btn-secondary">
                FAQ ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-6">💡</div>
              <h2 className="mb-6">Help Center wird aufgebaut</h2>
              <p className="text-body-lg text-text-secondary mb-8">
                Wir arbeiten an einem kompletten Help Center mit Tutorials, FAQ und Video-Guides.
                In der Zwischenzeit kannst du uns direkt kontaktieren.
              </p>
              <a href="mailto:support@releasehub.com" className="btn-secondary inline-block">
                support@releasehub.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
