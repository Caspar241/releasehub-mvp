'use client';

interface AnimatedBadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
  animate?: boolean;
}

export default function AnimatedBadge({
  text,
  variant = 'primary',
  className = '',
}: AnimatedBadgeProps) {
  const variantClasses = {
    primary: 'bg-accent text-text-inverse',
    secondary: 'bg-surface-raised border border-border-strong text-text-primary',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  };

  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-caption font-semibold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {text}
    </span>
  );
}
