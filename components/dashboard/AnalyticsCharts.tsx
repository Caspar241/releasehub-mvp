'use client';

import { useState } from 'react';

export default function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data für Streams
  const streamData = [
    { date: '01.11', streams: 12000 },
    { date: '02.11', streams: 15000 },
    { date: '03.11', streams: 18000 },
    { date: '04.11', streams: 14000 },
    { date: '05.11', streams: 22000 },
    { date: '06.11', streams: 25000 },
  ];

  const maxStreams = Math.max(...streamData.map((d) => d.streams));

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="feature-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Streams Übersicht</h2>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-text-inverse'
                    : 'bg-bg-secondary text-text-primary hover:bg-border-light'
                }`}
              >
                {range === '7d' && 'Letzte 7 Tage'}
                {range === '30d' && 'Letzte 30 Tage'}
                {range === '90d' && 'Letzte 90 Tage'}
                {range === '1y' && 'Letztes Jahr'}
              </button>
            ))}
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {streamData.map((data, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-16 text-sm text-text-secondary">{data.date}</div>
              <div className="flex-1 h-8 bg-bg-secondary rounded-button overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-button transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ width: `${(data.streams / maxStreams) * 100}%` }}
                >
                  <span className="text-white text-sm font-medium">
                    {data.streams.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border-light">
          <div>
            <p className="text-sm text-text-secondary">Gesamt Streams</p>
            <p className="text-2xl font-bold text-text-primary">106K</p>
            <p className="text-sm text-accent">+12% vs. vorher</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Durchschnitt/Tag</p>
            <p className="text-2xl font-bold text-text-primary">17.7K</p>
            <p className="text-sm text-accent">+8% vs. vorher</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Top Tag</p>
            <p className="text-2xl font-bold text-text-primary">25K</p>
            <p className="text-sm text-text-secondary">06.11.2025</p>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="feature-card">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Streams nach Plattform</h2>
        <div className="space-y-4">
          {[
            { platform: 'Spotify', streams: 45000, percentage: 42, color: 'bg-accent' },
            { platform: 'Apple Music', streams: 28000, percentage: 26, color: 'bg-primary' },
            { platform: 'YouTube Music', streams: 21000, percentage: 20, color: 'bg-text-primary' },
            { platform: 'Amazon Music', streams: 12000, percentage: 12, color: 'bg-text-secondary' },
          ].map((item) => (
            <div key={item.platform}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">{item.platform}</span>
                <span className="text-sm text-text-secondary">
                  {item.streams.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
