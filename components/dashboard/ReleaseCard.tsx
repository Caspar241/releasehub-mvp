'use client';

import Link from 'next/link';
import { Release, HEALTH_CRITERIA_LABELS } from '@/lib/types/dashboard';

interface ReleaseCardProps {
  release: Release;
  showHealthScore?: boolean;
  showStreams?: boolean;
}

/**
 * ReleaseCard Component
 *
 * Displays release information with:
 * - Cover art, title, artist, release date
 * - Status badge (scheduled, processing, live)
 * - Platform icons
 * - Health Score bar (0-100) with tooltip showing missing criteria
 * - Streams (for live releases)
 */
export default function ReleaseCard({ release, showHealthScore = false, showStreams = false }: ReleaseCardProps) {
  const { title, artist, coverArt, releaseDate, status, platforms, healthScore, streams } = release;

  // Status badge
  const getStatusStyle = () => {
    switch (status) {
      case 'scheduled':
        return 'bg-bg-secondary text-text-primary border border-border';
      case 'processing':
        return 'bg-bg-secondary text-accent border border-accent/30';
      case 'live':
        return 'bg-accent text-white';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border border-red-500/30';
      default:
        return 'bg-surface-overlay text-text-secondary';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'scheduled':
        return 'Geplant';
      case 'processing':
        return 'In Bearbeitung';
      case 'live':
        return 'Live';
      case 'failed':
        return 'Fehler';
      default:
        return status;
    }
  };

  // Health score color
  const getHealthColor = (score: number) => {
    if (score >= 76) return '#10b981'; // green
    if (score >= 51) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const healthColor = healthScore ? getHealthColor(healthScore.score) : '#4FD1FF';

  // Format date
  const formattedDate = new Date(releaseDate).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="group relative flex items-center gap-3 p-3 border border-border rounded-lg hover:border-accent/30 transition-all duration-150 cursor-pointer">
      {/* Health Score Bar (Top Border) */}
      {showHealthScore && healthScore && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 bg-surface-overlay rounded-t-lg overflow-hidden"
          role="progressbar"
          aria-label="Release Health Score"
          aria-valuenow={healthScore.score}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${healthScore.score}%`,
              background: `linear-gradient(90deg, ${healthColor}, ${healthColor}cc)`,
            }}
          />
        </div>
      )}

      {/* Cover Art */}
      <div className="relative">
        <img
          src={coverArt || '/placeholder-cover.jpg'}
          alt={title}
          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
          {title}
        </h4>
        <p className="text-xs text-text-secondary">{artist}</p>
        <p className="text-xs text-text-muted mt-0.5">{formattedDate}</p>
      </div>

      {/* Right Side: Status + Platforms OR Streams + Health Tooltip */}
      <div className="flex flex-col items-end gap-1.5">
        {/* Status Badge */}
        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusStyle()}`}>
          {getStatusLabel()}
        </span>

        {/* Streams (for live releases) */}
        {showStreams && streams !== undefined && (
          <div className="text-right">
            <p className="text-xs font-semibold text-text-primary">{streams.toLocaleString()}</p>
            <p className="text-[10px] text-text-secondary">Streams</p>
          </div>
        )}

        {/* Platform Icons */}
        <div className="flex gap-1">
          {platforms.slice(0, 4).map((platform, idx) => (
            <div
              key={idx}
              className="w-5 h-5 bg-bg-secondary rounded-full flex items-center justify-center text-[10px] text-text-primary"
              title={platform.name}
            >
              {platform.name[0]}
            </div>
          ))}
        </div>

        {/* Health Score Tooltip Trigger */}
        {showHealthScore && healthScore && (
          <div className="group/tooltip relative">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{
                backgroundColor: `${healthColor}15`,
                color: healthColor,
              }}
              aria-label={`Health Score: ${healthScore.score}%`}
            >
              <span>{healthScore.score}%</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none group-hover/tooltip:pointer-events-auto">
              <div className="glass-card rounded-lg p-3 text-xs shadow-e3">
                <h5 className="font-semibold text-text-primary mb-2">Health Score: {healthScore.score}/100</h5>
                <div className="space-y-1.5">
                  {Object.entries(healthScore.criteria).map(([key, completed]) => {
                    const label = HEALTH_CRITERIA_LABELS[key as keyof typeof HEALTH_CRITERIA_LABELS];
                    return (
                      <div key={key} className="flex items-center gap-2">
                        {completed ? (
                          <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={completed ? 'text-text-secondary' : 'text-text-primary font-medium'}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-text-muted mt-2">
                  Zuletzt aktualisiert: {new Date(healthScore.lastUpdated).toLocaleDateString('de-DE')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
