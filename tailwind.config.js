/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.vue",
    "./app/**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'lic-blue': '#0052CC',
        'lic-orange': '#FF5722',
        'lic-orange-dark': '#D84315', // Darker shade for better contrast (AA compliant)
        'lic-dark': '#1A1A1A',
        'lic-light': '#F8F9FA',
      },
    },
  },
  safelist: [
    // Dynamic classes that may not be detected by content scanner
    'text-transparent',
    'bg-clip-text',
    'bg-gradient-to-r',
    'from-lic-orange',
    'to-lic-blue',
    'inline-block',
  ],
  corePlugins: {
    // Disable unused utilities to reduce CSS size
    aspectRatio: true,
    backdropBlur: true,
    backdropBrightness: true,
    backdropContrast: true,
    backdropFilter: true,
    backdropGrayscale: true,
    backdropHueRotate: true,
    backdropInvert: true,
    backdropOpacity: true,
    backdropSaturate: true,
    backdropSepia: true,
    blur: true,
    brightness: true,
    contrast: true,
    dropShadow: true,
    grayscale: true,
    hueRotate: true,
    invert: true,
    mixBlendMode: true,
    saturate: true,
    sepia: true,
  },
  plugins: [],
}
