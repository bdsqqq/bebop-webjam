const { mauveDark, redDark } = require("@radix-ui/colors");

module.exports = {
  content: ["./*.html", "./*.js"],
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
