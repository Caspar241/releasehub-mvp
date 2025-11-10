'use client';

import { useMemo } from 'react';
import { KeyMetricsProvider, useKeyMetrics } from '@/contexts/KeyMetricsContext';
import { KpiMetric, SparklineDataPoint } from '@/lib/types/dashboard';
import KpiCard from './KpiCard';
import KeyMetricsControls from '../metrics/KeyMetricsControls';

/**
 * QuickStats Component - With Apple-like Date Range Selector
 *
 * Features:
 * - Segmented control (7/30/90/CUSTOM) top-right
 * - Only affects the 4 KPI metrics
 * - State persisted in localStorage (km-range)
 * - Loading skeletons during range changes
 * - Isolated from global date range context
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

function QuickStatsContent() {
  const { range, formatDisplay, isLoading } = useKeyMetrics();

  // Generate metrics based on selected range
  const metrics: KpiMetric[] = useMemo(() => {
    const dataPoints = range.preset === '7d' ? 7 : range.preset === '90d' ? 30 : range.preset === '30d' ? 14 : 30;
    const rangeLabel = formatDisplay();

    return [
      {
        id: 'streams',
        title: `Streams (${rangeLabel})`,
        value: '847.2K',
        delta: {
          value: 18.4,
          trend: 'positive',
        },
        sparklineData: generateMockSparkline(dataPoints, 'up'),
        href: '/dashboard/analyze/streams',
        infoTooltip: 'Gesamtanzahl der Streams über alle Plattformen',
      },
      {
        id: 'revenue',
        title: `Revenue (${rangeLabel})`,
        value: '€3,127',
        delta: {
          value: 12.1,
          trend: 'positive',
        },
        sparklineData: generateMockSparkline(dataPoints, 'up'),
        href: '/dashboard/analyze/reports',
        infoTooltip: 'Geschätzte Einnahmen für den gewählten Zeitraum',
      },
      {
        id: 'task-progress',
        title: 'Task Progress',
        value: '12/16',
        delta: {
          value: 15.0,
          trend: 'positive',
        },
        sparklineData: generateMockSparkline(dataPoints, 'up'),
        href: '/dashboard/plan/tasks',
        infoTooltip: '12 von 16 Tasks abgeschlossen (75%)',
      },
      {
        id: 'health-index',
        title: 'Health Index',
        value: '82/100',
        delta: {
          value: 8.5,
          trend: 'positive',
        },
        sparklineData: generateMockSparkline(dataPoints, 'up'),
        href: '/dashboard/releases',
        infoTooltip: 'Durchschnittlicher Health Score aller aktiven Releases (Audio, Artwork, Metadata, Splits, Schedule)',
      },
    ];
  }, [range.preset, formatDisplay]);

  return (
    <div className="glass-card rounded-xl overflow-visible">
      {/* Header with Controls */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border overflow-visible">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
          Key Metrics
        </h3>

        {/* Apple-like Segmented Control */}
        <KeyMetricsControls />
      </div>

      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`transition-opacity duration-150 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            >
              <KpiCard metric={metric} />
            </div>
          ))}
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-bg-primary/20 backdrop-blur-[2px] flex items-center justify-center rounded-xl pointer-events-none">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuickStats() {
  return (
    <KeyMetricsProvider>
      <QuickStatsContent />
    </KeyMetricsProvider>
  );
}
