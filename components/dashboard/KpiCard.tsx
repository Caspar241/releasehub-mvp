'use client';

import Link from 'next/link';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { KpiMetric } from '@/lib/types/dashboard';

interface KpiCardProps {
  metric: KpiMetric;
  loading?: boolean;
}

/**
 * KpiCard Component
 *
 * Modular KPI card with:
 * - Title and main value
 * - Mini sparkline chart (optional)
 * - Delta indicator with trend (▲/▼)
 * - Hover elevation and accent glow
 * - Click to navigate to detail page
 */
export default function KpiCard({ metric, loading = false }: KpiCardProps) {
  const { title, value, delta, sparklineData, href, infoTooltip } = metric;

  // Determine delta color
  const deltaColorClass =
    delta?.trend === 'positive'
      ? 'text-green-500 bg-green-500/10'
      : delta?.trend === 'negative'
      ? 'text-red-500 bg-red-500/10'
      : 'text-text-secondary bg-surface-overlay';

  // Determine sparkline color
  const sparklineColor =
    delta?.trend === 'positive'
      ? '#10b981' // green
      : delta?.trend === 'negative'
      ? '#ef4444' // red
      : '#4FD1FF'; // accent cyan

  // Loading skeleton
  if (loading) {
    return (
      <div className="border border-border rounded-lg p-3 animate-pulse">
        <div className="h-3 bg-surface-elevated rounded w-20 mb-3" />
        <div className="h-8 bg-surface-elevated rounded w-24 mb-2" />
        <div className="h-4 bg-surface-elevated rounded w-16" />
      </div>
    );
  }

  const CardContent = (
    <div
      className="relative border border-border rounded-lg p-3 transition-all duration-200 hover:border-accent/40 hover:bg-surface-overlay/10 hover:shadow-e2 cursor-pointer group"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Header: Title + Info Icon */}
      <div className="flex items-start justify-between mb-2">
        <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
          {title}
        </p>

        {/* Info Tooltip (optional) */}
        {infoTooltip && (
          <div className="group/tooltip relative">
            <svg
              className="w-3 h-3 text-text-muted/60 hover:text-accent transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-1 w-48 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50">
              <div className="glass-card rounded-lg p-2 text-xs text-text-secondary shadow-e3">
                {infoTooltip}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Value + Sparkline Row */}
      <div className="flex items-end justify-between mb-2">
        {/* Main Value */}
        <p className="text-2xl font-bold text-text-primary leading-none">
          {value}
        </p>

        {/* Mini Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-16 h-8 -mb-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={sparklineColor}
                  strokeWidth={1.5}
                  dot={false}
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Delta Chip */}
      {delta && (
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold ${deltaColorClass}`}
          >
            {/* Trend arrow */}
            {delta.trend === 'positive' && <span>▲</span>}
            {delta.trend === 'negative' && <span>▼</span>}

            {/* Delta value */}
            <span>
              {delta.value > 0 ? '+' : ''}
              {delta.value}%
            </span>
          </span>

          <span className="text-[10px] text-text-muted">vs. Vorperiode</span>
        </div>
      )}

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(79, 209, 255, 0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );

  // Wrap in Link if href provided
  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}
