'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Stat {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  href: string;
  subvalue?: string;
}

const stats: Stat[] = [
  {
    label: 'Streams (last 30 days)',
    value: '847.2K',
    change: '+18.4%',
    changeType: 'positive',
    href: '/dashboard/analytics',
    subvalue: 'vs. Vormonat',
  },
  {
    label: 'Earnings (month-to-date)',
    value: '€3,127',
    change: '+12.1%',
    changeType: 'positive',
    href: '/dashboard/earnings',
    subvalue: 'geschätzt',
  },
  {
    label: 'Release Status',
    value: '8',
    change: '3 / 2 / 3',
    changeType: 'neutral',
    href: '/dashboard/releases',
    subvalue: 'LIVE / UPCOMING / DRAFT',
  },
  {
    label: 'Open Tasks',
    value: '4',
    change: '2 kritisch',
    changeType: 'negative',
    href: '#alerts',
    subvalue: 'erfordern Aktion',
  },
];

export default function QuickStats() {
  const [isExpanded, setIsExpanded] = useState(true);

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
        <div className="grid grid-cols-1 gap-3 p-4 pt-0 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const changeColorClass =
              stat.changeType === 'positive'
                ? 'text-green-500'
                : stat.changeType === 'negative'
                ? 'text-red-500'
                : 'text-text-secondary';

            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="border border-border rounded-lg p-3 transition-all duration-150 hover:border-accent/40 hover:bg-surface-overlay/10 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </p>
                  {stat.changeType === 'positive' && (
                    <svg
                      className="w-3 h-3 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  )}
                  {stat.changeType === 'negative' && (
                    <svg
                      className="w-3 h-3 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary mb-1 leading-none">
                    {stat.value}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-xs font-semibold ${changeColorClass}`}>
                      {stat.change}
                    </span>
                  </div>
                  {stat.subvalue && (
                    <p className="text-[10px] text-text-muted mt-1">{stat.subvalue}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
