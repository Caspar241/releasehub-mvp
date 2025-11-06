'use client';

import { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  description: string;
  earnings?: string;
  streams?: string;
}

export default function DistributionChannels() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'spotify',
      name: 'Spotify',
      icon: '🎵',
      connected: true,
      description: 'Weltweit führende Streaming-Plattform',
      earnings: '€2,450',
      streams: '1.2M',
    },
    {
      id: 'apple',
      name: 'Apple Music',
      icon: '🍎',
      connected: true,
      description: 'Apple\'s Premium Musik-Service',
      earnings: '€1,820',
      streams: '850K',
    },
    {
      id: 'youtube',
      name: 'YouTube Music',
      icon: '▶️',
      connected: true,
      description: 'Video & Musik Streaming von Google',
      earnings: '€980',
      streams: '620K',
    },
    {
      id: 'amazon',
      name: 'Amazon Music',
      icon: '🛒',
      connected: false,
      description: 'Amazon\'s Streaming-Service',
    },
    {
      id: 'deezer',
      name: 'Deezer',
      icon: '🎧',
      connected: false,
      description: 'Französischer Streaming-Dienst',
    },
    {
      id: 'tidal',
      name: 'Tidal',
      icon: '🌊',
      connected: false,
      description: 'Hi-Fi Musik Streaming',
    },
    {
      id: 'soundcloud',
      name: 'SoundCloud',
      icon: '☁️',
      connected: false,
      description: 'Plattform für unabhängige Artists',
    },
    {
      id: 'bandcamp',
      name: 'Bandcamp',
      icon: '🎸',
      connected: false,
      description: 'Direktverkauf an Fans',
    },
  ]);

  const togglePlatform = (platformId: string) => {
    setPlatforms(platforms.map(p =>
      p.id === platformId
        ? { ...p, connected: !p.connected }
        : p
    ));
    // Hier würde die API-Logik für Connect/Disconnect kommen
    alert(`Platform ${platformId} ${platforms.find(p => p.id === platformId)?.connected ? 'disconnected' : 'connected'}!`);
  };

  const connectedPlatforms = platforms.filter(p => p.connected);
  const availablePlatforms = platforms.filter(p => !p.connected);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
              ✓
            </div>
            <div>
              <p className="text-sm text-gray-600">Verbundene Plattformen</p>
              <p className="text-2xl font-bold text-gray-900">{connectedPlatforms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
              📊
            </div>
            <div>
              <p className="text-sm text-gray-600">Gesamt Einnahmen</p>
              <p className="text-2xl font-bold text-gray-900">
                €{connectedPlatforms.reduce((sum, p) => {
                  const earnings = parseFloat(p.earnings?.replace('€', '').replace(',', '') || '0');
                  return sum + earnings;
                }, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
              🎵
            </div>
            <div>
              <p className="text-sm text-gray-600">Verfügbare Plattformen</p>
              <p className="text-2xl font-bold text-gray-900">{availablePlatforms.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Verbundene Plattformen</h2>
        {connectedPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{platform.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Aktiv
                  </span>
                </div>

                {platform.earnings && platform.streams && (
                  <div className="grid grid-cols-2 gap-4 mb-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-600">Streams</p>
                      <p className="text-lg font-bold text-gray-900">{platform.streams}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Einnahmen</p>
                      <p className="text-lg font-bold text-gray-900">{platform.earnings}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Einstellungen
                  </button>
                  <button
                    onClick={() => togglePlatform(platform.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    Trennen
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Keine Plattformen verbunden.</p>
          </div>
        )}
      </div>

      {/* Available Platforms */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Verfügbare Plattformen</h2>
        {availablePlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePlatforms.map((platform) => (
              <div
                key={platform.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-3xl">{platform.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-600">{platform.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => togglePlatform(platform.id)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Verbinden
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Alle verfügbaren Plattformen sind bereits verbunden!</p>
          </div>
        )}
      </div>
    </div>
  );
}
