'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - später durch echte Daten aus einer API ersetzen
const upcomingReleases = [
  {
    id: 1,
    title: '4L',
    artist: 'Mando47',
    releaseDate: '2025-11-15',
    coverUrl: '/cover-mando47.jpg',
    status: 'scheduled',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
  {
    id: 2,
    title: 'Beachclub',
    artist: 'Mando47',
    releaseDate: '2025-11-22',
    coverUrl: '/cover-mando47.jpg',
    status: 'processing',
    platforms: ['Spotify', 'Apple Music'],
  },
];

const recentReleases = [
  {
    id: 3,
    title: 'More Money More Problems',
    artist: 'Mando47',
    releaseDate: '2025-10-28',
    coverUrl: '/cover-mando47.jpg',
    status: 'live',
    streams: '45.2K',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'],
  },
  {
    id: 4,
    title: 'Freak Like Me',
    artist: 'Mando47',
    releaseDate: '2025-10-15',
    coverUrl: '/cover-mando47.jpg',
    status: 'live',
    streams: '128.5K',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
];

const getStatusBadge = (status: string) => {
  const styles = {
    scheduled: 'bg-bg-secondary text-text-primary',
    processing: 'bg-bg-secondary text-accent',
    live: 'bg-accent text-white',
  };
  const labels = {
    scheduled: 'Geplant',
    processing: 'In Bearbeitung',
    live: 'Live',
  };
  return (
    <span className={`badge ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
};

export default function ReleaseOverview() {
  const [upcomingExpanded, setUpcomingExpanded] = useState(true);
  const [recentExpanded, setRecentExpanded] = useState(true);

  return (
    <div className="space-y-4">
      {/* Upcoming Releases */}
      <div className="glass-card rounded-xl overflow-hidden">
        <button
          onClick={() => setUpcomingExpanded(!upcomingExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors duration-150"
        >
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
            Kommende Releases
          </h3>
          <svg
            className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
              upcomingExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`transition-all duration-200 ease-in-out ${
            upcomingExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >

          <div className="p-4 pt-0">
            {upcomingReleases.length > 0 ? (
              <div className="space-y-2">
                {upcomingReleases.map((release) => (
                  <div
                    key={release.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-accent/30 transition-all duration-150 cursor-pointer"
                  >
                    <img
                      src={release.coverUrl}
                      alt={release.title}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary truncate">{release.title}</h4>
                      <p className="text-xs text-text-secondary">{release.artist}</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {getStatusBadge(release.status)}
                      <div className="flex gap-1">
                        {release.platforms.slice(0, 3).map((platform, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 bg-bg-secondary rounded-full flex items-center justify-center text-[10px] text-text-primary"
                            title={platform}
                          >
                            {platform[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary">
                <p className="text-sm">Keine kommenden Releases geplant.</p>
                <Link href="/dashboard/upload" className="text-accent text-xs mt-2 inline-block hover:underline">
                  Erstelle deinen ersten Release →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Releases */}
      <div className="glass-card rounded-xl overflow-hidden">
        <button
          onClick={() => setRecentExpanded(!recentExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors duration-150"
        >
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
            Aktuelle Releases
          </h3>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/releases"
              className="text-accent text-xs font-medium hover:text-accent-hover transition-colors duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              Alle anzeigen →
            </Link>
            <svg
              className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                recentExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <div
          className={`transition-all duration-200 ease-in-out ${
            recentExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="p-4 pt-0">
            {recentReleases.length > 0 ? (
              <div className="space-y-2">
                {recentReleases.map((release) => (
                  <div
                    key={release.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-accent/30 transition-all duration-150 cursor-pointer"
                  >
                    <img
                      src={release.coverUrl}
                      alt={release.title}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary truncate">{release.title}</h4>
                      <p className="text-xs text-text-secondary">{release.artist}</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="text-right">
                        <p className="text-xs font-semibold text-text-primary">{release.streams}</p>
                        <p className="text-[10px] text-text-secondary">Streams</p>
                      </div>
                      <div className="flex gap-1">
                        {release.platforms.slice(0, 4).map((platform, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 bg-bg-secondary rounded-full flex items-center justify-center text-[10px] text-text-primary"
                            title={platform}
                          >
                            {platform[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary">
                <p className="text-sm">Noch keine Releases veröffentlicht.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
