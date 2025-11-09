'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyMetrics } from '@/contexts/KeyMetricsContext';
import KeyMetricsCustomPopover from './KeyMetricsCustomPopover';

/**
 * KeyMetricsControls - Apple-like Segmented Control
 *
 * Features:
 * - Segmented buttons: 7 TAGE · 30 TAGE · 90 TAGE · CUSTOM
 * - Active state with inner glow and blue background
 * - Smooth transitions (150ms)
 * - Custom opens popover on click
 * - Full keyboard support
 * - ARIA labels for accessibility
 */
export default function KeyMetricsControls() {
  const { range, setPreset } = useKeyMetrics();
  const [showCustomPopover, setShowCustomPopover] = useState(false);
  const customButtonRef = useRef<HTMLButtonElement>(null);

  const presets: Array<{ value: '7d' | '30d' | '90d'; label: string }> = [
    { value: '7d', label: '7 TAGE' },
    { value: '30d', label: '30 TAGE' },
    { value: '90d', label: '90 TAGE' },
  ];

  const handlePresetClick = (preset: '7d' | '30d' | '90d') => {
    setPreset(preset);
    setShowCustomPopover(false);
  };

  const handleCustomClick = () => {
    setShowCustomPopover(!showCustomPopover);
  };

  return (
    <div className="relative">
      {/* Segmented Control */}
      <div
        className="inline-flex items-center gap-0.5 bg-[#0B0B0C]/60 backdrop-blur-sm rounded-xl p-1 border border-[#1C1D20]"
        role="group"
        aria-label="Zeitraum-Auswahl"
      >
        {/* Preset Buttons */}
        {presets.map(({ value, label }) => {
          const isActive = range.preset === value;

          return (
            <button
              key={value}
              onClick={() => handlePresetClick(value)}
              className={`
                relative px-4 py-2 text-[11px] font-semibold tracking-wide rounded-lg
                transition-all duration-150 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C]
                ${
                  isActive
                    ? 'bg-[#00A3FF] text-black shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]'
                    : 'text-gray-300 hover:text-gray-100 hover:bg-[#1a1a1c]'
                }
              `}
              style={{
                transform: 'translateZ(0)',
              }}
              aria-pressed={isActive}
              aria-label={`${label} Zeitraum`}
            >
              {/* Active inner glow */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.4), transparent 60%)',
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Label */}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}

        {/* Custom Button */}
        <button
          ref={customButtonRef}
          onClick={handleCustomClick}
          className={`
            relative px-4 py-2 text-[11px] font-semibold tracking-wide rounded-lg
            transition-all duration-150 ease-out
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C]
            ${
              range.preset === 'custom'
                ? 'bg-[#00A3FF] text-black shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]'
                : 'text-gray-300 hover:text-gray-100 hover:bg-[#1a1a1c]'
            }
          `}
          style={{
            transform: 'translateZ(0)',
          }}
          aria-pressed={range.preset === 'custom'}
          aria-haspopup="dialog"
          aria-expanded={showCustomPopover}
          aria-label="Benutzerdefinierter Zeitraum"
        >
          {/* Active inner glow */}
          {range.preset === 'custom' && (
            <div
              className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.4), transparent 60%)',
              }}
              aria-hidden="true"
            />
          )}

          {/* Label */}
          <span className="relative z-10">
            {range.preset === 'custom' && range.from && range.to
              ? `${range.from.getDate()}.${range.from.getMonth() + 1}. – ${range.to.getDate()}.${range.to.getMonth() + 1}.`
              : 'CUSTOM'}
          </span>
        </button>
      </div>

      {/* Custom Popover */}
      <AnimatePresence>
        {showCustomPopover && (
          <KeyMetricsCustomPopover
            onClose={() => {
              setShowCustomPopover(false);
              customButtonRef.current?.focus();
            }}
            triggerRef={customButtonRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
