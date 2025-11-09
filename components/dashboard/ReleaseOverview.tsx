'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Release } from '@/lib/types/dashboard';
import ReleaseCard from './ReleaseCard';

/**
 * ReleaseOverview Component
 *
 * Displays upcoming and recent releases using ReleaseCard:
 * - Upcoming releases show health scores
 * - Recent releases show stream counts
 * - Collapsible sections
 * - Mock data until API is available
 */

// TODO: Replace with real API data
const mockReleases: Release[] = [
  {
    id: 'rel-1',
    title: '4L',
    artist: 'Mando47',
    coverArt: '/cover-mando47.jpg',
    releaseDate: new Date('2025-11-15'),
    status: 'scheduled',
    platforms: [
      { id: 'spotify', name: 'Spotify', icon: 'S' },
      { id: 'apple', name: 'Apple Music', icon: 'A' },
      { id: 'youtube', name: 'YouTube Music', icon: 'Y' },
    ],
    healthScore: {
      score: 75,
      criteria: {
        artwork: true,
        master: true,
        presave: true,
        pitch: false,
        budget: true,
        campaign: false,
      },
      lastUpdated: new Date(),
    },
  },
  {
    id: 'rel-2',
    title: 'Beachclub',
    artist: 'Mando47',
    coverArt: '/cover-mando47.jpg',
    releaseDate: new Date('2025-11-22'),
    status: 'processing',
    platforms: [
      { id: 'spotify', name: 'Spotify', icon: 'S' },
      { id: 'apple', name: 'Apple Music', icon: 'A' },
    ],
    healthScore: {
      score: 45,
      criteria: {
        artwork: true,
        master: true,
        presave: false,
        pitch: false,
        budget: false,
        campaign: false,
      },
      lastUpdated: new Date(),
    },
  },
  {
    id: 'rel-3',
    title: 'More Money More Problems',
    artist: 'Mando47',
    coverArt: '/cover-mando47.jpg',
    releaseDate: new Date('2025-10-28'),
    status: 'live',
    platforms: [
      { id: 'spotify', name: 'Spotify', icon: 'S' },
      { id: 'apple', name: 'Apple Music', icon: 'A' },
      { id: 'youtube', name: 'YouTube Music', icon: 'Y' },
      { id: 'amazon', name: 'Amazon Music', icon: 'M' },
    ],
    streams: 45200,
  },
  {
    id: 'rel-4',
    title: 'Freak Like Me',
    artist: 'Mando47',
    coverArt: '/cover-mando47.jpg',
    releaseDate: new Date('2025-10-15'),
    status: 'live',
    platforms: [
      { id: 'spotify', name: 'Spotify', icon: 'S' },
      { id: 'apple', name: 'Apple Music', icon: 'A' },
      { id: 'youtube', name: 'YouTube Music', icon: 'Y' },
    ],
    streams: 128500,
  },
];

export default function ReleaseOverview() {
  const [upcomingExpanded, setUpcomingExpanded] = useState(true);
  const [recentExpanded, setRecentExpanded] = useState(true);

  // Separate upcoming and recent
  const upcomingReleases = useMemo(
    () => mockReleases.filter((r) => r.status === 'scheduled' || r.status === 'processing'),
    []
  );

  const recentReleases = useMemo(
    () => mockReleases.filter((r) => r.status === 'live'),
    []
  );

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
          <div className="p-4 pt-0 space-y-2">
            {upcomingReleases.length > 0 ? (
              upcomingReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} showHealthScore />
              ))
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
          <div className="p-4 pt-0 space-y-2">
            {recentReleases.length > 0 ? (
              recentReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} showStreams />
              ))
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
