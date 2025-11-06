'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data
const allReleases = [
  {
    id: 1,
    title: 'Summer Vibes',
    type: 'Single',
    releaseDate: '2025-11-15',
    status: 'scheduled',
    streams: 0,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
  {
    id: 2,
    title: 'Midnight Dreams',
    type: 'Single',
    releaseDate: '2025-11-22',
    status: 'processing',
    streams: 0,
    platforms: ['Spotify', 'Apple Music'],
  },
  {
    id: 3,
    title: 'Ocean Waves',
    type: 'Single',
    releaseDate: '2025-10-28',
    status: 'live',
    streams: 45200,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'],
  },
  {
    id: 4,
    title: 'City Lights',
    type: 'Single',
    releaseDate: '2025-10-15',
    status: 'live',
    streams: 128500,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
  {
    id: 5,
    title: 'Neon Nights',
    type: 'Single',
    releaseDate: '2025-09-20',
    status: 'live',
    streams: 19800,
    platforms: ['Spotify', 'Apple Music'],
  },
  {
    id: 6,
    title: 'Desert Dreams EP',
    type: 'EP',
    releaseDate: '2025-08-10',
    status: 'live',
    streams: 87300,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Deezer'],
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

export default function AllReleasesList() {
  const [filter, setFilter] = useState<'all' | 'live' | 'scheduled' | 'processing'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'streams'>('date');

  const filteredReleases = allReleases.filter(release =>
    filter === 'all' ? true : release.status === filter
  );

  const sortedReleases = [...filteredReleases].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
    return b.streams - a.streams;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="feature-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Alle' },
              { value: 'live', label: 'Live' },
              { value: 'scheduled', label: 'Geplant' },
              { value: 'processing', label: 'In Bearbeitung' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value as any)}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
                  filter === item.value
                    ? 'bg-primary text-text-inverse'
                    : 'bg-bg-secondary text-text-primary hover:bg-border-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'streams')}
            className="px-4 py-2 border border-border-light rounded-button text-sm focus:ring-2 focus:ring-accent"
          >
            <option value="date">Nach Datum</option>
            <option value="streams">Nach Streams</option>
          </select>
        </div>
      </div>

      {/* Releases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedReleases.map((release) => (
          <div
            key={release.id}
            className="feature-card"
          >
            {/* Cover */}
            <div className="h-48 bg-gradient-to-br from-primary to-accent rounded-card flex items-center justify-center mb-4">
              <span className="text-6xl">🎵</span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-text-primary text-lg">{release.title}</h3>
                  {getStatusBadge(release.status)}
                </div>
                <p className="text-sm text-text-secondary">{release.type}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Release:</span>
                  <span className="font-medium text-text-primary">
                    {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                  </span>
                </div>
                {release.status === 'live' && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Streams:</span>
                    <span className="font-medium text-text-primary">
                      {release.streams.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-border-light">
                {release.platforms.map((platform, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-bg-secondary text-text-primary rounded text-xs"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 btn-accent">
                  Details
                </button>
                <button className="px-3 py-2 border border-border-light text-text-primary rounded-button hover:bg-bg-secondary transition-colors text-sm">
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedReleases.length === 0 && (
        <div className="feature-card p-12 text-center">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-text-secondary mb-4">Keine Releases gefunden.</p>
          <Link
            href="/dashboard/upload"
            className="btn-primary inline-block"
          >
            Neuen Release erstellen
          </Link>
        </div>
      )}
    </div>
  );
}
