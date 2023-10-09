/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor:{
        'solana': "#512DA8"
      },
      colors:{
        'solana': "#512DA8"
      },
      screens:{

        'tall': { 'raw': '(min-height: 1280px)' },
          // => @media (min-height: 472px) { ... }
        'shorter': {'raw': '(max-height: 350px)' }
      },
      minWidth: {
        '720': '50%',
      },
    },
  },
  plugins: [],
}
