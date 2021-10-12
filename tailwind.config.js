const { mauveDark, redDark } = require("@radix-ui/colors");

module.exports = {
  mode: "jit",
  purge: ["*.html", "*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...mauveDark,
      ...redDark,
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
