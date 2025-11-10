import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background - Premium gradients
        bg: {
          primary: '#0f1013', // Dark gradient start
          secondary: '#141519', // Dark gradient end
          elevated: '#101114', // Card gradient end
        },
        // Surfaces
        surface: {
          primary: '#141519', // Card gradient start
          secondary: '#101114',
          raised: '#1A1D22', // Slightly elevated
          elevated: '#1E2228', // More elevated
        },
        // Text - Slate palette for premium feel
        text: {
          primary: '#F1F5F9', // Slate-50
          secondary: '#CBD5E1', // Slate-300
          muted: '#94A3B8', // Slate-400
          tertiary: '#64748B', // Slate-500
          inverse: '#000000',
          graphite: '#E6E8EB', // Premium muted white
        },
        // Gradient colors for text highlights (updated)
        gradient: {
          cyan: '#2EB6E8', // Softer cyan
          blue: '#3CC9F0', // Lighter cyan
          'blue-deep': '#2A9FBD', // Muted cyan
        },
        // Accent - Soft cyan (no glow needed)
        accent: {
          DEFAULT: '#2EB6E8', // Main soft cyan
          hover: '#3CC9F0', // Lighter on hover
          muted: '#2A9FBD', // Darker/muted
          soft: 'rgba(46, 182, 232, 0.1)', // For backgrounds
          subtle: 'rgba(46, 182, 232, 0.05)', // Very subtle
        },
        // Border - More subtle
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          strong: 'rgba(255, 255, 255, 0.1)',
          muted: 'rgba(255, 255, 255, 0.03)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.03em' }],
        'hero-lg': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        'hero-mobile': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
        'lead': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backdropBlur: {
        'glass': '8px',       // Optimized for Safari (was 12px)
        'glass-lg': '10px',   // Optimized for Safari (was 16px)
      },
      boxShadow: {
        // Subtle shadows for premium look (no glow)
        'soft': '0 2px 12px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.35)',
        'lifted': '0 12px 40px rgba(0, 0, 0, 0.45)',
        // Subtle accent shadow for interactive elements
        'accent-soft': '0 2px 8px rgba(46, 182, 232, 0.15)',
        // Inner highlight for depth
        'inner-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        // Keep old names for backwards compatibility but with new values
        'e1': '0 2px 12px rgba(0, 0, 0, 0.15)',
        'e2': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'e3': '0 8px 32px rgba(0, 0, 0, 0.35)',
        'e4': '0 12px 40px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        'slideInRight': 'slideInRight 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'parallax-slow': 'parallaxSlow 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        parallaxSlow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      zIndex: {
        'navigation': '100',
        'dropdown': '110',
        'modal': '1000',
        'overlay': '900',
      },
    },
  },
  plugins: [],
};

export default config;
