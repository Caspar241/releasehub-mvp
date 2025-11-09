'use client';

import { useDateRange } from '@/contexts/DateRangeContext';
import { DateRangeOption, DATE_RANGE_OPTIONS } from '@/lib/types/dashboard';

/**
 * Date Range Switcher Component
 *
 * Segmented control for switching between different date ranges (7d, 30d, 90d, YTD)
 * Integrates with DateRangeContext to update global state
 * Positioned in dashboard header for easy access
 */
export default function DateRangeSwitcher() {
  const { activeDateRange, setDateRange } = useDateRange();

  const options: DateRangeOption[] = ['7d', '30d', '90d', 'ytd'];

  return (
    <div className="flex items-center gap-1 bg-surface-elevated/60 backdrop-blur-sm rounded-lg p-1 border border-border">
      {options.map((option) => {
        const isActive = activeDateRange === option;

        return (
          <button
            key={option}
            onClick={() => setDateRange(option)}
            className={`
              relative px-3 py-1.5 text-xs font-semibold rounded-md
              transition-all duration-200
              ${
                isActive
                  ? 'text-text-inverse bg-accent shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay/50'
              }
            `}
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Active indicator glow */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-md opacity-20 blur-sm"
                style={{
                  background: 'radial-gradient(circle, rgba(79, 209, 255, 0.4) 0%, transparent 70%)',
                }}
              />
            )}

            {/* Label */}
            <span className="relative z-10 uppercase tracking-wider">
              {DATE_RANGE_OPTIONS[option]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
