'use client';

import Link from 'next/link';

interface ComingSoonPlaceholderProps {
  featureName: string;
  status?: 'in-development' | 'in-beta' | 'launching-soon';
}

const statusLabels = {
  'in-development': 'COMING SOON',
  'in-beta': 'BETA',
  'launching-soon': 'BALD VERFÜGBAR',
};

export default function ComingSoonPlaceholder({
  featureName,
  status = 'in-development',
}: ComingSoonPlaceholderProps) {
  return (
    <div className="relative min-h-screen p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="relative glass-card rounded-2xl p-8 md:p-12 shadow-e2 animate-cardIn">
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full">
              {statusLabels[status]}
            </span>
          </div>

          {/* Content Area */}
          <div className="text-center space-y-8">
            {/* Visual Element - Blurred Preview Box */}
            <div className="flex justify-center">
              <div
                className="w-20 h-20 md:w-28 md:h-28 bg-surface-overlay/40 backdrop-blur-md border border-accent/15 rounded-xl flex items-center justify-center animate-float-pulse"
                style={{
                  boxShadow: '0 0 24px rgba(79, 209, 255, 0.12), inset 0 0 20px rgba(79, 209, 255, 0.08)',
                }}
              >
                {/* Lock Icon */}
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-text-muted/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
              {featureName} ist noch nicht verfügbar.
            </h1>

            {/* Subline */}
            <p className="text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
              Wir entwickeln dieses Modul bereits. Dein Account erhält automatisch Zugriff, sobald es veröffentlicht wird – ohne Installation, ohne Upgrade.
            </p>

            {/* Optional Paragraph (Desktop only) */}
            <p className="hidden md:block text-sm text-text-muted leading-relaxed max-w-lg mx-auto">
              Dieses Feature erweitert den Workflow rund um Plan · Release · Scale · Analyze und wird direkt in dein bestehendes Dashboard integriert.
            </p>

            {/* Button Group */}
            <div className="space-y-4">
              {/* Primary Button */}
              <div>
                <Link
                  href="/dashboard"
                  className="inline-block btn-primary px-6 py-3 rounded-button shadow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-150"
                >
                  Zurück zum Dashboard
                </Link>
              </div>

              {/* Secondary Link */}
              <div>
                <Link
                  href="/dashboard"
                  className="text-sm text-text-secondary hover:text-accent hover:underline transition-colors duration-150"
                >
                  Andere Funktionen anzeigen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
