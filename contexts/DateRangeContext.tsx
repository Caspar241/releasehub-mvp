'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { DateRangePreset, DateRangeValue, getPresetRange, formatRange } from '@/lib/date';

// ========================================
// CONTEXT INTERFACE
// ========================================

interface DateRangeContextType {
  dateRange: DateRangeValue;
  setPreset: (preset: DateRangePreset) => void;
  setCustomRange: (from: Date, to: Date) => void;
  getStartDate: () => Date;
  getEndDate: () => Date;
  formatRangeDisplay: () => string;
}

// ========================================
// CONTEXT CREATION
// ========================================

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

// ========================================
// PROVIDER COMPONENT
// ========================================

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  // Default: 30 days
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => {
    const { from, to } = getPresetRange('30d');
    return {
      preset: '30d',
      from,
      to,
    };
  });

  // Set preset (7d, 30d, 90d)
  const setPreset = useCallback((preset: DateRangePreset) => {
    const { from, to } = getPresetRange(preset);
    setDateRange({
      preset,
      from,
      to,
    });
  }, []);

  // Set custom range
  const setCustomRange = useCallback((from: Date, to: Date) => {
    setDateRange({
      preset: 'custom',
      from,
      to,
    });
  }, []);

  // Get start date
  const getStartDate = useCallback(() => {
    return dateRange.from;
  }, [dateRange.from]);

  // Get end date
  const getEndDate = useCallback(() => {
    return dateRange.to;
  }, [dateRange.to]);

  // Format date range for display
  const formatRangeDisplay = useCallback(() => {
    return formatRange(dateRange.from, dateRange.to);
  }, [dateRange.from, dateRange.to]);

  const value: DateRangeContextType = {
    dateRange,
    setPreset,
    setCustomRange,
    getStartDate,
    getEndDate,
    formatRangeDisplay,
  };

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  );
}

// ========================================
// HOOK
// ========================================

/**
 * Hook to access date range context
 * @throws Error if used outside DateRangeProvider
 */
export function useDateRange(): DateRangeContextType {
  const context = useContext(DateRangeContext);

  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }

  return context;
}

// ========================================
// UTILITY FUNCTIONS (can be used without context)
// ========================================

/**
 * Filter data array by date range
 * Generic utility for client-side filtering when API doesn't support it yet
 * TODO: Replace with backend filtering when API is ready
 */
export function filterByDateRange<T extends { date: string | Date }>(
  data: T[],
  startDate: Date,
  endDate: Date
): T[] {
  return data.filter((item) => {
    const itemDate = typeof item.date === 'string' ? new Date(item.date) : item.date;
    return itemDate >= startDate && itemDate <= endDate;
  });
}

/**
 * Check if a date is within the current range
 */
export function isDateInRange(date: Date | string, startDate: Date, endDate: Date): boolean {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return checkDate >= startDate && checkDate <= endDate;
}
