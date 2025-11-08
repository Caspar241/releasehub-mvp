'use client';

import Link from 'next/link';

// Mock data - später durch echte Daten aus einer API ersetzen
const upcomingReleases = [
  {
    id: 1,
    title: 'Summer Vibes',
    artist: 'Your Name',
    releaseDate: '2025-11-15',
    coverUrl: '/placeholder-cover.jpg',
    status: 'scheduled',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
  },
  {
    id: 2,
    title: 'Midnight Dreams',
    artist: 'Your Name',
    releaseDate: '2025-11-22',
    coverUrl: '/placeholder-cover.jpg',
    status: 'processing',
    platforms: ['Spotify', 'Apple Music'],
  },
];

const recentReleases = [
  {
    id: 3,
    title: 'Ocean Waves',
    artist: 'Your Name',
    releaseDate: '2025-10-28',
    coverUrl: '/placeholder-cover.jpg',
    status: 'live',
    streams: '45.2K',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'],
  },
  {
    id: 4,
    title: 'City Lights',
    artist: 'Your Name',
    releaseDate: '2025-10-15',
    coverUrl: '/placeholder-cover.jpg',
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
  return (
    <div className="space-y-6">
      {/* Upcoming Releases */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Kommende Releases</h2>
          <Link
            href="/dashboard/upload"
            className="btn-primary"
          >
            + Neuer Release
          </Link>
        </div>

        {upcomingReleases.length > 0 ? (
          <div className="space-y-4">
            {upcomingReleases.map((release) => (
              <div
                key={release.id}
                className="flex items-center gap-4 p-4 border border-border-light rounded-card hover:border-accent/20 hover:shadow-glow transition-all duration-200 cursor-pointer active:scale-[0.99]"
                style={{ transform: 'translateZ(0)', willChange: 'transform, border-color, box-shadow' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-card flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary truncate">{release.title}</h3>
                  <p className="text-sm text-text-secondary">{release.artist}</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Release: {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(release.status)}
                  <div className="flex gap-1">
                    {release.platforms.slice(0, 3).map((platform, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 bg-bg-secondary rounded-full flex items-center justify-center text-xs text-text-primary"
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
          <div className="text-center py-12 text-text-secondary">
            <p>Keine kommenden Releases geplant.</p>
            <Link href="/dashboard/upload" className="link text-accent mt-2 inline-block">
              Erstelle deinen ersten Release →
            </Link>
          </div>
        )}
      </div>

      {/* Recent Releases */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Aktuelle Releases</h2>
          <Link
            href="/dashboard/releases"
            className="link text-accent text-sm font-medium hover:text-accent-hover transition-colors duration-150"
          >
            Alle anzeigen →
          </Link>
        </div>

        {recentReleases.length > 0 ? (
          <div className="space-y-4">
            {recentReleases.map((release) => (
              <div
                key={release.id}
                className="flex items-center gap-4 p-4 border border-border-light rounded-card hover:border-accent/20 hover:shadow-glow transition-all duration-200 cursor-pointer active:scale-[0.99]"
                style={{ transform: 'translateZ(0)', willChange: 'transform, border-color, box-shadow' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-card flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary truncate">{release.title}</h3>
                  <p className="text-sm text-text-secondary">{release.artist}</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Veröffentlicht: {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">{release.streams}</p>
                    <p className="text-xs text-text-secondary">Streams</p>
                  </div>
                  <div className="flex gap-1">
                    {release.platforms.slice(0, 4).map((platform, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 bg-bg-secondary rounded-full flex items-center justify-center text-xs text-text-primary"
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
          <div className="text-center py-12 text-text-secondary">
            <p>Noch keine Releases veröffentlicht.</p>
          </div>
        )}
      </div>
    </div>
  );
}
