'use client';

import Link from 'next/link';
import { quickActions, type QuickAction } from '@/config/dashboard-navigation';

interface QuickActionsProps {
  className?: string;
}

export default function QuickActions({ className = '' }: QuickActionsProps) {
  const getVariantClasses = (variant: QuickAction['variant'] = 'secondary') => {
    const variants = {
      primary: 'bg-accent text-text-inverse hover:bg-accent-hover hover:shadow-glow',
      secondary: 'bg-surface-raised text-text-primary hover:bg-surface-overlay border border-border',
      ghost: 'bg-transparent text-text-secondary hover:bg-surface-overlay hover:text-accent',
    };
    return variants[variant];
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {quickActions.map((action) => (
        <Link
          key={action.id}
          href={action.href || '#'}
          className={`
            group relative flex items-center gap-2 px-4 py-2.5 rounded-lg
            font-medium text-sm transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
            ${getVariantClasses(action.variant)}
          `}
          title={action.shortcut ? `Shortcut: ${action.shortcut}` : undefined}
        >
          <span className="text-base">{action.icon}</span>
          <span>{action.label}</span>

          {action.shortcut && (
            <span className="ml-2 px-1.5 py-0.5 text-xs font-mono rounded bg-black/10 dark:bg-white/10 opacity-60 group-hover:opacity-100 transition-opacity">
              {action.shortcut}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
