/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Shirley Palette
        'pink-strong': '#E91E63',
        'pink-hover': '#C2185B',
        'pink-light': '#F8BBD9', // Aangepast naar #F8BBD9 (consistent met HTML)
        'pink-dark': '#AD1457',

        'black': '#000000',
        'dark-gray': '#333333', // Primaire dark gray
        'dark-gray-1': '#1A1A1A',
        'dark-gray-2': '#222222',
        'dark-gray-3': '#242424',
        'medium-gray': '#666666',
        'gray-text': '#707070',
        'light-gray': '#F5F5F5',
        'very-light-gray': '#FAFAFA',
        'beige-light': '#F7F3F0',
        'off-white': '#FEFEFE',
        'white': '#FFFFFF',

        'blue-accent': '#337AB7',
        'blue-light': '#5DADE2',

        'status-success': '#28a745',
        'status-warning': '#ffc107',
        'status-error': '#dc3545',
        
        // Shirley Brand Colors
        'brand-pink-strong': '#E91E63', // Primaire brandkleur, vervangt oude 'brand'
        'brand-pink-hover': '#C2185B',
        'brand-pink-light': '#F8BBD9', // Aangepast naar #F8BBD9 (consistent met HTML)
        'brand-pink-dark': '#AD1457',
      },
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
        'source-sans-pro': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        // Behoud Lora als die nog ergens gebruikt wordt, anders kan deze weg
        'lora': ['Lora', ...defaultTheme.fontFamily.serif],
        // Definieer specifieke gewichten indien nodig via @font-face en custom utilities 
        // of gebruik de Tailwind font weight classes (e.g., font-source-sans-pro font-bold)
        'roboto-light': ['Roboto Light', 'Roboto', ...defaultTheme.fontFamily.sans],
        'roboto-regular': ['Roboto', ...defaultTheme.fontFamily.sans],
        'roboto-medium': ['Roboto Medium', 'Roboto', ...defaultTheme.fontFamily.sans],
        'source-sans-pro-regular': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        'source-sans-pro-semibold': ['Source Sans Pro Semibold', 'Source Sans Pro', ...defaultTheme.fontFamily.sans],
        'source-sans-pro-bold': ['Source Sans Pro Bold', 'Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'card': '8px', // Shirley styleguide: 8px
        'input': '6px', // Shirley styleguide: 6px
        'button-round': '25px', // Shirley styleguide: quick reply buttons
        'chat-bubble-bot': '16px 16px 16px 4px',
        'chat-bubble-user': '16px 16px 4px 16px',
        'widget': '12px'
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