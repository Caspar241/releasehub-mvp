'use client';

import { useState, useMemo } from 'react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { KpiMetric, SparklineDataPoint } from '@/lib/types/dashboard';
import KpiCard from './KpiCard';

/**
 * QuickStats Component
 *
 * Displays key metrics in collapsible card grid:
 * - Streams, Earnings, Release Status, Open Tasks
 * - Each metric uses KpiCard with sparklines and deltas
 * - Responds to global date range selection
 * - Mock data until API is available
 */

// Helper: Generate mock sparkline data
function generateMockSparkline(days: number, trend: 'up' | 'down' | 'flat'): SparklineDataPoint[] {
  const data: SparklineDataPoint[] = [];
  const baseValue = 100;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    let value = baseValue;
    if (trend === 'up') {
      value = baseValue + (i * 5) + Math.random() * 10;
    } else if (trend === 'down') {
      value = baseValue - (i * 3) + Math.random() * 10;
    } else {
      value = baseValue + Math.random() * 20 - 10;
    }

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
    });
  }

  return data;
}

export default function QuickStats() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { dateRange, formatRangeDisplay } = useDateRange();

  // Generate metrics based on active date range
  // TODO: Replace with real API calls when available
  const metrics: KpiMetric[] = useMemo(() => {
    const dataPoints = dateRange.preset === '7d' ? 7 : dateRange.preset === '90d' ? 30 : 14;

    return [
      {
        id: 'streams',
        title: `Streams (${formatRangeDisplay()})`,
        value: '847.2K',
        delta: {
          value: 18.4,
          trend: 'positive',
        },
        sparklineData: generateMockSparkline(dataPoints, 'up'),
        href: '/dashboard/analytics',
        infoTooltip: 'Gesamtanzahl der Streams über alle Plattformen',
      },
      {
        id: 'earnings',
        title: 'Earnings (MTD)',
        value: '€3,127',
        delta: {
          value: 12.1,
          trend: 'positive',
        },
        sparklineData: generateMockSparkline(dataPoints, 'up'),
        href: '/dashboard/earnings',
        infoTooltip: 'Geschätzte Einnahmen für den aktuellen Monat',
      },
      {
        id: 'release-status',
        title: 'Release Status',
        value: '8',
        delta: {
          value: 0,
          trend: 'neutral',
        },
        href: '/dashboard/releases',
        infoTooltip: '3 Live / 2 Geplant / 3 Entwürfe',
      },
      {
        id: 'open-tasks',
        title: 'Open Tasks',
        value: '4',
        delta: {
          value: -15.2,
          trend: 'negative',
        },
        sparklineData: generateMockSparkline(dataPoints, 'down'),
        href: '#alerts',
        infoTooltip: '2 kritische Tasks erfordern sofortige Aktion',
      },
    ];
  }, [dateRange.preset, formatRangeDisplay]);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors duration-150"
      >
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
          Key Metrics
        </h3>
        <svg
          className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="grid grid-cols-1 gap-3 p-4 pt-0 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
