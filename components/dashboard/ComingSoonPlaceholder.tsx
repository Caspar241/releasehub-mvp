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
    <div
      className="relative min-h-screen p-6 lg:p-10"
      style={{
        /* Same grid background as homepage */
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: 'center center',
        /* Vignette effect */
        boxShadow: 'inset 0 0 300px rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Animated grid overlay with subtle breathing */}
      <div
        className="absolute inset-0 pointer-events-none animate-grid-pulse"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79, 209, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 209, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="relative glass-card-premium rounded-2xl p-8 md:p-12">
          {/* Noise texture overlay for depth */}
          <div className="absolute inset-0 noise-overlay rounded-2xl pointer-events-none" />

          {/* Status Badge with fade-in animation */}
          <div className="absolute top-4 right-4 animate-badge-in">
            <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full">
              {statusLabels[status]}
            </span>
          </div>

          {/* Content Area */}
          <div className="text-center space-y-8 relative z-10">
            {/* Visual Element - Blurred Preview Box with Animation */}
            <div className="flex justify-center">
              <div
                className="relative w-20 h-20 md:w-28 md:h-28 bg-surface-overlay/40 backdrop-blur-md border border-accent/15 rounded-xl flex items-center justify-center animate-float-pulse overflow-hidden"
                style={{
                  boxShadow: '0 0 24px rgba(79, 209, 255, 0.12), inset 0 0 20px rgba(79, 209, 255, 0.08)',
                }}
              >
                {/* Sheen effect overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheen"
                  />
                </div>

                {/* Lock Icon */}
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-text-muted/50 relative z-10"
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
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                {featureName} ist noch nicht verfügbar.
              </h1>

              {/* Cyan divider line */}
              <div className="flex justify-center">
                <div
                  className="h-0.5 w-16 bg-accent/25 rounded-full"
                  style={{
                    boxShadow: '0 0 8px rgba(79, 209, 255, 0.3)',
                  }}
                />
              </div>
            </div>

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
              {/* Primary Button with micro-lift */}
              <div>
                <Link
                  href="/dashboard"
                  className="inline-block btn-primary btn-micro-lift px-6 py-3 rounded-button shadow-sm hover:shadow-glow transition-all duration-150"
                >
                  Zurück zum Dashboard
                </Link>
              </div>

              {/* Secondary Link with micro-lift */}
              <div>
                <Link
                  href="/dashboard"
                  className="inline-block text-sm text-text-secondary hover:text-accent hover:underline transition-all duration-150 btn-micro-lift"
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
