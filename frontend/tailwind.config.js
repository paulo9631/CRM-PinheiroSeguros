/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Allow toggling dark mode manually
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f4f4f9',
          dark: '#0D0D0D'
        },
        card: {
          light: '#ffffff',
          dark: '#024873'
        },
        primary: {
          DEFAULT: '#0511F2',
          dark: '#030A8C'
        },
        secondary: {
          DEFAULT: '#0378A6',
          dark: '#025951'
        },
        status: {
          success: {
            bg: '#dcfce7', // green-100
            text: '#166534' // green-800
          },
          progress: {
            bg: '#dbeafe', // blue-100
            text: '#1e40af' // blue-800
          },
          warning: {
            bg: '#fee2e2', // red-100
            text: '#991b1b' // red-800
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px'
      }
    },
  },
  plugins: [],
}
