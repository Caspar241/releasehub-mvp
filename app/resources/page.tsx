'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import Link from 'next/link';

interface Resource {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: string;
  downloadUrl?: string;
}

export default function ResourcesPage() {
  const [email, setEmail] = useState('');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const resources: Resource[] = [
    {
      id: 'checklist',
      icon: '📋',
      title: 'Release-Checkliste',
      description: 'Die komplette Release-Checkliste für Independent Artists. 50 Schritte von Produktion bis Post-Release.',
      type: 'PDF',
    },
    {
      id: 'timeline',
      icon: '📅',
      title: 'Release-Timeline-Template',
      description: '12-Wochen-Release-Plan für Singles/EPs. Deadlines, Meilensteine, To-dos in Google Sheets / Excel.',
      type: 'Google Sheets / Excel',
    },
    {
      id: 'epk',
      icon: '🎤',
      title: 'EPK-Template',
      description: 'Electronic Press Kit Vorlage. Bio, Pressefotos, Streaming-Links, Press Quotes in Canva / Figma.',
      type: 'Canva / Figma',
    },
    {
      id: 'promo',
      icon: '📱',
      title: 'Promo-Kalender',
      description: '4-Wochen Social-Media-Plan für Releases. Posts, Stories, Reels, TikToks geplant in Google Sheets.',
      type: 'Google Sheets',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual email capture (Supabase, Mailchimp, ConvertKit)
    console.log('Email submitted:', email, 'for resource:', selectedResource);
    setSubmitted(true);

    // Simulate download after submission
    setTimeout(() => {
      alert('Download startet...\n(In Production: Echter Download-Link)');
    }, 500);
  };

  const openDownloadModal = (resourceId: string) => {
    setSelectedResource(resourceId);
    setSubmitted(false);
    setEmail('');
  };

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
            <h1 className="mb-6">Kostenlose Resources für Artists</h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Templates, Checklisten und Tools, die dir helfen, professionell zu releasen.
              Alles gratis. Kein Abo nötig.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource) => (
                <div key={resource.id} className="feature-card">
                  <div className="text-5xl mb-4">{resource.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-text-secondary mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="badge">{resource.type}</span>
                    <button
                      onClick={() => openDownloadModal(resource.id)}
                      className="btn-accent"
                    >
                      Gratis downloaden
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ReleaseHub Section */}
        <section className="section-spacing bg-bg-primary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Willst du mehr als nur Templates?</h2>
              <p className="text-body-lg text-text-secondary mb-8">
                Diese Resources sind ein guter Start – aber ReleaseHub gibt dir ein komplettes System.
                Release-Kalender, Team-Collaboration, Analytics-Dashboard und mehr.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing" className="btn-primary">
                  Abo-Pläne ansehen
                </Link>
                <Link href="/#features" className="btn-secondary">
                  Features entdecken
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ für Resources */}
        <section className="section-spacing bg-bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-center mb-12">Häufige Fragen zu den Resources</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-card">
                  <h3 className="font-bold mb-2">Sind die Resources wirklich kostenlos?</h3>
                  <p className="text-text-secondary">
                    Ja. Du musst nur deine Email hinterlassen (damit wir dir den Download-Link schicken können).
                    Kein Abo, keine Zahlung nötig.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-card">
                  <h3 className="font-bold mb-2">Was passiert mit meiner Email?</h3>
                  <p className="text-text-secondary">
                    Wir schicken dir den Download-Link und gelegentlich Updates zu ReleaseHub (neue Features, Tipps).
                    Du kannst dich jederzeit abmelden.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-card">
                  <h3 className="font-bold mb-2">Kann ich die Templates für mein Label / meine Kunden nutzen?</h3>
                  <p className="text-text-secondary">
                    Ja, solange du sie nicht weiterverkaufst oder als dein eigenes Produkt ausgibst.
                    Für kommerzielle Nutzung (z.B. in deinem Label) ist das okay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Download Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-pricing p-8 max-w-md w-full">
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold mb-4">
                  {resources.find((r) => r.id === selectedResource)?.title}
                </h3>
                <p className="text-text-secondary mb-6">
                  Gib deine Email ein, um den Download-Link zu erhalten.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="deine@email.com"
                    required
                    className="w-full p-3 border border-border-light rounded-lg mb-4"
                  />
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary flex-1">
                      Download starten
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedResource(null)}
                      className="btn-secondary"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-4">Check deine Email!</h3>
                  <p className="text-text-secondary mb-6">
                    Wir haben dir den Download-Link an <strong>{email}</strong> geschickt.
                  </p>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="btn-primary"
                  >
                    Schließen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
