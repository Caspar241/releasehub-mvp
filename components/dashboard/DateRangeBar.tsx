'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker, DateRange } from 'react-day-picker';
import { de } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { useDateRange } from '@/contexts/DateRangeContext';
import { DateRangePreset, getPresetLabel, formatRange, validateDateRange, formatDateForInput, parseDateFromInput } from '@/lib/date';

/**
 * DateRangeBar Component - Modern, futuristic design
 *
 * Preset pills: 7 TAGE | 30 TAGE | 90 TAGE | CUSTOM
 * Custom opens glassmorphic popup with:
 * - react-day-picker calendar
 * - Quick select buttons
 * - Date range preview
 * - Smooth animations with Framer Motion
 */
export default function DateRangeBar() {
  const { dateRange, setPreset, setCustomRange } = useDateRange();
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);
  const customButtonRef = useRef<HTMLButtonElement>(null);

  const presets: DateRangePreset[] = ['7d', '30d', '90d'];

  // Initialize selected range when popup opens
  useEffect(() => {
    if (showCustomPopup) {
      setSelectedRange({
        from: dateRange.from,
        to: dateRange.to,
      });
      setError(null);
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
  };

  // Handle quick select
  const handleQuickSelect = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    setSelectedRange({ from, to });
    setError(null);
  };

  // Handle apply custom range
  const handleApplyCustom = () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      setError('Bitte beide Daten auswählen');
      return;
    }

    const validationError = validateDateRange(selectedRange.from, selectedRange.to);
    if (validationError) {
      setError(validationError);
      return;
    }

    setCustomRange(selectedRange.from, selectedRange.to);
    setShowCustomPopup(false);
    setError(null);
  };

  // Get display text for custom button
  const customDisplayText = dateRange.preset === 'custom'
    ? formatRange(dateRange.from, dateRange.to)
    : 'CUSTOM';

  // Format preview text
  const getPreviewText = () => {
    if (!selectedRange?.from || !selectedRange?.to) return null;
    return formatRange(selectedRange.from, selectedRange.to);
  };

  return (
    <div className="relative flex items-center gap-1 bg-[#0B0B0C]/60 backdrop-blur-sm rounded-lg p-1 border border-[#1F1F1F]">
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
              focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50
              ${
                isActive
                  ? 'text-black bg-[#00A3FF] shadow-lg shadow-[#00A3FF]/20'
                  : 'text-[#6B6C70] hover:text-[#EAEAEA] hover:bg-[#111214]'
              }
            `}
            style={{ transform: 'translateZ(0)' }}
            aria-pressed={isActive}
          >
            {/* Active indicator glow */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-md opacity-30 blur-md pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 163, 255, 0.6) 0%, transparent 70%)',
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
          focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50
          ${
            dateRange.preset === 'custom'
              ? 'text-black bg-[#00A3FF] shadow-lg shadow-[#00A3FF]/20'
              : 'text-[#6B6C70] hover:text-[#EAEAEA] hover:bg-[#111214]'
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
            className="absolute inset-0 rounded-md opacity-30 blur-md pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0, 163, 255, 0.6) 0%, transparent 70%)',
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
      <AnimatePresence>
        {showCustomPopup && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="dialog"
            aria-label="Benutzerdefinierten Zeitraum wählen"
            className="absolute top-full right-0 mt-2 w-auto glass-card rounded-2xl p-5 shadow-lg z-[60] border border-[#232427]"
            style={{
              background: 'linear-gradient(135deg, #0B0B0C/95 0%, #111214/95 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <h3 className="text-sm text-[#6B6C70] mb-4 font-medium">
              Benutzerdefinierten Zeitraum wählen
            </h3>

            {/* Quick Select Buttons */}
            <div className="flex gap-2 mb-4">
              {[
                { label: 'Letzte 7 Tage', days: 7 },
                { label: 'Letzte 30 Tage', days: 30 },
                { label: 'Letzte 90 Tage', days: 90 },
              ].map(({ label, days }) => (
                <button
                  key={days}
                  onClick={() => handleQuickSelect(days)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#111214] border border-[#232427] text-[#6B6C70] hover:text-[#EAEAEA] hover:border-[#00A3FF]/30 transition-all duration-200"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Calendar */}
            <div className="custom-day-picker mb-4">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                locale={de}
                disabled={{ after: new Date() }}
                modifiersClassNames={{
                  selected: 'rdp-selected',
                  today: 'rdp-today',
                }}
              />
            </div>

            {/* Preview */}
            {getPreviewText() && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-[#111214] border border-[#232427]">
                <p className="text-xs text-[#6B6C70]">Ausgewählter Zeitraum:</p>
                <p className="text-sm text-[#EAEAEA] font-medium mt-0.5">
                  {getPreviewText()}
                </p>
              </div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 mb-4"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowCustomPopup(false);
                  customButtonRef.current?.focus();
                }}
                className="px-4 py-2 text-sm font-medium text-[#6B6C70] hover:text-[#EAEAEA] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50 rounded-md"
              >
                Abbrechen
              </button>
              <button
                onClick={handleApplyCustom}
                className="px-4 py-2 bg-[#00A3FF] hover:bg-[#0BB2FF] text-black text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/50 shadow-lg shadow-[#00A3FF]/20"
              >
                Anwenden
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
