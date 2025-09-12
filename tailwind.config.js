/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, neutral, pastel/nude palette
        primary: {
          50: '#faf7f2',
          100: '#f5efe6',
          200: '#eadfd0',
          300: '#dacbb5',
          400: '#c4ae8e',
          500: '#b19373',
          600: '#9a7b5f',
          700: '#82664f',
          800: '#6a5241',
          900: '#584538',
        },
        secondary: {
          50: '#f7f5f2',
          100: '#f0ece6',
          200: '#e3ddd4',
          300: '#d5cec3',
          400: '#bfb6aa',
          500: '#a89f94',
          600: '#8f867c',
          700: '#776f67',
          800: '#5f5853',
          900: '#4e4945',
        },
        accent: {
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd9cc',
          300: '#fec9b5',
          400: '#f7a98e',
          500: '#e68c73',
          600: '#cf7861',
          700: '#b26751',
          800: '#945544',
          900: '#7b483a',
        },
        neutral: {
          50: '#faf9f7',
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
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['"Freight Serif Pro"', '"FreightSerif"', '"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
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
