'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';
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
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [mounted, setMounted] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Calculate position based on trigger button
  useEffect(() => {
    setMounted(true);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8, // 8px gap below button
        right: window.innerWidth - rect.right, // Align to right edge of button
      });
    }
  }, [triggerRef]);

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

  // Don't render until mounted (client-side only for portal)
  if (!mounted) return null;

  const popoverContent = (
    <div
      ref={popoverRef}
      className="fixed w-[320px] bg-[#0B0B0C]/90 backdrop-blur-md border border-[#1C1D20] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] p-3 text-[12px] leading-[1.3]"
      style={{
        top: position.top,
        right: position.right,
        zIndex: 9999,
        background: 'linear-gradient(135deg, rgba(11, 11, 12, 0.92) 0%, rgba(17, 18, 20, 0.88) 100%)',
      }}
      role="dialog"
      aria-label="Benutzerdefinierten Zeitraum wählen"
    >
      {/* Quick Shortcuts - Compact */}
      <div className="mb-2">
        <div className="flex gap-1.5">
          <button
            onClick={() => handleShortcut(0)}
            className="flex-1 px-2 py-1 text-[11px] font-medium rounded-lg bg-transparent border border-[#1F1F1F] text-gray-300 hover:text-gray-100 hover:border-[#2A2A2A] transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF] active:scale-98"
            style={{ transform: 'translateZ(0)' }}
          >
            Heute
          </button>
          <button
            onClick={() => handleShortcut(6)}
            className="flex-1 px-2 py-1 text-[11px] font-medium rounded-lg bg-transparent border border-[#1F1F1F] text-gray-300 hover:text-gray-100 hover:border-[#2A2A2A] transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF] active:scale-98"
            style={{ transform: 'translateZ(0)' }}
          >
            Letzte 7 Tage
          </button>
          <button
            onClick={() => handleShortcut(29)}
            className="flex-1 px-2 py-1 text-[11px] font-medium rounded-lg bg-transparent border border-[#1F1F1F] text-gray-300 hover:text-gray-100 hover:border-[#2A2A2A] transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF] active:scale-98"
            style={{ transform: 'translateZ(0)' }}
          >
            Letzte 30 Tage
          </button>
        </div>
      </div>

      {/* Calendar (1 month - compact) */}
      <div className="mb-2">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleCalendarSelect}
          locale={de}
          numberOfMonths={1}
          weekStartsOn={1}
          showOutsideDays={false}
          disabled={{ after: new Date() }}
          className="rdp-compact"
          modifiersClassNames={{
            selected: 'rdp-selected',
            today: 'rdp-today',
          }}
        />
      </div>

      {/* Von/Bis Inputs - Compact */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <label htmlFor="from-date" className="block text-[10px] font-medium text-gray-400 mb-1">
            Von
          </label>
          <input
            id="from-date"
            type="date"
            value={fromInput}
            onChange={(e) => handleFromChange(e.target.value)}
            className="w-full bg-transparent border border-[#1F1F1F] rounded-lg px-2 py-1 text-[11px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] transition-all duration-150"
            aria-label="Von Datum"
            max={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
        <div>
          <label htmlFor="to-date" className="block text-[10px] font-medium text-gray-400 mb-1">
            Bis
          </label>
          <input
            id="to-date"
            type="date"
            value={toInput}
            onChange={(e) => handleToChange(e.target.value)}
            className="w-full bg-transparent border border-[#1F1F1F] rounded-lg px-2 py-1 text-[11px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] transition-all duration-150"
            aria-label="Bis Datum"
            max={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
      </div>

      {/* Preview - Compact */}
      {getPreview() && (
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-transparent border border-[#1F1F1F]">
          <p className="text-[10px] text-gray-400 mb-0.5">Ausgewählter Zeitraum</p>
          <p className="text-[12px] text-gray-200 font-medium">{getPreview()}</p>
        </div>
      )}

      {/* Error Message - Compact */}
      {error && (
        <div
          role="alert"
          className="mb-2 px-2 py-1.5 text-[11px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          {error}
        </div>
      )}

      {/* Actions - Compact */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-[12px] font-medium text-gray-400 hover:text-gray-200 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF] rounded-lg active:scale-98"
          style={{ transform: 'translateZ(0)' }}
        >
          Abbrechen
        </button>
        <button
          onClick={handleApply}
          disabled={!canApply}
          className={`
            px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all duration-150
            focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A3FF]
            active:scale-98
            ${
              canApply
                ? 'bg-[#00A3FF] text-black hover:bg-[#0BB2FF] shadow-[0_2px_8px_rgba(0,163,255,0.25)]'
                : 'bg-transparent text-gray-500 cursor-not-allowed border border-[#1F1F1F]'
            }
          `}
          style={{ transform: 'translateZ(0)' }}
        >
          Anwenden
        </button>
      </div>
    </div>
  );

  // Render popover at document body level using Portal
  return createPortal(popoverContent, document.body);
}
