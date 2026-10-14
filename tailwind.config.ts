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
        // Semantic Design Tokens mapped to CSS variables
        bg: {
          DEFAULT: 'var(--bg)',
          elevated: 'var(--bg-elevated)',
          subtle: 'var(--bg-subtle)',
        },
        surface: {
          DEFAULT: 'var(--bg-elevated)',
          subtle: 'var(--bg-subtle)',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          2: 'var(--accent-2)',
          soft: 'var(--accent-soft)',
          contrast: 'var(--accent-contrast)',
          hover: 'var(--accent-2)',
          active: 'var(--accent)',
          dim: 'var(--accent-soft)',
          glow: 'var(--glow)',
        },
        success: 'var(--success)',
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
          'var(--font-inter)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'JetBrains Mono',
          'Fira Code',
          'monospace',
        ],
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'glow': 'var(--glow)',
        'glass-sm': 'var(--shadow-sm)',
        'glass-md': 'var(--shadow-md)',
        'glass-lg': 'var(--shadow-md)',
        'glass-light-sm': 'var(--shadow-sm)',
        'glass-light-md': 'var(--shadow-md)',
        'accent-glow': 'var(--glow)',
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
