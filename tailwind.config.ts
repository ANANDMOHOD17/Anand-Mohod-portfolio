import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0A0A0F', // Primary Background
          900: '#111116', // Cards / Primary Surface
          850: '#16161D', // Elevated Surface
          800: '#1A1A24',
          750: '#27272F', // Default Border
          700: '#3F3F52', // Border Hover
          600: '#4F4F6A',
          500: '#64748B', // Very Muted
          400: '#94A3B8', // Muted
          300: '#CBD5E1', // Secondary Text
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',  // Primary Text
        },
        accent: {
          DEFAULT: '#6366F1', // Primary Accent (Indigo 500)
          hover: '#818CF8',   // Secondary Accent (Indigo 400)
          active: '#4F46E5',  // Deep Accent (Indigo 600)
          dim: 'rgba(99, 102, 241, 0.12)',
          glow: 'rgba(99, 102, 241, 0.20)',
        },
      },
      fontFamily: {
        grotesk: [
          'var(--font-grotesk)',
          'Space Grotesk',
          'Inter Tight',
          'Inter',
          '-apple-system',
          'sans-serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'monospace',
        ],
      },
      boxShadow: {
        'glass-sm': '0 4px 16px -2px rgba(0, 0, 0, 0.45)',
        'glass-md': '0 8px 30px -4px rgba(0, 0, 0, 0.65)',
        'glass-lg': '0 20px 45px -8px rgba(0, 0, 0, 0.8)',
        'glass-light-sm': '0 2px 10px rgba(0, 0, 0, 0.06)',
        'glass-light-md': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'accent-glow': '0 0 25px -4px rgba(99, 102, 241, 0.20)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
