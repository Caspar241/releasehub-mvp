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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Streams Übersicht</h2>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <div className="w-16 text-sm text-gray-600">{data.date}</div>
              <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
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
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Gesamt Streams</p>
            <p className="text-2xl font-bold text-gray-900">106K</p>
            <p className="text-sm text-green-600">+12% vs. vorher</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Durchschnitt/Tag</p>
            <p className="text-2xl font-bold text-gray-900">17.7K</p>
            <p className="text-sm text-green-600">+8% vs. vorher</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Top Tag</p>
            <p className="text-2xl font-bold text-gray-900">25K</p>
            <p className="text-sm text-gray-500">06.11.2025</p>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Streams nach Plattform</h2>
        <div className="space-y-4">
          {[
            { platform: 'Spotify', streams: 45000, percentage: 42, color: 'bg-green-500' },
            { platform: 'Apple Music', streams: 28000, percentage: 26, color: 'bg-pink-500' },
            { platform: 'YouTube Music', streams: 21000, percentage: 20, color: 'bg-red-500' },
            { platform: 'Amazon Music', streams: 12000, percentage: 12, color: 'bg-blue-500' },
          ].map((item) => (
            <div key={item.platform}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.platform}</span>
                <span className="text-sm text-gray-600">
                  {item.streams.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
