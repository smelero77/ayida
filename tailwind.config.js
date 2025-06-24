/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sora': ['var(--font-sora)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        'zetika': {
          primary: '#4ADE80',
          'primary-hover': '#22C55E',
          dark: '#1E2A38',
          text: '#111827',
          'text-light': '#6B7280',
          bg: '#F8FAFC',
          border: '#E5E7EB',
          green: '#4ADE80',
        },
      },
      animation: {
        'count-up': 'count-up 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}; 