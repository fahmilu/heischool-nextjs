/** @type {import('tailwindcss').Config} */
import pxToViewport from 'tailwindcss-px-to-viewport';

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '570px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
    },
    extend: {
      pxToViewPort: {
        // Base viewport configuration
        PresetScreen: {
          width: 1440, // Default design width (in px)
          height: 1080, // Default design height (in px)
        },
        utilities: {
          'gap': 'gap',
          'rounded-ee': 'border-end-end-radius',
          'gap-x': 'column-gap',
          'gap-y': 'row-gap',
          'tracking': 'letter-spacing',
          "rounded": "border-radius",
        }
      },
      colors: {
        "hei-blue": "#302864",
        "hei-green": "#00503C",
        "hei-green-light": "#91CFAC",
        "hei-green-light-2": "#8FCAAB",
      },
      fontFamily: {
        dmsans: ['var(--font-dmsans)'],
        noyh: ['var(--font-noyh)'],
      },
    },
  },
  plugins: [pxToViewport()],
}

