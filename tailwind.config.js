/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep forest green — trustworthy, financial, not "law firm"
        primary: {
          50: '#f2f7f3',
          100: '#e0ece2',
          200: '#c2d9c8',
          300: '#99bea4',
          400: '#6c9d7c',
          500: '#4b805e',
          600: '#386549',
          700: '#2d513c',
          800: '#264131',
          900: '#1f3629',
          950: '#101e16',
        },
        // Warm terracotta — legacy, family, warmth
        secondary: {
          50: '#fdf5f3',
          100: '#fbe9e4',
          200: '#f8d6cd',
          300: '#f2b9aa',
          400: '#e89179',
          500: '#da6e50',
          600: '#c65437',
          700: '#a6432b',
          800: '#8a3a27',
          900: '#733426',
          950: '#3e1911',
        },
        // Warm gold — accents, highlights
        accent: {
          50: '#fbf8eb',
          100: '#f6efcb',
          200: '#eedd9a',
          300: '#e4c560',
          400: '#dbad38',
          500: '#cb952b',
          600: '#af7523',
          700: '#8c5620',
          800: '#754621',
          900: '#643a21',
          950: '#3a1e0f',
        },
        // Warm grays / off-white
        neutral: {
          50: '#faf9f7',
          100: '#f3f1ec',
          200: '#e6e2d9',
          300: '#d4cec2',
          400: '#b1a896',
          500: '#968c79',
          600: '#7c7261',
          700: '#665e50',
          800: '#544d42',
          900: '#46403a',
          950: '#25211c',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['Lora', '"Source Serif 4"', 'Georgia', 'ui-serif', 'serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      lineHeight: {
        'relaxed-plus': '1.75',
      },
      maxWidth: {
        'prose-wide': '72ch',
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
