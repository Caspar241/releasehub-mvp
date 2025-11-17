'use client';

import Link from 'next/link';

interface TasksPlaceholderProps {
  featureName?: string;
  onClose?: () => void;
  isPanel?: boolean;
}

export default function TasksPlaceholder({
  featureName = 'Tasks',
  onClose,
  isPanel = false
}: TasksPlaceholderProps) {
  // Determine if feature name is plural for correct grammar
  const isPlural = featureName === 'Tasks' || featureName === 'Smart Links';
  const verb = isPlural ? 'werden' : 'wird';

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(79, 209, 255, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto w-full relative z-10">
        <div
          className="relative rounded-3xl p-12 md:p-16 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.5) 0%, rgba(15, 17, 21, 0.3) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(79, 209, 255, 0.1)',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.05),
              0 20px 60px rgba(0, 0, 0, 0.4)
            `,
          }}
        >
          {/* Content Area */}
          <div className="text-center space-y-10 relative z-10">
            {/* Lock Icon (static) */}
            <div className="flex justify-center">
              <div
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(79, 209, 255, 0.06) 0%, rgba(79, 209, 255, 0.02) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(79, 209, 255, 0.15)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 8px 24px rgba(0, 0, 0, 0.3),
                    0 0 40px rgba(79, 209, 255, 0.1)
                  `,
                }}
              >
                {/* Lock SVG Icon */}
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 text-accent/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                {/* Subtle glow (static) */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(79, 209, 255, 0.2) 0%, transparent 70%)',
                    opacity: 0.4,
                  }}
                />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight tracking-tight">
                {featureName} {verb} bald freigeschaltet
              </h1>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg mx-auto">
                Dieses Feature befindet sich in Entwicklung und wird automatisch für dich freigeschaltet, sobald es live geht.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-8">
              {isPanel && onClose ? (
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium bg-accent text-text-inverse hover:bg-accent-hover transition-all duration-200 shadow-sm hover:shadow-accent-soft active:scale-95"
                >
                  Zurück zum Dashboard
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium bg-accent text-text-inverse hover:bg-accent-hover transition-all duration-200 shadow-sm hover:shadow-accent-soft active:scale-95"
                >
                  Zurück zum Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
