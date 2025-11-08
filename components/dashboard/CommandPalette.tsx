'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { commandPaletteActions, type CommandAction } from '@/config/dashboard-navigation';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Filter actions based on search
  const filteredActions = commandPaletteActions.filter((action) => {
    const searchLower = search.toLowerCase();
    return (
      action.label.toLowerCase().includes(searchLower) ||
      action.description?.toLowerCase().includes(searchLower) ||
      action.keywords.some((keyword) => keyword.toLowerCase().includes(searchLower))
    );
  });

  // Group actions by section
  const groupedActions = filteredActions.reduce((acc, action) => {
    if (!acc[action.section]) {
      acc[action.section] = [];
    }
    acc[action.section].push(action);
    return acc;
  }, {} as Record<string, CommandAction[]>);

  // Handle action execution
  const executeAction = useCallback(
    (action: CommandAction) => {
      if (typeof action.action === 'string') {
        // Navigate to URL
        router.push(action.action);
      } else {
        // Execute function
        action.action();
      }
      onClose();
      setSearch('');
    },
    [router, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredActions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredActions[selectedIndex]) {
            executeAction(filteredActions[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          setSearch('');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions, executeAction, onClose]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-2xl bg-surface-raised/98 backdrop-blur-glass border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-border">
          <svg
            className="w-5 h-5 text-text-muted mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for actions, pages, or settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none text-lg"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-text-muted bg-surface-overlay rounded border border-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {Object.keys(groupedActions).length === 0 ? (
            <div className="px-4 py-12 text-center text-text-muted">
              No results found for "{search}"
            </div>
          ) : (
            Object.entries(groupedActions).map(([section, actions]) => {
              let currentIndex = 0;
              filteredActions.forEach((action, idx) => {
                if (action === actions[0]) {
                  currentIndex = idx;
                }
              });

              return (
                <div key={section} className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {section}
                  </div>
                  {actions.map((action, idx) => {
                    const globalIndex = filteredActions.indexOf(action);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={action.id}
                        onClick={() => executeAction(action)}
                        className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                          isSelected
                            ? 'bg-accent-subtle text-accent'
                            : 'text-text-primary hover:bg-surface-overlay'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          {action.icon && (
                            <span className="text-xl">{action.icon}</span>
                          )}
                          <div>
                            <div className="font-medium">{action.label}</div>
                            {action.description && (
                              <div className="text-sm text-text-muted mt-0.5">
                                {action.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {action.shortcut && (
                          <kbd className="px-2 py-1 text-xs font-mono text-text-muted bg-surface-overlay rounded border border-border">
                            {action.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border bg-surface-overlay/50 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono bg-surface-raised rounded border border-border">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono bg-surface-raised rounded border border-border">
                ↵
              </kbd>
              <span>Select</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 font-mono bg-surface-raised rounded border border-border">
              ESC
            </kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
