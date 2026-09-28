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
          950: '#0d0d10',
          900: '#111115',
          850: '#16161b',
          800: '#1c1c24',
          750: '#23232e',
          700: '#2c2c3b',
          600: '#3d3d52',
          500: '#52526e',
          400: '#757596',
          300: '#9898b0',
          200: '#c8c8d8',
          100: '#ededf2',
          50: '#f7f7f8',
        },
        accent: {
          DEFAULT: '#6366f1', // Indigo 500
          hover: '#818cf8',
          active: '#4338ca',
          dim: 'rgba(99, 102, 241, 0.12)',
          glow: 'rgba(99, 102, 241, 0.20)',
        },
      },
      fontFamily: {
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
