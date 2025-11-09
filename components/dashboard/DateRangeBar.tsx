'use client';

import { useState, useRef, useEffect } from 'react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { DateRangePreset, getPresetLabel, formatRange, validateDateRange, formatDateForInput, parseDateFromInput } from '@/lib/date';

/**
 * DateRangeBar Component
 *
 * Preset pills: 7 TAGE | 30 TAGE | 90 TAGE | CUSTOM
 * Custom opens popup with two date pickers (Von/Bis)
 * Keyboard accessible, validates from <= to
 */
export default function DateRangeBar() {
  const { dateRange, setPreset, setCustomRange } = useDateRange();
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);
  const customButtonRef = useRef<HTMLButtonElement>(null);

  const presets: DateRangePreset[] = ['7d', '30d', '90d'];

  // Initialize custom dates when popup opens
  useEffect(() => {
    if (showCustomPopup && dateRange.preset === 'custom') {
      setFromDate(formatDateForInput(dateRange.from));
      setToDate(formatDateForInput(dateRange.to));
    }
  }, [showCustomPopup, dateRange]);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        customButtonRef.current &&
        !customButtonRef.current.contains(event.target as Node)
      ) {
        setShowCustomPopup(false);
      }
    };

    if (showCustomPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCustomPopup]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCustomPopup) {
        setShowCustomPopup(false);
        customButtonRef.current?.focus();
      }
    };

    if (showCustomPopup) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showCustomPopup]);

  // Handle preset click
  const handlePresetClick = (preset: DateRangePreset) => {
    setPreset(preset);
    setError(null);
  };

  // Handle custom button click
  const handleCustomClick = () => {
    setShowCustomPopup(!showCustomPopup);
    if (!showCustomPopup) {
      // Initialize with current range
      setFromDate(formatDateForInput(dateRange.from));
      setToDate(formatDateForInput(dateRange.to));
      setError(null);
    }
  };

  // Handle apply custom range
  const handleApplyCustom = () => {
    const from = parseDateFromInput(fromDate);
    const to = parseDateFromInput(toDate);

    const validationError = validateDateRange(from, to);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (from && to) {
      setCustomRange(from, to);
      setShowCustomPopup(false);
      setError(null);
    }
  };

  // Get display text for custom button
  const customDisplayText = dateRange.preset === 'custom'
    ? formatRange(dateRange.from, dateRange.to)
    : 'CUSTOM';

  return (
    <div className="relative flex items-center gap-1 bg-surface-elevated/60 backdrop-blur-sm rounded-lg p-1 border border-border">
      {/* Preset Pills */}
      {presets.map((preset) => {
        const isActive = dateRange.preset === preset;

        return (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`
              relative px-3 py-1.5 text-xs font-semibold rounded-md
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-accent/50
              ${
                isActive
                  ? 'text-text-inverse bg-accent shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay/50'
              }
            `}
            style={{ transform: 'translateZ(0)' }}
            aria-pressed={isActive}
          >
            {/* Active indicator glow */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-md opacity-20 blur-sm pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(79, 209, 255, 0.4) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
            )}

            {/* Label */}
            <span className="relative z-10 uppercase tracking-wider">
              {getPresetLabel(preset)}
            </span>
          </button>
        );
      })}

      {/* Custom Button */}
      <button
        ref={customButtonRef}
        onClick={handleCustomClick}
        className={`
          relative px-3 py-1.5 text-xs font-semibold rounded-md
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-accent/50
          ${
            dateRange.preset === 'custom'
              ? 'text-text-inverse bg-accent shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay/50'
          }
        `}
        style={{ transform: 'translateZ(0)' }}
        aria-pressed={dateRange.preset === 'custom'}
        aria-haspopup="dialog"
        aria-expanded={showCustomPopup}
      >
        {/* Active indicator glow */}
        {dateRange.preset === 'custom' && (
          <div
            className="absolute inset-0 rounded-md opacity-20 blur-sm pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(79, 209, 255, 0.4) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Label */}
        <span className="relative z-10 uppercase tracking-wider whitespace-nowrap">
          {customDisplayText}
        </span>
      </button>

      {/* Custom Date Popup */}
      {showCustomPopup && (
        <div
          ref={popupRef}
          role="dialog"
          aria-label="Benutzerdefinierten Zeitraum wählen"
          className="absolute top-full right-0 mt-2 w-80 glass-card rounded-lg p-4 shadow-e3 z-[60]"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            Benutzerdefinierten Zeitraum wählen
          </h3>

          <div className="space-y-3">
            {/* From Date */}
            <div>
              <label htmlFor="from-date" className="block text-xs font-medium text-text-secondary mb-1">
                Von
              </label>
              <input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setError(null);
                }}
                className="w-full px-3 py-2 bg-surface-overlay border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-required="true"
                aria-invalid={!!error}
              />
            </div>

            {/* To Date */}
            <div>
              <label htmlFor="to-date" className="block text-xs font-medium text-text-secondary mb-1">
                Bis
              </label>
              <input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setError(null);
                }}
                className="w-full px-3 py-2 bg-surface-overlay border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-required="true"
                aria-invalid={!!error}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="text-xs text-red-500 bg-red-500/10 border border-red-500/30 rounded px-2 py-1.5"
              >
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleApplyCustom}
                className="flex-1 px-3 py-2 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Anwenden
              </button>
              <button
                onClick={() => {
                  setShowCustomPopup(false);
                  customButtonRef.current?.focus();
                }}
                className="px-3 py-2 bg-surface-overlay text-text-secondary text-sm font-medium rounded-md hover:bg-surface-overlay/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
