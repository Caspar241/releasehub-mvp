'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';

function WelcomeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    // In production, verify session and user status
    // For now, just simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
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
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-body-lg text-text-secondary">Dein Account wird eingerichtet...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
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
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="mb-4">Oops, etwas ist schiefgelaufen</h1>
            <p className="text-body-lg text-text-secondary mb-8">{error}</p>
            <Link href="/pricing" className="btn-primary">
              Zurück zu Pricing
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
        {/* Welcome Hero */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="mb-6">Willkommen bei ReleaseHub!</h1>
              <p className="text-body-lg text-text-secondary mb-8">
                Dein Account ist bereit. Lass uns dein erstes Release strukturiert angehen.
              </p>
            </div>
          </div>
        </section>

        {/* Onboarding Steps */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center mb-12">Was als Nächstes passiert</h2>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="feature-card">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl font-bold text-accent">1</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Setze dein erstes Ziel</h3>
                      <p className="text-text-secondary mb-4">
                        Wann ist dein nächster Release? Gib uns ein Datum, und wir helfen dir, rückwärts zu planen.
                      </p>
                      <div className="bg-bg-primary p-4 rounded-lg mb-4">
                        <label htmlFor="releaseDate" className="block text-sm font-semibold mb-2">
                          Nächster Release-Termin:
                        </label>
                        <input
                          type="date"
                          id="releaseDate"
                          className="w-full p-3 border border-border-light rounded-lg"
                          placeholder="z.B. 15.03.2025"
                        />
                      </div>
                      <button className="btn-primary">Ziel speichern →</button>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="feature-card">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl font-bold text-accent">2</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Lade dein Team ein</h3>
                      <p className="text-text-secondary mb-4">
                        Producer, Manager, Designer – füge sie hinzu, damit alle auf einer Seite sind.
                      </p>
                      <Link href="/dashboard/team" className="btn-secondary inline-block">
                        Team einladen
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="feature-card">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl font-bold text-accent">3</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Erstelle deinen ersten Release-Plan</h3>
                      <p className="text-text-secondary mb-4">
                        Wähle ein Template (Single, EP, Album) und lass uns alle Schritte durchgehen.
                      </p>
                      <Link href="/dashboard/releases/new" className="btn-secondary inline-block">
                        Release-Plan erstellen
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="feature-card">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl font-bold text-accent">4</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Hol dir die Resources</h3>
                      <p className="text-text-secondary mb-4">
                        Release-Checkliste, Promo-Kalender, EPK-Template – alles gratis zum Download.
                      </p>
                      <Link href="/resources" className="btn-secondary inline-block">
                        Zu den Resources →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="/dashboard" className="btn-primary">
                  Zum Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Brauchst du Hilfe?</h2>
              <p className="text-body-lg text-text-secondary mb-8">
                Unser Support-Team ist für dich da. Schreib uns eine Email oder schau in die FAQ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:support@releasehub.com" className="btn-secondary">
                  📧 Support kontaktieren
                </a>
                <Link href="/#faq" className="btn-secondary">
                  FAQ ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Wird geladen...</p>
        </div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}
