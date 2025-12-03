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
  plugins: [],
}
