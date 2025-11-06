'use client';

import { useState } from 'react';

export default function EarningsBreakdown() {
  const [activeTab, setActiveTab] = useState<'tracks' | 'releases' | 'stores' | 'countries'>('tracks');

  // Mock data
  const tracksData = [
    { track: 'City Lights', release: 'Urban Dreams', store: 'Spotify', period: 'Okt 2025', amount: 1250, share: 35, status: 'paid' },
    { track: 'Ocean Waves', release: 'Chill Vibes', store: 'Apple Music', period: 'Okt 2025', amount: 820, share: 23, status: 'pending' },
    { track: 'Midnight Dreams', release: 'Singles 2025', store: 'YouTube Music', period: 'Okt 2025', amount: 450, share: 12, status: 'paid' },
    { track: 'Summer Vibes', release: 'Singles 2025', store: 'Spotify', period: 'Okt 2025', amount: 680, share: 19, status: 'paid' },
  ];

  const storesData = [
    { store: 'Spotify', tracks: 12, amount: 2450, share: 42, status: 'active' },
    { store: 'Apple Music', tracks: 12, amount: 1820, share: 31, status: 'active' },
    { store: 'YouTube Music', tracks: 8, amount: 980, share: 17, status: 'active' },
    { store: 'TikTok', tracks: 5, amount: 350, share: 6, status: 'active' },
    { store: 'Instagram', tracks: 4, amount: 250, share: 4, status: 'delayed' },
  ];

  const countriesData = [
    { country: 'Deutschland', flag: '🇩🇪', amount: 2100, share: 36, trend: 'up' },
    { country: 'USA', flag: '🇺🇸', amount: 1500, share: 26, trend: 'up' },
    { country: 'UK', flag: '🇬🇧', amount: 900, share: 15, trend: 'neutral' },
    { country: 'Frankreich', flag: '🇫🇷', amount: 650, share: 11, trend: 'down' },
    { country: 'Spanien', flag: '🇪🇸', amount: 450, share: 8, trend: 'up' },
  ];

  const tabs = [
    { id: 'tracks' as const, label: 'Tracks' },
    { id: 'releases' as const, label: 'Releases' },
    { id: 'stores' as const, label: 'Stores' },
    { id: 'countries' as const, label: 'Länder' },
  ];

  return (
    <div className="feature-card">
      {/* Tab Navigation */}
      <div className="border-b border-border-light mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filter & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-border-light rounded-button text-sm focus:ring-2 focus:ring-accent">
            <option>Alle Stores</option>
            <option>Spotify</option>
            <option>Apple Music</option>
            <option>YouTube Music</option>
          </select>
          <select className="px-4 py-2 border border-border-light rounded-button text-sm focus:ring-2 focus:ring-accent">
            <option>Okt 2025</option>
            <option>Sep 2025</option>
            <option>Aug 2025</option>
          </select>
        </div>
        <button className="btn-secondary text-sm">
          Export (CSV)
        </button>
      </div>

      {/* Tracks Tab */}
      {activeTab === 'tracks' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Track</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Release</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Store</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Umsatz</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Anteil</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {tracksData.map((track, idx) => (
                <tr key={idx} className="border-b border-border-light hover:bg-bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-text-primary">{track.track}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{track.release}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{track.store}</td>
                  <td className="py-3 px-4 text-sm font-medium text-text-primary text-right">€{track.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary text-right">{track.share}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      track.status === 'paid' ? 'bg-accent text-white' : 'bg-bg-secondary text-text-primary'
                    }`}>
                      {track.status === 'paid' ? '✓ Gezahlt' : '⏳ Ausstehend'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stores Tab */}
      {activeTab === 'stores' && (
        <div className="space-y-4">
          {storesData.map((store, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 border border-border-light rounded-card hover:shadow-card-hover transition-all">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-text-primary">{store.store}</h3>
                  <span className={`badge ${
                    store.status === 'active' ? 'bg-accent text-white' : 'bg-bg-secondary text-accent'
                  }`}>
                    {store.status === 'active' ? '✓ Aktiv' : '⚠️ Daten verzögert'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>{store.tracks} Tracks</span>
                  <span>€{store.amount.toLocaleString()}</span>
                  <span>{store.share}% Anteil</span>
                </div>
              </div>
              <div className="text-right">
                <button className="text-sm text-accent hover:underline">Details →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Countries Tab */}
      {activeTab === 'countries' && (
        <div className="space-y-4">
          {countriesData.map((country, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium text-text-primary">{country.country}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary">
                    €{country.amount.toLocaleString()} ({country.share}%)
                  </span>
                  <span className={`text-sm ${country.trend === 'up' ? 'text-accent' : 'text-text-secondary'}`}>
                    {country.trend === 'up' && '↗'}
                    {country.trend === 'down' && '↘'}
                    {country.trend === 'neutral' && '→'}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${country.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Releases Tab (Placeholder) */}
      {activeTab === 'releases' && (
        <div className="text-center py-12 text-text-secondary">
          <p>Releases-Ansicht – Aggregierte Daten auf Release-Ebene</p>
          <p className="text-sm mt-2">(Ähnliche Struktur wie Tracks-Tab)</p>
        </div>
      )}
    </div>
  );
}
