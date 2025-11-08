/**
 * Shared Design Tokens for ReleaseHub
 *
 * Used by both Main Site and Dashboard for visual consistency
 */

export const designTokens = {
  // Spacing
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Typography
  typography: {
    // Font Sizes
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },
    // Font Weights
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    // Line Heights
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',    // 6px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.5rem',   // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    e1: '0 2px 8px rgba(0, 0, 0, 0.4)',
    e2: '0 4px 12px rgba(0, 0, 0, 0.5)',
    e3: '0 8px 24px rgba(0, 0, 0, 0.6)',
    e4: '0 16px 48px rgba(0, 0, 0, 0.7)',
    glow: '0 0 20px rgba(79, 209, 255, 0.3)',
    glowStrong: '0 0 40px rgba(79, 209, 255, 0.5)',
  },

  // Transitions
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Apple easing
  },

  // Gradient Orbs (Background Effects)
  gradientOrbs: {
    cyan: {
      from: 'rgba(79, 209, 255, 0.15)',
      middle: 'rgba(79, 209, 255, 0.05)',
      blur: '60px',
    },
    accent: {
      from: 'rgba(124, 212, 255, 0.12)',
      middle: 'rgba(79, 209, 255, 0.04)',
      blur: '80px',
    },
    purple: {
      from: 'rgba(147, 51, 234, 0.1)',
      middle: 'rgba(147, 51, 234, 0.03)',
      blur: '70px',
    },
    blue: {
      from: 'rgba(59, 130, 246, 0.12)',
      middle: 'rgba(59, 130, 246, 0.04)',
      blur: '80px',
    },
    pink: {
      from: 'rgba(236, 72, 153, 0.08)',
      middle: 'rgba(236, 72, 153, 0.02)',
      blur: '90px',
    },
  },

  // Glass Morphism
  glass: {
    background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.95) 0%, rgba(15, 17, 21, 0.9) 100%)',
    border: 'rgba(255, 255, 255, 0.08)',
    insetHighlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
    backdropBlur: '16px',
  },

  // Button Variants
  buttons: {
    primary: {
      background: 'var(--accent)',
      hover: 'var(--accent-hover)',
      text: 'var(--text-inverse)',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.95) 0%, rgba(15, 17, 21, 0.9) 100%)',
      border: 'var(--border)',
      borderHover: 'var(--border-strong)',
      text: 'var(--text-primary)',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
    },
    ghost: {
      border: 'var(--border)',
      borderHover: 'var(--border-strong)',
      backgroundHover: 'var(--surface-raised)',
      text: 'var(--text-primary)',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
    },
  },

  // Card Variants
  cards: {
    standard: {
      padding: '1.5rem',
      paddingLg: '2rem',
      borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.95) 0%, rgba(15, 17, 21, 0.9) 100%)',
      border: 'var(--border)',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
