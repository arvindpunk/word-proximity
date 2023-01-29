/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  purge: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: false, // or 'media' or 'class'
}
