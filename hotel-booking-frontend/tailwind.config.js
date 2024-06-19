/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Removed spaces between file extensions
  theme: {
    extend: {},
    container: {
      padding: {
        md:"10rem",
      }
    }
  },
  plugins: [],
};
