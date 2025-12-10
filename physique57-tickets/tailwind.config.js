/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          white: 'rgba(255, 255, 255, 0.9)',
          light: 'rgba(255, 255, 255, 0.7)',
          medium: 'rgba(255, 255, 255, 0.5)',
          dark: 'rgba(255, 255, 255, 0.3)',
        },
        dark: {
          900: '#0D0D0D',
          800: '#1A1A1A',
          700: '#2D3748',
          600: '#4A5568',
        },
        accent: {
          silver: '#E8E8E8',
          slate: '#2D3748',
        },
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      },
    },
  },
  plugins: [],
}
