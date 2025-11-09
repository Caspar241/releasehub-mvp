'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { motion } from 'framer-motion';
import { DayPicker, DateRange } from 'react-day-picker';
import { de } from 'date-fns/locale';
import { format, isValid, parse } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useKeyMetrics, quickShortcuts, getShortcutRange, getThisMonth, getLastMonth } from '@/contexts/KeyMetricsContext';

interface KeyMetricsCustomPopoverProps {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement>;
}

/**
 * KeyMetricsCustomPopover - Apple-like Date Range Picker
 *
 * Features:
 * - 2-month calendar view with range selection
 * - Quick shortcuts (Heute, Gestern, Letzte 7/30/90 Tage, etc.)
 * - Von/Bis inputs (type=date) for manual entry
 * - Live preview of selected range
 * - Validation with error messages
 * - Glassmorphic design with gradient border
 * - Smooth animations (140ms fade+scale)
 * - Full keyboard support + ARIA
 */
export default function KeyMetricsCustomPopover({ onClose, triggerRef }: KeyMetricsCustomPopoverProps) {
  const { range, setCustomRange } = useKeyMetrics();
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Initialize from current range
  useEffect(() => {
    if (range.from && range.to) {
      setSelectedRange({ from: range.from, to: range.to });
      setFromInput(format(range.from, 'yyyy-MM-dd'));
      setToInput(format(range.to, 'yyyy-MM-dd'));
    }
  }, [range]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle quick shortcut
  const handleShortcut = (days: number) => {
    const { from, to } = getShortcutRange(days);
    setSelectedRange({ from, to });
    setFromInput(format(from, 'yyyy-MM-dd'));
    setToInput(format(to, 'yyyy-MM-dd'));
    setError(null);
  };

  // Handle this/last month
  const handleThisMonth = () => {
    const { from, to } = getThisMonth();
    setSelectedRange({ from, to });
    setFromInput(format(from, 'yyyy-MM-dd'));
    setToInput(format(to, 'yyyy-MM-dd'));
    setError(null);
  };

  const handleLastMonth = () => {
    const { from, to } = getLastMonth();
    setSelectedRange({ from, to });
    setFromInput(format(from, 'yyyy-MM-dd'));
    setToInput(format(to, 'yyyy-MM-dd'));
    setError(null);
  };

  // Handle calendar selection
  const handleCalendarSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromInput(format(range.from, 'yyyy-MM-dd'));
    }
    if (range?.to) {
      setToInput(format(range.to, 'yyyy-MM-dd'));
    }
    setError(null);
  };

  // Handle input changes
  const handleFromChange = (value: string) => {
    setFromInput(value);
    const date = parse(value, 'yyyy-MM-dd', new Date());
    if (isValid(date)) {
      setSelectedRange((prev) => ({
        from: date,
        to: prev?.to,
      }));
      setError(null);
    }
  };

  const handleToChange = (value: string) => {
    setToInput(value);
    const date = parse(value, 'yyyy-MM-dd', new Date());
    if (isValid(date)) {
      setSelectedRange((prev) => ({
        from: prev?.from,
        to: date,
      }));
      setError(null);
    }
  };

  // Validate and apply
  const handleApply = () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      setError('Bitte beide Daten auswählen');
      return;
    }

    if (selectedRange.from > selectedRange.to) {
      setError('„Von" muss vor „Bis" liegen');
      return;
    }

    if (selectedRange.to > new Date()) {
      setError('Zeitraum darf nicht in der Zukunft liegen');
      return;
    }

    setCustomRange(selectedRange.from, selectedRange.to);
    onClose();

    // ARIA live announcement
    const announcement = `Zeitraum aktualisiert: ${format(selectedRange.from, 'dd.MM.yyyy')} bis ${format(selectedRange.to, 'dd.MM.yyyy')}`;
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    document.body.appendChild(liveRegion);
    setTimeout(() => document.body.removeChild(liveRegion), 1000);
  };

  // Get preview text
  const getPreview = () => {
    if (!selectedRange?.from || !selectedRange?.to) return null;
    return `${format(selectedRange.from, 'dd.MM.')} – ${format(selectedRange.to, 'dd.MM.')}`;
  };

  const canApply = selectedRange?.from && selectedRange?.to && selectedRange.from <= selectedRange.to;

  return (
    <motion.div
      ref={popoverRef}
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }} // Apple easing curve
      className="absolute top-full right-0 mt-2 w-auto bg-[#0B0B0C]/85 backdrop-blur-md border border-[#1C1D20] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,.45)] p-4 z-[9999]"
      style={{
        background: 'linear-gradient(135deg, rgba(11, 11, 12, 0.9) 0%, rgba(17, 18, 20, 0.85) 100%)',
      }}
      role="dialog"
      aria-label="Benutzerdefinierten Zeitraum wählen"
    >
      {/* Quick Shortcuts */}
      <div className="mb-4">
        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Schnellwahl</h3>
        <div className="flex flex-wrap gap-2">
          {quickShortcuts.map(({ label, days }) => (
            <button
              key={label}
              onClick={() => handleShortcut(days)}
              className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-[#111214] border border-[#232427] text-gray-300 hover:text-gray-100 hover:border-[#00A3FF]/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] active:scale-98"
              style={{ transform: 'translateZ(0)' }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleThisMonth}
            className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-[#111214] border border-[#232427] text-gray-300 hover:text-gray-100 hover:border-[#00A3FF]/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] active:scale-98"
            style={{ transform: 'translateZ(0)' }}
          >
            Dieser Monat
          </button>
          <button
            onClick={handleLastMonth}
            className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-[#111214] border border-[#232427] text-gray-300 hover:text-gray-100 hover:border-[#00A3FF]/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] active:scale-98"
            style={{ transform: 'translateZ(0)' }}
          >
            Letzter Monat
          </button>
        </div>
      </div>

      {/* Calendar (2 months) */}
      <div className="custom-day-picker mb-4">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleCalendarSelect}
          locale={de}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
          modifiersClassNames={{
            selected: 'rdp-selected',
            today: 'rdp-today',
          }}
        />
      </div>

      {/* Von/Bis Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label htmlFor="from-date" className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
            Von
          </label>
          <input
            id="from-date"
            type="date"
            value={fromInput}
            onChange={(e) => handleFromChange(e.target.value)}
            className="w-full bg-[#111214] border border-[#232427] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] transition-all duration-150"
            aria-label="Von Datum"
            max={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
        <div>
          <label htmlFor="to-date" className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
            Bis
          </label>
          <input
            id="to-date"
            type="date"
            value={toInput}
            onChange={(e) => handleToChange(e.target.value)}
            className="w-full bg-[#111214] border border-[#232427] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] transition-all duration-150"
            aria-label="Bis Datum"
            max={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
      </div>

      {/* Preview */}
      {getPreview() && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-[#111214] border border-[#232427]">
          <p className="text-[11px] text-gray-400 mb-0.5">Ausgewählter Zeitraum</p>
          <p className="text-sm text-gray-200 font-medium">{getPreview()}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          role="alert"
          className="mb-4 px-3 py-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] rounded-lg active:scale-98"
          style={{ transform: 'translateZ(0)' }}
        >
          Abbrechen
        </button>
        <button
          onClick={handleApply}
          disabled={!canApply}
          className={`
            px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]
            active:scale-98
            ${
              canApply
                ? 'bg-[#00A3FF] text-black hover:bg-[#0BB2FF] shadow-[0_2px_8px_rgba(0,163,255,0.25)]'
                : 'bg-[#1a1a1c] text-gray-500 cursor-not-allowed'
            }
          `}
          style={{ transform: 'translateZ(0)' }}
        >
          Anwenden
        </button>
      </div>
    </motion.div>
  );
}
