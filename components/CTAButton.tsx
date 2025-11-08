'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { glowHover } from '@/lib/animations';

interface CTAButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function CTAButton({
  text,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.98]';

  const variantClasses = {
    primary: 'bg-accent text-text-inverse hover:bg-accent-hover hover:shadow-glow-strong',
    secondary: 'bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-text-inverse hover:border-accent-hover',
    ghost: 'bg-transparent text-text-primary border border-border-strong hover:border-accent hover:text-accent',
  };

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-body-sm',
    md: 'px-8 py-4 text-body',
    lg: 'px-10 py-5 text-body-lg',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={glowHover}
      >
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClasses}
      initial="rest"
      whileHover="hover"
      variants={glowHover}
    >
      {content}
    </motion.button>
  );
}
