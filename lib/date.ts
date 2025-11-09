import { format, subDays, startOfDay, endOfDay, isAfter, isBefore, isValid } from 'date-fns';
import { de } from 'date-fns/locale';

/**
 * Date utility functions for dashboard
 * Using date-fns with German locale
 */

export type DateRangePreset = '7d' | '30d' | '90d' | 'custom';

export interface DateRangeValue {
  preset: DateRangePreset;
  from: Date;
  to: Date;
}

/**
 * Get date range for a preset
 */
export function getPresetRange(preset: DateRangePreset): { from: Date; to: Date } {
  const today = endOfDay(new Date());

  switch (preset) {
    case '7d':
      return {
        from: startOfDay(subDays(today, 7)),
        to: today,
      };
    case '30d':
      return {
        from: startOfDay(subDays(today, 30)),
        to: today,
      };
    case '90d':
      return {
        from: startOfDay(subDays(today, 90)),
        to: today,
      };
    case 'custom':
      // For custom, return default 30 days
      return {
        from: startOfDay(subDays(today, 30)),
        to: today,
      };
    default:
      return {
        from: startOfDay(subDays(today, 30)),
        to: today,
      };
  }
}

/**
 * Format date range for display (German format)
 * Examples: "12.08. – 10.09.", "01.01.2024 – 31.03.2024"
 */
export function formatRange(from: Date, to: Date): string {
  const fromYear = from.getFullYear();
  const toYear = to.getFullYear();
  const currentYear = new Date().getFullYear();

  // Same year as current: show dd.MM.
  if (fromYear === toYear && fromYear === currentYear) {
    return `${format(from, 'dd.MM.', { locale: de })} – ${format(to, 'dd.MM.', { locale: de })}`;
  }

  // Different years or not current year: show dd.MM.yyyy
  return `${format(from, 'dd.MM.yyyy', { locale: de })} – ${format(to, 'dd.MM.yyyy', { locale: de })}`;
}

/**
 * Format single date (German format)
 */
export function formatDate(date: Date, includeYear = false): string {
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  if (!includeYear && year === currentYear) {
    return format(date, 'dd.MM.', { locale: de });
  }

  return format(date, 'dd.MM.yyyy', { locale: de });
}

/**
 * Format date for input field (yyyy-MM-dd)
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Parse date from input field
 */
export function parseDateFromInput(value: string): Date | null {
  const date = new Date(value);
  return isValid(date) ? date : null;
}

/**
 * Validate date range
 * Returns error message if invalid, null if valid
 */
export function validateDateRange(from: Date | null, to: Date | null): string | null {
  if (!from || !to) {
    return 'Bitte wählen Sie beide Daten aus';
  }

  if (!isValid(from) || !isValid(to)) {
    return 'Ungültiges Datum';
  }

  if (isAfter(from, to)) {
    return 'Von-Datum darf nicht nach dem Bis-Datum liegen';
  }

  // Check if range is too far in the past (e.g., > 2 years)
  const twoYearsAgo = subDays(new Date(), 730);
  if (isBefore(from, twoYearsAgo)) {
    return 'Zeitraum liegt zu weit in der Vergangenheit';
  }

  return null;
}

/**
 * Get label for preset
 */
export function getPresetLabel(preset: DateRangePreset): string {
  switch (preset) {
    case '7d':
      return '7 TAGE';
    case '30d':
      return '30 TAGE';
    case '90d':
      return '90 TAGE';
    case 'custom':
      return 'CUSTOM';
    default:
      return '30 TAGE';
  }
}

/**
 * Check if date is within range
 */
export function isDateInRange(date: Date, from: Date, to: Date): boolean {
  return !isBefore(date, from) && !isAfter(date, to);
}

/**
 * Get days in range
 */
export function getDaysInRange(from: Date, to: Date): number {
  const diffTime = Math.abs(to.getTime() - from.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
