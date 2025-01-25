/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx, css}"],
  theme: {
    extend: {
      backgroundImage: {
        "road":"url('/images/road.jpg')",
      },
      fontFamily: {
        "ROBOTvar":["ROBOTvar"],
        "VNvar": ["VNvar"],
      },
    },
  },
  plugins: [],
}

