/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  safelist: [
    'dark', // Zorg ervoor dat 'dark' beschikbaar is, ook al gebruik je het misschien nog niet overal.
    // Voeg hier andere klassen toe die je dynamisch genereert en niet wilt laten purgen
  ],
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
        'brand-pink-strong': '#E91E63', // var(--pink-strong)
        'brand-pink-hover': '#C2185B',  // var(--pink-hover)
        'brand-pink-light': '#F8BBD9', // var(--pink-light)
        'brand-pink-dark': '#AD1457',   // var(--pink-dark)
        'brand-black': '#000000',       // var(--black)
        'brand-dark-gray': '#333333',   // var(--dark-gray)
        'brand-medium-gray': '#666666', // var(--medium-gray)
        'brand-gray-text': '#707070',   // var(--gray-text)
        'brand-light-gray': '#F5F5F5',  // var(--light-gray)
        'brand-very-light-gray': '#FAFAFA', // var(--very-light-gray)
        'brand-beige-light': '#F7F3F0', // var(--beige-light)
        'brand-white': '#FFFFFF',       // var(--white)

        blue: {
          DEFAULT: '#3A7DFF',
          light: '#CDE2FF',
          dark: '#0052CC'
        },
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
        sans: ['Roboto', ...defaultTheme.fontFamily.sans], // Roboto als standaard sans-serif
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'] // Source Sans Pro toevoegen
      },
      borderRadius: {
        'card': '8px', // Shirley styleguide: 8px
        'input': '6px', // Shirley styleguide: 6px
        'button-round': '25px', // Shirley styleguide: quick reply buttons
        'chat-bubble-bot': '16px 16px 16px 4px',
        'chat-bubble-user': '16px 16px 4px 16px',
        'widget': '12px',
        'brand-chat': '12px',
        'brand-message-user': '16px 16px 4px 16px',
        'brand-message-bot': '16px 16px 16px 4px',
        'brand-button': '16px',
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
      boxShadow: {
        'brand-default': '0 4px 12px rgba(0,0,0,0.1)', // Voor chat container
        'brand-message': '0 1px 2px rgba(0,0,0,0.1)', // Voor bot message
        'brand-suggestion': '0 1px 3px rgba(0,0,0,0.1)', // Voor suggestion button
      },
    },
  },
  plugins: [forms, typography],
} 