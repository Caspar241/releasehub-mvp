'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { format, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';

type KeyMetricsPreset = '7d' | '30d' | '90d' | 'custom';

interface KeyMetricsRange {
  preset: KeyMetricsPreset;
  from?: Date;
  to?: Date;
}

interface KeyMetricsContextType {
  range: KeyMetricsRange;
  setPreset: (preset: '7d' | '30d' | '90d') => void;
  setCustomRange: (from: Date, to: Date) => void;
  getStartDate: () => Date;
  getEndDate: () => Date;
  formatDisplay: () => string;
  isLoading: boolean;
}

const KeyMetricsContext = createContext<KeyMetricsContextType | undefined>(undefined);

// Helper: Calculate date range for presets
function getPresetRange(preset: KeyMetricsPreset): { from: Date; to: Date } {
  const to = endOfDay(new Date());
  let from: Date;

  switch (preset) {
    case '7d':
      from = startOfDay(subDays(to, 6)); // Last 7 days including today
      break;
    case '30d':
      from = startOfDay(subDays(to, 29)); // Last 30 days including today
      break;
    case '90d':
      from = startOfDay(subDays(to, 89)); // Last 90 days including today
      break;
    default:
      from = startOfDay(subDays(to, 29)); // Default to 30 days
  }

  return { from, to };
}

// Helper: Format date for display (DD.MM.YYYY)
function formatDateDisplay(date: Date): string {
  return format(date, 'dd.MM.yyyy');
}

// Helper: Serialize range for localStorage
function serializeRange(range: KeyMetricsRange): string {
  if (range.preset !== 'custom') {
    return range.preset;
  }
  if (range.from && range.to) {
    return `custom:${range.from.toISOString()}:${range.to.toISOString()}`;
  }
  return '30d'; // Fallback
}

// Helper: Deserialize range from localStorage
function deserializeRange(value: string): KeyMetricsRange {
  if (value === '7d' || value === '30d' || value === '90d') {
    const { from, to } = getPresetRange(value);
    return { preset: value, from, to };
  }

  if (value.startsWith('custom:')) {
    const [, fromStr, toStr] = value.split(':');
    const from = new Date(fromStr);
    const to = new Date(toStr);
    if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
      return { preset: 'custom', from, to };
    }
  }

  // Fallback to 30d
  const { from, to } = getPresetRange('30d');
  return { preset: '30d', from, to };
}

export function KeyMetricsProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<KeyMetricsRange>(() => {
    // Initialize from localStorage or default to 30d
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('km-range');
      if (stored) {
        return deserializeRange(stored);
      }
    }
    const { from, to } = getPresetRange('30d');
    return { preset: '30d', from, to };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Persist to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('km-range', serializeRange(range));
    }
  }, [range]);

  const setPreset = useCallback((preset: '7d' | '30d' | '90d') => {
    setIsLoading(true);
    const { from, to } = getPresetRange(preset);
    setRange({ preset, from, to });

    // Simulate brief loading state for smooth transition
    setTimeout(() => setIsLoading(false), 150);
  }, []);

  const setCustomRange = useCallback((from: Date, to: Date) => {
    setIsLoading(true);
    setRange({ preset: 'custom', from, to });

    setTimeout(() => setIsLoading(false), 150);
  }, []);

  const getStartDate = useCallback(() => {
    return range.from || getPresetRange('30d').from;
  }, [range]);

  const getEndDate = useCallback(() => {
    return range.to || getPresetRange('30d').to;
  }, [range]);

  const formatDisplay = useCallback(() => {
    if (range.preset !== 'custom') {
      const labels: Record<string, string> = {
        '7d': '7 TAGE',
        '30d': '30 TAGE',
        '90d': '90 TAGE',
      };
      return labels[range.preset] || '30 TAGE';
    }

    // Custom range: show compact format
    if (range.from && range.to) {
      const fromStr = format(range.from, 'dd.MM.');
      const toStr = format(range.to, 'dd.MM.');
      return `${fromStr} – ${toStr}`;
    }

    return 'CUSTOM';
  }, [range]);

  return (
    <KeyMetricsContext.Provider
      value={{
        range,
        setPreset,
        setCustomRange,
        getStartDate,
        getEndDate,
        formatDisplay,
        isLoading,
      }}
    >
      {children}
    </KeyMetricsContext.Provider>
  );
}

export function useKeyMetrics() {
  const context = useContext(KeyMetricsContext);
  if (!context) {
    throw new Error('useKeyMetrics must be used within KeyMetricsProvider');
  }
  return context;
}

// Export helper for quick shortcuts
export const quickShortcuts = [
  { label: 'Heute', days: 0 },
  { label: 'Gestern', days: 1 },
  { label: 'Letzte 7 Tage', days: 6 },
  { label: 'Letzte 30 Tage', days: 29 },
  { label: 'Letzte 90 Tage', days: 89 },
];

export function getShortcutRange(days: number): { from: Date; to: Date } {
  const to = endOfDay(new Date());
  const from = days === 0 ? startOfDay(new Date()) : startOfDay(subDays(to, days));
  return { from, to };
}

export function getThisMonth(): { from: Date; to: Date } {
  return {
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  };
}

export function getLastMonth(): { from: Date; to: Date } {
  const lastMonth = subDays(startOfMonth(new Date()), 1);
  return {
    from: startOfMonth(lastMonth),
    to: endOfMonth(lastMonth),
  };
}
