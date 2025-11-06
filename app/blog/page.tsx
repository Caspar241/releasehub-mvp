'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';

export default function BlogPage() {
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
            <h1 className="mb-6">Blog & Guides</h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Tutorials, Best Practices und Insider-Wissen für erfolgreiche Releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources" className="btn-primary">
                Zu den Resources →
              </Link>
              <Link href="/" className="btn-secondary">
                Zurück zur Homepage
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="mb-6">Blog startet bald</h2>
              <p className="text-body-lg text-text-secondary">
                Wir bereiten gerade Content vor: Release-Strategien, Marketing-Tipps,
                Industry-Insights und mehr.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
