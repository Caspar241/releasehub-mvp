'use client';

import { useState, useRef, useEffect } from 'react';
import { Task, SNOOZE_OPTIONS } from '@/lib/types/dashboard';

interface TaskCardProps {
  task: Task;
  onComplete?: (id: string) => void;
  onSnooze?: (id: string, hours: number) => void;
  onDismiss?: (id: string) => void;
}

/**
 * TaskCard Component
 *
 * Individual task card with:
 * - Priority chips (kritisch, heute, diese Woche)
 * - Checkbox for completion
 * - Inline actions: Complete, Snooze, Dismiss
 * - Snooze dropdown menu
 * - Smooth animations
 */
export default function TaskCard({ task, onComplete, onSnooze, onDismiss }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed');
  const [showSnoozeMenu, setShowSnoozeMenu] = useState(false);
  const snoozeMenuRef = useRef<HTMLDivElement>(null);

  // Close snooze menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (snoozeMenuRef.current && !snoozeMenuRef.current.contains(event.target as Node)) {
        setShowSnoozeMenu(false);
      }
    };

    if (showSnoozeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSnoozeMenu]);

  // Priority chip determination
  const getPriorityChip = () => {
    if (task.priority === 'critical') {
      return {
        label: 'kritisch',
        className: 'bg-red-500/15 text-red-500 border border-red-500/30',
      };
    }

    if (task.dueDate) {
      const dueDate = typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate;
      const now = new Date();
      const diffTime = dueDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        return {
          label: 'heute',
          className: 'bg-amber-500/15 text-amber-500 border border-amber-500/30',
        };
      } else if (diffDays <= 7) {
        return {
          label: 'diese Woche',
          className: 'bg-accent/15 text-accent border border-accent/30',
        };
      }
    }

    return null;
  };

  const priorityChip = getPriorityChip();

  // Handle task completion
  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete?.(task.id);
    }, 300);
  };

  // Handle snooze
  const handleSnooze = (hours: number) => {
    setShowSnoozeMenu(false);
    onSnooze?.(task.id, hours);
  };

  return (
    <div
      className={`
        relative border border-border rounded-lg p-3
        transition-all duration-300 ease-out
        hover:border-accent/20 hover:bg-surface-overlay/5
        ${isCompleted ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}
      `}
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleComplete}
          className={`
            flex-shrink-0 w-4 h-4 mt-0.5 rounded border-2 transition-all
            ${
              isCompleted
                ? 'bg-accent border-accent'
                : 'border-border hover:border-accent'
            }
          `}
        >
          {isCompleted && (
            <svg
              className="w-full h-full text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {/* Title + Priority Chip */}
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`text-sm font-semibold text-text-primary ${isCompleted ? 'line-through' : ''}`}>
                  {task.title}
                </h4>
                {priorityChip && !isCompleted && (
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${priorityChip.className}`}>
                    {priorityChip.label}
                  </span>
                )}
              </div>

              {/* Description */}
              {task.description && (
                <p className="text-xs text-text-secondary">
                  {task.description}
                </p>
              )}

              {/* Release name if available */}
              {task.releaseName && (
                <p className="text-[10px] text-text-muted mt-1">
                  Release: {task.releaseName}
                </p>
              )}
            </div>
          </div>

          {/* Inline Actions */}
          {!isCompleted && (
            <div className="flex items-center gap-2 mt-2">
              {/* Complete Button */}
              <button
                onClick={handleComplete}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-500 hover:bg-green-500/10 rounded-md transition-all"
                title="Als erledigt markieren"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Erledigt</span>
              </button>

              {/* Snooze Button */}
              <div className="relative" ref={snoozeMenuRef}>
                <button
                  onClick={() => setShowSnoozeMenu(!showSnoozeMenu)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-text-secondary hover:text-accent hover:bg-accent/10 rounded-md transition-all"
                  title="Snooze"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Snoozen</span>
                </button>

                {/* Snooze Dropdown Menu */}
                {showSnoozeMenu && (
                  <div className="absolute left-0 top-full mt-1 w-48 glass-card rounded-lg p-1 shadow-e3 z-50">
                    {SNOOZE_OPTIONS.map((option) => (
                      <button
                        key={option.option}
                        onClick={() => handleSnooze(option.hours)}
                        className="w-full text-left px-3 py-2 text-xs text-text-primary hover:bg-surface-overlay rounded-md transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dismiss Button */}
              {onDismiss && (
                <button
                  onClick={() => onDismiss(task.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                  title="Ignorieren"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Ignorieren</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
