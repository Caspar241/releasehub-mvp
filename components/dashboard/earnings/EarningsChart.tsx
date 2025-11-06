'use client';

import { useState } from 'react';

export default function EarningsChart() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data
  const chartData = [
    { date: '01.11', amount: 2800 },
    { date: '02.11', amount: 3200 },
    { date: '03.11', amount: 2900 },
    { date: '04.11', amount: 3500 },
    { date: '05.11', amount: 4200 },
    { date: '06.11', amount: 5100 },
  ];

  const maxAmount = Math.max(...chartData.map(d => d.amount));
  const total = chartData.reduce((sum, d) => sum + d.amount, 0);
  const average = Math.round(total / chartData.length);
  const peak = maxAmount;

  return (
    <div className="feature-card">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-text-primary">Einnahmen-Verlauf</h2>
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
      <div className="space-y-4 mb-6">
        {chartData.map((data, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-20 text-sm text-text-secondary">{data.date}</div>
            <div className="flex-1 h-10 bg-bg-secondary rounded-button overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-button transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${(data.amount / maxAmount) * 100}%` }}
              >
                <span className="text-white text-sm font-medium">
                  €{data.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-light">
        <div>
          <p className="text-sm text-text-secondary">Gesamt</p>
          <p className="text-xl font-bold text-text-primary">€{total.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-text-secondary">Ø Tag</p>
          <p className="text-xl font-bold text-text-primary">€{average.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-text-secondary">Peak</p>
          <p className="text-xl font-bold text-text-primary">€{peak.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">06.11</p>
        </div>
      </div>
    </div>
  );
}
