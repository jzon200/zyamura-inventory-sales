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
      gridTemplateColumns: {
        "fixed-4": "repeat(4, minmax(0, 200px))",
        "fixed-5": "repeat(5, minmax(0, 200px))",
        "fixed-6": "repeat(6, minmax(0, 200px))",
        "fixed-7": "repeat(7, minmax(0, 200px))",
        fixed: "repeat(7, minmax(0, 200px))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
};
