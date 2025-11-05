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
        // Primary (für CTAs, Links, Highlights)
        primary: {
          DEFAULT: '#0A0A0A',
          hover: '#1A1A1A',
        },
        // Accent (für Provokation, Badges, Highlights)
        accent: {
          DEFAULT: '#FF3B30',
          hover: '#FF6B5E',
        },
        // Background
        bg: {
          primary: '#FFFFFF',
          secondary: '#F5F5F7',
          dark: '#000000',
        },
        // Text
        text: {
          primary: '#1D1D1F',
          secondary: '#6E6E73',
          inverse: '#FFFFFF',
        },
        // Borders
        border: {
          light: '#D2D2D7',
          dark: '#424245',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Hero Headline
        'hero-desktop': ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '700' }],
        // Section Headlines
        'section-desktop': ['48px', { lineHeight: '56px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'section-mobile': ['28px', { lineHeight: '36px', letterSpacing: '-0.015em', fontWeight: '700' }],
        // Feature Headlines
        'feature-desktop': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'feature-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Body
        'body-lg': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '28px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '24px', fontWeight: '400' }],
      },
      spacing: {
        // Section Padding
        'section-desktop': '120px',
        'section-mobile': '80px',
        'section-x-desktop': '80px',
        'section-x-mobile': '24px',
      },
      borderRadius: {
        'card': '16px',
        'pricing': '20px',
        'button': '12px',
        'badge': '20px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08)',
        'pricing': '0 12px 32px rgba(255,59,48,0.12)',
        'button': '0 8px 20px rgba(0,0,0,0.15)',
      },
      maxWidth: {
        'container': '1200px',
        'hero': '800px',
      },
    },
  },
  plugins: [],
};

export default config;
