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
          tertiary: '#0F1115',
        },
        // Surface
        surface: {
          base: '#0F1115',
          raised: '#141821',
          overlay: '#1A1D27',
        },
        // Text
        text: {
          primary: '#FFFFFF',
          secondary: '#B5BDC9',
          muted: '#7A8594',
          inverse: '#0A0A0A',
        },
        // Accent
        accent: {
          DEFAULT: '#4FD1FF',
          hover: '#7CD4FF',
          subtle: 'rgba(79, 209, 255, 0.12)',
        },
        // Border
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
        },
        // Overlay
        overlay: {
          dark: 'rgba(0, 0, 0, 0.6)',
          glass: 'rgba(15, 17, 21, 0.85)',
        },
        // State
        state: {
          success: '#34C759',
          warning: '#FF9F0A',
          error: '#FF3B30',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Hero Headline
        'hero-xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.025em', fontWeight: '700' }],
        'hero-lg': ['56px', { lineHeight: '64px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-md': ['40px', { lineHeight: '48px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'hero-desktop': ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '700' }],
        // Section Headlines
        'section-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-lg': ['36px', { lineHeight: '44px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'section-md': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-desktop': ['48px', { lineHeight: '56px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'section-mobile': ['28px', { lineHeight: '36px', letterSpacing: '-0.015em', fontWeight: '700' }],
        // Feature Headlines
        'feature-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'feature-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.005em', fontWeight: '600' }],
        'feature-desktop': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'feature-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Body
        'title': ['20px', { lineHeight: '28px', letterSpacing: '-0.005em', fontWeight: '600' }],
        'lead': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '28px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '18px', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      spacing: {
        // Custom Spacing
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
        // Section Padding
        'section-desktop': '120px',
        'section-mobile': '80px',
        'section-x-desktop': '80px',
        'section-x-mobile': '24px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        'card': '16px',
        'pricing': '20px',
        'button': '12px',
        'badge': '20px',
        'full': '9999px',
      },
      boxShadow: {
        '0': 'none',
        '1': '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
        '2': '0 4px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)',
        '3': '0 10px 30px rgba(0,0,0,0.65), 0 4px 8px rgba(0,0,0,0.45)',
        '4': '0 20px 60px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(79, 209, 255, 0.15)',
        'glow-strong': '0 0 40px rgba(79, 209, 255, 0.25)',
        'card': '0 2px 8px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08)',
        'pricing': '0 12px 32px rgba(79, 209, 255, 0.12)',
        'button': '0 8px 20px rgba(0,0,0,0.15)',
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1200px',
        'container-2xl': '1400px',
        'container': '1200px',
        'hero': '800px',
      },
      backdropBlur: {
        'glass': '12px',
        'glass-light': '8px',
        'glass-heavy': '16px',
      },
      zIndex: {
        'dropdown': '10',
        'sticky': '20',
        'navigation': '30',
        'drawer': '40',
        'modal': '50',
        'popover': '60',
        'toast': '70',
      },
    },
  },
  plugins: [],
};

export default config;
