/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgba(255, 255, 255, 0.1)',
        neon: {
          cyan: '#00f6ff',
          purple: '#a855f7',
          green: '#00ff88',
          pink: '#ff0080',
        },
        dark: {
          900: '#0a0a0f',
          800: '#121218',
          700: '#1a1a24',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 246, 255, 0.5), 0 0 10px rgba(0, 246, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 246, 255, 0.8), 0 0 30px rgba(0, 246, 255, 0.5)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
