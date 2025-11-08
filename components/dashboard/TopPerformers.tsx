'use client';

const topSongs = [
  { rank: 1, title: 'City Lights', streams: 128500, growth: '+15%', trend: 'up' },
  { rank: 2, title: 'Ocean Waves', streams: 45200, growth: '+8%', trend: 'up' },
  { rank: 3, title: 'Midnight Dreams', streams: 32100, growth: '-3%', trend: 'down' },
  { rank: 4, title: 'Summer Vibes', streams: 28400, growth: '+22%', trend: 'up' },
  { rank: 5, title: 'Neon Nights', streams: 19800, growth: '+5%', trend: 'up' },
];

const topCountries = [
  { country: 'Deutschland', flag: '🇩🇪', streams: 52000, percentage: 35 },
  { country: 'USA', flag: '🇺🇸', streams: 38000, percentage: 26 },
  { country: 'Großbritannien', flag: '🇬🇧', streams: 24000, percentage: 16 },
  { country: 'Frankreich', flag: '🇫🇷', streams: 18000, percentage: 12 },
  { country: 'Andere', flag: '🌍', streams: 16000, percentage: 11 },
];

export default function TopPerformers() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Songs */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Top Performing Songs</h2>
        <div className="space-y-4">
          {topSongs.map((song) => (
            <div
              key={song.rank}
              className="flex items-center gap-4 p-3 hover:bg-bg-secondary rounded-button transition-all duration-150 cursor-pointer active:scale-[0.98]"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-button flex items-center justify-center text-white font-bold text-sm">
                {song.rank}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">{song.title}</h3>
                <p className="text-sm text-text-secondary">{song.streams.toLocaleString()} Streams</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    song.trend === 'up' ? 'text-accent' : 'text-text-secondary'
                  }`}
                >
                  {song.growth}
                </span>
                <span className="text-lg">{song.trend === 'up' ? '📈' : '📉'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Countries */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Top Länder</h2>
        <div className="space-y-4">
          {topCountries.map((country, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium text-text-primary">{country.country}</span>
                </div>
                <span className="text-sm text-text-secondary">
                  {country.streams.toLocaleString()} ({country.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${country.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
