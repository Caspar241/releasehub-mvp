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
    scheduled: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    live: 'bg-green-100 text-green-800',
  };
  const labels = {
    scheduled: 'Geplant',
    processing: 'In Bearbeitung',
    live: 'Live',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
};

export default function ReleaseOverview() {
  return (
    <div className="space-y-6">
      {/* Upcoming Releases */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Kommende Releases</h2>
          <Link
            href="/dashboard/upload"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            + Neuer Release
          </Link>
        </div>

        {upcomingReleases.length > 0 ? (
          <div className="space-y-4">
            {upcomingReleases.map((release) => (
              <div
                key={release.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{release.title}</h3>
                  <p className="text-sm text-gray-600">{release.artist}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Release: {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(release.status)}
                  <div className="flex gap-1">
                    {release.platforms.slice(0, 3).map((platform, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs"
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
          <div className="text-center py-12 text-gray-500">
            <p>Keine kommenden Releases geplant.</p>
            <Link href="/dashboard/upload" className="text-indigo-600 hover:text-indigo-700 mt-2 inline-block">
              Erstelle deinen ersten Release →
            </Link>
          </div>
        )}
      </div>

      {/* Recent Releases */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Aktuelle Releases</h2>
          <Link
            href="/dashboard/releases"
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Alle anzeigen →
          </Link>
        </div>

        {recentReleases.length > 0 ? (
          <div className="space-y-4">
            {recentReleases.map((release) => (
              <div
                key={release.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{release.title}</h3>
                  <p className="text-sm text-gray-600">{release.artist}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Veröffentlicht: {new Date(release.releaseDate).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{release.streams}</p>
                    <p className="text-xs text-gray-500">Streams</p>
                  </div>
                  <div className="flex gap-1">
                    {release.platforms.slice(0, 4).map((platform, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs"
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
          <div className="text-center py-12 text-gray-500">
            <p>Noch keine Releases veröffentlicht.</p>
          </div>
        )}
      </div>
    </div>
  );
}
