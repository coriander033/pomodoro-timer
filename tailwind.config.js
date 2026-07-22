/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tomato: {
          DEFAULT: '#E85D4A',
          dark: '#C94A3A',
          light: '#F27D6C',
        },
        sage: {
          DEFAULT: '#7BA68C',
          dark: '#5E8A6E',
          light: '#9DC4AE',
        },
        surface: '#252529',
        background: '#1A1A1E',
        muted: '#8A8A8E',
        foreground: '#F0EDE8',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
