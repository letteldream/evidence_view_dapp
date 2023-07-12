/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['"Noto Sans"', 'sans-serif'],
      'google': ['"Goolge Sans"', 'sans-serif'],
      'secondary': ['"SilveradoRR"', 'sans-serif'],
      'montserrat': ['"Montserrat"', 'sans-serif'],
      'inter': ['"Inter"', 'sans-serif'],
      'lato': ['"Lato"', 'sans-serif'],
    },
  },
  plugins: [],
}
