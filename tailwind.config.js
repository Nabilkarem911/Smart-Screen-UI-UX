/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode palette (slate-based)
        ink: {
          950: '#F1F5F9',
          900: '#FFFFFF',
          850: '#F8FAFC',
          800: '#F1F5F9',
          750: '#E2E8F0',
          700: '#E2E8F0',
          600: '#CBD5E1',
          500: '#94A3B8',
        },
        royal: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
        'dark-gradient': 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(241,245,249,0.9) 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(124, 58, 237, 0.2)',
        'glow-gold': '0 0 15px rgba(251, 191, 36, 0.2)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
