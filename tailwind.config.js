const { url } = require("inspector");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bank-note": url("/assets/bank-note.svg"),
      },
      fontFamily: {
        sriracha: ["Sriracha", "sans-serif"],
      },
      colors: {
        surface: "#e0e4d9",
        "primary-light": "#D9D7C4",
        "primary-dark": "#667061",
      },
    },
  },
};
