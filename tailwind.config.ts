// tailwind.config.js
import type { Config } from 'tailwindcss';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        deepblue: '#0a192f',
        vibrantpink: '#ec4899', // หรือสีที่ต้องการ
      },
      boxShadow: {
        'text-glow': '0 2px 5px rgba(236, 72, 153, 0.5)',
      },
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        slide: 'slide 10s infinite linear'
      },
      boxShadow: {
        'text-glow': '0 0 8px rgba(255, 73, 219, 0.6)',
      },
    },
  },
  plugins: [],
} as Config;
