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
        // Background
        bg: {
          primary: '#000000',
          secondary: '#0A0A0A',
          elevated: '#0F1115',
        },
        // Surfaces
        surface: {
          primary: '#0F1115',
          secondary: '#111317',
          raised: '#141821',
          elevated: '#1A1E28',
        },
        // Text
        text: {
          primary: '#FFFFFF',
          secondary: '#B5BDC9',
          muted: '#7A8594',
          inverse: '#000000',
        },
        // Accent
        accent: {
          DEFAULT: '#4FD1FF',
          hover: '#7CD4FF',
          muted: '#37C8ED',
        },
        // Border
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
          muted: 'rgba(255, 255, 255, 0.04)',
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
        'glass': '12px',
        'glass-lg': '16px',
      },
      boxShadow: {
        'e1': '0 2px 8px rgba(0, 0, 0, 0.45)',
        'e2': '0 4px 16px rgba(0, 0, 0, 0.55)',
        'e3': '0 10px 30px rgba(0, 0, 0, 0.65)',
        'e4': '0 20px 50px rgba(0, 0, 0, 0.75)',
        'glow': '0 0 20px rgba(79, 209, 255, 0.15)',
        'glow-strong': '0 0 40px rgba(79, 209, 255, 0.3)',
        'inner-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
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
