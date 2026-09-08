import type { Config } from 'tailwindcss';

const config: Config = {
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
          950: '#060608',
          900: '#0a0a0e',
          850: '#0f0f15',
          800: '#14141c',
          750: '#1a1a25',
          700: '#222230',
          600: '#323246',
          500: '#484860',
          400: '#71718f',
          300: '#a2a2bd',
          200: '#d0d0e0',
          100: '#f0f0f5',
        },
        accent: {
          DEFAULT: '#38bdf8', // Electric Sky / Cyan
          hover: '#0ea5e9',
          active: '#0284c7',
          dim: 'rgba(56, 189, 248, 0.12)',
          glow: 'rgba(56, 189, 248, 0.25)',
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
        'accent-glow': '0 0 25px -4px rgba(56, 189, 248, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
