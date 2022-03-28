const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        gray: colors.neutral,
        kapitus: "#00395d",
        green: "#72b664",
        white: "#ffffff",
        footer: "#e6ebef",
        titleGreen: "rgb(5, 113, 58)",
        pink: "#a94068",
        liteblue: "#66899e",
        errorred: "rgb(170, 68, 107)",
        kapitusLiteGreen: "rgb(115, 181, 100)",
        lightgreen: "rgb(114 182 100)",
        kapitusblue: "#66899e",
        formred: "#790000",
        carouselBlue: "rgb(93, 127, 173)",
        descGreen: "rgb(0, 114, 57)",
        code: {
          green: "#b5f4a5",
          yellow: "#ffe484",
          purple: "#d9a9ff",
          red: "#ff8383",
          blue: "#93ddfd",
        },
      },
    },
  },
  plugins: [],
}
