'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data
const allReleases = [
  {
    id: 1,
    title: '4L',
    artist: 'Mando47',
    type: 'Single',
    releaseDate: '2025-11-15',
    coverUrl: '/cover-mando47.jpg',
    status: 'scheduled',
    streams: 0,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
  {
    id: 2,
    title: 'Beachclub',
    artist: 'Mando47',
    type: 'Single',
    releaseDate: '2025-11-22',
    coverUrl: '/cover-mando47.jpg',
    status: 'processing',
    streams: 0,
    platforms: ['Spotify', 'Apple Music'],
  },
  {
    id: 3,
    title: 'More Money More Problems',
    artist: 'Mando47',
    type: 'Single',
    releaseDate: '2025-10-28',
    coverUrl: '/cover-mando47.jpg',
    status: 'live',
    streams: 45200,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'],
  },
  {
    id: 4,
    title: 'Freak Like Me',
    artist: 'Mando47',
    type: 'Single',
    releaseDate: '2025-10-15',
    coverUrl: '/cover-mando47.jpg',
    status: 'live',
    streams: 128500,
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
  {
    id: 5,
    title: 'Neon Nights',
    artist: 'Mando47',
    type: 'Single',
    releaseDate: '2025-09-20',
    coverUrl: '/cover-mando47.jpg',
    status: 'live',
    streams: 19800,
    platforms: ['Spotify', 'Apple Music'],
  },
  {
    id: 6,
    title: 'Desert Dreams EP',
    artist: 'Mando47',
    type: 'EP',
    releaseDate: '2025-08-10',
    coverUrl: '/cover-mando47.jpg',
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
      <div className="glass-card p-6 rounded-2xl">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 active:scale-95 ${
                  filter === item.value
                    ? 'bg-accent text-text-inverse shadow-glow'
                    : 'bg-surface-raised text-text-primary hover:bg-surface-elevated hover:border-accent/20'
                }`}
                style={{ transform: 'translateZ(0)' }}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sortedReleases.map((release) => (
          <div
            key={release.id}
            className="glass-card p-3 rounded-xl transition-all duration-200 hover:border-accent/20 hover:shadow-glow hover:-translate-y-1 cursor-pointer active:scale-[0.99]"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Cover - Quadratisch und größer */}
            <div className="aspect-square rounded-lg overflow-hidden mb-3">
              <img
                src={release.coverUrl}
                alt={release.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content - Kompakt */}
            <div className="space-y-2">
              <div>
                <div className="flex items-start justify-between gap-1 mb-0.5">
                  <h3 className="font-semibold text-text-primary text-sm truncate">{release.title}</h3>
                  {getStatusBadge(release.status)}
                </div>
                <p className="text-xs text-text-secondary truncate">{release.artist}</p>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Release:</span>
                  <span className="font-medium text-text-primary text-[10px]">
                    {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                  </span>
                </div>
                {release.status === 'live' && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Streams:</span>
                    <span className="font-medium text-text-primary text-[10px]">
                      {release.streams.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-1 pt-1">
                <button className="flex-1 btn-primary text-xs py-1.5">
                  Details
                </button>
                <button className="px-2 py-1.5 border border-border-light text-text-primary rounded-button hover:bg-bg-secondary transition-all duration-150 text-xs active:scale-95"
                  style={{ transform: 'translateZ(0)' }}>
                  •••
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedReleases.length === 0 && (
        <div className="feature-card p-12 text-center">
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
