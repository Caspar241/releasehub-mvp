'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'task';
  title: string;
  description: string;
  dueDate?: string;
  ctaText?: string;
  ctaHref?: string;
  dismissible: boolean;
  completed?: boolean;
}

// Mock data - später durch echte API-Daten ersetzen
const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Cover fehlt für Release "Midnight Dreams"',
    description: 'Upload läuft in 3 Tagen ab',
    dueDate: '3 days',
    ctaText: 'Jetzt hochladen',
    ctaHref: '/dashboard/upload',
    dismissible: false,
    completed: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Master-Datei Upload ausstehend',
    description: 'Release gefährdet – Upload bis morgen erforderlich',
    dueDate: '1 day',
    ctaText: 'Upload abschließen',
    ctaHref: '/dashboard/upload',
    dismissible: false,
    completed: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Pre-Save Kampagne startet heute',
    description: '"Summer Vibes" Pre-Save geht um 12:00 Uhr live',
    ctaText: 'Kampagne ansehen',
    ctaHref: '/dashboard/scale/campaigns',
    dismissible: true,
    completed: false,
  },
  {
    id: '4',
    type: 'task',
    title: 'Playlist Pitch vorbereiten',
    description: 'Für "Ocean Waves" – Deadline in 5 Tagen',
    dueDate: '5 days',
    ctaText: 'Pitch erstellen',
    ctaHref: '/dashboard/scale/playlists',
    dismissible: true,
    completed: false,
  },
];

export default function AlertsSection() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [isExpanded, setIsExpanded] = useState(true);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    const alert = alerts.find(a => a.id === id);
    if (!alert) return;

    if (!alert.completed) {
      // Mark as completed first for animation
      setAlerts(
        alerts.map((a) =>
          a.id === id ? { ...a, completed: true } : a
        )
      );

      // Remove from list after animation
      setTimeout(() => {
        setAlerts(alerts.filter((a) => a.id !== id));
      }, 300);
    }
  };

  const getAlertStyle = (type: Alert['type']) => {
    const styles = {
      critical: {
        border: 'border-red-500/30',
        bg: 'bg-red-500/5',
        indicator: 'bg-red-500',
        badge: 'bg-red-500 text-white',
      },
      warning: {
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/5',
        indicator: 'bg-amber-500',
        badge: 'bg-amber-500 text-white',
      },
      info: {
        border: 'border-accent/30',
        bg: 'bg-accent/5',
        indicator: 'bg-accent',
        badge: 'bg-accent text-white',
      },
      task: {
        border: 'border-border',
        bg: 'bg-surface-overlay/20',
        indicator: 'bg-surface-overlay',
        badge: 'bg-surface-overlay text-text-primary',
      },
    };
    return styles[type];
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
            Tasks
          </h3>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-accent/10 text-accent">
            {alerts.length}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="space-y-2 p-4 pt-0">
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            return (
              <div
                key={alert.id}
                className={`border ${style.border} ${style.bg} rounded-lg p-3 ${
                  alert.completed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                } transition-all duration-300 ease-out hover:border-accent/20`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox for all tasks */}
                  <button
                    onClick={() => toggleTaskComplete(alert.id)}
                    className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border-2 transition-all ${
                      alert.completed
                        ? 'bg-accent border-accent'
                        : 'border-border hover:border-accent'
                    }`}
                  >
                    {alert.completed && (
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
                  {/* Color indicator bar */}
                  <div
                    className={`flex-shrink-0 w-1 h-full rounded-full ${style.indicator} mt-0.5`}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4
                          className={`text-sm font-semibold text-text-primary ${
                            alert.completed ? 'line-through' : ''
                          }`}
                        >
                          {alert.title}
                        </h4>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {alert.description}
                        </p>
                      </div>

                      {/* Due Date Badge */}
                      {alert.dueDate && !alert.completed && (
                        <span
                          className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full ${style.badge}`}
                        >
                          {alert.dueDate}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {!alert.completed && (
                      <div className="flex items-center gap-2 mt-2">
                        {alert.ctaText && alert.ctaHref && (
                          <Link
                            href={alert.ctaHref}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-150"
                          >
                            {alert.ctaText}
                          </Link>
                        )}
                        {alert.dismissible && (
                          <button
                            onClick={() => dismissAlert(alert.id)}
                            className="px-2 py-1 text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
                          >
                            Ignorieren
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Dismiss Button */}
                  {alert.dismissible && (
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="flex-shrink-0 p-1 text-text-muted hover:text-text-primary hover:bg-surface-overlay rounded transition-all"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
