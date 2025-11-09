'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { DateRangeOption, DateRange } from '@/lib/types/dashboard';

// ========================================
// CONTEXT INTERFACE
// ========================================

interface DateRangeContextType {
  activeDateRange: DateRangeOption;
  dateRange: DateRange;
  setDateRange: (option: DateRangeOption) => void;
  getStartDate: () => Date;
  getEndDate: () => Date;
  formatRange: () => string;
}

// ========================================
// CONTEXT CREATION
// ========================================

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calculate start date based on date range option
 */
function calculateStartDate(option: DateRangeOption): Date {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (option) {
    case '7d':
      return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    case '90d':
      return new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
    case 'ytd':
      // Year to date: January 1st of current year
      return new Date(now.getFullYear(), 0, 1);
    default:
      return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
}

/**
 * Get label for date range option
 */
function getDateRangeLabel(option: DateRangeOption): string {
  switch (option) {
    case '7d':
      return '7 Tage';
    case '30d':
      return '30 Tage';
    case '90d':
      return '90 Tage';
    case 'ytd':
      return 'YTD';
    default:
      return '30 Tage';
  }
}

/**
 * Format date range for display
 */
function formatDateRange(startDate: Date, endDate: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };

  const start = startDate.toLocaleDateString('de-DE', options);
  const end = endDate.toLocaleDateString('de-DE', options);

  return `${start} - ${end}`;
}

// ========================================
// PROVIDER COMPONENT
// ========================================

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [activeDateRange, setActiveDateRange] = useState<DateRangeOption>('30d');

  // Calculate current date range
  const endDate = new Date();
  const startDate = calculateStartDate(activeDateRange);

  const dateRange: DateRange = {
    option: activeDateRange,
    label: getDateRangeLabel(activeDateRange),
    startDate,
    endDate,
  };

  // Set date range handler
  const setDateRange = useCallback((option: DateRangeOption) => {
    setActiveDateRange(option);
  }, []);

  // Get start date
  const getStartDate = useCallback(() => {
    return dateRange.startDate;
  }, [dateRange.startDate]);

  // Get end date
  const getEndDate = useCallback(() => {
    return dateRange.endDate;
  }, [dateRange.endDate]);

  // Format date range for display
  const formatRange = useCallback(() => {
    return formatDateRange(dateRange.startDate, dateRange.endDate);
  }, [dateRange.startDate, dateRange.endDate]);

  const value: DateRangeContextType = {
    activeDateRange,
    dateRange,
    setDateRange,
    getStartDate,
    getEndDate,
    formatRange,
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
