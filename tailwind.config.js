/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand': 'rgb(145 194 207)',
        'primary-dark-blue': 'rgb(0 61 75)',
        'secondary-light-blue-gray': 'rgb(191 207 210)',
        'highlight-light-aqua': 'rgb(145 194 207)',
        'cta-orange': 'rgb(255 179 71)',
        'cta-orange-hover': 'rgb(230 161 64)',
        'neutral-dark-gray': 'rgb(64 110 120)',
        'status-positive': 'rgb(0 204 156)',
        'status-warning': 'rgb(255 203 5)',
        'status-error': 'rgb(237 28 36)',
        'focus-blue': 'rgb(0 136 203)',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        lora: ['Lora', ...defaultTheme.fontFamily.serif]
      },
      borderRadius: {
        'card': '12px',
        'input': '16px',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        bounce: 'bounce 1s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
    },
  },
  plugins: [forms],
} 