module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sriracha: ["Sriracha", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        surface: "#e0e4d9",
        "primary-light": "#D9D7C4",
        "primary-dark": "#667061",
      },
      // gridTemplateColumns: {
      //   "auto-fill": "repeat(auto-fill, minmax(100px, 1fr))",
      // },
    },
  },
};
