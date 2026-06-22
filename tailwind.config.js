/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Forest green palette
        primary: {
          50:  '#f2f7f3',
          100: '#e0ece2',
          200: '#c2d9c8',
          300: '#9bbfaa',
          400: '#6da085',
          500: '#4a8264',
          600: '#3a6b50',
          700: '#2d513c',
          800: '#1f3629',
          900: '#162a1f',
          950: '#0e1c14',
        },
        accent: {
          50:  '#fdfbf0',
          100: '#faf5d8',
          200: '#f6efcb',
          300: '#efe4a8',
          400: '#e5d47e',
          500: '#d4bc55',
          600: '#b89c38',
          700: '#937c2b',
          800: '#6e5c20',
          900: '#4a3d15',
        },
        neutral: {
          50:  '#faf9f7',
          100: '#f4f1ed',
          200: '#e6e1db',
          300: '#d6cfc7',
          400: '#b7a9a0',
          500: '#988c84',
          600: '#7c716a',
          700: '#665d57',
          800: '#524b46',
          900: '#443f3b',
        },
      },
      fontFamily: {
        'sans':  ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Lora', '"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
        'mono':  ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
