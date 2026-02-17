/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Premium Industrial color palette
        primary: {
          dark: '#0f172a',
          DEFAULT: '#1e293b',
          light: '#334155',
        },
        accent: {
          dark: '#1a8cba',
          DEFAULT: '#2da0d4',
          light: '#5fbde5',
        },
        success: {
          dark: '#059669',
          DEFAULT: '#10b981',
          light: '#34d399',
        },
        steel: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1d21',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        /* Core utility animations (used via Tailwind classes in JSX) */
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        /* Note: fadeInUp, fadeInDown, scaleIn, slideUp etc. are defined
           in index.css to avoid @keyframes name collisions */
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'industrial': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'industrial-lg': '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
